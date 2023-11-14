import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Modify({ params } : { params: { id: string } }) {

    const res = await fetch(`/api/post/${params.id}`)
    const { type, name, date, authorId, content } = await res.json()
    if (!type) {
        return <div>공개되지않음</div>
    }
    return (
        <div>
            <div>{name}</div>
            <div>{date}</div>
            <MDXRemote source={content} />
        </div>
    )
}