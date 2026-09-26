"use client"

import { useState } from "react"
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

interface ContactProps {
  data: PortfolioJSON
}

export default function Contact({ data }: ContactProps) {
  const { contact_form, personal_info } = data
  const [form, setForm] = useState({ fullname: "", email: "", message: "" })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Diskusi proyek dari ${form.fullname}`)
    const body = encodeURIComponent(`${form.message}\n\nEmail: ${form.email}`)
    window.location.href = `mailto:${personal_info.contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-block">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Kontak</p>
            <h2 className="section-title">Mari bicarakan sistem berikutnya.</h2>
            <p className="section-copy mt-6">
              Ceritakan tujuan, kendala, dan konteks bisnisnya. Saya akan membantu menerjemahkannya menjadi langkah teknis yang jelas.
            </p>

            <address className="mt-10 not-italic">
              <ul className="divide-y divide-border border-y border-border">
                <li>
                  <a
                    href={`mailto:${personal_info.contact.email}`}
                    className="focus-ring group flex items-center gap-4 py-4"
                  >
                    <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 flex-1 break-all text-sm">{personal_info.contact.email}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${personal_info.contact.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group flex items-center gap-4 py-4"
                  >
                    <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 flex-1 text-sm">{personal_info.contact.phone}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                </li>
                <li className="flex items-center gap-4 py-4">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm">{personal_info.contact.location}</span>
                </li>
              </ul>
            </address>

            <div className="mt-6 h-56 overflow-hidden rounded-lg border border-border">
              <iframe
                src={contact_form.map_link}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi Ciamis"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface self-start rounded-xl p-6 sm:p-8">
            <div className="grid gap-6">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
                  Nama Lengkap
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.fullname}
                  onChange={(event) => setForm({ ...form, fullname: event.target.value })}
                  placeholder="Contoh: Budi Santoso…"
                  className="focus-ring min-h-12 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="nama@perusahaan.com…"
                  className="focus-ring min-h-12 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
                  Kebutuhan Proyek
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={8}
                  autoComplete="off"
                  required
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Ceritakan masalah, target, dan ruang lingkup proyek…"
                  className="focus-ring w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                aria-describedby="email-form-note"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                <Send className="size-4" aria-hidden="true" />
                {contact_form.form_btn_text}
              </button>
              <p id="email-form-note" className="text-sm leading-relaxed text-muted-foreground">
                Tombol ini menyiapkan draf di aplikasi email Anda. Pesan baru terkirim setelah Anda mengirimnya dari sana.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
