import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, FileTextIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Admin dashboard for your portfolio site",
}

export default function AdminDashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="mr-2 h-5 w-5" />
              Image Management
            </CardTitle>
            <CardDescription>Upload, edit, and manage images for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage all images used throughout your portfolio site, including gallery images, project covers, and blog
              post images.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/images">Manage Images</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileTextIcon className="mr-2 h-5 w-5" />
              Content Management
            </CardTitle>
            <CardDescription>Edit blog posts, projects, and experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update your portfolio content, including blog posts, project details, and work experiences.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/content">Manage Content</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutDashboardIcon className="mr-2 h-5 w-5" />
              Gallery Management
            </CardTitle>
            <CardDescription>Organize and curate your portfolio gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Arrange, categorize, and showcase your work in the portfolio gallery section.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/gallery">Manage Gallery</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5" />
              Site Settings
            </CardTitle>
            <CardDescription>Configure global settings for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update site metadata, SEO settings, and other global configuration options.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/settings">Site Settings</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
