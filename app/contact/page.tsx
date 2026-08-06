"use client"

import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(Math.min(48, window.scrollY))
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

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
            Contact
          </h1>
          <p 
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
            className="text-lg md:text-xl tracking-wide text-neutral-400 transition-transform"
          >
            Let&apos;s create something extraordinary together
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 bg-black/35 backdrop-blur-2xl py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div 
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            className="transition-transform"
          >
            <h2 className="text-4xl font-black tracking-tight mb-12">Get in Touch</h2>
            
            <div className="space-y-12">
              <div>
                <p className="text-xs tracking-widest uppercase opacity-60 mb-3">Email</p>
                <a href="mailto:hello@noire.studio" className="text-xl font-bold hover:opacity-80 transition-opacity">
                  hello@noire.studio
                </a>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase opacity-60 mb-3">Location</p>
                <p className="text-neutral-400">
                  Creative District<br />
                  Los Angeles, CA<br />
                  United States
                </p>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Follow</p>
                <div className="flex gap-6">
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Instagram</a>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">LinkedIn</a>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Twitter</a>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Dribbble</a>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase opacity-60 mb-3">Response Time</p>
                <p className="text-neutral-400">
                  We typically respond within 24 hours.<br />
                  For urgent matters, please call our studio.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            className="transition-transform"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs tracking-widest uppercase opacity-60 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 text-white placeholder-neutral-600 focus:border-white outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs tracking-widest uppercase opacity-60 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 text-white placeholder-neutral-600 focus:border-white outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs tracking-widest uppercase opacity-60 mb-3">
                  Company / Project
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 text-white placeholder-neutral-600 focus:border-white outline-none transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase opacity-60 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 text-white placeholder-neutral-600 focus:border-white outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-black tracking-wide uppercase text-sm w-full md:w-auto"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="relative z-20 bg-black/45 backdrop-blur-3xl py-24 px-8 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-black tracking-wide mb-4">Collaboration</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We collaborate with brands, agencies, and organizations on projects of all scales. Whether you need a full rebrand or a single interactive experience, we&apos;re ready to discuss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide mb-4">Timeline</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Most projects range from 3-6 months. We&apos;ll discuss timelines and deliverables in our initial conversation to ensure alignment and set realistic expectations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide mb-4">Investment</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We provide custom proposals based on project scope, complexity, and your business objectives. There&apos;s no template rate—each project is unique.
              </p>
            </div>
          </div>
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
