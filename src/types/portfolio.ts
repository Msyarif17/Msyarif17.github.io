export interface SocialLink {
  platform: string
  link: string
}

export interface ContactInfo {
  email: string
  phone: string
  birthday: string
  location: string
}

export interface PersonalInfo {
  name: string
  title: string
  avatar: string
  contact: ContactInfo
  social: SocialLink[]
}

export interface QuickStat {
  value: string
  label: string
  color: string
}

export interface WhatILoveItem {
  icon: string
  label: string
  color: string
}

export interface About {
  text: string
  quick_stats: QuickStat[]
  what_i_love: WhatILoveItem[]
  freelance_status: string
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface ServiceCategory {
  icon: string
  label: string
}

export interface TechStackItem {
  icon: string
  label: string
  color: string
  bg: string
}

export interface TechItem {
  badge: string
  label: string
  badge_color: string
  badge_bg: string
}

export interface ServiceStat {
  value: string
  label: string
  color: string
}

export interface ServicesData {
  categories: ServiceCategory[]
  stats: ServiceStat[]
  technology_stack: TechStackItem[]
  technologies_i_use: TechItem[]
  why_choose_me: string[]
}

export interface Client {
  name: string
  link: string
  logo: string
}

export interface Education {
  school: string
  years: string
  description: string | null
}

export interface Experience {
  position: string
  company: string
  years: string
  description: string
}

export interface Resume {
  education: Education[]
  experience: Experience[]
}

export interface Skill {
  name: string
  proficiency: string
}

export interface Achievement {
  icon: string
  title: string
  description: string
  icon_color: string
  bg: string
  shadow: string
  bar_gradient: string
  bar_width: string
}

export interface PortfolioCategory {
  filter: string
  label: string
  icon: string
}

export interface Project {
  title: string
  category: string
  image: string
  link: string
  description: string
  technologies: string[]
}

export interface PortfolioData {
  categories: PortfolioCategory[]
  github_url: string
  projects: Project[]
}

export interface BlogPost {
  title: string
  category: string
  date: string
  read_time?: string
  text: string
  image: string
}

export interface ContactForm {
  map_link: string
  form_action: string
  inputs: string[]
  form_btn_text: string
}

export interface HeroStat {
  value: string
  label: string
}

export interface HeroHighlight {
  icon: string
  label: string
}

export interface HeroCTA {
  label: string
  href: string
  icon: string
}

export interface Hero {
  tagline: string
  description: string
  stats: HeroStat[]
  highlights: HeroHighlight[]
  cta_primary: HeroCTA
  cta_secondary: HeroCTA
}

export interface PortfolioJSON {
  personal_info: PersonalInfo
  about: About
  what_i_am_doing: Service[]
  clients: Client[]
  resume: Resume
  skills: Skill[]
  hero: Hero
  services: ServicesData
  achievements: Achievement[]
  portfolio: PortfolioData
  blog: BlogPost[]
  contact_form: ContactForm
}
