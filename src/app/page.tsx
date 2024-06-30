'use client'

import { Image, Container,Button, Group, Title } from '@mantine/core';
import classes from '@/components/Welcome/welcome.module.css';
import { CLTitle, SubTextItems, SubTitle } from '@/components/public/welcome';
import SubText from '@/components/Welcome/SubText';
import ApplicationButton from '@/components/Welcome/application';
import Cafeteria from '@/components/Welcome/Cafeteria';
import Schedule from '@/components/Welcome/Schedule';


export default function Welcome() {

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          
          <CLTitle title={classes.title} highlight={classes.highlight} />

          <SubTitle />

          <SubText items={SubTextItems} />

          <Group mt={30}>
            <ApplicationButton />
            <Title>무조건 크롬 브라우저로 로그인!!!</Title>
            <Title>디스코드는 합격하지 않아도 들어와도 됩니다.</Title>
            <Title>디스코드에서 동아리에 대해 질문하세요</Title>
          </Group>
        </div>
        <Cafeteria />
        <Schedule />
      </div>
    </Container>
  );
}