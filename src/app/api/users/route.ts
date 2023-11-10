import { NextRequest, NextResponse, } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({ok:true})
}

export async function POST(req: NextRequest) {
    console.log(await req.json())
    return NextResponse.json(req.body)
}