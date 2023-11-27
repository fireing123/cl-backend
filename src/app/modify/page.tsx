"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function List() {

    const [list, setList] = useState([]);
    useEffect(() => {
        fetch("/api/post").then(async (res) => {
            setList((await res.json()).posts)
        })
    }, [])
    return (
        <ul>{list.map((value: any, i: any) => {
            return (
                <div key={i}>
                    <Link href={`/modify/${value.id}`}>{value.title}</Link>
                </div>
            )
        })}</ul>
    )
}