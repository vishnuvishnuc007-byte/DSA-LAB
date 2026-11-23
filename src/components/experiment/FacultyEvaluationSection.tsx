import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldAlert,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Send,
  Lock,
  UserCheck,
  Sparkles,
  FileText,
  ArrowRight
} from 'lucide-react'
import type { ExperimentDetail } from '../../data/experimentsData'

interface Props {
  exp: ExperimentDetail
  onProceedToMarks?: () => void
}

export interface EvaluationRecord {
  expId: string
  studentName: string
  rollNo: string
  marks: {
    understanding: number
    logic: number
    code: number
    output: number
    viva: number
  }
  total: number
  grade: string
  remarks: string
  evaluatedAt: string
  status: 'pending' | 'published'
}

export default function FacultyEvaluationSection({ exp, onProceedToMarks }: Props) {
  // Test role toggle for previewing student view vs faculty view
  const [role, setRole] = useState<'student' | 'faculty'>('student')

  // Rubric Marks State (defaults)
  const [marks, setMarks] = useState({
    understanding: 18,
    logic: 19,
    code: 23,
    output: 14,
    viva: 18
  })
  const [remarks, setRemarks] = useState(
    'Demonstrated robust understanding of pointers and recursive stack frames. Code is well formatted.'
  )
  const [isPublished, setIsPublished] = useState(false)

  // Load existing evaluation from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem(`dsalab_evaluation_${exp.id}`)
    if (saved) {
      try {
        const parsed: EvaluationRecord = JSON.parse(saved)
        setMarks(parsed.marks)
        setRemarks(parsed.remarks)
        setIsPublished(parsed.status === 'published')
      } catch (e) {
        console.error('Error loading evaluation', e)
      }
    }
  }, [exp.id])

  const totalMarks =
    marks.understanding + marks.logic + marks.code + marks.output + marks.viva

  const getGrade = (score: number) => {
    if (score >= 90) return 'O (Outstanding)'
    if (score >= 80) return 'A+ (Excellent)'
    if (score >= 70) return 'A (Very Good)'
    if (score >= 60) return 'B+ (Good)'
    return 'B (Satisfactory)'
  }

  const handlePublishMarks = () => {
    const record: EvaluationRecord = {
      expId: exp.id,
      studentName: 'Vishnu Student',
      rollNo: '21UIT307',
      marks,
      total: totalMarks,
      grade: getGrade(totalMarks),
      remarks,
      evaluatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'published'
    }
    localStorage.setItem(`dsalab_evaluation_${exp.id}`, JSON.stringify(record))
    setIsPublished(true)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Role Toggle Switcher for testing/demo */}
      <div className="bg-[#FAF9F5] rounded-3xl p-4 sm:p-5 border border-[#E8EAE4] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-[#0B513B]" />
          <div>
            <span className="text-xs font-bold text-[#063D2E] block">Role-Gated Portal View</span>
            <span className="text-[11px] text-gray-500">
              Current Active View: <b className="capitalize text-[#063D2E]">{role}</b>
            </span>
          </div>
        </div>

        <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8EAE4] shadow-sm">
          <button
            onClick={() => setRole('student')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === 'student' ? 'bg-[#063D2E] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setRole('faculty')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === 'faculty' ? 'bg-[#063D2E] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            Faculty Evaluator View
          </button>
        </div>
      </div>

      {role === 'student' ? (
        /* Student View — Locked for student self-grading */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EAE4] shadow-sm text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#063D2E]/10 text-[#063D2E] flex items-center justify-center mx-auto shadow-inner">
            <Lock size={30} />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
              {isPublished ? 'Grading Completed' : 'Awaiting Faculty Evaluation'}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#063D2E] mt-3">
              Faculty Grading Console (Protected)
            </h3>
            <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
              Lab marks and faculty feedback can only be evaluated and authorized by certified course
              instructors. Students cannot self-assign marks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] text-xs text-gray-600 text-left space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Student Submission:</span>
              <span className="font-bold text-emerald-800">✓ Uploaded & Recorded</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Assigned Evaluator:</span>
              <span className="font-bold text-[#063D2E]">Dr. S. K. Ramanathan (Lab In-Charge)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Evaluation Status:</span>
              <span className="font-bold text-[#063D2E]">
                {isPublished ? 'Marks Published' : 'In Review Queue'}
              </span>
            </div>
          </div>

          {isPublished && onProceedToMarks && (
            <button
              onClick={onProceedToMarks}
              className="py-3 px-6 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-xs inline-flex items-center gap-2 shadow cursor-pointer"
            >
              <span>View Published Marks</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      ) : (
        /* Faculty View — Full Evaluation Rubric & Publishing Form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E8EAE4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#063D2E] text-white flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">
                  Official Faculty Portal
                </span>
                <h3 className="font-serif text-xl font-bold text-[#063D2E]">
                  Academic Evaluation Rubric (Total: 100)
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 block font-mono">Candidate Roll: 21UIT307</span>
              <span className="text-sm font-bold text-[#063D2E]">Vishnu Student</span>
            </div>
          </div>

          {/* Rubric Sliders / Inputs */}
          <div className="space-y-4">
            {/* Criteria 1: Understanding */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#063D2E]">
                    1. Conceptual & Theoretical Understanding
                  </h4>
                  <p className="text-[11px] text-gray-500">Grasp of underlying DSA mechanics and theory</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#063D2E]">{marks.understanding} / 20</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={marks.understanding}
                onChange={e => setMarks({ ...marks, understanding: Number(e.target.value) })}
                className="w-full accent-[#063D2E] cursor-pointer"
              />
            </div>

            {/* Criteria 2: Logic */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#063D2E]">
                    2. Algorithm & Flowchart Logic
                  </h4>
                  <p className="text-[11px] text-gray-500">Clarity of step-by-step algorithmic formulation</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#063D2E]">{marks.logic} / 20</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={marks.logic}
                onChange={e => setMarks({ ...marks, logic: Number(e.target.value) })}
                className="w-full accent-[#063D2E] cursor-pointer"
              />
            </div>

            {/* Criteria 3: Code Implementation */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#063D2E]">
                    3. Code Implementation & Quality
                  </h4>
                  <p className="text-[11px] text-gray-500">Correctness of C syntax, pointers, memory freeing</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#063D2E]">{marks.code} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={marks.code}
                onChange={e => setMarks({ ...marks, code: Number(e.target.value) })}
                className="w-full accent-[#063D2E] cursor-pointer"
              />
            </div>

            {/* Criteria 4: Output Verification */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#063D2E]">
                    4. Execution & Test Output Verification
                  </h4>
                  <p className="text-[11px] text-gray-500">Pass rate on automated test cases and edge cases</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#063D2E]">{marks.output} / 15</span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={marks.output}
                onChange={e => setMarks({ ...marks, output: Number(e.target.value) })}
                className="w-full accent-[#063D2E] cursor-pointer"
              />
            </div>

            {/* Criteria 5: Viva Voce */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#063D2E]">
                    5. Viva Voce Performance
                  </h4>
                  <p className="text-[11px] text-gray-500">Verbal explanation during laboratory examination</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#063D2E]">{marks.viva} / 20</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={marks.viva}
                onChange={e => setMarks({ ...marks, viva: Number(e.target.value) })}
                className="w-full accent-[#063D2E] cursor-pointer"
              />
            </div>
          </div>

          {/* Remarks Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
              Evaluator Feedback & Academic Remarks:
            </label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              rows={3}
              className="w-full p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8EAE4] text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#063D2E]"
            />
          </div>

          {/* Total & Publish CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#063D2E] to-[#0A5641] text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B8E8D0] block">Aggregated Score</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold">{totalMarks} / 100</span>
                <span className="text-xs text-[#B8E8D0] font-semibold">({getGrade(totalMarks)})</span>
              </div>
            </div>

            <button
              onClick={handlePublishMarks}
              className="px-6 py-3 rounded-xl bg-[#B8E8D0] text-[#063D2E] hover:bg-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>{isPublished ? 'Update Published Marks' : 'Publish Marks to Student'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
