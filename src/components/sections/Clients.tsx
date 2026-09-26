import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import type { PortfolioJSON } from "@/types/portfolio"

function assetPath(path: string) {
  return path.replace(/^\.\//, "/")
}

interface ClientsProps {
  data: PortfolioJSON
}

export default function Clients({ data }: ClientsProps) {
  if (!data.clients?.length) return null

  return (
    <section id="clients" className="section-block border-b border-border">
      <div className="site-container">
        <BlurFade inView className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Kolaborasi</p>
            <h2 className="section-title">Dipercaya lintas organisasi.</h2>
          </div>
          <p className="section-copy max-w-md">
            Beberapa organisasi dan tim yang pernah berkolaborasi dalam pengembangan produk digital.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.08} className="mt-12">
          <ul className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {data.clients.map((client) => (
              <li key={client.name} className="border-b border-r border-border">
                <a
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex min-h-32 items-center gap-4 p-5 transition-colors duration-200 hover:bg-card"
                >
                  {client.logo ? (
                    <Image
                      src={assetPath(client.logo)}
                      alt=""
                      width={56}
                      height={56}
                      sizes="56px"
                      className="size-14 rounded-lg border border-border bg-card object-contain p-1 grayscale transition-[filter] duration-200 group-hover:grayscale-0"
                    />
                  ) : null}
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{client.name}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}
