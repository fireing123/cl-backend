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
        const applicationItems = applications.map((value) => {
            return {
                id: value.id,
                title: value.title,
                email: value.email,
                date: value.date
            }
        })
        return NextResponse.json({
            type: true,
            applications: applicationItems
        })
    } else {
        return NextResponse.json({
            type: false,
            error: "권한없음"
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
            error: "값 결핍됨"
        })
    }
}


export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const phoneNumber = searchParams.get('phoneNumber');

    if (session) {
        const application = await prisma.application.findUnique({
            where: {
                id: id || ""
            }
        })
        if (session.user.userId == application?.userId) {
            const patchApplication = await prisma.application.update({
                where: {
                    id: id!
                },
                data: {
                    title: title || application.title,
                    email: email || application.email,
                    name: name || application.name,
                    phoneNumber: phoneNumber || application.phoneNumber
                }
            })
            return NextResponse.json({
                type: true,
                ...patchApplication
            })
        } else {
            return NextResponse.json({
                type: false,
                error: "본인 소유가 아닙니다"
            })
        }
    } else {
        return NextResponse.json({
            type: false,
            error: "로그인하세요"
        })
    }
}