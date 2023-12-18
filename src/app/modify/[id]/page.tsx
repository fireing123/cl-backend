import Comments from "@/components/comments"
import envFetch from "@/lib/envfetch"

export default async function Modify({ params }: { params: {id: string} }) {

    const res = await envFetch(`/api/post?id=${params.id}`)
    const { title, url, date } = await res.json()
    const mdRes = await fetch(url)
    const md = await mdRes.text()
    
    return (
        <div>
            <h1>Name : {title}</h1>
            <div>{date}</div>
            <div dangerouslySetInnerHTML={{__html: md}} />
            <Comments term={title} />
        </div>
    )
}