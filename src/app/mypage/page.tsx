"use client"; // 필수!
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function MyPage() {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div>
                <h2>당신은 로그인 하지 않았습니다</h2>
                <Link href=""></Link>
            </div>
        )
    } else {
        return (
            <div>마이 페이지
                <button onClick={() => signOut()}>로그 아웃</button>
                <div>
                    <p>hello {session.user?.name} </p>
                    <p> user email : {session.user?.email} </p>
                </div>
            </div>
        )
    }
}
