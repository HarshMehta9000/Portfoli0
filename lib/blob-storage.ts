import { put, del, list } from "@vercel/blob"
import { nanoid } from "nanoid"

// Helper function to upload an image to Vercel Blob Storage
export async function uploadImage(file: File, folder = "general") {
  try {
    // Generate a unique filename with original extension
    const extension = file.name.split(".").pop()
    const uniqueFilename = `${folder}/${nanoid()}.${extension}`

    // Upload to Vercel Blob
    const { url } = await put(uniqueFilename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return {
      success: true,
      url,
      filename: uniqueFilename,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    }
  }
}

// Helper function to delete an image from Vercel Blob Storage
export async function deleteImage(url: string) {
  try {
    await del(url)
    return { success: true }
  } catch (error) {
    console.error("Error deleting image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete image",
    }
  }
}

// Helper function to list images in a folder
export async function listImages(folder = "") {
  try {
    // If folder is provided, use it as prefix, otherwise list all
    const { blobs } = await list({ prefix: folder })

    return {
      success: true,
      images: blobs.map((blob) => ({
        url: blob.url,
        filename: blob.pathname,
        uploadedAt: blob.uploadedAt,
      })),
    }
  } catch (error) {
    console.error("Error listing images:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to list images",
    }
  }
}
