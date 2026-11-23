import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  Target,
  FileCode,
  GraduationCap,
  Award,
  ChevronRight,
  HelpCircle,
  Play
} from 'lucide-react'
import {
  getSyllabusExperiment,
  SYLLABUS_EXPERIMENTS,
  type TopicDetails,
  type SyllabusExperimentGroup
} from '../data/syllabusTopicsData'
import ThemeMenu from '../components/ThemeMenu'

import exp01Icon from '../assets/experiments/experiment-01-code.png'
import exp02Icon from '../assets/experiments/experiment-02-linked-list.png'
import exp03Icon from '../assets/experiments/experiment-03-stack.png'
import exp04Icon from '../assets/experiments/experiment-04-parentheses.png'
import exp05Icon from '../assets/experiments/experiment-05-queue.png'
import exp06Icon from '../assets/experiments/experiment-06-binary-tree.png'
import exp07Icon from '../assets/experiments/experiment-07-dijkstra.png'
import exp08Icon from '../assets/experiments/experiment-08-mst.png'
import exp09Icon from '../assets/experiments/experiment-09-sorting.png'

const EXP_3D_ICONS: Record<string, string> = {
  'exp-01': exp01Icon,
  'exp-02': exp02Icon,
  'exp-03': exp03Icon,
  'exp-04': exp04Icon,
  'exp-05': exp05Icon,
  'exp-06': exp06Icon,
  'exp-07': exp07Icon,
  'exp-08': exp08Icon,
  'exp-09': exp09Icon,
}

