import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_DOMAIN, isLocalhost } from './lib/config';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // تمرير المسار للـ layout لمعرفة ما إذا كانت الصفحة بورتفوليو
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', url.pathname);

  let subdomain = '';
  
  // Local development
  if (isLocalhost(hostname)) {
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  } else {
    // Production
    const mainDomain = APP_DOMAIN;
    if (hostname.endsWith(mainDomain) && hostname !== mainDomain && hostname !== `www.${mainDomain}`) {
      subdomain = hostname.replace(`.${mainDomain}`, '');
    }
  }

  // If there's a valid custom subdomain, rewrite all requests to it
  if (subdomain && subdomain !== 'www') {
    // e.g. user.domain.com/ -> rewrites to /user
    // e.g. user.domain.com/contact -> rewrites to /user/contact
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url), {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
