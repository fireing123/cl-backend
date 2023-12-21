import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

    if (filename) {
        const blob = await put(filename, request.body!, {
            access: 'public',
          });
        
        
          return NextResponse.json(blob);        
    } else {
        return NextResponse.json({ message: "No filename detected!" })
    }

}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url') as string;
    await del(urlToDelete);
    return NextResponse.json({
      message: `delete ${urlToDelete}`
    })
  } else {
    return NextResponse.json({
      message: "Undefined Session"
    })
  }
}

export async function GET(request: NextRequest) {
  const { blobs } = await list();
  return NextResponse.json(blobs);
}