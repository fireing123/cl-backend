'use client'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SignUp() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const email = session?.user?.email;
    const [create, setCreate] = useState('잠시 기다려 주세요...')
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')

    useEffect(() => {
      fetch(`/api/users?email=${email}`)
        .then(async (res) => {
          const { has } = await res.json()
          if (!has) {
            const user = await fetch(`/api/users`, {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email
              })
            }).then(async (r) => await r.json())

            if (user.type) {
              router.push(callbackUrl || '/')
            } else {
              setCreate('이상한 에러')
            }
          } else {
            router.push(callbackUrl || '/')
          }
        })
    }, [callbackUrl, email, router])

    return (
      <div>
        {create}
      </div>
    )

}