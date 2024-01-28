"use client"
import Link from "next/link";
import cx from 'clsx';
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper, ScrollArea } from '@mantine/core';
import classes from './blog.module.css'
import { useSession } from "next-auth/react";
import { getPostsByUserId } from "@/lib/data/post/get";
import { PostItem } from "@/types/types";

export default function MyBlog() {
    const [scrolled, setScrolled] = useState(false);
    const [posts, setPosts] = useState<PostItem[]>();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session) {
            getPostsByUserId(session.user.userId)
                .then((items) => setPosts(items))
        }
    }, [session, status])


    return (
        <Paper radius="md" p="xl" className={classes.blog} withBorder >
            <Text fw={700}>Blog</Text>
            <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table verticalSpacing="xs">
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled})}>
                    <Table.Tr>
                        <Table.Th>title</Table.Th>
                        <Table.Th>date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{posts && posts.map((value) => {
                    return (
                        <Table.Tr key={value.id}>
                            <Table.Td>
                                <Link href={`/blog/${value.id}`}>
                                <Anchor component="button" fz="sm">
                                    {value.title}
                                </Anchor>
                                </Link>
                            </Table.Td>
                            <Table.Td>
                                <Anchor component="button" fz="sm">
                                    {value.date}
                                </Anchor>
                            </Table.Td>
                        </Table.Tr>
                    )})
                }
                </Table.Tbody>
            </Table>
        </ScrollArea>
        </Paper>
    )
}