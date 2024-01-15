import { NextRequest, NextResponse, } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email')
    const auth = searchParams.get('auth');
    const session = await getServerSession(authOptions);
    let user : User | null
    if (id) {
        user = await prisma.user.findFirst({
            where: {
                id: id!
            }
        })
    } else {
        user = await prisma.user.findFirst({
            where: {
                email: email!
            }
        }) 
    }
    if (!user) {
        return NextResponse.json({
            has: false,
            message: "id params undefined"
        })
    } else if (auth) {
        if (session) {
            if (user.rank === 'admin') {
                return NextResponse.json({
                    has: true,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    username: user.username,
                    rank: user.rank,
                    phoneNumber: user.phoneNumber,
                    
                })
            }
            
        }
    } else if (session && session.user?.email === user.email) {
        return NextResponse.json({
            has: true,
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
            has: true,
            id: user.id,
            username: user.username,
            email: user.email,
            rank: user.rank,
            phoneNumber: user.phoneNumber
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
            if (phoneNumber && (self == other || isAdmin(self?.rank!))) {
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        phoneNumber: phoneNumber
                    }
                });
            }
            if (name && (self == other || isAdmin(self?.rank!))) {
                await prisma.user.update({
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
                message: '변경됨'
            })
        } else {
            return NextResponse.json({
                type: false,
                message: "해당 이메일의 유저는 존재하지 않습니다."
            })
        }
    } else {
        return NextResponse.json({
            type: false,
            message: "세션없음"
        })
    }
    
}
