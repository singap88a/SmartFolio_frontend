import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  let subdomain = '';
  
  // Local development (e.g. user.localhost:3000)
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  } else {
    // Production (e.g. user.portfolify.com)
    // Replace 'portfolify.com' with your actual root domain
    const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'portfolify.com';
    if (hostname.endsWith(mainDomain) && hostname !== mainDomain && hostname !== `www.${mainDomain}`) {
      subdomain = hostname.replace(`.${mainDomain}`, '');
    }
  }

  // If there's a valid custom subdomain, rewrite all requests to it
  if (subdomain && subdomain !== 'www') {
    // e.g. user.localhost:3000/ -> rewrites to /user
    // e.g. user.localhost:3000/contact -> rewrites to /user/contact
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}
