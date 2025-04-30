"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const [blobStatus, setBlobStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const checkBlobStorage = async () => {
      try {
        const response = await fetch("/api/images/list?folder=test")
        const data = await response.json()

        if (response.ok) {
          setBlobStatus("success")
          setMessage("Vercel Blob Storage is configured and working correctly.")
        } else {
          setBlobStatus("error")
          setMessage(data.error || "Failed to connect to Vercel Blob Storage.")
        }
      } catch (error) {
        setBlobStatus("error")
        setMessage("Error connecting to Vercel Blob Storage. Check your configuration.")
      }
    }

    checkBlobStorage()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vercel Blob Storage Status</CardTitle>
            <CardDescription>Check if your Blob Storage is configured correctly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {blobStatus === "loading" && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  <span>Checking Blob Storage status...</span>
                </>
              )}
              {blobStatus === "success" && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{message}</span>
                </>
              )}
              {blobStatus === "error" && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>{message}</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/blob-gallery">Manage Blob Gallery</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managing your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/images">Manage Images</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/blob-gallery">Blob Gallery</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/blob-gallery">View Public Blob Gallery</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
