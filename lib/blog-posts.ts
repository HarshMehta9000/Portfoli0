export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
  content: string[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/blog`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
}
