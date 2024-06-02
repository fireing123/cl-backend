
'use client'
import {
  Text,
  Title,
  SimpleGrid,
  Button,
  Group,
  Avatar,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconPhone } from '@tabler/icons-react';
import classes from './ContactUs.module.css';
import ContactIcon from "@/components/ContactIcons/ContactIcons";
import { IconAt } from "@tabler/icons-react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';
import { getUserDetails } from '@/lib/data/user/get';
import { User } from '@/types/types';

export default function Mypage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (status === "authenticated") {
      getUserDetails(session.user.userId)
        .then((user) => {
          setUser(user)
          setVisible(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]) 
  
  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
        <Title className={classes.title}>My Page</Title>
        <br></br>
        <Avatar
          src={session?.user.image}
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {user?.username || "이름이 등록되지않음"}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {user?.name} • {user?.rank}
        </Text>

        
          <Skeleton visible={visible}>
            <ContactIcon icon={IconAt} title="email" description={session?.user?.email} />
          </Skeleton>
          <br></br>
          <Group>
          <Skeleton visible={visible}>
            <ContactIcon icon={IconPhone} title="phone" description={user?.phoneNumber || "전화번호를 등록하지 않음"} />
          </Skeleton>
          </Group>
          <br></br>
        </div>
      </SimpleGrid>
        <Group>
          <Button  component="a" href="/mypage/blog">Blog</Button>
        </Group>
    </div>
  );

  
}