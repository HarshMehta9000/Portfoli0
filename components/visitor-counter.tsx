"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [todayCount, setTodayCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would call an API endpoint
    const fetchVisitorData = async () => {
      try {
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0]

        // Get stored counts from localStorage
        const storedTotalCount = localStorage.getItem("totalVisitors") || "0"
        const storedDailyData = localStorage.getItem("dailyVisitors") || "{}"

        // Parse the data
        const totalCount = Number.parseInt(storedTotalCount, 10)
        const dailyData = JSON.parse(storedDailyData)

        // Update today's count
        const todayVisits = (dailyData[today] || 0) + 1
        dailyData[today] = todayVisits

        // Update total count
        const newTotalCount = totalCount + 1

        // Store the updated data
        localStorage.setItem("totalVisitors", newTotalCount.toString())
        localStorage.setItem("dailyVisitors", JSON.stringify(dailyData))

        // Update state
        setVisitorCount(newTotalCount)
        setTodayCount(todayVisits)

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
      if (randomIncrease > 0 && visitorCount !== null && todayCount !== null) {
        setVisitorCount((prev) => (prev !== null ? prev + randomIncrease : prev))
        setTodayCount((prev) => (prev !== null ? prev + randomIncrease : prev))
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{loading ? "..." : visitorCount !== null ? visitorCount.toLocaleString() : "..."}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Total visitors: {visitorCount !== null ? visitorCount.toLocaleString() : "Loading..."}</p>
          <p>Today: {todayCount !== null ? todayCount.toLocaleString() : "Loading..."}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
