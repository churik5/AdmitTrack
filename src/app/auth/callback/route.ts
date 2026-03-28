import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'signup' | 'email' | 'recovery' | null
  const next = searchParams.get('next') || '/confirmed?success=true'

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
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // ignore
          }
        },
      },
    }
  )

  // PKCE flow (code exchange)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // For password recovery, keep session alive (don't sign out)
      if (next === '/reset-password') {
        return NextResponse.redirect(new URL(next, request.url))
      }
      // For email confirmation, sign out so user goes to login
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL(next, request.url))
    }
    return NextResponse.redirect(new URL('/confirmed?error=verification_failed', request.url))
  }

  // Token hash flow
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      if (next === '/reset-password') {
        return NextResponse.redirect(new URL(next, request.url))
      }
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL(next, request.url))
    }
    return NextResponse.redirect(new URL('/confirmed?error=verification_failed', request.url))
  }

  return NextResponse.redirect(new URL('/confirmed?error=missing_params', request.url))
}
