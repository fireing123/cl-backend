
export async function getSchoolScheduleInfo() {
    const respone = await fetch("/api/school/schedule").then(async res => await res.json())
    if ('RESULT' in respone) {
        throw Error(respone.RESULT)
    } else {
        const row = respone.SchoolSchedule[1].row
        return row
    }
}