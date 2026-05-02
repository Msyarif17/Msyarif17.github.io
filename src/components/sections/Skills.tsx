"use client"

import { motion } from "framer-motion"
import type { PortfolioJSON } from "@/types/portfolio"
import LogoLoop from "@/components/ui/LogoLoop"

interface SkillsProps {
  data: PortfolioJSON
}

function levelLabel(pct: number) {
  if (pct >= 90) return "Expert"
  if (pct >= 70) return "Advanced"
  if (pct >= 50) return "Intermediate"
  return "Beginner"
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data
  const sorted = [...skills].sort((a, b) => parseInt(b.proficiency) - parseInt(a.proficiency))
  const top3 = sorted.slice(0, 3)

  return (
    <section id="skills" className="py-16 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
            Technical
            <br />
            <span className="text-white/30">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          <div className="glass rounded-3xl border border-white/8 overflow-hidden">
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              {skills.map((skill, i) => {
                const level = parseInt(skill.proficiency)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {skill.logo && (
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 opacity-60 dark:invert dark:opacity-75 shrink-0"
                          />
                        )}
                        <span className="font-black text-white text-sm truncate">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="hidden sm:block text-xs text-gray-500 font-medium">{levelLabel(level)}</span>
                        <span className="text-xs sm:text-sm font-black text-white tabular-nums">{skill.proficiency}</span>
                      </div>
                    </div>
                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FF2D20] to-orange-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.07 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass rounded-3xl border border-white/8 overflow-hidden"
            >
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Top Strengths</p>
                {top3.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black text-white tabular-nums w-10 sm:w-12 lg:w-16 shrink-0">{skill.proficiency}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-xs sm:text-sm leading-tight truncate">{skill.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">{levelLabel(parseInt(skill.proficiency))}</p>
                    </div>
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-[#FF2D20]/10 border border-[#FF2D20]/20 flex items-center justify-center shrink-0">
                      <span className="text-[9px] sm:text-[10px] font-black text-[#FF2D20]">#{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass rounded-3xl border border-white/8 overflow-hidden"
            >
              <div className="p-4 sm:p-6 flex flex-col h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">Tech Stack</p>
                <div className="flex flex-col gap-3 justify-center flex-1 overflow-hidden">
                  <LogoLoop
                    logos={skills.map((skill) => ({
                      node: (
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 bg-white/[0.04] text-gray-400">
                          {skill.logo && (
                            <img src={skill.logo} alt={skill.name} className="w-3 h-3 object-contain brightness-0 opacity-50 dark:invert dark:opacity-60 shrink-0" />
                          )}
                          <span className="text-[11px] font-medium whitespace-nowrap">{skill.name}</span>
                        </div>
                      ),
                    }))}
                    speed={35}
                    direction="left"
                    logoHeight={28}
                    gap={6}
                    pauseOnHover
                    fadeOut
                  />
                  <LogoLoop
                    logos={[...skills].reverse().map((skill) => ({
                      node: (
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 bg-white/[0.04] text-gray-400">
                          {skill.logo && (
                            <img src={skill.logo} alt={skill.name} className="w-3 h-3 object-contain brightness-0 opacity-50 dark:invert dark:opacity-60 shrink-0" />
                          )}
                          <span className="text-[11px] font-medium whitespace-nowrap">{skill.name}</span>
                        </div>
                      ),
                    }))}
                    speed={28}
                    direction="right"
                    logoHeight={28}
                    gap={6}
                    pauseOnHover
                    fadeOut
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
