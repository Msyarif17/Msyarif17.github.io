import type { Metadata, Viewport } from "next"
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
})

const heading = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Muhammad Syarif Setiadi | Senior Software Engineer & Full-Stack Developer",
  description:
    "Portofolio Muhammad Syarif Setiadi, Senior Software Engineer dan Full-Stack Developer dengan pengalaman membangun aplikasi bisnis, e-commerce, SaaS, integrasi API, serta infrastruktur production.",
  keywords:
    "Muhammad Syarif Setiadi, Senior Software Engineer, Full-Stack Developer, Laravel Developer, React Developer, Next.js, PostgreSQL, API Integration, DevOps, Docker, Linux, Indonesia",
  authors: [{ name: "Muhammad Syarif Setiadi" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Muhammad Syarif Setiadi | Senior Software Engineer",
    description:
      "Portofolio aplikasi bisnis, platform commerce, SaaS, integrasi API, dan infrastruktur production yang dikerjakan secara end-to-end.",
    url: "https://msyarif17.github.io/",
    siteName: "Portofolio Muhammad Syarif Setiadi",
    images: [
      {
        url: "https://msyarif17.github.io/website-demo-image/cuplikan.png",
        width: 1200,
        height: 630,
        alt: "Portofolio Muhammad Syarif Setiadi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Syarif Setiadi | Senior Software Engineer",
    description:
      "Senior Software Engineer dan Full-Stack Developer untuk aplikasi, integrasi, deployment, dan operasional production.",
    images: ["https://msyarif17.github.io/website-demo-image/cuplikan.png"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Syarif Setiadi",
  url: "https://msyarif17.github.io/",
  jobTitle: "Senior Software Engineer & Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciamis",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  sameAs: [
    "https://www.linkedin.com/in/muhammad-syarif-5a7b0820a/",
    "https://github.com/msyarif17",
  ],
  knowsAbout: [
    "Laravel",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "API Integration",
    "Docker",
    "Linux Server Operations",
    "DevOps",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
