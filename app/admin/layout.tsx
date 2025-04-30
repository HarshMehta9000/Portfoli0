"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      })

      toast({
        title: "Logged out successfully",
        description: "Redirecting to login page...",
      })

      setTimeout(() => {
        router.push("/admin/login")
      }, 1000)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/admin" className="font-bold">
              Portfolio Admin
            </Link>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link href="/admin/images" className="text-sm font-medium transition-colors hover:text-primary">
              Images
            </Link>
            <Link href="/admin/blob-gallery" className="text-sm font-medium transition-colors hover:text-primary">
              Blob Gallery
            </Link>
            <Link
              href="/admin/gallery"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Gallery
            </Link>
            <Link
              href="/admin/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
