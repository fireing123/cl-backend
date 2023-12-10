'use client'
import Link from "next/link";
import { useState } from "react";

export default function Home() {

    const [email, setEmail] = useState('');
    const [rank, setRank] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await fetch('/api/users', {
            method: "PATCH",
            body: JSON.stringify({
                email,
                rank
            })
        })
    } 

  return (
    <div>
        <form onSubmit={submitData}>
            <input name="email" type="text" value={email} onChange={v => setEmail(v.target.value)}/>
            <input name="rank" type="text" value={rank} onChange={v => setRank(v.target.value)}/>        
            <input type='submit' value="SignUp"/>
        </form>
    </div>
  )
}