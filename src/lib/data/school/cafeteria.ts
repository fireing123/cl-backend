
export async function getCafeteriaInfo() {
    const respone = await fetch(`/api/school/cafeteria?date=${new Date().toString()}`).then(async res => await res.json())
    if ('RESULT' in respone) {
        throw Error("급식 에러")
    } else {
        const row = respone.mealServiceDietInfo[1].row
        return row
    }
}