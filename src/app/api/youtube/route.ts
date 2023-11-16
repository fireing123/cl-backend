import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const youtubes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&status=&playlistId=${process.env.YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`).then(async value => {
        return await value.json()
    })
    return NextResponse.json({ list: youtubes })
}