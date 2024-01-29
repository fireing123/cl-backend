
import { Button, Group, Paper, Text } from "@mantine/core"

import classes from './blogpage.module.css'
import { DeleteButton, PassButton } from "@/components/Application/applicationButton";
import { getApplication } from "@/lib/data/application/get";

export default async function Application({ params }: { params: {id: string} }) {
    try {
        const application = await getApplication(params.id)
        return (
            <div>
                {application &&
                    <Paper radius="md" p="xl" withBorder className={classes.page} >
                    <Group>
                        <h1>{application.title}</h1>
                        <div>{application!.date?.toISOString()}</div>
                    </Group>
                    <Group>
                        <Text>{application.email}</Text>
                        <Text>{application.phoneNumber}</Text>
                    </Group>
                    <div dangerouslySetInnerHTML={{__html: application.html}} />
                    <Group>
                        <PassButton app={application} />
                        <DeleteButton app={application} />
                    </Group>
                </Paper>}
            </div>
        )
    } catch (error) {
        return (
            <div>잘못된 id</div>
        )
    }

    
}
