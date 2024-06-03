import { Button, ButtonProps } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Button
      component='a'
      leftSection={<GithubIcon style={{ width: '1rem', height: '1rem' }} color="#00ACEE" />}
      {...props}
    />
  );
}