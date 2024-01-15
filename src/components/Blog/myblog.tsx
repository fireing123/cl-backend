"use client"
import Link from "next/link";
import cx from 'clsx';
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper, ScrollArea } from '@mantine/core';
import classes from './blog.module.css'
import { useSession } from "next-auth/react";

export default function MyBlog() {
    const [scrolled, setScrolled] = useState(false);
    const [list, setList] = useState<[] | undefined>();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session) {
            fetch(`/api/users?email=${session.user?.email}`)
                .then(async (res: any) => {
                    const user = await res.json() 
                    const posts = await fetch(`/api/post?user=${user.id}`) 
                        .then(async res => await res.json())
                    setList(posts)
                })
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
                <Table.Tbody>{list && list.map((value: any, i: any) => {
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