"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function generateParticleFabric(numPoints: number) {
  const points: number[] = []
  const rng = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // Create an evenly distributed point cloud with gentle organic variation
  const gridSize = Math.ceil(Math.cbrt(numPoints))
  const spacing = 8 / gridSize

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < gridSize; k++) {
        if (points.length / 3 >= numPoints) break

        const x = -4 + i * spacing + rng(i * 100 + j * 10 + k) * 0.3
        const y = -4 + j * spacing + rng(i * 50 + j * 200 + k * 30) * 0.3
        const z = -4 + k * spacing + rng(i * 150 + j * 75 + k * 200) * 0.3

        points.push(x, y, z)
      }
    }
  }

  return new Float32Array(points.slice(0, numPoints * 3))
}

export function StrangeAttractor() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [mouse3D, setMouse3D] = useState(new THREE.Vector3(0, 0, 0))
  const [showLogo, setShowLogo] = useState(false)
  const { camera, size } = useThree()

  const { positions, count } = useMemo(() => {
    const positions = generateParticleFabric(250000)
    const count = positions.length / 3
    return { positions, count }
  }, [])

  // Custom shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector3(0, 0, 0) },
          uMouseStrength: { value: 1.5 },
          uCameraPosition: { value: camera.position.clone() },
        },
        vertexShader: `
          uniform float uTime;
          uniform vec3 uMouse;
          uniform float uMouseStrength;
          uniform vec3 uCameraPosition;
          
          varying float vAlpha;
          varying float vMouseDist;
          
          void main() {
            vec3 pos = position;
            vec3 initialPos = pos;
            
            // Slow breathing motion
            float breathe = sin(uTime * 0.3) * 0.15;
            pos += normalize(pos) * breathe;
            
            // Subtle drift
            float driftX = sin(uTime * 0.15 + pos.y * 0.5) * 0.08;
            float driftY = cos(uTime * 0.12 + pos.x * 0.3) * 0.08;
            float driftZ = sin(uTime * 0.18 + pos.z * 0.4) * 0.06;
            pos += vec3(driftX, driftY, driftZ);
            
            // Mouse gravity interaction - particles orbit around cursor
            vec3 toMouse = uMouse - pos;
            float distToMouse = length(toMouse);
            float mouseInfluence = smoothstep(4.0, 0.2, distToMouse);
            mouseInfluence = pow(mouseInfluence, 1.2);
            
            // Orbital motion around mouse
            if (distToMouse > 0.01) {
              vec3 mouseNormal = normalize(toMouse);
              vec3 tangent = normalize(cross(mouseNormal, vec3(0.0, 1.0, 0.0)));
              if (length(tangent) < 0.1) tangent = vec3(1.0, 0.0, 0.0);
              vec3 binormal = cross(mouseNormal, tangent);
              
              float orbitSpeed = uTime * 2.0 - distToMouse * 3.0;
              float orbitRadius = distToMouse * 0.4;
              
              pos += (cos(orbitSpeed) * tangent + sin(orbitSpeed) * binormal) * orbitRadius * mouseInfluence * uMouseStrength;
              pos += mouseNormal * mouseInfluence * 0.3;
            }
            
            // Ripple effect from mouse
            float ripple = sin(distToMouse * 8.0 - uTime * 4.0) * mouseInfluence * 0.2;
            vec3 rippleDir = normalize(uMouse - initialPos);
            pos += rippleDir * ripple;
            
            // Distance-based density and depth sorting
            float distFromOrigin = length(pos);
            vAlpha = smoothstep(8.0, 0.0, distFromOrigin);
            vMouseDist = distToMouse;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Size based on depth and mouse proximity
            float depthSize = smoothstep(15.0, 2.0, length(uCameraPosition - (modelMatrix * vec4(pos, 1.0)).xyz));
            float mouseSize = mouseInfluence * 1.5;
            gl_PointSize = 0.8 + depthSize * 1.2 + mouseSize;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying float vMouseDist;
          
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            // Soft circle with glow
            float alpha = (1.0 - dist * dist) * vAlpha;
            
            // Subtle glow around particles
            float glow = smoothstep(0.5, 0.0, dist) * 0.3;
            alpha = mix(alpha, 1.0, glow * 0.4);
            
            // Very subtle lavender tint on mouse proximity
            float lavenderTint = smoothstep(2.0, 0.0, vMouseDist) * 0.08;
            
            vec3 color = mix(vec3(1.0), vec3(0.95, 0.93, 1.0), lavenderTint);
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [camera],
  )

  const handlePointerMove = (event: any) => {
    if (!pointsRef.current) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width * 2 - 1
    const y = -(event.clientY - rect.top) / rect.height * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)

    const planeZ = 0
    const planeNormal = new THREE.Vector3(0, 0, 1)
    const planePoint = new THREE.Vector3(0, 0, planeZ)
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, planePoint)

    const intersectPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, intersectPoint)

    if (intersectPoint) {
      setMouse3D(intersectPoint)
    }
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.copy(mouse3D)
      materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position)

      // Very subtle camera drift
      const driftX = Math.sin(state.clock.elapsedTime * 0.08) * 0.5
      const driftY = Math.cos(state.clock.elapsedTime * 0.06) * 0.3
      state.camera.position.x = driftX
      state.camera.position.y = driftY
      state.camera.position.z = 5
    }

    // Trigger logo reveal after 1.5s
    if (state.clock.elapsedTime > 1.5 && !showLogo) {
      setShowLogo(true)
    }
  })

  return (
    <points ref={pointsRef} onPointerMove={handlePointerMove} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  )
}
