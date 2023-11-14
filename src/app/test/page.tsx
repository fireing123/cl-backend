import { useSession, getSession } from "next-auth/react"

export default function Test() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denined</p>
    }
    
    return (
        <>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in.</p>
        </>
    )
}