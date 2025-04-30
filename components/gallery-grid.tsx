"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { GalleryImage } from "@/lib/gallery-images"

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative bg-background rounded-lg overflow-hidden">
            {selectedImage && (
              <>
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">{selectedImage.description}</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
