"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SkillCardProps {
  category: string
  skills: string[]
  index: number
}

// Add proficiency levels to skills for visualization
const getSkillLevel = (skill: string): number => {
  // This is a mock function - in a real app, you'd have actual proficiency data
  // Returns a number between 0 and 1
  const hash = skill.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return 0.7 + (hash % 50) / 100 // Between 0.5 and 1.0
}

export default function SkillCardEnhanced({ category, skills, index }: SkillCardProps) {
  const [view, setView] = useState<"list" | "bars">("list")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{category}</CardTitle>
            <Tabs defaultValue="list" className="w-[120px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list" onClick={() => setView("list")}>
                  List
                </TabsTrigger>
                <TabsTrigger value="bars" onClick={() => setView("bars")}>
                  Bars
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {view === "list" ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {skills.map((skill) => {
                const level = getSkillLevel(skill)
                return (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span className="text-muted-foreground">{Math.round(level * 100)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${level * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
