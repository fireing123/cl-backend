"use client";
import { Left, Right } from "@/styles/LeftRight";
import Link from "next/link";

export function LinkItem({ name, url, date }: {name: string, url:string, date: string}) {
    return (
        <td data-title={name}>
            <Link href={url}>{date}</Link>
        </td>
    )
}