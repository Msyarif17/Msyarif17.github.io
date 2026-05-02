"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, X } from "lucide-react"
import { GithubIcon } from "@/components/ui/social-icons"
import CardSwap, { Card } from "@/components/ui/CardSwap"
import type { PortfolioJSON } from "@/types/portfolio"
import type { Project } from "@/types/portfolio"

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface PortfolioProps {
  data: PortfolioJSON
}

export default function Portfolio({ data }: PortfolioProps) {
  const { portfolio } = data
  const [active, setActive] = useState("all")
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered =
    active === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === active)

  const featured = portfolio.projects.slice(0, 4)

  return (
    <>
    <section id="portfolio" className="py-16 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Row 1 — Hero card with CardSwap */}
        <div className="glass rounded-3xl border border-white/8 overflow-hidden mb-10">
          <div className="lg:grid lg:grid-cols-[1fr_1fr]">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 lg:p-10 flex flex-col justify-center"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
                <span className="w-6 h-px bg-[#FF2D20]" />
                Portfolio
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Selected
                <br />
                <span className="text-white/30">Projects</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                A curated set of projects spanning web apps, API development, UI/UX design, and interactive experiences.
              </p>
              {portfolio.github_url && (
                <a
                  href={portfolio.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 w-fit rounded-full border border-white/10 hover:border-[#FF2D20]/40 text-sm text-gray-300 hover:text-white transition-all bg-white/5 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  View all on GitHub
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative min-h-[420px]"
            >
              <CardSwap
                width={560}
                height={340}
                cardDistance={52}
                verticalDistance={60}
                delay={3500}
              >
                {featured.map((project, i) => (
                  <Card
                    key={i}
                    style={{}} 
                    className="overflow-hidden flex flex-col portfolio-swap-card"
                  >
                    <div className="overflow-hidden bg-white/5 flex-1">
                      <img
                        src={assetPath(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.currentTarget.style.display = "none" }}
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-black text-white text-sm leading-tight line-clamp-1">{project.title}</h4>
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/8 text-[10px] font-semibold text-gray-400 capitalize border border-white/10">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {project.technologies.slice(0, 3).map((tech, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/8 text-gray-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </motion.div>

          </div>
        </div>

        {/* Row 2 — Filter + Project grid */}
        <div>
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={() => setActive("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                active === "all"
                  ? "bg-[#FF2D20]/15 border-[#FF2D20]/40 text-[#FF2D20]"
                  : "glass border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              All
            </button>
            {portfolio.categories.filter((c) => c.filter !== "all").map((cat) => (
              <button
                key={cat.filter}
                onClick={() => setActive(cat.filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  active === cat.filter
                    ? "bg-[#FF2D20]/15 border-[#FF2D20]/40 text-[#FF2D20]"
                    : "glass border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  <div className="h-full glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors">
                    <div className="relative overflow-hidden aspect-video bg-white/3">
                      <img
                        src={assetPath(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 gap-2">
                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-[#FF2D20]/80 hover:border-[#FF2D20] transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/8 backdrop-blur text-[10px] font-semibold text-gray-300 capitalize border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-black text-white leading-tight line-clamp-1">{project.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 4).map((tech, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium glass border border-white/8 text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium glass border border-white/8 text-gray-500">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>

    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative w-[92vw] sm:w-[80vw] sm:h-[80vh] portfolio-dialog overflow-hidden rounded-2xl flex flex-col sm:grid sm:grid-cols-[8fr_4fr]"
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative bg-white/5 overflow-hidden h-48 sm:h-auto shrink-0">
              <img
                src={assetPath(selected.image)}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
            </div>

            <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-center overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-3 pr-8">
                <h3 className="font-black text-white text-lg leading-tight">{selected.title}</h3>
                <span className="shrink-0 px-2.5 py-1 rounded-full bg-white/8 text-[10px] font-semibold text-gray-400 capitalize border border-white/10 mt-0.5">
                  {selected.category}
                </span>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">{selected.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {selected.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium glass border border-white/8 text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selected.link && selected.link !== "#" && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 w-fit rounded-xl bg-gradient-to-r from-[#FF2D20] to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
