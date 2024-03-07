'use client'
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import classes from './welcome.module.css';

import { useEffect, useState } from "react";
import { getApplicationInfo } from "@/lib/data/application/get";

export default function ApplicationButton() {
    const {status, data: session } = useSession();
    const [hasApp, setHasApp] = useState<"undefined" | "submit">("undefined");
    console.log(hasApp, status)
    useEffect(() => {
        if (status == "authenticated") {
            try {
                getApplicationInfo(session.user.userId)
                    .then(async (post) => {
                        console.log(post)
                        if (post.id){
                            setHasApp("submit")
                        }

                })
            } catch (error) {
                setHasApp("undefined")
            }  
        }
    }, [status])

    if (status === 'authenticated') {
        if (session.user.rank == 'person') {
            if (hasApp == "submit") {
                return <Button 
                component='a'
                radius="xl" 
                size="md" 
                className={classes.control}
                href='/application'>
                    수정하기
                </Button>
            } else {
                return <Button 
                component='a'
                radius="xl" 
                size="md" 
                className={classes.control}
                href='/application'>
                  신청하기
                </Button>
            }
        } else if (session.user.rank == 'admin') {
            return <Button 
            component='a'
            radius="xl" 
            size="md" 
            className={classes.control}
            href='/admin'>
                관리하기
            </Button>
        } else {
            return <Button 
            component='a'
            radius="xl" 
            size="md" 
            className={classes.control}
            href='/youtube'>
                둘러보기
            </Button>
        }
    } else if (status === 'loading') {
        return <Button disabled>로딩중...</Button>
    } else {
        return <Button disabled>신청시 로그인 필요함</Button>
    }
}