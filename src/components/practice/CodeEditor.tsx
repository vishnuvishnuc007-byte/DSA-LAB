import React, { useRef, useState, useEffect } from 'react'
import Editor, { type OnMount, type Monaco } from '@monaco-editor/react'
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Trash2,
  Code2,
  Sparkles,
  AlignLeft,
  Terminal,
  Loader2
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Props {
  code: string
  onChange: (value: string) => void
  onRunCode: () => void
  onResetCode: () => void
  onClearCode?: () => void
  isRunning: boolean
  onLineSelectionChange: (selection: {
    startLine: number
    endLine: number
    codeSnippet: string
  }) => void
  className?: string
  errorHighlightLine?: number | null
}

export default function CodeEditor({
  code,
  onChange,
  onRunCode,
  onResetCode,
  onClearCode,
  isRunning,
  onLineSelectionChange,
  className = '',
  errorHighlightLine
}: Props) {
  const { isDark } = useTheme()
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeLine, setActiveLine] = useState<number>(1)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Set editor options
    editor.updateOptions({
      fontSize: 13,
      fontFamily: '"JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace',
      lineHeight: 22,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      renderLineHighlight: 'all',
      tabSize: 4,
      automaticLayout: true,
      wordWrap: 'on'
    })

    // Cursor / selection listener
    editor.onDidChangeCursorSelection((e) => {
      const selection = e.selection
      const startLine = selection.startLineNumber
      const endLine = selection.endLineNumber
      setActiveLine(startLine)

      const model = editor.getModel()
      if (!model) return

      let codeSnippet = ''
      if (startLine === endLine) {
        // Single line
        codeSnippet = model.getLineContent(startLine)
      } else {
        // Multi-line range
        codeSnippet = model.getValueInRange(selection)
      }

      onLineSelectionChange({
        startLine,
        endLine,
        codeSnippet
      })
    })

    // Initial line notification
    const model = editor.getModel()
    if (model) {
      const initialLineCode = model.getLineContent(1)
      onLineSelectionChange({
        startLine: 1,
        endLine: 1,
        codeSnippet: initialLineCode
      })
    }
  }

  // Highlight error line with Monaco decorations when compiler error occurs
  const decorationsRef = useRef<string[]>([])
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return

    if (errorHighlightLine) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [
        {
          range: new monacoRef.current.Range(errorHighlightLine, 1, errorHighlightLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-red-500/20 border-l-4 border-red-500',
            glyphMarginClassName: 'text-red-500 font-bold',
            hoverMessage: { value: `Compiler error reported on line ${errorHighlightLine}` }
          }
        }
      ])
      editorRef.current.revealLineInCenter(errorHighlightLine)
    } else {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [])
    }
  }, [errorHighlightLine])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    if (window.confirm('Clear all code in editor?')) {
      onChange('')
      if (onClearCode) onClearCode()
    }
  }

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run()
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen change via Esc
  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`h-full flex flex-col bg-white dark:bg-[#14221C] rounded-2xl border border-[#E8EAE4] dark:border-[#22382D] shadow-sm overflow-hidden ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Editor Header & Control Toolbar */}
      <div className="px-4 py-2.5 border-b border-[#E8EAE4] dark:border-[#22382D] bg-[#FAF9F5] dark:bg-[#162620] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Language indicator and active line badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#063D2E] text-white text-xs font-mono font-bold shadow-sm">
            <Code2 size={13} className="text-[#A8E6CF]" />
            <span>C</span>
            <span className="text-[10px] text-white/60 font-sans font-normal">GCC 9.2</span>
          </div>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
            Line: <span className="font-bold text-[#063D2E] dark:text-[#34D399]">{activeLine}</span>
          </span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={handleFormat}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#182822] hover:bg-[#F7F6F0] dark:hover:bg-[#20352D] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
            title="Auto-format code"
          >
            <AlignLeft size={13} />
            <span className="hidden md:inline">Format</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#182822] hover:bg-[#F7F6F0] dark:hover:bg-[#20352D] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
            title="Copy source code"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#182822] hover:bg-red-50 dark:hover:bg-red-950/30 border border-[#E8EAE4] dark:border-[#22382D] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-red-600 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
            title="Clear editor"
          >
            <Trash2 size={13} />
            <span className="hidden md:inline">Clear</span>
          </button>

          <button
            type="button"
            onClick={onResetCode}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#182822] hover:bg-[#F7F6F0] dark:hover:bg-[#20352D] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
            title="Reset code to starter boilerplate"
          >
            <RotateCcw size={13} />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#182822] hover:bg-[#F7F6F0] dark:hover:bg-[#20352D] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          {/* Primary Run Code Button */}
          <button
            type="button"
            onClick={onRunCode}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg bg-[#063D2E] hover:bg-[#0B513B] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white dark:text-[#063D2E] text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-1.5 ml-1"
          >
            {isRunning ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Canvas */}
      <div className="flex-1 w-full min-h-[350px] relative">
        <Editor
          height="100%"
          language="c"
          theme={isDark ? 'vs-dark' : 'light'}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          loading={
            <div className="h-full flex items-center justify-center gap-2 text-xs text-slate-400">
              <Loader2 size={16} className="animate-spin text-[#063D2E]" />
              <span>Loading Monaco Editor...</span>
            </div>
          }
        />
      </div>
    </div>
  )
}
