"use client"

import { useEffect, useMemo, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const initialValue = direction === "down" ? value : startValue
  const finalValue = direction === "down" ? startValue : value
  const formatter = useMemo(
    () => new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }),
    [decimalPlaces],
  )
  const motionValue = useMotionValue(initialValue)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  useEffect(() => springValue.on("change", (latest) => {
    if (numberRef.current) numberRef.current.textContent = formatter.format(latest)
  }), [springValue, formatter])

  useEffect(() => {
    if (reducedMotion) {
      motionValue.set(finalValue)
      springValue.jump(finalValue)
      if (numberRef.current) numberRef.current.textContent = formatter.format(finalValue)
      return
    }

    if (!isInView) return

    const timer = window.setTimeout(() => motionValue.set(finalValue), delay * 1000)
    return () => window.clearTimeout(timer)
  }, [delay, finalValue, formatter, isInView, motionValue, reducedMotion, springValue])

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      <span className="sr-only">{formatter.format(finalValue)}</span>
      <span ref={numberRef} aria-hidden="true">{formatter.format(initialValue)}</span>
    </span>
  )
}
