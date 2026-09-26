"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, FolderKanban, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { GithubIcon } from "@/components/ui/social-icons"
import type { PortfolioJSON, Project } from "@/types/portfolio"

function assetPath(path: string) {
  return path.replace(/^\.\//, "/")
}

function ProjectVisual({ project, className = "" }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <Image
        src={assetPath(project.image)}
        alt={`Tampilan proyek ${project.title}`}
        width={960}
        height={540}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={className}
      />
    )
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary p-6 text-center ${className}`}>
      <FolderKanban className="size-8 text-primary" aria-hidden="true" />
      <span className="text-sm text-muted-foreground">Pratinjau belum tersedia</span>
    </div>
  )
}

interface PortfolioProps {
  data: PortfolioJSON
}

export default function Portfolio({ data }: PortfolioProps) {
  const { portfolio } = data
  const [active, setActive] = useState("all")
  const [visibleCount, setVisibleCount] = useState(9)
  const [selected, setSelected] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const filtered =
    active === "all"
      ? portfolio.projects
      : portfolio.projects.filter((project) => project.category === active)
  const visibleProjects = filtered.slice(0, visibleCount)
  const remaining = filtered.length - visibleProjects.length

  const categoryLabel = (category: string) =>
    portfolio.categories.find((item) => item.filter === category)?.label ?? category

  useEffect(() => {
    const syncCategory = () => {
      const category = new URLSearchParams(window.location.search).get("category")
      const validCategory = category !== null && portfolio.categories.some((item) => item.filter === category)
      setActive(validCategory ? category : "all")
      setVisibleCount(9)
    }

    const frame = window.requestAnimationFrame(syncCategory)
    window.addEventListener("popstate", syncCategory)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("popstate", syncCategory)
    }
  }, [portfolio.categories])

  useEffect(() => {
    if (!selected) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null)
        return
      }

      if (event.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [selected])

  return (
    <>
      <section id="portfolio" className="section-block border-b border-border">
        <div className="site-container">
          <BlurFade inView className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Portofolio</p>
              <h2 className="section-title">Sistem production, bukan sekadar demo.</h2>
            </div>
            <div>
              <p className="section-copy">
                Aplikasi bisnis, commerce, SaaS, integrasi API, dan infrastruktur yang dirancang, dibangun, serta dioperasikan untuk kebutuhan nyata.
              </p>
              {portfolio.github_url ? (
                <a
                  href={portfolio.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline"
                >
                  <GithubIcon className="size-4" aria-hidden="true" />
                  Lihat GitHub
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </BlurFade>

          <div className="mt-12 overflow-x-auto border-y border-border py-3 lg:sticky lg:top-18 lg:z-30 lg:bg-background" aria-label="Filter proyek">
            <div className="flex min-w-max gap-2">
              {portfolio.categories.map((category) => {
                const selectedCategory = active === category.filter
                return (
                  <button
                    key={category.filter}
                    type="button"
                    onClick={() => {
                      if (selectedCategory) return
                      const url = new URL(window.location.href)
                      if (category.filter === "all") url.searchParams.delete("category")
                      else url.searchParams.set("category", category.filter)
                      window.history.pushState(null, "", url)
                      setActive(category.filter)
                      setVisibleCount(9)
                    }}
                    aria-pressed={selectedCategory}
                    className={`focus-ring min-h-10 rounded-md px-3 text-sm font-medium transition-colors duration-200 ${
                      selectedCategory
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {category.label}
                  </button>
                )
              })}
            </div>
          </div>

          <BlurFade inView delay={0.08} className="mt-10">
            <div id="project-grid" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <article key={project.title} className="group min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-haspopup="dialog"
                    className="focus-ring flex h-full w-full flex-col rounded-lg text-left"
                  >
                    <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
                      <ProjectVisual
                        project={project}
                        className="aspect-video w-full object-cover object-top transition-opacity duration-200 group-hover:opacity-90"
                      />
                    </div>
                    <div className="flex w-full flex-1 flex-col pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        {categoryLabel(project.category)}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-balance">{project.title}</h3>
                      {project.role ? (
                        <p className="mt-1 text-sm font-medium text-muted-foreground">{project.role}</p>
                      ) : null}
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {project.technologies.slice(0, 4).map((technology) => (
                          <Badge key={technology} variant="outline" className="h-auto rounded-sm bg-transparent px-2 py-1 text-xs font-normal text-muted-foreground">
                            {technology}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 ? (
                          <span className="px-1 text-xs text-muted-foreground">
                            +{project.technologies.length - 4} lainnya
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                        Lihat detail
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </BlurFade>
          {remaining > 0 ? (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 9)}
                aria-controls="project-grid"
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Tampilkan {Math.min(9, remaining)} proyek lagi
              </button>
              <p aria-live="polite" className="mt-2 text-xs text-muted-foreground">
                {visibleProjects.length} dari {filtered.length} proyek
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 bg-black/75"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            className="portfolio-dialog relative flex max-h-[calc(100svh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl sm:max-h-[calc(100svh-3rem)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {categoryLabel(selected.category)}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup detail proyek"
                className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div tabIndex={0} className="focus-ring min-h-0 overflow-y-auto overscroll-contain">
              <div className="p-5 sm:p-7">
                <h3 id="project-dialog-title" className="font-heading text-2xl leading-tight text-balance sm:text-3xl">
                  {selected.title}
                </h3>
                {selected.role ? (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{selected.role}</p>
                ) : null}
                <p id="project-dialog-description" className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {selected.description}
                </p>

                {selected.responsibilities?.length ? (
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em]">Kontribusi Utama</h4>
                    <ul className="mt-2 divide-y divide-border border-y border-border">
                      {selected.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="py-2.5 text-sm leading-relaxed text-muted-foreground">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.12em]">Teknologi</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.technologies.map((technology) => (
                      <Badge key={technology} variant="outline" className="h-auto rounded-sm bg-transparent px-2 py-1 text-xs font-normal text-muted-foreground">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selected.link && selected.link !== "#" ? (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                  >
                    Buka Proyek
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              {selected.image ? (
                <div className="border-t border-border bg-secondary p-3 sm:p-5">
                  <div className="overflow-hidden rounded-md border border-border bg-card">
                    <ProjectVisual project={selected} className="block h-auto w-full" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
