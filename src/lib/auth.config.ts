import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";


export default { 
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        DiscordProvider({
          clientId: process.env.DEV_DISCORD_ID!,
          clientSecret: process.env.DEV_DISCORD_SECRET!,
        })
      ],
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true;
        },
        async session({ session, user }) {
          return session;
        },
        authorized({ auth, request: { nextUrl } }) {
          if (process.env.NODE_ENV == 'production') {
            if (nextUrl.pathname.startsWith('/dev')) {
              return Response.redirect(new URL('/404', nextUrl))
            }
          }
          if (!auth) {
            if (nextUrl.pathname.startsWith('/admin')) {
              return Response.redirect(new URL('/404', nextUrl))
            }
            if (nextUrl.pathname.startsWith('/mypage')) {
              return Response.redirect(new URL('/login?callbackUrl=/mypage', nextUrl))
            }
            if (nextUrl.pathname.startsWith('/application')) {
              return Response.redirect(new URL('/login?callbackUrl=/application', nextUrl))
            }
          } else {
            if (nextUrl.pathname.startsWith('/admin')) {
              if (auth.user.rank != 'admin') {
                return Response.redirect(new URL('/', nextUrl))
              }
            }
          }
          return true;
        }
      }
} satisfies NextAuthConfig

