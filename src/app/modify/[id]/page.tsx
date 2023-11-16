import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Modify({ params } : { params: { id: string } }) {

    /*const res = await fetch(`/api/post/${params.id}`)<div>{name}</div>
            <div>{date}</div>
    const { type, name, date, authorId, content } = await res.json()
    if (!type) {
        return <div>공개되지않음</div>
    }
    const mdRes = await fetch("")
    const md = await mdRes.text()*/
    
    return (
        <div>
            
            <MDXRemote source={md} />
        </div>
    )
}