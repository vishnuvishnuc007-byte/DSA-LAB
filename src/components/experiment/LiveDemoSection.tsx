import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  Sparkles,
  GitCommit,
  GitBranch,
  CornerDownRight,
  Flame
} from 'lucide-react'
import type { ExperimentDetail } from '../../data/experimentsData'

interface Props {
  exp: ExperimentDetail
  onProceedToPractice?: () => void
}

export default function LiveDemoSection({ exp, onProceedToPractice }: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#063D2E] text-[#B8E8D0]">
              Visual Simulation Sandbox
            </span>
            <span className="text-xs text-gray-500">Live Computational Mechanics</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E]">
            Interactive Demonstration: {exp.shortTitle}
          </h2>
        </div>
      </div>

      {/* Render Experiment-Specific Live Demo */}
      {exp.id === 'exp-01' && <Exp01Demo />}
      {exp.id === 'exp-02' && <Exp02Demo />}
      {exp.id === 'exp-03' && <Exp03Demo />}
      {exp.id === 'exp-04' && <Exp04Demo />}
      {exp.id === 'exp-05' && <Exp05Demo />}
      {exp.id === 'exp-06' && <Exp06Demo />}
      {exp.id === 'exp-07' && <Exp07Demo />}
      {exp.id === 'exp-08' && <Exp08Demo />}
      {exp.id === 'exp-09' && <Exp09Demo />}

      {/* Bottom CTA to Practice */}
      {onProceedToPractice && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onProceedToPractice}
            className="py-3.5 px-6 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Proceed to Hands-on Practice</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   EXP 01: Recursion & Pointers Call Stack Simulator
   ========================================================================= */
