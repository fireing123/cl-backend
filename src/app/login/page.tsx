"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { KakaoBtn } from "@/styles/AuthStyle";

export default function KakaoLogin() {
  return (
    <div className="loginbar">
      <KakaoBtn onClick={() => LogInCheck("kakao")}>
        <Image
          src="/images/kakao_logo.png"
          alt="kakao-login"
          width={20}
          height={20}
        />
        <a>카카오 로그인</a>
      </KakaoBtn>
      <button onClick={() => signIn(undefined, { callbackUrl: "/signup" })}>Sign Up</button>
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