"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Upload, Search, X, Loader2, RefreshCw, ImageIcon, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type ImageCategory, imageCategories } from "@/lib/image-categories"
import ImageUploader from "./image-uploader"

interface ImageCategoryManagerProps {
  category?: ImageCategory
  showAllImages?: boolean
}

export default function ImageCategoryManager({ category, showAllImages = false }: ImageCategoryManagerProps) {
  const [images, setImages] = useState<any[]>([])
  const [filteredImages, setFilteredImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory | null>(category || null)

  // Fetch images from API
  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const folder = showAllImages ? "" : selectedCategory?.folder || ""
      const response = await fetch(`/api/images/list?folder=${folder}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images")
      }

      if (data.success && data.images) {
        setImages(data.images)
        applyFilters(data.images, searchTerm)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Apply filters to images
  const applyFilters = (imageList: any[], search: string) => {
    if (!search) {
      setFilteredImages(imageList)
      return
    }

    const searchLower = search.toLowerCase()
    const filtered = imageList.filter((img) => {
      const filename = img.filename.split("/").pop() || ""
      return filename.toLowerCase().includes(searchLower)
    })

    setFilteredImages(filtered)
  }

  // Handle image upload completion
  const handleUploadComplete = () => {
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

  // Copy image URL to clipboard
  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "Image URL copied to clipboard",
    })
  }

  // Effect to apply filters when search changes
  useEffect(() => {
    applyFilters(images, searchTerm)
  }, [searchTerm, images])

  // Effect to load initial images
  useEffect(() => {
    fetchImages()
  }, [selectedCategory])

  // Get image count limit message
  const getImageLimitMessage = () => {
    if (!selectedCategory?.maxImages) return null

    const currentCount = images.length
    const maxCount = selectedCategory.maxImages

    return (
      <Alert className="mb-4" variant={currentCount >= maxCount ? "destructive" : "default"}>
        <Info className="h-4 w-4" />
        <AlertTitle>Image Limit</AlertTitle>
        <AlertDescription>
          {currentCount} of {maxCount} images used
          {currentCount >= maxCount && " (maximum reached)"}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {showAllImages && (
            <select
              className="px-3 py-2 rounded-md border"
              value={selectedCategory?.id || ""}
              onChange={(e) => {
                const categoryId = e.target.value
                const category = categoryId ? imageCategories.find((c) => c.id === categoryId) || null : null
                setSelectedCategory(category)
              }}
            >
              <option value="">All Categories</option>
              {imageCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={fetchImages} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={selectedCategory?.maxImages !== undefined && images.length >= selectedCategory.maxImages}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Image</DialogTitle>
              </DialogHeader>
              <ImageUploader
                onUploadComplete={handleUploadComplete}
                folder={selectedCategory?.folder || "general"}
                category={selectedCategory}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedCategory?.maxImages && getImageLimitMessage()}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images found</p>
          <Button variant="link" onClick={() => setIsUploadDialogOpen(true)}>
            Upload your first image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.url}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.filename.split("/").pop() || "Image"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-3 flex-grow">
                    <h3 className="font-medium line-clamp-1 text-sm">{image.filename.split("/").pop()}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {image.filename.split("/")[0]}
                    </Badge>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => copyImageUrl(image.url)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-copy"
                            >
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy URL</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

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
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
