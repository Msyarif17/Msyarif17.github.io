import { Cake, Mail, MapPin, Phone } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

interface AboutProps {
  data: PortfolioJSON
}

export default function About({ data }: AboutProps) {
  const { about, personal_info } = data
  const birthday = new Date(personal_info.contact.birthday)
  const today = new Date()
  const birthdayPassed =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())
  const age = today.getFullYear() - birthday.getFullYear() - (birthdayPassed ? 0 : 1)

  const personalDetails = [
    { label: "Lokasi", value: personal_info.contact.location, icon: MapPin },
    { label: "Email", value: personal_info.contact.email, icon: Mail },
    { label: "Telepon", value: personal_info.contact.phone, icon: Phone },
    { label: "Usia", value: `${age} tahun`, icon: Cake },
  ]

  return (
    <section id="about" className="section-block border-b border-border">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Tentang</p>
            <h2 className="section-title">Di balik setiap sistem yang berjalan.</h2>
          </div>

          <div className="lg:pt-3">
            <p className="section-copy">{about.text}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="text-sm font-semibold">Informasi Profesional</h3>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {personalDetails.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-3 py-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="break-words text-sm font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-medium text-primary">{about.freelance_status}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Cara Saya Bekerja</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {about.what_i_love.map((item, index) => (
                <li key={item.label} className="flex items-center gap-3 py-3 text-sm">
                  <span className="w-6 text-xs font-semibold tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
