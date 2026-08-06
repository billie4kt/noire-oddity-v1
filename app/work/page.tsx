"use client"

import { Navigation } from "@/components/navigation"
import { ParticleBackground } from "@/components/particle-background"
import { ProjectTile } from "@/components/project-tile"
import { useCappedParallax } from "@/components/capped-parallax"
import { projects } from "@/lib/projects"

export default function WorkPage() {
  const heroOffset = useCappedParallax(24, 0.06)

  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <ParticleBackground />
      <Navigation />
      <section className="relative z-10 flex min-h-[72svh] items-end bg-black/40 px-4 pb-16 pt-32 backdrop-blur-sm sm:px-8 sm:pb-24">
        <div className="mx-auto w-full max-w-6xl" style={{ transform: `translate3d(0, ${heroOffset}px, 0)` }}>
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/55">Project Noire / Selected work</p>
          <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-9xl">Projects made to stay with you.</h1>
        </div>
      </section>
      <section className="relative z-10 border-t border-white/15 bg-black/45 px-4 py-16 backdrop-blur-3xl sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <p className="max-w-md text-pretty text-base leading-7 text-white/60">A selection of identities, interfaces, and worlds built for culture-forward organizations.</p>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-white/40 sm:block">06 projects</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
            {projects.map((project) => <ProjectTile key={project.slug} {...project} />)}
          </div>
        </div>
      </section>
      <section className="relative z-10 border-t border-white/15 bg-black/35 px-4 py-20 text-center backdrop-blur-2xl sm:px-8 sm:py-28">
        <h2 className="text-balance text-4xl font-black tracking-tight sm:text-6xl">Start your project.</h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-white/60">Let&apos;s collaborate on something extraordinary. Every project begins with a conversation.</p>
        <a href="/contact" className="mt-9 inline-block border-2 border-white px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black">Get in touch</a>
      </section>
      <footer className="relative z-10 border-t border-white/15 bg-black/85 px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl text-xs tracking-[0.18em] text-white/40">© 2026 Project Noire. All rights reserved.</div>
      </footer>
    </main>
  )
}
