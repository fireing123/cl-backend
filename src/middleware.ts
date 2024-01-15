import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import envFetch from './lib/envfetch'

export async function middleware(request: NextRequest) {
    const token = await getToken({
      req: request
    })
    if (process.env.NODE_ENV == 'production') {
      if (request.nextUrl.pathname.startsWith('/development')) {
        return NextResponse.rewrite(new URL('/404', request.url))
      }
    }
    if (!token) {
      if (request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.rewrite(new URL('/404', request.url))
      }
      if (request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/login?callbackUrl=/signup', request.url))
      }
      if (request.nextUrl.pathname.startsWith('/mypage')) {
        return NextResponse.redirect(new URL('/login?callbackUrl=/signup?callbackUrl=/mypage', request.url))
      }
      if (request.nextUrl.pathname.startsWith('/application')) {
        return NextResponse.redirect(new URL('/login?callbackUrl=/signup?callbackUrl=/application', request.url))
      }
    } else {
      if (request.nextUrl.pathname.startsWith('/admin')) {
        if (token.rank != 'admin') {
          return NextResponse.redirect(new URL('/', request.url))
        }
      }
    }
    return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],
}