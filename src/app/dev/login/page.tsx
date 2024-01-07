"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Text, Paper, Group } from '@mantine/core';

import classes from './login.module.css'
import { DiscordButton } from "@/components/Auth/DiscordButton";

export default function Login() {
  const searchParams = useSearchParams();
  const sign = (provid: string) => {
    signIn(provid, { callbackUrl: searchParams.get('callbackUrl')! })
  }
  
  return (
    <Paper shadow="xl" radius="md" p="xl" withBorder className={classes.login}  >
      <Text size="lg" fw={500}>
        Welcome to dev-CL, login with
      </Text>

      <Group grow mb="md" mt="md">
        <DiscordButton radius="xl" onClick={() => sign("discord")}>Github</DiscordButton>
      </Group>
    </Paper>

   );
}