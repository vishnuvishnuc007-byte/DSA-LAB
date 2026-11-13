import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Database, Code2, Network } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Syllabus pages content matching Image 1
const syllabusPages = [
  {
    pageNumber: 1,
    left: (
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center pb-2 border-b border-[#D4C5A9]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-md bg-[#123D2C] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8E8D0" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 4v16M4 12h16" />
              </svg>
            </div>
            <span className="font-serif font-black text-sm tracking-wide text-[#123D2C]">DSA LAB</span>
          </div>
          <span className="text-[10px] italic font-serif text-[#769A84] block -mt-0.5">Course</span>
          <h2 className="font-serif text-2xl font-black text-[#123D2C] tracking-tight">Syllabus</h2>
        </div>

        {/* Course Overview Badge */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-[#123D2C] text-[#B8E8D0] text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
            <BookOpen size={10} />
            <span>Course Overview</span>
          </div>
          <p className="text-[10.5px] leading-relaxed text-[#171917]/85">
            Learn the core concepts of Data Structures and Algorithms, and build strong problem-solving skills with hands-on practice, from basic to advanced topics.
          </p>
        </div>

        {/* Syllabus Details Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#123D2C]">
            <BookOpen size={12} className="text-[#769A84]" />
            <span>Syllabus Details</span>
          </div>

          {/* 1. Course Objectives */}
          <div>
            <h4 className="font-serif text-[11px] font-bold text-[#123D2C] mb-1">1. Course Objectives:</h4>
            <ul className="text-[10px] leading-relaxed text-[#171917]/80 space-y-1 pl-3 list-disc marker:text-[#769A84]">
              <li>To teach the students to write data structure programs in C.</li>
              <li>To implement the various data structures as Abstract Data types.</li>
              <li>To demonstrate the systematic way of solving problems using linear and non - linear data structures.</li>
              <li>To demonstrate the sorting, searching algorithms.</li>
            </ul>
          </div>

          {/* 2. List of Experiments: Simple C */}
          <div>
            <h4 className="font-serif text-[11px] font-bold text-[#123D2C] mb-1">2. List of Experiments</h4>
            <div className="pl-2">
              <span className="text-[10px] font-semibold text-[#123D2C] block">1. Simple C Programs</span>
              <ul className="text-[9.5px] text-[#171917]/75 space-y-0.5 pl-3 list-disc marker:text-[#769A84]">
                <li>Programs using recursion</li>
                <li>Programs using structures</li>
                <li>Programs using pointers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-3">
        {/* Experiments 3 to 9 */}
        <div className="text-[10px] leading-relaxed text-[#171917]/85 space-y-1.5">
          <div className="flex items-start gap-1.5">
            <span className="font-bold text-[#123D2C]">3.</span>
            <span>Linked List Implementation of List ADT</span>
          </div>

          <div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-[#123D2C]">4.</span>
              <span>Implementation of stack using:</span>
            </div>
            <ul className="pl-6 text-[9.5px] text-[#171917]/75 list-disc marker:text-[#769A84]">
              <li>Arrays</li>
              <li>Linked List</li>
            </ul>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-bold text-[#123D2C]">5.</span>
            <span>Checking Balanced Parentheses using Array implementation of stack</span>
          </div>

          <div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-[#123D2C]">6.</span>
              <span>Implementation of queue using:</span>
            </div>
            <ul className="pl-6 text-[9.5px] text-[#171917]/75 list-disc marker:text-[#769A84]">
              <li>Arrays</li>
              <li>Linked List</li>
            </ul>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="font-bold text-[#123D2C]">7.</span>
            <span>Binary Search Trees – implementation</span>
          </div>

          <div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-[#123D2C]">8.</span>
              <span>Implementation of minimum spanning using:</span>
            </div>
            <ul className="pl-6 text-[9.5px] text-[#171917]/75 list-disc marker:text-[#769A84]">
              <li>Kruskal algorithm</li>
              <li>Prims algorithm</li>
            </ul>
          </div>

          <div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-[#123D2C]">9.</span>
              <span>Program to sort set of elements using:</span>
            </div>
            <ul className="pl-6 text-[9.5px] text-[#171917]/75 list-disc marker:text-[#769A84]">
              <li>Insertion sort</li>
              <li>Merge sort</li>
              <li>Quick sort</li>
            </ul>
          </div>
        </div>

        {/* Course Outcomes Badge & List */}
        <div className="pt-1 border-t border-[#D4C5A9]/70 space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#123D2C] text-[#B8E8D0] text-[9.5px] font-semibold px-2 py-0.5 rounded-full">
            <span>🏆 Course Outcomes</span>
          </div>
          <p className="text-[8.5px] italic text-[#171917]/70">
            After the successful completion of this course, the student will be able to:
          </p>
          <ul className="text-[8.5px] leading-tight text-[#171917]/80 space-y-0.5 pl-3 list-disc marker:text-[#769A84]">
            <li>Apply knowledge of linear and non-linear data structures for applications. (CO1)</li>
            <li>Implement DSA algorithms for complex engineering problems. (CO2)</li>
            <li>Analyze algorithms to find optimal solutions. (CO3)</li>
            <li>Evaluate and integrate multiple algorithms for efficiency. (CO4, CO5)</li>
            <li>Work in teams and demonstrate solutions through presentation. (CO6)</li>
          </ul>
        </div>

        {/* Requirements */}
        <div className="pt-1 border-t border-[#D4C5A9]/70">
          <span className="text-[9px] font-bold text-[#123D2C] uppercase tracking-wider block">
            Hardware and Software Requirements
          </span>
          <p className="text-[8.5px] text-[#171917]/70">
            • Computer required: 30 Nos. &nbsp;|&nbsp; • RAM: 1GB, HDD: 80GB &nbsp;|&nbsp; • GCC Compiler
          </p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 2,
    left: (
      <div className="space-y-4">
        <div className="text-center pb-2 border-b border-[#D4C5A9]">
          <span className="text-[10px] italic font-serif text-[#769A84] block">Detailed Modules</span>
          <h2 className="font-serif text-xl font-black text-[#123D2C]">Laboratory Units</h2>
        </div>

        <div className="space-y-3 text-[10.5px] text-[#171917]/85">
          <div className="bg-[#123D2C]/5 p-2.5 rounded-lg border border-[#123D2C]/10">
            <span className="font-bold text-[#123D2C] block">Unit I: Linear Structures</span>
            <p className="text-[9.5px] text-[#171917]/70 mt-1">
              Array representation, insertion, deletion. Dynamic memory allocation with pointers. Linked List ADT: Singly, Doubly, and Circular Linked Lists.
            </p>
          </div>

          <div className="bg-[#123D2C]/5 p-2.5 rounded-lg border border-[#123D2C]/10">
            <span className="font-bold text-[#123D2C] block">Unit II: Stacks & Queues</span>
            <p className="text-[9.5px] text-[#171917]/70 mt-1">
              Stack ADT, push/pop operations, infix to postfix conversion, parenthesis balancing. Queue ADT, circular queue, priority queue implementation.
            </p>
          </div>

          <div className="bg-[#123D2C]/5 p-2.5 rounded-lg border border-[#123D2C]/10">
            <span className="font-bold text-[#123D2C] block">Unit III: Trees</span>
            <p className="text-[9.5px] text-[#171917]/70 mt-1">
              Binary Tree representations, Tree traversals (Inorder, Preorder, Postorder). Binary Search Tree insertion, search, and deletion operations.
            </p>
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="text-center pb-2 border-b border-[#D4C5A9]">
          <span className="text-[10px] italic font-serif text-[#769A84] block">Evaluation</span>
          <h2 className="font-serif text-xl font-black text-[#123D2C]">Rubrics & Guidelines</h2>
        </div>

        <div className="space-y-3 text-[10.5px] text-[#171917]/85">
          <div className="bg-[#123D2C]/5 p-2.5 rounded-lg border border-[#123D2C]/10">
            <span className="font-bold text-[#123D2C] block">Unit IV: Graphs & Minimum Spanning Trees</span>
            <p className="text-[9.5px] text-[#171917]/70 mt-1">
              Graph representation: Adjacency Matrix and Adjacency List. BFS & DFS traversals. Dijkstra’s Shortest Path algorithm, Kruskal’s & Prim’s MST.
            </p>
          </div>

          <div className="bg-[#123D2C]/5 p-2.5 rounded-lg border border-[#123D2C]/10">
            <span className="font-bold text-[#123D2C] block">Unit V: Sorting & Searching</span>
            <p className="text-[9.5px] text-[#171917]/70 mt-1">
              Linear search, Binary search on sorted arrays. Insertion sort, Merge sort (divide and conquer), and Quick sort with in-place partitioning.
            </p>
          </div>

          <div className="bg-[#769A84]/15 p-2.5 rounded-lg border border-[#769A84]/30 text-center">
            <span className="font-bold text-[#123D2C] block text-[11px]">Assessment Distribution</span>
            <p className="text-[9.5px] text-[#171917]/80 mt-1">
              Continuous Assessment: 60% &nbsp;|&nbsp; End Semester Lab Examination: 40%
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

export default function SyllabusPage() {
  const navigate = useNavigate()
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const currentPage = syllabusPages[currentPageIndex]

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#171917] pt-20 pb-12 selection:bg-[#B8E8D0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* LEFT SIDEBAR: Typography, Quote, Button & Stacked Books (matching Image 1) */}
          <div className="lg:col-span-4 flex flex-col justify-between py-6">
            <div>
              {/* Header Tagline */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-[#769A84]/60" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#171917]/70 uppercase">
                  Learn  •  Practice  •  Master
                </span>
                <div className="h-[1px] w-8 bg-[#769A84]/60" />
              </div>

              {/* DSA LAB Title */}
              <div className="relative mb-4">
                <h1 className="font-serif leading-[0.88] select-none">
                  <span className="block text-7xl sm:text-8xl font-black text-[#123D2C]">
                    DSA
                  </span>
                  <div className="relative inline-block">
                    <span className="text-7xl sm:text-8xl font-black text-[#123D2C]">
                      LAB
                    </span>
                    {/* Swooping Arc SVG */}
                    <svg
                      className="absolute -top-4 -right-12 w-28 h-28 pointer-events-none"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <path
                        d="M -30 70 C 10 90, 60 70, 85 20"
                        stroke="#123D2C"
                        strokeWidth="3.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                </h1>
              </div>

              {/* Quote from Image 1 */}
              <div className="my-6">
                <p className="font-serif italic text-2xl text-[#171917]/90 leading-snug">
                  “Build Your Logic,<br />Shape Your Future”
                </p>
              </div>

              {/* Start Virtual Lab Button from Image 1 */}
              <button
                onClick={() => navigate('/labs')}
                className="group inline-flex items-center gap-3 bg-[#123D2C] hover:bg-[#1A4F3A] text-white px-7 py-3.5 rounded-full font-serif font-bold text-base transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                style={{
                  boxShadow: '0 10px 25px -4px rgba(18, 61, 44, 0.4), 0 0 15px rgba(184, 232, 208, 0.25)',
                }}
              >
                <span>Start Virtual Lab</span>
                <span className="w-7 h-7 rounded-full bg-[#769A84]/40 border border-[#B8E8D0]/50 flex items-center justify-center group-hover:bg-[#B8E8D0] group-hover:text-[#123D2C] transition-colors">
                  <ChevronRight size={16} />
                </span>
              </button>
            </div>

            {/* Bottom Left: Stack of 3 Physical Books (from Image 1) */}
            <div className="mt-12 pt-6">
              <div className="space-y-1.5 max-w-[220px]">
                {/* Book 1 */}
                <div className="h-8 bg-[#1B3E30] text-white/90 font-serif text-xs font-semibold px-4 flex items-center rounded-r-md border-l-4 border-l-[#B8E8D0] shadow-md transform -rotate-1 hover:translate-x-1 transition-transform">
                  <span>Algorithms</span>
                </div>
                {/* Book 2 */}
                <div className="h-8 bg-[#123D2C] text-white/90 font-serif text-xs font-semibold px-4 flex items-center rounded-r-md border-l-4 border-l-[#769A84] shadow-md transform rotate-1 hover:translate-x-1 transition-transform">
                  <span>Data Structures</span>
                </div>
                {/* Book 3 */}
                <div className="h-8 bg-[#0D261C] text-white/90 font-serif text-xs font-semibold px-4 flex items-center rounded-r-md border-l-4 border-l-[#B8E8D0] shadow-md hover:translate-x-1 transition-transform">
                  <span>Problem Solving</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Open Textbook on Glowing Pedestal (Image 1) */}
          <div className="lg:col-span-8 relative flex flex-col items-center">

            {/* Floating Tech Icons surrounding Open Book (from Image 1) */}
            <div className="absolute -top-4 right-8 w-11 h-11 rounded-xl bg-[#0F261C] border border-[#B8E8D0]/40 flex items-center justify-center text-[#B8E8D0] shadow-lg animate-float">
              <Code2 size={20} />
            </div>

            <div className="absolute top-28 -right-3 w-11 h-11 rounded-xl bg-[#0F261C] border border-[#B8E8D0]/40 flex items-center justify-center text-[#B8E8D0] shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
              <Network size={20} />
            </div>

            <div className="absolute bottom-16 -left-4 w-12 h-12 rounded-xl bg-[#0F261C] border border-[#B8E8D0]/40 flex items-center justify-center text-[#B8E8D0] shadow-lg animate-float" style={{ animationDelay: '0.8s' }}>
              <Database size={22} />
            </div>

            {/* OPEN BOOK CONTAINER with Realistic Physical Hardcover & Two Pages */}
            <div className="relative w-full max-w-3xl rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#0F2D20] to-[#0A1F16] shadow-2xl border border-[#769A84]/40">

              {/* Book Spine Center Shadow & Curvature */}
              <div className="relative bg-[#F4EBDD] rounded-2xl overflow-hidden shadow-inner border border-[#D4C5A9]">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#CBB99B]/70 min-h-[480px]">

                  {/* Left Page */}
                  <div className="p-6 sm:p-7 bg-[#F7F2E7]/80 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`left-${currentPageIndex}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentPage.left}
                      </motion.div>
                    </AnimatePresence>

                    {/* Page Number */}
                    <div className="absolute bottom-2 left-6 text-[10px] font-serif text-[#769A84]">
                      Page {currentPageIndex * 2 + 1}
                    </div>
                  </div>

                  {/* Right Page */}
                  <div className="p-6 sm:p-7 bg-[#F4EBDD] relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`right-${currentPageIndex}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {currentPage.right}
                      </motion.div>
                    </AnimatePresence>

                    {/* Page Number */}
                    <div className="absolute bottom-2 right-6 text-[10px] font-serif text-[#769A84]">
                      Page {currentPageIndex * 2 + 2}
                    </div>
                  </div>
                </div>

                {/* Natural Spine Binding Shadow in the middle */}
                <div
                  className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.15) 100%)',
                  }}
                />
              </div>

              {/* PEDESTAL LIGHT BASE UNDER THE BOOK (matching Image 1) */}
              <div className="relative -mt-1 mx-auto w-4/5 h-8 flex items-center justify-center">
                <div
                  className="w-full h-3 rounded-full bg-[#B8E8D0] blur-sm opacity-70"
                  style={{ boxShadow: '0 0 25px #B8E8D0, 0 0 50px rgba(184, 232, 208, 0.5)' }}
                />
                <div className="absolute inset-0 border border-[#B8E8D0]/60 rounded-full bg-gradient-to-r from-transparent via-[#123D2C] to-transparent h-4" />
              </div>
            </div>

            {/* Page Flipping Navigation Controls */}
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={() => setCurrentPageIndex(p => Math.max(0, p - 1))}
                disabled={currentPageIndex === 0}
                className="flex items-center gap-2 text-xs font-semibold text-[#123D2C] bg-white border border-[#D9E1D9] hover:border-[#123D2C] px-5 py-2.5 rounded-full disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <div className="flex gap-2">
                {syllabusPages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPageIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentPageIndex ? 'bg-[#123D2C] scale-125' : 'bg-[#769A84]/40 hover:bg-[#769A84]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPageIndex(p => Math.min(syllabusPages.length - 1, p + 1))}
                disabled={currentPageIndex === syllabusPages.length - 1}
                className="flex items-center gap-2 text-xs font-semibold text-[#123D2C] bg-white border border-[#D9E1D9] hover:border-[#123D2C] px-5 py-2.5 rounded-full disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
