
import { Button, Group, Paper, Text } from "@mantine/core"

import classes from './blogpage.module.css'
import { DeleteButton, PassButton } from "@/components/applicationButton";

export default async function Blog({ params }: { params: {id: string} }) {

    const app = await fetch(`${process.env.BLOB_URL}/api/application?id=${params.id}`)
        .then(async (res) => {
            const { name, title, fileId, email, phoneNumber, date } = await res.json()
            const md = await fetch(`/api/file?id=${fileId}`)
                .then(async (res) => await res.text())
            return {title, name, md, email, phoneNumber, date}
        })

    return (
        <div>
            {app &&
                <Paper radius="md" p="xl" withBorder className={classes.page} >
                <Group>
                    <h1>{app.title}</h1>
                    <div>{app.date}</div>
                </Group>
                <Group>
                    <Text>{app.email}</Text>
                    <Text>{app.phoneNumber}</Text>
                </Group>
                <div dangerouslySetInnerHTML={{__html: app.md}} />
                <Group>
                    <PassButton app={app} />
                    <DeleteButton app={app} />
                </Group>
            </Paper>}
        </div>
    )
}
