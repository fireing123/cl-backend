import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"
import { isAdmin } from "@/lib/auth";


export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (session && isAdmin(session.user.rank)) {
        const applications = await prisma.application.findMany({
            where: {

            }
        })
        return NextResponse.json({
            applications
        })
    }
}

export async function POST(req: Request) {
    const { fileId, title, name, email, phoneNumber } = await req.json()
    const session = await getServerSession(authOptions)
    if (fileId && title && email && phoneNumber && name) {
        if (session) {
            await prisma.application.create({
                data: {
                    title: title,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    fileId: fileId,
                    user: {
                        connect: {
                            id: session.user.userId
                        }
                    }
                }
            })
            return NextResponse.json({
                type: true,
                message: 'success'
            })
        }
    } else {
        return NextResponse.json({
            type: false,
            message: "값 결핍됨"
        })
    }
}