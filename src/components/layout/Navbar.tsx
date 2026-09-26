"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, Moon, Sun, X } from "lucide-react"

const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Pengalaman", href: "#resume" },
  { label: "Proyek", href: "#portfolio" },
  { label: "Kontak", href: "#contact" },
]

const sectionIds = ["home", "about", "services", "clients", "resume", "skills", "portfolio", "contact"]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("home")
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      for (const id of [...sectionIds].reverse()) {
        const element = document.getElementById(id)
        if (element && window.scrollY >= element.offsetTop - 120) {
          setActive(navItems.some((item) => item.href === `#${id}`) ? id : "")
          return
        }
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav className="site-container" aria-label="Navigasi utama">
        <div className="flex h-18 items-center justify-between gap-6">
          <a
            href="#home"
            className="focus-ring inline-flex items-center gap-3 rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            <Image src="/icon.svg" alt="" width={36} height={36} className="size-9 shrink-0" />
            <span className="text-sm font-semibold tracking-tight">Muhammad Syarif</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`focus-ring block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Gunakan tema terang" : "Gunakan tema gelap"}
              className="focus-ring flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
            >
              {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
            </button>
            <a
              href="#contact"
              className="focus-ring rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              Diskusi Proyek
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="focus-ring flex size-11 items-center justify-center rounded-lg border border-border transition-colors duration-200 hover:bg-secondary lg:hidden"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-border py-4 lg:hidden">
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1)
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`focus-ring block rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Gunakan tema terang" : "Gunakan tema gelap"}
                className="focus-ring flex size-11 items-center justify-center rounded-lg border border-border transition-colors duration-200 hover:bg-secondary"
              >
                {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="focus-ring flex flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
              >
                Diskusi Proyek
              </a>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
