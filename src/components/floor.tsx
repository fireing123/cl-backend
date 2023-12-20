"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';
import cx from 'clsx';
import { useState } from 'react';
import {
    Button, ButtonProps,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconPencil,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useRouter } from "next/navigation";
import RootLayout from "@/app/layout";



const tabs = [
    ['Home', '/'],
    ['Blog', '/blog'],
    ['Youtube', '/youtube']
]




export default function Floor() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
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

            <MantineLogo size={28} />

            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened})}
                >
                  {session && <Group gap={7}>
                    <Avatar src={session.user?.image} alt={session.user?.name || "username"} radius='xl' size={20} />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {session.user?.name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>}
                </UnstyledButton>
              </Menu.Target>
                {!session && <Group visibleFrom="sm">
                  <Button onClick={() => router.push('/login?callbackUrl=/signup')} >Login</Button>
                </Group>}
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                  <Menu.Item onClick={() => router.push('/mypage')}
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
                  <Menu.Item onClick={() => router.push('/blog/create')}
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
            defaultValue="Home"
            variant="outline"
            visibleFrom="sm"
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

/**<Link href="/">
            <
        </Link>
        <Link href="/blog">목록</Link>
        <Link href="/youtube">추천</Link>
        <Link href={"/mypage"}>{session?.user?.name}</Link>
        <Image src={session?.user?.image!} alt="user" width={30} height={30}/> */