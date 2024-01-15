'use client'
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterLinks.module.css';

const data = [
    {
      title: 'About',
      links: [
        { label: 'Features', link: '#' },
        { label: 'Pricing', link: '#' },
        { label: 'Support', link: '#' },
        { label: 'Forums', link: '#' },
      ],
    },
    {
      title: 'Project',
      links: [
        { label: 'Contribute', link: '#' },
        { label: 'Media assets', link: '#' },
        { label: 'Changelog', link: '#' },
        { label: 'Releases', link: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Join Discord', link: 'https://discord.gg/DbmcPRDNTD' }
      ],
    },
  ];
  
  export function FooterLinks() {
    const groups = data.map((group) => {
      const links = group.links.map((link, index) => (
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
          {links}
        </div>
      );
    });
  
    return (
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            <MantineLogo size={30} />
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
  
        
        </Container>
      </footer>
    );
  }