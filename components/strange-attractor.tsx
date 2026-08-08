"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function generateLorenzAttractor(numPoints: number) {
  const points: number[] = []

  // Lorenz attractor parameters
  const sigma = 10
  const rho = 28
  const beta = 8 / 3
  const dt = 0.005 // time step

  // Initial conditions
  let x = 0.1
  let y = 0
  let z = 0

  const scale = 0.08 // Scale down the attractor for better viewing

  for (let i = 0; i < numPoints; i++) {
    // Store current position
    points.push(x * scale, y * scale, z * scale)

    // Calculate derivatives (Lorenz equations)
    const dx = sigma * (y - x)
    const dy = x * (rho - z) - y
    const dz = x * y - beta * z

    // Update position using Euler method
    x += dx * dt
    y += dy * dt
    z += dz * dt
  }

  return new Float32Array(points)
}

export function StrangeAttractor() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 0))
  const mouseCurrent = useRef(new THREE.Vector3(0, 0, 0))
  const { camera } = useThree()

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const screen = new THREE.Vector2()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const point = new THREE.Vector3()

    const updatePointer = (clientX: number, clientY: number) => {
      screen.x = (clientX / window.innerWidth) * 2 - 1
      screen.y = -(clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(screen, camera)
      if (raycaster.ray.intersectPlane(plane, point)) {
        mouseTarget.current.copy(point)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerMove)
    }
  }, [camera])

  const positions = useMemo(() => generateLorenzAttractor(65000), [])

  // Custom shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector3(0, 0, 0) },
          uMagnetStrength: { value: 0.9 },
          uCameraPosition: { value: new THREE.Vector3(0, 0, 5) },
        },
        vertexShader: `
          uniform float uTime;
          uniform vec3 uMouse;
          uniform float uMagnetStrength;
          uniform vec3 uCameraPosition;
          varying float vDistanceFromCenter;
          varying float vMouseInfluence;
          varying vec3 vWorldPosition;
          varying vec3 vNormal;
          varying float vDepth;
          
          mat3 rotateY(float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return mat3(
              c, 0.0, s,
              0.0, 1.0, 0.0,
              -s, 0.0, c
            );
          }
          
          void main() {
            vec3 pos = position;
            
            vec3 spiralCenter1 = vec3(0.8, 0.0, 0.8);  // Right lobe
            vec3 spiralCenter2 = vec3(-0.8, 0.0, 0.8); // Left lobe
            
            float dist1 = length(pos - spiralCenter1);
            float dist2 = length(pos - spiralCenter2);
            
            vec3 closestCenter = dist1 < dist2 ? spiralCenter1 : spiralCenter2;
            float spiralDist = min(dist1, dist2);
            
            float spiralInfluence = smoothstep(2.5, 0.0, spiralDist);
            float spiralSpeed = spiralInfluence * 0.8;
            
            float angle = atan(pos.x - closestCenter.x, pos.z - closestCenter.z);
            float heightPhase = (pos.y - closestCenter.y) * 0.5;
            float spiralPhase = angle * 0.3 + heightPhase;
            
            vec3 offsetFromCenter = pos - closestCenter;
            float rotationAngle = uTime * spiralSpeed + spiralPhase;
            
            if (dist1 < dist2) {
              rotationAngle *= 1.0;
            } else {
              rotationAngle *= -1.0;
            }
            
            offsetFromCenter = rotateY(rotationAngle * 0.15) * offsetFromCenter;
            pos = closestCenter + offsetFromCenter;
            
            vec3 toCenter = -normalize(pos);
            float distFromOrigin = length(pos);
            float gravityStrength = smoothstep(3.0, 0.3, distFromOrigin);
            float gravityPull = sin(uTime * 0.5 + distFromOrigin * 2.0) * gravityStrength * 0.08;
            pos += toCenter * gravityPull;
            
            float streamEffect = sin(uTime * 2.0 - distFromOrigin * 8.0) * gravityStrength * 0.025;
            pos += toCenter * streamEffect;
            
            float distFromCenter = length(pos);
            vDistanceFromCenter = smoothstep(6.0, 0.0, distFromCenter);
            
            vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
            vWorldPosition = worldPos;
            vNormal = normalize((modelMatrix * vec4(normalize(pos), 0.0)).xyz);
            
            float depthFromCamera = length(uCameraPosition - worldPos);
            vDepth = depthFromCamera;
            
            float distToMouse = length(worldPos - uMouse);
            float magneticInfluence = smoothstep(3.0, 0.0, distToMouse);
            magneticInfluence = pow(magneticInfluence, 0.7);
            vMouseInfluence = magneticInfluence;
            
            vec3 direction = normalize(uMouse - worldPos);
            vec3 perpendicular = cross(direction, vec3(0.0, 0.0, 1.0));
            pos += direction * magneticInfluence * uMagnetStrength;
            pos += perpendicular * magneticInfluence * 0.5 * sin(uTime * 2.0 + length(worldPos) * 3.0);
            
            float wave = sin(distToMouse * 5.0 - uTime * 3.0) * magneticInfluence * 0.2;
            pos += direction * wave;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            float depthSize = smoothstep(12.0, 4.0, depthFromCamera);
            gl_PointSize = 0.75 + depthSize * 2.2 + magneticInfluence * 0.9;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying float vDistanceFromCenter;
          varying float vMouseInfluence;
          varying vec3 vWorldPosition;
          varying vec3 vNormal;
          varying float vDepth;
          
          vec3 getIridescentColor(vec3 worldPos, vec3 normal, float time) {
            float angle = atan(worldPos.y, worldPos.x);
            float height = worldPos.z;
            float radius = length(worldPos.xy);
            
            float colorShift = angle * 0.8 + height * 0.5 + time * 0.15;
            float colorShift2 = radius * 1.2 - time * 0.1;
            float colorShift3 = (worldPos.x + worldPos.y) * 0.7 + time * 0.08;
            
            vec3 color1 = vec3(0.12, 0.3, 0.5);   // deeper, more muted blue
            vec3 color2 = vec3(0.3, 0.12, 0.45);  // deeper, more muted purple
            vec3 color3 = vec3(0.45, 0.15, 0.3);  // more muted magenta
            vec3 color4 = vec3(0.12, 0.35, 0.4);  // deeper, more muted cyan
            vec3 color5 = vec3(0.35, 0.15, 0.35); // more muted violet
            
            vec3 iridescent = mix(color1, color2, sin(colorShift) * 0.5 + 0.5);
            iridescent = mix(iridescent, color3, cos(colorShift * 1.3) * 0.5 + 0.5);
            iridescent = mix(iridescent, color4, sin(colorShift2 * 0.8) * 0.5 + 0.5);
            iridescent = mix(iridescent, color5, cos(colorShift3 * 1.1) * 0.5 + 0.5);
            
            iridescent *= 0.75;
            
            return iridescent;
          }
          
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            if (dist > 0.5) discard;
            
            float depthFade = smoothstep(14.0, 4.0, vDepth);
            depthFade = pow(depthFade, 1.5);
            
            float alpha = smoothstep(0.0, 0.8, vDistanceFromCenter);
            alpha = mix(alpha, 1.0, vMouseInfluence * 0.4);
            
            alpha *= depthFade * 0.62 + 0.24;
            
            vec3 iridescent = getIridescentColor(vWorldPosition, vNormal, uTime);
            
            float depthIntensity = smoothstep(12.0, 4.0, vDepth);
            
            vec3 finalColor = mix(vec3(0.8), iridescent, 0.25 + depthIntensity * 0.15);
            
            finalColor *= 1.0 + vMouseInfluence * 0.1;
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      pointsRef.current.rotation.y += 0.0007
      pointsRef.current.rotation.x += 0.0002

      mouseCurrent.current.lerp(mouseTarget.current, 0.12)
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.copy(mouseCurrent.current)
      materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  )
}
