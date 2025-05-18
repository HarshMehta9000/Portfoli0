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

export async function getAllBlogPosts() {
  const res = await fetch(
    "https://o0spbb2buxzewjsk.public.blob.vercel-storage.com/blog-posts-XjOOFr4OSDEpXfvk5mF3EEJK40c95I.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}
