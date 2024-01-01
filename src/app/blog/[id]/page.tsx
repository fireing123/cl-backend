"use client"
import { Box, Center, Group, Loader, Paper, Title } from "@mantine/core"
import Comments from "@/components/comments"
import classes from './blogpage.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Blog({ params }: { params: {id: string} }) {

    const [blog, setBlog] = useState<{ title: string, md: string, dat: string, email: string, userId: string }>();

    useEffect(() => {
        fetch(`/api/post?id=${params.id}`)
        .then(async (res) => {
            const { title, fileId, date, userId } = await res.json()
            const { md } = await fetch(`/api/file?id=${fileId}`)
                .then(async (res) => await res.json())
            const { email } = await fetch(`/api/users?id=${userId}`)
                .then(async (res) => await res.json())
            const dat = date.split("T")[0]
            setBlog({ title, md, dat, email, userId })
        })
    }, [params.id])

    if (blog) {
        return (
            <div>
                <Box className={classes.floor}>
                    <Title order={1}>{blog.title}</Title>
                    <br></br>
                    <Group className={classes.page}>
                        <Link href={`/user/${blog.email}`}>{blog.email}</Link>
                        <Title order={5}>{blog.dat}</Title>
                    </Group>
                </Box>
                <br></br>
                <Paper radius="md" p="xl" withBorder className={classes.page} >
                    <div dangerouslySetInnerHTML={{__html: blog.md}} />
                    <br></br>
                    <Comments term={blog.title} />
                </Paper>
            </div>
        )
    } else {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    
}