import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, ChevronRight, Home, BookOpen, FlaskConical, FolderGit2, Info } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ThemeMenu from './ThemeMenu'

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Syllabus', path: '/syllabus', icon: BookOpen },
  { label: 'About', path: '/about', icon: Info },
]

export default function Navbar() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  // Clean layout: Hide public navbar when inside internal dashboard or experiment learning workspace
  if (
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/student') ||
    location.pathname.startsWith('/experiment')
  ) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F0]/85 dark:bg-[#0B1310]/90 backdrop-blur-md border-b border-[#E8EAE4]/80 dark:border-[#233A30] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo with Circuit Brain icon & separator line */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Circuit Brain SVG icon */}
              <div className="w-9 h-9 rounded-xl bg-[#063D2E] dark:bg-[#15241E] dark:border dark:border-[#233A30] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8E6CF" strokeWidth="1.8">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                  <circle cx="9" cy="8" r="1" fill="#A8E6CF" />
                  <circle cx="15" cy="8" r="1" fill="#A8E6CF" />
                  <circle cx="8" cy="14" r="1" fill="#A8E6CF" />
                  <circle cx="16" cy="14" r="1" fill="#A8E6CF" />
                </svg>
              </div>

              <span className="font-serif text-xl font-bold tracking-tight text-[#063D2E] dark:text-[#E8EAE4]">
                DSA <span className="font-normal font-display italic text-[#0B513B] dark:text-[#34D399]">LAB</span>
              </span>
            </Link>

            {/* Vertical separator */}
            <div className="hidden sm:block h-5 w-[1px] bg-[#E8EAE4] dark:bg-[#233A30]" />
          </div>

          {/* Desktop Navigation Links - Rectangular items with subtle 6px rounded corners */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => {
              const active = isActive(link.path)

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 ${
                    active
                      ? 'bg-[#063D2E] text-white shadow-sm dark:bg-[#10B981] dark:text-[#063D2E]'
                      : 'text-[#063D2E]/80 dark:text-[#F3F4F6] bg-[#F7F6F0]/80 dark:bg-[#15241E] hover:bg-[#063D2E]/10 dark:hover:bg-[#1E362B] hover:text-[#063D2E] dark:hover:text-[#34D399] border border-transparent hover:border-[#063D2E]/15 dark:border-[#233A30]'
                  }`}
                >
                  <link.icon size={14} className={active ? 'text-[#A8E6CF] dark:text-[#063D2E]' : 'text-[#063D2E]/70 dark:text-[#34D399]'} />
                  <span>{link.label}</span>
                </Link>
              )
            })}

            {/* Vertical Three-Dot Theme Menu immediately next to About */}
            <ThemeMenu align="right" />
          </div>

          {/* User / Login Button - Rectangular with 6px rounded corners */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 text-xs font-semibold text-[#063D2E] dark:text-emerald-300 bg-[#A8E6CF]/25 dark:bg-[#1A3328] px-4 py-2 rounded-md border border-[#0B513B]/20 dark:border-[#233A30] hover:bg-[#A8E6CF]/40 transition-colors cursor-pointer"
                >
                  <User size={14} />
                  <span>{user.email?.split('@')[0]}</span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#15241E] rounded-md shadow-xl overflow-hidden border border-[#E8EAE4] dark:border-[#233A30] py-1"
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#063D2E] dark:text-emerald-400 bg-[#A8E6CF]/15 dark:bg-[#1E3329] hover:bg-[#A8E6CF]/30 transition-colors border-b border-[#E8EAE4] dark:border-[#233A30]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ChevronRight size={14} className="text-[#0B513B] dark:text-[#34D399]" /> Enter Virtual Lab
                      </Link>
                      <Link
                        to="/syllabus"
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#171917] dark:text-[#E8EAE4] hover:bg-[#F8F7F2] dark:hover:bg-[#1E3329] transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ChevronRight size={14} /> View Syllabus
                      </Link>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false) }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#063D2E] dark:bg-[#10B981] hover:bg-[#0B513B] dark:hover:bg-[#059669] text-white dark:text-[#063D2E] text-xs font-semibold px-5 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <User size={13} className="text-[#A8E6CF] dark:text-[#063D2E]" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu hamburger & Theme menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeMenu align="right" />
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 text-[#063D2E] dark:text-[#E8EAE4] rounded-lg hover:bg-[#063D2E]/5 dark:hover:bg-white/5 cursor-pointer"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-[#F7F6F0] dark:bg-[#0B1310] border-b border-[#E8EAE4] dark:border-[#233A30] px-4 py-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-[#123D2C] dark:bg-[#10B981] text-white dark:text-[#063D2E]'
                    : 'text-[#171917]/80 dark:text-[#E8EAE4]/80 hover:bg-[#123D2C]/5 dark:hover:bg-white/5'
                }`}
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-[#D9E1D9] dark:border-[#233A30]">
              {user ? (
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#063D2E] dark:text-emerald-400 font-semibold bg-[#A8E6CF]/25 dark:bg-[#1A3328] rounded-xl"
                  >
                    <ChevronRight size={16} /> Enter Virtual Lab
                  </Link>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false) }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 font-semibold"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#123D2C] dark:bg-[#10B981] text-white dark:text-[#063D2E] py-2.5 rounded-full text-sm font-semibold"
                >
                  <User size={16} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
