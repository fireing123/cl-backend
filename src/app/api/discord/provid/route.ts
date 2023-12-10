import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@lib/email"
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { id, token, email } = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user) {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "CL 동아리 인증",
            html: `<a href=${process.env.DISCORD_URL}/api/connect?userId=${user.id}&token=${token}>이동하기</a>`.normalize('NFC')
        });
        return NextResponse.json({
            id: id,
            token: token
        })
    } else {
        return NextResponse.json({
            message: "이 email의 계정은 생성되지않았습니다."
        })
    }
}