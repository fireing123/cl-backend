'use client'

import MyBlog from "@/components/Blog/myblog";
import { User } from "@/types/types"
import { Avatar, Center, Loader, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { email: string} }) {
    // 유저페이지 
    // 유저명 이메일 블로그 사진 적절히 배치
    const [user, setUser] = useState<User>();
    const [type, setType] = useState<Boolean>(true);

    useEffect(() => {
        fetch(`/api/users?email=${params.email}`)
            .then(async (res) => {
                const { has, id, name, image, email, rank } = await res.json()
                if (has) {
                    const posts = await fetch(`/api/post?user=${id}`)
                        .then(async res => await res.json())
                    setUser({ id, name, image, email, rank, posts, phoneNumber: null, applicationId: null })
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
                        {user.name || "이름없는 사나이"}
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