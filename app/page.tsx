"use client"

import { Canvas } from "@react-three/fiber"
import { StrangeAttractor } from "@/components/strange-attractor"

export default function Page() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
        <StrangeAttractor />
      </Canvas>
    </div>
  )
}
