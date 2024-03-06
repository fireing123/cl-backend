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
    "1. C언어 학습 # 학생들이 주도적으로 팀을이뤄 C언어를 학습함",
    "2. 프로그램 개발 # 학생들이 직접 프로그램 제작",
    "3. 대회 # 학생들이 팀을 이뤄 대회에 나감",
    "4. 커뮤니티 # 디스코드 버튼으로 들어올수 있음"
]