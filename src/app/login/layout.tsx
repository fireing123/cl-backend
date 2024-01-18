import { Metadata } from "next";

export const metadata: Metadata = {
    title: '로그인 페이지',
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