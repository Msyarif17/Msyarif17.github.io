"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, GraduationCap, Trophy, Calendar, Award, MapPin } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

interface ResumeProps {
  data: PortfolioJSON
}

const tabs = [
  { key: "experience", label: "Experience", icon: Briefcase, accent: "#FF2D20", accentBg: "bg-[#FF2D20]/10", accentText: "text-[#FF2D20]", accentBorder: "border-[#FF2D20]/25", dotBorder: "border-[#FF2D20]", dotRing: "ring-[#FF2D20]/15", lineBg: "from-[#FF2D20] via-[#FF2D20]/30" },
  { key: "education", label: "Education", icon: GraduationCap, accent: "#f97316", accentBg: "bg-orange-500/10", accentText: "text-orange-400", accentBorder: "border-orange-500/25", dotBorder: "border-orange-400", dotRing: "ring-orange-400/15", lineBg: "from-orange-400 via-orange-400/30" },
  { key: "awards", label: "Awards", icon: Trophy, accent: "#eab308", accentBg: "bg-yellow-500/10", accentText: "text-yellow-400", accentBorder: "border-yellow-500/25", dotBorder: "border-yellow-400", dotRing: "ring-yellow-400/15", lineBg: "from-yellow-400 via-yellow-400/30" },
] as const

type TabKey = (typeof tabs)[number]["key"]

export default function Resume({ data }: ResumeProps) {
  const { resume, achievements } = data
  const [active, setActive] = useState<TabKey>("experience")

  const activeTab = tabs.find((t) => t.key === active)!

  return (
    <section id="resume" className="py-16 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            Resume
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            My Journey
            <br />
            <span className="text-white/30">&amp; Experience</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = active === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? `${tab.accentBg} ${tab.accentText} ${tab.accentBorder}`
                    : "glass border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {active === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid lg:grid-cols-2 gap-5">
                {resume.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group"
                  >
                    <div className="h-full glass rounded-2xl border border-white/8 hover:border-[#FF2D20]/25 transition-colors overflow-hidden">
                      <div className="p-6 flex flex-col gap-3 h-full">
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FF2D20]/10 border border-[#FF2D20]/20 flex items-center justify-center shrink-0">
                            <Briefcase className="w-4 h-4 text-[#FF2D20]" />
                          </div>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-white/5 border border-white/8 rounded-full px-3 py-1 shrink-0">
                            <Calendar className="w-3 h-3" />
                            {exp.years}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-black text-white text-base leading-tight">{exp.position}</h3>
                          <p className="text-[#FF2D20] font-semibold text-sm mt-0.5">{exp.company}</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 flex-1">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {active === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative pl-8 max-w-2xl">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange-400 via-orange-400/30 to-transparent rounded-full" />
                <div className="space-y-6">
                  {resume.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[25px] top-5 w-4 h-4 rounded-full bg-[#0d0b09] border-2 border-orange-400 ring-4 ring-orange-400/15 group-hover:ring-orange-400/30 transition-all" />
                      <div className="glass rounded-2xl border border-white/8 hover:border-orange-400/25 transition-colors">
                        <div className="p-5">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h3 className="font-black text-white leading-snug">{edu.school}</h3>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-orange-300 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 shrink-0">
                              <Calendar className="w-3 h-3" />
                              {edu.years}
                            </span>
                          </div>
                          {edu.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {active === "awards" && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="h-full glass rounded-2xl border border-white/8 hover:border-yellow-400/25 transition-colors">
                      <div className="p-6 flex flex-col gap-4 h-full">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-white leading-snug">{ach.title}</h3>
                          {ach.description && (
                            <p className="text-sm text-gray-400 leading-relaxed mt-2">{ach.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
