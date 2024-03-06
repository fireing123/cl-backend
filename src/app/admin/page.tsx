import { Button } from "@mantine/core";

export default function Admin() {
    return (
        <div>
            <Button component="a" href="/admin/application">신청서 관리</Button>
            <Button component="a" href="/admin/rank">랭크 직접 수정</Button>
        </div>
    )
}