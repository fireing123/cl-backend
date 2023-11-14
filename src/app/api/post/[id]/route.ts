import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const { id } = params
    const post = await prisma.post.findFirst({
        where: {
            id: id
        }
    })
    return NextResponse.json({
        id: post?.id,
        name: post?.name,
        date: post?.date,
        content: post?.content,
        published: post?.published,
        authorId: post?.authorId
    })
}