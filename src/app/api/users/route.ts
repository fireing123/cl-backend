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
    const user = await prisma.user.findFirst({
        where: {
            email: email!
        }
    })
    if (!user) {
        return NextResponse.json({
            has: false
        })
    } else {
        return NextResponse.json({
            has: true,
            id: user.id,
            email: user?.email,
            rank: user.rank
        })
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { email, rank, phoneNumber } = await req.json();
    if (session) {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email!
            }
        });
        if (user?.rank === 'admin' && rank !== 'admin') {
            const rankUser = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })
            if (rankUser) {
                if (rankUser.rank === 'admin') {
                    return NextResponse.json({
                        type: false,
                        message: "당신은 관리자를 변경하려 시도했습니다!!"
                    })
                }
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        rank: rank,
                        phoneNubmer: phoneNumber
                    }
                });
                const res = await fetch(`${process.env.DISCORD_URL}/api/rankup?email=${email}`, {
                    method: "PATCH"
                })
                return NextResponse.json({
                    type: true,
                    message: await res.text()
                })
            } else {
                return NextResponse.json({
                    type: false,
                    message: "해당 이메일의 유저는 존재하지 않습니다."
                })
            }
            
        } else {
            if (user?.rank === 'admin') {
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        phoneNubmer: phoneNumber
                    }
                });
                return NextResponse.json({
                    type: true,
                    message: "관리자 에게 접근함"
                })
            } else {
                return NextResponse.json({
                    type: false,
                    message: "당신은 관리자도 아닌주제에 왜 유저에게 직접 접근했습니까?"
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