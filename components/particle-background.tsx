"use client"

import { Canvas } from "@react-three/fiber"
import { StrangeAttractor } from "@/components/strange-attractor"

interface ParticleBackgroundProps {
  className?: string
  pointerEvents?: boolean
}

export function ParticleBackground({ 
  className = "",
  pointerEvents = true 
}: ParticleBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: pointerEvents ? 'auto' : 'none' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <StrangeAttractor />
      </Canvas>
    </div>
  )
}
