import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  FileText,
  UserCheck,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import type { ExperimentDetail } from '../../data/experimentsData'
import type { EvaluationRecord } from './FacultyEvaluationSection'

interface Props {
  exp: ExperimentDetail
}

export default function MarksDisplaySection({ exp }: Props) {
  const [evaluation, setEvaluation] = useState<EvaluationRecord | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(`dsalab_evaluation_${exp.id}`)
    if (saved) {
      try {
        setEvaluation(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading evaluation', e)
      }
    } else {
      // Default initial mock if not yet explicitly saved by faculty
      setEvaluation({
        expId: exp.id,
        studentName: 'Vishnu Student',
        rollNo: '21UIT307',
        marks: {
          understanding: 18,
          logic: 19,
          code: 23,
          output: 14,
          viva: 18
        },
        total: 92,
        grade: 'O (Outstanding)',
        remarks:
          'Excellent understanding of underlying memory pointers and recursion mechanics. All automated test cases passed.',
        evaluatedAt: 'Nov 14, 2026',
        status: 'published'
      })
    }
  }, [exp.id])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">
            Official Academic Record
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#063D2E]">
            Performance & Marks Report Sheet
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Certified evaluation results for Experiment {exp.number}: {exp.shortTitle}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Printer size={15} />
          <span>Print Grade Sheet</span>
        </button>
      </div>

      {/* Main Score & Verification Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Score Ring / Badge */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#063D2E] to-[#0A5641] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#B8E8D0] text-[#063D2E] flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>Verified Grade</span>
              </span>
              <span className="text-xs text-white/70 font-mono">Roll: 21UIT307</span>
            </div>

            <div className="text-center py-4">
              <span className="text-xs uppercase tracking-wider text-[#B8E8D0] block mb-1">
                Aggregated Score
              </span>
              <div className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white mb-2">
                {evaluation?.total ?? 92}
                <span className="text-2xl font-sans text-white/60">/100</span>
              </div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-serif text-sm font-bold border border-white/20">
                Grade: {evaluation?.grade ?? 'O (Outstanding)'}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 text-xs text-white/80 flex items-center justify-between">
            <span>Evaluated On:</span>
            <span className="font-mono font-semibold">{evaluation?.evaluatedAt ?? 'Nov 14, 2026'}</span>
          </div>
        </div>

        {/* Evaluation Rubric Breakdown */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#063D2E] mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#0B513B]" />
              <span>Assessment Rubric Breakdown</span>
            </h3>

            <div className="space-y-3.5">
              {[
                {
                  label: '1. Conceptual & Theoretical Understanding',
                  score: evaluation?.marks.understanding ?? 18,
                  max: 20
                },
                {
                  label: '2. Algorithm & Flowchart Logic',
                  score: evaluation?.marks.logic ?? 19,
                  max: 20
                },
                {
                  label: '3. Code Implementation & Quality',
                  score: evaluation?.marks.code ?? 23,
                  max: 25
                },
                {
                  label: '4. Execution & Test Output Verification',
                  score: evaluation?.marks.output ?? 14,
                  max: 15
                },
                {
                  label: '5. Viva Voce Examination',
                  score: evaluation?.marks.viva ?? 18,
                  max: 20
                }
              ].map((item, idx) => {
                const pct = Math.round((item.score / item.max) * 100)
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-750">{item.label}</span>
                      <span className="font-mono text-[#063D2E] font-bold">
                        {item.score} / {item.max}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#FAF9F5] border border-[#E8EAE4] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0B513B] to-[#10B981]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8EAE4] flex items-center justify-between text-xs text-gray-500">
            <span>Course: N21UIT307 Data Structures Laboratory</span>
            <span className="text-[#063D2E] font-bold">Passed with Distinction</span>
          </div>
        </div>
      </div>

      {/* Faculty Feedback Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#063D2E]/10 text-[#063D2E] flex items-center justify-center">
            <UserCheck size={18} />
          </div>
          <div>
            <h4 className="font-serif text-base font-bold text-[#063D2E]">
              Evaluator Feedback & Academic Notes
            </h4>
            <p className="text-[11px] text-gray-500">Official comments by Laboratory In-Charge</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-750 bg-[#FAF9F5] p-4 rounded-2xl border border-[#E8EAE4] leading-relaxed italic">
          "{evaluation?.remarks || 'Good performance overall.'}"
        </p>
      </div>
    </div>
  )
}
