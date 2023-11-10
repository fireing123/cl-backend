'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignUp() {

    const { data: session, status } = useSession();

    const router = useRouter();

    if (!session && status !== "loading") {
      router.push("/")
    }

    const email = session?.user?.email

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(name, email, nickname)
        try {
            const body = { name, nickname, email }
            const result = await fetch(`/api/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            console.log(await result.json())
            router.push('/mypage')
        } catch (error) {
            console.error(error)
        }
    }    

    return (
        <div>
            <form onSubmit={submitData}>
                <h1>Set Name</h1>
                <input 
                  autoFocus 
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  type='text'
                  value={name}
                />
                <input
                  onChange={(e => setNickname(e.target.value))}
                  placeholder='NickName'
                  type='text'
                  value={nickname}
                />
                <input disabled={!name || !nickname} type='submit' value="SignUp"/>
            </form>
            <button onClick={() => signOut({ callbackUrl: "/" })}>Cancel</button>
        </div>
    )
}