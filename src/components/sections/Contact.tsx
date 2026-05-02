"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import type { PortfolioJSON } from "@/types/portfolio"

interface ContactProps {
  data: PortfolioJSON
}

export default function Contact({ data }: ContactProps) {
  const { contact_form, personal_info } = data
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [form, setForm] = useState({ fullname: "", email: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("sent")
    setForm({ fullname: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF2D20] uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-px bg-[#FF2D20]" />
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Let&apos;s Work
            <br />
            <span className="text-white/30">Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <ContactCard icon={Mail} label="Email" value={personal_info.contact.email} href={`mailto:${personal_info.contact.email}`} />
            <ContactCard icon={Phone} label="Phone / WhatsApp" value={personal_info.contact.phone} href={`https://wa.me/${personal_info.contact.phone.replace(/\D/g, "")}`} />
            <ContactCard icon={MapPin} label="Location" value={personal_info.contact.location} />

            <div className="glass rounded-2xl overflow-hidden border border-white/8 flex-1 min-h-[200px]">
              <iframe
                src={contact_form.map_link}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)", display: "block", minHeight: "200px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="h-full glass rounded-2xl border border-white/8 overflow-hidden"
            >
              <div className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.fullname}
                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D20]/50 text-sm transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em]">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D20]/50 text-sm transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em]">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF2D20]/50 text-sm transition-colors resize-none"
                  />
                </div>

                {status === "sent" && (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium py-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Message sent! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm font-medium py-1">
                    <AlertCircle className="w-4 h-4" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF2D20] to-orange-500 hover:opacity-90 disabled:opacity-60 text-white font-semibold text-sm transition-opacity cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {contact_form.form_btn_text}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="glass rounded-2xl border border-white/8 hover:border-white/18 transition-colors flex overflow-hidden group">
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="w-9 h-9 rounded-xl bg-[#FF2D20]/10 border border-[#FF2D20]/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-[#FF2D20]" />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em] block">{label}</span>
          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{value}</span>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="cursor-pointer">
        {inner}
      </a>
    )
  }
  return inner
}
