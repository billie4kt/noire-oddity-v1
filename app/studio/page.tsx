"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"

export default function StudioPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(Math.min(48, window.scrollY))
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
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.18em] sm:tracking-[0.3em] mb-8 transition-transform"
          >
            Studio
          </h1>
          <p 
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
            className="text-lg md:text-xl tracking-wide text-neutral-400 transition-transform"
          >
            A collective of artists, technologists, and visionaries
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-20 bg-black/15 backdrop-blur-md py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            className="text-5xl md:text-6xl font-black tracking-tight mb-12 leading-tight transition-transform"
          >
            We exist at the intersection of culture and technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
              className="space-y-6 text-lg text-neutral-400 leading-relaxed transition-transform"
            >
              <p>
                Founded on the belief that design is a language, Project Noire creates work that speaks to the untold stories of our era. We don&apos;t just design—we architect experiences that challenge perception and inspire action.
              </p>
              <p>
                Our studio brings together specialists from around the world: animators, developers, strategists, and dreamers. Each project is a collaboration that pushes the boundaries of what&apos;s possible in digital space.
              </p>
            </div>
            <div 
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
              className="space-y-6 text-lg text-neutral-400 leading-relaxed transition-transform"
            >
              <p>
                We believe in the power of motion. Every pixel moves with intention. Every interaction tells a story. We craft systems that feel alive—responsive, intelligent, and deeply human.
              </p>
              <p>
                Our work has been recognized globally, but what matters most is the impact we create for our clients and the communities they serve. We measure success not in awards, but in transformative experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-20 bg-black/25 backdrop-blur-xl py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-16 uppercase">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision",
                description: "Every detail matters. We obsess over motion curves, spacing, typography, and interaction timing."
              },
              {
                title: "Innovation",
                description: "We embrace emerging technologies and creative methodologies to push design forward."
              },
              {
                title: "Authenticity",
                description: "Our work reflects genuine insight into culture, not trends. We create for the long term."
              },
              {
                title: "Collaboration",
                description: "The best ideas emerge from diverse perspectives. We listen, iterate, and evolve together."
              },
              {
                title: "Excellence",
                description: "We don't compromise on quality. Every project represents our commitment to craft."
              },
              {
                title: "Impact",
                description: "Design should create meaning. We build systems that matter to people and brands."
              }
            ].map((value, idx) => (
              <div 
                key={value.title}
                className="border border-neutral-800 p-8 hover:border-white transition-colors"
                style={{ transform: `translateY(${scrollY * (0.1 - idx * 0.02)}px)` }}
              >
                <h3 className="text-xl font-black tracking-wide mb-4">{value.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative z-20 bg-black/35 backdrop-blur-2xl py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-16 uppercase">Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Brand Strategy",
              "Visual Design",
              "Motion Graphics",
              "3D Animation",
              "Web Development",
              "Interactive Design",
              "Creative Direction",
              "Art Direction"
            ].map((skill) => (
              <div key={skill} className="border border-neutral-800 p-6 text-center hover:border-white transition-colors cursor-pointer">
                <p className="font-black tracking-wide uppercase text-sm">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 bg-black/45 backdrop-blur-3xl py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-8">Work With Us</h2>
          <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
            We&apos;re always interested in collaborating with visionary brands and forward-thinking organizations.
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
          <p className="text-xs text-neutral-600 tracking-widest">© 2024 Project Noire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
