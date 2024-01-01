

export default async function envFetch(url: string, setting?: any) {
    return await fetch(`${process.env.NEXTAUTH_URL}${url}`, setting)
}
