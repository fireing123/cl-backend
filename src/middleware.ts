import { auth } from './lib/authOptions'

export default auth;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}