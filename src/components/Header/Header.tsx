"use client"
import { signOut, useSession } from "next-auth/react";
import { Image } from "@mantine/core";
import cx from 'clsx';
import { useState } from 'react';
import {
    Button, 
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  rem,
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconPencil,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DiscordButton } from "../SocialButton/DiscordButton";

const tabs = [
    ['Home', '/'],
    ['Blog', '/blog'],
    ['Youtube', '/youtube'],
    ['members', '/members']
]




export default function Header() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab[0]} key={tab[0]} onClick={() => router.push(tab[1])}>
          {tab[0]}
        </Tabs.Tab>
      ));

    return (
      <div className={classes.header}>
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">

            <Link href={"/"}>
              <Image src="/main.svg" alt='Logo' width={50} height={40} />
            </Link>

            <DiscordButton href='https://discord.gg/tnYHHXVqfE'>Discord</DiscordButton>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              {session && <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened})}
                >
                  <Group gap={7}>
                    <Avatar src={session.user?.image} alt={session.user?.name || "username"} radius='xl' size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {session.user?.name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              }
              {!session && <Group>
                <Button component="a" href={'/login'}>Login</Button>
              </Group>}
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                  <Menu.Item component="a" href={'/mypage'}
                    leftSection={
                      <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                    >mypage</Menu.Item>
                  <Menu.Item onClick={() => signOut()}
                    leftSection={
                      <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >Logout</Menu.Item>
                  <Menu.Label>Blog</Menu.Label>
                  <Menu.Item component="a" href={'/blog/create'}
                    leftSection={
                      <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                  >Write</Menu.Item>

              </Menu.Dropdown>
                  
                </Menu>
              </Group>
            </Container>
            <Container size="md">
          <Tabs
            defaultValue=""
            variant="outline"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}