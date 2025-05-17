// blog-posts.ts (CMS-Editable + Image-Friendly + Markdown Preview)

import fs from "fs/promises"
import path from "path"

export interface BlogPost {
  slug: string
  title: string
  date: string
  coverImage: string // Path to image (replace in /public folder)
  excerpt: string
  readingTime: number
  tags: string[]
  content: string[] // Markdown-formatted strings
}

// JSON is stored at: /admin/content/blog-posts.json
const filePath = path.join(process.cwd(), "admin", "content", "blog-posts.json")

// READ: Load all blog posts from editable JSON
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileData = await fs.readFile(filePath, "utf-8")
  return JSON.parse(fileData) as BlogPost[]
}

// READ: Get a single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

// WRITE: Save all blog posts to JSON (used in admin panel CMS)
export async function saveAllBlogPosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8")
}

// BONUS FEATURE: Get list of available cover images in /public/blog (for dropdown UI)
export async function getAvailableCoverImages(): Promise<string[]> {
  const imagesDir = path.join(process.cwd(), "public", "blog")
  try {
    const files = await fs.readdir(imagesDir)
    return files.filter(file => /\.(jpg|jpeg|png|webp|svg)$/i.test(file)).map(f => `/blog/${f}`)
  } catch {
    return []
  }
}

/*
🛠️ To Replace Images:
1. Place new cover images in: /public/blog/
2. Reference them in the 'coverImage' field of blog-posts.json
3. Example: "/blog/my-new-cover.jpg"

📓 Blog Philosophy:
- Every post should remain editable, deletable, and easily extensible.
- Use markdown in content[] for paragraph blocks.
- Encourage clarity and narrative.
- We are building for readability and awe.
- Support extended post sets (>20+ articles).
- Realistic, semi-technical, noir-toned reflections welcomed.
- Non-tech users should be able to easily update posts from CMS.
*/
