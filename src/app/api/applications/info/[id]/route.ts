import { auth } from "@/lib/authOptions"
import ApiError from "@/lib/error/APIError"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params : { id: string} }) {
    const session = await auth()

    if (params.id) {
        if (!session) {
            return ApiError({
                type: 'session',
                error: "세션결핍"
            })
        }
        
        const application = await prisma.application.findFirst({
            where: {
                id: params.id
            }
        })
        if (!application) {
            return ApiError({
                type: "undefined",
                error: "작성되지 않음!!"
            })
        }
        return NextResponse.json({
            type: true,
            ...application
        })
        
    } else {
        return ApiError({
            type: "params",
            error: "아이디 결핍"
        })
    }
}