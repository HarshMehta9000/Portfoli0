export interface BlogPost {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  readingTime: number
  tags: string[]
  content: string[]
}

// Use your deployed site URL here
const BASE_URL = "https://v0-3js-nu.vercel.app"

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const url = `${BASE_URL}/api/blog`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) return []
  return await res.json()
}
