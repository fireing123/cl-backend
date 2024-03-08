import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import ApiError from '@/lib/error/APIError';

export async function POST(request: Request){
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (session && filename) {
    const blob = await put(filename, request.body!, {
      access: 'public',
    });
  
    if (blob) {
      const file = await prisma.file.create({
        data: {
          url: blob.url.replace(`${process.env.BLOB_URL}/`, ""),
          user: {
            connect: {
              id: session.user.userId
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
    } else {
      return ApiError({
        type: 'undefined',
        error: "blob error"
      })
    }
  } else {
    return ApiError({
      type: 'session',
      error: "No filename detected!" 
    })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') as string;
    const file = await prisma.file.findFirst({
      where: {
        id: id
      }
    })
    if (file && file.userId == session.user.userId || isAdmin(session.user.rank)) {
      await del(`${process.env.BLOB_URL}/${file?.url}`);
      await prisma.file.delete({
        where: {
          id: id
        }
      })
      return NextResponse.json({
        type: true,
        fileId: file?.id,
        userId: file?.userId,
        publicAuthority: file?.publicAuthority
      })
    } else {
      return ApiError({
        type: 'undefined',
        error: "파일이 존재하지않음/ 다른 유저가 소유한 파일일수도 있습니다"
      })
    }
  } else {
    return ApiError({
      type: 'session',
      error: "Undefined Session"
    })
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;
  const filename = searchParams.get('filename') as string;
  const publicAuthority = searchParams.get('publicAuthority'); 
  const newFile = req.body as File | null;    
  if (session) {
    if (!newFile) {
      return ApiError({
        type: 'undefined',
        error: "변경될 파일 결핍"
      })
    }
    const file = await prisma.file.findFirst({
      where: {
        id: id
      }
    })
    if (file && file.userId == session.user.userId || isAdmin(session.user.rank)) {
      await del(`${process.env.BLOB_URL}/${file?.url}`);
    } else {
      return ApiError({
        type: 'undefined',
        error: "파일이 존재하지않음/ 다른 유저가 소유한 파일일수도 있습니다"
      })
    }
    const blob = await put(filename, newFile, {
      access: 'public',
    });

     const updateFile = await prisma.file.update({
      where: {
        id: file?.id
      },
      data: {
        url: blob.url.replace(`${process.env.BLOB_URL}/`, ""),
        publicAuthority: publicAuthority || file?.publicAuthority
      }
    })
    return NextResponse.json({
      type: true,
      fileId: updateFile?.id,
      userId: updateFile?.userId,
      publicAuthority: updateFile?.publicAuthority

    })
  } else {
    return ApiError({
      type: 'session',
      error: "session 결핍"
    })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;
  const file = await prisma.file.findFirst({
    where: {
      id: id 
    }
  })
  if (file) {
    if (file.publicAuthority.includes("R")) {
      const md = await fetch(`${process.env.BLOB_URL}/${file?.url}`)
      .then(async res => await res.text())
      return NextResponse.json({ 
        type: true,
        md
      });
    } else {
      const session = await getServerSession(authOptions)
      if (isAdmin(session?.user.rank!) && file.userId == session?.user.userId) {
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
  } else {
    return ApiError({
      type: 'undefined',
      error: "파일 없음"
    })
  }
}