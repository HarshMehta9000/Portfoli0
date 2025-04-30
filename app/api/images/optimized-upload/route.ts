import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/blob-storage"
import { optimizeImage, generateThumbnail } from "@/lib/image-optimization"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"
    const width = Number.parseInt(formData.get("width") as string) || undefined
    const height = Number.parseInt(formData.get("height") as string) || undefined
    const quality = Number.parseInt(formData.get("quality") as string) || 80
    const format = (formData.get("format") as string) || "webp"
    const generateThumb = formData.get("generateThumbnail") === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer for optimization
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimize the image
    const optimizedBuffer = await optimizeImage(buffer, {
      width,
      height,
      quality,
      format: format as "jpeg" | "png" | "webp" | "avif",
    })

    // Create a new File object from the optimized buffer
    const optimizedFile = new File([optimizedBuffer], `${file.name.split(".")[0]}.${format}`, {
      type: `image/${format}`,
    })

    // Upload the optimized image
    const result = await uploadImage(optimizedFile, folder)

    // Generate and upload thumbnail if requested
    let thumbnailResult = null
    if (generateThumb && result.success) {
      const thumbnailBuffer = await generateThumbnail(buffer)
      const thumbnailFile = new File([thumbnailBuffer], `${file.name.split(".")[0]}_thumb.webp`, { type: "image/webp" })
      thumbnailResult = await uploadImage(thumbnailFile, `${folder}/thumbnails`)
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      ...result,
      thumbnail: thumbnailResult?.success ? thumbnailResult.url : null,
    })
  } catch (error) {
    console.error("Error in optimized upload route:", error)
    return NextResponse.json({ error: "Failed to process optimized upload" }, { status: 500 })
  }
}
