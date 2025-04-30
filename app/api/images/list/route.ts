import { NextResponse } from "next/server"
import { listImages } from "@/lib/blob-storage"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || ""

    const result = await listImages(folder)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in list route:", error)
    return NextResponse.json({ error: "Failed to process list request" }, { status: 500 })
  }
}
