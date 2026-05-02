"use client"

import { motion } from "framer-motion"
import type { PortfolioJSON } from "@/types/portfolio"
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop"

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface ClientsProps {
  data: PortfolioJSON
}

export default function Clients({ data }: ClientsProps) {
  if (!data.clients || data.clients.length === 0) return null

  const logos: LogoItem[] = data.clients.map((client) =>
    client.logo
      ? {
          src: assetPath(client.logo),
          alt: client.name,
          title: client.name,
          href: client.link ?? undefined,
        }
      : {
          node: (
            <span className="text-sm font-semibold text-gray-400 whitespace-nowrap">
              {client.name}
            </span>
          ),
          title: client.name,
          href: client.link ?? undefined,
        }
  )

  return (
    <section id="clients" className="py-20 relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            Clients
            <span className="w-6 h-px bg-[#FF2D20]" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Trusted By
            <span className="text-white/30"> Amazing People</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden"
        >
          <LogoLoop
            logos={logos}
            speed={70}
            direction="left"
            logoHeight={56}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Trusted clients"
          />
        </motion.div>
      </div>
    </section>
  )
}
