import Image from "next/image"
import Link from "next/link"
import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import type { Project } from "@/lib/projects"

export function ProjectCaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <ParticleBackground />
      <Navigation />
      <article className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-8 sm:pt-40">
        <Link href="/work" className="text-xs uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white">← All work</Link>
        <header className="grid gap-10 rounded-sm bg-black/25 px-4 pb-20 pt-10 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/55">{project.category} / {project.year}</p>
            <h1 className="max-w-3xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-8xl">{project.title}</h1>
          </div>
          <p className="max-w-md text-pretty text-base leading-7 text-white/65 sm:text-lg">{project.description}</p>
        </header>
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/15 bg-white/5">
          <Image src={project.image} alt={`${project.title} project artwork`} fill priority sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <section className="grid gap-12 border-b border-white/15 py-16 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="grid grid-cols-2 gap-8 text-xs uppercase tracking-[0.2em] text-white/50">
            <div><span className="mb-3 block text-white/35">Year</span>{project.year}</div>
            <div><span className="mb-3 block text-white/35">Services</span><span className="block leading-6 tracking-[0.12em] text-white/75">{project.services.join(" / ")}</span></div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-14">
            <div><p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">The brief</p><p className="text-pretty text-xl leading-8 text-white/85">{project.overview}</p></div>
            <div><p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">The result</p><p className="text-pretty text-xl leading-8 text-white/85">{project.outcome}</p></div>
          </div>
        </section>
        <footer className="flex flex-col gap-5 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-24">
          <div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">Next project</p><h2 className="text-3xl font-black tracking-tight sm:text-5xl">{nextProject.title}</h2></div>
          <Link href={`/work/${nextProject.slug}`} className="w-fit border-b border-white/50 pb-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-white">View case study →</Link>
        </footer>
      </article>
    </main>
  )
}
