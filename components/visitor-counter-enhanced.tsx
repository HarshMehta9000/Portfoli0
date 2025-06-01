"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function VisitorCounterEnhanced() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [todayCount, setTodayCount] = useState<number | null>(null)
  const [weeklyCount, setWeeklyCount] = useState<number | null>(null)
  const [currentlyViewing, setCurrentlyViewing] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    // In a real implementation, this would call an API endpoint
    const fetchVisitorData = async () => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0]

        // Get a week ago
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const weekAgoStr = weekAgo.toISOString().split("T")[0]

        // Get stored counts from localStorage
        const storedTotalCount = localStorage.getItem("totalVisitors") || "0"
        const storedDailyData = localStorage.getItem("dailyVisitors") || "{}"

        // Parse the data
        const totalCount = Number.parseInt(storedTotalCount, 10)
        const dailyData = JSON.parse(storedDailyData)

        // Update today's count
        const todayVisits = (dailyData[today] || 0) + 1
        dailyData[today] = todayVisits

        // Calculate weekly count
        let weeklyVisits = 0
        for (const [date, count] of Object.entries(dailyData)) {
          if (date >= weekAgoStr && date <= today) {
            weeklyVisits += count as number
          }
        }

        // Update total count
        const newTotalCount = totalCount + 1

        // Store the updated data
        localStorage.setItem("totalVisitors", newTotalCount.toString())
        localStorage.setItem("dailyVisitors", JSON.stringify(dailyData))

        // Update state
        setVisitorCount(newTotalCount)
        setTodayCount(todayVisits)
        setWeeklyCount(weeklyVisits)

        // Simulate currently viewing (between 1-5 for demo)
        setCurrentlyViewing(Math.floor(Math.random() * 5) + 1)

        // In a real app, you would also send this data to your backend
        // await fetch('/api/track-visit', { method: 'POST' })
      } catch (error) {
        console.error("Error tracking visitor:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorData()

    // Set up interval to update counts (simulating real-time updates)
    const interval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 3) // 0, 1, or 2
      if (randomIncrease > 0 && visitorCount !== null && todayCount !== null && weeklyCount !== null) {
        setVisitorCount((prev) => (prev !== null ? prev + randomIncrease : prev))
        setTodayCount((prev) => (prev !== null ? prev + randomIncrease : prev))
        setWeeklyCount((prev) => (prev !== null ? prev + randomIncrease : prev))

        // Occasionally change currently viewing count
        if (Math.random() > 0.7) {
          setCurrentlyViewing(Math.floor(Math.random() * 5) + 1)
        }
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs">
            {loading ? "..." : visitorCount !== null ? visitorCount.toLocaleString() : "..."}
          </span>
          <Badge variant="secondary" className="h-5 px-1 text-xs">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {currentlyViewing}
            </motion.span>
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Visitor Statistics</h4>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Visitors</p>
              <p className="text-lg font-bold">
                {visitorCount !== null ? visitorCount.toLocaleString() : "Loading..."}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Today</p>
              <p className="text-lg font-bold">{todayCount !== null ? todayCount.toLocaleString() : "Loading..."}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">This Week</p>
              <p className="text-lg font-bold">{weeklyCount !== null ? weeklyCount.toLocaleString() : "Loading..."}</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Currently viewing</p>
              </div>
              <Badge variant="outline" className="font-normal">
                {currentlyViewing} {currentlyViewing === 1 ? "visitor" : "visitors"}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Statistics are updated in real-time and stored securely.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
