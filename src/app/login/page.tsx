"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { KakaoBtn } from "@/styles/AuthStyle";
import Link from "next/link";

export default function Login() {
  return (
    <div className="loginbar">
      <KakaoBtn onClick={() => LogInCheck("github")}>
        <Image
          src="/images/kakao_logo.png"
          alt="kakao-login"
          width={20}
          height={20}
        />
        <a>임시 깃호부 로그인</a>
      </KakaoBtn>
      <button onClick={() => signIn()} >로그인</button>
      <Link href="/signup">Sign Up</Link>
    </div>
   );
}

async function LogInCheck(type: string) {
  
  signIn(type, { callbackUrl: "/" })

  const { data: session, status } = useSession();
  
  const email = session?.user?.email

  const { has } : any = await fetch("/api/users/check", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email
    })
  })

  if (!has) {
    signOut({callbackUrl: "/login" })
  }
}