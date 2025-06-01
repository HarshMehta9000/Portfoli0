"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GalleryImage } from "@/lib/gallery-images"

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGridEnhanced({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [filter, setFilter] = useState<string | null>(null)

  // Extract unique categories from images
  const categories = Array.from(new Set(images.flatMap((image) => image.categories || []))).filter(Boolean)

  // Filter images based on selected category
  const filteredImages = filter ? images.filter((image) => image.categories?.includes(filter)) : images

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedImage(filteredImages[selectedIndex - 1])
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[selectedIndex + 1])
      setSelectedIndex(selectedIndex + 1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Escape") setSelectedImage(null)
  }

  return (
    <div className="space-y-6" onKeyDown={handleKeyDown} tabIndex={0}>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="aspect-square relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-sm font-medium text-foreground">{image.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                <div className="absolute top-2 right-2">
                  <ZoomIn className="h-5 w-5 text-foreground opacity-70" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            {selectedImage && (
              <div className="flex flex-col">
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100"
                    onClick={handlePrevious}
                    disabled={selectedIndex === 0}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100"
                    onClick={handleNext}
                    disabled={selectedIndex === filteredImages.length - 1}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{selectedImage.title}</h2>
                  <p className="text-muted-foreground mb-4">{selectedImage.description}</p>

                  {selectedImage.categories && selectedImage.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
