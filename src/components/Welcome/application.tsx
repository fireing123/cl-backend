'use client'
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import classes from './welcome.module.css';

export default function ApplicationButton() {
    const {status, data: session } = useSession();



    if (status === 'authenticated') {
        if (session.user.rank == 'person') {
            return <Button 
            component='a'
            radius="xl" 
            size="md" 
            className={classes.control}
            href='/application'>
              신청하기
            </Button>
        } else {

        }
    } else if (status === 'loading') {
        return <Button disabled>로딩중...</Button>
    } else {
        return <Button disabled>로그인 필요함</Button>
    }
}