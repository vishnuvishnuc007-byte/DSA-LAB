import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Terminal,
  Code2,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Target,
  BookOpen
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { EXP_3D_ICONS } from '../assets/experiments'

interface Experiment {
  id: string
  number: string
  title: string
  shortDesc: string
  topics: string[]
  icon: typeof Terminal
}

const experiments: Experiment[] = [
  {
    id: 'exp-01',
    number: 'EXPERIMENT 01',
    title: 'SIMPLE C PROGRAMS',
    shortDesc: 'Foundations of structured programming in C with memory address references and call-stack execution.',
    topics: [
      'Programs using recursion.',
      'Programs using structures.',
      'Programs using pointers.',
    ],
    icon: Code2,
  },
  {
    id: 'exp-02',
    number: 'EXPERIMENT 02',
    title: 'LINKED LIST',
    shortDesc: 'Dynamic node allocation and pointer linking to implement a flexible List Abstract Data Type.',
    topics: [
      'Linked List Implementation of List ADT.',
    ],
    icon: Layers,
  },
  {
    id: 'exp-03',
    number: 'EXPERIMENT 03',
    title: 'IMPLEMENTATION OF STACK',
    shortDesc: 'Design and verification of Last-In-First-Out (LIFO) stack operations across array and linked models.',
    topics: [
      'Stack using Arrays.',
      'Stack using Linked List.',
    ],
    icon: Layers,
  },
  {
    id: 'exp-04',
    number: 'EXPERIMENT 04',
    title: 'BALANCED PARENTHESES',
    shortDesc: 'Expression parsing and delimiter matching verification using Array implementation of Stack.',
    topics: [
      'Checking Balanced Parentheses using Array implementation of Stack.',
    ],
    icon: Target,
  },
  {
    id: 'exp-05',
    number: 'EXPERIMENT 05',
    title: 'IMPLEMENTATION OF QUEUE',
    shortDesc: 'First-In-First-Out (FIFO) queue buffers implementing front/rear pointers and circular index wraps.',
    topics: [
      'Queue using Arrays.',
      'Queue using Linked List.',
    ],
    icon: Cpu,
  },
  {
    id: 'exp-06',
    number: 'EXPERIMENT 06',
    title: 'BINARY SEARCH TREES',
    shortDesc: 'Hierarchical node structuring, recursive binary search ordering, and traversal algorithms.',
    topics: [
      'Binary Search Trees implementation.',
    ],
    icon: BookOpen,
  },
  {
    id: 'exp-07',
    number: 'EXPERIMENT 07',
    title: "DIJKSTRA'S ALGORITHM",
    shortDesc: 'Single-source shortest path computation on weighted directed graphs using greedy relaxation.',
    topics: [
      "Implementation of Dijkstra's Algorithm.",
    ],
    icon: Zap,
  },
  {
    id: 'exp-08',
    number: 'EXPERIMENT 08',
    title: 'MINIMUM SPANNING TREE',
    shortDesc: 'Greedy algorithms connecting graph vertices with minimal cumulative weight without introducing cycles.',
    topics: [
      "Kruskal's Algorithm.",
      "Prim's Algorithm.",
    ],
    icon: Sparkles,
  },
  {
    id: 'exp-09',
    number: 'EXPERIMENT 09',
    title: 'SORTING ALGORITHMS',
    shortDesc: 'Comparative implementations and runtime complexity analysis of essential sorting strategies.',
    topics: [
      'Insertion Sort.',
      'Merge Sort.',
      'Quick Sort.',
    ],
    icon: Terminal,
  },
]

