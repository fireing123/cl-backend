import { FetchError } from "@/types/types"
import { NextResponse } from "next/server"

export default function ApiError(fetcherror: FetchError) {
    return NextResponse.json(fetcherror)
}