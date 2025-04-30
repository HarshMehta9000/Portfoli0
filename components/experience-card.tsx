import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Experience } from "@/lib/experiences"

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={experience.coverImage || "/placeholder.svg"}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {experience.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
        <p className="text-muted-foreground line-clamp-3">{experience.description}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/experience/${experience.slug}`}>
            View Project <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
