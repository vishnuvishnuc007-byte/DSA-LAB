import { motion } from 'framer-motion'

export default function Target3DIllustration() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Radial Spotlight Glow */}
      <div className="absolute w-60 h-60 bg-[#A8E6CF]/35 blur-[55px] rounded-full" />
      <div className="absolute w-44 h-44 bg-[#063D2E]/25 blur-[45px] top-6" />

      {/* Floating 3D Target Assembly */}
      <motion.div
        className="relative w-[280px] sm:w-[320px] h-[250px] sm:h-[280px] flex items-center justify-center"
        animate={{ y: [-4, 6, -4], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
      >
        <svg
          viewBox="0 0 340 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(6,61,46,0.3)]"
        >
          <defs>
            {/* Target Face Shading Gradients */}
            <linearGradient id="ringGreenOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F4735" />
              <stop offset="60%" stopColor="#063D2E" />
              <stop offset="100%" stopColor="#031F17" />
            </linearGradient>

            <linearGradient id="ringGreenInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#145C45" />
              <stop offset="50%" stopColor="#0B513B" />
              <stop offset="100%" stopColor="#05261C" />
            </linearGradient>

            <linearGradient id="ringWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F4F2EC" />
              <stop offset="100%" stopColor="#DCE5DF" />
            </linearGradient>

            <linearGradient id="arrowShaft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3C574B" />
              <stop offset="50%" stopColor="#1C2E26" />
              <stop offset="100%" stopColor="#0D1813" />
            </linearGradient>

            <linearGradient id="arrowFletching" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78D6B4" />
              <stop offset="50%" stopColor="#0B513B" />
              <stop offset="100%" stopColor="#063D2E" />
            </linearGradient>

            <filter id="bullseyeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Pedestal Ellipse Shadow on Floor */}
          <ellipse cx="170" cy="275" rx="120" ry="24" fill="#0A1410" opacity="0.45" />
          <ellipse cx="170" cy="270" rx="105" ry="18" stroke="#A8E6CF" strokeWidth="2" opacity="0.6" fill="none" />

          {/* 3D Target Rim/Back Thickness */}
          <g transform="translate(160, 150) rotate(-14)">
            {/* Target 3D Extrusion Back Wall */}
            <circle cx="0" cy="14" r="102" fill="#031F17" stroke="#0F382B" strokeWidth="2" />

            {/* Target Outer Emerald Ring */}
            <circle cx="0" cy="0" r="102" fill="url(#ringGreenOuter)" stroke="#4E7E6D" strokeWidth="2.5" />

            {/* White Ring 1 */}
            <circle cx="0" cy="0" r="82" fill="url(#ringWhite)" stroke="#C2D6CC" strokeWidth="1" />

            {/* Emerald Ring 2 */}
            <circle cx="0" cy="0" r="62" fill="url(#ringGreenInner)" stroke="#236B53" strokeWidth="1.2" />

            {/* White Ring 2 */}
            <circle cx="0" cy="0" r="42" fill="url(#ringWhite)" stroke="#C2D6CC" strokeWidth="1" />

            {/* Bullseye Core (Emerald & Glowing Center) */}
            <circle cx="0" cy="0" r="22" fill="#063D2E" stroke="#A8E6CF" strokeWidth="2" filter="url(#bullseyeGlow)" />
            <circle cx="0" cy="0" r="9" fill="#A8E6CF" />
            <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />

            {/* Glossy Specular Light Sweep on Target Face */}
            <path
              d="M -90 -40 C -70 -90, 40 -105, 90 -45 C 50 -75, -40 -70, -90 -40 Z"
              fill="rgba(255, 255, 255, 0.28)"
            />
          </g>

          {/* Dynamic Metallic Arrow Piercing Direct Center */}
          <g transform="translate(160, 150) rotate(38)">
            {/* Arrow Shaft (Cast in 3D Perspective from Top Right into Center) */}
            <line x1="0" y1="0" x2="135" y2="-135" stroke="url(#arrowShaft)" strokeWidth="6" strokeLinecap="round" />
            <line x1="0" y1="0" x2="135" y2="-135" stroke="#A8E6CF" strokeWidth="1.2" opacity="0.75" />

            {/* Arrow Fletching Feathers at Tail */}
            <g transform="translate(130, -130) rotate(-45)">
              <path d="M 0 0 L -18 -18 L 8 -24 L 20 -6 Z" fill="url(#arrowFletching)" stroke="#A8E6CF" strokeWidth="1" />
              <path d="M 0 0 L 18 18 L 24 -8 L 6 -20 Z" fill="url(#arrowFletching)" stroke="#A8E6CF" strokeWidth="1" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>

            {/* Arrow Impact Point Sparkles & Concentric Mint Shockwave */}
            <circle cx="0" cy="0" r="16" stroke="#A8E6CF" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="28" stroke="#A8E6CF" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          </g>

          {/* Floating Specular Particle Specks */}
          <circle cx="280" cy="85" r="3" fill="#A8E6CF" opacity="0.75" />
          <circle cx="65" cy="180" r="2.5" fill="#A8E6CF" opacity="0.6" />
          <circle cx="250" cy="225" r="3.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </motion.div>
    </div>
  )
}

