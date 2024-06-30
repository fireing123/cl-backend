import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import ApiError from "@/lib/error/APIError"
import { auth } from "@/lib/authOptions"

export async function POST(req: Request) {
    const { fileId, title } = await req.json()
    const session = await auth();

    if (session) {
        const post = await prisma.post.create({
            data: {
                title: title,
                fileId: fileId,
                user: {
                    connect:{
                        id: session.user.userId,
                        email: session.user.email
                    }
                }
            }
        })
        return NextResponse.json({
            type: true,
            ...post
        })
    } else {
        return ApiError({
            type: 'session',
            error: '로그인 필요함'
        })
    }

    
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const user = searchParams.get('user');
    if (id) {
        const post = await prisma.post.findUnique({
            where: {
                id: id!
            }
        })
        if (post) {
            return NextResponse.json({
                type: true,
                ...post
            })
        } else {
            return ApiError({
                type: 'params',
                error: "해당 id 의 포스트가 존재하지않음"
            })
        }
    } else if (user) {
        const posts = await prisma.post.findMany({
            where: {
                userId: user
            }
        })
        if (posts) {
            return NextResponse.json({
                type: true,
                posts: posts
            })
        } else {
            return ApiError({
                type: 'params',
                error: "해당 UserId 의 포스트가 존재하지않음"
            })
        }
    } else {
        const posts = await prisma.post.findMany({
            where: {
            }
        })
        if (posts) {
            return NextResponse.json({
                type: true,
                posts: posts
            })
        } else {
            return ApiError({
                type: "undefined",
                error: "포스트가 생성되지않음"
            })
        }
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && session) {
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })
        if (post) {
            if (post.userId === session.user.userId || isAdmin(session.user.rank)) {
                const delPost = await prisma.post.delete({
                    where: {
                        id: id
                    }
                })
                return NextResponse.json({
                    type: true,
                    ...delPost
                })
            } else {
                return ApiError({
                    type: 'authority',
                    error: '당신은 이 블로그를 삭제할 권한이 없습니다'
                })
            }
        } else {
            return ApiError({
                type: 'params',
                error: '포스트가 존재하지 않음'
            })
        }
    } else {
        return ApiError({
            type: 'params',
            error: 'id 결핍됨!'
        })
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const title = searchParams.get('title');

    if (!title) {
        return ApiError({
            type: 'params',
            error: "바꿀 제목이 주어지지않음"
        })
    }


    if (session) {
        const post = await prisma.post.findUnique({
            where: {
                id: id || ""
            }
        })
        if (session.user.userId == post?.userId) {
            const patchPost = await prisma.post.update({
                where: {
                    id: id!
                },
                data: {
                    title: title
                }
            })
            return NextResponse.json({
                type: true,
                ...patchPost
            })
        }
    }
}