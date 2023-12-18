import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import AuthContext from '@/context/AuthContext'
import Floor from '@/components/floor'
import ThemeProviders from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '전일 고등학교 CL 동아리',
  description: '전일고의 CL 동아리 사이트',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
        <ThemeProviders>
        <AuthContext>
          <Floor />
          {children}
        </AuthContext>
        </ThemeProviders>
        </MantineProvider>
      </body>
    </html>
  )
}
