
export async function getSchoolScheduleInfo() {
    const respone = await fetch(`/api/school/schedule?date=${new Date().toString()}`).then(async res => await res.json())
    if ('RESULT' in respone) {
        throw Error("스케줄 에러")
    } else {
        const row = respone.SchoolSchedule[1].row
        return row
    }
}