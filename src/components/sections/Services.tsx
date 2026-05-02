"use client"

import { motion } from "framer-motion"
import type { PortfolioJSON } from "@/types/portfolio"

const accents = [
  {
    iconBg: "bg-[#FF2D20]/10 border-[#FF2D20]/20",
    hover: "hover:border-[#FF2D20]/30",
    num: "text-[#FF2D20]/10 dark:text-[#FF2D20]/8",
  },
  {
    iconBg: "bg-orange-500/10 border-orange-500/20",
    hover: "hover:border-orange-400/30",
    num: "text-orange-400/10 dark:text-orange-400/8",
  },
  {
    iconBg: "bg-amber-500/10 border-amber-500/20",
    hover: "hover:border-amber-400/30",
    num: "text-amber-400/10 dark:text-amber-400/8",
  },
  {
    iconBg: "bg-rose-500/10 border-rose-500/20",
    hover: "hover:border-rose-400/30",
    num: "text-rose-400/10 dark:text-rose-400/8",
  },
  {
    iconBg: "bg-sky-500/10 border-sky-500/20",
    hover: "hover:border-sky-400/30",
    num: "text-sky-400/10 dark:text-sky-400/8",
  },
  {
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    hover: "hover:border-emerald-400/30",
    num: "text-emerald-400/10 dark:text-emerald-400/8",
  },
]

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}
const tagLogoMap: Record<string, string> = {
  "Figma":       "/assets/images/services/figma.svg",
  "React":       "/assets/images/services/react.svg",
  "Next.js":     "/assets/images/services/nextdotjs.svg",
  "Tailwind":    "/assets/images/services/tailwindcss.svg",
  "Laravel":     "/assets/images/services/laravel.svg",
  "Lumen":       "/assets/images/services/lumen.svg",
  "CodeIgniter": "/assets/images/services/codeigniter.svg",
  "RESTful":     "/assets/images/services/postman.svg",
  "PostgreSQL":  "/assets/images/services/postgresql.svg",
  "MySQL":       "/assets/images/services/mysql.svg",
  "Redis":       "/assets/images/services/redis.svg",
  "Linux":       "/assets/images/services/linux.svg",
  "Nginx":       "/assets/images/services/nginx.svg",
  "Docker":      "/assets/images/services/docker.svg",
}
interface ServicesProps {
  data: PortfolioJSON
}

export default function Services({ data }: ServicesProps) {
  const services = data.what_i_am_doing

  return (
    <section id="services" className="py-16 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
              <span className="w-6 h-px bg-[#FF2D20]" />
              What I Do
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              My Services
              <br />
              <span className="text-white/30">&amp; Expertise</span>
            </h2>
          </div>
          {data.services?.why_choose_me && (
            <div className="flex flex-wrap gap-2 sm:justify-end sm:max-w-xs">
              {data.services.why_choose_me.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-gray-400">
                  {item}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const accent = accents[i % accents.length]
            const num = String(i + 1).padStart(2, "0")

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl border-2 overflow-hidden transition-all bg-black/[0.04] border-black/15 hover:border-[#FF2D20]/40 dark:bg-white/[0.05] dark:border-white/10 dark:hover:border-[#FF2D20]/40`}
              >

                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${accent.iconBg} border-2 flex items-center justify-center shrink-0`}>
                      {service.icon.endsWith(".svg") || service.icon.endsWith(".png") ? (
                        <img
                          src={assetPath(service.icon)}
                          alt={service.title}
                          className="w-8 h-8 object-contain brightness-0 opacity-80 dark:invert dark:opacity-80"
                        />
                      ) : (
                        <span className="text-2xl">{service.icon}</span>
                      )}
                    </div>
                    <span className={`hidden dark:block text-7xl font-black leading-none select-none pointer-events-none ${accent.num} group-hover:opacity-[1.5] transition-opacity`}>
                      {num}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 leading-snug">{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D20]/60 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/6">
                      {service.tags.map((tag, ti) => (
                        <span key={ti} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.05] border border-white/8 text-gray-400">
                          {tagLogoMap[tag] && (
                            <img src={tagLogoMap[tag]} alt={tag} className="w-3 h-3 object-contain brightness-0 opacity-50 dark:invert dark:opacity-60 shrink-0" />
                          )}
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
            className="mt-10 glass rounded-2xl border border-white/8 overflow-hidden"
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

