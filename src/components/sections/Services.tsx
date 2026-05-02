"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

const accentMap = [
  { bar: "from-[#FF2D20] to-orange-500", icon: "bg-[#FF2D20]/10 border-[#FF2D20]/20", number: "text-[#FF2D20]" },
  { bar: "from-orange-500 to-amber-400", icon: "bg-orange-500/10 border-orange-500/20", number: "text-orange-500" },
  { bar: "from-amber-500 to-yellow-400", icon: "bg-amber-500/10 border-amber-500/20", number: "text-amber-500" },
  { bar: "from-rose-500 to-[#FF2D20]", icon: "bg-rose-500/10 border-rose-500/20", number: "text-rose-500" },
  { bar: "from-red-700 to-[#FF2D20]", icon: "bg-red-700/10 border-red-700/20", number: "text-red-600" },
  { bar: "from-orange-600 to-amber-500", icon: "bg-orange-600/10 border-orange-600/20", number: "text-orange-600" },
]

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface ServicesProps {
  data: PortfolioJSON
}

export default function Services({ data }: ServicesProps) {
  const services = data.what_i_am_doing

  return (
    <section id="services" className="py-28 relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            What I Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            My Services
            <br />
            <span className="text-white/30">&amp; Expertise</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const accent = accentMap[i % accentMap.length]
            const num = String(i + 1).padStart(2, "0")

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors"
              >
                <div className="absolute top-4 right-5 text-[4.5rem] font-black leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.10] transition-opacity">
                  {num}
                </div>

                <div className="p-7 space-y-5">
                  <div className={`w-12 h-12 rounded-2xl ${accent.icon} border flex items-center justify-center shrink-0`}>
                    {service.icon.endsWith(".svg") || service.icon.endsWith(".png") ? (
                      <img
                        src={assetPath(service.icon)}
                        alt={service.title}
                        className="w-7 h-7 object-contain brightness-0 invert opacity-75"
                      />
                    ) : (
                      <span className="text-xl">{service.icon}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white leading-snug">{service.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">
                    <span className={`text-xs font-semibold ${accent.number}`}>Explore</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${accent.number}`} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {data.services?.stats && data.services.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 glass rounded-2xl border border-white/8 overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/8">
              {data.services.stats.map((stat, i) => (
                <div key={i} className="px-8 py-7 text-center hover:bg-white/[0.02] transition-colors">
                  <span className="block text-3xl font-black text-gradient-primary mb-1">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
