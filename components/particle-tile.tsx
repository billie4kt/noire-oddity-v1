"use client"

import { Canvas } from "@react-three/fiber"
import { StrangeAttractor } from "@/components/strange-attractor"

interface ParticleTileProps {
  title: string
  category: string
  description: string
  index: number
}

export function ParticleTile({ title, category, description, index }: ParticleTileProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg aspect-square">
      {/* Particle background */}
      <div className="absolute inset-0 z-0 opacity-85">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }} 
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <StrangeAttractor />
        </Canvas>
      </div>

      {/* Overlay with gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/15 via-black/40 to-black/85" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transition-all duration-300 group-hover:from-black/25 group-hover:via-black/50 group-hover:to-black/90">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-white/70 border border-white/30 group-hover:border-white/80 transition-colors">
            {category}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
          {title}
        </h3>
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
