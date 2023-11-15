import prisma from "@/lib/prisma";
import { NextRequest, NextResponse, } from "next/server";

export async function POST(req: NextRequest) {
    const { name, nickname, email } = await req.json();
    console.log(name, nickname, email)
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
                email: email,
                name: name,
                nickname: nickname
            }
        })
        return NextResponse.json({
            type: true,
            message: `${email} 으로 생성됨`
        })
    }
}

export async function GET(req: NextRequest) {
    const { email } : any = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (!user) {
        return NextResponse.json({
            has: false
        })
    } else {
        return NextResponse.json({
            has: true,
            id: user?.id,
            email: user?.email,
            nickname: user?.nickname,
            name: user?.name,
            rank: user.rank,
            image: user.profilePic,
            posts: user.posts
        })
    }
}

