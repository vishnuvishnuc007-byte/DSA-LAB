import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Flame,
  Award,
  CheckCircle2,
  ChevronRight,
  Send,
  HelpCircle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react'
import type { ExperimentDetail, PracticeProblem } from '../../data/experimentsData'
import ProgramInfoPanel from '../practice/ProgramInfoPanel'
import CodeEditor from '../practice/CodeEditor'
import OutputPanel from '../practice/OutputPanel'
import LearningAssistant from '../practice/LearningAssistant'
import { executeCCode, type ExecutionResult, type ParsedCompilerError } from '../../services/compilerService'

interface Props {
  exp: ExperimentDetail
  onProceedToViva?: () => void
}

export default function PracticeSection({ exp, onProceedToViva }: Props) {
  const problems = exp.practiceProblems || []
  const [selectedProbIndex, setSelectedProbIndex] = useState<number>(0)
  const activeProblem: PracticeProblem | undefined = problems[selectedProbIndex]

  // Default starter code: from active problem or fallback C template
  const defaultCode =
    activeProblem?.starterCode ||
    exp.defaultCodeSnippet ||
    `#include <stdio.h>\n\nint main() {\n    printf("Hello DSA LAB\\n");\n    return 0;\n}`

  const [code, setCode] = useState<string>(defaultCode)
  const [stdin, setStdin] = useState<string>(activeProblem?.sampleInput || '')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [hasExecuted, setHasExecuted] = useState<boolean>(false)

  // Line selection tracking for the AI Learning Assistant
  const [selectedLine, setSelectedLine] = useState<number | null>(1)
  const [selectedLineRange, setSelectedLineRange] = useState<{ start: number; end: number } | null>(null)
  const [selectedSnippet, setSelectedSnippet] = useState<string>('#include <stdio.h>')

  // Error tracking
  const [compilerError, setCompilerError] = useState<ParsedCompilerError | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  // Switch problem
  const handleSelectProblem = (idx: number) => {
    setSelectedProbIndex(idx)
    const newProb = problems[idx]
    const newCode = newProb?.starterCode || exp.defaultCodeSnippet || defaultCode
    setCode(newCode)
    setStdin(newProb?.sampleInput || '')
    setExecutionResult(null)
    setCompilerError(null)
    setHasExecuted(false)
    setSubmitted(false)

    // Reset line selection to line 1
    const lines = newCode.split('\n')
    setSelectedLine(1)
    setSelectedLineRange(null)
    setSelectedSnippet(lines[0] || '')
  }

  // Code editor selection change
  const handleLineSelectionChange = (selection: {
    startLine: number
    endLine: number
    codeSnippet: string
  }) => {
    if (selection.startLine === selection.endLine) {
      setSelectedLine(selection.startLine)
      setSelectedLineRange(null)
    } else {
      setSelectedLine(selection.startLine)
      setSelectedLineRange({ start: selection.startLine, end: selection.endLine })
    }
    setSelectedSnippet(selection.codeSnippet)
  }

  // Run Code via Real Judge0 GCC Compiler Sandbox
  const handleRunCode = async () => {
    setIsRunning(true)
    setSubmitted(false)
    setHasExecuted(true)

    try {
      const result = await executeCCode(code, stdin)
      setExecutionResult(result)

      if (result.hasError && result.parsedError) {
        setCompilerError(result.parsedError)
        // Focus line with error if available
        if (result.parsedError.line) {
          setSelectedLine(result.parsedError.line)
          const lines = code.split('\n')
          const errorLineIdx = result.parsedError.line - 1
          if (lines[errorLineIdx]) {
            setSelectedSnippet(lines[errorLineIdx])
          }
        }
      } else {
        setCompilerError(null)
      }
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err?.message || 'Execution failed. Please check network connection.',
        compileOutput: null,
        status: { id: 11, description: 'Runtime/System Error' },
        time: null,
        memory: null,
        hasError: true,
        isCompilationError: false,
        isRuntimeError: true
      })
    } finally {
      setIsRunning(false)
    }
  }

  // Reset code to original starter code
  const handleResetCode = () => {
    const orig = activeProblem?.starterCode || exp.defaultCodeSnippet || defaultCode
    setCode(orig)
    setExecutionResult(null)
    setCompilerError(null)
    setHasExecuted(false)
  }

  const handleClearCode = () => {
    setCode('')
    setExecutionResult(null)
    setCompilerError(null)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Challenge Selector */}
      <div className="bg-white dark:bg-[#14221C] rounded-3xl p-5 sm:p-6 border border-[#E8EAE4] dark:border-[#22382D] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B513B] dark:text-[#34D399]">
              C Programming Workspace
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B513B] dark:bg-[#34D399]" />
            <span className="text-[11px] font-medium text-slate-500 font-sans">
              Real GCC Sandbox & Live AI Assistant
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E] dark:text-[#E8EAE4]">
            Interactive Practice & Compilation
          </h2>
        </div>

        {/* Task Switcher Pills */}
        {problems.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {problems.map((prob, idx) => (
              <button
                key={prob.id}
                onClick={() => handleSelectProblem(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedProbIndex === idx
                    ? 'bg-[#063D2E] text-white shadow-sm'
                    : 'bg-[#F7F6F0] dark:bg-[#1C2C24] text-slate-700 dark:text-slate-300 hover:bg-[#E8EAE4] dark:hover:bg-[#25392F]'
                }`}
              >
                <span>Task {idx + 1}: {prob.title}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-mono ${
                    prob.difficulty === 'Beginner'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {prob.difficulty}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main 3-Column Interactive Coding Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =========================================================================
            LEFT COLUMN (col-span-3): Program Information Panel
            ========================================================================= */}
        <div className="lg:col-span-3 h-[740px] sticky top-20">
          <ProgramInfoPanel
            expNumber={exp.number}
            expTitle={exp.title}
            topicTitle={exp.topics || exp.title}
            problem={activeProblem}
            allProblems={problems}
            selectedProblemIndex={selectedProbIndex}
            onSelectProblem={handleSelectProblem}
            expectedOutputFallback={exp.expectedOutput}
            aimFallback={exp.aim}
          />
        </div>

        {/* =========================================================================
            CENTER COLUMN (col-span-5): Code Editor & Terminal Output
            ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-[740px]">
          {/* Top Monaco Code Editor (Flex-1) */}
          <div className="flex-1 min-h-[420px] rounded-2xl overflow-hidden shadow-sm border border-[#E8EAE4] dark:border-[#22382D]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRunCode={handleRunCode}
              onResetCode={handleResetCode}
              onClearCode={handleClearCode}
              isRunning={isRunning}
              onLineSelectionChange={handleLineSelectionChange}
              errorHighlightLine={compilerError?.line || null}
              className="h-full"
            />
          </div>

          {/* Bottom Execution Terminal Output */}
          <div className="h-[280px] shrink-0">
            <OutputPanel
              result={executionResult}
              isRunning={isRunning}
              stdin={stdin}
              onStdinChange={setStdin}
              onClearOutput={() => setExecutionResult(null)}
              className="h-full"
            />
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (col-span-4): DSA Learning Assistant (Line Explanation & Errors)
            ========================================================================= */}
        <div className="lg:col-span-4 h-[740px] sticky top-20">
          <LearningAssistant
            selectedLine={selectedLine}
            selectedLineRange={selectedLineRange}
            selectedCodeSnippet={selectedSnippet}
            fullCode={code}
            compilerError={compilerError}
            hasExecuted={hasExecuted}
            className="h-full"
          />
        </div>
      </div>

      {/* Completion & Next Section Footer Bar */}
      <div className="bg-white dark:bg-[#14221C] rounded-2xl p-5 border border-[#E8EAE4] dark:border-[#22382D] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#A8E6CF]/30 dark:bg-[#1A382A] text-[#063D2E] dark:text-[#34D399] flex items-center justify-center shrink-0">
            <Award size={20} />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#063D2E] dark:text-[#E8EAE4]">
              {submitted ? 'Code Submitted & Verified!' : 'Practice Evaluation Ready'}
            </h4>
            <p className="text-xs text-slate-500 font-sans">
              {submitted
                ? 'Great work! Proceed to the Viva Voce preparation section.'
                : 'Run your solution against test cases and inspect real compiler output.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setSubmitted(true)}
            className="px-5 py-2.5 rounded-xl border border-[#063D2E] dark:border-[#34D399] text-[#063D2E] dark:text-[#34D399] hover:bg-[#FAF9F5] dark:hover:bg-[#1C2C24] text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial text-center"
          >
            Mark Problem Complete
          </button>

          {onProceedToViva && (
            <button
              onClick={onProceedToViva}
              className="px-6 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
            >
              <span>Proceed to Viva Voce</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
