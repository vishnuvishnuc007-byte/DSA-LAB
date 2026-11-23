import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Code2,
  FileCode,
  Tag,
  Lightbulb,
  Cpu,
  Layers,
  Wrench
} from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import {
  explainCodeLine,
  explainCompilerError,
  type ExplanationLanguage,
  type LineExplanationResult,
  type ErrorExplanationResult
} from '../../services/explanationService'
import type { ParsedCompilerError } from '../../services/compilerService'

interface Props {
  selectedLine: number | null
  selectedLineRange?: { start: number; end: number } | null
  selectedCodeSnippet: string
  fullCode: string
  compilerError?: ParsedCompilerError | null
  hasExecuted: boolean
  className?: string
}

export default function LearningAssistant({
  selectedLine,
  selectedLineRange,
  selectedCodeSnippet,
  fullCode,
  compilerError,
  hasExecuted,
  className = ''
}: Props) {
  const [activeTab, setActiveTab] = useState<'line' | 'errors'>('line')
  const [language, setLanguage] = useState<ExplanationLanguage>('english')

  // Generate line explanation
  const displayLine =
    selectedLineRange && selectedLineRange.start !== selectedLineRange.end
      ? `Lines ${selectedLineRange.start} - ${selectedLineRange.end}`
      : selectedLine
      ? `Line ${selectedLine}`
      : 'Line 1'

  const lineExplanation: LineExplanationResult = explainCodeLine(
    selectedCodeSnippet || fullCode.split('\n')[0] || '',
    displayLine,
    fullCode,
    language
  )

  // Generate compiler error explanation if error exists
  const errorExplanation: ErrorExplanationResult | null = compilerError
    ? explainCompilerError(compilerError, fullCode, language)
    : null

  return (
    <div className={`h-full flex flex-col bg-white dark:bg-[#14221C] rounded-2xl border border-[#E8EAE4] dark:border-[#22382D] shadow-sm overflow-hidden text-[#123D2C] dark:text-[#E8EAE4] ${className}`}>
      {/* Panel Top Header */}
      <div className="p-4 border-b border-[#E8EAE4] dark:border-[#22382D] bg-[#FAF9F5] dark:bg-[#162620]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center shadow-sm">
              <Sparkles size={14} />
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold tracking-tight text-[#063D2E] dark:text-[#F3F4F6]">
                DSA LEARNING ASSISTANT
              </h2>
              <span className="text-[10px] text-slate-500 font-sans">
                Interactive Pedagogical Guide
              </span>
            </div>
          </div>

          {/* Language Switcher (English | Tanglish) */}
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        {/* Two Main Tabs: LINE EXPLANATION | ERRORS & MEANING */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-[#121E19] rounded-xl border border-[#E8EAE4] dark:border-[#22382D]">
          <button
            type="button"
            onClick={() => setActiveTab('line')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'line'
                ? 'bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#063D2E] dark:hover:text-white'
            }`}
          >
            <BookOpen size={13} />
            <span>LINE EXPLANATION</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('errors')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
              activeTab === 'errors'
                ? 'bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#063D2E] dark:hover:text-white'
            }`}
          >
            <AlertCircle size={13} className={compilerError ? 'text-red-400' : ''} />
            <span>ERRORS &amp; MEANING</span>

            {compilerError && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Panel Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin text-xs sm:text-[13px]">
        {/* =========================================================================
            TAB 1: LINE EXPLANATION
            ========================================================================= */}
        {activeTab === 'line' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={lineExplanation.lineNumber + language}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Selected Line Meta Card */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#063D2E] dark:text-[#34D399] flex items-center gap-1">
                    <Code2 size={13} />
                    {displayLine}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#063D2E]/10 dark:bg-[#10B981]/20 text-[#063D2E] dark:text-[#34D399] text-[10px] font-bold">
                    {lineExplanation.tag}
                  </span>
                </div>

                <div className="bg-[#0C1411] text-[#E8EAE4] p-2 rounded-lg font-mono text-[11px] overflow-x-auto border border-[#22382D]">
                  <code className="text-emerald-300 whitespace-pre">
                    {selectedCodeSnippet || fullCode.split('\n')[0] || '// Select a line'}
                  </code>
                </div>
              </div>

              {/* What It Does Section */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 flex items-center gap-1">
                  <Lightbulb size={13} className="text-amber-500" />
                  <span>{language === 'tanglish' ? 'Enna Seiyuthu? (What it does)' : 'What this line does:'}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans bg-[#FAF9F5]/70 dark:bg-[#182822]/60 p-3 rounded-xl border border-[#E8EAE4]/80 dark:border-[#22382D]">
                  {lineExplanation.whatItDoes}
                </p>
              </div>

              {/* Why It Is Used Section */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 flex items-center gap-1">
                  <HelpCircle size={13} className="text-[#063D2E] dark:text-[#34D399]" />
                  <span>{language === 'tanglish' ? 'Yen Thevai? (Why it is used)' : 'Why it is used:'}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans bg-[#FAF9F5]/70 dark:bg-[#182822]/60 p-3 rounded-xl border border-[#E8EAE4]/80 dark:border-[#22382D]">
                  {lineExplanation.whyItIsUsed}
                </p>
              </div>

              {/* Important Keywords & Functions */}
              {lineExplanation.keywords.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 flex items-center gap-1">
                    <Tag size={13} className="text-[#0B513B] dark:text-[#34D399]" />
                    <span>Keywords &amp; Functional Tokens:</span>
                  </div>
                  <div className="space-y-1.5">
                    {lineExplanation.keywords.map((kw, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#192A23] border border-[#E8EAE4] dark:border-[#22382D] text-xs"
                      >
                        <span className="font-mono font-bold text-[#063D2E] dark:text-[#34D399] block mb-0.5">
                          {kw.keyword}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          {kw.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Snippet */}
              {lineExplanation.example && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80">
                    Syntax Example:
                  </div>
                  <pre className="p-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] font-mono text-[11px] text-[#063D2E] dark:text-emerald-300 overflow-x-auto">
                    {lineExplanation.example}
                  </pre>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* =========================================================================
            TAB 2: ERRORS & MEANING
            ========================================================================= */}
        {activeTab === 'errors' && (
          <div className="space-y-4">
            {!hasExecuted ? (
              <div className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#162620] border border-[#E8EAE4] dark:border-[#22382D] text-center space-y-2">
                <AlertCircle size={28} className="text-slate-400 mx-auto" />
                <h3 className="font-serif font-bold text-sm text-[#063D2E] dark:text-[#F3F4F6]">
                  No Execution History Yet
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Click the &quot;Run Code&quot; button above to compile your C program. If GCC detects any syntax, semantic, or runtime errors, their in-depth English and Tanglish explanations will appear here.
                </p>
              </div>
            ) : !compilerError ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-serif font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  Great! No compilation errors found.
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-sans">
                  Your C code conforms to standard syntax and compiled cleanly in the GCC sandbox environment. Check the Program Output panel below for results.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={compilerError.message + language}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* 1. ERROR MESSAGE & CATEGORY */}
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400 font-mono">
                        1. ERROR MESSAGE
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 text-[10px] font-bold">
                        {errorExplanation?.category}
                      </span>
                    </div>
                    <p className="font-mono text-xs font-bold text-red-900 dark:text-red-200 leading-snug">
                      {compilerError.message}
                    </p>
                  </div>

                  {/* 2. ERROR LOCATION */}
                  <div className="p-3 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      2. ERROR LOCATION
                    </span>
                    <span className="font-mono font-bold text-red-600 dark:text-red-400">
                      {errorExplanation?.errorLocation}
                    </span>
                  </div>

                  {/* 3 & 4. MEANING IN CHOSEN LANGUAGE */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 flex items-center justify-between">
                      <span>{language === 'tanglish' ? '4. MEANING IN TANGLISH:' : '3. MEANING IN ENGLISH:'}</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{language}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF9F5] dark:bg-[#182822] border border-[#E8EAE4] dark:border-[#22382D] text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-sans">
                      {language === 'tanglish'
                        ? errorExplanation?.meaningTanglish
                        : errorExplanation?.meaningEnglish}
                    </div>
                  </div>

                  {/* 5. WHY THIS ERROR OCCURRED */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80">
                      5. WHY THIS ERROR OCCURRED:
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-[#FAF9F5] dark:bg-[#182822] p-3 rounded-xl border border-[#E8EAE4] dark:border-[#22382D]">
                      {errorExplanation?.whyItOccurred}
                    </p>
                  </div>

                  {/* 6. SUGGESTED CORRECTION */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                      <Wrench size={13} className="text-emerald-600 dark:text-emerald-400" />
                      <span>6. SUGGESTED CORRECTION:</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-200 text-xs leading-relaxed font-sans space-y-2">
                      <p>{errorExplanation?.suggestedCorrection}</p>
                      {errorExplanation?.codeSnippet && (
                        <pre className="p-2 rounded-lg bg-[#0C1411] text-emerald-300 font-mono text-[11px] overflow-x-auto border border-[#22382D]">
                          {errorExplanation.codeSnippet}
                        </pre>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
