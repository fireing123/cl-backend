'use client'
import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './welcome.module.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Welcome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log(session?.user)
  }
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            전일고 <span className={classes.highlight}>코딩</span> 동아리 <br /> Computer Language 동아리
          </Title>
          <Text c="dimmed" mt="md">
            코딩 학습을 기반으로 기초, 심화 문제를 탐구하는 동아리
            컴퓨터공학, SW공학, AI등에 관심 있는 학생 환영
          </Text>
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
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all components and hooks
              export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
              any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button 
            radius="xl" 
            size="md" 
            className={classes.control}
            onClick={() => router.push('/application')}>
              신청하기
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} alt='' />
      </div>
    </Container>
  );
}