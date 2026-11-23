import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Sparkles,
  Play,
  SkipForward,
  Info,
  ArrowRight
} from 'lucide-react'
import type { ExperimentDetail, FlowchartNode } from '../../data/experimentsData'

interface Props {
  exp: ExperimentDetail
  onProceedToDemo?: () => void
}

export default function FlowchartViewerSection({ exp, onProceedToDemo }: Props) {
  const [zoom, setZoom] = useState(1)
  const [activeStep, setActiveStep] = useState<number>(-1)
  const nodes = exp.flowchartNodes

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.8))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.6))
  const handleResetZoom = () => {
    setZoom(1)
    setActiveStep(-1)
  }

  const handleNextStep = () => {
    setActiveStep(prev => (prev < nodes.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#063D2E]/10 text-[#063D2E]">
              Flow Architecture
            </span>
            <span className="text-xs text-gray-400">Standard ISO Flowchart Symbols</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#063D2E]">
            Algorithmic Flowchart — {exp.shortTitle}
          </h2>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Step Tracer */}
          <button
            onClick={handleNextStep}
            className="px-3.5 py-2 rounded-xl bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#0B513B] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            title="Trace through each step"
          >
            <Play size={13} className="fill-current" />
            <span>
              {activeStep === -1 ? 'Trace Flowchart' : `Step ${activeStep + 1} / ${nodes.length}`}
            </span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-[#F7F6F0] rounded-xl border border-[#E8EAE4] p-1 gap-1">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-white text-[#063D2E] transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono font-bold text-[#063D2E] px-2 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-white text-[#063D2E] transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-white text-gray-500 hover:text-[#063D2E] transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Flowchart Canvas */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#E8EAE4] p-6 sm:p-10 shadow-inner overflow-x-auto min-h-[520px] flex flex-col items-center justify-center relative">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#063D2E 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Legend */}
        <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E8EAE4] text-[11px] shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-full bg-[#063D2E]" />
            <span className="text-gray-600">Start / End</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded bg-emerald-600" />
            <span className="text-gray-600">Process</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rotate-45 bg-amber-500" />
            <span className="text-gray-600">Decision</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 skew-x-[-12deg] bg-blue-600" />
            <span className="text-gray-600">I/O</span>
          </div>
        </div>

        {/* Scaled Flowchart Content */}
        <div
          className="transition-transform duration-200 ease-out flex flex-col items-center space-y-4 py-8 z-10"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          {nodes.map((node, index) => {
            const isActive = activeStep === index
            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer transition-all duration-300 transform ${
                    isActive
                      ? 'scale-105 shadow-xl ring-4 ring-[#10B981] ring-offset-2'
                      : 'hover:scale-[1.02] shadow-sm'
                  }`}
                >
                  {/* Start / End Node */}
                  {node.type === 'start' || node.type === 'end' ? (
                    <div className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#063D2E] to-[#0A5641] text-white font-serif font-bold text-sm text-center border-2 border-[#B8E8D0] shadow-md min-w-[200px]">
                      {node.text}
                    </div>
                  ) : null}

                  {/* Process Node */}
                  {node.type === 'process' ? (
                    <div className="px-6 py-4 rounded-xl bg-white text-gray-800 font-medium text-xs sm:text-sm text-center border-2 border-[#125B45] shadow-sm max-w-md min-w-[220px]">
                      <span className="text-[10px] font-bold text-[#0B513B] block uppercase tracking-wider mb-1">
                        Process Block
                      </span>
                      {node.text}
                    </div>
                  ) : null}

                  {/* Decision Node */}
                  {node.type === 'decision' ? (
                    <div className="relative my-2">
                      <div className="w-48 h-28 sm:w-56 sm:h-32 bg-amber-50 border-2 border-amber-500 shadow-md flex items-center justify-center p-4 text-center transform rotate-45 rounded-2xl">
                        <div className="transform -rotate-45 text-xs sm:text-sm font-semibold text-amber-950 max-w-[130px] leading-tight">
                          <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wider mb-0.5">
                            Condition
                          </span>
                          {node.text}
                        </div>
                      </div>
                      {/* Decision branches indicators */}
                      {node.yesTarget && (
                        <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-300">
                          YES
                        </span>
                      )}
                      {node.noTarget && (
                        <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md border border-rose-300">
                          NO
                        </span>
                      )}
                    </div>
                  ) : null}

                  {/* Input / Output Node */}
                  {node.type === 'io' ? (
                    <div className="px-6 py-4 bg-sky-50 text-sky-950 font-medium text-xs sm:text-sm text-center border-2 border-sky-600 shadow-sm skew-x-[-10deg] rounded-lg max-w-md min-w-[220px]">
                      <div className="skew-x-[10deg]">
                        <span className="text-[10px] font-bold text-sky-700 block uppercase tracking-wider mb-1">
                          Input / Output
                        </span>
                        {node.text}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Arrow Connector to next node */}
                {index < nodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-1">
                    <div
                      className={`w-0.5 h-6 transition-colors ${
                        isActive ? 'bg-[#10B981]' : 'bg-[#063D2E]/40'
                      }`}
                    />
                    <div
                      className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] transition-colors ${
                        isActive ? 'border-t-[#10B981]' : 'border-t-[#063D2E]/70'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Step description banner if active */}
      {activeStep >= 0 && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#063D2E] text-white flex items-center justify-center text-xs font-bold">
              {activeStep + 1}
            </span>
            <p className="text-xs sm:text-sm text-[#063D2E] font-medium">
              <span className="font-bold">Active Step:</span> {nodes[activeStep]?.text}
            </p>
          </div>
          <button
            onClick={handleNextStep}
            className="text-xs font-semibold text-[#0B513B] hover:text-[#063D2E] flex items-center gap-1 cursor-pointer"
          >
            <span>Next Step</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Bottom CTA to Live Demo */}
      {onProceedToDemo && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onProceedToDemo}
            className="py-3.5 px-6 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Launch Interactive Live Demo</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}
