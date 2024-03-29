"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper } from '@mantine/core';
import classes from './blog.module.css'
import { getApplicationItems } from "@/lib/data/application/get";

export default function Application() {
    const [list, setList] = useState<JSX.Element[]>([<></>]);
    useEffect(() => {
        getApplicationItems().then((res) => {
            const nodes = res.map((value: any, i: any) => {
                return (
                    <Table.Tr key={value.id}>
                        <Table.Td>
                            <Link href={`/admin/application/${value.id}`}>
                            <Anchor component="button" fz="sm">
                                {value.title}
                            </Anchor>
                            </Link>
                        </Table.Td>
                        <Table.Td >
                            <Link href={`/user/${value.email}`}>
                            <Anchor component="button" fz="sm">
                                {value.email}
                            </Anchor>
                            </Link>
                        </Table.Td>
                        <Table.Td >
                            <Anchor component="button" fz="sm">
                                {value.date}
                            </Anchor>
                        </Table.Td>
                    </Table.Tr>
                )})
            setList(nodes)
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
                        <Table.Th>UserEmail</Table.Th>
                        <Table.Th>date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{list}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
        </Paper>
    )
}