
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const date = new Date(searchParams.get("date") || new Date())
    const respone = await fetch(`https://open.neis.go.kr/hub/SchoolSchedule?KEY=${process.env.NICE}&ATPT_OFCDC_SC_CODE=${process.env.ATPT_OFCDC_SC_CODE}&Type=json&SD_SCHUL_CODE=${process.env.SD_SCHUL_CODE}&pIndex=1&pSize=100&AA_FROM_YMD=${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}01&AA_TO_YMD=${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}31`).then(async res => await res.json())
    return NextResponse.json({
        ...respone,
        date: date.toDateString()
    })
}