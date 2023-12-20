"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { KakaoBtn } from "@/styles/AuthStyle";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GithubButton } from "@/components/GithubButton";
import { GoogleButton } from "@/components/GoogleButton";
import classes from './login.module.css'
export default function Login() {
  const searchParams = useSearchParams();
  const sign = (provid: string) => {
    signIn(provid, { callbackUrl: searchParams.get('callbackUrl')! })
  }
  


  return (
    <Paper shadow="xl" radius="md" p="xl" withBorder className={classes.login}  >
      <Text size="lg" fw={500}>
        Welcome to CL, login with
      </Text>

      <Group grow mb="md" mt="md">
        <GithubButton radius="xl" onClick={() => sign("github")}>Github</GithubButton>
        <GoogleButton radius="xl" onClick={() => sign("google")}>Google</GoogleButton>
      </Group>
    </Paper>

   );
}