"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, GraduationCap, Trophy, Calendar, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import CardSwap, { Card } from "@/components/ui/CardSwap"
import type { PortfolioJSON } from "@/types/portfolio"

interface ResumeProps {
  data: PortfolioJSON
}

export default function Resume({ data }: ResumeProps) {
  const { resume, achievements } = data

  return (
    <section id="resume" className="py-28 relative">
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
            Resume
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            My Journey
            <br />
            <span className="text-white/30">&amp; Experience</span>
          </h2>
        </motion.div>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="flex w-full glass border border-white/10 bg-transparent p-1 rounded-2xl h-auto mb-12 gap-1">
            <TabsTrigger
              value="experience"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 data-[state=active]:bg-[#FF2D20]/15 data-[state=active]:text-[#FF2D20] data-[state=active]:shadow-none transition-all cursor-pointer"
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 data-[state=active]:bg-orange-500/15 data-[state=active]:text-orange-400 data-[state=active]:shadow-none transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Education</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 data-[state=active]:bg-yellow-500/15 data-[state=active]:text-yellow-400 data-[state=active]:shadow-none transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 shrink-0" />
              <span>Awards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <AnimatePresence>
              <div className="relative pl-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#FF2D20] via-[#FF2D20]/30 to-transparent rounded-full" />
                <div className="space-y-8">
                  {resume.experience.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[25px] top-5 w-4 h-4 rounded-full bg-[#0d0b09] dark:bg-[#0d0b09] border-2 border-[#FF2D20] ring-4 ring-[#FF2D20]/10 group-hover:ring-[#FF2D20]/25 transition-all timeline-dot" />

                      <div className="glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors">
                        <div className="p-6">
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="font-black text-white text-lg leading-tight">{exp.position}</h3>
                              <p className="text-[#FF2D20] font-semibold text-sm mt-0.5">{exp.company}</p>
                            </div>
                            <Badge className="bg-[#FF2D20]/10 text-red-300 border border-red-500/20 text-xs shrink-0">
                              <Calendar className="w-3 h-3 mr-1 inline" />
                              {exp.years}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="education">
            <AnimatePresence>
              <div className="relative pl-8">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent rounded-full" />
                <div className="space-y-8">
                  {resume.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[25px] top-5 w-4 h-4 rounded-full bg-[#0d0b09] dark:bg-[#0d0b09] border-2 border-orange-500 ring-4 ring-orange-500/10 group-hover:ring-orange-500/25 transition-all timeline-dot" />

                      <div className="glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors">
                        <div className="p-6">
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <h3 className="font-black text-white text-lg leading-tight">{edu.school}</h3>
                            <Badge className="bg-orange-500/10 text-orange-300 border border-orange-500/20 text-xs shrink-0">
                              <Calendar className="w-3 h-3 mr-1 inline" />
                              {edu.years}
                            </Badge>
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
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="achievements">
            <AnimatePresence>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="h-full glass rounded-2xl border border-white/8 hover:border-yellow-500/25 overflow-hidden transition-colors">
                      <div className="p-6 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
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
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
