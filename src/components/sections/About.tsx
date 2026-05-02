"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Calendar, Code2, Zap, Users, Lightbulb, Rocket, Coffee } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

const passionIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  zap: Zap,
  users: Users,
  lightbulb: Lightbulb,
  rocket: Rocket,
  coffee: Coffee,
}

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface AboutProps {
  data: PortfolioJSON
}

export default function About({ data }: AboutProps) {
  const { about, personal_info } = data

  return (
    <section id="about" className="py-28 relative">
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
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            The person<br />
            <span className="text-white/30">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#FF2D20]/30 to-orange-500/20 blur-xl" />
              <img
                src={assetPath(personal_info.avatar)}
                alt={personal_info.name}
                className="relative w-full rounded-[24px] border border-white/8 object-cover aspect-[3/4]"
              />
              <div className="absolute bottom-0 inset-x-0 rounded-b-[24px] bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-12">
                <p className="font-bold text-white text-lg leading-tight">{personal_info.name}</p>
                <p className="text-sm text-gray-400 mt-0.5">{personal_info.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {about.quick_stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center"
                >
                  <span className="block text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 block leading-tight">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pt-2"
          >
            <p className="text-gray-300 text-lg leading-relaxed">{about.text}</p>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Personal Info</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                <InfoRow icon={MapPin} label="Location">{personal_info.contact.location}</InfoRow>
                <InfoRow icon={Mail} label="Email">{personal_info.contact.email}</InfoRow>
                <InfoRow icon={Phone} label="Phone">{personal_info.contact.phone}</InfoRow>
                <InfoRow icon={Calendar} label="Birthday">{personal_info.contact.birthday}</InfoRow>
                <InfoRow icon={Zap} label="Freelance">
                  <span className="text-[#FF2D20] font-semibold">{about.freelance_status}</span>
                </InfoRow>
              </div>
            </div>

            <div className="h-px bg-white/6" />

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">What I Love</h3>
              <div className="flex flex-wrap gap-2">
                {about.what_i_love.map((item, i) => {
                  const Icon = passionIconMap[item.icon] ?? Code2
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/8 bg-white/4 text-sm text-gray-300 hover:border-[#FF2D20]/30 hover:text-white transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#FF2D20]" />
                      {item.label}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-red-400" />
      </div>
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-wider block">{label}</span>
        <span className="text-sm text-gray-200">{children}</span>
      </div>
    </div>
  )
}
