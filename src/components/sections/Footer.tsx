import Image from "next/image"
import { ArrowUp } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons"
import type { PortfolioJSON } from "@/types/portfolio"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  whatsapp: WhatsappIcon,
}

const navLinks = [
  { id: "about", label: "Tentang" },
  { id: "services", label: "Layanan" },
  { id: "resume", label: "Pengalaman" },
  { id: "portfolio", label: "Proyek" },
  { id: "contact", label: "Kontak" },
]

interface FooterProps {
  data: PortfolioJSON
}

export default function Footer({ data }: FooterProps) {
  const { personal_info } = data

  return (
    <footer className="border-t border-border py-10">
      <div className="site-container">
        <BlurFade inView className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <a href="#home" className="focus-ring inline-flex items-center gap-3 rounded-lg">
              <Image src="/icon.svg" alt="" width={36} height={36} className="size-9 shrink-0" />
              <span className="font-semibold">Muhammad Syarif Setiadi</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {personal_info.title}. Membangun produk digital, integrasi sistem, dan infrastruktur production secara end-to-end.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Navigasi</h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="focus-ring rounded-sm text-sm transition-colors duration-200 hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Terhubung</h2>
            <ul className="mt-4 space-y-2">
              {personal_info.social.map((social) => {
                const Icon = socialIcons[social.platform.toLowerCase()] ?? GithubIcon
                return (
                  <li key={social.platform}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm capitalize transition-colors duration-200 hover:text-primary"
                    >
                      <span aria-hidden="true">
                        <Icon className="size-4" />
                      </span>
                      {social.platform}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.08} className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {personal_info.name}. Seluruh hak dilindungi.</p>
          <a href="#home" className="focus-ring inline-flex w-fit items-center gap-2 rounded-sm font-medium hover:text-foreground">
            Kembali ke atas
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </BlurFade>
      </div>
    </footer>
  )
}
