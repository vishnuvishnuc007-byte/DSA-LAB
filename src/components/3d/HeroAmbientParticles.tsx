import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 55 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  // Generate lightweight random particle positions and colors
  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const scs = new Float32Array(count)

    const palette = [
      new THREE.Color('#A8E6CF'), // Mint
      new THREE.Color('#769A84'), // Soft Emerald
      new THREE.Color('#FFFFFF'), // Pure Specular White
      new THREE.Color('#0B513B'), // Deep Forest
    ]

    for (let i = 0; i < count; i++) {
      // Spread across hero volume
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6

      const col = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = col.r
      cols[i * 3 + 1] = col.g
      cols[i * 3 + 2] = col.b

      scs[i] = 0.8 + Math.random() * 1.5
    }

    return [pos, cols, scs]
  }, [count])

  // Track mouse gently
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Smooth lerp mouse influence
    mouseRef.current.targetX = state.pointer.x * 0.4
    mouseRef.current.targetY = state.pointer.y * 0.3
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

    // Gentle global drift
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03 + mouseRef.current.x * 0.2
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.04 - mouseRef.current.y * 0.15

    // Breathing pulse
    const positionsAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const time = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const y = positions[i * 3 + 1] + Math.sin(time * 0.8 + i) * 0.15
      positionsAttr.setY(i, y)
    }
    positionsAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroAmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}

