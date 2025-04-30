import fs from "fs"
import path from "path"
import type { GalleryImage } from "./gallery-images"
import type { Experience } from "./experiences"
import type { BlogPost } from "./blog-posts"

// Path to data files
const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Gallery images data management
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const filePath = path.join(dataDir, "gallery-images.json")
    if (!fs.existsSync(filePath)) {
      return []
    }
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading gallery images:", error)
    return []
  }
}

export async function saveGalleryImages(images: GalleryImage[]): Promise<boolean> {
  try {
    const filePath = path.join(dataDir, "gallery-images.json")
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving gallery images:", error)
    return false
  }
}

// Experience images data management
export async function updateExperienceImage(slug: string, imageField: string, imageUrl: string): Promise<boolean> {
  try {
    const filePath = path.join(dataDir, "experiences.json")
    let experiences: Experience[] = []

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8")
      experiences = JSON.parse(data)
    }

    const experienceIndex = experiences.findIndex((exp) => exp.slug === slug)
    if (experienceIndex === -1) return false

    // Update the specified image field
    if (imageField === "coverImage") {
      experiences[experienceIndex].coverImage = imageUrl
    } else if (imageField === "images") {
      if (!experiences[experienceIndex].images) {
        experiences[experienceIndex].images = []
      }
      experiences[experienceIndex].images.push(imageUrl)
    }

    fs.writeFileSync(filePath, JSON.stringify(experiences, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error updating experience image:", error)
    return false
  }
}

// Blog post images data management
export async function updateBlogPostImage(slug: string, imageUrl: string): Promise<boolean> {
  try {
    const filePath = path.join(dataDir, "blog-posts.json")
    let posts: BlogPost[] = []

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8")
      posts = JSON.parse(data)
    }

    const postIndex = posts.findIndex((post) => post.slug === slug)
    if (postIndex === -1) return false

    posts[postIndex].coverImage = imageUrl

    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error updating blog post image:", error)
    return false
  }
}
