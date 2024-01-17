"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper, Skeleton } from '@mantine/core';
import classes from './blog.module.css'
import { getPostItems } from "@/lib/data/post/get";
import { PostItem } from "@/types/types";

export default function List() {
    const [posts, setPosts] = useState<PostItem[]>();
    useEffect(() => {
        getPostItems().then(items => {
            setPosts(items)
        })
    }, [])
    return (
        <Paper radius="md" p="xl" className={classes.blog} withBorder >
            <Text fw={700}>Blog</Text>
            <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>title</Table.Th>
                        <Table.Th>date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{posts ? posts.map((value, i) => {
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
                : (
                    [0,1,2,3].map((value) => (
                        <Table.Tr key={value}>
                            <Table.Td>
                                <Skeleton height={16} mt={6} radius="xl" width="80%" />
                            </Table.Td>
                            <Table.Td>
                                <Skeleton height={16} mt={6} radius="xl" width="50%" />
                            </Table.Td>
                        </Table.Tr>
                    ))
                )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
        </Paper>
    )
}