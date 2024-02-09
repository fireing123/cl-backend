import { fullName, group } from "@/config";
import { Title, Text } from "@mantine/core";

export const CLTitle = ({ title, highlight }: { title: string, highlight: string }) => (
    <Title className={title}>
        {group} <span className={highlight}>코딩</span> 동아리 <br /> {fullName} 동아리
    </Title>
)

export const SubTitle = () => (
    <Text c="dimmed" mt="md">
        코딩 학습을 기반으로 기초, 심화 문제를 탐구하는 동아리
        컴퓨터공학, SW공학, AI등에 관심 있는 학생 환영
    </Text>
)

export const SubTextItems = [
    "1번쨰 # 내용",
    "2변쨰 # 내용",
    "3번쨰 # 내용"
]