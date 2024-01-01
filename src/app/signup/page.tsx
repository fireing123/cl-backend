'use client'
import { Center, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SignUp() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const email = session?.user?.email;
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')

    useEffect(() => {
      if (status === "authenticated") {
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
              await fetch(`/api/users?image=${session.user?.image}`, {
                method: "PATCH"
              })

              router.push(callbackUrl || '/')
            } else {
              notifications.show({
                color: 'red',
                message: "error"
              })
              router.push('/')
            }
          } else {
            router.push(callbackUrl || '/')
          }
        })
      }
    }, [status])

    return (
      <Center>
        <Loader />
      </Center>
    )

}