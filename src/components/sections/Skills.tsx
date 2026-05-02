"use client"

import { motion } from "framer-motion"
import type { PortfolioJSON } from "@/types/portfolio"

const barColors = [
  "from-[#FF2D20] to-orange-500",
  "from-orange-500 to-amber-400",
  "from-amber-500 to-yellow-400",
  "from-rose-500 to-[#FF2D20]",
  "from-red-700 to-[#FF2D20]",
  "from-orange-600 to-amber-500",
  "from-[#FF2D20] to-rose-400",
  "from-amber-400 to-orange-400",
]

interface SkillsProps {
  data: PortfolioJSON
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data

  return (
    <section id="skills" className="py-28 relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-start">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
                <span className="w-6 h-px bg-[#FF2D20]" />
                Skills
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                Technical
                <br />
                <span className="text-white/30">Expertise</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => {
                const level = parseInt(skill.proficiency)
                const color = barColors[i % barColors.length]

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="group relative glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors p-5"
                  >
                    <div className="absolute top-3 right-4 text-[3.5rem] font-black leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.11] transition-opacity tabular-nums">
                      {skill.proficiency}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Proficiency</p>
                    <h3 className="text-lg font-black text-white mb-4 leading-tight">{skill.name}</h3>

                    <div className="relative h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.06 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 lg:mt-[7.5rem] space-y-5"
          >
            <div className="glass rounded-2xl border border-white/8 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="px-3 py-1.5 text-xs glass rounded-full border border-white/8 text-gray-300 hover:border-[#FF2D20]/40 hover:text-white transition-all cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/8 overflow-hidden">
              <div className="p-6 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Top Strengths</h3>
                {skills
                  .slice()
                  .sort((a, b) => parseInt(b.proficiency) - parseInt(a.proficiency))
                  .slice(0, 3)
                  .map((skill, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-200">{skill.name}</span>
                      <span className="text-sm font-black text-gradient-primary">{skill.proficiency}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
