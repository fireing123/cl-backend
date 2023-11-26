

export default async function envFetch(url: string) {
    return await fetch(`${process.env.NEXTAUTH_URL}${url}`)
}