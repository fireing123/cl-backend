import Comments from "@/components/comments"
import envFetch from "@/lib/envfetch"
import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Modify({ params }: { params: {id: string} }) {

    const res = await envFetch(`/api/post?id=${params.id}`)
    const { title, url, date } = await res.json()
    const mdRes = await fetch(url)
    const md = await mdRes.text()
    
    return (
        <div>
            <h1>Name : {title}</h1>
            <div>{date}</div>
            <MDXRemote source={md} />
            <Comments term={title} />
        </div>
    )
}