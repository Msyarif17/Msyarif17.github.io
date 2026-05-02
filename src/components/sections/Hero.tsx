"use client"

import { motion } from "framer-motion"
import { Rocket, Mail, MessageCircle, Zap, ShieldCheck, Cpu, Heart } from "lucide-react"
import { LinkedinIcon, GithubIcon, InstagramIcon, WhatsappIcon } from "@/components/ui/social-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MagicRings from "@/components/ui/MagicRings"
import type { PortfolioJSON } from "@/types/portfolio"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  "shield-check": ShieldCheck,
  cpu: Cpu,
  heart: Heart,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
}

function assetPath(p: string) {
  return p.replace(/^\.\//, "/")
}

interface HeroProps {
  data: PortfolioJSON
}

export default function Hero({ data }: HeroProps) {
  const { personal_info, hero } = data

  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MagicRings
          color="#FF2D20"
          colorTwo="#fb923c"
          ringCount={5}
          speed={0.7}
          attenuation={12}
          lineThickness={2}
          baseRadius={0.28}
          radiusStep={0.12}
          scaleRate={0.08}
          opacity={0.85}
          noiseAmount={0.05}
          ringGap={1.6}
          fadeIn={0.6}
          fadeOut={0.55}
          followMouse={true}
          mouseInfluence={0.08}
          hoverScale={1.1}
          parallax={0.03}
          clickBurst={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D20] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D20]" />
              </span>
              <span className="text-xs font-semibold text-gray-200 uppercase tracking-[0.25em]">{hero.tagline}</span>
            </motion.div>

            <div className="space-y-5">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight">
                <span className="block text-white/60 text-3xl sm:text-4xl font-semibold mb-2 tracking-normal">Hi, I&apos;m</span>
                <span className="text-gradient-hero">{personal_info.name.split(" ").slice(0, 2).join(" ")}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/70 font-medium tracking-wide">
                {personal_info.title}
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
                {hero.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => scrollTo(hero.cta_primary.href)}
                className="rounded-full px-7 py-3 font-semibold bg-[#FF2D20] hover:bg-[#e02518] border-0 text-white shadow-lg shadow-[#FF2D20]/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Rocket className="w-4 h-4 mr-2 inline" />
                {hero.cta_primary.label}
              </Button>
              <Button
                onClick={() => scrollTo(hero.cta_secondary.href)}
                variant="outline"
                className="rounded-full px-7 py-3 border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 hover:text-white transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                {hero.cta_secondary.label}
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-white/15" />
                <span className="text-xs text-gray-500 uppercase tracking-widest">Find me on</span>
              </div>
              <div className="flex items-center gap-2">
                {personal_info.social.map((s, i) => {
                  const Icon = iconMap[s.platform.toLowerCase()] ?? GithubIcon
                  return (
                    <a
                      key={i}
                      href={s.link}
                      target={s.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF2D20]/50 hover:bg-[#FF2D20]/10 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-white/8">
              {hero.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest leading-tight">{stat.label}</span>
                  {i < hero.stats.length - 1 && <div className="ml-2 w-px h-5 bg-white/10 self-center" />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex flex-col items-center gap-5"
          >
            <div className="relative w-64 h-64 xl:w-72 xl:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF2D20]/40 via-orange-500/30 to-amber-400/20 blur-3xl scale-110" />
              <div className="absolute inset-0 rounded-full border border-[#FF2D20]/20 animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-white/8 animate-spin-slow [animation-direction:reverse] [animation-duration:8s]" />
              <img
                src={assetPath(personal_info.avatar)}
                alt={personal_info.name}
                className="relative w-full h-full object-cover rounded-full border-2 border-white/10 shadow-2xl"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <p className="font-bold text-white text-lg leading-tight">{personal_info.name.split(" ").slice(0, 2).join(" ")}</p>
                <p className="text-sm text-gray-400">{personal_info.title}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-[280px]">
                {hero.highlights.map((h, i) => {
                  const Icon = iconMap[h.icon] ?? Zap
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-gray-300"
                    >
                      <Icon className="w-3 h-3 text-[#FF2D20] flex-shrink-0" />
                      <span>{h.label}</span>
                    </div>
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
