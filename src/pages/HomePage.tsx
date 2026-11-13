import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  BarChart3,
  Trophy,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Briefcase,
  Terminal,
  Target,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  BookOpen
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SilverGlossText from '../components/SilverGlossText'
import HeroAmbientParticles from '../components/3d/HeroAmbientParticles'

const stats = [
  { icon: Code2, label: 'Interactive Coding' },
  { icon: BarChart3, label: 'DSA Topics' },
  { icon: Trophy, label: 'Practice Problems' },
  { icon: GraduationCap, label: 'Track Progress' },
]

const learningObjectives = [
  {
    title: 'Understand Data Structures',
    desc: 'Develop a strong foundation in arrays, linked lists, stacks, queues and trees.',
  },
  {
    title: 'Master Algorithms',
    desc: 'Understand searching, sorting, graph algorithms and their real-world applications.',
  },
  {
    title: 'Improve Problem-Solving',
    desc: 'Develop logical thinking and computational problem-solving abilities.',
  },
  {
    title: 'Visualize Operations',
    desc: 'Understand how data structures and algorithms work through interactive visualizations.',
  },
  {
    title: 'Practice Coding',
    desc: 'Implement algorithms through practical C programming exercises.',
  },
  {
    title: 'Analyze Performance',
    desc: 'Understand time complexity, space complexity and algorithm execution efficiency.',
  },
  {
    title: 'Build Technical Skills',
    desc: 'Prepare for academic laboratory examinations, coding challenges and technical interviews.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Fluid mouse tracking for organic multi-layer parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Layer 1: Background Parallax
  const bgX = useTransform(springX, [-0.5, 0.5], ['-16px', '16px'])
  const bgY = useTransform(springY, [-0.5, 0.5], ['-12px', '12px'])

  // Layer 3: 3D Video Perspective Tilt
  const rotateY = useTransform(springX, [-0.5, 0.5], [6, -6])
  const rotateX = useTransform(springY, [-0.5, 0.5], [-5, 5])

  // Layer 4: Subtle Typography Parallax Counter-motion
  const textX = useTransform(springX, [-0.5, 0.5], ['6px', '-6px'])
  const textY = useTransform(springY, [-0.5, 0.5], ['4px', '-4px'])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  // Explicitly ensure DOM muted state & immediate autoplay
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const onUserInteract = () => {
            video.play()
            window.removeEventListener('click', onUserInteract)
            window.removeEventListener('touchstart', onUserInteract)
          }
          window.addEventListener('click', onUserInteract)
          window.addEventListener('touchstart', onUserInteract)
        })
      }
    }
  }, [])

  return (
    <div className="page-transition min-h-screen bg-[#F7F6F0] text-[#171917] flex flex-col justify-between selection:bg-[#A8E6CF]/50 selection:text-[#063D2E] overflow-x-hidden">
      {/* =========================================================================
          SECTION 1: 3D CINEMATIC HERO SECTION
          ========================================================================= */}
      <section
        ref={containerRef}
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12"
      >
        {/* Layer 1 & 2: Background Parallax & Translucent Studio Lighting */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{ x: bgX, y: bgY, scale: 1.06 }}
        >
          <div
            className="absolute -inset-6 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/dsa-lab-background.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              filter: 'brightness(1.02) contrast(1.02)',
            }}
          />
          {/* Soft Ivory-White Translucent Overlay for Optimal Text Readability */}
          <div className="absolute inset-0 bg-[#F7F6F0]/45 backdrop-blur-[1px]" />

          {/* Soft Radial Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 94% 94% at 50% 50%, transparent 35%, rgba(247,246,240,0.65) 80%, #F7F6F0 100%)',
            }}
          />

          {/* Emerald & Mint Studio Atmospheric Glows */}
          <div className="absolute left-[12%] bottom-[10%] w-[480px] h-[220px] bg-[#A8E6CF]/35 blur-[100px] rounded-full" />
          <div className="absolute right-[8%] top-[16%] w-[420px] h-[320px] bg-[#A8E6CF]/22 blur-[120px] rounded-full" />
        </motion.div>

        {/* Subtle Interactive 3D Ambient Dust Field (Three.js / React Three Fiber) */}
        <HeroAmbientParticles />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[640px]">

            {/* Left – Realistic 3D Rotating Hardcover Book & Orbital Rings (Col 1 to 6) */}
            <motion.div
              className="lg:col-span-6 relative h-[440px] sm:h-[520px] lg:h-[620px] flex items-center justify-center order-1 lg:order-1"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Interactive 3D Perspective Wrapper with Mouse Parallax Tilt & Gentle Floating Motion */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  perspective: 1400,
                  rotateY,
                  rotateX,
                  transformStyle: 'preserve-3d',
                }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
              >
                {/* Edge-feathered container sitting directly over the 3D floor pedestal */}
                <div
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                  style={{
                    maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, #000 68%, rgba(0,0,0,0.35) 86%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, #000 68%, rgba(0,0,0,0.35) 86%, transparent 100%)',
                  }}
                >
                  <video
                    ref={videoRef}
                    poster="/videos/DSA_LAB_book_poster.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover select-none pointer-events-none scale-[1.04]"
                    style={{
                      objectPosition: '2% 50%',
                    }}
                  >
                    <source src="/videos/DSA_LAB_book_rotation.mp4?v=2" type="video/mp4" />
                  </video>

                  {/* Soft bottom pedestal neon mint glow integration */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#A8E6CF]/35 via-[#A8E6CF]/10 to-transparent" />
                </div>

                {/* Ground Reflection & Studio Floor Ambient Shadow */}
                <div className="pointer-events-none absolute -bottom-6 left-1/4 w-3/5 h-12 bg-[#063D2E]/20 blur-2xl rounded-full" />
                <div className="pointer-events-none absolute -bottom-4 left-1/3 w-2/5 h-8 bg-[#A8E6CF]/50 blur-xl rounded-full" />
              </motion.div>
            </motion.div>

            {/* Right – Fluid DSA LAB Typography & Hero Call to Action (Col 7 to 12) */}
            <motion.div
              className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-2 pl-0 lg:pl-6 text-center lg:text-left z-10 select-none"
              style={{ x: textX, y: textY }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {/* Top Tagline: —— LEARN • PRACTICE • MASTER —— */}
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-4 mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <div className="h-[1px] w-10 sm:w-16 bg-[#0B513B]/35" />
                <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.34em] text-[#063D2E]/80 uppercase">
                  Learn  •  Practice  •  Master
                </span>
                <div className="h-[1px] w-10 sm:w-16 bg-[#0B513B]/35" />
              </motion.div>

              {/* Main Heading: DSA LAB with Glossy Black-to-Emerald Gradient & Silver Glass Cursor Tracking */}
              <div className="relative my-2 sm:my-3">
                <h1 className="leading-[0.86] tracking-[-0.035em]">
                  {/* First Line: DSA with Silver Glass Reflection */}
                  <motion.div
                    className="text-[5.6rem] sm:text-[7.6rem] md:text-[9.2rem] lg:text-[10.2rem] xl:text-[11rem] leading-[0.84]"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SilverGlossText text="DSA" />
                  </motion.div>

                  {/* Second Line: LAB with Silver Glass Reflection */}
                  <motion.div
                    className="text-[5.6rem] sm:text-[7.6rem] md:text-[9.2rem] lg:text-[10.2rem] xl:text-[11rem] leading-[0.84]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SilverGlossText text="LAB" />
                  </motion.div>
                </h1>
              </div>

              {/* Subtitle: — Your Virtual Learning Platform — in Cormorant Garamond */}
              <motion.div
                className="mt-4 sm:mt-5 mb-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                <p
                  className="font-display italic text-2xl sm:text-3xl lg:text-[2.2rem] text-[#063D2E]/90 tracking-wide font-medium"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  — Your Virtual Learning Platform —
                </p>
              </motion.div>

              {/* Supporting Text: EXPLORE • LEARN • PRACTICE • GROW */}
              <motion.div
                className="mb-7 sm:mb-9"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.32em] text-[#0B513B]/70 uppercase">
                  Explore  •  Learn  •  Practice  •  Grow
                </p>
              </motion.div>

              {/* Primary Luxury CTA Button: Start Virtual Lab → */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                <motion.button
                  onClick={() => navigate('/labs')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#063D2E] via-[#0B513B] to-[#063D2E] text-white px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-serif font-bold text-base sm:text-lg tracking-wide transition-all duration-400 cursor-pointer overflow-hidden shadow-[0_12px_32px_-4px_rgba(6,61,46,0.38)] hover:shadow-[0_18px_42px_-4px_rgba(6,61,46,0.5),0_0_28px_rgba(168,230,207,0.4)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="absolute inset-0 rounded-full border border-[#A8E6CF]/30 pointer-events-none" />
                  <span className="relative z-10">Start Virtual Lab</span>
                  <span className="relative z-10 w-8 h-8 rounded-full bg-[#0B513B]/70 border border-[#A8E6CF]/50 flex items-center justify-center text-[#A8E6CF] group-hover:bg-[#A8E6CF] group-hover:text-[#063D2E] transition-all duration-300 shadow-sm">
                    <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Feature Strip (Matching Reference Image Design) */}
        <motion.div
          className="relative max-w-5xl mx-auto px-4 mt-8 sm:mt-12 w-full z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          <div className="bg-[#F7F6F0]/80 backdrop-blur-md rounded-2xl border border-[#E8EAE4]/90 shadow-[0_8px_24px_-6px_rgba(6,61,46,0.08)] p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 divide-y md:divide-y-0 md:divide-x divide-[#E8EAE4]">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3 py-2 px-3 group cursor-pointer transition-transform hover:-translate-y-0.5"
                  onClick={() => navigate('/labs')}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#063D2E]/6 flex items-center justify-center text-[#063D2E] group-hover:bg-[#063D2E] group-hover:text-[#A8E6CF] transition-colors duration-300">
                    <item.icon size={16} />
                  </div>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-[#063D2E]/85 group-hover:text-[#063D2E] transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 2 & 3: TWO-COLUMN CARDS – "WHAT IS DSA VIRTUAL LAB?" & "DSA OBJECTIVES"
          (Matching the exact composition of the uploaded reference design)
          ========================================================================= */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* CARD 1: WHAT IS DSA VIRTUAL LAB? */}
          <motion.div
            className="group relative bg-[#F7F6F0]/95 backdrop-blur-md rounded-3xl border border-[#E8EAE4] p-6 sm:p-8 md:p-9 shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-[0_20px_45px_-6px_rgba(6,61,46,0.14)] hover:border-[#063D2E]/30 transition-all duration-400 flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Text & Content (md:col-span-7) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full">
                {/* Badge & Title */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center shadow-md">
                    <Terminal size={20} />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] tracking-tight">
                    DSA Virtual Lab
                  </h2>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-[#171917]/75 leading-relaxed font-sans mb-3">
                  DSA Virtual Lab is an interactive online learning platform designed to help students understand Data Structures and Algorithms through practical experiments, real-time visualizations and hands-on coding exercises. It provides a virtual environment where students can explore algorithms, execute programs and understand how data structures work step by step.
                </p>

                <p className="text-xs text-[#063D2E]/80 font-medium mb-5">
                  Explore concepts with real-time examples, solve problems and strengthen your skills.
                </p>

                {/* Learn More Button */}
                <div>
                  <motion.button
                    onClick={() => navigate('/labs')}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} className="text-[#A8E6CF]" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Realistic 3D Laptop Image (md:col-span-5) */}
              <div className="md:col-span-5 flex items-center justify-center">
                <motion.div
                  className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-[#E8EAE4]/80 group-hover:scale-[1.02] transition-transform duration-500"
                  animate={{ y: [-3, 4, -3] }}
                  transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                >
                  <img
                    src="/images/dsa-laptop-3d.png"
                    alt="Realistic 3D DSA Virtual Lab Laptop"
                    className="w-full h-auto object-cover select-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063D2E]/10 via-transparent to-transparent" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: OUR LEARNING OBJECTIVES */}
          <motion.div
            className="group relative bg-[#F7F6F0]/95 backdrop-blur-md rounded-3xl border border-[#E8EAE4] p-6 sm:p-8 md:p-9 shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-[0_20px_45px_-6px_rgba(6,61,46,0.14)] hover:border-[#063D2E]/30 transition-all duration-400 flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Text & Content (md:col-span-7) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full">
                {/* Badge & Title */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center shadow-md">
                    <Target size={20} />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] tracking-tight">
                    DSA Objectives
                  </h2>
                </div>

                {/* Objectives list */}
                <div className="space-y-2 mb-4">
                  {learningObjectives.slice(0, 5).map((obj) => (
                    <div key={obj.title} className="flex items-start gap-2.5 group/item">
                      <CheckCircle2
                        size={15}
                        className="text-[#0B513B] flex-shrink-0 mt-0.5 group-hover/item:text-[#063D2E] transition-colors"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#063D2E] block">
                          {obj.title}
                        </span>
                        <span className="text-[#171917]/70 leading-relaxed block text-[11px]">
                          {obj.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Syllabus Button */}
                <div>
                  <motion.button
                    onClick={() => navigate('/syllabus')}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>View All Objectives</span>
                    <BookOpen size={14} className="text-[#A8E6CF]" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Realistic 3D Target Image (md:col-span-5) */}
              <div className="md:col-span-5 flex items-center justify-center">
                <motion.div
                  className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-[#E8EAE4]/80 group-hover:scale-[1.02] transition-transform duration-500"
                  animate={{ y: [3, -4, 3] }}
                  transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                >
                  <img
                    src="/images/dsa-target-3d.png"
                    alt="Realistic 3D DSA Learning Objectives Target"
                    className="w-full h-auto object-cover select-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063D2E]/10 via-transparent to-transparent" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CHOOSE YOUR LOGIN (STUDENT LOGIN & STAFF LOGIN)
          ========================================================================= */}
      <section className="relative z-10 py-16 sm:py-24 bg-gradient-to-b from-[#F7F6F0] via-white to-[#F7F6F0] border-t border-[#E8EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#0B513B] uppercase block mb-3">
              Role-Based Portal Access
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#063D2E] tracking-tight mb-4">
              Enter Your Virtual Lab
            </h2>
            <div className="w-16 h-1 bg-[#063D2E] mx-auto rounded mb-4" />
            <p className="text-sm sm:text-base text-[#171917]/70">
              Choose your role to continue your learning journey.
            </p>
          </div>

          {/* TWO LARGE LOGIN CARDS (STACK VERTICALLY ON MOBILE) */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">

            {/* CARD 1: STUDENT LOGIN */}
            <motion.div
              className="group relative bg-[#F7F6F0] rounded-3xl border border-[#E8EAE4] p-8 sm:p-10 shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-[0_24px_50px_-6px_rgba(6,61,46,0.18)] hover:border-[#063D2E]/40 transition-all duration-400 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Soft Ambient Spotlight Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 bg-[#A8E6CF]/25 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Badge & Role Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 bg-[#A8E6CF]/30 text-[#063D2E] rounded-full border border-[#063D2E]/20">
                    Student Portal
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] mb-3">
                  Student Login
                </h3>
                <p className="text-sm text-[#171917]/75 leading-relaxed mb-6 font-sans">
                  Access your syllabus, virtual experiments, coding practice and learning progress.
                </p>

                {/* 3D Student Portal Visual */}
                <div className="my-4 sm:my-6 flex items-center justify-center">
                  <motion.div
                    className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(6,61,46,0.18)] border border-[#063D2E]/25 bg-[#070908] group-hover:border-[#063D2E]/45 group-hover:shadow-[0_20px_36px_rgba(6,61,46,0.25)] transition-all duration-500"
                    animate={{ y: [-3, 4, -3] }}
                    transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                  >
                    <img
                      src="/images/student-login-card.jpg"
                      alt="Student Virtual Lab Login"
                      className="w-full h-full object-cover object-[38%_center] select-none group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063D2E]/30 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Feature Highlights */}
                <ul className="space-y-2.5 my-6 text-xs sm:text-sm text-[#063D2E]/85">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>9 Interactive Laboratory Experiments & Visualizers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>Step-by-Step C Code Algorithms & Trace Execution</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>Personal Progress Tracking & Problem Solving</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={() => navigate('/login?role=student')}
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="w-full py-4 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-serif font-bold text-base tracking-wide transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer mt-4"
              >
                <span>Login as Student</span>
                <ArrowRight size={18} className="text-[#A8E6CF]" />
              </motion.button>
            </motion.div>

            {/* CARD 2: STAFF LOGIN */}
            <motion.div
              className="group relative bg-[#F7F6F0] rounded-3xl border border-[#E8EAE4] p-8 sm:p-10 shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-[0_24px_50px_-6px_rgba(6,61,46,0.18)] hover:border-[#063D2E]/40 transition-all duration-400 flex flex-col justify-between overflow-hidden"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Soft Ambient Spotlight Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 bg-[#0B513B]/20 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Badge & Role Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Briefcase size={22} />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 bg-[#A8E6CF]/30 text-[#063D2E] rounded-full border border-[#063D2E]/20">
                    Faculty & Staff
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] mb-3">
                  Staff Login
                </h3>
                <p className="text-sm text-[#171917]/75 leading-relaxed mb-6 font-sans">
                  Manage laboratory experiments, monitor student activities and access academic resources.
                </p>

                {/* 3D Staff Portal Visual */}
                <div className="my-4 sm:my-6 flex items-center justify-center">
                  <motion.div
                    className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(6,61,46,0.18)] border border-[#063D2E]/25 bg-[#070908] group-hover:border-[#063D2E]/45 group-hover:shadow-[0_20px_36px_rgba(6,61,46,0.25)] transition-all duration-500"
                    animate={{ y: [3, -4, 3] }}
                    transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                  >
                    <img
                      src="/images/staff-login-card.jpg"
                      alt="Staff 3D Faculty Portal Login"
                      className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063D2E]/30 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Feature Highlights */}
                <ul className="space-y-2.5 my-6 text-xs sm:text-sm text-[#063D2E]/85">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>Classroom & Batch Lab Evaluation Controls</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>Real-Time Student Activity & Metric Dashboards</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#0B513B]" />
                    <span>Curriculum Syllabus Management & Lab Rubrics</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={() => navigate('/login?role=staff')}
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="w-full py-4 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-serif font-bold text-base tracking-wide transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer mt-4"
              >
                <span>Login as Staff</span>
                <ArrowRight size={18} className="text-[#A8E6CF]" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="relative z-10 bg-[#063D2E] text-white py-10 border-t border-[#04241B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#A8E6CF]">
              <Sparkles size={16} />
            </div>
            <div className="font-serif font-bold text-lg tracking-wider">
              DSA <span className="text-[#A8E6CF] font-display italic">LAB</span>
            </div>
          </div>
          <div className="text-xs text-white/70 text-center md:text-left">
            N21UIT307 Data Structures Laboratory • Build Your Logic, Shape Your Future
          </div>
          <div className="text-xs text-white/45">
            © 2026 Virtual Learning Platform • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
