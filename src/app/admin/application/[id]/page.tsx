'use client'
import { Button, Group, Paper, Text } from "@mantine/core"
import classes from './blogpage.module.css'
import { PassButton } from "@/components/Application/applicationButton";
import { getApplication } from "@/lib/data/application/get";
import { useEffect, useState } from "react";
import { Application as TypeApplication } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Application({ params }: { params: {id: string} }) {
    const router = useRouter();
    const [app, setApp] = useState<TypeApplication>();

    useEffect(() => {
        getApplication(params.id)
            .then((res) => {
                setApp(res)
            }).catch((error) => {
                console.log(error)
                router.push("/admin/application")
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    return (
        <div>
 
            {app &&
                <Paper radius="md" p="xl" withBorder className={classes.page} >
                <Group>
                    <h1>{app.title}</h1>
                    <div>{app.name}</div>
                </Group>
                <Group>
                    <Text>{app.email}</Text>
                    <Text>{app.phoneNumber}</Text>
                </Group>
                <div dangerouslySetInnerHTML={{__html: app.html}} />
                <Group>
                <PassButton app={app} />
                </Group>
            </Paper>}
        </div>
    )    
}
