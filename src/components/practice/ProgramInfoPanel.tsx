import React from 'react'
import { FileCode, Target, HelpCircle, Layers, CheckCircle, ChevronRight, Award, Sparkles } from 'lucide-react'
import type { PracticeProblem } from '../../data/experimentsData'

interface Props {
  expNumber: string
  expTitle: string
  topicTitle: string
  problem?: PracticeProblem
  allProblems?: PracticeProblem[]
  selectedProblemIndex?: number
  onSelectProblem?: (index: number) => void
  expectedOutputFallback?: string
  aimFallback?: string
}

export default function ProgramInfoPanel({
  expNumber,
  expTitle,
  topicTitle,
  problem,
  allProblems = [],
  selectedProblemIndex = 0,
  onSelectProblem,
  expectedOutputFallback = '',
  aimFallback = ''
}: Props) {
  const difficulty = problem?.difficulty || 'Intermediate'
  const description = problem?.description || aimFallback || 'Implement and execute the specified C program following standard algorithmic principles.'
  const inputFormat = problem?.inputFormat || 'Positive integers or dynamic inputs depending on prompt.'
  const outputFormat = problem?.outputFormat || 'Formatted console output displaying calculation steps or final result.'
  const sampleInput = problem?.sampleInput || 'N = 5'
  const sampleOutput = problem?.sampleOutput || expectedOutputFallback || 'Output: 120'

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#14221C] rounded-2xl border border-[#E8EAE4] dark:border-[#22382D] shadow-sm overflow-hidden text-[#123D2C] dark:text-[#E8EAE4]">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 border-b border-[#E8EAE4] dark:border-[#22382D] bg-[#FAF9F5] dark:bg-[#162620]">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-[#063D2E] text-white text-[10px] font-mono font-bold">
            EXP {expNumber}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-[#A8E6CF]/30 dark:bg-[#10B981]/20 text-[#063D2E] dark:text-[#34D399] text-[10px] font-bold">
            {topicTitle}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
            difficulty === 'Beginner'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40'
              : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40'
          }`}>
            {difficulty}
          </span>
        </div>

        <h2 className="font-serif text-lg font-bold text-[#063D2E] dark:text-[#F3F4F6] leading-tight">
          {problem?.title || expTitle}
        </h2>
      </div>

      {/* Task Switcher Pills (If multiple problems exist) */}
      {allProblems.length > 1 && onSelectProblem && (
        <div className="px-4 py-2.5 border-b border-[#E8EAE4] dark:border-[#22382D] bg-white dark:bg-[#14221C] flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          {allProblems.map((p, idx) => (
            <button
              key={p.id || idx}
              type="button"
              onClick={() => onSelectProblem(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedProblemIndex === idx
                  ? 'bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm'
                  : 'bg-[#FAF9F5] dark:bg-[#192A23] text-slate-600 dark:text-slate-300 hover:text-[#063D2E] dark:hover:text-white border border-[#E8EAE4] dark:border-[#22382D]'
              }`}
            >
              Task {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable Information Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin text-xs sm:text-[13px]">
        {/* Objective & Description */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 mb-1.5 flex items-center gap-1.5">
            <Target size={13} className="text-[#0B513B] dark:text-[#34D399]" />
            <span>Problem Description</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            {description}
          </p>
        </div>

        {/* Input Requirements */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 mb-1 flex items-center gap-1.5">
            <Layers size={13} className="text-[#0B513B] dark:text-[#34D399]" />
            <span>Input Requirements</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] font-mono text-[11px] text-slate-800 dark:text-slate-200">
            {inputFormat}
          </div>
        </div>

        {/* Expected Output */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 mb-1 flex items-center gap-1.5">
            <CheckCircle size={13} className="text-[#0B513B] dark:text-[#34D399]" />
            <span>Expected Output Format</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] font-mono text-[11px] text-slate-800 dark:text-slate-200">
            {outputFormat}
          </div>
        </div>

        {/* Sample Input & Output */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80">
            Sample Test Benchmark
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Input:</span>
              <pre className="p-2 rounded-lg bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] font-mono text-[11px] text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                {sampleInput}
              </pre>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Output:</span>
              <pre className="p-2 rounded-lg bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] font-mono text-[11px] text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap">
                {sampleOutput}
              </pre>
            </div>
          </div>
        </div>

        {/* Hint if available */}
        {problem?.hint && (
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200">
            <span className="font-bold flex items-center gap-1 mb-0.5">
              <Sparkles size={12} className="text-amber-600 dark:text-amber-400" />
              Algorithmic Hint:
            </span>
            <p className="leading-relaxed">{problem.hint}</p>
          </div>
        )}
      </div>
    </div>
  )
}
