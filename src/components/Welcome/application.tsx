'use client'
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { application } from "../../config"
import classes from './welcome.module.css';

import { useEffect, useState } from "react";
import { getApplicationByUserId, getApplicationInfo } from "@/lib/data/application/get";
import { error } from "console";

export default function ApplicationButton() {
    const {status, data: session } = useSession();
    const [hasApp, setHasApp] = useState<"loading" | "undefined" | "submit">("loading");
    useEffect(() => {
        if (status == "authenticated") {
            getApplicationByUserId(session.user.userId)
                .then(async (post) => {
                    setHasApp("submit")
                }).catch((error) => {
                    console.log(error)
                    setHasApp("undefined")
                })
 
        }
    }, [status])

    if (status === 'authenticated') {
        if (session.user.rank == 'person') {
            if (hasApp == 'loading') {
                return <Button disabled>신청 유무 확인중...</Button>
            } else if (hasApp == "submit") {
                return <Button 
                component='a'
                radius="xl" 
                size="md" 
                className={classes.control}
                href='/application/retouch'>
                    수정하기
                </Button>
                
            } else {
                if (application) {
                    return <Button 
                component='a'
                radius="xl" 
                size="md" 
                className={classes.control}
                href='/application'>
                  신청하기
                  </Button>
                } else {
                    return <Button disabled>모집이 끝났습니다</Button>
                }
                
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