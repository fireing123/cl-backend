"use client"
import { useSession } from "next-auth/react";
import Link from 'next/link';

export default function Floor() {
    const { data: session, status } = useSession();

    let message = "Sign In"
    let path = "/login"
    if (status === "authenticated" && true) {
        message = "My Page"
        path = "/mypage"   
    }

    return (
        <div className="navbar">
        <Link href="/">홈</Link>
        <Link href="/list">목록</Link>
        <Link href={path}>{message}</Link>
    </div>
    )
}