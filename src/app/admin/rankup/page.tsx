'use client'
import Link from "next/link";
import { useState } from "react";
import { NativeSelect } from "@mantine/core";

export default function Home() {
    const [email, setEmail] = useState('');
    const [rank, setRank] = useState('');
    const [update, setUpdate] = useState('slow');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const res = await fetch('/api/users', {
            method: "PATCH",
            body: JSON.stringify({
                email,
                rank
            })
        })
        const dat = await res.text()
        setUpdate(dat)
    }

  return (
    <div>
        <form onSubmit={submitData}>
            <input name="email" type="text" value={email} onChange={v => setEmail(v.target.value)}/>
            <NativeSelect 
                value={rank}
                onChange={(e) => setRank(e.currentTarget.value)}
                label="랭크"
                description="변경할 랭크 등급입니다"
                data={['observer', 'member', 'person']} />
            <input type='submit' value="SignUp"/>
        </form>
        {update}
    </div>
  )
}