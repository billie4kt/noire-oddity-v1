"use client"

import { Canvas } from "@react-three/fiber"
import { StrangeAttractor } from "@/components/strange-attractor"
import { useState, useEffect } from "react"

export default function Page() {
  const [showLogo, setShowLogo] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center">
        {/* Particle Fabric Background */}
        <div className="absolute inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }} 
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <StrangeAttractor />
          </Canvas>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
          <div className="text-lg font-bold tracking-widest">NOIRE</div>
          <div className="flex gap-8 text-sm tracking-wide">
            <a href="#work" className="opacity-70 hover:opacity-100 transition-opacity">Work</a>
            <a href="#studio" className="opacity-70 hover:opacity-100 transition-opacity">Studio</a>
            <a href="#journal" className="opacity-70 hover:opacity-100 transition-opacity">Journal</a>
            <a href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Logo with pixel reveal animation */}
          {showLogo && (
            <div className="mb-12 animate-in fade-in duration-1000">
              <h1 className="text-7xl md:text-8xl font-black tracking-[0.3em] mb-8">
                NOIRE
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
      <section id="studio" className="relative min-h-screen bg-black py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
                We design<br />things people<br />remember
              </h2>
            </div>
            <div className="text-neutral-400 space-y-6 text-lg leading-relaxed">
              <p>
                At NOIRE, we believe the most powerful design isn&apos;t just seen—it&apos;s felt. 
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
      <section className="relative min-h-screen bg-black py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-20 uppercase">Capabilities</h2>
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
            ].map((capability) => (
              <div key={capability} className="group cursor-pointer">
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
      <section className="relative min-h-screen bg-black py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-20 uppercase">Industries</h2>
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
      <section id="work" className="relative min-h-screen bg-black py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-20 uppercase">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center group">
                <div className="text-center">
                  <div className="text-5xl font-black opacity-20 group-hover:opacity-40 transition-opacity">
                    {item}
                  </div>
                  <p className="text-sm text-neutral-500 mt-4">Project {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative bg-black border-t border-neutral-800 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-black tracking-wide mb-4">NOIRE</h3>
              <p className="text-neutral-500 text-sm">Creative Systems for Culture</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Navigation</p>
              <div className="space-y-2 text-sm">
                <a href="#work" className="block opacity-60 hover:opacity-100 transition-opacity">Work</a>
                <a href="#studio" className="block opacity-60 hover:opacity-100 transition-opacity">Studio</a>
                <a href="#journal" className="block opacity-60 hover:opacity-100 transition-opacity">Journal</a>
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
            <p className="text-xs text-neutral-600 tracking-widest">© 2024 NOIRE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
