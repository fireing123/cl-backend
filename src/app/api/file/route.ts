import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(request: Request){
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (session && filename) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email!
      }
    })
    if (user) {
      const blob = await put(filename, request.body!, {
        access: 'public',
      });
    
      if (blob) {
        await prisma.file.create({
          data: {
            url: blob.url.replace(`${process.env.BLOB_URL}/`, ""),
            user: {
              connect: {
                id: user.id
              }
            }
          }
        })
        return NextResponse.json({
          type: true,
          ...blob
        });        
      } else {
        return NextResponse.json({
          type: false,
          message: "blob error"
        })
      }
    } else {
      return NextResponse.json({
        type: false,
        message: "유저 결핍"
      })
    }
  } else {
    return NextResponse.json({ 
      type: false,
      message: "No filename detected!" 
    })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url') as string;
    const file = await prisma.file.findFirst({
      where: {
        url: urlToDelete
      }
    })
    if (file?.userId == session.user.userId || isAdmin(session.user.rank)) {
      await del(`${process.env.BLOB_URL}/${urlToDelete}`);
      return NextResponse.json({
        type: true,
        message: `delete ${urlToDelete}`
      })
    } else {
      return NextResponse.json({
        type: false,
        message: "파일이 존재하지않음/ 다른 유저가 소유한 파일일수도 있습니다"
      })
    }
  } else {
    return NextResponse.json({
      type: false,
      message: "Undefined Session"
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
  if (file?.publicAuthority.includes("R")) {
    const md = await fetch(`${process.env.BLOB_URL}/${file?.url}`)
    .then(async res => await res.text())
    return NextResponse.json({ 
      type: true,
      md
     });
  } else if (file) {
    const session = await getServerSession(authOptions)
    if (isAdmin(session?.user.rank!) && file.userId == session?.user.userId) {
      const md = await fetch(`${process.env.BLOB_URL}/${file?.url}`)
    .then(async res => await res.text())
    return NextResponse.json({ 
      type: true,
      md
     });
    } else {
      return NextResponse.json({
        type: false,
        message: "파일 없음"
      })
    }
  }
}