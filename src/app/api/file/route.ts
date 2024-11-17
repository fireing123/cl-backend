import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import ApiError from '@/lib/error/APIError';
import { auth } from '@/lib/authOptions';

export async function POST(request: Request) {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return ApiError({
            type: 'params',
            error: "filename 인자 결핍"
        })
    }

    if (!session) {
        return ApiError({
            type: 'session',
            error: "로그인 필요"
        })
    }

    const blob = await put(filename, request.body!, {
        access: 'public',
    });

    if (!blob) {
        return ApiError({
            type: 'undefined',
            error: "blob error"
        })
    }

    const file = await prisma.file.create({
        data: {
            url: blob.url.replace(`${process.env.BLOB_URL}/`, ""),
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
        fileId: file.id,
        userId: file.userId,
        publicAuthority: file.publicAuthority
    });
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const session = await auth();

    if (!id) {
        return ApiError({
            type: 'params',
            error: "id 결핍"
        })
    }

    if (!session) {
        return ApiError({
            type: 'session',
            error: "Undefined Session"
        })
    }
    
    const file = await prisma.file.findFirst({
        where: {
            id: id
        }
    })
    if (!file) {
        return ApiError({
            type: 'undefined',
            error: "파일이 존재하지않음/ 다른 유저가 소유한 파일일수도 있습니다"
        })
    }
    
    if (file.userId == session.user.userId || isAdmin(session.user.rank)) {
        await del(`${process.env.BLOB_URL}/${file?.url}`);
        await prisma.file.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            type: true,
            fileId: file.id,
            userId: file.userId,
            publicAuthority: file?.publicAuthority
        })
    } else {
        return ApiError({
            type: 'authority',
            error: "접근 거부"
        })
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const filename = searchParams.get('filename');
    const publicAuthority = searchParams.get('publicAuthority');
    const newFile = req.body as File | null;

    if (!session) {
        return ApiError({
            type: 'session',
            error: "session 결핍"
        })
    }

    if (!newFile || !id || !filename) {
        return ApiError({
            type: 'params',
            error: "입력값이 알맞지 않습니다"
        })
    }

    const file = await prisma.file.findFirst({
        where: {
            id: id
        }
    })

    if (!file) {
        return ApiError({
            type: 'undefined',
            error: "파일 없음"
        })
    }

    if (file.userId == session.user.userId || isAdmin(session.user.rank)) {
        await del(`${process.env.BLOB_URL}/${file.url}`);
    } else {
        return ApiError({
            type: 'authority',
            error: "다른 유저가 소유한 파일일수도 있습니다"
        })
    }

    const blob = await put(filename, newFile, {
        access: 'public',
    });

    const updateFile = await prisma.file.update({
        where: {
            id: file.id
        },
        data: {
            url: blob.url.replace(`${process.env.BLOB_URL}/`, ""),
            publicAuthority: publicAuthority || file.publicAuthority
        }
    })

    return NextResponse.json({
        type: true,
        fileId: updateFile?.id,
        userId: updateFile?.userId,
        publicAuthority: updateFile?.publicAuthority
    })
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')!;

    if (!id) {
        return ApiError({
            type: 'params',
            error: "id 결핍"
        })
    }

    const file = await prisma.file.findFirst({
        where: {
            id: id
        }
    })

    if (!file) {
        return ApiError({
            type: 'undefined',
            error: "파일 없음"
        })
    }

    if (file.publicAuthority.includes("R")) {
        const md = await fetch(`${process.env.BLOB_URL}/${file?.url}`)
            .then(async res => await res.text())
        return NextResponse.json({
            type: true,
            md
        });
    } else {
        const session = await auth()

        if (!session) {
            return ApiError({
                type: 'session',
                error: "로그인 필요"
            })
        }

        if (isAdmin(session.user.rank!) && file.userId == session.user.userId) {
            const md = await fetch(`${process.env.BLOB_URL}/${file?.url}`)
                .then(async res => await res.text())
            return NextResponse.json({
                type: true,
                md
            });
        } else {
            return ApiError({
                type: "authority",
                error: "읽기 권한없음"
            })
        }
    }
}