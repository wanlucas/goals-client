import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_') || pathname.startsWith('/login')) return NextResponse.next();

  if (!request.cookies.get('token')) return NextResponse.redirect(new URL('/login', request.url));

  return NextResponse.next();
}
