'use client'
import { ActionIcon, Group, rem, Image, Anchor } from '@mantine/core';
import classes from './Footer.module.css';
import { links } from '../public/footer';
import { IconBrandDiscord, IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';

  
export default function FooterLinks() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
      <Image src="/main.svg" alt='Logo' h={40} w={100} />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} href='https://discord.gg/tnYHHXVqfE' />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} href='https://github.com/fireice1234' />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} href='' />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}