import { list, del } from "@vercel/blob"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { revalidatePath } from "next/cache"

function groupBlobsByPrefix(blobs: any[]) {
  const groups: Record<string, any[]> = {
    experience: [],
    hero: [],
    gallery: [],
    blog: [],
    project: [],
    other: []
  }
  for (const blob of blobs) {
    const name = blob.pathname.split("/").pop() || ""
    if (name.startsWith("xp_")) groups.experience.push(blob)
    else if (name.startsWith("hero_")) groups.hero.push(blob)
    else if (name.startsWith("gallery_")) groups.gallery.push(blob)
    else if (name.startsWith("blog_")) groups.blog.push(blob)
    else if (name.startsWith("proj_")) groups.project.push(blob)
    else groups.other.push(blob)
  }
  return groups
}

export default async function AdminGalleryPage() {
  const { blobs } = await list({ prefix: "gallery" })
  const grouped = groupBlobsByPrefix(blobs)

  async function handleDelete(url: string) {
    "use server"
    await del(url)
    revalidatePath("/admin/gallery")
  }

  const Section = ({ title, items }: { title: string; items: any[] }) => (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No images</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((blob) => (
            <div
              key={blob.url}
              className="aspect-square relative overflow-hidden rounded-md group border"
            >
              <img
                src={blob.url || "/placeholder.svg"}
                alt={blob.pathname.split("/").pop() || "Gallery image"}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <form
                action={async () => {
                  "use server"
                  await handleDelete(blob.url)
                }}
                className="absolute top-2 right-2 z-10"
              >
                <Button variant="destructive" size="icon" type="submit">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
              <div className="absolute bottom-0 w-full bg-background/80 text-xs text-center p-1">
                {blob.pathname.split("/").pop()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">
          Admin Gallery Manager
        </h1>
      </div>

      <p className="text-muted-foreground max-w-[800px] mb-8">
        Manage your portfolio media. Images are grouped by purpose based on filename prefix (e.g., xp_, hero_, proj_).
      </p>

      <Section title="Experience Images (xp_)" items={grouped.experience} />
      <Section title="Hero Backgrounds (hero_)" items={grouped.hero} />
      <Section title="Gallery Items (gallery_)" items={grouped.gallery} />
      <Section title="Project Images (proj_)" items={grouped.project} />
      <Section title="Blog Thumbnails (blog_)" items={grouped.blog} />
      <Section title="Uncategorized" items={grouped.other} />
    </div>
  )
}
