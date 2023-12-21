import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

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
import envFetch from "@/lib/envfetch";
import { User } from "@prisma/client";
import ContactIcon from "@/components/ContactIcons";
import { IconAt } from "@tabler/icons-react";

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export default async function ContactUs() {
  const session = await getServerSession(authOptions)

  if (session) {
    const user = (await envFetch(`/api/users?email=${session?.user?.email}`)
      .then(async res => {
        return await res.json();
      })) as User

      
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
          <ContactIcon icon={IconPhone} title="phone" description={user.phoneNubmer || "전화번호를 등록하지 않음"} />
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
  }
}