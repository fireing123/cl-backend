"use client"
import { getCafeteriaInfo } from "@/lib/data/school/cafeteria";
import { useEffect, useState } from "react";

export function Cafeteria() {
    const [cafeteria, SetCafeteria] = useState<any[]>([]);

    useEffect(() => {
        getCafeteriaInfo().then(async (value) => {
            SetCafeteria(value)
        }).catch(() => {})
    }, [])
    if (cafeteria.length != 0) {
        return (
            <div>
                중식
                <br />
                <div dangerouslySetInnerHTML={{__html: cafeteria[1].DDISH_NM}} />
            </div>
        )
    } else return <div></div>
}

export function BCafeteria() {
    const [cafeteria, SetCafeteria] = useState<any[]>([]);

    useEffect(() => {
        getCafeteriaInfo().then(async (value) => {
            SetCafeteria(value)
        }).catch(() => {})
    }, [])

    if (cafeteria.length != 0) {
        return (
            <div>
                석식
                <br />
                <div dangerouslySetInnerHTML={{__html: cafeteria[2].DDISH_NM}} />
            </div>
        )
    } else return <div></div>
}