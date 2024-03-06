'use client'

import { Image, Container,Button, Group } from '@mantine/core';
import classes from '@/components/Welcome/welcome.module.css';
import { CLTitle, SubTextItems, SubTitle } from '@/components/public/welcome';
import SubText from '@/components/Welcome/SubText';
import ApplicationButton from '@/components/Welcome/application';


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
          </Group>
        </div>
        <Image src={'/image.svg'} className={classes.image} alt='' />
      </div>
    </Container>
  );
}