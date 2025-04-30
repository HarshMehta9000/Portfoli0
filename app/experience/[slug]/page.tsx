import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Calendar, Tag, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { experiences } from "@/lib/experiences"
import SectionAnimation from "@/components/section-animation"

interface ExperiencePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    slug: experience.slug,
  }))
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const experience = experiences.find((exp) => exp.slug === params.slug)

  if (!experience) {
    return {
      title: "Experience Not Found",
    }
  }

  return {
    title: `${experience.title} | Portfolio`,
    description: experience.description,
    openGraph: {
      title: `${experience.title} | Portfolio`,
      description: experience.description,
      type: "article",
      url: `https://portfolio.dev/experience/${experience.slug}`,
      images: [
        {
          url: experience.coverImage,
          width: 1200,
          height: 630,
          alt: experience.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.title} | Portfolio`,
      description: experience.description,
      images: [experience.coverImage],
    },
  }
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const experience = experiences.find((exp) => exp.slug === params.slug)

  if (!experience) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={experience.coverImage || "/placeholder.svg"}
          alt={experience.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <SectionAnimation animation="slide-up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 gradient-text">{experience.title}</h1>
            </SectionAnimation>
            <SectionAnimation animation="slide-up" delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-4">
                {experience.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </SectionAnimation>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <SectionAnimation animation="slide-right" delay={0.4} className="md:w-2/3">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">{experience.description}</p>

              <h2>Overview</h2>
              <p>{experience.content.overview}</p>

              <h2>The Challenge</h2>
              <p>{experience.content.challenge}</p>

              <h2>The Solution</h2>
              <p>{experience.content.solution}</p>

              <h2>My Thoughts</h2>
              <p>{experience.content.thoughts}</p>

              {experience.content.achievements && (
                <>
                  <h2>Key Achievements</h2>
                  <ul>
                    {experience.content.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {experience.images.length > 0 && (
              <SectionAnimation animation="fade" delay={0.6} className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.images.map((image, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${experience.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </SectionAnimation>
            )}
          </SectionAnimation>

          <SectionAnimation animation="slide-up" delay={0.5} className="md:w-1/3">
            <div className="bg-muted rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">{experience.date}</p>
                  </div>
                </div>

                {experience.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{experience.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Technologies</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {experience.links && (
                  <div className="flex items-start gap-2">
                    <ExternalLink className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Links</p>
                      <div className="space-y-1 mt-1">
                        {experience.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-blue-500 hover:underline"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Button asChild className="w-full">
                  <Link href={experience.links?.[0]?.url || "#"} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionAnimation>
        </div>
      </section>

      <section className="container py-12 border-t">
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>

          <div className="flex gap-2">
            {experiences.length > 1 && (
              <Button variant="outline" asChild>
                <Link
                  href={`/experience/${
                    experiences[(experiences.findIndex((e) => e.slug === params.slug) + 1) % experiences.length].slug
                  }`}
                >
                  Next Project
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
