import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import GalleryGridEnhanced from "@/components/gallery-grid-enhanced"
import { galleryImages } from "@/lib/gallery-images"
import SectionAnimation from "@/components/section-animation"

export const metadata: Metadata = {
  title: "Gallery | Harsh Mehta",
  description: "Visual showcase of my projects and work in data science, AI, and technology",
}

export default function GalleryPage() {
  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">Gallery</h1>
      </div>

      <SectionAnimation animation="fade" delay={0.2}>
        <p className="text-muted-foreground max-w-[800px] mb-8">
          A visual showcase of my projects, data visualizations, and creative work. Browse through images of dashboards,
          analysis results, project interfaces, and more. Click on any image to view it in detail.
        </p>
      </SectionAnimation>

      <SectionAnimation animation="fade" delay={0.4}>
        <GalleryGridEnhanced images={galleryImages} />
      </SectionAnimation>
    </div>
  )
}
