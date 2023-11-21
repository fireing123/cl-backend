"use client"; // 필수!
import prisma from "@/lib/prisma";
import { PutBlobResult } from "@vercel/blob";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function MyPage() {
    const [values, setValues] = useState({
      name: "",
      nickname: "",
      image: "",
      rank: "",
    })
    const [name, setName] = useState("")
    const [nickname, setNickname] = useState("")

    const handleName = (e: any) => {
      setName(e.target.value);
    };
  
    const handleNickname = (e: any) => {
      setNickname(e.target.value);
    };

    const changeValues = (obj: any) => {
      let copy : any = {...values}
      let keys = Object.keys(obj)
      keys.forEach(key => {
        copy[key] = obj[key]
      })
      setValues({
        ...copy
      });
    };

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

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
    const email = session.user?.email

    fetch(`http://localhost:3000/api/users?email=${session.user?.email}`)
        .then(async res => {
            const user = await res.json();
            changeValues({
              name: user.name,
              nickname: user.nickname,
              image: user.image || "",
              rank: user.rank
            })
        })
     const Submit = async (event: any) => {
      event.preventDefault();
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }
      
      const file = inputFileRef.current.files[0];

      if (file.name.endsWith(".png")) {
        const response = await fetch(
          `/api/file?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );
          
        const newBlob = (await response.json()) as PutBlobResult;

        setBlob(newBlob);

        changeValues({
          image: blob?.url || values.image
        })
        prisma.user.update({
            where: {
                email: email!
            },
            data: {
                name: name || values.name,
                nickname: nickname || values.nickname,
                profilePic: blob?.url || values.image
            }
          })
      }
    }
    return (
      <div>
          <button onClick={() => signOut()}>로그 아웃</button>
        <form onSubmit={Submit}>
          프로필 사진
        {values.image && 
            <Image src={values.image} alt="image" width={50} height={50}/>}
            <input name="file" ref={inputFileRef} type="file" required />
          <p>이름: {values.name}
            <input name="name" type="text"
            value={name}
            onChange={handleName} />
          </p>
          <p>닉네임: {values.nickname}
          <input name="nickname" type="text" 
          value={nickname}
          onChange={handleNickname} />
          </p>
          <p>등급: {values.rank}</p>
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
        </div>
    )
}
