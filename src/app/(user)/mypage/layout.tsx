import { Metadata } from "next";

export const metadata: Metadata = {
    title: '마이페이지',
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