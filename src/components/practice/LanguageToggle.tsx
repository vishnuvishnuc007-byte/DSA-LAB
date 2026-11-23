import React from 'react'
import type { ExplanationLanguage } from '../../services/explanationService'

interface Props {
  language: ExplanationLanguage
  onChange: (lang: ExplanationLanguage) => void
  className?: string
}

export default function LanguageToggle({ language, onChange, className = '' }: Props) {
  return (
    <div className={`inline-flex items-center p-0.5 rounded-xl bg-[#F7F6F0] dark:bg-[#15241E] border border-[#E8EAE4] dark:border-[#233A30] shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => onChange('english')}
        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
          language === 'english'
            ? 'bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm'
            : 'text-slate-600 dark:text-slate-300 hover:text-[#063D2E] dark:hover:text-white'
        }`}
      >
        ENGLISH
      </button>

      <button
        type="button"
        onClick={() => onChange('tanglish')}
        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
          language === 'tanglish'
            ? 'bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm'
            : 'text-slate-600 dark:text-slate-300 hover:text-[#063D2E] dark:hover:text-white'
        }`}
      >
        TANGLISH
      </button>
    </div>
  )
}
