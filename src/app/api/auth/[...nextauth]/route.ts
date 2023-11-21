import NextAuth, { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";


export const authOptions : NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ]
}

export const getAuthSession = () => getServerSession(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };