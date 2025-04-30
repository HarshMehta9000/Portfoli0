import { NextResponse } from "next/server"
import { deleteImage } from "@/lib/blob-storage"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    const result = await deleteImage(url)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in delete route:", error)
    return NextResponse.json({ error: "Failed to process delete request" }, { status: 500 })
  }
}
