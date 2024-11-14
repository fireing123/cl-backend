"use client"
import { Box, Center, Group, Loader, Paper, Title } from "@mantine/core"
import Comments from "@/components/Comment/comments"
import classes from './blogpage.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"
import { getPost } from "@/lib/data/post/get"
import { MinUser, Post } from "@/types/types"
import { useRouter, useParams } from "next/navigation"
import { getUserById } from "@/lib/data/user/get"

export default function Blog() {
    const params = useParams<{ id: string }>()
    const [blog, setBlog] = useState<Post>();
    const [user, setUser] = useState<MinUser>();
    const router = useRouter();

    useEffect(() => {
        try {
            getPost(params.id).then((post) => {
                getUserById(post.userId!).then((user) => {
                    setUser(user)
                })
                setBlog(post);
            })
        } catch (error) {
            router.back()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    if (blog) {
        return (
            <div>
                <head>
                    <title>{blog.title}</title>
                </head>
                <Box className={classes.floor}>
                    <Title order={1}>{blog.title}</Title>
                    <br></br>
                    <Group className={classes.page}>
                        <Link href={`/user/${user?.email}`}>{user?.email}</Link>
                        <Title order={5}>{blog.date}</Title>
                    </Group>
                </Box>
                <br></br>
                <Paper radius="md" p="xl" withBorder className={classes.page} >
                    <div dangerouslySetInnerHTML={{__html: blog.html}} />
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