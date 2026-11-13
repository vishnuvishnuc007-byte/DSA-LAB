import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// 1. Photorealistic Cover Base Color (Albedo) Map
function createRealisticCoverAlbedo(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1600
  canvas.height = 2200
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Rich luxury cream bookcloth paper
  ctx.fillStyle = '#F8F5EC'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Paper fiber texture / micro-grain
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8
    d[i] = Math.min(255, Math.max(0, d[i] + noise))
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise))
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise))
  }
  ctx.putImageData(imgData, 0, 0)

  // Soft vignette shading towards the book edges
  const vignette = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 400,
    canvas.width / 2, canvas.height / 2, 1300
  )
  vignette.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
  vignette.addColorStop(0.7, 'rgba(238, 230, 214, 0.3)')
  vignette.addColorStop(1, 'rgba(205, 192, 172, 0.75)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Debossed frame rule line
  ctx.strokeStyle = '#D1C2A5'
  ctx.lineWidth = 4
  ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160)

  // Inner accent line
  ctx.strokeStyle = '#E2D5BE'
  ctx.lineWidth = 1.5
  ctx.strokeRect(95, 95, canvas.width - 190, canvas.height - 190)

  // Spine hinge groove shadow on left edge
  const hingeGrad = ctx.createLinearGradient(0, 0, 90, 0)
  hingeGrad.addColorStop(0, 'rgba(0, 0, 0, 0.25)')
  hingeGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.08)')
  hingeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = hingeGrad
  ctx.fillRect(0, 0, 90, canvas.height)

  // Title: "DSA" (Didone editorial serif)
  ctx.fillStyle = '#123D2C'
  ctx.textAlign = 'center'
  ctx.font = '900 290px "Playfair Display", Georgia, serif'
  ctx.letterSpacing = '-8px'
  ctx.fillText('DSA', canvas.width / 2, 380)

  // Title: "LAB"
  ctx.font = '900 270px "Playfair Display", Georgia, serif'
  ctx.letterSpacing = '-6px'
  ctx.fillText('LAB', canvas.width / 2, 610)

  // Center gold/mint foil divider rule
  ctx.strokeStyle = '#123D2C'
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 - 180, 670)
  ctx.lineTo(canvas.width / 2 + 180, 670)
  ctx.stroke()

  // Subtitle: "DATA STRUCTURES AND ALGORITHMS"
  ctx.font = '700 38px "Inter", sans-serif'
  ctx.letterSpacing = '10px'
  ctx.fillStyle = '#1B4D38'
  ctx.fillText('DATA STRUCTURES', canvas.width / 2, 745)
  ctx.fillText('AND ALGORITHMS', canvas.width / 2, 800)

  // Bottom Tagline: "BUILD  •  ANALYZE  •  OPTIMIZE"
  ctx.font = '700 34px "Inter", sans-serif'
  ctx.letterSpacing = '14px'
  ctx.fillStyle = '#658B77'
  ctx.fillText('BUILD   •   ANALYZE   •   OPTIMIZE', canvas.width / 2, 1980)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// 2. Photorealistic Cover Normal & Bump Map (creates real tactile debossing)
function createRealisticCoverNormal(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1400
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Flat normal color (RGB: 128, 128, 255)
  ctx.fillStyle = '#8080FF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add subtle paper micro-bump noise
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    const nx = (Math.random() - 0.5) * 6
    const ny = (Math.random() - 0.5) * 6
    d[i] = Math.min(255, Math.max(0, 128 + nx))
    d[i + 1] = Math.min(255, Math.max(0, 128 + ny))
    d[i + 2] = 255
  }
  ctx.putImageData(imgData, 0, 0)

  // Debossed border groove normal
  ctx.strokeStyle = '#6060FF'
  ctx.lineWidth = 3
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100)

  // Left hinge groove (indents into book)
  ctx.strokeStyle = '#4040FF'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(35, 0)
  ctx.lineTo(35, canvas.height)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// 3. Photorealistic Cover Roughness Map (matte paper vs glossy foil)
