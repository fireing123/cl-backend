"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function YoutubeList() {
    const [list, setList] = useState([]);
    useEffect(()=> {
        fetch(`/api/youtube`)
        .then(async value => {
            const list = await value.json()
            setList(list)
        })
    }, [])
    return (
        <ul>
            {list.map((value: any, i: any) => {

                return (
                    <div key={i}>
                        <div className="description">
                            <h2>{value.title}</h2>
                            <Link className="Youtube brand" href={`https://www.youtube.com/watch?v=${value.id}`}>들어가기</Link>
                        </div>
                        <div className="thumbnail">
                            <Image src={value.image} width={120} height={90} alt="youtube"/>
                        </div>
                    </div>
                )
            })}
        </ul>
    )
}