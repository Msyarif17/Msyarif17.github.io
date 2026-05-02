import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Muhammad Syarif Setiadi - Fullstack Web Developer",
  description:
    "Portfolio of Muhammad Syarif Setiadi, a fullstack web developer specializing in Laravel, Tailwind CSS, and modern JavaScript experiences for brands and startups.",
  keywords:
    "Muhammad Syarif Setiadi, Fullstack Web Developer, Laravel Developer, Tailwind CSS, JavaScript, Portfolio, Freelance Developer, Indonesia",
  authors: [{ name: "Muhammad Syarif Setiadi" }],
  openGraph: {
    type: "website",
    title: "Muhammad Syarif Setiadi - Fullstack Web Developer",
    description:
      "Explore projects, services, and insights from fullstack developer Muhammad Syarif Setiadi.",
    url: "https://msyarif17.github.io/",
    siteName: "Muhammad Syarif Setiadi Portfolio",
    images: [
      {
        url: "https://msyarif17.github.io/website-demo-image/cuplikan.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Syarif Setiadi portfolio homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Syarif Setiadi - Fullstack Web Developer",
    description:
      "See how Muhammad Syarif Setiadi delivers Laravel, Tailwind, and JavaScript solutions.",
    images: ["https://msyarif17.github.io/website-demo-image/cuplikan.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
      </head>
      <body className="bg-animated text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}

