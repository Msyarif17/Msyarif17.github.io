"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface BlogProps {
  data: PortfolioJSON
}

export default function Blog({ data }: BlogProps) {
  const { blog } = data

  if (!blog || blog.length === 0) return null

  const [featured, ...rest] = blog

  return (
    <section id="blog" className="py-16 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            Blog
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Latest
            <br />
            <span className="text-white/30">Writings</span>
          </h2>
        </motion.div>

        <div className="space-y-5">

          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors grid sm:grid-cols-[2fr_3fr]"
            >
              <div className="relative overflow-hidden aspect-video sm:aspect-auto bg-white/3">
                <img
                  src={assetPath(featured.image)}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="p-7 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-[#FF2D20]/15 border border-[#FF2D20]/30 text-[10px] font-semibold text-[#FF2D20] uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                  {featured.read_time && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {featured.read_time}
                    </span>
                  )}
                </div>
                <h3 className="font-black text-white text-2xl leading-snug group-hover:text-orange-300 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{featured.text}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#FF2D20]">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          )}

          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group glass rounded-2xl border border-white/8 hover:border-white/18 overflow-hidden transition-colors flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-video bg-white/3">
                    <img
                      src={assetPath(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = "none" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#FF2D20]/10 text-[10px] font-semibold text-[#FF2D20] uppercase tracking-wide border border-[#FF2D20]/20">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      {post.read_time && (
                        <span className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-white text-sm leading-snug group-hover:text-orange-300 transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#FF2D20]">
                      <span>Read more</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
