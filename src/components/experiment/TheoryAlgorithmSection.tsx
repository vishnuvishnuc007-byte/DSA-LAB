import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Lightbulb,
  Cpu,
  Layers,
  Clock,
  HardDrive,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react'
import type { ExperimentDetail } from '../../data/experimentsData'

interface Props {
  exp: ExperimentDetail
  onProceedToFlowchart?: () => void
}

export default function TheoryAlgorithmSection({ exp, onProceedToFlowchart }: Props) {
  const [copied, setCopied] = useState(false)
  const { theory } = exp

  const handleCopyPseudocode = () => {
    navigator.clipboard.writeText(theory.pseudocode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
            <BookOpen size={22} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">Conceptual Foundation</span>
            <h2 className="font-serif text-2xl font-bold text-[#063D2E]">Introduction & Fundamentals</h2>
          </div>
        </div>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {theory.introduction}
        </p>

        {/* Real World Analogy Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">Real-World Analogy</h4>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
              {theory.realWorldExample}
            </p>
          </div>
        </div>
      </div>

      {/* Important Concepts Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#0B513B]" />
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

      {/* How it Works & Step by Step Execution */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">Execution Mechanics</span>
            <h3 className="font-serif text-xl font-bold text-[#063D2E]">How It Works Under the Hood</h3>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          {theory.howItWorks}
        </p>

        {/* Step-by-Step Breakdown */}
        <div className="space-y-3 pt-2 border-t border-[#E8EAE4]/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Step-by-Step Breakdown</h4>
          {theory.stepByStepExplanation?.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]/60">
              <span className="w-6 h-6 rounded-full bg-[#063D2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-gray-750 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm and Pseudocode Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formal Algorithm Steps */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={20} className="text-[#063D2E]" />
              <h3 className="font-serif text-lg font-bold text-[#063D2E]">Standard Algorithm Specification</h3>
            </div>
            <div className="space-y-2.5">
              {theory.algorithmSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F7F6F0]/70 border border-[#E8EAE4]/70 text-xs sm:text-sm text-gray-750">
                  <span className="font-bold text-[#063D2E] mr-2">Step {idx + 1}:</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pseudocode Box */}
        <div className="lg:col-span-6 bg-[#0E1A14] text-white rounded-3xl p-6 border border-black/30 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-gray-400 ml-2">algorithm_pseudocode.txt</span>
              </div>
              <button
                onClick={handleCopyPseudocode}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="font-mono text-xs sm:text-sm text-[#86EFAC] overflow-x-auto leading-relaxed p-2 whitespace-pre-wrap">
              {theory.pseudocode}
            </pre>
          </div>
        </div>
      </div>

      {/* Complexity Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Asymptotic Bounds</span>
              <h4 className="font-serif text-lg font-bold text-[#063D2E]">Time Complexity Analysis</h4>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Best Case</span>
              <span className="font-mono text-sm font-bold text-emerald-700">{theory.timeComplexity.best}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Average</span>
              <span className="font-mono text-sm font-bold text-[#063D2E]">{theory.timeComplexity.avg}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Worst Case</span>
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
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Memory Footprint</span>
              <h4 className="font-serif text-lg font-bold text-[#063D2E]">Space Complexity Analysis</h4>
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

      {/* Bottom CTA to Flowchart */}
      {onProceedToFlowchart && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onProceedToFlowchart}
            className="py-3.5 px-6 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Proceed to Interactive Flowchart</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}
