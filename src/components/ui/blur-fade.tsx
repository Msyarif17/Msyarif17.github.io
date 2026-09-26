"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  inView?: boolean
}

const variants: Variants = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export function BlurFade({ children, className, delay = 0, inView = false }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion || !inView || isInView ? "visible" : "hidden"}
      variants={variants}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
