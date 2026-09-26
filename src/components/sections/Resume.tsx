"use client"

import { useState } from "react"
import { Briefcase, GraduationCap, Wrench } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import type { PortfolioJSON } from "@/types/portfolio"

interface ResumeProps {
  data: PortfolioJSON
}

const tabs = [
  { key: "experience", label: "Pengalaman", icon: Briefcase },
  { key: "education", label: "Pendidikan", icon: GraduationCap },
  { key: "expertise", label: "Keahlian", icon: Wrench },
] as const

type TabKey = (typeof tabs)[number]["key"]

export default function Resume({ data }: ResumeProps) {
  const [active, setActive] = useState<TabKey>("experience")

  return (
    <section id="resume" className="section-block border-b border-border">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BlurFade inView>
              <p className="eyebrow mb-4">Rekam Jejak</p>
              <h2 className="section-title">Pengalaman yang membentuk cara kerja.</h2>
            </BlurFade>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Rekam jejak">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const selected = active === tab.key
                return (
                  <button
                    key={tab.key}
                    id={`tab-${tab.key}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${tab.key}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.key)}
                    onKeyDown={(event) => {
                      const currentIndex = tabs.findIndex((item) => item.key === tab.key)
                      let nextIndex = currentIndex

                      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length
                      else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
                      else if (event.key === "Home") nextIndex = 0
                      else if (event.key === "End") nextIndex = tabs.length - 1
                      else return

                      event.preventDefault()
                      setActive(tabs[nextIndex].key)
                      event.currentTarget.parentElement
                        ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]
                        ?.focus()
                    }}
                    className={`focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <BlurFade inView delay={0.08} className="lg:pt-4">
            <div id="panel-experience" role="tabpanel" aria-labelledby="tab-experience" tabIndex={0} hidden={active !== "experience"}>
                <ol className="border-t border-border">
                  {data.resume.experience.map((experience) => (
                    <li key={`${experience.company}-${experience.years}`} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                      <p className="text-sm font-medium tabular-nums text-primary">{experience.years}</p>
                      <div>
                        <h3 className="text-lg font-semibold text-balance">{experience.position}</h3>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">{experience.company}</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                          {experience.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
            </div>

            <div id="panel-education" role="tabpanel" aria-labelledby="tab-education" tabIndex={0} hidden={active !== "education"}>
                <ol className="border-t border-border">
                  {data.resume.education.map((education) => (
                    <li key={`${education.school}-${education.years}`} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                      <p className="text-sm font-medium tabular-nums text-primary">{education.years}</p>
                      <div>
                        <h3 className="text-lg font-semibold text-balance">{education.school}</h3>
                        {education.description ? (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{education.description}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
            </div>

            <div id="panel-expertise" role="tabpanel" aria-labelledby="tab-expertise" tabIndex={0} hidden={active !== "expertise"}>
                <ul className="grid border-l border-t border-border sm:grid-cols-2">
                  {data.achievements.map((achievement, index) => (
                    <li key={achievement.title} className="border-b border-r border-border p-5">
                      <span className="text-xs font-semibold tabular-nums text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-semibold">{achievement.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {achievement.description}
                      </p>
                    </li>
                  ))}
                </ul>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
