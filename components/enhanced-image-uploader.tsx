"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ImageIcon, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface EnhancedImageUploaderProps {
  onUploadComplete?: (imageData: {
    url: string
    thumbnail?: string
    title: string
    description: string
    category: string
  }) => void
  categories?: string[]
  folder?: string
  maxSizeMB?: number
  allowedTypes?: string[]
}

export default function EnhancedImageUploader({
  onUploadComplete,
  categories = ["Data Visualization", "AI", "Machine Learning", "Cloud", "Dashboard"],
  folder = "gallery",
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: EnhancedImageUploaderProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [quality, setQuality] = useState(80)
  const [generateThumbnail, setGenerateThumbnail] = useState(true)
  const [imageFormat, setImageFormat] = useState<"jpeg" | "png" | "webp" | "avif">("webp")
  const [error, setError] = useState<string | null>(null)

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (acceptedFiles.length === 0) return

      const selectedFile = acceptedFiles[0]

      if (!allowedTypes.includes(selectedFile.type)) {
        setError(`File type not allowed. Please upload: ${allowedTypes.join(", ")}`)
        return
      }

      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        setError(`File too large. Maximum size: ${maxSizeMB}MB`)
        return
      }

      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)

      if (!title) {
        const fileName = selectedFile.name.split(".")[0]
        const formattedTitle = fileName
          .replace(/[-_]/g, " ")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/\b\w/g, (c) => c.toUpperCase())
        setTitle(formattedTitle)
      }
    },
    [title, allowedTypes, maxSizeMB],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": allowedTypes },
    maxFiles: 1,
  })

  const simulateProgress = () => {
    setUploadProgress(0)
    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + Math.random() * 10, 95))
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title) {
      setError("Please provide an image and title")
      return
    }

    setError(null)
    setIsUploading(true)
    simulateProgress()

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)
      formData.append("quality", quality.toString())
      formData.append("format", imageFormat)
      formData.append("generateThumbnail", generateThumbnail.toString())

      const response = await fetch("/api/images/optimized-upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Failed to upload image")

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

      setUploadProgress(100)
      setIsSuccess(true)

      if (onUploadComplete) {
        onUploadComplete({
          url: result.url,
          thumbnail: result.thumbnail,
          title,
          description,
          category,
        })
      }

      toast({ title: "Image uploaded successfully", description: "Your image has been uploaded and optimized." })

      setTimeout(() => {
        setTitle("")
        setDescription("")
        setCategory("")
        setFile(null)
        setPreview(null)
        setIsSuccess(false)
        setUploadProgress(0)
      }, 2000)
    } catch (err) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setUploadProgress(0)
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : preview
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="relative w-full h-60 rounded-md overflow-hidden bg-background/10 border border-dashed border-muted">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="object-contain w-full h-full"
                  style={{ objectPosition: "center" }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                    setPreview(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDragActive ? "active" : "inactive"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDragActive ? (
                      <>
                        <Upload className="h-12 w-12 text-primary mb-2" />
                        <p className="text-lg font-medium">Drop the image here</p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-lg font-medium">Drag & drop an image here</p>
                        <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-4">
                          Supported formats: {allowedTypes.map((t) => t.replace("image/", "")).join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">Max size: {maxSizeMB}MB</p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {error && <div className="text-destructive text-sm font-medium">{error}</div>}

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Image title"
                  disabled={isUploading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isUploading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, "-")}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the image"
                disabled={isUploading}
                rows={3}
              />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Optimization Settings</h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="quality">Quality ({quality}%)</Label>
                </div>
                <Slider
                  id="quality"
                  min={40}
                  max={100}
                  step={5}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  disabled={isUploading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select
                    value={imageFormat}
                    onValueChange={(value) => setImageFormat(value as "jpeg" | "png" | "webp" | "avif")}
                    disabled={isUploading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP (recommended)</SelectItem>
                      <SelectItem value="avif">AVIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="thumbnail" className="flex-grow">Generate thumbnail</Label>
                  <Switch
                    id="thumbnail"
                    checked={generateThumbnail}
                    onCheckedChange={setGenerateThumbnail}
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isUploading || !file || !title} onClick={handleSubmit}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Uploaded Successfully
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
