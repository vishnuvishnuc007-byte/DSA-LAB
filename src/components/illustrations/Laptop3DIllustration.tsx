import { motion } from 'framer-motion'

export default function Laptop3DIllustration() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] flex items-center justify-center select-none pointer-events-none">
      {/* Ambient Neon Mint Glow on Pedestal */}
      <div className="absolute w-64 h-32 bg-[#A8E6CF]/30 blur-[45px] rounded-full bottom-4" />
      <div className="absolute w-44 h-44 bg-[#063D2E]/20 blur-[50px] top-6" />

      {/* Floating 3D Laptop Assembly */}
      <motion.div
        className="relative w-[320px] sm:w-[360px] h-[240px] sm:h-[270px] flex items-center justify-center"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      >
        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(6,61,46,0.35)]"
        >
          <defs>
            {/* Gradients for Chassis */}
            <linearGradient id="laptopLid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C2723" />
              <stop offset="50%" stopColor="#0F1714" />
              <stop offset="100%" stopColor="#080E0B" />
            </linearGradient>

            <linearGradient id="screenBezel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E2B25" />
              <stop offset="100%" stopColor="#0A100D" />
            </linearGradient>

            <linearGradient id="screenGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#07221A" />
              <stop offset="50%" stopColor="#051912" />
              <stop offset="100%" stopColor="#03100C" />
            </linearGradient>

            <linearGradient id="baseChassis" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#31413A" />
              <stop offset="35%" stopColor="#1B2822" />
              <stop offset="100%" stopColor="#0A130F" />
            </linearGradient>

            <linearGradient id="pedestalMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A2822" />
              <stop offset="50%" stopColor="#374E44" />
              <stop offset="100%" stopColor="#121D18" />
            </linearGradient>

            <linearGradient id="mintNeonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A8E6CF" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#A8E6CF" />
            </linearGradient>

            <filter id="mintBloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Circular Pedestal Platform */}
          <ellipse cx="200" cy="275" rx="145" ry="32" fill="#0A1410" opacity="0.6" />
          <ellipse cx="200" cy="270" rx="138" ry="28" fill="url(#pedestalMetal)" />
          <ellipse cx="200" cy="268" rx="136" ry="27" stroke="url(#mintNeonGrad)" strokeWidth="3" filter="url(#mintBloom)" fill="none" opacity="0.85" />
          <ellipse cx="200" cy="268" rx="105" ry="20" stroke="#A8E6CF" strokeWidth="1" opacity="0.4" fill="none" />

          {/* Laptop Base (Keyboard Deck) */}
          <path
            d="M 95 240 L 160 190 L 305 190 L 340 240 C 340 244, 335 248, 325 249 L 110 249 C 100 248, 95 244, 95 240 Z"
            fill="url(#baseChassis)"
            stroke="#4A6559"
            strokeWidth="1.2"
          />

          {/* Keyboard & Trackpad Indentation */}
          <path
            d="M 125 234 L 168 196 L 292 196 L 315 234 Z"
            fill="#080F0C"
            stroke="#1D3028"
            strokeWidth="0.8"
          />
          {/* Trackpad */}
          <path
            d="M 190 238 L 195 245 L 245 245 L 240 238 Z"
            fill="#121F19"
            stroke="#2F473C"
            strokeWidth="0.6"
          />

          {/* Laptop Lid & Screen (Tilted Upwards in 3/4 Perspective) */}
          <path
            d="M 160 190 L 175 70 L 320 70 L 305 190 Z"
            fill="url(#screenBezel)"
            stroke="#4A6559"
            strokeWidth="1.5"
          />

          {/* Glossy Active Screen Area */}
          <path
            d="M 167 184 L 180 78 L 313 78 L 300 184 Z"
            fill="url(#screenGlass)"
            stroke="#16382C"
            strokeWidth="0.8"
          />

          {/* Luminous Circuit Brain / Hologram on Screen */}
          <g transform="translate(242, 128) scale(0.9)">
            {/* Brain Outline Left & Right Hemisphere */}
            <path
              d="M -5 -32 C -18 -32, -32 -20, -32 0 C -32 18, -18 32, -5 32 Z"
              stroke="#A8E6CF"
              strokeWidth="1.8"
              fill="none"
              filter="url(#mintBloom)"
            />
            <path
              d="M 5 -32 C 18 -32, 32 -20, 32 0 C 32 18, 18 32, 5 32 Z"
              stroke="#A8E6CF"
              strokeWidth="1.8"
              fill="none"
              filter="url(#mintBloom)"
            />
            {/* Neural circuit pathways inside brain */}
            <path d="M -5 -20 L -18 -15 L -20 0 L -12 12 L -5 20" stroke="#78D6B4" strokeWidth="1.2" fill="none" />
            <path d="M 5 -20 L 18 -15 L 20 0 L 12 12 L 5 20" stroke="#78D6B4" strokeWidth="1.2" fill="none" />
            <circle cx="-18" cy="-15" r="2" fill="#FFFFFF" />
            <circle cx="18" cy="-15" r="2" fill="#FFFFFF" />
            <circle cx="-20" cy="0" r="2" fill="#A8E6CF" />
            <circle cx="20" cy="0" r="2" fill="#A8E6CF" />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            <circle cx="-12" cy="12" r="2" fill="#A8E6CF" />
            <circle cx="12" cy="12" r="2" fill="#A8E6CF" />
            {/* Central stem */}
            <line x1="0" y1="-28" x2="0" y2="28" stroke="#A8E6CF" strokeWidth="1.2" strokeDasharray="3 2" />
          </g>

          {/* Screen Light Sweep Reflection */}
          <path
            d="M 180 78 L 225 78 L 200 184 L 167 184 Z"
            fill="linear-gradient(135deg, rgba(255,255,255,0.12), transparent)"
            opacity="0.6"
          />

          {/* Floating Neon Code Panes Around Laptop (Algorithm Visualizer Elements) */}
          {/* Left Top Pane: BST Tree */}
          <g transform="translate(68, 65)">
            <rect width="64" height="42" rx="6" fill="#0A1813" fillOpacity="0.85" stroke="#33594A" strokeWidth="1" />
            <path d="M 12 14 L 32 14 M 12 22 L 50 22 M 12 30 L 40 30" stroke="#78D6B4" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="52" cy="14" r="2" fill="#A8E6CF" />
          </g>

          {/* Left Middle Pane: Array Nodes */}
          <g transform="translate(52, 125)">
            <rect width="68" height="48" rx="6" fill="#071711" fillOpacity="0.9" stroke="#376854" strokeWidth="1" />
            <rect x="8" y="14" width="12" height="18" rx="2" fill="#0E2D22" stroke="#A8E6CF" strokeWidth="0.8" />
            <rect x="22" y="14" width="12" height="18" rx="2" fill="#0E2D22" stroke="#A8E6CF" strokeWidth="0.8" />
            <rect x="36" y="14" width="12" height="18" rx="2" fill="#0E2D22" stroke="#A8E6CF" strokeWidth="0.8" />
            <rect x="50" y="14" width="10" height="18" rx="2" fill="#174A37" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>

          {/* Right Floating Card: Graph / Analytics */}
          <g transform="translate(325, 95)">
            <rect width="62" height="54" rx="6" fill="#091A14" fillOpacity="0.88" stroke="#35614F" strokeWidth="1" />
            <circle cx="18" cy="20" r="3.5" fill="#A8E6CF" />
            <circle cx="44" cy="20" r="3.5" fill="#A8E6CF" />
            <circle cx="31" cy="38" r="3.5" fill="#FFFFFF" />
            <line x1="18" y1="20" x2="44" y2="20" stroke="#78D6B4" strokeWidth="1" />
            <line x1="18" y1="20" x2="31" y2="38" stroke="#78D6B4" strokeWidth="1" />
            <line x1="44" y1="20" x2="31" y2="38" stroke="#78D6B4" strokeWidth="1" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

