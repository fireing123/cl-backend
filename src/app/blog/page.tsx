"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Progress, Anchor, Text, Group } from '@mantine/core';

export default function List() {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch("/api/post").then(async (res) => {
            setList((await res.json()).posts)
        })
    }, [])
    return (
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
    )
}