import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import type { ExperimentDetail, VivaQuestion } from '../../data/experimentsData'

interface Props {
  exp: ExperimentDetail
  onProceedToEvaluation?: () => void
}

export default function VivaSection({ exp, onProceedToEvaluation }: Props) {
  const questions: VivaQuestion[] = exp.vivaQuestions || []
  const mcqs = questions.filter(q => q.type === 'mcq')
  const shortQuestions = questions.filter(q => q.type === 'short')

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({})
  const [openConceptIndex, setOpenConceptIndex] = useState<number | null>(null)

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }))
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setRevealedExplanations({})
  }

  // Calculate score
  const score = mcqs.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc
  }, 0)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Score Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B513B]">
            Oral Assessment & Viva Voce
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#063D2E]">
            Viva Voce & Knowledge Check
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Test your conceptual depth before faculty oral evaluation
          </p>
        </div>

        {/* Dynamic Score Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FAF9F5] border border-[#E8EAE4] px-4 py-2 rounded-2xl flex items-center gap-3">
            <Award size={20} className="text-[#0B513B]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Quiz Score</span>
              <span className="font-mono text-sm font-bold text-[#063D2E]">
                {score} / {mcqs.length} Correct
              </span>
            </div>
          </div>
          <button
            onClick={handleResetQuiz}
            className="p-2 rounded-xl bg-white border border-[#E8EAE4] text-gray-500 hover:text-[#063D2E] transition-colors cursor-pointer"
            title="Reset Quiz"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* MCQs Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#0B513B]" />
          <h3 className="font-serif text-lg font-bold text-[#063D2E]">
            Part A — Multiple Choice Questions (MCQs)
          </h3>
        </div>

        <div className="space-y-4">
          {mcqs.map((q, qIdx) => {
            const userAnswer = selectedAnswers[q.id]
            const isAnswered = userAnswer !== undefined
            const isCorrect = isAnswered && userAnswer === q.correctAnswer

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#063D2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="font-semibold text-sm sm:text-base text-gray-800 leading-relaxed">
                    {q.question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pl-9">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx
                    const isOptionCorrect = optIdx === q.correctAnswer

                    let optStyle =
                      'bg-[#FAF9F5] border-[#E8EAE4] text-gray-700 hover:border-[#0B513B]'
                    if (isAnswered) {
                      if (isOptionCorrect) {
                        optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold'
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-semibold'
                      } else {
                        optStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isAnswered}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-black/5 text-gray-600 text-xs font-mono font-bold flex items-center justify-center">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 size={16} className="text-emerald-600" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle size={16} className="text-rose-600" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation Reveal */}
                {revealedExplanations[q.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-9 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed"
                  >
                    <span className="font-bold block mb-1">
                      {isCorrect ? '✓ Correct Answer!' : '✗ Explanation:'}
                    </span>
                    {q.explanation}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Concept Short Answer Questions for Viva */}
      {shortQuestions.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#E8EAE4]">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-[#0B513B]" />
            <h3 className="font-serif text-lg font-bold text-[#063D2E]">
              Part B — Conceptual Short Questions for External Examiners
            </h3>
          </div>

          <div className="space-y-3">
            {shortQuestions.map((q, idx) => {
              const isOpen = openConceptIndex === idx
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-[#E8EAE4] shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenConceptIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#063D2E]/10 text-[#063D2E] flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-gray-800">
                        {q.question}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-[#063D2E]" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-[#E8EAE4]/60 bg-[#FAF9F5]/40 text-xs sm:text-sm text-gray-700 leading-relaxed">
                      <span className="font-bold text-[#0B513B] block mb-1">Model Faculty Answer:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom CTA to Faculty Evaluation */}
      {onProceedToEvaluation && (
        <div className="flex justify-end pt-4">
          <button
            onClick={onProceedToEvaluation}
            className="py-3.5 px-6 rounded-2xl bg-[#063D2E] text-white hover:bg-[#0B513B] font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Proceed to Faculty Evaluation</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}
