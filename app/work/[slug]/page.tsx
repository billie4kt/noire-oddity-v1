import { notFound } from "next/navigation"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { getProject, projects } from "@/lib/projects"

type ProjectPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  return project ? { title: `${project.title} | Project Noire`, description: project.description } : {}
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  return <ProjectCaseStudy project={project} nextProject={nextProject} />
}
