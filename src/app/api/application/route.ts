import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const { fileurl, title, email, phoneNumber } = await req.json()

    const user : any = await prisma.user.findFirst({
        where: {
            email: email
        }
    })    
    const value = await prisma.application.create({
        data: {
            title: title,
            email: email,
            phoneNumber: phoneNumber,
            url: fileurl
        }
    })
    return NextResponse.json({
        message: 'success'
    })
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
        const application = await prisma.application.findFirst({
            where: {
                id: id!
            }
        })
        return NextResponse.json({
            title: application?.title,
            url: application?.url,
            email: application?.email,
            phoneNumber: application?.phoneNumber,
            date: application?.date
        })
    } else {
        const applications = await prisma.application.findMany({
            where: {

            }
        })
        return NextResponse.json({
            applications
        })
    }
    }
    
}