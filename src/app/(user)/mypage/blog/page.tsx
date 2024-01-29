"use client"
import Link from "next/link";
import cx from 'clsx';
import { useEffect, useState } from "react";
import { Table, Anchor, Text, Paper, UnstyledButton, ScrollArea, Container, Tabs, Menu, rem } from '@mantine/core';
import classes from './blog.module.css'
import { useSession } from "next-auth/react";
import { IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { getPostsByUserId } from "@/lib/data/post/get";
import { PostItem } from "@/types/types";
import { deletePost } from "@/lib/data/post/del";

export default function MyBlog() {
    const [scrolled, setScrolled] = useState(false);
    const [list, setList] = useState<PostItem[]>();
    const { data: session, status } = useSession();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            getPostsByUserId(session.user.userId).then((res) => {
                setList(res)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const DeleteBlog = async (id: string) => {
        
        try {
            const res = await deletePost(id)
            notifications.show({
                message: "삭제 성공"
            })
            router.refresh()
        } catch (error) {
            notifications.show({
                message: "오류 발생",
                color: "red"
            })

        }
    }

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
                            <Table.Td>
                                <Menu
                                    width={260}
                                    position="bottom-end"
                                    transitionProps={{ transition: 'pop-top-right' }}
                                    onClose={() => setUserMenuOpened(false)}
                                    onOpen={() => setUserMenuOpened(true)}
                                    withinPortal
                                >
                                    <Menu.Target>
                                        <UnstyledButton
                                            className={cx(classes.user, { [classes.userActive]: userMenuOpened})}
                                        >::</UnstyledButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>Blog</Menu.Label>

                                        <Menu.Item onClick={() => DeleteBlog(value.id)}
                                            leftSection={
                                                <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                            }
                                        >delete</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
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