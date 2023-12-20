import { DiscordIcon } from '@mantinex/dev-icons'
import classes from './SocialButtons.module.css';
import { Button, ButtonProps } from '@mantine/core';
export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
      <Button
        component="a"
        className={classes.discordButton}
        leftSection={<DiscordIcon style={{ width: '1rem', height: '1rem' }} />}
        {...props}
      />
    );
  }