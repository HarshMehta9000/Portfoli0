import sharp from "sharp"

interface OptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: "jpeg" |"jpg"| "png" | "webp" | "avif"
}

export async function optimizeImage(imageBuffer: Buffer, options: OptimizationOptions = {}): Promise<Buffer> {
  try {
    const { width, height, quality = 80, format = "webp" } = options

    let pipeline = sharp(imageBuffer)

    // Resize if dimensions are provided
    if (width || height) {
      pipeline = pipeline.resize({
        width,
        height,
        fit: "cover",
        position: "center",
      })
    }

    // Convert to specified format with quality
    switch (format) {
      case "jpeg":
        pipeline = pipeline.jpeg({ quality })
        break
      case "jpg":
        pipeline = pipeline.jpeg({quality})
        break
      case "png":
        pipeline = pipeline.png({ quality })
        break
      case "webp":
        pipeline = pipeline.webp({ quality })
        break
      case "avif":
        pipeline = pipeline.avif({ quality })
        break
    }

    return await pipeline.toBuffer()
  } catch (error) {
    console.error("Error optimizing image:", error)
    return imageBuffer // Return original if optimization fails
  }
}

export async function generateThumbnail(imageBuffer: Buffer, width = 300, height = 300): Promise<Buffer> {
  try {
    return await sharp(imageBuffer)
      .resize({
        width,
        height,
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 80 })
      .toBuffer()
  } catch (error) {
    console.error("Error generating thumbnail:", error)
    return imageBuffer
  }
}

export async function getImageDimensions(imageBuffer: Buffer): Promise<{ width: number; height: number }> {
  try {
    const metadata = await sharp(imageBuffer).metadata()
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
    }
  } catch (error) {
    console.error("Error getting image dimensions:", error)
    return { width: 0, height: 0 }
  }
}
