"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Calendar, MapPin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import type { Experience } from "@/lib/experiences"

interface ExperienceCardProps {
  experience: Experience
  index: number
}

export default function ExperienceCardEnhanced({
  experience,
  index
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
          <CardContent className="p-6 flex-grow">
            <div className="flex flex-col space-y-2 mb-3">
              <div className="flex items-center text-sm text-muted-foreground space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{experience.date}</span>
              </div>
              {experience.location && (
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>

            {experience.logo && (
              <Image
                src={experience.logo}
                alt={`${experience.title} logo`}
                width={120}
                height={40}
                className="object-contain h-10 w-auto mb-3 dark:invert"
                priority
              />
            )}

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {experience.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {experience.description}
            </p>
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0 mt-auto">
            <div className="flex gap-2 w-full">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/experience/${experience.slug}`}>
                  View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="px-3"
                onClick={() => setIsOpen(true)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* -------- Modal -------- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {experience.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {experience.date} • {experience.location || "Remote"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {experience.logo && (
              <Image
                src={experience.logo}
                alt={`${experience.title} logo`}
                width={160}
                height={60}
                className="object-contain h-12 w-auto mb-4"
              />
            )}

            <div className="flex flex-wrap gap-2 my-2">
              {experience.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{experience.description}</p>
              <h4>Key Achievements</h4>
              <ul>
                {experience.content.achievements?.map((a, i) => (
                  <li key={i}>{a}</li>
                )) || <li>{experience.content.overview}</li>}
              </ul>
            </div>

            {experience.links?.length && (
              <div className="flex gap-2 mt-2">
                {experience.links.map((link, i) => (
                  <Button key={i} asChild size="sm" variant="outline">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title} <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
