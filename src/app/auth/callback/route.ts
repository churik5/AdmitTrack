import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'signup' | 'email' | null

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
            // ignore - cookies can't be set in some contexts
          }
        },
      },
    }
  )

  // PKCE flow
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
    await supabase.auth.signOut()
    return NextResponse.redirect(new URL('/confirmed?success=true', request.url))
  }

  // Token hash flow
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/confirmed?success=true', request.url))
    }
  }

  return NextResponse.redirect(new URL('/confirmed?error=verification_failed', request.url))
}
