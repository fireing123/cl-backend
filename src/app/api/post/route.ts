import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    const { fileurl, title, pubished } = await req.json()
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({
            type: false,
            message: "fail undefined user"
        })
    } else {
        const email = session.user?.email
        if (email) {
            const user : any = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            console.log(fileurl, title, pubished)

            const value = await prisma.post.create({
                data: {
                    title: title,
                    url: fileurl,
                    userId: user.id
                }
            })
            const newPosts : any = [...user?.posts!, value.id]
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    posts: newPosts
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
        title: post?.title,
        url: post?.url,
        date: post?.date
    })
}