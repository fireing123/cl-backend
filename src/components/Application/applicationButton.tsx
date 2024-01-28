import { Application } from "@/types/types"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"

export async function PassButton({ app }: { app: Application }) {
    return <Button onClick={async () => {
        const res = await fetch(`/api/users?email=${app.email}`)
        const user = await res.json()
        if (user.has) {
            let rank = "member"
        if (user.rank != "person") {
            rank = user.rank
        }

        const { type, message } = await fetch(`/api/users?email=${app.email}&rank=${rank}&name=${app.name}&phoneNumber=${app.phoneNumber}`, {
            method: "PATCH"}).then(async (res) => res.json())

            if (type) {
                notifications.show({
                    title: "정상 합격처리 되셨습니다",
                    message: "이 유저는 이제 CL 동아리 멤버입니다!"
                })
            } else {
                notifications.show({
                    color: "red",
                    title: "오류발생",
                    message: `error message \"${message}\"`
                })
            }

        } else {
            notifications.show({
                color: 'red',
                title: "Undefined User",
                message: "이 이메일은 회원 가입을 진행하지 않았습니다!"
            })
        }}}>합격</Button>
}

export function DeleteButton({ app }: { app: Application }) {
    return <Button>
        삭제
    </Button>
}