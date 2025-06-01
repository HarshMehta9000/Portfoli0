import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Tag, Clock, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-posts"
import SectionAnimation from "@/components/section-animation"
import { Badge } from "@/components/ui/badge"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Harsh Mehta's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://harshmehta.dev/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <SectionAnimation animation="fade" delay={0.1}>
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </SectionAnimation>

        <SectionAnimation animation="fade" delay={0.2}>
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
          </div>
        </SectionAnimation>

        <SectionAnimation animation="slide-up" delay={0.3}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-text">{post.title}</h1>
        </SectionAnimation>

        <SectionAnimation animation="slide-up" delay={0.4}>
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readingTime} min read
            </div>
            <div className="flex-grow"></div>
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <Share2 className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Save</span>
            </Button>
          </div>
        </SectionAnimation>

        <SectionAnimation animation="slide-up" delay={0.5}>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </SectionAnimation>

        <SectionAnimation animation="fade" delay={0.6}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionAnimation>

        <SectionAnimation animation="fade" delay={0.8} className="border-t mt-12 pt-8">
          <h3 className="text-xl font-bold mb-4">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost, index) => (
                <SectionAnimation key={relatedPost.slug} animation="slide-up" delay={index * 0.1 + 0.2}>
                  <Link href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={relatedPost.coverImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold group-hover:text-blue-500 transition-colors">{relatedPost.title}</h4>
                      </div>
                    </div>
                  </Link>
                </SectionAnimation>
              ))}
          </div>
        </SectionAnimation>
      </div>
    </div>
  )
}
