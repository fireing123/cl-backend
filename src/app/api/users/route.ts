import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse, } from "next/server";

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
            email: user?.email,
            rank: user.rank
        })
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { email, rank } = await req.json();
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
                        message: "당신은 관리자를 변경하려 시도했습니다!!"
                    })
                }
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        rank: rank
                    }
                });
                const res = await fetch(`${process.env.DISCORD_URL}/api/rankup?email=${email}`, {
                    method: "PATCH"
                })
                return NextResponse.json({
                    message: await res.text()
                })
            } else {
                return NextResponse.json({
                    message: "해당 이메일의 유저는 존재하지 않습니다."
                })
            }
            
        } else {
            return NextResponse.json({
                message: "당신이 어드민이 아니거나 변경할 랭크가 관리자 입니다"
            })
        }
    } else {
        return NextResponse.json({
            message: "세션없음"
        })
    }
    
}