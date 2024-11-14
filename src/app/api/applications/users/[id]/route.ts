import { isAdmin } from "@/lib/auth"
import { auth } from "@/lib/authOptions"
import ApiError from "@/lib/error/APIError"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req: Request, { params }: { params : Promise<{ id: string}> }) {
    const session = await auth();
    const AppId = (await params).id;

    if (AppId) {
        if (!session) {
            return ApiError({
                type: 'session',
                error: "세션결핍"
            })
        }

        const application = await prisma.application.findFirst({
            where: {
                userId: AppId
            }
        })
        
        if (!application) {
            return ApiError({
                type: "undefined",
                error: "작성되지 않음!!"
            })
        }
        
        if (application.userId == session.user.userId || isAdmin(session.user.rank)) {
            return NextResponse.json({
                type: true,
                ...application
            })
        } else {
            return ApiError({
                type: 'authority',
                error: "자신의 소유가 아닙니다/ 관리자만 다른사람의 신청서를 볼수있습니다"
            })
        }
    } else {
        return ApiError({
            type: "params",
            error: "아이디 결핍"
        })
    }
}
