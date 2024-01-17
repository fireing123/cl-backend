import { isAdmin } from "@/lib/auth"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function GET(req: Request, { params }: { params : { id: string} }) {
    const session = await getServerSession(authOptions)

    if (params.id && session) {
        const application = await prisma.application.findFirst({
            where: {
                id: params.id
            }
        })
        if (application?.userId == session.user.userId || isAdmin(session.user.rank)) {
            return NextResponse.json({
                type: true,
                ...application
            })
        } else {
            return NextResponse.json({
                type: false,
                error: "자신의 소유가 아닙니다/ 관리자만 다른사람의 신청서를 볼수있습니다"
            })
        }
    } else {
        return NextResponse.json({
            type: false,
            error: "아이디 결핍 또는 세션 결핍"
        })
    }
}

export async function DELETE(req: Request, { params }: { params : { id: string} }) {
    const session = await getServerSession(authOptions);

    if (params.id && session && isAdmin(session.user.rank)) {
        const application = await prisma.application.findFirst({
            where: {
                id: params.id
            }
        })
        if (application) {
            await prisma.application.delete({
                where: {
                    id: application.id
                }
            })
            return NextResponse.json({
                type: true,
                fileId: application.fileId
            })
        }
    } else {
        return NextResponse.json({
            type: false,
            message: "접근 거부됨!"
        })
    } 
    
}
