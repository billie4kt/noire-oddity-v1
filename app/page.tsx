"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { ProjectTile } from "@/components/project-tile"
import { useState, useEffect } from "react"

export default function Page() {
  const [showLogo, setShowLogo] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(Math.min(48, window.scrollY))
    const handlePointerMove = (event: PointerEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  const titleTransform = `translate3d(${pointer.x * 18}px, ${scrollY * 0.5 + pointer.y * 12}px, 0) rotateX(${pointer.y * -3}deg) rotateY(${pointer.x * 5}deg) skewX(${pointer.x * 0.8}deg)`

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* Fixed Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-black/15">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {showLogo && (
            <div 
              className="mb-12 animate-in fade-in duration-1000"
              style={{
                transform: titleTransform,
                transformStyle: "preserve-3d",
                transition: "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <h1
                className="project-noire-title font-mono text-4xl font-black uppercase tracking-[0.16em] text-white sm:text-6xl sm:tracking-[0.24em] md:text-8xl"
                data-text="PROJECT NOIRE"
              >
                PROJECT NOIRE
              </h1>
              <p className="text-lg md:text-xl tracking-wide text-neutral-400 mb-2">
                Creative Systems for Culture
              </p>
              <p className="text-sm tracking-widest text-neutral-500 uppercase">
                Luxury • Motion • Digital • Identity
              </p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="text-xs tracking-widest opacity-50">SCROLL</div>
        </div>
      </section>

      {/* Section 2: Design Philosophy */}
      <section className="relative z-20 min-h-screen bg-black/15 backdrop-blur-md py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div 
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
              className="transition-transform"
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                We design<br />things people<br />remember
              </h2>
            </div>
            <div 
              style={{ transform: `translateY(${scrollY * -0.2}px)` }}
              className="text-neutral-400 space-y-6 text-lg leading-relaxed transition-transform"
            >
              <p>
                At Project Noire, we believe the most powerful design isn&apos;t just seen—it&apos;s felt. 
                Every project we create emerges from a deep understanding of culture, motion, and 
                the spaces between intention and perception.
              </p>
              <p>
                We craft experiences that linger. That evolve. That make you question what you thought 
                was possible in the digital realm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Capabilities */}
      <section className="relative z-20 min-h-screen bg-black/25 backdrop-blur-xl py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            className="text-4xl font-black tracking-tight mb-20 uppercase transition-transform"
          >
            Capabilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              "Brand Systems",
              "Digital Products",
              "Interactive Experiences",
              "Motion Design",
              "Campaigns",
              "3D & Spatial",
              "AI Integration",
              "Emerging Tech"
            ].map((capability, idx) => (
              <div 
                key={capability} 
                className="group cursor-pointer"
                style={{ transform: `translateY(${scrollY * (0.1 + idx * 0.02)}px)` }}
              >
                <div className="text-sm tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity mb-4">
                  {capability}
                </div>
                <div className="w-12 h-0.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Industries */}
      <section className="relative z-20 min-h-screen bg-black/35 backdrop-blur-2xl py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            className="text-4xl font-black tracking-tight mb-20 uppercase transition-transform"
          >
            Industries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Gaming", desc: "High-energy interactive experiences" },
              { name: "Luxury Fashion", desc: "Refined digital storytelling" },
              { name: "Film & Entertainment", desc: "Cinematic motion design" },
              { name: "Automotive", desc: "Dynamic product visualization" },
              { name: "Music & Audio", desc: "Sonic visual integration" },
              { name: "Technology", desc: "Forward-thinking innovation" }
            ].map((industry) => (
              <div key={industry.name} className="group border border-neutral-800 hover:border-white p-8 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold tracking-wide mb-2">{industry.name}</h3>
                <p className="text-neutral-500 text-sm">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Work */}
      <section className="relative z-20 min-h-screen bg-black/45 backdrop-blur-3xl py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            className="text-4xl font-black tracking-tight mb-20 uppercase transition-transform"
          >
            Selected Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                slug: "quantum-interface",
                title: "Quantum Interface",
                category: "Digital Product",
                description: "Revolutionary platform for real-time data visualization",
                image: "/projects/quantum-interface.png"
              },
              {
                slug: "luminescence",
                title: "Luminescence",
                category: "Brand Identity",
                description: "Luxury fashion identity system with dynamic visuals",
                image: "/projects/luminescence.png"
              },
              {
                slug: "nexus-protocol",
                title: "Nexus Protocol",
                category: "Interactive Experience",
                description: "Immersive 3D environment for architectural viz",
                image: "/projects/nexus-protocol.png"
              },
              {
                slug: "chromatic-motion",
                title: "Chromatic Motion",
                category: "Motion Design",
                description: "Award-winning animation for streaming platform",
                image: "/projects/chromatic-motion.png"
              }
            ].map((project, idx) => (
              <ProjectTile
                key={idx}
                slug={project.slug}
                title={project.title}
                category={project.category}
                description={project.description}
                image={project.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-black/85 backdrop-blur-sm border-t border-neutral-800 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-black tracking-wide mb-4">Project Noire</h3>
              <p className="text-neutral-500 text-sm">Creative Systems for Culture</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Navigation</p>
              <div className="space-y-2 text-sm">
                <a href="/work" className="block opacity-60 hover:opacity-100 transition-opacity">Work</a>
                <a href="/studio" className="block opacity-60 hover:opacity-100 transition-opacity">Studio</a>
                <a href="/journal" className="block opacity-60 hover:opacity-100 transition-opacity">Journal</a>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Connect</p>
              <div className="space-y-2 text-sm">
                <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">Instagram</a>
                <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">LinkedIn</a>
                <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">Twitter</a>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Contact</p>
              <a href="mailto:hello@noire.studio" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                hello@noire.studio
              </a>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center">
            <p className="text-xs text-neutral-600 tracking-widest">© 2024 Project Noire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
