import { motion } from 'framer-motion'

export default function StudentPortalIllustration() {
  return (
    <div className="relative w-full h-full min-h-[180px] sm:min-h-[220px] flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-44 h-44 bg-[#A8E6CF]/30 blur-[40px] rounded-full" />
      <motion.div
        className="relative w-[240px] h-[190px] flex items-center justify-center"
        animate={{ y: [-3, 4, -3] }}
        transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
      >
        <svg viewBox="0 0 280 220" fill="none" className="w-full h-full drop-shadow-[0_15px_25px_rgba(6,61,46,0.25)]">
          <ellipse cx="140" cy="190" rx="95" ry="18" fill="#063D2E" opacity="0.3" />
          <ellipse cx="140" cy="186" rx="88" ry="14" stroke="#A8E6CF" strokeWidth="2" opacity="0.7" fill="none" />

          {/* Student Terminal / Laptop */}
          <path d="M 70 170 L 115 130 L 210 130 L 235 170 Z" fill="#14241D" stroke="#3E6352" strokeWidth="1.2" />
          <path d="M 115 130 L 125 45 L 225 45 L 210 130 Z" fill="#0C1A14" stroke="#46705D" strokeWidth="1.4" />
          {/* Active Screen */}
          <path d="M 121 124 L 129 52 L 220 52 L 206 124 Z" fill="#05120E" stroke="#123B2B" strokeWidth="0.8" />

          {/* Hologram Floating Graduation Cap */}
          <g transform="translate(170, 75)">
            <path d="M 0 -22 L 32 -10 L 0 2 L -32 -10 Z" fill="#063D2E" stroke="#A8E6CF" strokeWidth="1.5" />
            <path d="M -18 -4 L -18 10 C -18 18, 18 18, 18 10 L 18 -4" fill="#0B513B" stroke="#A8E6CF" strokeWidth="1.2" />
            <line x1="26" y1="-8" x2="30" y2="12" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="30" cy="13" r="2" fill="#A8E6CF" />
          </g>

          {/* Algorithm Code Badges */}
          <g transform="translate(45, 60)">
            <rect width="48" height="32" rx="5" fill="#091A14" stroke="#3E6B57" strokeWidth="1" />
            <path d="M 8 10 L 24 10 M 8 16 L 38 16 M 8 22 L 28 22" stroke="#78D6B4" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="40" cy="10" r="2" fill="#A8E6CF" />
          </g>
          <g transform="translate(225, 80)">
            <rect width="44" height="40" rx="5" fill="#091A14" stroke="#3E6B57" strokeWidth="1" />
            <circle cx="14" cy="16" r="3" fill="#A8E6CF" />
            <circle cx="30" cy="16" r="3" fill="#A8E6CF" />
            <circle cx="22" cy="28" r="3" fill="#FFFFFF" />
            <line x1="14" y1="16" x2="22" y2="28" stroke="#78D6B4" strokeWidth="0.8" />
            <line x1="30" y1="16" x2="22" y2="28" stroke="#78D6B4" strokeWidth="0.8" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

