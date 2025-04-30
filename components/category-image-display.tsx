"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface CategoryImageDisplayProps {
  category: string
  alt?: string
  className?: string
  fallbackSrc?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function CategoryImageDisplay({
  category,
  alt = "Image",
  className = "",
  fallbackSrc = "/placeholder.svg",
  width,
  height,
  priority = false,
}: CategoryImageDisplayProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryImage = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/images/list?folder=${category}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch image")
        }

        if (data.success && data.images && data.images.length > 0) {
          // Use the most recent image
          const sortedImages = data.images.sort(
            (a: any, b: any) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
          )
          setImageSrc(sortedImages[0].url)
        }
      } catch (error) {
        console.error(`Error fetching ${category} image:`, error)
        setError(error instanceof Error ? error.message : "Failed to load image")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryImage()
  }, [category])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={fallbackSrc || "/placeholder.svg"}
          alt={alt}
          width={width || 400}
          height={height || 300}
          className={className}
        />
      </div>
    )
  }

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      priority={priority}
    />
  )
}
