import { deleteApplication } from "@/lib/data/application/del"
import { getUserById } from "@/lib/data/user/get"
import { patchUser } from "@/lib/data/user/patch"
import { Application, Rank } from "@/types/types"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useState } from "react"



export function PassButton({ app }: { app: Application }) {
    const [wait, setWait] = useState(false);
    return (<>
    <Button onClick={async () => {
        try {
            const deleted = await deleteApplication(app.id!)
            notifications.show({
                title: "삭제됨",
                message: `${deleted.name}의 ${deleted.title}은 정상적으로 삭제되었습니다`
            })
        } catch (error) {
            notifications.show({
                color: "red",
                title: "오류발생",
                message: `error message: \"${error}\"`
            })
        }
    }} loading={wait} loaderProps={{ type: "dots" }} >삭제</Button>
    <Button onClick={async () => {
        const user = await getUserById(app.userId!)
        if (user) {
            let rank = "member" as Rank
            if (user.rank != "person") {
                rank = user.rank
            }

            try {
                await patchUser({
                    id: app.userId!,
                    rank: rank,
                    username: app.name,
                    phoneNumber: app.phoneNumber
                })



                notifications.show({
                    title: "정상 합격처리 되셨습니다",
                    message: "이 유저는 이제 CL 동아리 멤버입니다!"
                })
            } catch (error) {
                notifications.show({
                    color: "red",
                    title: "오류발생",
                    message: `error message \"${error}\"`
                })
            }
        } else {
            notifications.show({
                color: 'red',
                title: "Undefined User",
                message: "이 이메일은 회원 가입을 진행하지 않았습니다!"
            })
        }
    }} loading={wait} loaderProps={{ type: "dots" }} >합격</Button></>)
}