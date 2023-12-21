import './globals.css'
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Notifications } from '@mantine/notifications';
import { MantineProvider, createTheme } from '@mantine/core';

import AuthContext from '@/context/AuthContext'
import Floor from '@/components/floor'
import ThemeProviders from '@/components/providers'
import { FooterLinks } from '@/components/FooterLinks';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '전일 고등학교 CL 동아리',
  description: '전일고의 CL 동아리, 코딩 학습을 기반으로 기초, 심화 문제를 탐구하는 동아리 컴퓨터공학, SW공학, AI등에 관심 있는 학생 환영',
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  keywords: "전일고, 전일고등학교, 동아리, CL, 코딩, 전주"
}

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className}>
        <MantineProvider theme={theme} >
        <ThemeProviders>
        <AuthContext>
          <Notifications />
          <Floor />
          {children}
          <FooterLinks />
        </AuthContext>
        </ThemeProviders>
        </MantineProvider>
      </body>
    </html>
  )
}
