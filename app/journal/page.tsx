"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"

export default function JournalPage() {
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
            Journal
          </h1>
          <p 
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
            className="text-lg md:text-xl tracking-wide text-neutral-400 transition-transform"
          >
            Thoughts, insights, and reflections on design and culture
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative z-20 bg-black/80 backdrop-blur-sm py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {[
              {
                id: 1,
                title: "The Future of Motion in Digital Design",
                date: "March 15, 2024",
                category: "Design",
                excerpt: "Motion is no longer a enhancement—it's a fundamental language. We explore how generative systems are revolutionizing the way we think about animation.",
                readTime: "8 min read"
              },
              {
                id: 2,
                title: "Building Living Systems",
                date: "February 28, 2024",
                category: "Technology",
                excerpt: "The most compelling digital experiences feel alive. We discuss principles for creating interfaces that respond intelligently to user context.",
                readTime: "12 min read"
              },
              {
                id: 3,
                title: "Luxury in the Digital Age",
                date: "February 10, 2024",
                category: "Culture",
                excerpt: "What defines luxury when everything is digital? A meditation on craftsmanship, scarcity, and value in the 21st century.",
                readTime: "10 min read"
              },
              {
                id: 4,
                title: "On Craft and Attention",
                date: "January 22, 2024",
                category: "Philosophy",
                excerpt: "In a world of speed and scale, there's radical value in slowness. A reflection on why precision and care matter more than ever.",
                readTime: "6 min read"
              },
              {
                id: 5,
                title: "Designing for Emergence",
                date: "January 8, 2024",
                category: "Design",
                excerpt: "Predictable design is safe. Emergent design is alive. We explore systems that grow and evolve beyond their initial parameters.",
                readTime: "14 min read"
              },
              {
                id: 6,
                title: "The Language of Color",
                date: "December 15, 2023",
                category: "Design",
                excerpt: "Color isn't decoration—it's communication. A deep dive into how we use chromatic systems to tell stories and evoke emotion.",
                readTime: "11 min read"
              }
            ].map((article, idx) => (
              <article 
                key={article.id}
                className="group cursor-pointer pb-16 border-b border-neutral-800 hover:border-neutral-700 transition-colors"
                style={{ transform: `translateY(${scrollY * (0.1 - idx * 0.02)}px)` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs tracking-widest uppercase opacity-60">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:opacity-80 transition-opacity">
                    {article.title}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
                    {article.excerpt}
                  </p>
                  <div className="pt-4">
                    <button className="text-sm font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                      Read Article →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-20 bg-black/80 backdrop-blur-sm py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Stay Updated</h2>
          <p className="text-neutral-400 mb-8">
            Get our latest insights and thoughts delivered to your inbox monthly.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-white outline-none transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-black font-black tracking-wide uppercase hover:opacity-80 transition-opacity"
            >
              Subscribe
            </button>
          </form>
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
