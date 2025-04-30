import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { list } from "@vercel/blob"

export const metadata: Metadata = {
  title: "Blob Gallery | Portfolio",
  description: "View images stored in Vercel Blob Storage",
}

// This is a server component that fetches images directly
export default async function BlobGalleryPage() {
  // Fetch images from Blob storage
  const { blobs } = await list({ prefix: "gallery" })

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">Blob Gallery</h1>
      </div>

      <p className="text-muted-foreground max-w-[800px] mb-8">
        A showcase of images stored directly in Vercel Blob Storage. These images are optimized and served through
        Vercel's global CDN.
      </p>

      {blobs.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No images found in Blob storage</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blobs.map((blob) => (
            <div key={blob.url} className="aspect-square relative overflow-hidden rounded-md group">
              <img
                src={blob.url || "/placeholder.svg"}
                alt={blob.pathname.split("/").pop() || "Gallery image"}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-sm font-medium">{blob.pathname.split("/").pop()}</p>
                <p className="text-xs text-muted-foreground">
                  Uploaded: {new Date(blob.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
