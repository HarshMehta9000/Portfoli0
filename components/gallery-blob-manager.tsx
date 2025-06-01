"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Loader2, RefreshCw, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import EnhancedImageUploader from "./enhanced-image-uploader"

export default function GalleryBlobManager() {
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Fetch images from Blob storage
  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/images/list?folder=gallery")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images")
      }

      if (data.success && data.images) {
        setImages(data.images)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle image upload completion
  const handleUploadComplete = (imageData: {
    url: string
    thumbnail?: string
    title: string
    description: string
  }) => {
    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully",
    })
    fetchImages()
    setIsUploadDialogOpen(false)
  }

  // Handle image deletion
  const handleDeleteImage = async (imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    try {
      const response = await fetch("/api/images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete image")
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      })

      fetchImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  // Load images on component mount
  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Images</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchImages} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Image</DialogTitle>
              </DialogHeader>
              <EnhancedImageUploader onUploadComplete={handleUploadComplete} folder="gallery" />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images found</p>
          <Button variant="link" onClick={() => setIsUploadDialogOpen(true)}>
            Upload your first image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.url}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-square">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.filename}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-3 flex-grow">
                  <h3 className="font-medium line-clamp-1">{image.filename.split("/").pop()}</h3>
                  <p className="text-xs text-muted-foreground">
                    Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteImage(image.url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
