import Link from "next/link";

export default function PostItem({ date, name, id }: any) {
    return (
        <Link href={`/Modify/${id}`} passHref>
            <a>
                <div>{date}</div>
                <div>{name}</div>
            </a>
        </Link>
    )
}