"use client"

import { Code2, Heart } from "lucide-react"
import { LinkedinIcon, GithubIcon, InstagramIcon, WhatsappIcon } from "@/components/ui/social-icons"
import type { PortfolioJSON } from "@/types/portfolio"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
]

interface FooterProps {
  data: PortfolioJSON
}

export default function Footer({ data }: FooterProps) {
  const { personal_info } = data

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-white/8 pt-16 pb-0">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF2D20] to-red-700 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {personal_info.name.split(" ")[0]}
                <span className="text-red-400">.</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {personal_info.title}. Building digital experiences with clean code and modern technologies.
            </p>
            <div className="flex items-center gap-2">
              {personal_info.social.map((s, i) => {
                const Icon = socialIcons[s.platform.toLowerCase()] ?? GithubIcon
                return (
                  <a
                    key={i}
                    href={s.link}
                    target={s.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform inline-block cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{personal_info.contact.email}</li>
              <li>{personal_info.contact.phone}</li>
              <li>{personal_info.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {personal_info.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 inline" /> using Next.js &amp; shadcn/ui
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden mt-4" style={{ height: "clamp(80px, 18vw, 200px)" }}>
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-[-15%] whitespace-nowrap font-black leading-none select-none pointer-events-none text-black/8 dark:text-white/5"
          style={{ fontSize: "clamp(80px, 16vw, 220px)" }}
        >
          M SYARIF
        </span>
      </div>
    </footer>
  )
}
