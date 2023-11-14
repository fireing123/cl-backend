"use client"; // 필수!
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
/**id: string;
    email: string;
    nickname: string;
    name: string;
    rank: string;
    postsId: string[];
    profilePic: string | null;
    posts: string[]; */
export default function MyPage() {
    const [user, setUser] = useState<any>();
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div>로딩중...</div>
        )
    } else if (!session) {
        return (
            <div>
                <h2>당신은 로그인 하지 않았습니다</h2>
                <Link href=""></Link>
            </div>
        )
    }
    fetch("/api/users", {
        method: "GET",
        body: JSON.stringify({
            email: session?.user?.email
        })
    }).then(async value => {
        const user = await value.json()
        setUser(user)
    })
    if (user?.has) {
        return (
            <div>마이 페이지
                <button onClick={() => signOut()}>로그 아웃</button>
                <div>
                    <Image src={user?.image} alt="pro"/>
                    <p>db test: {user.rank} </p>
                    <p>hello {session.user?.name} </p>
                    <p> user email : {session.user?.email} </p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => signOut()}>로그 아웃</button>
                당신은 계정을 생성하지 않았습니다
            </div>
        )
    }
}
