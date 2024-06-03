import { Button, ButtonProps } from '@mantine/core';
import { DiscordIcon } from '@mantinex/dev-icons';

export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Button
    component='a'
      leftSection={<DiscordIcon style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}