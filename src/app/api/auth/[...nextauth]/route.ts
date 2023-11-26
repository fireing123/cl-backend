import { authOptions } from "@/lib/authOptions";
import NextAuth, { getServerSession } from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };