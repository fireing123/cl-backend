'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";

export default function SignUp() {

    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const [isLogin, SetIsLogin] = useState(false);

    useEffect(() => {
      if (status === "authenticated") {
        fetch(`/api/users`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email
        })
        }).then(async res => {
          const { type } = await res.json()
          SetIsLogin(type)
        })
      }
    }, [email, status])

    if (status === "loading") {
      return (
        <p>로딩중...</p>
      )
    } else if (status === "authenticated") {
      
      return (
        <>
        {!isLogin && <div>회원가입 중입니다 나가지 마세요!</div>}
        {isLogin && <div>가입 완료! 나가셔도 됩니다</div>}
        </>
      )
    } else if (status === "unauthenticated") {
      return (
        <>로그인 하세요</>
      )
    }
}