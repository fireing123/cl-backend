'use client'

import MyBlog from "@/components/Blog/myblog";
import { getUserByEmail } from "@/lib/data/user/get";
import { MinUser } from "@/types/types"
import { Avatar, Center, Loader, Paper, Text } from "@mantine/core";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"

type UserPageParams = { email: string };

export default function UserPage() {
    const [user, setUser] = useState<MinUser>();
    const [type, setType] = useState<Boolean>(true);
    const params = useParams<{ email: string }>()

    useEffect(() => {
        try {
            getUserByEmail(params.email).then((user) => {
                setUser(user)
            })
        } catch (error) {
            setType(false)
        }
    }, [params.email])

    if (type) {
        if (user) {
            return (
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                    <head>
                        <title>{`${user.name} 의 정보`}</title>
                    </head>
                    <Avatar
                        src={user.image}
                        size={120}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        {user.username || user.name}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                      {user.email} • {user.rank}
                    </Text>
                    <MyBlog />
                </Paper>
            );
        } else {
            return (
                <Center>
                    <Loader />
                </Center>
            )
        }
    } else {
        return 404 // 404 page 
    }


}