import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  /*if (!request.nextUrl.pathname.startsWith('/public')) {
    const token = await getToken({
      req: request
    })
    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL(token?.email!, request.url))
  }*/
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],
}