import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    '';

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Keep supabase.auth.getUser() right after client instantiation
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Helper to construct redirect response while preserving refreshed session cookies
  const createRedirect = (targetUrl: URL) => {
    const redirectResponse = NextResponse.redirect(targetUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  };

  const rawPathname = request.nextUrl.pathname;
  // Normalize pathname by removing trailing slash (e.g., '/admin/login/' -> '/admin/login')
  const normalizedPathname = rawPathname.replace(/\/+$/, '') || '/';
  const isLoginPage = normalizedPathname === '/admin/login';
  const isAdminRoute = normalizedPathname === '/admin' || normalizedPathname.startsWith('/admin/');

  // 1. Protect /admin routes (except /admin/login)
  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login/';
      // Preserve original destination, but never set redirectTo to the login page itself
      if (normalizedPathname !== '/admin/login') {
        const destination = `${request.nextUrl.pathname}${request.nextUrl.search}`;
        url.search = '';
        url.searchParams.set('redirectTo', destination);
      } else {
        url.search = '';
      }
      return createRedirect(url);
    }

    // Verify staff profile and role in admin_profiles table
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login/';
      url.search = '';
      url.searchParams.set('error', 'unauthorized');
      return createRedirect(url);
    }
  }

  // 2. If visiting /admin/login and already authenticated with a verified staff profile, redirect away to dashboard
  if (isLoginPage && user) {
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile && (profile.role === 'admin' || profile.role === 'editor')) {
      let redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/admin/';
      const normalizedTarget = redirectTo.split('?')[0].replace(/\/+$/, '') || '/';

      if (
        !redirectTo.startsWith('/') ||
        redirectTo.startsWith('//') ||
        normalizedTarget === '/admin/login'
      ) {
        redirectTo = '/admin/';
      }

      const url = new URL(redirectTo, request.url);
      return createRedirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, and audio
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|audio/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|pdf)$).*)',
  ],
};
