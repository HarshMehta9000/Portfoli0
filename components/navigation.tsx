"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/#contact" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          Harsh Mehta
        </span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              isActive(item.href) ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-foreground/80",
                  isActive(item.href) ? "text-foreground" : "text-foreground/60",
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
