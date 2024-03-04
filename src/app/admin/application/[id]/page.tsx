'use client'
import { Button, Group, Paper, Text } from "@mantine/core"
import classes from './blogpage.module.css'
import { DeleteButton, PassButton } from "@/components/Application/applicationButton";
import { getApplication } from "@/lib/data/application/get";
import { useEffect, useState } from "react";
import { Application } from "@/types/types";

export default function Application({ params }: { params: {id: string} }) {

    const [app, setApp] = useState<Application>();

    useEffect(() => {
        getApplication(params.id)
            .then((res) => {
                setApp(res)
            })
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
                <DeleteButton app={app} />
                </Group>
            </Paper>}
        </div>
    )    
}
