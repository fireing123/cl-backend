import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'CL | Youtube',
}
   
export default async function YoutubeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>{children}</>
    )
  }