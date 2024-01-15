'use client'
import { SessionProvider } from "next-auth/react";

export function SessionLayout({ children }: any) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}