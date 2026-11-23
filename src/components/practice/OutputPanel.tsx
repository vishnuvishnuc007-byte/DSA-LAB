import React, { useState } from 'react'
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  Trash2,
  Send,
  CornerDownRight,
  Loader2
} from 'lucide-react'
import type { ExecutionResult } from '../../services/compilerService'

interface Props {
  result: ExecutionResult | null
  isRunning: boolean
  stdin: string
  onStdinChange: (val: string) => void
  onClearOutput?: () => void
  className?: string
}

export default function OutputPanel({
  result,
  isRunning,
  stdin,
  onStdinChange,
  onClearOutput,
  className = ''
}: Props) {
  const [showStdin, setShowStdin] = useState(false)

  return (
    <div className={`flex flex-col bg-[#0C1411] text-[#E8EAE4] rounded-2xl border border-[#22382D] shadow-md overflow-hidden font-mono ${className}`}>
      {/* Terminal Title Bar */}
      <div className="px-4 py-2.5 bg-[#121E19] border-b border-[#22382D] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#34D399]" />
          <span className="font-bold tracking-wider text-slate-200">PROGRAM EXECUTION OUTPUT</span>

          {result && (
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                result.hasError
                  ? 'bg-red-950/70 text-red-300 border border-red-800/40'
                  : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
              }`}
            >
              {result.status.description}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          {result && (
            <>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-slate-500" />
                <span>{result.time}s</span>
              </span>
              <span className="flex items-center gap-1">
                <Cpu size={11} className="text-slate-500" />
                <span>{result.memory} KB</span>
              </span>
            </>
          )}

          <button
            type="button"
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer border ${
              showStdin
                ? 'bg-[#10B981] text-[#063D2E] font-bold border-[#10B981]'
                : 'bg-[#182822] text-slate-300 hover:text-white border-[#22382D]'
            }`}
          >
            Custom STDIN {stdin ? '•' : ''}
          </button>

          {onClearOutput && (
            <button
              type="button"
              onClick={onClearOutput}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Clear terminal output"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Optional STDIN Drawer */}
      {showStdin && (
        <div className="p-3 bg-[#15241E] border-b border-[#22382D] text-xs">
          <div className="flex items-center justify-between mb-1 text-[11px] text-slate-400">
            <span>Standard Input (stdin for scanf):</span>
            <span className="text-[10px] text-slate-500">Provide input before clicking Run Code</span>
          </div>
          <textarea
            value={stdin}
            onChange={(e) => onStdinChange(e.target.value)}
            placeholder="e.g. 5&#10;10 20 30"
            rows={2}
            className="w-full p-2 bg-[#0C1411] border border-[#22382D] rounded-lg text-xs font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-[#10B981]"
          />
        </div>
      )}

      {/* Terminal Output Body */}
      <div className="flex-1 p-4 overflow-y-auto text-xs min-h-[140px] max-h-[220px] scrollbar-thin">
        {isRunning ? (
          <div className="h-full flex items-center justify-center gap-2 text-slate-400 py-6">
            <Loader2 size={16} className="animate-spin text-[#34D399]" />
            <span>Compiling in GCC sandbox & executing...</span>
          </div>
        ) : !result ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-6 font-sans">
            <Terminal size={20} className="mb-2 text-slate-600" />
            <p className="text-xs">Terminal is ready. Click &quot;Run Code&quot; to compile and execute your program.</p>
          </div>
        ) : result.isCompilationError ? (
          <div className="space-y-2">
            <div className="text-red-400 font-bold flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-red-500" />
              <span>Compilation Failed with GCC Error:</span>
            </div>
            <pre className="text-red-300 bg-red-950/30 p-3 rounded-lg border border-red-900/40 whitespace-pre-wrap leading-relaxed">
              {result.compileOutput || result.stderr || 'Compilation error'}
            </pre>
          </div>
        ) : result.isRuntimeError ? (
          <div className="space-y-2">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-500" />
              <span>Runtime Execution Terminated:</span>
            </div>
            <pre className="text-amber-300 bg-amber-950/30 p-3 rounded-lg border border-amber-900/40 whitespace-pre-wrap leading-relaxed">
              {result.stderr || result.status.description || 'Runtime error'}
            </pre>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Process returned 0 (0x0) • Execution time: {result.time}s</span>
            </div>
            <pre className="text-slate-100 whitespace-pre-wrap leading-relaxed">
              {result.stdout || '(Program completed with no console output)'}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
