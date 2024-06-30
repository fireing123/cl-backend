import { KDate } from "@/lib/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const date = KDate()
    const respone = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NICE}&ATPT_OFCDC_SC_CODE=${process.env.ATPT_OFCDC_SC_CODE}&Type=json&SD_SCHUL_CODE=${process.env.SD_SCHUL_CODE}&pIndex=1&pSize=100&MLSV_YMD=${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}${String(date.getDay()).padStart(2, "0")}`).then(async res => await res.json())
    return NextResponse.json({
        ...respone
    })
}