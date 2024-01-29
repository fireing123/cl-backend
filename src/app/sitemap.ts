import { getSitemapPosts } from "@/lib/data/post/get";

const URL = "https://jeonil.vercel.app";

export default async function sitemap() {
  const items = await getSitemapPosts()
  const posts = items.map(({ id, date }) => ({
    url: `${URL}/blog/${id}`,
    lastModified: date,
  }));

  const routes = ["", "/youtube", "/blog", "/application", "/mypage", "/mypage/blog", "/about/features", "/project/pygame"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
