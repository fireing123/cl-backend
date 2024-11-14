import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const date = new Date(searchParams.get("date") || new Date())
    const respone = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NICE}&ATPT_OFCDC_SC_CODE=${process.env.ATPT_OFCDC_SC_CODE}&Type=json&SD_SCHUL_CODE=${process.env.SD_SCHUL_CODE}&pIndex=1&pSize=100&MLSV_YMD=${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`).then(async res => await res.json())
    if ("mealServiceDietInfo" in respone) {
        if ("head" in respone.mealServiceDietInfo[0]) {
            if (respone.mealServiceDietInfo[0].head[1].RESULT.CODE == "INFO-000") {
                return NextResponse.json({
                    row: respone.mealServiceDietInfo[1].row,
                    date: date.toDateString()
                })
            }
        }
    }

    return NextResponse.json({
        row: [
            {
                DDISH_NM: "없음."
            },
            {
                DDISH_NM: "없음."
            },
            {
                DDISH_NM: "없음."
            }
        ],
        date: date.toDateString()
    })
}