import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    const findUser = await prisma.user.count({
        where: {
            email: email
        }
    });

    if (findUser > 0) {
        return NextResponse.json({
            type: false,
            error: "이미 해당 이메일에 계정이 존재합니다"
        })
    } else {
        console.log(email)
        const newUser = await prisma.user.create({
            data: {
                email: email
            }
        })
        return NextResponse.json({
            type: true,
            message: `${email} 으로 생성됨`
        })
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const auth = searchParams.get('auth');
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: {
            email: email!
        }
    })
    if (!user) {
        return NextResponse.json({
            has: false
        })
    } else if (auth) {
        if (session) {
            if (user && user.rank === 'admin') {
                return NextResponse.json({
                    has: true,
                    id: user.id,
                    email: user.email,
                    rank: user.rank,
                    phoneNumber: user.phoneNumber,
                    posts: user.posts,
                    applicationId: user.applicationId
                })
            }
            
        }
    } else if (session && session.user?.email === email) {
        return NextResponse.json({
            has: true,
            id: user.id,
            email: user.email,
            rank: user.rank,
            phoneNumber: user.phoneNumber,
            posts: user.posts,
            applicationId: user.applicationId
        })
    } else {
        console.log(session?.user?.email, " ", email)
        console.log(session)
        return NextResponse.json({
            has: true,
            id: user.id,
            email: user?.email,
            posts: user.posts,
            rank: user.rank
        })
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')!;
    const rank = searchParams.get('rank')!;
    const phoneNumber = searchParams.get('phoneNumber')!;

    if (session) {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email!
            }
        });
        const rankUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user?.rank === 'admin' && rank !== 'admin' && rankUser?.rank !== 'admin') {
            if (rankUser) {
                if (rank) {
                    await prisma.user.update({
                        where: {
                            email: email
                        },
                        data: {
                            rank: rank
                        }
                    });
                    await fetch(`${process.env.DISCORD_URL}/api/rankup?email=${email}`, {
                        method: "PATCH"
                    })
                }
                if (phoneNumber) {
                    await prisma.user.update({
                        where: {
                            email: email
                        },
                        data: {
                            phoneNumber: phoneNumber
                        }
                    });
                }
                return NextResponse.json({
                    type: true,
                    message: '변경됨'
                })
            } else {
                return NextResponse.json({
                    type: false,
                    message: "해당 이메일의 유저는 존재하지 않습니다."
                })
            }
            
        } else {
            if (session.user?.email === email) {
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        phoneNumber: phoneNumber
                    }
                });
                return NextResponse.json({
                    type: true,
                    message: "자신에게 접근함"
                })
            } else {
                return NextResponse.json({
                    type: false,
                    message: "권한이 없으면서 다른유저에 접근함"
                })
            }
            
        }
    } else {
        return NextResponse.json({
            type: false,
            message: "세션없음"
        })
    }
    
}