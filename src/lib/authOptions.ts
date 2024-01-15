import type { NextAuthOptions, Session } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord"
import { User } from "@/types/types";
import { CustomPrismaAdapter } from "./customPrimsaAdapter";
import prisma from "./prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions : NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile): User {
        console.log("get set profile")
        return {
          ...profile,
          username: profile.username,
          rank: "랭크크크크",
          phoneNumber: profile.phoneNumber
        }
      }
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
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    async session({ session, user, token }): Promise<Session> {
      session.user.rank = token.rank as string
      session.user.userId = token.userId as string
      session.user.username = token.username as string
      return {
        ...session
      };
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      const pu = await prisma.user.findUnique({
        where: {
          email: token.email!
        }
      })
      if (pu) {
        token.userId = pu.id
        token.rank = pu.rank
        token.username = pu.username
      }
      return token;
    },
  },
}