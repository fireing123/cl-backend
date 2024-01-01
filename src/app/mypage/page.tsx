
'use client'
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconPhone } from '@tabler/icons-react';
import classes from './ContactUs.module.css';
import { User } from "@prisma/client";
import ContactIcon from "@/components/ContactIcons";
import { IconAt } from "@tabler/icons-react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export default function Mypage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/users?email=${session?.user?.email}`)
      .then(async res => {
        const user = await res.json() as User;
        setUser(user)
        setVisible(false)
      })
    }
  }, [session?.user?.email, status]) 
  
  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>My Page</Title>
          <br></br>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>
          <Skeleton visible={visible}>
            <ContactIcon icon={IconAt} title="email" description={user?.email} />
          </Skeleton>
          <br></br>
          <Group>
          <Skeleton visible={visible}>
            <ContactIcon icon={IconPhone} title="phone" description={user?.phoneNumber || "전화번호를 등록하지 않음"} />
          </Skeleton>
          </Group>
          <br></br>
          <Group>
            <Button  component="a" href="/mypage/blog">Blog</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );

  
}