'use client'
import { Group, Container, Grid, SimpleGrid } from '@mantine/core';
import classes from '@/components/Welcome/welcome.module.css';
import { CLTitle, SubTextItems, SubTitle } from '@/components/public/welcome';
import SubText from '@/components/Welcome/SubText';
import ApplicationButton from '@/components/Welcome/application';
import { Cafeteria ,BCafeteria} from '@/components/Welcome/Cafeteria';
import Schedule from '@/components/Welcome/Schedule';

export default function Welcome() {
  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <div className={classes.inner}>
            <div className={classes.content}>

              <CLTitle title={classes.title} highlight={classes.highlight} />

              <SubTitle />

              <SubText items={SubTextItems} />

              <Group mt={30}>
                <ApplicationButton />
              </Group>
            </div>
          </div>
        <Grid gutter="md">
          <Grid.Col>
            <Schedule />
          </Grid.Col>
          <Grid.Col span={6}>
            <Cafeteria />
          </Grid.Col>
          <Grid.Col span={6}>
            <BCafeteria />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}