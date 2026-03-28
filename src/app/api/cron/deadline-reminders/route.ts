import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Runs daily via Vercel Cron — checks for upcoming deadlines and emails users

const REMIND_DAYS = [1, 3, 7] // send reminders 1, 3, and 7 days before deadline

interface DbDeadline {
  id: string
  user_id: string
  title: string
  date: string
  time: string
  university_name: string
  type: string
  priority: string
  status: string
}

interface DbProfile {
  user_id: string
  name: string
  email: string
}

function daysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadline = new Date(dateStr)
  deadline.setHours(0, 0, 0, 0)
  return Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function buildEmailHtml(
  userName: string,
  deadlines: { title: string; date: string; universityName: string; daysLeft: number; priority: string }[]
): string {
  const rows = deadlines
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .map((d) => {
      const urgencyColor = d.daysLeft <= 1 ? '#dc2626' : d.daysLeft <= 3 ? '#f59e0b' : '#3b82f6'
      const daysText = d.daysLeft === 0 ? 'Today!' : d.daysLeft === 1 ? 'Tomorrow' : `${d.daysLeft} days`
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
            <strong style="color:#111827;">${d.title}</strong>
            ${d.universityName ? `<br><span style="color:#6b7280;font-size:13px;">${d.universityName}</span>` : ''}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">${d.date}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;text-align:center;">
            <span style="display:inline-block;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:600;color:white;background:${urgencyColor};">
              ${daysText}
            </span>
          </td>
        </tr>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:white;font-size:22px;font-weight:700;">⏰ Deadline Reminder</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
          Hi ${userName}, you have upcoming deadlines!
        </p>
      </div>

      <!-- Table -->
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:10px 16px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Deadline</th>
              <th style="padding:10px 16px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Date</th>
              <th style="padding:10px 16px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Time Left</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div style="padding:16px 24px 24px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">
          This is an automated reminder from AdmitTrack.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`
}

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendKey = process.env.RESEND_API_KEY

  if (!supabaseUrl || !serviceRoleKey || !resendKey) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const resend = new Resend(resendKey)

  // 1. Fetch all upcoming deadlines across all users
  const { data: deadlines, error: dlError } = await supabase
    .from('deadlines')
    .select('id, user_id, title, date, time, university_name, type, priority, status')
    .eq('status', 'upcoming')

  if (dlError || !deadlines) {
    console.error('Failed to fetch deadlines:', dlError)
    return NextResponse.json({ error: 'Failed to fetch deadlines' }, { status: 500 })
  }

  // 2. Group deadlines by user, filtering to only those needing reminders
  const userDeadlines = new Map<string, typeof remindable>()

  const remindable = deadlines
    .map((d: DbDeadline) => ({
      ...d,
      daysLeft: daysUntil(d.date),
    }))
    .filter((d) => REMIND_DAYS.includes(d.daysLeft))

  for (const d of remindable) {
    const list = userDeadlines.get(d.user_id) || []
    list.push(d)
    userDeadlines.set(d.user_id, list)
  }

  if (userDeadlines.size === 0) {
    return NextResponse.json({ sent: 0, message: 'No reminders needed today' })
  }

  // 3. Fetch profiles for users who need reminders
  const userIds = Array.from(userDeadlines.keys())
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('user_id, name, email')
    .in('user_id', userIds)

  if (profileError || !profiles) {
    console.error('Failed to fetch profiles:', profileError)
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 })
  }

  // 4. Send emails
  let sent = 0
  let errors = 0

  for (const profile of profiles as DbProfile[]) {
    if (!profile.email) continue

    const deadlineList = userDeadlines.get(profile.user_id)
    if (!deadlineList || deadlineList.length === 0) continue

    const emailDeadlines = deadlineList.map((d) => ({
      title: d.title,
      date: d.date,
      universityName: d.university_name || '',
      daysLeft: d.daysLeft,
      priority: d.priority,
    }))

    const html = buildEmailHtml(profile.name || 'there', emailDeadlines)
    const deadlineCount = emailDeadlines.length

    try {
      await resend.emails.send({
        from: 'AdmitTrack <reminders@admittrack.com>',
        to: profile.email,
        subject: `⏰ ${deadlineCount} upcoming deadline${deadlineCount > 1 ? 's' : ''} — AdmitTrack`,
        html,
      })
      sent++
    } catch (err) {
      console.error(`Failed to send to ${profile.email}:`, err)
      errors++
    }
  }

  return NextResponse.json({
    sent,
    errors,
    totalUsersChecked: userDeadlines.size,
    totalDeadlinesMatched: remindable.length,
  })
}
