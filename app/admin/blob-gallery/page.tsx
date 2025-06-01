import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import GalleryBlobManager from "@/components/gallery-blob-manager"

export const metadata: Metadata = {
  title: "Blob Gallery Management | Admin",
  description: "Manage your gallery images using Vercel Blob Storage",
}

export default function BlobGalleryPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Blob Gallery Management</h1>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Manage your gallery images using Vercel Blob Storage. Upload, view, and delete images directly from your
          Vercel Blob storage.
        </p>
      </div>

      <GalleryBlobManager />
    </div>
  )
}
