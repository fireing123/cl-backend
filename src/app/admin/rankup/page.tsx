'use client'
import { useState } from "react";
import { NativeSelect } from "@mantine/core";
import { patchUser } from "@/lib/data/user/patch";
import { getUserByEmail } from "@/lib/data/user/get";
import { Rank } from "@/types/types";

export default function Home() {
    const [email, setEmail] = useState('');
    const [rank, setRank] = useState<Rank>('person');
    const [update, setUpdate] = useState('slow');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = await getUserByEmail(email)
        const res = await patchUser({
            id: user.id,
            rank: rank
        })
        setUpdate(res.username || res.name + "의 현재 랭크: " + res.rank)
    }

  return (
    <div>
        <form onSubmit={submitData}>
            <input name="email" type="text" value={email} onChange={v => setEmail(v.target.value)}/>
            <NativeSelect 
                value={rank}
                onChange={(e) => setRank(e.currentTarget.value as Rank)}
                label="랭크"
                description="변경할 랭크 등급입니다"
                data={['observer', 'member', 'person']} />
            <input type='submit' value="SignUp"/>
        </form>
        {update}
    </div>
  )
}