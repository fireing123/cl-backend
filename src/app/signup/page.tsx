'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignUp() {

    const router = useRouter()
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const { data: session, status } = useSession();
    const email = session?.user?.email

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        const { has } : any = await fetch(`/api/users?email=${email}`, {
          method: "GET"})
        if (!has) {
          fetch(`/api/users`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email
          })
          })
        }
    }    

    return (
        <div>
            <form onSubmit={submitData}>
                <p>로그인한 상태여야함</p>
                <input type='submit' value="SignUp"/>
            </form>
        </div>
    )
}