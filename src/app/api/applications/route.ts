import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { isAdmin } from "@/lib/auth";
import ApiError from "@/lib/error/APIError";
import { auth } from "@/lib/authOptions";


export async function GET(req: Request) {
    const session = await auth();

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
        return ApiError({
            type: 'authority',
            error: "권한없음"
        })
    }
}

export async function POST(req: Request) {
    const { fileId, title, name, email, phoneNumber } = await req.json()
    const session = await auth();
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
                            id: session.user.userId,
                            email: session.user.email
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
        return ApiError({
            type: 'params',
            error: "값 결핍됨"
        })
    }
}


export async function PATCH(req: Request) {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')!;
    const title = searchParams.get('title');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const phoneNumber = searchParams.get('phoneNumber');

    if (session) {
        const application = await prisma.application.findUnique({
            where: {
                id: id!
            }
        })
        if (!application) {
            return ApiError({
                type: "params",
                error: "id 결핌"
            })
        }
        if (session.user.userId == application.userId) {
            const data : any = {}
            if (title) data.title = title
            if (email) data.email = email
            if (name) data.name = name
            if (phoneNumber) data.phoneNumber = phoneNumber
            const patchApplication = await prisma.application.update({
                where: {
                    id: id
                },
                data
            })
            return NextResponse.json({
                type: true,
                ...patchApplication
            })
        } else {
            return ApiError({
                type: 'authority',
                error: "본인 소유가 아닙니다"
            })
        }
    } else {
        return ApiError({
            type: 'session',
            error: "로그인하세요"
        })
    }
}