import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'signup' | 'email' | null

  const redirectUrl = new URL('/confirmed', request.url)

  if (!token_hash || !type) {
    redirectUrl.searchParams.set('error', 'missing_params')
    return NextResponse.redirect(redirectUrl)
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.verifyOtp({ token_hash, type })

  if (error) {
    redirectUrl.searchParams.set('error', 'verification_failed')
    return NextResponse.redirect(redirectUrl)
  }

  // Sign out so user goes to login page manually
  await supabase.auth.signOut()

  redirectUrl.searchParams.set('success', 'true')
  return NextResponse.redirect(redirectUrl)
}
