'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Center, Loader} from '@mantine/core';
import { useEffect, useState } from 'react';
import { getApplication, getApplicationByUserId } from '@/lib/data/application/get';
import { Retouch } from '@/components/Application/retouch';
import { Application } from '@/types/types';
import { notifications } from '@mantine/notifications';

export default function Applicat() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [app, setApp] = useState<Application>();
    
    useEffect(() => {
        if (status == "authenticated") {
            getApplicationByUserId(session.user.userId)
                .then(async (ap) => {
                    const applic = await getApplication(ap.id!)
                    setApp(applic)
                }).catch((error) => {
                    notifications.show({
                        color: "red",
                        message: "신청서 생성하지 않음"
                    })
                    router.push("/admin/application")
                })
            }
    })

    if (app) {
        return <Retouch app={app} />
    } else {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }
}