'use client'
import { Image, Container,Button, Group } from '@mantine/core';


import classes from '@/components/welcome/welcome.module.css';
import { CLTitle, SubTextItems, SubTitle } from '@/components/public/welcome';
import SubText from '@/components/Welcome/SubText';


export default function Welcome() {

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          
          <CLTitle title={classes.title} highlight={classes.highlight} />

          <SubTitle />

          <SubText items={SubTextItems} />

          <Group mt={30}>
            <Button 
            component='a'
            radius="xl" 
            size="md" 
            className={classes.control}
            href='/application'>
              신청하기
            </Button>
          </Group>
        </div>
        <Image src={'/image.svg'} className={classes.image} alt='' />
      </div>
    </Container>
  );
}