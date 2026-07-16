import { updateSession } from '@/lib/supabase/proxy'
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only run Supabase logic on admin/portal routes to avoid touching every public page
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/portal')) {
    return NextResponse.next()
  }

  // Refresh the session cookie
  const response = await updateSession(request)

  // Login pages are inside (auth) route group — they're already excluded from the layout
  // but we still need to allow them through here without an auth check
  const isAdminLogin = pathname === '/admin/login' || pathname.startsWith('/admin/login/')
  const isPortalLogin = pathname === '/portal/login' || pathname.startsWith('/portal/login/')

  if (isAdminLogin || isPortalLogin) {
    return response
  }

  // Check auth for protected routes
  let supabaseResponse = response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (pathname.startsWith('/portal') && !user) {
    return NextResponse.redirect(new URL('/portal/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
}