export default function ExperimentTopicsPage() {
  const { expId = 'exp-01' } = useParams<{ expId: string }>()
  const navigate = useNavigate()

  // Normalize expId (e.g. '01' -> 'exp-01')
  const normalizedExpId = expId.startsWith('exp-') ? expId : `exp-${expId.padStart(2, '0')}`
  const exp: SyllabusExperimentGroup | undefined = getSyllabusExperiment(normalizedExpId)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [expId])

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#F7F6F0] flex items-center justify-center p-6 text-[#123D2C]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8EAE4] shadow-xl text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#063D2E] mb-2">Experiment Not Found</h2>
          <p className="text-sm text-slate-600 mb-6 font-sans">
            Could not find experiment matching ID &quot;{expId}&quot;. Please return to your Student Dashboard.
          </p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full bg-[#063D2E] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#0B513B] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  const iconSrc = EXP_3D_ICONS[exp.id] || exp01Icon

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#123D2C] selection:bg-[#B8E8D0] selection:text-[#063D2E]">
      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F6F0]/95 backdrop-blur-md border-b border-[#E8EAE4] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </button>

            <span className="text-slate-300">/</span>
            <Link
              to="/student/dashboard"
              className="text-slate-500 hover:text-[#063D2E] font-medium transition-colors"
            >
              Student Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#063D2E] font-bold">
              Exp {exp.number} — {exp.shortTitle}
            </span>
          </div>

          {/* Quick Syllabus Tag & Theme Menu */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
              Level 2 · Topic Selection
            </span>
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#063D2E]/5 text-[#063D2E] border border-[#063D2E]/10 text-[11px] font-semibold font-mono">
              {exp.topics.length} {exp.topics.length === 1 ? 'Topic' : 'Topics'} Available
            </span>
            <ThemeMenu align="right" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
        {/* Experiment Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-br from-[#063D2E] via-[#094A38] to-[#0D5F48] rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden"
        >
          {/* Ambient visual background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8E8D0]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5 max-w-3xl">
              {/* 3D Custom Emerald Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 flex items-center justify-center shadow-lg">
                <img
                  src={iconSrc}
                  alt={exp.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#B8E8D0] text-[#063D2E] text-xs font-mono font-bold uppercase tracking-wider">
                    EXPERIMENT {exp.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white/90 text-xs font-medium border border-white/15">
                    Anna University Syllabus · N21UIT307
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  {exp.title}
                </h1>

                <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed">
                  {exp.shortDesc}
                </p>
              </div>
            </div>

            {/* Right Badge Summary */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 flex flex-col justify-center gap-1.5 md:min-w-[200px]">
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#B8E8D0]">
                Curriculum Scope
              </div>
              <div className="text-2xl font-serif font-bold text-white">
                {exp.topics.length} {exp.topics.length === 1 ? 'Topic' : 'Syllabus Topics'}
              </div>
              <p className="text-xs text-white/70">
                Choose an individual topic below to launch its theory, flowchart, demo, and practice.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section Heading */}
        <div className="flex items-center justify-between border-b border-[#E8EAE4] pb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E] flex items-center gap-2">
              <span>Select Laboratory Topic</span>
              <span className="text-sm font-sans font-normal text-slate-500">
                (Click to access 8 learning modules)
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
              Each topic contains isolated theory, interactive SVG flowchart, visual simulation, viva questions, and C compiler.
            </p>
          </div>

          <div className="text-xs font-mono font-semibold text-[#063D2E] bg-white px-3 py-1.5 rounded-xl border border-[#E8EAE4] shadow-sm hidden sm:block">
            Exp {exp.number} of 09
          </div>
        </div>

        {/* Dynamic Topics Grid */}
        <div
          className={`grid gap-6 ${
            exp.topics.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : exp.topics.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {exp.topics.map((topic, index) => {
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/student/experiment/${exp.id}/topic/${topic.id}`)}
                className="bg-white rounded-3xl p-6 border border-[#E8EAE4] hover:border-[#063D2E]/40 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Subtle emerald corner accent on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B8E8D0]/30 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Topic Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#063D2E] text-white text-xs font-mono font-bold">
                        Topic {topic.topicNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E8EAE4] text-[11px] font-semibold text-[#063D2E]">
                        {topic.shortTitle}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#FAF9F5] group-hover:bg-[#063D2E] group-hover:text-white text-[#063D2E] flex items-center justify-center transition-colors shrink-0">
                      <ChevronRight size={16} />
                    </div>
                  </div>

                  {/* Topic Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#063D2E] group-hover:text-[#0B513B] transition-colors mb-2 leading-snug">
                    {topic.title}
                  </h3>

                  {/* Topic Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4 line-clamp-3">
                    {topic.topicsSummary}
                  </p>

                  {/* Required Concepts Chips */}
                  <div className="mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Required Concepts
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.requiredConcepts.slice(0, 3).map((concept, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#F7F6F0] text-slate-700 text-[11px] font-medium border border-[#E8EAE4]"
                        >
                          {concept}
                        </span>
                      ))}
                      {topic.requiredConcepts.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-medium">
                          +{topic.requiredConcepts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature Deliverables Overview */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4]/80 text-[11px] text-slate-600 mb-4 font-sans">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={12} className="text-[#063D2E] shrink-0" />
                      <span className="truncate">Theory & Steps</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers size={12} className="text-[#063D2E] shrink-0" />
                      <span className="truncate">Flowchart Logic</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Play size={12} className="text-[#063D2E] shrink-0" />
                      <span className="truncate">Interactive Demo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Code2 size={12} className="text-[#063D2E] shrink-0" />
                      <span className="truncate">C Code Runner</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-3 border-t border-[#E8EAE4] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {topic.learningOutcome.split(':')[0]}
                  </span>

                  <button
                    type="button"
                    className="text-xs font-bold text-[#063D2E] group-hover:text-[#0B513B] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Launch Learning Dashboard</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Navigation: Browse Other Experiments */}
        <div className="pt-8 border-t border-[#E8EAE4]">
          <h3 className="font-serif text-base font-bold text-[#063D2E] mb-3">
            Switch to Another Laboratory Experiment:
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {SYLLABUS_EXPERIMENTS.map((otherExp) => {
              const isCurrent = otherExp.id === exp.id
              return (
                <button
                  key={otherExp.id}
                  onClick={() => navigate(`/student/experiment/${otherExp.id}`)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isCurrent
                      ? 'bg-[#063D2E] text-white border-[#063D2E] shadow-sm'
                      : 'bg-white hover:bg-[#FAF9F5] text-slate-700 border-[#E8EAE4]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center font-mono ${
                    isCurrent ? 'bg-[#B8E8D0] text-[#063D2E]' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {otherExp.number}
                  </span>
                  <span>{otherExp.shortTitle}</span>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
