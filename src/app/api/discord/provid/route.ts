import { NextResponse } from "next/server";
import { transporter } from "@lib/email"
import prisma from "@/lib/prisma";
import ApiError from "@/lib/error/APIError";

export async function POST(req: Request) {
    const { token, email } = await req.json();
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
            message: "이메일이 정상 전송되었습니다"
        })
    } else {
        return ApiError({
            type: 'undefined',
            error: "이 email의 계정은 생성되지않았습니다."
        })
    }
}