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
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[3%] right-[5%] w-[700px] h-[700px] bg-[#FF2D20]/8 rounded-full blur-[160px]" />
        <div className="absolute top-[22%] left-[2%] w-[600px] h-[600px] bg-orange-500/7 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-[3%] w-[650px] h-[650px] bg-[#FF2D20]/6 rounded-full blur-[170px]" />
        <div className="absolute top-[68%] left-[6%] w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-[88%] right-[8%] w-[500px] h-[500px] bg-[#FF2D20]/5 rounded-full blur-[140px]" />
      </div>
      <Navbar />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Services data={data} />
        <Clients data={data} />
        <Resume data={data} />
        <Skills data={data} />
        <Portfolio data={data} />
        <Blog data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}
