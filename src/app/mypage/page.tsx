
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

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export default function Mypage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/users?email=${session?.user?.email}`)
      .then(async res => {
        const user = await res.json() as User;
        setUser(user)
      })
    }
  }, [session?.user?.email, status]) 
  
  if (status === "authenticated" && user != null) {
    return (
      <div className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title className={classes.title}>My Page</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text>
            <ContactIcon icon={IconAt} title="email" description={user.email} />
            <Group>
            <ContactIcon icon={IconPhone} title="phone" description={user.phoneNumber || "전화번호를 등록하지 않음"} />
            </Group>
            <Group>
              <Button component="a" href="/mypage/blog">Blog</Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
    );
  } else {
    return (
      <div>
        로그인 기다림
      </div> 
    )
  }
  
}