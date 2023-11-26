"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';

export default function Floor() {
    const { data: session, status } = useSession();

    return (
        <div className="navbar">
        <Link href="/">
            <Image 
                src="/images/kakao_logo.png" 
                alt="lo"
                width={20}
                height={20}/>
        </Link>
        <Link href="/modify">목록</Link>
        <Link href="/youtube">추천</Link>
        <Link href={"/mypage"}>{session?.user?.name}</Link>
        <Image src={session?.user?.image!} alt="user" width={30} height={30}/>
    </div>
    )
}