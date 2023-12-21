"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper } from '@mantine/core';
import classes from './blog.module.css'
import { useSession } from "next-auth/react";

export default function List() {
    const [list, setList] = useState([]);
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "authenticated" && session) {
            fetch(`/api/users?email=${session.user?.email}`)
                .then(async (res: any) => {
                    const user = await res.json() 
                    const posts = await fetch(`/api/post?user=${user.id}`) 
                        .then(async res => await res.json())
                    setList(posts.posts)
                })
        }
    }, [session, status])
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
                <Table.Tbody>{list.map((value: any, i: any) => {
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
        </Table.ScrollContainer>
        </Paper>
    )
}