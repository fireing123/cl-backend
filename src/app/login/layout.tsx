import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: '로그인 페이지',
}

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <Suspense>
        {children}
      </Suspense>
    )
  }