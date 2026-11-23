import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GitBranch,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  Cpu,
  RotateCcw
} from 'lucide-react'
import {
  getIndividualExperiment,
  type IndividualExperiment
} from '../data/individualExperimentsData'
import IsolatedTheorySection from '../components/experiment/IsolatedTheorySection'
import IsolatedFlowchartSection from '../components/experiment/IsolatedFlowchartSection'
import ProgramExecutionSection from '../components/experiment/ProgramExecutionSection'

type OptionType = 'theory' | 'flowchart' | 'program' | null

export default function ExperimentLearningPage() {
  const { expId = 'recursion' } = useParams<{ expId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Get isolated experiment data
  const exp: IndividualExperiment = getIndividualExperiment(expId)

  // Active option from query param or local state
  const paramOption = searchParams.get('option') as OptionType
  const [selectedOption, setSelectedOption] = useState<OptionType>(
    paramOption === 'theory' || paramOption === 'flowchart' || paramOption === 'program'
      ? paramOption
      : null
  )

  // Sync state if URL search param changes
  useEffect(() => {
    if (paramOption === 'theory' || paramOption === 'flowchart' || paramOption === 'program') {
      setSelectedOption(paramOption)
    }
  }, [paramOption])

  // Scroll to top on option change or experiment change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedOption, expId])

  const handleSelectOption = (opt: OptionType) => {
    setSelectedOption(opt)
    if (opt) {
      setSearchParams({ option: opt })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#123D2C] selection:bg-[#B8E8D0] selection:text-[#063D2E]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F6F0]/90 backdrop-blur-md border-b border-[#E8EAE4] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer group"
              title="Return to Student Dashboard"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Experiments</span>
            </button>

            {selectedOption && (
              <button
                onClick={() => handleSelectOption(null)}
                className="px-3 py-2 rounded-xl bg-white hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                title="Back to the 3 options"
              >
                <span>Change Option</span>
              </button>
            )}

            <div className="h-6 w-px bg-gray-300 hidden sm:block" />

            {/* Experiment Name and Category */}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#063D2E] text-[#B8E8D0] text-[10px] font-mono font-bold uppercase">
                  EXP {exp.number}
                </span>
                <h1 className="font-serif text-sm sm:text-base font-bold text-[#063D2E] truncate max-w-[200px] sm:max-w-md">
                  {exp.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Sub-topic switcher if experiment has related topics (e.g. Recursion / Structure / Pointer) */}
          {exp.relatedSubTopics && exp.relatedSubTopics.length > 1 && (
            <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8EAE4] shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 px-2 uppercase tracking-wider hidden md:inline">
                Sub-Topics:
              </span>
              {exp.relatedSubTopics.map(sub => {
                const isCurrent = exp.id === sub.id
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      navigate(`/student/experiment/${sub.id}${selectedOption ? `?option=${selectedOption}` : ''}`)
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#063D2E] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#063D2E] hover:bg-[#F7F6F0]'
                    }`}
                  >
                    {sub.title}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* VIEW A: DEDICATED EXPERIMENT SELECTION PAGE (EXACTLY THREE OPTIONS) */}
        {!selectedOption ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Header / Intro Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>{exp.parentExperimentTitle}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#063D2E]">
                {exp.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {exp.aim}
              </p>
            </div>

            {/* Instruction Callout */}
            <div className="text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-[#0B513B]">
                — Select an Option to Begin Learning —
              </p>
            </div>

            {/* EXACTLY THREE SEPARATE, ATTRACTIVE SELECTION CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* CARD 1: THEORY & ALGORITHM */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectOption('theory')}
                className="bg-white rounded-3xl p-7 border-2 border-[#E8EAE4] hover:border-[#063D2E] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#063D2E]/10 group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-[#B8E8D0] flex items-center justify-center transition-colors">
                      <BookOpen size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F7F6F0] text-[#063D2E] border border-[#E8EAE4]">
                      Option 01
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#063D2E] mb-2 group-hover:text-[#0B513B] transition-colors">
                    Theory &amp; Algorithm
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Step-by-step conceptual theory, core principles, formal numbered algorithm steps, and time/space complexity.
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E8EAE4]/60 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Conceptual &amp; Theoretical Details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Step-by-Step Problem Breakdown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Formal Numbered Algorithm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Complexity Analysis (Best/Avg/Worst)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EAE4]">
                  <div className="w-full py-3 rounded-2xl bg-[#F7F6F0] group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    <span>Select Theory &amp; Algorithm</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* CARD 2: FLOWCHART */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectOption('flowchart')}
                className="bg-white rounded-3xl p-7 border-2 border-[#E8EAE4] hover:border-[#063D2E] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#063D2E]/10 group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-[#B8E8D0] flex items-center justify-center transition-colors">
                      <GitBranch size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F7F6F0] text-[#063D2E] border border-[#E8EAE4]">
                      Option 02
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#063D2E] mb-2 group-hover:text-[#0B513B] transition-colors">
                    Flowchart
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Interactive algorithmic flowchart with standard ISO symbols, decision branching, and step-by-step logic tracing.
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E8EAE4]/60 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Visual Flowchart Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Start, Process, Decision &amp; End</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Interactive Zoom &amp; Pan Controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Sequential Step-by-Step Tracer</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EAE4]">
                  <div className="w-full py-3 rounded-2xl bg-[#F7F6F0] group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    <span>Select Flowchart</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* CARD 3: PROGRAM & EXECUTION */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleSelectOption('program')}
                className="bg-white rounded-3xl p-7 border-2 border-[#E8EAE4] hover:border-[#063D2E] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#063D2E]/10 group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-[#B8E8D0] flex items-center justify-center transition-colors">
                      <Terminal size={24} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F7F6F0] text-[#063D2E] border border-[#E8EAE4]">
                      Option 03
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#063D2E] mb-2 group-hover:text-[#0B513B] transition-colors">
                    Program &amp; Execution
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Interactive C code editor with live execution, compiler output console, and synchronized line-by-line code explanation.
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E8EAE4]/60 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>C Source Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Live Program Compilation &amp; Execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Compiler Terminal Output Window</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>Synchronized Line-by-Line Notes</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EAE4]">
                  <div className="w-full py-3 rounded-2xl bg-[#F7F6F0] group-hover:bg-[#063D2E] text-[#063D2E] group-hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all">
                    <span>Select Program &amp; Execution</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* VIEW B: DISPLAY ONLY THE SELECTED CONTENT */
          <div className="space-y-6 animate-fadeIn">
            {/* Top Option Selector Bar */}
            <div className="bg-white rounded-2xl p-2 border border-[#E8EAE4] shadow-sm flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectOption('theory')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedOption === 'theory'
                      ? 'bg-[#063D2E] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-[#F7F6F0] hover:text-[#063D2E]'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>1. Theory &amp; Algorithm</span>
                </button>

                <button
                  onClick={() => handleSelectOption('flowchart')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedOption === 'flowchart'
                      ? 'bg-[#063D2E] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-[#F7F6F0] hover:text-[#063D2E]'
                  }`}
                >
                  <GitBranch size={14} />
                  <span>2. Flowchart</span>
                </button>

                <button
                  onClick={() => handleSelectOption('program')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedOption === 'program'
                      ? 'bg-[#063D2E] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-[#F7F6F0] hover:text-[#063D2E]'
                  }`}
                >
                  <Terminal size={14} />
                  <span>3. Program &amp; Execution</span>
                </button>
              </div>

              <button
                onClick={() => handleSelectOption(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-[#063D2E] hover:bg-[#F7F6F0] transition-colors cursor-pointer"
              >
                ← Back to 3 Options
              </button>
            </div>

            {/* RENDER ONLY THE SELECTED OPTION CONTENT */}
            {selectedOption === 'theory' && (
              <IsolatedTheorySection
                exp={exp}
                onSwitchOption={opt => handleSelectOption(opt)}
              />
            )}

            {selectedOption === 'flowchart' && (
              <IsolatedFlowchartSection
                exp={exp}
                onSwitchOption={opt => handleSelectOption(opt)}
              />
            )}

            {selectedOption === 'program' && (
              <ProgramExecutionSection
                exp={exp}
                onSwitchOption={opt => handleSelectOption(opt)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
