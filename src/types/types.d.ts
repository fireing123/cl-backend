import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        name: string;
        nickname: string;
        rank: string;
        profilePic: string?;
        posts: string[];
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            nickname: string;
            rank: string;
            profilePic: string?;
            posts: string[];
        } & DefaultSession["user"];
    }
}