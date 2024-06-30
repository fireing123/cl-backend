
export async function getCafeteriaInfo() {
    const respone = await fetch("/api/school/cafeteria").then(async res => await res.json())
    if ('RESULT' in respone) {
        throw Error(respone.RESULT)
    } else {
        const row = respone.mealServiceDietInfo[1].row
        return row
    }
}