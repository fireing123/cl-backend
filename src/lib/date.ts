import { DateTime } from "luxon"

export function KDate() {
    const koreanDateTime = DateTime.now().setZone('Asia/Seoul');
    return new Date(koreanDateTime.toFormat('yyyy-MM-dd HH:mm:ss'));
}