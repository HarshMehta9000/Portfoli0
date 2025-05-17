"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, PlusCircle, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useDropzone } from "react-dropzone"
import ReactMarkdown from "react-markdown"

interface ContentItem {
  id: string
  section: string
  title: string
  body: string
  date: string
  media?: string
}

const mockData: ContentItem[] = [
  {
    id: "1",
    section: "experience",
    title: "HP Tech Ventures",
    body: "Analyzed startup investments using Snowflake & Python",
    date: "Jul 2024 - Aug 2024",
    media: "https://example.com/media1.jpg"
  },
  {
    id: "2",
    section: "project",
    title: "Ensemble AI",
    body: "Automated venue booking via AI agents",
    date: "Feb 2025 - Present",
    media: "https://example.com/media2.jpg"
  }
]

export default function AdminContentManager() {
  const [data, setData] = useState<ContentItem[]>(mockData)
  const [open, setOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [sortKey, setSortKey] = useState<string>("section")
  const [preview, setPreview] = useState<string | null>(null)

  const handleSave = (item: ContentItem) => {
    if (editingItem) {
      setData(data.map(d => (d.id === item.id ? item : d)))
      toast({ title: "Item updated successfully" })
    } else {
      setData([...data, { ...item, id: Math.random().toString(36).slice(2) }])
      toast({ title: "Item added successfully" })
    }
    setOpen(false)
    setEditingItem(null)
    setPreview(null)
  }

  const handleDelete = (id: string) => {
    setData(data.filter(d => d.id !== id))
    toast({ title: "Item deleted" })
  }

  const sortedData = [...data].sort((a, b) => a[sortKey].localeCompare(b[sortKey]))

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } })

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Admin Content Manager</h1>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Entry
        </Button>
        <Select value={sortKey} onValueChange={setSortKey}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="section">Section</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </CardHeader>
            <CardContent>
              <ReactMarkdown className="prose dark:prose-invert text-sm mb-2">{item.body}</ReactMarkdown>
              {item.media && (
                <img src={item.media} alt="Media" className="rounded w-full object-contain h-40" />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => { setEditingItem(item); setOpen(true); setPreview(item.media || null) }}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Content" : "Add Content"}</DialogTitle>
            <DialogDescription>Fill in the details and click save.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={e => {
              e.preventDefault()
              const form = e.currentTarget
              const formData = new FormData(form)
              const newItem: ContentItem = {
                id: editingItem?.id || "",
                section: formData.get("section") as string,
                title: formData.get("title") as string,
                body: formData.get("body") as string,
                date: formData.get("date") as string,
                media: preview || editingItem?.media || ""
              }
              handleSave(newItem)
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="section">Section</Label>
              <Input name="section" defaultValue={editingItem?.section || ""} required />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input name="title" defaultValue={editingItem?.title || ""} required />
            </div>
            <div>
              <Label htmlFor="body">Markdown Description</Label>
              <Textarea name="body" defaultValue={editingItem?.body || ""} rows={6} required />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input name="date" defaultValue={editingItem?.date || ""} required />
            </div>
            <div>
              <Label>Drag & Drop Image</Label>
              <div {...getRootProps()} className="border-dashed border rounded p-4 cursor-pointer text-sm text-muted-foreground">
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} alt="Preview" className="mt-2 max-h-48 mx-auto rounded object-contain" />
                ) : (
                  <div className="flex items-center justify-center gap-2"><Upload className="h-4 w-4" /> Drop image or click to upload</div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
