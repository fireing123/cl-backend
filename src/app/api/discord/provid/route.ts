import { NextResponse } from "next/server";
import { transporter } from "@lib/email"
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { id, token, email } = await req.json();
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user) {
        const res = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "CL 동아리 디스코드 연결",
            html: `<div>
                <p>클릭하시면 연결합니다 </p>
                <a href=${process.env.DISCORD_URL}/api/connect?userId=${user.id}&token=${token}>이동하기</a>
            </div>`
        });
        return NextResponse.json({
            type: true,
            message: "메세지 전달 성공"
        })
    } else {
        return NextResponse.json({
            type: false,
            message: "이 email의 계정은 생성되지않았습니다."
        })
    }
}