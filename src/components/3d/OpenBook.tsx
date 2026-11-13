import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OpenBookProps {
  currentPage: number
  onPageTurn: (direction: 'next' | 'prev') => void
  totalPages: number
}

export function OpenBook3D({ currentPage, onPageTurn, totalPages }: OpenBookProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta

    // Subtle floating
    groupRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.05

    // Mouse tilt response
    const targetX = mouseRef.current.y * 0.08
    const targetY = mouseRef.current.x * 0.06
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03
  })

  const W = 3.0   // total open book width
  const H = 2.0   // height
  const D = 0.14  // spine depth

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left page */}
      <LeftPage width={W / 2} height={H} />

      {/* Right page */}
      <RightPage
        width={W / 2}
        height={H}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageTurn={onPageTurn}
      />

      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, H + 0.1, D + 0.08]} />
        <meshStandardMaterial color="#0D2E1F" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Back cover */}
      <mesh position={[0, 0, -(D / 2 + 0.01)]}>
        <boxGeometry args={[W + 0.12, H + 0.1, 0.03]} />
        <meshStandardMaterial color="#0D2E1F" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Page stack thickness on edges */}
      <mesh position={[-W / 2 - 0.02, 0, 0]}>
        <boxGeometry args={[0.04, H, D]} />
        <meshStandardMaterial color="#E8DECE" roughness={0.9} />
      </mesh>
      <mesh position={[W / 2 + 0.02, 0, 0]}>
        <boxGeometry args={[0.04, H, D]} />
        <meshStandardMaterial color="#E8DECE" roughness={0.9} />
      </mesh>
    </group>
  )
}

function LeftPage({ width, height }: { width: number; height: number }) {
  return (
    <group position={[-width / 2, 0, 0]}>
      <mesh position={[width / 2, 0, 0.001]}>
        <planeGeometry args={[width, height, 20, 1]} />
        <meshStandardMaterial
          color="#F4EBDD"
          roughness={0.6}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Page edge highlight */}
      <mesh position={[0.01, 0, 0]}>
        <boxGeometry args={[0.015, height, 0.06]} />
        <meshStandardMaterial color="#C8B99A" roughness={0.9} />
      </mesh>
    </group>
  )
}

function RightPage({ width, height, currentPage, totalPages, onPageTurn }: {
  width: number; height: number; currentPage: number; totalPages: number; onPageTurn: (d: 'next' | 'prev') => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [turning, setTurning] = useState(false)
  const turnProgressRef = useRef(0)

  const handleClick = () => {
    if (turning || currentPage >= totalPages - 1) return
    setTurning(true)
    turnProgressRef.current = 0
  }

  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (turning) {
      turnProgressRef.current += delta * 1.8
      const p = Math.min(turnProgressRef.current, 1)
      meshRef.current.rotation.y = -Math.PI * p
      if (p >= 1) {
        setTurning(false)
        onPageTurn('next')
        meshRef.current.rotation.y = 0
      }
    } else {
      const targetY = hovered ? -0.08 : 0
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.08
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={meshRef}
        position={[width / 2, 0, 0.001]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <planeGeometry args={[width, height, 20, 1]} />
        <meshStandardMaterial
          color={hovered ? '#EDE0CC' : '#F4EBDD'}
          roughness={0.6}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Page edge */}
      <mesh position={[width + 0.01, 0, 0]}>
        <boxGeometry args={[0.015, height, 0.06]} />
        <meshStandardMaterial color="#C8B99A" roughness={0.9} />
      </mesh>
    </group>
  )
}