export default function SyllabusPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const heroRef = useRef<HTMLDivElement>(null)

  // Fluid mouse tracking for gentle 3D parallax on the hero visual
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 })

  const rotateY = useTransform(springX, [-0.5, 0.5], [6, -6])
  const rotateX = useTransform(springY, [-0.5, 0.5], [-5, 5])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const handleStartVirtualLab = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login?redirect=/dashboard')
    }
  }

  const handleViewExperiment = (expId: string) => {
    if (user) {
      navigate(`/dashboard?exp=${expId}`)
    } else {
      navigate(`/login?redirect=/dashboard?exp=${expId}`)
    }
  }

  return (
    <div className="page-transition min-h-screen bg-[#F7F6F0] text-[#171917] flex flex-col justify-between selection:bg-[#A8E6CF]/50 selection:text-[#063D2E] overflow-x-hidden pt-16">
      {/* =========================================================================
          HERO SECTION — FULL-BLEED CONTINUOUS 3D ENVIRONMENT (NO CARD, NO BOX)
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-[#E8EAE4]"
      >
        {/* Full-Bleed Environment Background (Matching Image 2 Reference) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          {/* Flowing Emerald Environment Image covering the hero */}
          <div
            className="absolute -inset-4 bg-cover"
            style={{
              backgroundImage: `url('/images/syllabus-hero-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'right 25% center',
              opacity: 0.96,
            }}
          />

          {/* Smooth Horizontal Ivory Gradient: ensures pristine text readability on the left while flowing seamlessly into the emerald background on the right */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #F7F6F0 0%, #F7F6F0 32%, rgba(247,246,240,0.92) 50%, rgba(247,246,240,0.35) 72%, transparent 100%)',
            }}
          />

          {/* Soft top & bottom atmospheric fades into the page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F0]/40 via-transparent to-[#F7F6F0]" />

          {/* Emerald & Mint Ambient Glow Reflections */}
          <div className="absolute right-[12%] top-[14%] w-[380px] h-[320px] bg-[#A8E6CF]/30 blur-[100px] rounded-full" />
          <div className="absolute left-[10%] bottom-[10%] w-[340px] h-[200px] bg-[#A8E6CF]/25 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Content (Preserved Exactly) */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left z-10"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Tagline: —— DSA LEARNING CURRICULUM —— */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-3 sm:mb-4">
                <div className="h-[1px] w-10 sm:w-16 bg-[#0B513B]/35" />
                <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.34em] text-[#063D2E]/80 uppercase">
                  DSA Learning Curriculum
                </span>
                <div className="h-[1px] w-10 sm:w-16 bg-[#0B513B]/35" />
              </div>

              {/* Main Heading: Data Structures Laboratory */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#063D2E] tracking-tight leading-[1.12] mb-3">
                Data Structures <br />
                <span
                  className="font-display italic text-[#0B513B] font-medium text-4xl sm:text-5xl lg:text-[3.8rem]"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Laboratory
                </span>
              </h1>

              {/* Course Subtitle */}
              <p className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#0B513B]/80 uppercase mb-4">
                N21UIT307 • Common to CSE, IT, AIDS, CSD, AIML, IoT &amp; Cyber Security
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#171917]/75 leading-relaxed font-sans max-w-xl mb-6 mx-auto lg:mx-0">
                Explore practical data structures and algorithms through structured programming experiments and hands-on learning.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <motion.button
                  onClick={handleStartVirtualLab}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#063D2E] via-[#0B513B] to-[#063D2E] text-white px-7 py-3.5 rounded-full font-serif font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_12px_28px_-4px_rgba(6,61,46,0.32)] hover:shadow-[0_16px_36px_-4px_rgba(6,61,46,0.45)] cursor-pointer"
                >
                  <span>Start Virtual Lab</span>
                  <span className="w-7 h-7 rounded-full bg-[#0B513B]/70 border border-[#A8E6CF]/50 flex items-center justify-center text-[#A8E6CF] group-hover:bg-[#A8E6CF] group-hover:text-[#063D2E] transition-all duration-300 shadow-sm">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </motion.button>

                <a
                  href="#experiments-list"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#063D2E]/20 text-[#063D2E] text-xs sm:text-sm font-semibold hover:bg-[#063D2E]/5 transition-all duration-200"
                >
                  <span>View All 9 Experiments</span>
                  <ArrowRight size={14} className="text-[#0B513B]" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Full-Bleed Floating Solid 3D Objects (NO CARD, NO BOX, NO BORDER) */}
            <motion.div
              className="lg:col-span-5 relative flex items-center justify-center select-none py-6 lg:py-0"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Interactive Floating 3D Stage with Gentle Mouse Parallax Tilt */}
              <motion.div
                className="relative w-full max-w-lg sm:max-w-xl flex items-center justify-center select-none"
                style={{
                  perspective: 1200,
                  rotateY,
                  rotateX,
                  transformStyle: 'preserve-3d',
                }}
                animate={{ y: [-5, 6, -5] }}
                transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
              >
                {/* Soft Contact Shadow & Emerald Reflections directly underneath the objects */}
                <div className="pointer-events-none absolute -bottom-6 left-1/4 w-3/5 h-12 bg-[#063D2E]/18 blur-2xl rounded-full" />
                <div className="pointer-events-none absolute -bottom-3 left-1/3 w-2/5 h-8 bg-[#A8E6CF]/40 blur-xl rounded-full" />

                {/* Pure Solid Emerald 3D Data Structure Objects (Isolated PNG from Image 1) */}
                <img
                  src="/images/dsa-3d-objects.png"
                  alt="Solid Emerald 3D Data Structures - Interconnected Nodes, Binary Tree, Platform, and Glass Cubes"
                  className="w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] h-auto object-contain drop-shadow-[0_24px_38px_rgba(6,61,46,0.22)] select-none pointer-events-none hover:scale-[1.02] transition-transform duration-500"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXPERIMENTS SECTION — EXACTLY 9 CARDS MATCHING HOME / ABOUT STYLING
          ========================================================================= */}
      <section id="experiments-list" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-[1px] w-12 bg-[#0B513B]/35" />
            <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#063D2E]/80 uppercase">
              List of Experiments
            </span>
            <div className="h-[1px] w-12 bg-[#0B513B]/35" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#063D2E] tracking-tight">
            Data Structures Laboratory
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#171917]/70 font-sans max-w-lg mx-auto">
            Official laboratory experiments prescribed under curriculum regulation N21UIT307.
          </p>
        </div>

        {/* 9 Experiment Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {experiments.map((exp, idx) => {
            const Icon = exp.icon

            return (
              <motion.div
                key={exp.id}
                className="group relative bg-[#F7F6F0]/95 backdrop-blur-md rounded-3xl border border-[#E8EAE4] p-6 sm:p-7 shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-[0_20px_45px_-6px_rgba(6,61,46,0.15)] hover:border-[#063D2E]/35 transition-all duration-400 flex flex-col justify-between overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Soft Spotlight Glow on Hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 w-36 h-36 bg-[#A8E6CF]/20 blur-2xl rounded-full group-hover:scale-125 transition-transform duration-500" />

                <div>
                  {/* Top Bar: 3D Custom Emerald Icon & Experiment Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={EXP_3D_ICONS[exp.id]}
                        alt={exp.title}
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(6,61,46,0.18)]"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-sans text-[11px] font-bold tracking-widest uppercase px-3 py-1 bg-[#A8E6CF]/30 text-[#063D2E] rounded-full border border-[#063D2E]/15">
                      {exp.number}
                    </span>
                  </div>

                  {/* Experiment Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E] tracking-tight mb-2.5 group-hover:text-[#0B513B] transition-colors">
                    {exp.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#171917]/75 leading-relaxed font-sans mb-4">
                    {exp.shortDesc}
                  </p>

                  {/* Topics List with Checkmarks */}
                  <div className="pt-3 border-t border-[#E8EAE4] mb-6">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#063D2E]/70 block mb-2">
                      Syllabus Topics
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#063D2E]/90">
                      {exp.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#0B513B] mt-0.5 shrink-0" />
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View Experiment Button (Same Button Style as Home / About) */}
                <motion.button
                  onClick={() => handleViewExperiment(exp.id)}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="w-full py-3 px-4 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-serif font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-between cursor-pointer group/btn"
                >
                  <span>View Experiment</span>
                  <span className="w-6 h-6 rounded-full bg-[#0B513B]/80 flex items-center justify-center text-[#A8E6CF] group-hover/btn:bg-[#A8E6CF] group-hover/btn:text-[#063D2E] transition-all">
                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM SECTION — CALL TO ACTION (MATCHING HOME & ABOUT DESIGN LANGUAGE)
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          className="relative rounded-3xl bg-gradient-to-r from-[#063D2E] via-[#0B513B] to-[#063D2E] p-8 sm:p-12 md:p-16 text-white shadow-[0_20px_50px_-10px_rgba(6,61,46,0.35)] overflow-hidden border border-[#A8E6CF]/25 text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-[#A8E6CF]/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-[#A8E6CF]/15 rounded-full blur-3xl" />

          {/* Heading */}
          <h2 className="relative z-10 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to Practice Data Structures?
          </h2>

          {/* Description */}
          <p className="relative z-10 text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-8 font-sans">
            Explore the experiments and improve your programming skills through practical learning.
          </p>

          {/* Start Virtual Lab Button */}
          <motion.button
            onClick={handleStartVirtualLab}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative z-10 inline-flex items-center gap-4 bg-white hover:bg-[#F7F6F0] text-[#063D2E] px-8 sm:px-10 py-4 rounded-full font-serif font-bold text-base sm:text-lg tracking-wide transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>Start Virtual Lab</span>
            <span className="w-8 h-8 rounded-full bg-[#063D2E] flex items-center justify-center text-[#A8E6CF] group-hover:bg-[#0B513B] transition-all">
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* =========================================================================
          FOOTER — EXACTLY IDENTICAL TO HOMEPAGE FOOTER
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