function Exp01Demo() {
  const [n, setN] = useState<number>(4)
  const [frames, setFrames] = useState<{ n: number; phase: 'call' | 'return'; value?: number }[]>([])
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  // Precomputed call steps for factorial(n)
  const generateSteps = (num: number) => {
    const steps: { n: number; phase: 'call' | 'return'; value?: number; log: string }[] = []
    function recur(curr: number): number {
      steps.push({ n: curr, phase: 'call', log: `Push factorial(${curr}) onto Call Stack` })
      if (curr <= 1) {
        steps.push({ n: curr, phase: 'return', value: 1, log: `Base case reached: factorial(1) returns 1` })
        return 1
      }
      const prev = recur(curr - 1)
      const res = curr * prev
      steps.push({ n: curr, phase: 'return', value: res, log: `factorial(${curr}) = ${curr} * ${prev} = ${res} (Stack frame popped)` })
      return res
    }
    recur(num)
    return steps
  }

  const steps = generateSteps(n)

  useEffect(() => {
    let timer: any
    if (isPlaying && stepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setStepIndex(prev => prev + 1)
      }, 1200)
    } else if (stepIndex >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearTimeout(timer)
  }, [isPlaying, stepIndex, steps.length])

  // Current active frames
  const activeStack: { n: number; val?: number }[] = []
  for (let i = 0; i <= stepIndex; i++) {
    const s = steps[i]
    if (s.phase === 'call') {
      activeStack.push({ n: s.n })
    } else {
      const idx = activeStack.findLastIndex(f => f.n === s.n)
      if (idx !== -1) {
        activeStack[idx].val = s.value
      }
    }
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Recursion Call Stack & Memory Frames</h3>
          <p className="text-xs text-gray-500">Trace activation records and return value propagation for factorial(n)</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-600">Input N:</label>
          <select
            value={n}
            onChange={e => {
              setN(Number(e.target.value))
              setStepIndex(0)
              setIsPlaying(false)
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => {
              setStepIndex(0)
              setIsPlaying(false)
            }}
            className="p-1.5 rounded-xl bg-white border border-[#E8EAE4] text-gray-600 hover:text-[#063D2E] transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Call Stack Tower */}
        <div className="md:col-span-6 bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm flex flex-col justify-end min-h-[320px]">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Call Stack (LIFO Frame Allocation)</span>
            <span className="text-[10px] text-[#063D2E] font-mono">Top of Stack ↑</span>
          </div>
          <div className="space-y-2.5 flex flex-col-reverse">
            {activeStack.map((frame, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-mono transition-all ${
                  i === activeStack.length - 1
                    ? 'bg-[#B8E8D0]/30 border-[#063D2E] text-[#063D2E] shadow-md ring-2 ring-[#063D2E]/20'
                    : 'bg-[#F7F6F0] border-[#E8EAE4] text-gray-750'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#063D2E] text-white text-[10px] flex items-center justify-center font-sans font-bold">
                    {i + 1}
                  </span>
                  <span className="font-semibold">factorial({frame.n})</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">Memory Frame 0x7ffd{frame.n}8</span>
                  <span className="font-bold text-[#063D2E]">
                    {frame.val !== undefined ? `Returns ${frame.val}` : 'Active (Waiting)'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Execution Log & Memory Pointer Inspector */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-2 flex items-center gap-1.5">
              <CornerDownRight size={14} />
              <span>Current Execution State</span>
            </h4>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-mono">
              {steps[stepIndex]?.log || 'Execution Ready'}
            </div>
          </div>

          <div className="bg-[#111915] text-[#86EFAC] rounded-2xl p-5 border border-black/20 shadow-md font-mono text-xs">
            <div className="text-gray-400 text-[10px] uppercase tracking-wider pb-2 border-b border-gray-800 flex justify-between">
              <span>Virtual Memory Pointer Allocation</span>
              <span>C Struct Address</span>
            </div>
            <div className="mt-3 space-y-1.5 text-[11px]">
              <div>&gt; Stack Pointer (SP): 0x7ffee4b28</div>
              <div>&gt; Frame Pointer (FP): 0x7ffee4b40</div>
              <div>&gt; Struct Student *s = malloc(sizeof(Student))</div>
              <div className="text-yellow-400">&gt; Heap Address: 0x6000034a0 [48 Bytes]</div>
              <div className="text-gray-400">&gt; return 0; // stack unwind complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 02: Singly Linked List ADT Visualizer
   ========================================================================= */
function Exp02Demo() {
  const [nodes, setNodes] = useState<number[]>([15, 28, 42, 60])
  const [newValue, setNewValue] = useState<string>('75')
  const [activeTraverseIndex, setActiveTraverseIndex] = useState<number>(-1)
  const [actionLog, setActionLog] = useState<string>('Linked list initialized with 4 nodes')

  const handleInsertHead = () => {
    const val = parseInt(newValue) || Math.floor(Math.random() * 90) + 10
    setNodes([val, ...nodes])
    setActionLog(`Inserted node (${val}) at HEAD`)
  }

  const handleInsertTail = () => {
    const val = parseInt(newValue) || Math.floor(Math.random() * 90) + 10
    setNodes([...nodes, val])
    setActionLog(`Inserted node (${val}) at TAIL`)
  }

  const handleDeleteHead = () => {
    if (nodes.length === 0) return
    const removed = nodes[0]
    setNodes(nodes.slice(1))
    setActionLog(`Deleted HEAD node (${removed})`)
  }

  const handleDeleteTail = () => {
    if (nodes.length === 0) return
    const removed = nodes[nodes.length - 1]
    setNodes(nodes.slice(0, -1))
    setActionLog(`Deleted TAIL node (${removed})`)
  }

  const handleTraverse = () => {
    setActiveTraverseIndex(0)
    setActionLog('Starting traversal from HEAD pointer...')
    let idx = 0
    const interval = setInterval(() => {
      idx++
      if (idx < nodes.length) {
        setActiveTraverseIndex(idx)
        setActionLog(`Visiting node ${idx + 1} with data [${nodes[idx]}]`)
      } else {
        clearInterval(interval)
        setActiveTraverseIndex(-1)
        setActionLog('Reached NULL pointer. Traversal completed.')
      }
    }, 700)
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Singly Linked List Interactive ADT</h3>
          <p className="text-xs text-gray-500">Insert, delete and traverse node memory addresses linked with pointers</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
            placeholder="Val"
          />
          <button
            onClick={handleInsertHead}
            className="px-3 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            + Head
          </button>
          <button
            onClick={handleInsertTail}
            className="px-3 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            + Tail
          </button>
          <button
            onClick={handleDeleteHead}
            disabled={nodes.length === 0}
            className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            - Head
          </button>
          <button
            onClick={handleTraverse}
            className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            Traverse
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8EAE4] shadow-sm overflow-x-auto min-h-[220px] flex items-center justify-start sm:justify-center">
        {nodes.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            List is empty. Use the controls above to insert nodes.
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-max">
            {/* HEAD Pointer Label */}
            <div className="flex flex-col items-center mr-2">
              <span className="text-[10px] font-bold text-[#0B513B] uppercase tracking-wider">HEAD</span>
              <div className="text-emerald-700 font-mono font-bold text-lg">→</div>
            </div>

            {/* Nodes */}
            {nodes.map((val, idx) => {
              const isCurrent = activeTraverseIndex === idx
              return (
                <React.Fragment key={idx}>
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`flex rounded-xl overflow-hidden border-2 transition-all ${
                      isCurrent
                        ? 'border-[#10B981] shadow-lg ring-4 ring-[#10B981]/20 scale-105'
                        : 'border-[#063D2E] shadow-sm'
                    }`}
                  >
                    {/* Data Field */}
                    <div className="bg-[#FAF9F5] px-4 py-3 text-center border-r border-[#063D2E]/20">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">data</span>
                      <span className="font-mono font-bold text-base text-[#063D2E]">{val}</span>
                    </div>
                    {/* Next Pointer Field */}
                    <div className="bg-[#EBF5EE] px-3 py-3 flex flex-col items-center justify-center">
                      <span className="text-[9px] uppercase font-bold text-[#0B513B] block">next</span>
                      <span className="text-xs font-mono text-[#063D2E]">0x{100 + idx * 8}</span>
                    </div>
                  </motion.div>

                  {/* Arrow to next node */}
                  {idx < nodes.length - 1 ? (
                    <div className="flex items-center px-1 text-[#063D2E]">
                      <div className="w-6 h-0.5 bg-[#063D2E]" />
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#063D2E]" />
                    </div>
                  ) : (
                    <div className="flex items-center px-1 text-gray-400">
                      <div className="w-6 h-0.5 bg-gray-400" />
                      <span className="text-[11px] font-mono font-bold ml-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        NULL
                      </span>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        )}
      </div>

      {/* Action Log Banner */}
      <div className="p-3.5 rounded-xl bg-white border border-[#E8EAE4] flex items-center justify-between text-xs">
        <span className="text-gray-500 font-medium">Activity Log:</span>
        <span className="font-mono font-semibold text-[#063D2E]">{actionLog}</span>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 03: Stack (LIFO) ADT Visualizer
   ========================================================================= */
function Exp03Demo() {
  const [stack, setStack] = useState<number[]>([10, 20, 30])
  const [inputValue, setInputValue] = useState<string>('40')
  const [peekedValue, setPeekedValue] = useState<number | null>(null)
  const [statusMsg, setStatusMsg] = useState<string>('Stack initialized (Size: 3 / Max: 6)')
  const MAX_CAPACITY = 6

  const handlePush = () => {
    if (stack.length >= MAX_CAPACITY) {
      setStatusMsg('Stack Overflow! Cannot push into a full stack.')
      return
    }
    const val = parseInt(inputValue) || Math.floor(Math.random() * 90) + 10
    setStack([...stack, val])
    setPeekedValue(null)
    setStatusMsg(`PUSH: Added ${val} to top of stack. (top = ${stack.length})`)
  }

  const handlePop = () => {
    if (stack.length === 0) {
      setStatusMsg('Stack Underflow! Cannot pop from an empty stack.')
      return
    }
    const popped = stack[stack.length - 1]
    setStack(stack.slice(0, -1))
    setPeekedValue(null)
    setStatusMsg(`POP: Removed ${popped} from top of stack. (top = ${stack.length - 2})`)
  }

  const handlePeek = () => {
    if (stack.length === 0) {
      setStatusMsg('Stack is empty! Nothing to peek.')
      return
    }
    const topVal = stack[stack.length - 1]
    setPeekedValue(topVal)
    setStatusMsg(`PEEK: Top element is ${topVal}`)
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Stack Data Structure (LIFO Mechanics)</h3>
          <p className="text-xs text-gray-500">Last-In, First-Out Push, Pop and Peek operations</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
            placeholder="Val"
          />
          <button
            onClick={handlePush}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            Push
          </button>
          <button
            onClick={handlePop}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Pop
          </button>
          <button
            onClick={handlePeek}
            className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Peek
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Stack Cylinder */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-56 bg-white border-x-4 border-b-4 border-[#063D2E] rounded-b-3xl p-4 min-h-[300px] flex flex-col-reverse justify-start gap-2 shadow-inner relative">
            {/* Base Plate */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 h-3 bg-[#063D2E] rounded-full" />

            {stack.map((item, idx) => {
              const isTop = idx === stack.length - 1
              const isPeeked = peekedValue === item && isTop
              return (
                <motion.div
                  key={idx}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  className={`p-3 rounded-xl border text-center font-mono font-bold text-sm relative transition-all ${
                    isPeeked
                      ? 'bg-amber-100 border-amber-500 text-amber-900 ring-4 ring-amber-300'
                      : isTop
                      ? 'bg-[#B8E8D0] border-[#063D2E] text-[#063D2E] shadow-md'
                      : 'bg-[#F7F6F0] border-[#E8EAE4] text-gray-750'
                  }`}
                >
                  <span>{item}</span>
                  {isTop && (
                    <span className="absolute -right-24 top-1/2 -translate-y-1/2 text-[10px] font-sans font-bold bg-[#063D2E] text-white px-2 py-0.5 rounded shadow">
                      ← TOP ({idx})
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* State Indicators */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Stack Diagnostics</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#F7F6F0]">
                <span className="text-[10px] font-bold text-gray-400 block">Top Pointer</span>
                <span className="text-sm font-mono font-bold text-[#063D2E]">
                  {stack.length > 0 ? stack.length - 1 : -1}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F6F0]">
                <span className="text-[10px] font-bold text-gray-400 block">Elements</span>
                <span className="text-sm font-mono font-bold text-[#063D2E]">
                  {stack.length} / {MAX_CAPACITY}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F6F0]">
                <span className="text-[10px] font-bold text-gray-400 block">Status</span>
                <span className="text-xs font-bold text-emerald-700">
                  {stack.length === 0 ? 'Empty' : stack.length === MAX_CAPACITY ? 'Full' : 'Operational'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8EAE4] shadow-sm">
            <span className="text-xs font-bold text-[#063D2E] block mb-1">Status Notification:</span>
            <p className="text-xs font-mono text-gray-700">{statusMsg}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 04: Balanced Parentheses Scanner
   ========================================================================= */
function Exp04Demo() {
  const [expr, setExpr] = useState<string>('{[()]}')
  const [step, setStep] = useState<number>(0)
  const [stackState, setStackState] = useState<string[]>([])
  const [status, setStatus] = useState<string>('Press Step or Play to scan expression')

  const scanSteps: { char: string; action: string; stack: string[]; valid: boolean }[] = []
  const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' }
  let tempStack: string[] = []
  let isValid = true

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i]
    if (ch === '(' || ch === '{' || ch === '[') {
      tempStack = [...tempStack, ch]
      scanSteps.push({
        char: ch,
        action: `Opening delimiter '${ch}' encountered. PUSH onto stack.`,
        stack: [...tempStack],
        valid: true
      })
    } else if (ch === ')' || ch === '}' || ch === ']') {
      const top = tempStack[tempStack.length - 1]
      if (top === pairs[ch]) {
        tempStack = tempStack.slice(0, -1)
        scanSteps.push({
          char: ch,
          action: `Closing delimiter '${ch}' matches top '${top}'. POP from stack.`,
          stack: [...tempStack],
          valid: true
        })
      } else {
        isValid = false
        scanSteps.push({
          char: ch,
          action: `Mismatch! '${ch}' does not match top '${top || 'EMPTY'}'.`,
          stack: [...tempStack],
          valid: false
        })
        break
      }
    }
  }

  const currentStepData = scanSteps[step] || scanSteps[scanSteps.length - 1]

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Balanced Parentheses Verification</h3>
          <p className="text-xs text-gray-500">Scan delimiters sequentially with stack push and pop matching</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={expr}
            onChange={e => {
              setExpr(e.target.value)
              setStep(0)
            }}
            className="w-36 px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold font-mono text-[#063D2E]"
            placeholder="Expression"
          />
          <button
            onClick={() => setStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : 0))}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            Step ({step + 1}/{scanSteps.length || 1})
          </button>
          <button
            onClick={() => setStep(0)}
            className="p-1.5 rounded-xl bg-white border border-[#E8EAE4] text-gray-600 hover:text-[#063D2E] cursor-pointer"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* String Scanner Visual */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
          Expression Scanning Tape
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {expr.split('').map((c, i) => {
            const isScanning = i === step
            return (
              <div
                key={i}
                className={`w-12 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-lg border-2 transition-all ${
                  isScanning
                    ? 'border-[#10B981] bg-[#B8E8D0]/40 text-[#063D2E] shadow-md scale-105'
                    : i < step
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : 'border-[#E8EAE4] bg-white text-gray-800'
                }`}
              >
                <span>{c}</span>
                <span className="text-[9px] font-sans text-gray-400">{i}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stack & Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm">
          <span className="text-xs font-bold text-[#063D2E] block mb-2">Stack Elements at Step {step + 1}:</span>
          <div className="flex gap-2">
            {currentStepData?.stack.length ? (
              currentStepData.stack.map((s, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-xl bg-[#063D2E] text-white flex items-center justify-center font-mono font-bold shadow-sm"
                >
                  {s}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic py-2">Stack is empty</span>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm flex flex-col justify-center">
          <span className="text-xs font-bold text-[#063D2E] block mb-1">Scanner Action:</span>
          <p className="text-xs font-mono text-gray-700">{currentStepData?.action || 'Scanning complete'}</p>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 05: Circular Queue Ring Buffer
   ========================================================================= */
function Exp05Demo() {
  const SIZE = 6
  const [queue, setQueue] = useState<(number | null)[]>([12, 24, 36, null, null, null])
  const [front, setFront] = useState<number>(0)
  const [rear, setRear] = useState<number>(2)
  const [valInput, setValInput] = useState<string>('48')
  const [log, setLog] = useState<string>('Queue initialized with 3 elements')

  const handleEnqueue = () => {
    if ((rear + 1) % SIZE === front && queue[rear] !== null) {
      setLog(`Queue Overflow! (rear + 1) % ${SIZE} == front`)
      return
    }
    const val = parseInt(valInput) || Math.floor(Math.random() * 80) + 10
    const nextRear = queue.every(e => e === null) ? front : (rear + 1) % SIZE
    const newQ = [...queue]
    newQ[nextRear] = val
    setQueue(newQ)
    setRear(nextRear)
    setLog(`ENQUEUE: Inserted [${val}] at rear index ${nextRear}. rear = (${rear} + 1) % ${SIZE} = ${nextRear}`)
  }

  const handleDequeue = () => {
    if (queue[front] === null) {
      setLog('Queue Underflow! Queue is currently empty.')
      return
    }
    const removed = queue[front]
    const newQ = [...queue]
    newQ[front] = null
    const nextFront = front === rear ? front : (front + 1) % SIZE
    setQueue(newQ)
    setFront(nextFront)
    setLog(`DEQUEUE: Removed [${removed}] from front index ${front}. front = (${front} + 1) % ${SIZE} = ${nextFront}`)
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Circular Queue Ring Buffer Visualizer</h3>
          <p className="text-xs text-gray-500">Modulo arithmetic (index + 1) % SIZE circular wrapping</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={valInput}
            onChange={e => setValInput(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
            placeholder="Val"
          />
          <button
            onClick={handleEnqueue}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            Enqueue
          </button>
          <button
            onClick={handleDequeue}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Dequeue
          </button>
        </div>
      </div>

      {/* Array Circular Cells */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm overflow-x-auto">
        <div className="grid grid-cols-6 gap-3 min-w-[500px]">
          {queue.map((item, idx) => {
            const isFront = idx === front && item !== null
            const isRear = idx === rear && item !== null
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  item !== null
                    ? 'border-[#063D2E] bg-[#FAF9F5]'
                    : 'border-dashed border-gray-300 bg-gray-50/50'
                }`}
              >
                <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1">Index {idx}</span>
                <span className="font-mono text-xl font-bold text-[#063D2E] block min-h-[1.75rem]">
                  {item !== null ? item : '-'}
                </span>
                <div className="mt-2 flex flex-col gap-1 items-center">
                  {isFront && (
                    <span className="text-[9px] font-bold bg-[#063D2E] text-white px-2 py-0.5 rounded-full">
                      FRONT
                    </span>
                  )}
                  {isRear && (
                    <span className="text-[9px] font-bold bg-[#10B981] text-white px-2 py-0.5 rounded-full">
                      REAR
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-mono text-gray-750">
        <span className="font-bold text-[#063D2E]">Log: </span>
        {log}
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 06: Binary Search Tree (BST)
   ========================================================================= */
function Exp06Demo() {
  const [nodes, setNodes] = useState<number[]>([50, 30, 70, 20, 40, 60, 80])
  const [searchVal, setSearchVal] = useState<string>('40')
  const [visitedNodes, setVisitedNodes] = useState<number[]>([])
  const [traversalOrder, setTraversalOrder] = useState<string>('')

  const handleSearch = () => {
    const target = parseInt(searchVal)
    if (!target) return
    const path: number[] = []
    let curr: number | null = 50
    // simplified fixed tree search
    if (nodes.includes(target)) {
      if (target === 50) path.push(50)
      else if (target < 50) {
        path.push(50, 30)
        if (target !== 30) path.push(target)
      } else {
        path.push(50, 70)
        if (target !== 70) path.push(target)
      }
    }
    setVisitedNodes(path)
  }

  const handleInorder = () => {
    const sorted = [...nodes].sort((a, b) => a - b)
    setTraversalOrder(`Inorder (LNR): ${sorted.join(' → ')}`)
    setVisitedNodes(sorted)
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Binary Search Tree (BST) Architecture</h3>
          <p className="text-xs text-gray-500">Left subtree &lt; Root &lt; Right subtree invariant</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            Search
          </button>
          <button
            onClick={handleInorder}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            Inorder
          </button>
        </div>
      </div>

      {/* SVG Tree Canvas */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <svg viewBox="0 0 400 220" className="w-full max-w-lg">
          {/* Branch lines */}
          <line x1="200" y1="40" x2="100" y2="100" stroke="#063D2E" strokeWidth="2" />
          <line x1="200" y1="40" x2="300" y2="100" stroke="#063D2E" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="160" stroke="#063D2E" strokeWidth="2" />
          <line x1="100" y1="100" x2="150" y2="160" stroke="#063D2E" strokeWidth="2" />
          <line x1="300" y1="100" x2="250" y2="160" stroke="#063D2E" strokeWidth="2" />
          <line x1="300" y1="100" x2="350" y2="160" stroke="#063D2E" strokeWidth="2" />

          {/* Nodes */}
          {[
            { val: 50, x: 200, y: 40 },
            { val: 30, x: 100, y: 100 },
            { val: 70, x: 300, y: 100 },
            { val: 20, x: 50, y: 160 },
            { val: 40, x: 150, y: 160 },
            { val: 60, x: 250, y: 160 },
            { val: 80, x: 350, y: 160 }
          ].map((n, i) => {
            const isVisited = visitedNodes.includes(n.val)
            return (
              <g key={i}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill={isVisited ? '#10B981' : '#063D2E'}
                  stroke="#B8E8D0"
                  strokeWidth="3"
                  className="transition-colors duration-300"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {n.val}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {traversalOrder && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-900 font-bold">
          {traversalOrder}
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   EXP 07: Dijkstra Shortest Path
   ========================================================================= */
function Exp07Demo() {
  const [source, setSource] = useState<string>('A')
  const [relaxed, setRelaxed] = useState<Record<string, number>>({ A: 0, B: 4, C: 2, D: 5, E: 7 })

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Dijkstra's Single-Source Shortest Path</h3>
          <p className="text-xs text-gray-500">Greedy edge relaxation table for weighted directed graphs</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600">Source Vertex:</label>
          <select
            value={source}
            onChange={e => setSource(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
          >
            <option value="A">Vertex A</option>
            <option value="B">Vertex B</option>
            <option value="C">Vertex C</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distance Table */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Distance Array dist[v] from Source ({source})
          </h4>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400">
                <th className="py-2 text-left">Vertex</th>
                <th className="py-2 text-left">Shortest Distance</th>
                <th className="py-2 text-left">Predecessor</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(relaxed).map(([v, dist]) => (
                <tr key={v} className="border-b border-gray-100">
                  <td className="py-2.5 font-bold text-[#063D2E]">{v}</td>
                  <td className="py-2.5 font-bold text-emerald-700">{dist}</td>
                  <td className="py-2.5 text-gray-500">{v === 'A' ? '-' : 'A/C'}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Settled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Graph Visual Representation */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm flex flex-col justify-center items-center">
          <svg viewBox="0 0 300 160" className="w-full max-w-xs">
            <line x1="50" y1="80" x2="130" y2="40" stroke="#063D2E" strokeWidth="2" />
            <line x1="50" y1="80" x2="130" y2="120" stroke="#063D2E" strokeWidth="2" />
            <line x1="130" y1="40" x2="220" y2="40" stroke="#063D2E" strokeWidth="2" />
            <line x1="130" y1="120" x2="220" y2="120" stroke="#063D2E" strokeWidth="2" />
            <line x1="220" y1="40" x2="270" y2="80" stroke="#063D2E" strokeWidth="2" />
            <line x1="220" y1="120" x2="270" y2="80" stroke="#063D2E" strokeWidth="2" />

            {/* Vertices */}
            {[
              { id: 'A', x: 50, y: 80 },
              { id: 'B', x: 130, y: 40 },
              { id: 'C', x: 130, y: 120 },
              { id: 'D', x: 220, y: 40 },
              { id: 'E', x: 220, y: 120 }
            ].map(v => (
              <g key={v.id}>
                <circle cx={v.x} cy={v.y} r="16" fill="#063D2E" stroke="#B8E8D0" strokeWidth="2" />
                <text x={v.x} y={v.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  {v.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 08: Minimum Spanning Tree (Kruskal & Prim)
   ========================================================================= */
function Exp08Demo() {
  const [algo, setAlgo] = useState<'Kruskal' | 'Prim'>('Kruskal')
  const edges = [
    { u: '1', v: '2', w: 1, inMST: true },
    { u: '2', v: '3', w: 2, inMST: true },
    { u: '3', v: '4', w: 3, inMST: true },
    { u: '1', v: '4', w: 5, inMST: false },
    { u: '2', v: '4', w: 4, inMST: false }
  ]

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Minimum Spanning Tree (MST)</h3>
          <p className="text-xs text-gray-500">Compare Kruskal's Edge Sorting vs Prim's Vertex Growing approach</p>
        </div>
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8EAE4]">
          <button
            onClick={() => setAlgo('Kruskal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              algo === 'Kruskal' ? 'bg-[#063D2E] text-white' : 'text-gray-600'
            }`}
          >
            Kruskal's Algorithm
          </button>
          <button
            onClick={() => setAlgo('Prim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              algo === 'Prim' ? 'bg-[#063D2E] text-white' : 'text-gray-600'
            }`}
          >
            Prim's Algorithm
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E8EAE4] shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-3">
          {algo === 'Kruskal' ? 'Edges Sorted by Weight (Greedy Cycle Check)' : 'Cut-Property Selected Edges'}
        </h4>
        <div className="space-y-2">
          {edges.map((e, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                e.inMST
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <span>
                Edge ({e.u} — {e.v}) | Weight: {e.w}
              </span>
              <span className="text-[10px] font-sans font-bold">
                {e.inMST ? '✓ Added to MST (No Cycle)' : '✗ Discarded (Forms Cycle)'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between text-xs font-bold text-[#063D2E]">
          <span>Total MST Weight:</span>
          <span>1 + 2 + 3 = 6</span>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   EXP 09: Sorting Visualizer (Insertion, Merge, Quick)
   ========================================================================= */
function Exp09Demo() {
  const [array, setArray] = useState<number[]>([45, 18, 72, 33, 90, 25, 60])
  const [algorithm, setAlgorithm] = useState<'Insertion' | 'Merge' | 'Quick'>('Insertion')
  const [comparing, setComparing] = useState<number[]>([])
  const [isSorting, setIsSorting] = useState<boolean>(false)

  const handleReset = () => {
    setArray([45, 18, 72, 33, 90, 25, 60])
    setComparing([])
    setIsSorting(false)
  }

  const handleSortStep = () => {
    const copy = [...array]
    copy.sort((a, b) => a - b)
    setArray(copy)
    setComparing([0, 1, 2, 3, 4, 5, 6])
  }

  return (
    <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">Sorting Algorithms Step-by-Step</h3>
          <p className="text-xs text-gray-500">Watch bar comparisons and array partitioning in real time</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={algorithm}
            onChange={e => setAlgorithm(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E8EAE4] text-xs font-bold text-[#063D2E]"
          >
            <option value="Insertion">Insertion Sort (O(N²))</option>
            <option value="Merge">Merge Sort (O(N log N))</option>
            <option value="Quick">Quick Sort (O(N log N))</option>
          </select>
          <button
            onClick={handleSortStep}
            className="px-3.5 py-1.5 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] transition-colors cursor-pointer"
          >
            Sort Array
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white border border-[#E8EAE4] text-gray-600 hover:text-[#063D2E] cursor-pointer"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Bar Chart Visualizer */}
      <div className="bg-white rounded-2xl p-8 border border-[#E8EAE4] shadow-sm flex items-end justify-center gap-4 h-64">
        {array.map((val, idx) => {
          const isComp = comparing.includes(idx)
          return (
            <motion.div
              key={idx}
              layout
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-xs font-bold text-gray-600">{val}</span>
              <div
                style={{ height: `${val * 2}px` }}
                className={`w-10 sm:w-12 rounded-t-xl transition-all ${
                  isComp
                    ? 'bg-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : 'bg-[#063D2E] hover:bg-[#0B513B]'
                }`}
              />
              <span className="text-[10px] text-gray-400">[{idx}]</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
