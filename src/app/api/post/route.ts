import { getServerSession } from "next-auth"
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "@lib/authOptions"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const { url, title } = await req.json()
    const session = await getServerSession(authOptions)
    
    if (!(url && title && session)) {
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
            const file = await prisma.file.findFirst({
                where: {
                    url: url.replace(`${process.env.BLOB_URL}/`, "")
                }
            })

            if (file) {
                const value = await prisma.post.create({
                    data: {
                        title: title,
                        fileId: file.id,
                        userId: user?.id!
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
                return NextResponse.json({
                    type: true,
                    message: "success create new post" 
                })
            } else {
                return NextResponse.json({
                    type: false,
                    message: "해당 id의 파일이 존재하지 않음!"
                })
            }
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
        return NextResponse.json(post)
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
                        id: id
                    }
                })
                const removed = user?.posts.filter((value) => value !== id )
                await prisma.user.update({
                    where: {
                        email: user?.email
                    },
                    data: {
                        posts: removed
                    }
                })
                return NextResponse.json({
                    fileId: post.fileId
                })
            } else {
                return NextResponse.json({
                    message: '당신은 이 블로그를 삭제할 권한이 없습니다'
                })
            }
        } else {
            return NextResponse.json({
                message: '포스트가 존재하지 않음'
            })
        }
    } else {
        return NextResponse.json({
            message: 'id 결핍됨!'
        })
    }
}