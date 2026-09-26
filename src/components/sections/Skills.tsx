import Image from "next/image"
import { Boxes, Code2, Database, Layers, type LucideIcon } from "lucide-react"
import type { PortfolioJSON, Skill } from "@/types/portfolio"

interface SkillsProps {
  data: PortfolioJSON
}

const categoryIcons: Record<string, LucideIcon> = {
  Language: Code2,
  Framework: Layers,
  Database,
}

const categoryLabels: Record<string, string> = {
  Language: "Bahasa",
  Framework: "Framework",
  Database: "Database",
  Other: "Lainnya",
}

const proficiency = (skill: Skill) => Number.parseInt(skill.proficiency, 10)
const categoryOf = (skill: Skill) => skill.category ?? "Other"

export default function Skills({ data }: SkillsProps) {
  const groups = [...new Set(data.skills.map(categoryOf))].map((name) => ({
    name,
    items: data.skills
      .filter((skill) => categoryOf(skill) === name)
      .sort((first, second) => proficiency(second) - proficiency(first)),
  }))

  return (
    <section id="skills" className="section-block border-b border-border">
      <div className="site-container">
        <div>
          <p className="eyebrow mb-4">Teknologi</p>
          <h2 className="section-title">Teknologi yang dipakai untuk mengirim hasil.</h2>
        </div>

        <div className="mt-14 grid gap-x-10 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = categoryIcons[group.name] ?? Boxes
            return (
              <section key={group.name} className="border-t border-border py-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <h3 className="text-lg font-semibold">{categoryLabels[group.name] ?? group.name}</h3>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">{group.items.length}</span>
                </div>

                <ul className="mt-5 divide-y divide-border">
                  {group.items.map((skill) => {
                    return (
                      <li key={skill.name} className="flex items-center gap-3 py-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                          {skill.logo ? (
                            <Image
                              src={skill.logo}
                              alt=""
                              width={20}
                              height={20}
                              className="size-5 object-contain grayscale dark:invert"
                            />
                          ) : null}
                        </div>
                        <span className="text-sm font-semibold">{skill.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
