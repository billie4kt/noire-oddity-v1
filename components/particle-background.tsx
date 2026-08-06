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
      className={`fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: 'none', touchAction: 'none' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent', pointerEvents: 'none', opacity: 0.34 }}
      >
        <StrangeAttractor />
      </Canvas>
    </div>
  )
}
