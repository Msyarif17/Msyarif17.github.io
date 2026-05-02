"use client"

import { useState, useEffect } from "react"
import { Menu, X, Code2, Sun, Moon, Home, User, Briefcase, FileText, LayoutGrid, Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const navItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Resume", href: "#resume", icon: FileText },
  { label: "Portfolio", href: "#portfolio", icon: LayoutGrid },
  { label: "Contact", href: "#contact", icon: Mail },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = navItems.map((n) => n.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fdf8f6]/90 dark:bg-[#0d0b09]/90 backdrop-blur-xl border-b border-black/8 dark:border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 font-black text-white hover:text-[#FF2D20] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2D20] to-red-700 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-base tracking-tight">M SYARIF</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/8 border border-white/12" />
                    )}
                    <item.icon className="relative w-3.5 h-3.5" />
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass border border-white/10 text-gray-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FF2D20] to-orange-500 text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg glass border border-white/10 text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[#fdf8f6] dark:bg-[#0d0b09] border-t border-black/8 dark:border-white/8">
          <ul className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    active === item.href.slice(1)
                      ? "bg-[#FF2D20]/10 text-[#FF2D20] border border-[#FF2D20]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-1 flex gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl glass border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#FF2D20] to-orange-500 text-white cursor-pointer"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}


