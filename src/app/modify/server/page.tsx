import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";


export default async function Server() {
    const session = await getAuthSession();
}