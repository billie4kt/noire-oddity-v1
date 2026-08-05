"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { ProjectTile } from "@/components/project-tile"
import { useState, useEffect } from "react"

export default function WorkPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* Fixed Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 w-full h-screen flex items-center justify-center bg-black/15">
        <div className="text-center max-w-4xl mx-auto px-6 mt-20">
          <h1 
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            className="text-7xl md:text-8xl font-black tracking-[0.3em] mb-8 transition-transform"
          >
            Work
          </h1>
          <p 
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
            className="text-lg md:text-xl tracking-wide text-neutral-400 transition-transform"
          >
            Selected projects crafted with precision and vision
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-20 bg-black/45 backdrop-blur-3xl py-24 px-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Quantum Interface",
                category: "Digital Product",
                description: "Revolutionary platform for real-time data visualization",
                image: "/projects/quantum-interface.png"
              },
              {
                title: "Luminescence",
                category: "Brand Identity",
                description: "Luxury fashion brand identity system with dynamic visuals",
                image: "/projects/luminescence.png"
              },
              {
                title: "Nexus Protocol",
                category: "Interactive Experience",
                description: "Immersive 3D environment for architectural visualization",
                image: "/projects/nexus-protocol.png"
              },
              {
                title: "Chromatic Motion",
                category: "Motion Design",
                description: "Award-winning animation system for streaming platform",
                image: "/projects/chromatic-motion.png"
              },
              {
                title: "Neural Systems",
                category: "AI Integration",
                description: "Intelligent design system powered by generative models",
                image: "/projects/neural-systems.png"
              },
              {
                title: "Zenith Campaign",
                category: "Digital Campaign",
                description: "Immersive brand campaign for luxury automotive client",
                image: "/projects/zenith-campaign.png"
              }
            ].map((project, idx) => (
              <ProjectTile
                key={idx}
                title={project.title}
                category={project.category}
                description={project.description}
                image={project.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 bg-black/35 backdrop-blur-2xl py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-8">Start Your Project</h2>
          <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
            Let&apos;s collaborate on something extraordinary. Every project begins with a conversation.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-black tracking-wide uppercase text-sm"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-black/85 backdrop-blur-sm border-t border-neutral-800 py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-neutral-600 tracking-widest">© 2024 NOIRE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
