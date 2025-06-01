"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface SectionAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  animation?: "fade" | "slide-up" | "slide-right" | "scale" | "none"
  threshold?: number
  id?: string
}

const animations = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
}

export default function SectionAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  animation = "fade",
  threshold = 0.1,
  id,
}: SectionAnimationProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const selectedAnimation = animations[animation]

  return (
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedAnimation}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
