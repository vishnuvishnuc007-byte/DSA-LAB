import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Code2,
  FileCode,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  Cpu
} from 'lucide-react'
import type { IndividualExperiment, CodeLineExplanation } from '../../data/individualExperimentsData'

interface Props {
  exp: IndividualExperiment
  onSwitchOption?: (opt: 'theory' | 'flowchart') => void
}

export default function ProgramExecutionSection({ exp, onSwitchOption }: Props) {
  const { program } = exp
  const [code, setCode] = useState<string>(program.cCode)
  const [copied, setCopied] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [hasExecuted, setHasExecuted] = useState<boolean>(false)
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(program.cCode)
    setSelectedLine(null)
  }

  const handleExecute = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setHasExecuted(true)
    }, 700)
  }

  // Split code into lines for synchronized line numbers and line-level selection
  const codeLines = code.split('\n')

  // Find active line explanation if selected
  const activeExplanation = program.lineExplanations.find(e => e.line === selectedLine)

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#063D2E] text-[#B8E8D0]">
              C Source &amp; Virtual Execution
            </span>
            <span className="text-xs text-gray-400 font-mono">{program.filename} • {program.language}</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E]">
            {program.title}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Copy source code"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white hover:bg-[#F7F6F0] border border-[#E8EAE4] text-gray-600 hover:text-[#063D2E] transition-colors cursor-pointer shadow-sm"
            title="Reset to default program"
          >
            <RotateCcw size={15} />
          </button>

          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className="fill-current" />
            <span>{isRunning ? 'Compiling & Running...' : 'Run & Execute Program'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code Editor (Left) & Synchronized Line Explanations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor Panel */}
        <div className="lg:col-span-7 bg-[#0E1A14] text-white rounded-3xl p-5 border border-black/30 shadow-xl flex flex-col justify-between">
          <div>
            {/* Window bar */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-gray-400 ml-2">{program.filename}</span>
              </div>
              <span className="text-[10px] text-[#86EFAC] font-mono">Click any line to view explanation</span>
            </div>

            {/* Code Lines with clickable highlight */}
            <div className="font-mono text-xs sm:text-sm overflow-x-auto py-2 leading-relaxed max-h-[520px] overflow-y-auto pr-2">
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1
                const isSelected = selectedLine === lineNum
                const hasExpl = program.lineExplanations.some(e => e.line === lineNum)

                return (
                  <div
                    key={idx}
                    onClick={() => hasExpl && setSelectedLine(isSelected ? null : lineNum)}
                    className={`flex items-start px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#10B981]/30 text-white font-bold ring-1 ring-[#10B981]'
                        : hasExpl
                        ? 'hover:bg-white/5 text-[#86EFAC]'
                        : 'text-gray-400'
                    }`}
                  >
                    {/* Line Number */}
                    <span
                      className={`w-8 select-none text-right pr-3 shrink-0 text-[11px] ${
                        isSelected ? 'text-[#86EFAC] font-bold' : 'text-gray-600'
                      }`}
                    >
                      {lineNum}
                    </span>
                    {/* Code Text */}
                    <pre className="whitespace-pre font-mono flex-1">{lineText || ' '}</pre>
                    {hasExpl && (
                      <span className="text-[9px] px-1 rounded bg-white/10 text-gray-400 shrink-0 ml-2 select-none">
                        ?
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Editor Status Bar */}
          <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>GCC Compiler • C99 Standard</span>
            <span>{codeLines.length} Lines • UTF-8</span>
          </div>
        </div>

        {/* Synchronized Explanation & Output Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Selected Line Callout */}
          {activeExplanation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border-2 border-[#10B981] rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 rounded bg-[#063D2E] text-[#B8E8D0] text-[10px] font-mono font-bold">
                  LINE {activeExplanation.line}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-800">
                  {activeExplanation.tag}
                </span>
              </div>
              <code className="text-xs font-mono font-bold text-[#063D2E] block my-1 bg-white/80 p-1.5 rounded border border-emerald-200">
                {activeExplanation.code}
              </code>
              <p className="text-xs text-emerald-950 leading-relaxed mt-1.5">
                {activeExplanation.explanation}
              </p>
            </motion.div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] text-center text-xs text-gray-500">
              💡 <b>Interactive Synchronized Explanation:</b> Click any line in the code editor to view its specific line-by-line explanation.
            </div>
          )}

          {/* Terminal Output Console */}
          <div className="bg-[#111915] text-[#86EFAC] rounded-2xl p-4 border border-black/20 shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800 mb-2.5">
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                <Terminal size={13} className="text-[#86EFAC]" />
                <span>Compiler Output Console</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {hasExecuted ? 'Status: 0 (Success)' : 'Ready for execution'}
              </span>
            </div>

            {isRunning ? (
              <div className="py-6 text-center text-gray-400 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>Compiling {program.filename} with gcc...</span>
              </div>
            ) : hasExecuted ? (
              <pre className="whitespace-pre-wrap text-emerald-300 leading-relaxed max-h-[160px] overflow-y-auto">
                {program.expectedOutput}
              </pre>
            ) : (
              <div className="py-4 text-center text-gray-500 italic">
                Press "Run &amp; Execute Program" above to compile and run this C code.
              </div>
            )}
          </div>

          {/* Synchronized Line-by-Line Breakdown List */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8EAE4] shadow-sm max-h-[260px] overflow-y-auto space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-2 flex items-center gap-1.5">
              <Code2 size={14} />
              <span>Line-by-Line Synchronized Notes</span>
            </h4>
            {program.lineExplanations.map(item => {
              const isSelected = selectedLine === item.line
              return (
                <div
                  key={item.line}
                  onClick={() => setSelectedLine(isSelected ? null : item.line)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-[#063D2E] font-medium shadow-xs'
                      : 'bg-[#FAF9F5] border-[#E8EAE4] hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#063D2E]">
                      Line {item.line}: <code className="text-gray-800">{item.code}</code>
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white text-gray-500 font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-normal">{item.explanation}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      {onSwitchOption && (
        <div className="flex flex-wrap items-center justify-between pt-4 gap-3">
          <div className="text-xs text-gray-400">
            Currently viewing: <b className="text-[#063D2E]">Program &amp; Execution</b>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSwitchOption('theory')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>View Theory &amp; Algorithm</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onSwitchOption('flowchart')}
              className="px-4 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>View Flowchart</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
