import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface SilverGlossTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function SilverGlossText({ text, className = '', style }: SilverGlossTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Spring physics for fluid cursor-following reflection
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.2 })
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.2 })

  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    setCoords({ x, y, width: rect.width, height: rect.height })
    setIsHovered(true)
  }, [mouseX, mouseY])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Keep spring coords updated for the inline mask
  const [springPos, setSpringPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const unsubX = smoothX.on('change', (latestX) => {
      setSpringPos((prev) => ({ ...prev, x: latestX }))
    })
    const unsubY = smoothY.on('change', (latestY) => {
      setSpringPos((prev) => ({ ...prev, y: latestY }))
    })
    return () => {
      unsubX()
      unsubY()
    }
  }, [smoothX, smoothY])

  // Calculate dynamic reflection beam angle based on cursor position
  const xPercent = coords.width > 0 ? (springPos.x / coords.width) * 100 : 50
  const yPercent = coords.height > 0 ? (springPos.y / coords.height) * 100 : 50
  const beamAngle = 115 + (xPercent - 50) * 0.25

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative inline-block select-none cursor-default ${className}`}
      style={style}
    >
      {/* =========================================================================
          LAYER 1: BASE GLOSSY BLACK-TO-DEEP-EMERALD TYPOGRAPHY
          - Top portions: Pure obsidian/glossy black
          - Lower portions: Rich, luminous deep emerald green with ambient depth
          ========================================================================= */}
      <span
        className="block font-serif font-black tracking-[-0.035em] text-transparent bg-clip-text"
        style={{
          fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
          backgroundImage: `linear-gradient(
            180deg,
            #060907 0%,
            #0B120E 24%,
            #08241B 45%,
            #063D2E 62%,
            #0B513B 82%,
            #127352 95%,
            #15855F 100%
          )`,
          filter: 'drop-shadow(0 4px 14px rgba(6, 61, 46, 0.22))',
        }}
      >
        {text}
      </span>

      {/* =========================================================================
          LAYER 2: FLUID SILVER-METALLIC GLASS REFLECTION (ACTIVE ON CURSOR MOVE)
          - Thin silver metallic glass reflection that travels across the letters
          - Follows the exact cursor position with fluid easing
          - Realistic reflective-glass liquid streak
          - Fades out smoothly when cursor exits
          ========================================================================= */}
      <span
        aria-hidden="true"
        className="absolute inset-0 block font-serif font-black tracking-[-0.035em] pointer-events-none transition-opacity duration-500 ease-out text-transparent bg-clip-text"
        style={{
          fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
          opacity: isHovered ? 1 : 0,
          /* Dazzling liquid silver-glass chrome gradient */
          backgroundImage: `linear-gradient(
            ${beamAngle}deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(235, 248, 242, 0.92) 20%,
            rgba(168, 230, 207, 0.95) 45%,
            rgba(255, 255, 255, 1) 55%,
            rgba(210, 240, 230, 0.88) 75%,
            rgba(255, 255, 255, 0.95) 100%
          )`,
          /* Multi-layer mask: tight radial spotlight around cursor + diagonal glass streak */
          maskImage: `
            radial-gradient(circle 180px at ${springPos.x}px ${springPos.y}px, black 0%, rgba(0,0,0,0.6) 45%, transparent 75%),
            linear-gradient(${beamAngle}deg, transparent 0%, rgba(0,0,0,0) ${xPercent - 15}%, rgba(0,0,0,0.95) ${xPercent}%, rgba(0,0,0,0) ${xPercent + 15}%, transparent 100%)
          `,
          WebkitMaskImage: `
            radial-gradient(circle 180px at ${springPos.x}px ${springPos.y}px, black 0%, rgba(0,0,0,0.6) 45%, transparent 75%),
            linear-gradient(${beamAngle}deg, transparent 0%, rgba(0,0,0,0) ${xPercent - 15}%, rgba(0,0,0,0.95) ${xPercent}%, rgba(0,0,0,0) ${xPercent + 15}%, transparent 100%)
          `,
          filter: 'drop-shadow(0 0 16px rgba(168, 230, 207, 0.75)) brightness(1.25)',
        }}
      >
        {text}
      </span>

      {/* =========================================================================
          LAYER 3: SPECULAR GLASS CORE SHINE
          - Intense silver pinpoint highlight at cursor position
          ========================================================================= */}
      <span
        aria-hidden="true"
        className="absolute inset-0 block font-serif font-black tracking-[-0.035em] pointer-events-none transition-opacity duration-300 ease-out text-transparent bg-clip-text"
        style={{
          fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
          opacity: isHovered ? 0.85 : 0,
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #A8E6CF 50%, #FFFFFF 100%)',
          maskImage: `radial-gradient(circle 70px at ${springPos.x}px ${springPos.y}px, black 0%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 70px at ${springPos.x}px ${springPos.y}px, black 0%, transparent 80%)`,
          filter: 'brightness(1.5)',
        }}
      >
        {text}
      </span>

      {/* =========================================================================
          LAYER 4: AMBIENT CURSOR LIGHT GLOW ORB & SPECULAR GLASS RING
          - Luminous refraction orb & fine metallic glass ring matching the reference
          ========================================================================= */}
      <div
        className="pointer-events-none absolute w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500 ease-out"
        style={{
          left: `${springPos.x}px`,
          top: `${springPos.y}px`,
          opacity: isHovered ? 0.35 : 0,
          background: 'radial-gradient(circle, rgba(168, 230, 207, 0.6) 0%, rgba(255, 255, 255, 0.35) 40%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Dynamic Silver Glass Specular Ring following Cursor */}
      <div
        className="pointer-events-none absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ease-out border border-[#A8E6CF]/50 shadow-[0_0_15px_rgba(168,230,207,0.35)]"
        style={{
          left: `${springPos.x}px`,
          top: `${springPos.y}px`,
          opacity: isHovered ? 0.75 : 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(168,230,207,0.06) 60%, transparent 85%)',
        }}
      >
        <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
      </div>
    </div>
  )
}
