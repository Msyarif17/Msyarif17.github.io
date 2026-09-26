import Image from "next/image"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import SideRays from "@/components/ui/SideRays"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons"
import type { PortfolioJSON } from "@/types/portfolio"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  whatsapp: WhatsappIcon,
}

function assetPath(path: string) {
  return path.replace(/^\.\//, "/")
}

interface HeroProps {
  data: PortfolioJSON
}

export default function Hero({ data }: HeroProps) {
  const { personal_info, hero } = data

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-border pt-18">
      <SideRays
        speed={0.45}
        rayColor1="#2A6FAF"
        rayColor2="#9BCFF4"
        intensity={2}
        spread={1.2}
        saturation={1}
        className="opacity-[0.3] dark:opacity-[0.5] [mask-image:linear-gradient(to_right,transparent,black_55%)] lg:w-[55%] lg:opacity-[0.7] lg:dark:opacity-[0.75] lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]"
      />
      <div className="site-container relative z-10 grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-20">
        <BlurFade inView className="max-w-3xl">
          <h1 className="font-heading text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.86] tracking-[-0.055em] text-balance">
            Muhammad
            <br />
            Syarif
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {personal_info.title}
          </p>
          <p className="section-copy mt-4">{hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={hero.cta_primary.href}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              {hero.cta_primary.label}
              <ArrowDownRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={hero.cta_secondary.href}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-secondary"
            >
              {hero.cta_secondary.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Terhubung
            </span>
            {personal_info.social.map((social) => {
              const Icon = socialIcons[social.platform.toLowerCase()] ?? GithubIcon
              return (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <span aria-hidden="true">
                    <Icon className="size-4" />
                  </span>
                  <span className="capitalize">{social.platform}</span>
                </a>
              )
            })}
          </div>

          <dl className="mt-10 grid grid-cols-2 border-y border-border min-[360px]:grid-cols-3">
            {hero.stats.map((stat) => {
              const count = /^(\d+)\+$/.exec(stat.value)
              return (
                <div key={stat.label} className="border-r border-border px-3 py-5 first:pl-0 last:col-span-2 last:border-r-0 last:border-t last:pl-0 min-[360px]:last:col-span-1 min-[360px]:last:border-t-0 min-[360px]:last:pl-3 sm:px-5 sm:last:pl-5">
                  <dt className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-first text-xl font-semibold tabular-nums sm:text-2xl">
                    {count ? <><NumberTicker value={Number(count[1])} />+</> : stat.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </BlurFade>

        <BlurFade inView delay={0.12} className="lg:justify-self-end">
          <div className="surface overflow-hidden rounded-xl">
            <Image
              src={assetPath(personal_info.avatar)}
              alt={`Potret ${personal_info.name}`}
              width={768}
              height={1376}
              priority
              sizes="(max-width: 1024px) 100vw, 32vw"
              className="aspect-[4/5] w-full max-w-xl object-cover object-center lg:max-w-md"
            />
            <div className="border-t border-border px-5 py-4">
              <p className="text-sm font-semibold">{personal_info.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">Ciamis, Jawa Barat</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
