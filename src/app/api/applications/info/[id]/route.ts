import { isAdmin } from "@/lib/auth"
import { authOptions } from "@/lib/authOptions"
import ApiError from "@/lib/error/APIError"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params : { id: string} }) {
    const session = await getServerSession(authOptions)

    if (params.id) {
        if (!session) {
            return ApiError({
                type: 'session',
                error: "세션결핍"
            })
        }
        
        const application = await prisma.application.findFirst({
            where: {
                userId: params.id
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
            id: application.id,
            title: application.title,
            email: application.email,
            date: application.date
        })
        
    } else {
        return ApiError({
            type: "params",
            error: "아이디 결핍"
        })
    }
}