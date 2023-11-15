import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { id }: any = await req.json();
    const youtubes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?
    part=snippet&
    maxResults=50&
    status=&
    playlistId=${id}&
    key=${process.env.YOUTUBE_API_KEY}
    `).then(async value => {
        const { items } = await value.json()
        return items
    })
    return NextResponse.json(youtubes)
}