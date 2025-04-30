"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Edit, Plus, Search, Filter, X, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import EnhancedImageUploader from "./enhanced-image-uploader"
import type { GalleryImage } from "@/lib/gallery-images"

interface GalleryManagerProps {
  initialImages?: GalleryImage[]
  onImagesChange?: (images: GalleryImage[]) => void
  categories?: string[]
}

export default function GalleryManager({
  initialImages = [],
  onImagesChange,
  categories = ["Data Visualization", "AI", "Machine Learning", "Cloud", "Dashboard"],
}: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(initialImages)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)

  // Fetch images from API
  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/images/list?folder=gallery")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images")
      }

      if (data.success && data.images) {
        // Convert blob storage data to gallery image format
        const galleryImages: GalleryImage[] = data.images.map((img: any) => ({
          src: img.url,
          alt: img.filename.split("/").pop() || "Gallery image",
          title: img.filename.split("/").pop()?.split(".")[0] || "Gallery image",
          description: "Image from gallery",
          categories: [],
        }))

        setImages(galleryImages)
        applyFilters(galleryImages, searchTerm, categoryFilter)
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

  // Apply filters to images
  const applyFilters = (imageList: GalleryImage[], search: string, category: string | null) => {
    let filtered = [...imageList]

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (img) => img.title.toLowerCase().includes(searchLower) || img.description.toLowerCase().includes(searchLower),
      )
    }

    if (category) {
      filtered = filtered.filter((img) => img.categories?.some((cat) => cat.toLowerCase() === category.toLowerCase()))
    }

    setFilteredImages(filtered)
  }

  // Handle image upload completion
  const handleUploadComplete = (imageData: {
    url: string
    thumbnail?: string
    title: string
    description: string
    category: string
  }) => {
    const newImage: GalleryImage = {
      src: imageData.url,
      alt: imageData.title,
      title: imageData.title,
      description: imageData.description,
      categories: imageData.category ? [imageData.category] : [],
    }

    const updatedImages = [...images, newImage]
    setImages(updatedImages)
    applyFilters(updatedImages, searchTerm, categoryFilter)

    if (onImagesChange) {
      onImagesChange(updatedImages)
    }

    setIsUploadDialogOpen(false)
  }

  // Handle image deletion
  const handleDeleteImage = async (image: GalleryImage) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    try {
      // Extract URL from the image src
      const url = image.src

      const response = await fetch("/api/images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete image")
      }

      // Remove the image from the state
      const updatedImages = images.filter((img) => img.src !== image.src)
      setImages(updatedImages)
      applyFilters(updatedImages, searchTerm, categoryFilter)

      if (onImagesChange) {
        onImagesChange(updatedImages)
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  // Handle image edit
  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image)
  }

  // Handle save edited image
  const handleSaveEdit = (updatedImage: GalleryImage) => {
    const updatedImages = images.map((img) => (img.src === updatedImage.src ? updatedImage : img))

    setImages(updatedImages)
    applyFilters(updatedImages, searchTerm, categoryFilter)

    if (onImagesChange) {
      onImagesChange(updatedImages)
    }

    setEditingImage(null)

    toast({
      title: "Success",
      description: "Image updated successfully",
    })
  }

  // Effect to apply filters when search or category changes
  useEffect(() => {
    applyFilters(images, searchTerm, categoryFilter)
  }, [searchTerm, categoryFilter])

  // Effect to load initial images
  useEffect(() => {
    if (initialImages.length === 0) {
      fetchImages()
    }
  }, [])

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

          <Select value={categoryFilter || ""} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              <EnhancedImageUploader onUploadComplete={handleUploadComplete} categories={categories} folder="gallery" />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No images found</p>
          {searchTerm || categoryFilter ? (
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter(null)
              }}
            >
              Clear filters
            </Button>
          ) : (
            <Button variant="link" onClick={() => setIsUploadDialogOpen(true)}>
              Upload your first image
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square">
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="font-medium text-sm line-clamp-1">{image.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-3 flex-grow">
                    <h3 className="font-medium line-clamp-1">{image.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.categories?.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => handleEditImage(image)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteImage(image)}
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

      {/* Edit Image Dialog */}
      {editingImage && (
        <Dialog open={!!editingImage} onOpenChange={(open) => !open && setEditingImage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <img
                  src={editingImage.src || "/placeholder.svg"}
                  alt={editingImage.alt}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="edit-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="edit-title"
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="edit-description"
                    value={editingImage.description}
                    onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-alt" className="text-sm font-medium">
                    Alt Text
                  </label>
                  <Input
                    id="edit-alt"
                    value={editingImage.alt}
                    onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const isSelected = editingImage.categories?.includes(category) || false
                      return (
                        <Badge
                          key={category}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const currentCategories = editingImage.categories || []
                            const updatedCategories = isSelected
                              ? currentCategories.filter((c) => c !== category)
                              : [...currentCategories, category]
                            setEditingImage({ ...editingImage, categories: updatedCategories })
                          }}
                        >
                          {category}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingImage(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSaveEdit(editingImage)}>Save Changes</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
