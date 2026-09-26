import Image from "next/image"
import { Bot, Boxes, Code2, Database, Globe, Layers, Plug, Server, type LucideIcon } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import type { PortfolioJSON, Skill } from "@/types/portfolio"

interface SkillsProps {
  data: PortfolioJSON
}

const categoryIcons: Record<string, LucideIcon> = {
  Language: Code2,
  Frontend: Layers,
  Framework: Boxes,
  Database,
  DevOps: Server,
  AI: Bot,
  Integration: Plug,
  Platform: Globe,
  Protocol: Code2,
}

const categoryLabels: Record<string, string> = {
  Language: "Bahasa & Web",
  Frontend: "Frontend",
  Framework: "Backend",
  Database: "Data & Storage",
  DevOps: "DevOps & Server",
  AI: "AI",
  Integration: "Integrasi API",
  Platform: "Platform",
  Protocol: "Protokol",
  Other: "Lainnya",
}

const categoryOf = (skill: Skill) => skill.category ?? "Other"

export default function Skills({ data }: SkillsProps) {
  const groups = [...new Set(data.skills.map(categoryOf))].map((name) => ({
    name,
    items: data.skills.filter((skill) => categoryOf(skill) === name),
  }))

  return (
    <section id="skills" className="section-block border-b border-border">
      <div className="site-container">
        <BlurFade inView>
          <p className="eyebrow mb-4">Teknologi</p>
          <h2 className="section-title">Teknologi yang dipakai untuk mengirim hasil.</h2>
        </BlurFade>

        <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = categoryIcons[group.name] ?? Boxes
            return (
              <BlurFade key={group.name} inView delay={(index % 3) * 0.06} className="min-w-0">
                <section className="border-t border-border py-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <h3 className="text-lg font-semibold">{categoryLabels[group.name] ?? group.name}</h3>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">{group.items.length}</span>
                  </div>

                  <ul className="mt-5 grid gap-x-5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    {group.items.map((skill) => (
                      <li key={skill.name} className="flex min-w-0 items-center gap-2.5 border-b border-border py-3 text-sm font-medium leading-snug">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-white">
                          {skill.logo ? (
                            <Image src={skill.logo} alt="" width={18} height={18} className="size-[18px] object-contain" />
                          ) : (
                            <Icon className="size-4 text-primary" aria-hidden="true" />
                          )}
                        </span>
                        <span className="min-w-0 break-words">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
