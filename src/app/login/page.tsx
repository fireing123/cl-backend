"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { KakaoBtn } from "@/styles/AuthStyle";
import Link from "next/link";

export default function Login() {
  return (
    <div className="loginbar">
      <KakaoBtn onClick={() => signIn("github", { callbackUrl: "/" })}>
        <Image
          src="/images/kakao_logo.png"
          alt="kakao-login"
          width={20}
          height={20}
        />
        <a>임시 깃호부 로그인</a>
      </KakaoBtn>
      <KakaoBtn onClick={() => signIn("google", { callbackUrl: "/" })}>
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