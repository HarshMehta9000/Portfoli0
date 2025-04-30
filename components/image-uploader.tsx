"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, X, ImageIcon, Check, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ImageCategory } from "@/lib/image-categories"

interface ImageUploaderProps {
  onUploadComplete?: () => void
  folder?: string
  category?: ImageCategory | null
  maxSizeMB?: number
  allowedTypes?: string[]
}

export default function ImageUploader({
  onUploadComplete,
  folder = "general",
  category,
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: ImageUploaderProps) {
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

  // Use category settings if provided
  const effectiveMaxSize = category?.maxSizeMB || maxSizeMB
  const effectiveAllowedTypes = category?.allowedTypes || allowedTypes

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (acceptedFiles.length === 0) {
        return
      }

      const selectedFile = acceptedFiles[0]

      // Check file type
      if (!effectiveAllowedTypes.includes(selectedFile.type)) {
        setError(`File type not allowed. Please upload: ${effectiveAllowedTypes.join(", ")}`)
        return
      }

      // Check file size
      if (selectedFile.size > effectiveMaxSize * 1024 * 1024) {
        setError(`File too large. Maximum size: ${effectiveMaxSize}MB`)
        return
      }

      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    },
    [effectiveAllowedTypes, effectiveMaxSize],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": effectiveAllowedTypes,
    },
    maxFiles: 1,
  })

  const simulateProgress = () => {
    setUploadProgress(0)
    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        const increment = Math.random() * 10
        const newProgress = Math.min(prev + increment, 95)
        return newProgress
      })
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select an image to upload")
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

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload image")
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      setUploadProgress(100)
      setIsSuccess(true)

      // Call the callback
      if (onUploadComplete) {
        onUploadComplete()
      }

      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and optimized.",
      })

      // Reset form after 2 seconds
      setTimeout(() => {
        setFile(null)
        setPreview(null)
        setIsSuccess(false)
        setUploadProgress(0)
      }, 2000)
    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

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
    <Card className="w-full p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {category && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Uploading to: <strong>{category.name}</strong> - {category.description}
            </AlertDescription>
          </Alert>
        )}

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
            <div className="relative aspect-video rounded-md overflow-hidden">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="object-cover w-full h-full" />
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
                      Supported formats: {effectiveAllowedTypes.map((t) => t.replace("image/", "")).join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">Max size: {effectiveMaxSize}MB</p>

                    {category?.dimensions && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.dimensions.width &&
                          category.dimensions.height &&
                          `Recommended dimensions: ${category.dimensions.width}×${category.dimensions.height}px`}
                        {category.dimensions.aspectRatio &&
                          `Recommended aspect ratio: ${category.dimensions.aspectRatio}`}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          )}
        </div>

        {error && <div className="text-destructive text-sm font-medium">{error}</div>}

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
              <Label htmlFor="thumbnail" className="flex-grow">
                Generate thumbnail
              </Label>
              <Switch
                id="thumbnail"
                checked={generateThumbnail}
                onCheckedChange={setGenerateThumbnail}
                disabled={isUploading}
              />
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

        <Button type="submit" className="w-full" disabled={isUploading || !file} onClick={handleSubmit}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Uploaded Successfully
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
