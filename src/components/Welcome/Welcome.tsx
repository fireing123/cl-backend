'use client'
import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './welcome.module.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CLTitle, SubTextItems, SubTitle } from '../public/welcome';
import SubText from './SubText';

export default function Welcome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          
          <CLTitle title={classes.title} highlight={classes.highlight} />

          <SubTitle />

          <SubText items={SubTextItems} />

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