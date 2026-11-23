import React from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  FileText,
  ListChecks,
  Tag,
  BookOpen,
  Terminal,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import type { ExperimentDetail } from '../../data/experimentsData'

import exp01Icon from '../../assets/experiments/experiment-01-code.png'
import exp02Icon from '../../assets/experiments/experiment-02-linked-list.png'
import exp03Icon from '../../assets/experiments/experiment-03-stack.png'
import exp04Icon from '../../assets/experiments/experiment-04-parentheses.png'
import exp05Icon from '../../assets/experiments/experiment-05-queue.png'
import exp06Icon from '../../assets/experiments/experiment-06-binary-tree.png'
import exp07Icon from '../../assets/experiments/experiment-07-dijkstra.png'
import exp08Icon from '../../assets/experiments/experiment-08-mst.png'
import exp09Icon from '../../assets/experiments/experiment-09-sorting.png'

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

interface Props {
  exp: ExperimentDetail
  onProceedToTheory?: () => void
}

export default function ExperimentDetailsSection({ exp, onProceedToTheory }: Props) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-br from-[#063D2E] to-[#0A5641] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B8E8D0] text-[#063D2E]">
                Experiment {exp.number}
              </span>
              <span className="text-xs text-white/70 font-mono tracking-wide">
                {exp.topics}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F7F6F0] mb-4">
              {exp.title}
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {exp.aim}
            </p>
          </div>
          <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl self-start md:self-center">
            <img
              src={EXP_3D_ICONS[exp.id]}
              alt={exp.title}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Grid: Problem Statement & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Statement & Syllabus Scope */}
        <div className="lg:col-span-7 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#063D2E]">Problem Statement</h3>
                <p className="text-xs text-gray-500">Core academic challenge to solve</p>
              </div>
            </div>
            <p className="text-sm text-gray-750 leading-relaxed bg-[#F7F6F0]/60 p-4 rounded-xl border border-[#E8EAE4]/60">
              {exp.problemStatement}
            </p>
          </div>

          {/* Objectives Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#063D2E]">Specific Objectives</h3>
                <p className="text-xs text-gray-500">What you will accomplish</p>
              </div>
            </div>
            <div className="space-y-3">
              {exp.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F6F0]/40 border border-[#E8EAE4]/50">
                  <div className="w-5 h-5 rounded-full bg-[#063D2E] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 leading-normal">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Scope */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#063D2E]">Syllabus Scope & Topics</h3>
                <p className="text-xs text-gray-500">Curriculum standard coverage</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {exp.syllabusScope.map((scope, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7F6F0] text-xs text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B513B]" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Required Concepts, Expected Output & Learning Outcome */}
        <div className="lg:col-span-5 space-y-6">
          {/* Required Concepts */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E]/10 flex items-center justify-center text-[#063D2E]">
                <Tag size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#063D2E]">Prerequisites & Concepts</h3>
                <p className="text-xs text-gray-500">Required background knowledge</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.requiredConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] hover:border-[#0B513B] transition-colors"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Expected Output Console */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-[#063D2E]" />
                <h3 className="font-serif text-base font-bold text-[#063D2E]">Expected Output Preview</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400">bash / gcc</span>
            </div>
            <div className="bg-[#111915] text-[#86EFAC] p-4 rounded-xl font-mono text-xs overflow-x-auto border border-black/20 shadow-inner leading-relaxed">
              <div className="text-gray-500 pb-2 border-b border-gray-800 text-[10px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 text-gray-400">lab_terminal_output</span>
              </div>
              <pre className="mt-2.5 whitespace-pre-wrap">{exp.expectedOutput}</pre>
            </div>
          </div>

          {/* Learning Outcome */}
          <div className="bg-gradient-to-br from-[#EBF5EE] to-[#E2F0E7] border border-[#B8E8D0] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#063D2E] text-[#B8E8D0] flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#063D2E]">Course Learning Outcome (CO)</h3>
                <p className="text-[11px] text-[#0A5641]">Mapped outcome evaluation</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#063D2E]/90 leading-relaxed font-medium mt-2">
              {exp.learningOutcome}
            </p>
          </div>

          {/* Call to action */}
          {onProceedToTheory && (
            <button
              onClick={onProceedToTheory}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Explore Theory & Algorithm</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
