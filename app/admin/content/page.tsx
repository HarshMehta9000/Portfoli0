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
  page: string
  title: string
  subtitle?: string
  body: string
  date?: string
  media?: string
  tags?: string[]
}

const mockData: ContentItem[] = [
  {
    id: "1",
    section: "hero",
    page: "home",
    title: "Harsh Mehta",
    subtitle: "Founder & data scientist turning raw data into packed venues.",
    body:
      "Building Ensemble, the AI-agent booking engine. Business, Intelligence analyst by trade, AI strategist by obsession. Music connoisseur, live audio engineer, cinephile, spiritually Sanatan Hindu and history buff, INTP hoarding datasets on a self-built NAS while tinkering with MCP and next-gen agents. If it sounds niche or scaleless — I’m in.",
    media: "/hero.png",
    tags: ["AI", "Agent-based Architecture", "Strategy"]
  },
  {
    id: "2",
    section: "about",
    page: "about",
    title: "About Me",
    subtitle: "Data science, storytelling, and disciplined iteration.",
    body:
      "I am Harsh Mehta, a data scientist, founder, and builder focused on mastering AI through code, systems design, and disciplined iteration. I build intelligent automation, machine learning products, and data infrastructure that solve real business problems. My work at Ensemble AI, HP Tech Ventures, and Beats by Dre reflects a balance of technical depth and strategic execution.\n\nBeyond data, I explore music visualizations, cinema, cultural patterns, and creative systems. I help solopreneurs and small teams scale faster through automation and sharp problem solving.",
    media: ""
  }
]

export default function AdminContentManager() {
  const [data, setData] = useState<ContentItem[]>(mockData)
  const [open, setOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [sortKey, setSortKey] = useState<string>("page")
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
        <h1 className="text-3xl font-bold">Site Content Editor</h1>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Block
        </Button>
        <Select value={sortKey} onValueChange={setSortKey}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="page">Page</SelectItem>
            <SelectItem value="section">Section</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{item.page} • {item.section}</p>
            </CardHeader>
            <CardContent>
              {item.subtitle && <p className="text-sm italic text-muted-foreground mb-2">{item.subtitle}</p>}
              <ReactMarkdown className="prose dark:prose-invert text-sm mb-2">{item.body}</ReactMarkdown>
              {item.media && <img src={item.media} alt="Media" className="rounded w-full object-contain h-40" />}
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
            <DialogTitle>{editingItem ? "Edit Content Block" : "Add Content Block"}</DialogTitle>
            <DialogDescription>Manage any section on any page from one place.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={e => {
              e.preventDefault()
              const form = e.currentTarget
              const formData = new FormData(form)
              const newItem: ContentItem = {
                id: editingItem?.id || "",
                page: formData.get("page") as string,
                section: formData.get("section") as string,
                title: formData.get("title") as string,
                subtitle: formData.get("subtitle") as string,
                body: formData.get("body") as string,
                date: formData.get("date") as string,
                media: preview || editingItem?.media || "",
                tags: (formData.get("tags") as string)?.split(",").map(t => t.trim()) || []
              }
              handleSave(newItem)
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="page">Page</Label>
              <Input name="page" defaultValue={editingItem?.page || ""} required />
            </div>
            <div>
              <Label htmlFor="section">Section</Label>
              <Input name="section" defaultValue={editingItem?.section || ""} required />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input name="title" defaultValue={editingItem?.title || ""} required />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input name="subtitle" defaultValue={editingItem?.subtitle || ""} />
            </div>
            <div>
              <Label htmlFor="body">Markdown Body</Label>
              <Textarea name="body" defaultValue={editingItem?.body || ""} rows={6} required />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input name="tags" defaultValue={editingItem?.tags?.join(", ") || ""} />
            </div>
            <div>
              <Label htmlFor="date">Date (optional)</Label>
              <Input name="date" defaultValue={editingItem?.date || ""} />
            </div>
            <div>
              <Label>Drag & Drop Media</Label>
              <div {...getRootProps()} className="border-dashed border rounded p-4 cursor-pointer text-sm text-muted-foreground">
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} alt="Preview" className="mt-2 max-h-48 mx-auto rounded object-contain" />
                ) : (
                  <div className="flex items-center justify-center gap-2"><Upload className="h-4 w-4" /> Drop or click to upload image</div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">Save Block</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
