import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/blob-storage"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const alt = formData.get("alt") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const result = await uploadImage(file, folder)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // In a production app, you would store the metadata in a database
    // For now, we'll just return it with the response
    return NextResponse.json({
      ...result,
      metadata: {
        title,
        description,
        alt,
      }
    })
  } catch (error) {
    console.error("Error in upload route:", error)
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 })
  }
}
