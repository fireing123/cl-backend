'use client'

import MyBlog from "@/components/Blog/myblog";
import { User } from "@/types/types"
import { Avatar, Center, Loader, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { email: string} }) {
    const [user, setUser] = useState<User>();
    const [type, setType] = useState<Boolean>(true);

    useEffect(() => {
        fetch(`/api/users?email=${params.email}`)
            .then(async (res) => {
                const { has, id, name, image, email, rank, username, phoneNumber  } = await res.json()
                if (has) {
                    setUser({ id, name, image, email, rank, phoneNumber, username})
                } else {
                    setType(false)
                }
            })
    })

    if (type) {
        if (user) {
            return (
                <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
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