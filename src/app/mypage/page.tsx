"use client"; // 필수!
import { User } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();

  if (status === "loading") return <p>로딩중...</p>
  else if (status === "unauthenticated") return <p>로그인하지 않음</p>

  const findUser = async (email: string) => {
    const user = await fetch(`/api/users?email=${email}`)
      .then(async res => {
        return await res.json();
      })
      console.log(user)
    setUser(user)
  }

  return (
    <div>
      <h1>내 정보 보기</h1>
      <button onClick={() => {findUser(session?.user?.email!)}}>확인하기</button>
      {user && 
      <div>
        <Image src={session?.user?.image!} alt="user image" width={50} height={50}/>
        <h3>{user.email}</h3>
        <p>{user.name}</p>
        <p>{user.rank}</p>
      </div>}
    </div>
  )
}
