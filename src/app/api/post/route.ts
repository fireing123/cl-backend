import { getServerSession } from "next-auth"
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "@lib/authOptions"
import prisma from "@/lib/prisma"

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
    const user = searchParams.get('user');
    if (id) {
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
    } else if (user) {
        const posts = await prisma.post.findMany({
            where: {
                userId: user
            }
        })
        return NextResponse.json({
            posts
        })
    } else {
        const posts = await prisma.post.findMany({
            where: {
            }
        })
        return NextResponse.json({
            posts
        })
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id && session) {
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })
        if (post) {
            const user = await prisma.user.findFirst({
                where: {
                    id: post.userId
                }
            })
            const you = await prisma.user.findFirst({
                where: {
                    email: session.user?.email!
                }
            })
            if (user?.email === session?.user?.email || you?.rank === "admin") {
                await prisma.post.delete({
                    where: {
                        id
                    }
                })
                await fetch(`/api/file?url=${post.url}`, {
                    method: "DELETE"
                })
                return NextResponse.json({
                    title: post?.title,
                    url: post?.url,
                    date: post?.date
                })
            } else {
                return NextResponse.json({
                    message: '당신은 이 블로그를 삭제할 권한이 없습니다'
                })
            }
        }
    } else {
        return NextResponse.json({
            message: 'id 결핍됨!'
        })
    }
}