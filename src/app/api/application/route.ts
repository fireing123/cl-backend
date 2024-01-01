import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(session)
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email!
        }
    })
    if (user?.rank == "admin") {
        const application = await prisma.application.findFirst({
            where: {
                id: id || "undefined"
            }
        })
        if (application) {
            await prisma.application.delete({
                where: {
                    id: application.id
                }
            })
            await prisma.user.update({
                where: {
                    id: application.userId!
                },
                data: {
                    applicationId: null
                }
            })
            return NextResponse.json({
                fileId: application.fileId
            })
        }
    } else {
        return NextResponse.json({
            message: "접근 거부됨!"
        })
    } 
    
}

export async function POST(req: Request) {
    const { fileId, title, name, email, phoneNumber } = await req.json()
    const session = await getServerSession(authOptions)
    if (fileId && title && email && phoneNumber && name) {
        if (session) {
            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email!
                }
            })    
            if (user) {
                await prisma.application.create({
                    data: {
                        title: title,
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        fileId: fileId,
                        userId: user.id
                    }
                })
                return NextResponse.json({
                    message: 'success'
                })
            }
        }
    } else {
        return NextResponse.json({
            message: "값 결핍됨"
        })
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email!
        }
    })
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id && (id == user?.applicationId ||  user?.rank == 'admin')) {
        const application = await prisma.application.findFirst({
            where: {
                id: id!
            }
        })

        return NextResponse.json({
            application
        })
    } else if (user?.rank == 'admin') {
        const applications = await prisma.application.findMany({
            where: {

            }
        })
        return NextResponse.json({
            applications
        })
    }
}
