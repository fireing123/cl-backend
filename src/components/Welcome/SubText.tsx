import { List, ThemeIcon, rem } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

export default function SubText({ items }: { items: string[] }) {
    return (
        <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
        >
            {items && items.map((value, i) => {
                const [title, text] = value.split('#')
                return (
                    <List.Item key={i}>
                      <b>{title}</b> – {text}
                    </List.Item>
                )
            })}
        </List>
    )
}

