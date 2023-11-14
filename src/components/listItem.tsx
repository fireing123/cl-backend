import Image from "next/image";
import Link from "next/link";

export function IistItem({ name, url, image }: any) {
    return (
        <Link href={url}>
            <Image src={image} alt="list item"/>
            <p>{name}</p>
        </Link>
    )
}