"use client"
import { getCafeteriaInfo } from "@/lib/data/school/cafeteria";
import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";

export function Cafeteria() {
    const [cafeteria, SetCafeteria] = useState<any[]>();

    useEffect(() => {
        getCafeteriaInfo().then((value) => {SetCafeteria(value)})
    }, [])

    if (cafeteria) {
        return (
            <>
                <Grid.Col span={6}>
                    <div>
                        중식
                        <br />
                        <div dangerouslySetInnerHTML={{__html: cafeteria[1].DDISH_NM}} />
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div>
                        중식
                        <br />
                        <div dangerouslySetInnerHTML={{__html: cafeteria[2].DDISH_NM}} />
                    </div>
                </Grid.Col>
            </>
        )
    } else return <div></div>
}