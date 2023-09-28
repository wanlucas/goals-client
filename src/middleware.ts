import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_') || pathname.startsWith('/login')) return;

  console.log(request.cookies, 'coooookies');
  // return NextResponse.redirect(new URL('/home', request.url));
}
