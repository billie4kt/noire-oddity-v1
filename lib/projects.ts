export type Project = {
  slug: string
  title: string
  category: string
  description: string
  image: string
  year: string
  services: string[]
  overview: string
  outcome: string
}

export const projects: Project[] = [
  {
    slug: "quantum-interface",
    title: "Quantum Interface",
    category: "Digital Product",
    description: "A revolutionary platform for real-time data visualization.",
    image: "/projects/quantum-interface.png",
    year: "2026",
    services: ["Product Strategy", "Interface Design", "Motion Systems"],
    overview: "Quantum Interface turns complex live data into a calm, legible instrument for teams making decisions at speed.",
    outcome: "A flexible visual language that made dense information feel immediate, confident, and human.",
  },
  {
    slug: "luminescence",
    title: "Luminescence",
    category: "Brand Identity",
    description: "A luxury fashion identity system with a dynamic visual language.",
    image: "/projects/luminescence.png",
    year: "2025",
    services: ["Brand Strategy", "Identity System", "Digital Direction"],
    overview: "Luminescence builds a restrained identity around movement, texture, and the quiet tension between shadow and light.",
    outcome: "A premium system designed to flex from intimate editorial moments to global campaign scale.",
  },
  {
    slug: "nexus-protocol",
    title: "Nexus Protocol",
    category: "Interactive Experience",
    description: "An immersive 3D environment for architectural visualization.",
    image: "/projects/nexus-protocol.png",
    year: "2025",
    services: ["Experience Design", "3D Direction", "Spatial Narrative"],
    overview: "Nexus Protocol gives future spaces a tangible presence before they are built, pairing spatial storytelling with a precise digital interface.",
    outcome: "A reusable presentation environment that helps audiences feel the architecture, not just understand it.",
  },
  {
    slug: "chromatic-motion",
    title: "Chromatic Motion",
    category: "Motion Design",
    description: "An award-winning animation system for a streaming platform.",
    image: "/projects/chromatic-motion.png",
    year: "2024",
    services: ["Motion Direction", "Title Design", "Campaign Toolkit"],
    overview: "Chromatic Motion translates the energy of a global streaming platform into a kinetic system built for every screen.",
    outcome: "A distinct motion vocabulary that made launches feel immediate while keeping the brand unmistakable.",
  },
  {
    slug: "neural-systems",
    title: "Neural Systems",
    category: "AI Integration",
    description: "An intelligent design system powered by generative models.",
    image: "/projects/neural-systems.png",
    year: "2026",
    services: ["AI Strategy", "Design Systems", "Prototyping"],
    overview: "Neural Systems explores how generative intelligence can support creative teams without flattening their point of view.",
    outcome: "A thoughtful toolkit that makes iteration faster while keeping authorship, taste, and control in human hands.",
  },
  {
    slug: "zenith-campaign",
    title: "Zenith Campaign",
    category: "Digital Campaign",
    description: "An immersive brand campaign for a luxury automotive client.",
    image: "/projects/zenith-campaign.png",
    year: "2024",
    services: ["Campaign Direction", "Digital Film", "Launch Experience"],
    overview: "Zenith captures the feeling of forward motion through a campaign built from reflective surfaces, precision, and silence.",
    outcome: "A launch experience with the restraint of a gallery and the momentum of a road at night.",
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
