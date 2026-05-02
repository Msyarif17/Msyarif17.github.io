import portfolioData from "@/data/personal.json"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Clients from "@/components/sections/Clients"
import Resume from "@/components/sections/Resume"
import Skills from "@/components/sections/Skills"
import Portfolio from "@/components/sections/Portfolio"
import Blog from "@/components/sections/Blog"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import type { PortfolioJSON } from "@/types/portfolio"

const data = portfolioData as unknown as PortfolioJSON

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative bg-white dark:bg-black">
      <Navbar />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Services data={data} />
        <Clients data={data} />
        <Resume data={data} />
        <Skills data={data} />
        <Portfolio data={data} />
        {/* <Blog data={data} /> */}
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
