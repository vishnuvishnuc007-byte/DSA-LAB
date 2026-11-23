import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Lightbulb,
  Cpu,
  Layers,
  Clock,
  HardDrive,
  Sparkles,
  ArrowRight,
  ListOrdered
} from 'lucide-react'
import type { IndividualExperiment } from '../../data/individualExperimentsData'

interface Props {
  exp: IndividualExperiment
  onSwitchOption?: (opt: 'flowchart' | 'program') => void
}

export default function IsolatedTheorySection({ exp, onSwitchOption }: Props) {
  const { theory } = exp

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview & Core Principle Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
            <BookOpen size={22} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">
              Theoretical Foundation
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#063D2E]">
              {exp.title} — Theory & Conceptual Mechanics
            </h2>
          </div>
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {theory.introduction}
        </p>

        {/* Core Principle Callout */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#063D2E]/5 border border-[#063D2E]/20 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-[#063D2E] text-[#B8E8D0] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D2E]">
              Core Algorithmic Principle
            </h4>
            <p className="text-xs sm:text-sm text-[#063D2E]/90 mt-1 leading-relaxed font-medium">
              {theory.corePrinciple}
            </p>
          </div>
        </div>

        {/* Real World Example */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Real-World Example Analogy
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 mt-1 leading-relaxed">
              {theory.realWorldExample}
            </p>
          </div>
        </div>
      </div>

      {/* Important Concepts Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[#0B513B]" />
          <h3 className="font-serif text-xl font-bold text-[#063D2E]">Key Underlying Concepts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {theory.importantConcepts.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm hover:border-[#0B513B]/50 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-[#063D2E]/10 text-[#063D2E] text-xs font-bold flex items-center justify-center mb-3">
                0{idx + 1}
              </div>
              <h4 className="font-serif text-base font-bold text-[#063D2E] mb-2">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">
              Execution Workflow
            </span>
            <h3 className="font-serif text-xl font-bold text-[#063D2E]">
              Step-by-Step Concept Breakdown
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-750 leading-relaxed bg-[#F7F6F0]/60 p-4 rounded-xl border border-[#E8EAE4]/60">
          {theory.howItWorks}
        </p>

        <div className="space-y-3 pt-2">
          {theory.stepByStepExplanation.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]/60"
            >
              <span className="w-6 h-6 rounded-full bg-[#063D2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-gray-800 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formal Algorithm Steps */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ListOrdered size={20} className="text-[#063D2E]" />
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">
            Standard Numbered Algorithm
          </h3>
        </div>
        <div className="space-y-2.5">
          {theory.algorithmSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#F7F6F0]/80 border border-[#E8EAE4] text-xs sm:text-sm text-gray-800"
            >
              <span className="font-bold text-[#063D2E] mr-2">Step {idx + 1}:</span>
              <span>{step.replace(/^Step \d+:\s*/i, '')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complexity Bounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Computational Bounds
              </span>
              <h4 className="font-serif text-lg font-bold text-[#063D2E]">Time Complexity</h4>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Best</span>
              <span className="font-mono text-sm font-bold text-emerald-700">{theory.timeComplexity.best}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Average</span>
              <span className="font-mono text-sm font-bold text-[#063D2E]">{theory.timeComplexity.avg}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Worst</span>
              <span className="font-mono text-sm font-bold text-amber-700">{theory.timeComplexity.worst}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed bg-[#F7F6F0]/50 p-3.5 rounded-xl border border-[#E8EAE4]/60">
            {theory.timeComplexity.explanation}
          </p>
        </div>

        {/* Space Complexity */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <HardDrive size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Memory Footprint
              </span>
              <h4 className="font-serif text-lg font-bold text-[#063D2E]">Space Complexity</h4>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4] text-center mb-4">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Auxiliary Space</span>
            <span className="font-mono text-base font-bold text-blue-700">{theory.spaceComplexity.auxiliary}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed bg-[#F7F6F0]/50 p-3.5 rounded-xl border border-[#E8EAE4]/60">
            {theory.spaceComplexity.explanation}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      {onSwitchOption && (
        <div className="flex flex-wrap items-center justify-between pt-4 gap-3">
          <div className="text-xs text-gray-400">
            Currently viewing: <b className="text-[#063D2E]">Theory &amp; Algorithm</b>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSwitchOption('flowchart')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>View Flowchart</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onSwitchOption('program')}
              className="px-4 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>View Program &amp; Execution</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
