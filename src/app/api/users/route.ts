import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { isAdmin } from "@/lib/auth";
import ApiError from "@/lib/error/APIError";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email')
    const auth = searchParams.get('auth');
    const session = await getServerSession(authOptions);
    let user : User | null
    if (id && email) {
        return ApiError({
            type: 'params',
            error: "id 와 email은 동시에 주어질수 없습니다"
        })  
    } else if (id) {
        user = await prisma.user.findFirst({
            where: {
                id: id!
            }
        })
        if (!user) {
            return ApiError({
                type: 'params',
                error: "해당 id 의 유저가 존재하지 않습니다"
            })
        }
    } else if (email) {
        user = await prisma.user.findFirst({
            where: {
                email: email!
            }
        }) 
        if (!user) {
            return ApiError({
                type: 'params',
                error: "해당 email 의 유저가 존재하지 않습니다"
            })
        }
    } else {
        return ApiError({
            type: 'params',
            error: "id 또는 email 파라미터가 있어야합니다"
        })
    } 
    if (auth == "true") {
        if (isAdmin(session?.user.rank!)) {
            return NextResponse.json({
                type: true,
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                username: user.username,
                rank: user.rank,
                phoneNumber: user.phoneNumber,
                
            })
        } else {
            return ApiError({
                type: "authority",
                error: "접근거부: 권한부족"
            })
        }

    } else if (session && session.user?.email === user.email) {
        return NextResponse.json({
            type: true,
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username,
            rank: user.rank,
            phoneNumber: user.phoneNumber,
        })
    } else {
        return NextResponse.json({
            type: true,
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            rank: user.rank,
            username: user.username
        })
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    const { email ,rank  ,name  ,phoneNumber } =  await req.json();
    if (session) {
        const self = await prisma.user.findFirst({
            where: {
                email: session.user?.email!
            }
        });
        const other = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (other) {
            if (rank && isAdmin(self?.rank!) || rank !== 'admin' && other?.rank !== 'admin') { 
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        rank: rank
                    }
                });
                await fetch(`${process.env.DISCORD_URL}/api/rankup?email=${email}`, {
                    method: "PATCH"
                })
            }
            let user: User | undefined
            if (phoneNumber && (self == other || isAdmin(self?.rank!))) {
                user = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        phoneNumber: phoneNumber
                    }
                });
            }
            if (name && (self == other || isAdmin(self?.rank!))) {
                user = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        name: name
                    }
                })
            }
            return NextResponse.json({
                type: true,
                ...user
            })
        } else {
            return ApiError({
                type: 'params',
                error: "해당 이메일의 유저는 존재하지 않습니다."
            })
        }
    } else {
        return ApiError({
            type: "session",
            error: "세션이 확인되지않음"
        })

    }
    
}
