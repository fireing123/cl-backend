import Image from "next/image";
import Link from "next/link";

export default async function YoutubeList() {
    const list = await fetch(`/api/youtube`)
        .then(async value => {
            const list = await value.json()
            return list.list.items
            
        })
    return (
        <ul>
            {list.map((value: any, i: any) => {
                const title = value.snippet.title
                const image = value.snippet.thumbnails.default
                const id = value.snippet.resourceId.videoId;
                return (
                    <div key={i}>
                        <div className="description">
                            <h2>{title}</h2>
                            <Link className="Youtube brand" href={`https://www.youtube.com/watch?v=${id}`}>들어가</Link>
                        </div>
                        <div className="thumbnail">
                            <Image src={image.url} width={image.width} height={image.height} alt="youtube"/>
                        </div>
                    </div>
                )
            })}
        </ul>
    )
}