'use client'

import { getUserDetails } from "@/lib/data/user/get";
import { patchUser } from "@/lib/data/user/patch";
import { User } from "@/types/types";
import { Box, Button, Center, Group, Loader, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Member({ params }: { params: {id: string} }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User>();
    
    useEffect(() => {
        if (status == "authenticated") {
            getUserDetails(session.user.userId)
                .then(async (use) => {
                    setUser(use)
                }).catch((error) => {
                    notifications.show({
                        color: "red",
                        message: "유저가 존재하지 않음"
                    })
                    router.push("/admin")
                })
            }
    })

    if (user) {
        return <Retouch user={user} />
    } else {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }
}

function Retouch({ user }: { user: User }) {
    const router = useRouter();
    const [canSubmit, setCanSubmit] = useState(false);

    const form = useForm({
        initialValues: {
            username: user.username!,
            mailcom: user.mailcom!,
            phoneNumber: user.phoneNumber!,
        },
        validate: {
            username: isNotEmpty('Enter username'),
            mailcom: isNotEmpty('Enter mailcom'),
            phoneNumber: (value) => (/^\S+/.test(value)) ? null : 'Invalid phoneNumber'
          }
    })

    const submit = async (values: {
        username: string,
        mailcom: string,
        phoneNumber: string
    }) => {
        setCanSubmit(true)
        try {
            await patchUser({
                id: user.id, 
                username: values.username,
                mailcom: values.mailcom,
                phoneNumber: values.phoneNumber})
        } catch (e) {
            notifications.show({
                color: "red",
                message: "에러 발생!"
            })
        } finally {
            router.push("/admin")
        }
    }

    return (
        <Box maw={700} mx="auto">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Group mt="md">
                <TextInput
                    withAsterisk
                    label="학번-이름"
                    placeholder='10101-김모씨'
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="email"
                    placeholder='email'
                    {...form.getInputProps('mailcom')}
                />
                <TextInput
                    withAsterisk
                    label="phoneNubmer"
                    placeholder='phoneNumber'
                    {...form.getInputProps('phoneNumber')}
                />
            </Group>
            <Group justify="flex-end" mt="md">
              <Button loading={canSubmit} loaderProps={{ type: "dots" }} type="submit">수정하기</Button>
            </Group>
          </form>
        </Box>
    )
}

/**
 * username
 * rank
 * phoneNumber
 * mailcom
 */

