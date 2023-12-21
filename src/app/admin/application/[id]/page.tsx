'use client'
import { useEffect, useState } from "react"

import { notifications } from '@mantine/notifications';
import { Button, Group, Paper, Text } from "@mantine/core"

import classes from './blogpage.module.css'

export default function Blog({ params }: { params: {id: string} }) {
    const [app, setApp] = useState<{ title: string, md: string, email: string, phoneNumber: string, date: string} | null>(null);
    useEffect(() => {
        fetch(`/api/application?id=${params.id}`)
            .then(async (res) => {
                const { title, url, email, phoneNumber, date } = await res.json()
                const mdRes = await fetch(url)
                const md = await mdRes.text()
                setApp({title, md, email, phoneNumber, date})
            })
    }, [params.id])

    return (
        <div>
            {app &&
                <Paper radius="md" p="xl" withBorder className={classes.page} >
                <Group>
                    <h1>title : {app.title}</h1>
                    <div>{app.date}</div>
                </Group>
                <Group>
                    <Text>{app.email}</Text>
                    <Text>{app.phoneNumber}</Text>
                </Group>
                <div dangerouslySetInnerHTML={{__html: app.md}} />
                <Group>
                    <Button onClick={async () => {
                        const res = await fetch(`/api/users?email=${app.email}`)
                        const user = await res.json()
                        if (user.has) {
                            let rank = "member"
                        if (user.rank != "person") {
                            rank = user.rank
                        }
                        console.log('ee')
                        const res = await fetch('/api/users', {
                            method: "PATCH",
                            body: JSON.stringify({
                                email: app.email,
                                rank: rank,
                                phoneNumber: app.phoneNumber
                            })})
                        const { type } = await res.json();
                            if (type) {
                                notifications.show({
                                    title: "정상 합격처리 되셨습니다",
                                    message: "이 유저는 이제 CL 동아리 멤버입니다!"
                                })
                            } else {
                                notifications.show({
                                    color: "red",
                                    title: "예상지 못한 에러",
                                    message: "어떤 에러인지 모릅니다!"
                                })
                            }

                        } else {
                            notifications.show({
                                color: 'red',
                                title: "Undefined User",
                                message: "이 이메일은 회원 가입을 진행하지 않았습니다!"
                            })
                        }}}>합격</Button>
                </Group>
            </Paper>}
        </div>
    )
}
