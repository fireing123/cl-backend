import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { isAdmin } from "@/lib/auth";
import { auth as Auth } from "@/lib/authOptions";
import ApiError from "@/lib/error/APIError";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email')
    const auth = searchParams.get('auth');
    const session = await Auth();
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
                email: email
            }
        }) 
        if (!user) {
            return ApiError({
                type: 'params',
                error: "해당 email 의 유저가 존재하지 않습니다"
            })
        }
    } else {
        const users = await prisma.user.findMany({
            where: {}
        })
        const userInfos = users.map((value) => {
            return {
                id: value.id,
                name: value.name,
                username: value.username,
                image: value.image,
                email: value.email,
                mailcom: value.mailcom,
                rank: value.rank
            }
        })
        return NextResponse.json({
            type: true,
            userInfos: userInfos
        })
    } 
    if (auth == "true") {
        if (session && (isAdmin(session.user.rank!) || session.user.userId == user.id)) {
            return NextResponse.json({
                type: true,
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                username: user.username,
                mailcom: user.mailcom,
                rank: user.rank,
                phoneNumber: user.phoneNumber,
                
            })
        } else {
            return ApiError({
                type: "authority",
                error: "접근거부: 권한부족"
            })
        }

    } else if (session && session.user.email === user.email) {
        return NextResponse.json({
            type: true,
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username,
            mailcom: user.mailcom,
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
            mailcom: user.mailcom,
            rank: user.rank,
            username: user.username
        })
    }
}

export async function PATCH(req: Request) {
    const session = await Auth();
    const { id, rank, username, mailcom, phoneNumber } =  await req.json();

    if (session) {
        const self = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        });
        const other = await prisma.user.findFirst({
            where: {
                id
            }
        })
        if (other && self) {
            const data : any = {}
            if (rank && isAdmin(self.rank) || isAdmin(self.rank) && isAdmin(other.rank)) { 
                data.rank = rank 
                await fetch(`${process.env.DISCORD_URL}/api/rankup?email=${other.email}`, {
                    method: "PATCH"
                })
            }

            if (phoneNumber && (self == other || isAdmin(self.rank))) data.phoneNumber = phoneNumber

            if (username && (self == other || isAdmin(self.rank))) data.username = username

            if (mailcom && (self == other || isAdmin(self.rank))) data.mailcom = mailcom

            const user = await prisma.user.update({
                where: {
                    id: id
                },
                data
            });

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
