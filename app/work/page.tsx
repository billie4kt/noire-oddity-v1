"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
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
      <section className="relative z-10 w-full h-screen flex items-center justify-center">
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
      <section className="relative z-20 bg-black/80 backdrop-blur-sm py-24 px-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                id: 1,
                title: "Quantum Interface",
                category: "Digital Product",
                description: "A revolutionary platform for real-time data visualization and analysis"
              },
              {
                id: 2,
                title: "Luminescence",
                category: "Brand Identity",
                description: "Luxury fashion brand identity system with dynamic visual language"
              },
              {
                id: 3,
                title: "Nexus Protocol",
                category: "Interactive Experience",
                description: "Immersive 3D environment for architectural visualization"
              },
              {
                id: 4,
                title: "Chromatic Motion",
                category: "Motion Design",
                description: "Award-winning animation system for streaming platform"
              },
              {
                id: 5,
                title: "Neural Systems",
                category: "AI Integration",
                description: "Intelligent design system powered by generative models"
              },
              {
                id: 6,
                title: "Zenith Campaign",
                category: "Digital Campaign",
                description: "Immersive brand campaign for luxury automotive client"
              }
            ].map((project, idx) => (
              <div 
                key={project.id}
                className="group cursor-pointer"
                style={{ transform: `translateY(${scrollY * (0.15 - idx * 0.03)}px)` }}
              >
                <div className="aspect-square bg-neutral-900/60 hover:bg-neutral-800 transition-all duration-300 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/0 to-neutral-900/0 group-hover:from-neutral-800/30 group-hover:to-neutral-900/30 transition-all" />
                  <div className="relative z-10 text-center">
                    <div className="text-5xl font-black opacity-10 group-hover:opacity-20 transition-opacity mb-4">
                      0{project.id}
                    </div>
                    <h3 className="text-2xl font-black tracking-wide mb-2">{project.title}</h3>
                    <p className="text-sm tracking-widest uppercase opacity-60 mb-4">{project.category}</p>
                    <p className="text-sm text-neutral-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 bg-black/80 backdrop-blur-sm py-24 px-8">
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
      <footer className="relative z-20 bg-black/80 backdrop-blur-sm border-t border-neutral-800 py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-neutral-600 tracking-widest">© 2024 NOIRE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
