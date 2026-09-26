import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import type { PortfolioJSON } from "@/types/portfolio"

function assetPath(path: string) {
  return path.replace(/^\.\//, "/")
}

interface ServicesProps {
  data: PortfolioJSON
}

export default function Services({ data }: ServicesProps) {
  const services = data.what_i_am_doing

  return (
    <section id="services" className="section-block border-b border-border">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BlurFade inView>
              <p className="eyebrow mb-4">Layanan</p>
              <h2 className="section-title">Keahlian yang terhubung dari hulu ke hilir.</h2>
            </BlurFade>
          </div>
          <BlurFade inView delay={0.08} className="lg:pt-3">
            <p className="section-copy">
              Dari product interface hingga infrastruktur production, setiap keputusan teknis diarahkan untuk menghasilkan sistem yang jelas, stabil, dan mudah dikembangkan.
            </p>
            {data.services?.why_choose_me ? (
              <ul className="mt-8 grid grid-cols-2 border-l border-t border-border sm:grid-cols-4">
                {data.services.why_choose_me.map((item, index) => (
                  <li key={item} className="border-b border-r border-border px-3 py-4 text-sm font-medium">
                    <span className="mb-2 block text-xs tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 grid gap-x-10 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {services.map((service, index) => (
                <article key={service.title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-border py-7">
                  <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-card">
                    <Image
                      src={assetPath(service.icon)}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 object-contain grayscale dark:invert"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-semibold text-balance">{service.title}</h3>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {service.description}
                    </p>
                    {service.features ? (
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {service.tags ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {service.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="h-auto rounded-sm bg-transparent px-2 py-1 text-xs font-normal text-muted-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
