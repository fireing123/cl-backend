import { auth } from "@/lib/authOptions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const session = await auth();
    
    if (session?.user) {
        const youtubes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&status=&playlistId=${process.env.YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`, {
            method: 'GET',
            redirect: 'follow'
          }).then(async value => {
            return await value.json()
        })
        const fixed = youtubes.items.map((item: any) => {
            if (item.snippet.thumbnails.maxres) {
                return {
                    title: item.snippet.title,
                    image: item.snippet.thumbnails.maxres,
                    id: item.snippet.resourceId.videoId
                }
            } else {
                return {
                    title: item.snippet.title,
                    image: item.snippet.thumbnails.default,
                    id: item.snippet.resourceId.videoId
                }   
            }
        })
        return NextResponse.json(fixed)
    } else {
        return NextResponse.json({
            message: "당신은 로그인을 해야합니다"
        })
    }
}