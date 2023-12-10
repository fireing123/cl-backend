import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from './lib/prisma'

export async function middleware(request: NextRequest) {
    const token = await getToken({
      req: request
    })
    if (!token) {
      if (request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } else {
      const user = await fetch(`/api/users?email=${token.email}`)
        .then(async res => await res.json())
      if (user!.rank != 'admin') {
        if (request.nextUrl.pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('/', request.url))
        }
      }
    }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],
}