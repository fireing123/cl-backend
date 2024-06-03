"use client";
import { useSearchParams } from "next/navigation";
import { Text, Paper, Group } from '@mantine/core';

import { GithubButton } from "@/components/Auth/GithubButton";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import classes from './login.module.css'
import { signIn } from "next-auth/react";

export default function Login() {
  const searchParams = useSearchParams();
  return (
    <Paper shadow="xl" radius="md" p="xl" withBorder className={classes.login}  >
      <Text size="lg" fw={500}>
        회원 가입은 생략합니다
        두번쨰 로그인시 처음 로그인한 sns 으로 로그인해야 합니다!
      </Text>

      <Group grow mb="md" mt="md">
        <GithubButton radius="xl" onClick={() => signIn("github", { redirectTo: searchParams.get('callbackUrl') || "/" }) }>Github</GithubButton>
        <GoogleButton radius="xl" onClick={() => signIn("google", { redirectTo: searchParams.get('callbackUrl') || "/" }) }>Google</GoogleButton>
      </Group>
    </Paper>

   );
}