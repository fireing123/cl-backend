import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    const { fileurl, name, pubished } = await req.json()
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({
            type: false,
            message: "fail undefined user"
        })
    } else {
        const email = session.user?.email
        if (email) {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            const date = new Date()
            const stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

            console.log(fileurl, name, pubished)

            const value = await prisma.post.create({
                data: {
                    name,
                    date: stringDate,
                    published: pubished,
                    authorId: user?.id!,
                    content: fileurl
                }
            })

            await prisma.user.update({
                where: {
                    email: user?.email
                },
                data: {
                    posts: [...user?.posts!, value.id]
                }
            })
            return NextResponse.json({ type: true,
                message: "success create new post" 
            })
        } else {
            return NextResponse.json({ type: false, message: "유저의 이메일이 존재하지 않음" })
        }
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const post = await prisma.post.findFirst({
        where: {
            id: id!
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