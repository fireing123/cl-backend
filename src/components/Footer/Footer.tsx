'use client'
import { Text, Container, ActionIcon, Group, rem, RemoveScroll, Image } from '@mantine/core';
import classes from './Footer.module.css';
import { DiscordButton } from '../SocialButton/DiscordButton';
import { links } from '../public/footer';

  
  export default function FooterLinks() {
    const groups = links.map((group) => {
      const footerLink = group.links.map((link, index) => (
        <Text<'a'>
          key={index}
          className={classes.link}
          component="a"
          href={link.link}
        >
          {link.label}
        </Text>
      ));
  
      return (
        <div className={classes.wrapper} key={group.title}>
          <Text className={classes.title}>{group.title}</Text>
          {footerLink}
        </div>
      );
    });
  
    return (
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            <Image src="/main.svg" alt='Logo' />
            <Text size="xs" c="dimmed" className={classes.description}>
              Build fully functional accessible web applications faster than ever
            </Text>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            © 2024 jeonil.vercel.app. All rights reserved.
          </Text>
            <div className={classes.social}>
              <DiscordButton href='https://discord.gg/DbmcPRDNTD'>Join Discord community</DiscordButton>
            </div>
        </Container>
      </footer>
    );
  }