import Comments from "@/components/comments"
import envFetch from "@/lib/envfetch"
import { MDXRemote } from "next-mdx-remote/rsc"

export default async function Modify({ params }: { params: {id: string} }) {

    const res = await envFetch(`/api/post?id=${params.id}`)
    const { title, url, date } = await res.json()
    const mdRes = await fetch(url)
    const md = await mdRes.text()
    const repo = process.env.COMMENTS_REPO as `${string}/${string}`;
	const repoId = process.env.COMMENTS_REPO_ID!;
	const category = process.env.COMMENTS_CATEGORY!
	const categoryId = process.env.COMMENTS_CATEGORY_ID!;

    return (
        <div>
            <h1>Name : {title}</h1>
            <div>{date}</div>
            <MDXRemote source={md} />
            <Comments id={params.id} repo={repo} repoId={repoId} category={category} categoryId={categoryId} />
        </div>
    )
}