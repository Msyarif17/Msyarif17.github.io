"use client"

import { motion } from "framer-motion"
import { Boxes, Code2, Database, Layers, type LucideIcon } from "lucide-react"
import type { PortfolioJSON, Skill } from "@/types/portfolio"

interface SkillsProps {
  data: PortfolioJSON
}

const categoryIcons: Record<string, LucideIcon> = {
  Language: Code2,
  Framework: Layers,
  Database: Database,
}

const accents = [
  "bg-[#FF2D20]/10 border-[#FF2D20]/20 text-[#FF2D20]",
  "bg-orange-500/10 border-orange-500/20 text-orange-400",
  "bg-amber-500/10 border-amber-500/20 text-amber-400",
]

const pct = (s: Skill) => parseInt(s.proficiency)
const categoryOf = (s: Skill) => s.category ?? "Other"

function levelLabel(pct: number) {
  if (pct >= 90) return "Expert"
  if (pct >= 70) return "Advanced"
  if (pct >= 50) return "Intermediate"
  return "Beginner"
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data
  const groups = [...new Set(skills.map(categoryOf))].map((name) => ({
    name,
    items: skills.filter((s) => categoryOf(s) === name).sort((a, b) => pct(b) - pct(a)),
  }))
  const avg = Math.round(skills.reduce((sum, s) => sum + pct(s), 0) / skills.length)
  const stats = [
    { value: skills.length, label: "Technologies" },
    { value: `${avg}%`, label: "Avg. Level" },
    { value: skills.filter((s) => pct(s) >= 90).length, label: "Expert" },
  ]

  return (
    <section id="skills" className="py-16 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
              <span className="w-6 h-px bg-[#FF2D20]" />
              Skills
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Technical
              <br />
              <span className="text-white/30">Expertise</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl border border-white/8 px-4 sm:px-5 py-3 text-center">
                <span className="block text-2xl sm:text-3xl font-black text-gradient-primary tabular-nums">{stat.value}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {groups.map((group, gi) => {
            const Icon = categoryIcons[group.name] ?? Boxes
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1, duration: 0.5 }}
                className="glass rounded-3xl border border-white/8 hover:border-[#FF2D20]/25 transition-colors p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${accents[gi % accents.length]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-white text-lg">{group.name}</h3>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5 tabular-nums">
                    {group.items.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {group.items.map((skill, i) => {
                    const level = pct(skill)
                    return (
                      <div key={skill.name} className="group flex items-center gap-3.5 rounded-2xl p-2.5 -mx-2.5 hover:bg-white/5 transition-colors">
                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                          {skill.logo && (
                            // Monochrome by default, brand color on hover.
                            <img
                              src={skill.logo}
                              alt={skill.name}
                              className="w-5 h-5 object-contain brightness-0 opacity-60 dark:invert dark:opacity-75 group-hover:filter-none group-hover:opacity-100 dark:group-hover:filter-none dark:group-hover:opacity-100 transition duration-300"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2 mb-1.5">
                            <div className="min-w-0 truncate">
                              <span className="font-bold text-white text-sm">{skill.name}</span>
                              <span className="ml-2 text-[11px] text-gray-500">{levelLabel(level)}</span>
                            </div>
                            <span className="text-sm font-black text-white tabular-nums shrink-0">{skill.proficiency}</span>
                          </div>
                          <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FF2D20] to-orange-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: "easeOut", delay: gi * 0.1 + i * 0.08 }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