function createRealisticCoverRoughness(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1400
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Matte paper background: High roughness (0.75 -> light grey)
  ctx.fillStyle = '#C0C0C0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Letters have lower roughness for specular sheen (0.2 -> dark grey)
  ctx.fillStyle = '#303030'
  ctx.textAlign = 'center'
  ctx.font = '900 180px "Playfair Display", Georgia, serif'
  ctx.fillText('DSA', canvas.width / 2, 250)
  ctx.font = '900 165px "Playfair Display", Georgia, serif'
  ctx.fillText('LAB', canvas.width / 2, 400)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// 4. Photorealistic Spine Texture
function createRealisticSpineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 2200
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Deep dark forest green buckram cloth
  ctx.fillStyle = '#091E15'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Cloth weave texture
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12
    d[i] = Math.min(255, Math.max(0, d[i] + noise))
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise))
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise))
  }
  ctx.putImageData(imgData, 0, 0)

  // Subtle curved lighting along the cylinder
  const spineGrad = ctx.createLinearGradient(0, 0, canvas.width, 0)
  spineGrad.addColorStop(0, 'rgba(0, 0, 0, 0.4)')
  spineGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.1)')
  spineGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)')
  spineGrad.addColorStop(1, 'rgba(0, 0, 0, 0.5)')
  ctx.fillStyle = spineGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Gold/mint border lines
  ctx.strokeStyle = '#B8E8D0'
  ctx.lineWidth = 4
  ctx.strokeRect(35, 70, canvas.width - 70, canvas.height - 140)

  // Vertical Spine Title: "DSA LAB" in crisp Didone serif
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillStyle = '#F8F5EC'
  ctx.font = '900 150px "Playfair Display", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '10px'
  ctx.fillText('DSA LAB', 0, 50)
  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// 5. Realistic Page Edges Texture (simulating thousands of stacked paper sheets)
function createPageEdgesTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Base warm cream paper edge
  ctx.fillStyle = '#F3EBDD'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw hundreds of fine horizontal lines representing stacked pages
  for (let y = 0; y < canvas.height; y += 2) {
    const alpha = 0.08 + Math.random() * 0.15
    const shade = Math.random() > 0.5 ? 180 : 230
    ctx.fillStyle = `rgba(${shade}, ${shade - 15}, ${shade - 30}, ${alpha})`
    ctx.fillRect(0, y, canvas.width, 1.2)
  }

  // Edge aging & depth shading
  const edgeShade = ctx.createLinearGradient(0, 0, canvas.width, 0)
  edgeShade.addColorStop(0, 'rgba(0, 0, 0, 0.12)')
  edgeShade.addColorStop(0.1, 'rgba(0, 0, 0, 0.02)')
  edgeShade.addColorStop(0.9, 'rgba(0, 0, 0, 0.02)')
  edgeShade.addColorStop(1, 'rgba(0, 0, 0, 0.12)')
  ctx.fillStyle = edgeShade
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 4)
  texture.needsUpdate = true
  return texture
}

