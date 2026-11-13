import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, User, Lock, Mail, LogIn, UserPlus, AlertCircle, CheckCircle, GraduationCap, Briefcase, ChevronRight } from 'lucide-react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const roleParam = searchParams.get('role')

  const { signIn, signUp } = useAuth()
  const [role, setRole] = useState<'student' | 'staff'>(roleParam === 'staff' ? 'staff' : 'student')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (roleParam === 'staff') setRole('staff')
    else if (roleParam === 'student') setRole('student')
  }, [roleParam])

  const setDemoCredentials = (selectedRole: 'student' | 'staff') => {
    if (selectedRole === 'student') {
      setEmail('student@dsalab.edu')
      setPassword('student123')
    } else {
      setEmail('staff@dsalab.edu')
      setPassword('faculty123')
    }
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message || 'Invalid email or password.')
        } else {
          // If staff, go to labs/syllabus; if student, go to labs
          navigate(role === 'staff' ? '/syllabus' : '/labs')
        }
      } else {
        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message || 'Registration failed.')
        } else {
          setSuccess('Account created! Please check your email to verify.')
        }
      }
    } catch {
      setError('An unexpected error occurred. Using local session mode.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-transition min-h-screen bg-[#F7F6F0] pt-20 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#063D2E] rounded-xl flex items-center justify-center shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8E6CF" strokeWidth="1.8">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                <circle cx="9" cy="8" r="1" fill="#A8E6CF" />
                <circle cx="15" cy="8" r="1" fill="#A8E6CF" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-[#063D2E]">
              DSA <span className="text-[#0B513B] font-display italic">LAB</span>
            </span>
          </Link>

          {/* Role Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#A8E6CF]/30 border border-[#063D2E]/20 text-[#063D2E] mb-3">
            {role === 'student' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
            <span>{role === 'student' ? 'Student Portal Access' : 'Faculty & Staff Portal'}</span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#063D2E] mb-1">
            {mode === 'login'
              ? role === 'student' ? 'Student Login' : 'Staff Login'
              : 'Create Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#171917]/65 max-w-sm mx-auto">
            {role === 'student'
              ? 'Access your syllabus, virtual experiments, coding practice and learning progress.'
              : 'Manage laboratory experiments, monitor student activities and access academic resources.'}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white rounded-2xl border border-[#E8EAE4] shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#F7F6F0] rounded-lg mb-5 border border-[#E8EAE4]">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); setSuccess('') }}
              className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold transition-all ${
                role === 'student'
                  ? 'bg-[#063D2E] text-white shadow-sm'
                  : 'text-[#063D2E]/75 hover:bg-white/60'
              }`}
            >
              <GraduationCap size={15} /> Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('staff'); setError(''); setSuccess('') }}
              className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold transition-all ${
                role === 'staff'
                  ? 'bg-[#063D2E] text-white shadow-sm'
                  : 'text-[#063D2E]/75 hover:bg-white/60'
              }`}
            >
              <Briefcase size={15} /> Staff / Faculty
            </button>
          </div>

          {/* Mode Toggle (Login vs Sign Up) */}
          <div className="flex bg-[#F7F6F0] rounded-lg p-1 mb-6 border border-[#E8EAE4]">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'login' ? 'bg-white shadow-sm text-[#063D2E]' : 'text-[#171917]/60'
              }`}
            >
              <LogIn size={14} /> Login
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'signup' ? 'bg-white shadow-sm text-[#063D2E]' : 'text-[#171917]/60'
              }`}
            >
              <UserPlus size={14} /> Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#171917]/70 mb-1.5 uppercase tracking-wide">
                {role === 'student' ? 'Student Email / Roll No.' : 'Faculty Email / Staff ID'}
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#171917]/35" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'student@dsalab.edu' : 'faculty@dsalab.edu'}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E8EAE4] rounded-lg text-sm focus:outline-none focus:border-[#063D2E] focus:ring-2 focus:ring-[#063D2E]/10 transition-all bg-[#F7F6F0]/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#171917]/70 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#171917]/35" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 border border-[#E8EAE4] rounded-lg text-sm focus:outline-none focus:border-[#063D2E] focus:ring-2 focus:ring-[#063D2E]/10 transition-all bg-[#F7F6F0]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#171917]/40 hover:text-[#063D2E]"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error / Success Notifications */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg"
                >
                  <AlertCircle size={15} className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg"
                >
                  <CheckCircle size={15} className="flex-shrink-0" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#063D2E] hover:bg-[#0B513B] text-white rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? `Login as ${role === 'student' ? 'Student' : 'Staff'}` : 'Register Account'}</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* One-Click Demo Credentials */}
          <div className="mt-5 pt-4 border-t border-[#E8EAE4] text-center">
            <span className="text-xs text-[#171917]/50 block mb-2">Fast Demonstration Access:</span>
            <button
              type="button"
              onClick={() => setDemoCredentials(role)}
              className="text-xs font-semibold text-[#063D2E] bg-[#A8E6CF]/25 hover:bg-[#A8E6CF]/40 border border-[#063D2E]/20 px-3 py-1.5 rounded-md transition-colors"
            >
              Fill Demo {role === 'student' ? 'Student' : 'Staff'} Credentials
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
