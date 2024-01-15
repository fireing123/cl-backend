"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Center, Loader } from '@mantine/core';
import classes from './ArticlesCardsGrid.module.css';




export default function YoutubeList() {
    const { data: session, status } = useSession();
    const [list, setList] = useState([]);

    useEffect(()=> {
        fetch(`/api/youtube`)
        .then(async value => {
            const list = await value.json()
            setList(list)
        })
    }, [])
    if (status === "authenticated") {
        return (
            <Container py="xl">
                <SimpleGrid cols={{ base: 1, sm: 2}}>{list.map((value: any, i: any) => {
                    return (
                        <Card key={i} p="md" radius="md" component="a" href={`https://www.youtube.com/watch?v=${value.id}`} className={classes.card}>
                            <AspectRatio ratio={1920 / 1080}>
                                <Image src={value.image.url} alt="youtube image" />
                            </AspectRatio>
                            <Text mt={5}>
                                {value.title}
                            </Text>
                        </Card>
                    )
                })}
                </SimpleGrid>
            </Container>
        )
    } else if (status == "unauthenticated") {
        return <div>로그인이 필요한 페이지입니다.</div>
    } else {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }
}