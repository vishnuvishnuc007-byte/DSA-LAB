import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Sun, Moon, Check } from 'lucide-react'
import { useTheme, type Theme } from '../contexts/ThemeContext'

interface ThemeMenuProps {
  className?: string
  align?: 'left' | 'right'
}

export default function ThemeMenu({ className = '', align = 'right' }: ThemeMenuProps) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
    setIsOpen(false)
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      {/* Vertical Three-Dot Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Theme options"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#063D2E]/40 dark:focus:ring-emerald-400/40 ${
          isOpen
            ? 'bg-[#063D2E] text-white shadow-sm dark:bg-[#10B981] dark:text-[#063D2E]'
            : 'text-[#063D2E]/80 dark:text-[#E8EAE4]/80 hover:text-[#063D2E] dark:hover:text-white bg-[#F7F6F0]/80 dark:bg-[#182620]/80 hover:bg-[#063D2E]/10 dark:hover:bg-[#233A30] border border-transparent hover:border-[#063D2E]/15 dark:hover:border-[#233A30]'
        }`}
        title="Switch Light / Dark Theme"
      >
        <MoreVertical size={16} className="transition-transform duration-200" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="theme-menu-button"
            className={`absolute ${
              align === 'right' ? 'right-0' : 'left-0'
            } mt-2 w-48 rounded-xl shadow-xl z-50 p-1.5 border transition-colors ${
              theme === 'dark'
                ? 'bg-[#15241E] border-[#233A30] text-[#E8EAE4] shadow-[0_10px_25px_rgba(0,0,0,0.5)]'
                : 'bg-[#FAF9F5] border-[#E8EAE4] text-[#123D2C] shadow-[0_10px_25px_rgba(6,61,46,0.12)]'
            }`}
          >
            {/* Theme Header Label */}
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-emerald-400/80 font-bold border-b border-[#E8EAE4]/70 dark:border-[#233A30] mb-1">
              Select Theme
            </div>

            {/* Option 1: Light Theme */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleSelect('light')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-[#063D2E] text-white shadow-sm'
                  : 'text-[#123D2C] hover:bg-[#063D2E]/10 hover:text-[#063D2E] dark:text-[#E8EAE4]/80 dark:hover:bg-[#1E3329] dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sun
                  size={14}
                  className={theme === 'light' ? 'text-[#A8E6CF]' : 'text-amber-500'}
                />
                <span>Light Theme</span>
              </div>
              {theme === 'light' && (
                <Check size={14} className="text-[#A8E6CF]" />
              )}
            </button>

            {/* Option 2: Dark Theme */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleSelect('dark')}
              className={`w-full flex items-center justify-between px-3 py-2 mt-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#10B981] text-[#063D2E] font-bold shadow-sm'
                  : 'text-[#123D2C] hover:bg-[#063D2E]/10 hover:text-[#063D2E] dark:text-[#E8EAE4]/80 dark:hover:bg-[#1E3329] dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Moon
                  size={14}
                  className={theme === 'dark' ? 'text-[#063D2E]' : 'text-slate-500 dark:text-emerald-400'}
                />
                <span>Dark Theme</span>
              </div>
              {theme === 'dark' && (
                <Check size={14} className="text-[#063D2E]" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
