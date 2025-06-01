import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-posts"
import SectionAnimation from "@/components/section-animation"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Blog | Harsh Mehta",
  description: "Thoughts, insights, and explorations on data science, AI, and technology",
}

export default function BlogPage() {
  // Extract all unique tags from blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter gradient-text">Blog</h1>
      </div>

      <SectionAnimation animation="fade" delay={0.2}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Thoughts, insights, and explorations on data science, AI, and technology.
          </p>
          <div className="w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search articles..."
              className="max-w-sm"
              // In a real app, this would be connected to a search function
            />
          </div>
        </div>
      </SectionAnimation>

      <SectionAnimation animation="fade" delay={0.4}>
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full max-w-md mx-auto flex overflow-auto scrollbar-hide">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            {allTags.slice(0, 4).map((tag) => (
              <TabsTrigger key={tag} value={tag} className="flex-1">
                {tag}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <SectionAnimation key={post.slug} animation="slide-up" delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group h-full">
                    <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionAnimation>
              ))}
            </div>
          </TabsContent>

          {allTags.slice(0, 4).map((tag) => (
            <TabsContent key={tag} value={tag} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts
                  .filter((post) => post.tags.includes(tag))
                  .map((post, index) => (
                    <SectionAnimation key={post.slug} animation="slide-up" delay={index * 0.1}>
                      <Link href={`/blog/${post.slug}`} className="group h-full">
                        <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={post.coverImage || "/placeholder.svg"}
                              alt={post.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SectionAnimation>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionAnimation>
    </div>
  )
}