// 6. Realistic 3D Embossed Metallic Circuit Brain
function EmbossedCircuitBrain() {
  const brainRef = useRef<THREE.Group>(null)

  // Generate circuit path data
  const traces = useMemo(() => {
    const paths: { start: [number, number]; points: [number, number][] }[] = [
      { start: [-0.05, 0.35], points: [[-0.2, 0.35], [-0.35, 0.22], [-0.52, 0.22]] },
      { start: [-0.05, 0.18], points: [[-0.28, 0.18], [-0.38, 0.06], [-0.55, 0.06]] },
      { start: [-0.05, 0.0], points: [[-0.18, 0.0], [-0.3, -0.12], [-0.52, -0.12]] },
      { start: [-0.05, -0.18], points: [[-0.22, -0.18], [-0.35, -0.3], [-0.48, -0.3]] },
      { start: [-0.05, -0.35], points: [[-0.18, -0.35], [-0.28, -0.42], [-0.4, -0.42]] },
      // Symmetrical right side
      { start: [0.05, 0.35], points: [[0.2, 0.35], [0.35, 0.22], [0.52, 0.22]] },
      { start: [0.05, 0.18], points: [[0.28, 0.18], [0.38, 0.06], [0.55, 0.06]] },
      { start: [0.05, 0.0], points: [[0.18, 0.0], [0.3, -0.12], [0.52, -0.12]] },
      { start: [0.05, -0.18], points: [[0.22, -0.18], [0.35, -0.3], [0.48, -0.3]] },
      { start: [0.05, -0.35], points: [[0.18, -0.35], [0.28, -0.42], [0.4, -0.42]] },
    ]
    return paths
  }, [])

  return (
    <group ref={brainRef} position={[0, -0.22, 0.022]}>
      {/* Left Brain Hemisphere - Layer 1 (Dark Metallic Relief) */}
      <mesh position={[-0.32, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.02, 32]} />
        <meshStandardMaterial
          color="#123D2C"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Right Brain Hemisphere - Layer 1 */}
      <mesh position={[0.32, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.02, 32]} />
        <meshStandardMaterial
          color="#123D2C"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Center fissure groove shadow */}
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.04, 0.85, 0.015]} />
        <meshStandardMaterial color="#0A2218" roughness={0.5} />
      </mesh>

      {/* 3D Metallic Circuit Paths */}
      {traces.map((trace, i) => (
        <group key={i}>
          {trace.points.map((pt, j) => {
            const prev = j === 0 ? trace.start : trace.points[j - 1]
            const dx = pt[0] - prev[0]
            const dy = pt[1] - prev[1]
            const len = Math.hypot(dx, dy)
            const angle = Math.atan2(dy, dx)
            const midX = (prev[0] + pt[0]) / 2
            const midY = (prev[1] + pt[1]) / 2
            return (
              <mesh
                key={j}
                position={[midX, midY, 0.018]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[len, 0.015, 0.01]} />
                <meshStandardMaterial
                  color="#B8E8D0"
                  emissive="#B8E8D0"
                  emissiveIntensity={0.65}
                  metalness={0.85}
                  roughness={0.2}
                />
              </mesh>
            )
          })}
          {/* Terminal Circuit Node / Pad */}
          <mesh position={[trace.points[trace.points.length - 1][0], trace.points[trace.points.length - 1][1], 0.022]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#B8E8D0"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Main 3D Floating Book Component
export function FloatingBook3D({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  // Generate high-resolution PBR textures
  const coverAlbedo = useMemo(() => createRealisticCoverAlbedo(), [])
  const coverNormal = useMemo(() => createRealisticCoverNormal(), [])
  const coverRoughness = useMemo(() => createRealisticCoverRoughness(), [])
  const spineTexture = useMemo(() => createRealisticSpineTexture(), [])
  const pageEdgesTexture = useMemo(() => createPageEdgesTexture(), [])

  // Dimensions of professional hardcover textbook
  const width = 2.1
  const height = 2.85
  const thickness = 0.42
  const overhang = 0.05 // Real hardcover overhang

  useFrame(() => {
    if (!groupRef.current) return
    // Natural subtle 3/4 perspective with responsive mouse tilt
    const targetRotX = 0.12 + mouseY * 0.1
    const targetRotY = -0.52 + mouseX * 0.18
    const targetRotZ = -0.04

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float
        speed={1.6}
        rotationIntensity={0.12}
        floatIntensity={0.35}
        floatingRange={[-0.06, 0.06]}
      >
        {/* ========================================================= */}
        {/* PHYSICAL 3D HARDCOVER TEXTBOOK GEOMETRY                   */}
        {/* ========================================================= */}
        <group position={[0, 0.25, 0]}>

          {/* FRONT COVER BOARD (Thick rigid binder board with cloth bevel) */}
          <group position={[overhang / 2, 0, thickness / 2 + 0.02]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width + overhang, height + overhang * 2, 0.04]} />
              <meshStandardMaterial
                map={coverAlbedo}
                normalMap={coverNormal}
                roughnessMap={coverRoughness}
                roughness={0.3}
                metalness={0.06}
              />
            </mesh>

            {/* EMBOSSED 3D CIRCUIT BRAIN ON FRONT COVER */}
            <EmbossedCircuitBrain />
          </group>

          {/* BACK COVER BOARD */}
          <group position={[overhang / 2, 0, -thickness / 2 - 0.02]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[width + overhang, height + overhang * 2, 0.04]} />
              <meshStandardMaterial
                color="#091E15"
                normalMap={coverNormal}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>
          </group>

          {/* CONVEX CURVED HARDCOVER SPINE */}
          <group position={[-width / 2 - overhang / 2 + 0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow receiveShadow>
              <planeGeometry args={[thickness + 0.06, height + overhang * 2]} />
              <meshStandardMaterial
                map={spineTexture}
                roughness={0.3}
                metalness={0.12}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Cloth Headbands at top & bottom of spine */}
            <mesh position={[0, (height + overhang * 2) / 2 - 0.02, 0.01]}>
              <boxGeometry args={[thickness + 0.04, 0.035, 0.02]} />
              <meshStandardMaterial color="#B8E8D0" roughness={0.4} />
            </mesh>
            <mesh position={[0, -(height + overhang * 2) / 2 + 0.02, 0.01]}>
              <boxGeometry args={[thickness + 0.04, 0.035, 0.02]} />
              <meshStandardMaterial color="#B8E8D0" roughness={0.4} />
            </mesh>
          </group>

          {/* INTERIOR PAPER PAGE BLOCK (Recessed with paper edge striations) */}
          <group position={[0.01, 0, 0]}>
            {/* Main Page Block Body */}
            <mesh receiveShadow>
              <boxGeometry args={[width - 0.03, height - 0.02, thickness]} />
              <meshStandardMaterial
                color="#F4EBDD"
                map={pageEdgesTexture}
                roughness={0.88}
                metalness={0.02}
              />
            </mesh>
          </group>
        </group>

        {/* ========================================================= */}
        {/* DELICATE MINT ORBITAL RING & PARTICLES (Refined, Non-Tacky) */}
        {/* ========================================================= */}
        <group rotation={[Math.PI / 3.2, 0, -Math.PI / 7]} position={[0, 0.25, 0]}>
          {/* Slender Filament Orbit */}
          <mesh>
            <torusGeometry args={[2.5, 0.014, 16, 128]} />
            <meshStandardMaterial
              color="#B8E8D0"
              emissive="#B8E8D0"
              emissiveIntensity={1.2}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Luminous Pearl Beads on Orbit */}
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#B8E8D0"
              emissiveIntensity={1.6}
            />
          </mesh>
          <mesh position={[-2.5, 0, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#B8E8D0"
              emissiveIntensity={1.3}
            />
          </mesh>
        </group>

        {/* ELEGANT FLOATING JEWEL EMBLEMS (Minimal, Clean & Realistic) */}
        <JewelEmblem position={[-2.0, 1.4, 0.2]} symbol="tree" />
        <JewelEmblem position={[2.1, 1.5, -0.2]} symbol="graph" />
        <JewelEmblem position={[-2.2, -0.4, 0.5]} symbol="code" />

        {/* ========================================================= */}
        {/* LUXURY DARK MARBLE & NEON PEDESTAL                        */}
        {/* ========================================================= */}
        <group position={[0, -1.6, 0]}>
          {/* Glowing Mint Neon Recessed LED Channel */}
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[1.52, 1.52, 0.08, 64]} />
            <meshStandardMaterial
              color="#B8E8D0"
              emissive="#B8E8D0"
              emissiveIntensity={2.8}
              transparent
              opacity={0.95}
            />
          </mesh>

          {/* Real upward spotlight bouncing onto the book underside */}
          <pointLight position={[0, 0.4, 0]} intensity={3.5} color="#B8E8D0" distance={5} />

          {/* Upper Plinth: Polished Dark Emerald Marble with Chamfer */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.68, 1.76, 0.16, 64]} />
            <meshStandardMaterial
              color="#0B2016"
              metalness={0.85}
              roughness={0.12}
            />
          </mesh>

          {/* Lower Base: Heavy Dark Slate Tier */}
          <mesh position={[0, -0.19, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.82, 1.95, 0.22, 64]} />
            <meshStandardMaterial
              color="#07150E"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Realistic Contact Shadow on Floor */}
          <ContactShadows
            position={[0, -0.32, 0]}
            opacity={0.75}
            scale={6.5}
            blur={2.0}
            far={4}
            color="#081810"
          />
        </group>
      </Float>
    </group>
  )
}

// Small, elegant, jewel-like floating symbol
function JewelEmblem({
  position,
  symbol,
}: {
  position: [number, number, number]
  symbol: 'tree' | 'graph' | 'code'
}) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.4
    meshRef.current.rotation.x += delta * 0.2
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Dark frosted glass diamond */}
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#123D2C"
          emissive="#B8E8D0"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

// Gentle ambient dust particles
export function Particles({ count = 55 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions] = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return [arr]
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#B8E8D0"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}
