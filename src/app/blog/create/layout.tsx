import { Metadata } from "next";

export const metadata: Metadata = {
    title: '블로그 생성',
}
   
export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>{children}</>
    )
  }