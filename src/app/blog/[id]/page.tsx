import { Paper } from "@mantine/core"
import Comments from "@/components/comments"
import envFetch from "@/lib/envfetch"
import classes from './blogpage.module.css'

export default async function Modify({ params }: { params: {id: string} }) {

    const res = await envFetch(`/api/post?id=${params.id}`)
    const { title, url, date } = await res.json()
    const mdRes = await fetch(url)
    const md = await mdRes.text()
    
    return (
        <div>
            <h1>Name : {title}</h1>
            <Paper radius="md" p="xl" withBorder className={classes.page} >
                <div>{date}</div>
                <div dangerouslySetInnerHTML={{__html: md}} />
            </Paper>
            <Comments term={title} />
        </div>
    )
}