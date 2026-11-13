import { motion } from 'framer-motion'

export default function StaffPortalIllustration() {
  return (
    <div className="relative w-full h-full min-h-[180px] sm:min-h-[220px] flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-44 h-44 bg-[#0B513B]/25 blur-[40px] rounded-full" />
      <motion.div
        className="relative w-[240px] h-[190px] flex items-center justify-center"
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      >
        <svg viewBox="0 0 280 220" fill="none" className="w-full h-full drop-shadow-[0_15px_25px_rgba(6,61,46,0.25)]">
          <ellipse cx="140" cy="190" rx="95" ry="18" fill="#063D2E" opacity="0.3" />
          <ellipse cx="140" cy="186" rx="88" ry="14" stroke="#A8E6CF" strokeWidth="2" opacity="0.7" fill="none" />

          {/* Central Lab Control Monitor */}
          <rect x="75" y="45" width="130" height="90" rx="8" fill="#0D1E17" stroke="#487561" strokeWidth="1.5" />
          <rect x="83" y="53" width="114" height="74" rx="4" fill="#06120D" stroke="#16382A" strokeWidth="0.8" />

          {/* Stand */}
          <path d="M 132 135 L 148 135 L 154 165 L 126 165 Z" fill="#1C3026" stroke="#436756" strokeWidth="1" />
          <ellipse cx="140" cy="165" rx="35" ry="7" fill="#14241C" stroke="#436756" strokeWidth="1" />

          {/* Lab Monitoring Metrics & Analytics Curves on Screen */}
          <path d="M 92 108 L 110 88 L 132 98 L 156 70 L 178 78 L 190 64" stroke="#A8E6CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="156" cy="70" r="2.5" fill="#FFFFFF" />
          <circle cx="190" cy="64" r="2.5" fill="#FFFFFF" />
          {/* Bar Chart Metrics */}
          <rect x="92" y="112" width="12" height="10" rx="1.5" fill="#0B513B" />
          <rect x="108" y="104" width="12" height="18" rx="1.5" fill="#107353" />
          <rect x="124" y="98" width="12" height="24" rx="1.5" fill="#78D6B4" />
          <rect x="140" y="90" width="12" height="32" rx="1.5" fill="#A8E6CF" />

          {/* Floating Clipboard & Evaluation Badges */}
          <g transform="translate(205, 50)">
            <rect width="44" height="52" rx="5" fill="#0A1C15" stroke="#3E6B57" strokeWidth="1" />
            <rect x="12" y="-3" width="20" height="6" rx="2" fill="#3E6B57" />
            <path d="M 8 16 L 24 16 M 8 24 L 36 24 M 8 32 L 32 32 M 8 40 L 20 40" stroke="#78D6B4" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          <g transform="translate(35, 75)">
            <rect width="42" height="38" rx="5" fill="#0A1C15" stroke="#3E6B57" strokeWidth="1" />
            <circle cx="21" cy="19" r="10" stroke="#A8E6CF" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M 17 19 L 20 22 L 26 16" stroke="#A8E6CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

