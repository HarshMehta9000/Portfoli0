"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    github?: string
    demo?: string
    details?: string
  }
  index: number
}

export default function ProjectCardEnhanced({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <CardContent className="p-6 flex-grow">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-muted-foreground line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 mt-auto">
            <div className="flex gap-2 w-full">
              <Button variant="default" className="flex-1" onClick={() => setIsOpen(true)}>
                View Details <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {project.github && (
                  <Button asChild variant="outline" size="icon">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="outline" size="icon">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{project.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <div className="flex flex-wrap gap-2 my-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            {project.details && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{project.details}</p>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              {project.github && (
                <Button asChild size="sm" variant="outline">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub Repository <Github className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild size="sm">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
