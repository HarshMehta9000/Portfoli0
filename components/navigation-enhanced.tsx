"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/#contact" },
]

export default function NavigationEnhanced() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault()
      const targetId = href.replace("/#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setOpen(false)
      }
    }
  }

  return (
    <div
      className={cn(
        "flex items-center transition-all duration-300",
        scrolled ? "py-2" : "py-4",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "",
      )}
    >
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        >
          Harsh Mehta
        </motion.span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 relative",
                isActive(item.href) ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.name}
              {isActive(item.href) && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-foreground/80 p-2 rounded-md",
                  isActive(item.href)
                    ? "text-foreground bg-gradient-to-r from-pink-500/10 to-blue-500/10"
                    : "text-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
