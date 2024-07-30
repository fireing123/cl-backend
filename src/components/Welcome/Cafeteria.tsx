"use client"
import { getCafeteriaInfo } from "@/lib/data/school/cafeteria";
import { useEffect, useState } from "react";

export function Cafeteria() {
    const [cafeteria, SetCafeteria] = useState<any[]>([]);

    useEffect(() => {
        getCafeteriaInfo().then((value) => SetCafeteria(value))
        .catch(() => SetCafeteria([null, {DDISH_NM:"<div>오늘 중식 없음!</div>"}]))
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
        getCafeteriaInfo().then((value) => SetCafeteria(value))
        .catch(() => SetCafeteria(["", "", {DDISH_NM:"<div>오늘 석식 없음!</div>"}]))
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