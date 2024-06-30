"use client"
import { getCafeteriaInfo } from "@/lib/data/school/cafeteria";
import { useEffect, useState } from "react";

export default function Cafeteria() {
    const [cafeteria, SetCafeteria] = useState<any[]>([]);

    useEffect(() => {
        getCafeteriaInfo().then(async (value) => {
            SetCafeteria(value)
        }).catch(() => {})
    }, [])

    if (cafeteria) {
        const row = cafeteria.map((value, i) => {
            return (
                <div key={i} dangerouslySetInnerHTML={{__html: value.DDISH_NM}} />
            )
        })
        return row
    } else return <div></div>
}