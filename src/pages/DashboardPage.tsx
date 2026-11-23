import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  FlaskConical,
  BookOpen,
  FolderGit2,
  Code2,
  BarChart3,
  CheckCircle2,
  User,
  LogOut,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Play,
  Clock,
  Award,
  Terminal,
  Settings,
  Search,
  Filter,
  Users,
  FileCheck2,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Info
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { topics, vizMap } from './LabsPage'
import { resources, typeColors } from './ResourcesPage'

type DashboardSection =
  | 'overview'
  | 'labs'
  | 'practice'
  | 'progress'
  | 'resources'
  | 'syllabus'
  | 'analytics'
  | 'manage-labs'
  | 'submissions'
  | 'batch'
  | 'profile'
  | 'about'

// Mock student submissions for faculty evaluation
const initialSubmissions = [
  {
    id: 'sub-1',
    studentName: 'Aarav Sharma',
    rollNo: '21UIT014',
    batch: 'Batch A',
    topic: 'Linked List Implementation of List ADT',
    submittedAt: 'Today, 11:20 AM',
    status: 'Pending',
    score: null as number | null,
    code: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insertFront(struct Node** head, int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val;\n    n->next = *head;\n    *head = n;\n}`
  },
  {
    id: 'sub-2',
    studentName: 'Priya Sundaram',
    rollNo: '21UIT042',
    batch: 'Batch A',
    topic: 'Balanced Parentheses using Stack',
    submittedAt: 'Yesterday, 4:15 PM',
    status: 'Graded',
    score: 95,
    code: `#include <stdio.h>\n#define MAX 100\nchar stack[MAX];\nint top = -1;\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }`
  },
  {
    id: 'sub-3',
    studentName: 'Karthik Raja',
    rollNo: '21UIT029',
    batch: 'Batch B',
    topic: 'Binary Search Tree Operations',
    submittedAt: '2 days ago',
    status: 'Graded',
    score: 88,
    code: `// BST Insertion and Inorder Traversal in C`
  },
  {
    id: 'sub-4',
    studentName: 'Divya Nair',
    rollNo: '21UIT019',
    batch: 'Batch B',
    topic: 'Queue ADT using Circular Array',
    submittedAt: 'Today, 09:40 AM',
    status: 'Pending',
    score: null as number | null,
    code: `#include <stdio.h>\n#define MAX 5\nint q[MAX], front = -1, rear = -1;`
  }
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, signOut, completedTopics, markTopicComplete } = useAuth()

  // Role state: student or staff
  const [role, setRole] = useState<'student' | 'staff'>(() => {
    try {
      const saved = localStorage.getItem('dsalab_user_role')
      if (saved === 'staff' || saved === 'student') return saved
    } catch {}
    if (user?.email?.includes('staff')) return 'staff'
    return 'student'
  })

  // Active navigation section
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview')

  // Forward student users directly to the dedicated Student Dashboard
  useEffect(() => {
    if (role === 'student') {
      navigate('/student/dashboard', { replace: true })
    }
  }, [role, navigate])

  // Lab experiments state
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0)
  const [labTab, setLabTab] = useState<'concept' | 'code' | 'practice'>('concept')

  // Coding practice playground state
  const [practiceCode, setPracticeCode] = useState(
    `#include <stdio.h>\n\n// Problem: Reverse an Array in place\nvoid reverse(int arr[], int n) {\n    int start = 0, end = n - 1;\n    while (start < end) {\n        int temp = arr[start];\n        arr[start] = arr[end];\n        arr[end] = temp;\n        start++;\n        end--;\n    }\n}\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = 5;\n    reverse(arr, n);\n    for(int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}`
  )
  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isRunningCode, setIsRunningCode] = useState(false)

  // Faculty submissions state
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [evaluatingSub, setEvaluatingSub] = useState<(typeof initialSubmissions)[0] | null>(null)
  const [gradeInput, setGradeInput] = useState<number>(90)

  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Handle role switch
  const handleRoleToggle = (newRole: 'student' | 'staff') => {
    setRole(newRole)
    try {
      localStorage.setItem('dsalab_user_role', newRole)
    } catch {}
    setActiveSection('overview')
  }

  const currentTopic = topics[selectedTopicIndex] || topics[0]
  const VizComponent = vizMap[currentTopic.visualization]

  // Simulate C code runner
  const handleRunCode = () => {
    setIsRunningCode(true)
    setCodeOutput('Compiling with GCC 11.2 (Ubuntu)...')
    setTimeout(() => {
      setIsRunningCode(false)
      setCodeOutput('Program executed successfully in 0.04s.\nOutput: 50 40 30 20 10\n[All test cases passed ✓]')
    }, 800)
  }

  // Handle grade submission
  const handleSaveGrade = () => {
    if (!evaluatingSub) return
    setSubmissions(prev =>
      prev.map(s =>
        s.id === evaluatingSub.id
          ? { ...s, score: gradeInput, status: 'Graded' }
          : s
      )
    )
    setEvaluatingSub(null)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#171917] flex flex-col md:flex-row">
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION
          ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#063D2E] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl md:shadow-none border-r border-[#04241B]`}
      >
        <div>
          {/* Logo & Close button on Mobile */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B513B] flex items-center justify-center border border-[#A8E6CF]/30 shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8E6CF" strokeWidth="1.8">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                  <circle cx="9" cy="8" r="1" fill="#A8E6CF" />
                  <circle cx="15" cy="8" r="1" fill="#A8E6CF" />
                </svg>
              </div>
              <div>
                <div className="font-serif font-black text-lg tracking-wider">
                  DSA <span className="text-[#A8E6CF] font-display italic">LAB</span>
                </div>
                <span className="text-[10px] text-[#A8E6CF]/70 uppercase tracking-widest block font-sans">
                  Virtual Workspace
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white/70 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile & Role Switcher Card */}
          <div className="p-4 mx-3 my-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8E6CF] text-[#063D2E] flex items-center justify-center font-bold text-sm shadow-sm">
                {user?.email ? user.email.slice(0, 2).toUpperCase() : role === 'student' ? 'ST' : 'FA'}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-white truncate block">
                  {user?.email?.split('@')[0] || (role === 'student' ? 'Student Portal' : 'Faculty Member')}
                </span>
                <span className="text-[10px] text-white/50 truncate block">
                  {role === 'student' ? 'B.Tech IT • 2nd Year' : 'Dept. of IT • Lab In-charge'}
                </span>
              </div>
            </div>

            {/* Role Switcher Toggle Pill */}
            <div className="grid grid-cols-2 gap-1 bg-[#04241B] p-1 rounded-xl border border-white/10 text-[11px] font-semibold">
              <button
                onClick={() => handleRoleToggle('student')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'student'
                    ? 'bg-[#0B513B] text-[#A8E6CF] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <GraduationCap size={13} />
                <span>Student</span>
              </button>
              <button
                onClick={() => handleRoleToggle('staff')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'staff'
                    ? 'bg-[#0B513B] text-[#A8E6CF] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Briefcase size={13} />
                <span>Faculty</span>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1">
            <div className="text-[10px] font-bold tracking-widest text-[#A8E6CF]/60 uppercase px-3 py-1 mt-2">
              Core Navigation
            </div>

            {/* Overview / Dashboard */}
            <button
              onClick={() => { setActiveSection('overview'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'overview'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Home size={16} />
              <span>Dashboard Overview</span>
            </button>

            {/* Virtual Experiments / Labs */}
            <button
              onClick={() => { setActiveSection('labs'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'labs'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FlaskConical size={16} />
              <span>Virtual Experiments (9)</span>
            </button>

            {/* Coding Practice */}
            <button
              onClick={() => { setActiveSection('practice'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'practice'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Code2 size={16} />
              <span>Coding Practice & C IDE</span>
            </button>

            {/* Role-Specific Items */}
            {role === 'student' ? (
              <>
                <div className="text-[10px] font-bold tracking-widest text-[#A8E6CF]/60 uppercase px-3 py-1 pt-4">
                  Student Learning
                </div>

                <button
                  onClick={() => { setActiveSection('progress'); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'progress'
                      ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BarChart3 size={16} />
                  <span>Learning Progress & Badges</span>
                </button>
              </>
            ) : (
              <>
                <div className="text-[10px] font-bold tracking-widest text-[#A8E6CF]/60 uppercase px-3 py-1 pt-4">
                  Faculty Controls
                </div>

                <button
                  onClick={() => { setActiveSection('analytics'); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'analytics'
                      ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BarChart3 size={16} />
                  <span>Student Analytics & Heatmap</span>
                </button>

                <button
                  onClick={() => { setActiveSection('submissions'); setSidebarOpen(false) }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'submissions'
                      ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileCheck2 size={16} />
                    <span>Submissions & Rubrics</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#A8E6CF]/25 text-[#A8E6CF] border border-[#A8E6CF]/40">
                    2 Pending
                  </span>
                </button>

                <button
                  onClick={() => { setActiveSection('batch'); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'batch'
                      ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users size={16} />
                  <span>Classroom & Batches</span>
                </button>

                <button
                  onClick={() => { setActiveSection('manage-labs'); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'manage-labs'
                      ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Settings size={16} />
                  <span>Manage Lab Units</span>
                </button>
              </>
            )}

            <div className="text-[10px] font-bold tracking-widest text-[#A8E6CF]/60 uppercase px-3 py-1 pt-4">
              Academic Content
            </div>

            {/* Syllabus */}
            <button
              onClick={() => { setActiveSection('syllabus'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'syllabus'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              <span>Syllabus & Modules</span>
            </button>

            {/* Resources */}
            <button
              onClick={() => { setActiveSection('resources'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'resources'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FolderGit2 size={16} />
              <span>Academic Resources</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => { setActiveSection('profile'); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'profile'
                  ? 'bg-[#A8E6CF] text-[#063D2E] shadow-md font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <User size={16} />
              <span>Profile & Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions: Return to Public Site & Sign Out */}
        <div className="p-4 border-t border-white/10 space-y-1.5">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronRight size={14} className="rotate-180 text-[#A8E6CF]" />
            <span>Return to Public Homepage</span>
          </Link>

          <button
            onClick={async () => {
              await signOut()
              navigate('/')
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN DASHBOARD CONTENT AREA
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navigation Bar inside Dashboard */}
        <header className="sticky top-0 z-40 bg-[#F7F6F0]/95 backdrop-blur-md border-b border-[#E8EAE4] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-[#063D2E] p-2 hover:bg-[#063D2E]/10 rounded-lg"
            >
              <Menu size={22} />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#063D2E]/70 font-medium">
                <span>DSA Virtual Lab</span>
                <span>/</span>
                <span className="capitalize font-semibold text-[#063D2E]">
                  {activeSection.replace('-', ' ')}
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-[#063D2E] leading-tight">
                {role === 'student' ? 'Student Learning Workspace' : 'Faculty Laboratory Administration'}
              </h1>
            </div>
          </div>

          {/* Academic Semester Tag & Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A8E6CF]/25 border border-[#063D2E]/15 text-[11px] font-semibold text-[#063D2E]">
              <Calendar size={13} className="text-[#0B513B]" />
              <span>N21UIT307 • Sem IV • 2026</span>
            </div>

            <Link
              to="/"
              className="text-xs font-semibold text-[#063D2E] hover:text-[#0B513B] bg-white border border-[#E8EAE4] hover:border-[#063D2E]/30 px-3.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Public Site</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">

          {/* =====================================================================
              SECTION 1: DASHBOARD OVERVIEW
              ===================================================================== */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-[#063D2E] via-[#0B513B] to-[#063D2E] rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden"
              >
                <div className="relative z-10 max-w-2xl">
                  <span className="text-[11px] uppercase tracking-widest text-[#A8E6CF] font-bold block mb-2">
                    {role === 'student' ? 'Interactive Laboratory' : 'Academic Control Center'}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight mb-3">
                    {role === 'student'
                      ? 'Ready to master your next algorithm?'
                      : 'Welcome back to Faculty Portal.'}
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
                    {role === 'student'
                      ? `You have completed ${completedTopics.length} of ${topics.length} experiments. Resume your study with interactive trace visualizations, C implementations, and complexity analysis.`
                      : '124 students enrolled across Batch A and Batch B. 2 new laboratory submissions require evaluation against N21UIT307 rubrics.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveSection('labs')}
                      className="px-6 py-2.5 rounded-full bg-[#A8E6CF] hover:bg-white text-[#063D2E] font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>{role === 'student' ? 'Continue Experiments' : 'Review All Labs'}</span>
                      <ChevronRight size={15} />
                    </button>

                    {role === 'student' ? (
                      <button
                        onClick={() => setActiveSection('practice')}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                      >
                        Open Coding Practice
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveSection('submissions')}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                      >
                        Evaluate Submissions
                      </button>
                    )}
                  </div>
                </div>

                {/* Decorative background ambient glow */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 bg-[#A8E6CF]/20 blur-3xl rounded-full" />
              </motion.div>

              {/* Statistics & KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {role === 'student' ? (
                  <>
                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Completed Labs</span>
                        <div className="w-8 h-8 rounded-lg bg-[#063D2E]/10 text-[#063D2E] flex items-center justify-center font-bold">
                          <CheckCircle2 size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">
                        {completedTopics.length} / {topics.length}
                      </div>
                      <span className="text-[11px] text-green-600 font-medium mt-1 block">
                        {Math.round((completedTopics.length / topics.length) * 100)}% Course Completed
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Coding Practice</span>
                        <div className="w-8 h-8 rounded-lg bg-[#0B513B]/10 text-[#0B513B] flex items-center justify-center font-bold">
                          <Code2 size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">18 Solved</div>
                      <span className="text-[11px] text-[#063D2E]/70 font-medium mt-1 block">
                        C Algorithm Challenges
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Internal Marks</span>
                        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-700 flex items-center justify-center font-bold">
                          <Award size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">56 / 60</div>
                      <span className="text-[11px] text-green-600 font-medium mt-1 block">
                        Grade Point: 9.3 (O Grade)
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Active Batch</span>
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold">
                          <Users size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">Batch A</div>
                      <span className="text-[11px] text-[#063D2E]/70 font-medium mt-1 block">
                        Every Mon & Wed • 10:00 AM
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Enrolled Students</span>
                        <div className="w-8 h-8 rounded-lg bg-[#063D2E]/10 text-[#063D2E] flex items-center justify-center font-bold">
                          <Users size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">124</div>
                      <span className="text-[11px] text-[#063D2E]/70 font-medium mt-1 block">
                        62 Batch A • 62 Batch B
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Average Completion</span>
                        <div className="w-8 h-8 rounded-lg bg-[#0B513B]/10 text-[#0B513B] flex items-center justify-center font-bold">
                          <BarChart3 size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">78.4%</div>
                      <span className="text-[11px] text-green-600 font-medium mt-1 block">
                        +5.2% from previous week
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Pending Reviews</span>
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-700 flex items-center justify-center font-bold">
                          <FileCheck2 size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">2</div>
                      <span className="text-[11px] text-orange-600 font-medium mt-1 block">
                        Requires Rubric Grading
                      </span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-[#171917]/60 font-medium">Continuous Eval.</span>
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-700 flex items-center justify-center font-bold">
                          <Award size={16} />
                        </div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-[#063D2E]">60% Weight</div>
                      <span className="text-[11px] text-[#063D2E]/70 font-medium mt-1 block">
                        40% End Semester Exam
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Experiment Launch Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#063D2E]">
                    Virtual Experiments & Laboratory Topics
                  </h3>
                  <button
                    onClick={() => setActiveSection('labs')}
                    className="text-xs font-semibold text-[#0B513B] hover:text-[#063D2E] flex items-center gap-1"
                  >
                    <span>View all 9 modules</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.slice(0, 6).map((topic, index) => {
                    const isDone = completedTopics.includes(topic.id)
                    return (
                      <div
                        key={topic.id}
                        onClick={() => {
                          setSelectedTopicIndex(index)
                          setActiveSection('labs')
                        }}
                        className="bg-white p-5 rounded-2xl border border-[#E8EAE4] hover:border-[#063D2E]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{topic.icon}</span>
                            {isDone ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                                Completed ✓
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-[#171917]/50">
                                Unit {Math.floor(index / 2) + 1}
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-[#063D2E] group-hover:text-[#0B513B] transition-colors">
                            {topic.title}
                          </h4>
                          <p className="text-xs text-[#171917]/70 line-clamp-2 mt-1">
                            {topic.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E8EAE4] flex items-center justify-between text-xs font-semibold text-[#063D2E]">
                          <span>Launch Interactive Lab</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 2: VIRTUAL EXPERIMENTS & VISUALIZERS (LABS)
              ===================================================================== */}
          {activeSection === 'labs' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                    Interactive Laboratory Experiments
                  </h2>
                  <p className="text-xs sm:text-sm text-[#171917]/70">
                    Step-by-step visual trace execution, dynamic C source code, and practical exercises.
                  </p>
                </div>

                {/* Progress pill */}
                <div className="px-4 py-2 rounded-xl bg-white border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center gap-2 self-start">
                  <CheckCircle2 size={16} className="text-[#0B513B]" />
                  <span>
                    {completedTopics.length} of {topics.length} Experiments Completed
                  </span>
                </div>
              </div>

              {/* Lab Workspace Layout */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Topic Selector Sidebar (Col 1 to 4) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E8EAE4] shadow-sm overflow-hidden">
                  <div className="p-4 bg-[#063D2E]/5 border-b border-[#E8EAE4]">
                    <span className="font-serif font-bold text-sm text-[#063D2E] block">
                      Select Laboratory Experiment
                    </span>
                    <span className="text-[11px] text-[#171917]/60 block mt-0.5">
                      Syllabus Course: N21UIT307 Data Structures Lab
                    </span>
                  </div>

                  <div className="divide-y divide-[#E8EAE4] max-h-[600px] overflow-y-auto">
                    {topics.map((t, i) => {
                      const active = selectedTopicIndex === i
                      const done = completedTopics.includes(t.id)

                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTopicIndex(i)}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors text-xs font-semibold ${
                            active
                              ? 'bg-[#A8E6CF]/30 text-[#063D2E] border-l-4 border-l-[#063D2E]'
                              : 'hover:bg-[#F7F6F0] text-[#171917]/80'
                          }`}
                        >
                          <span className="text-lg flex-shrink-0">{t.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className="block truncate font-serif font-bold text-sm">
                              {i + 1}. {t.title}
                            </span>
                            <span className="block text-[10px] text-[#171917]/55 truncate">
                              Access: {t.timeComplexity.access} • Search: {t.timeComplexity.search}
                            </span>
                          </div>
                          {done && (
                            <CheckCircle2 size={16} className="text-[#0B513B] flex-shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Experiment Content & Visualizer (Col 5 to 12) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Topic Title & Mark Complete Card */}
                  <div className="bg-white rounded-2xl border border-[#E8EAE4] p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{currentTopic.icon}</span>
                          <h3 className="font-serif text-2xl font-bold text-[#063D2E]">
                            {currentTopic.title}
                          </h3>
                          {completedTopics.includes(currentTopic.id) && (
                            <span className="bg-[#A8E6CF]/40 text-[#063D2E] text-xs px-2.5 py-0.5 rounded-full font-bold">
                              Completed ✓
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#171917]/75 leading-relaxed font-sans">
                          {currentTopic.description}
                        </p>
                      </div>

                      <button
                        onClick={() => markTopicComplete(currentTopic.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                          completedTopics.includes(currentTopic.id)
                            ? 'bg-[#E8EAE4] text-[#171917]/60'
                            : 'bg-[#063D2E] hover:bg-[#0B513B] text-white'
                        }`}
                      >
                        {completedTopics.includes(currentTopic.id) ? 'Completed ✓' : 'Mark as Done'}
                      </button>
                    </div>

                    {/* Complexity Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#E8EAE4]">
                      {Object.entries(currentTopic.timeComplexity).map(([op, val]) => (
                        <span key={op} className="text-[11px] bg-[#F7F6F0] border border-[#E8EAE4] px-2.5 py-1 rounded-lg">
                          <span className="text-[#0B513B] font-bold capitalize">{op}:</span> {val}
                        </span>
                      ))}
                      <span className="text-[11px] bg-[#F7F6F0] border border-[#E8EAE4] px-2.5 py-1 rounded-lg">
                        <span className="text-[#0B513B] font-bold">Space:</span> {currentTopic.spaceComplexity}
                      </span>
                    </div>
                  </div>

                  {/* Tabs: Visualizer / C Code / Practice Problems */}
                  <div className="flex bg-white rounded-xl border border-[#E8EAE4] p-1 shadow-sm">
                    <button
                      onClick={() => setLabTab('concept')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        labTab === 'concept'
                          ? 'bg-[#063D2E] text-white shadow-sm'
                          : 'text-[#171917]/70 hover:text-[#063D2E]'
                      }`}
                    >
                      Interactive Visualization
                    </button>
                    <button
                      onClick={() => setLabTab('code')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        labTab === 'code'
                          ? 'bg-[#063D2E] text-white shadow-sm'
                          : 'text-[#171917]/70 hover:text-[#063D2E]'
                      }`}
                    >
                      C Implementation
                    </button>
                    <button
                      onClick={() => setLabTab('practice')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        labTab === 'practice'
                          ? 'bg-[#063D2E] text-white shadow-sm'
                          : 'text-[#171917]/70 hover:text-[#063D2E]'
                      }`}
                    >
                      Practice Questions
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div className="bg-white rounded-2xl border border-[#E8EAE4] p-6 shadow-sm">
                    {labTab === 'concept' && (
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#063D2E] mb-4">
                          Live Interactive Demonstration
                        </h4>
                        {VizComponent && <VizComponent />}
                      </div>
                    )}

                    {labTab === 'code' && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-serif text-lg font-bold text-[#063D2E]">
                            Standard C Code
                          </h4>
                          <button
                            onClick={() => navigator.clipboard.writeText(currentTopic.code)}
                            className="text-xs font-semibold px-3 py-1 rounded-md bg-[#F7F6F0] border border-[#E8EAE4] text-[#063D2E] hover:bg-[#A8E6CF]/30 transition-colors"
                          >
                            Copy Code
                          </button>
                        </div>
                        <pre className="code-block overflow-x-auto text-xs bg-[#0F261C] text-[#A8E6CF] p-4 rounded-xl font-mono leading-relaxed max-h-[420px]">
                          <code>{currentTopic.code}</code>
                        </pre>
                      </div>
                    )}

                    {labTab === 'practice' && (
                      <div className="space-y-3">
                        <h4 className="font-serif text-lg font-bold text-[#063D2E] mb-3">
                          Practical Lab Exercises
                        </h4>
                        {currentTopic.problems.map((problem, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4] flex items-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-[#063D2E] text-[#A8E6CF] text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {pIdx + 1}
                            </span>
                            <div className="text-xs text-[#171917]/85 font-medium leading-relaxed">
                              {problem}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 3: CODING PRACTICE & C IDE PLAYGROUND
              ===================================================================== */}
          {activeSection === 'practice' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                    Coding Practice & Virtual C Environment
                  </h2>
                  <p className="text-xs sm:text-sm text-[#171917]/70">
                    Write, compile and test C algorithms against automated laboratory test cases.
                  </p>
                </div>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="px-6 py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start cursor-pointer"
                >
                  <Play size={14} className="text-[#A8E6CF]" />
                  <span>{isRunningCode ? 'Compiling...' : 'Run & Execute C Code'}</span>
                </button>
              </div>

              {/* Editor Workspace */}
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Code Editor (Col 1 to 8) */}
                <div className="lg:col-span-8 bg-[#0C120E] rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col">
                  <div className="bg-[#070B09] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#A8E6CF] font-mono">
                      <Terminal size={14} />
                      <span>solution.c</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">GCC 11.2 • C11 Standard</span>
                  </div>

                  <textarea
                    value={practiceCode}
                    onChange={(e) => setPracticeCode(e.target.value)}
                    rows={18}
                    className="w-full bg-transparent text-[#A8E6CF] font-mono text-xs sm:text-sm p-4 outline-none resize-none leading-relaxed"
                    spellCheck={false}
                  />

                  {/* Terminal Console Output */}
                  <div className="bg-[#050806] border-t border-white/10 p-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 block mb-1">
                      Console Output:
                    </span>
                    <pre className="font-mono text-xs text-white/80 whitespace-pre-wrap min-h-[60px]">
                      {codeOutput || '// Click "Run & Execute C Code" to test and compile program.'}
                    </pre>
                  </div>
                </div>

                {/* Problem Statement & Test Cases (Col 9 to 12) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                    <span className="text-[10px] font-bold text-[#0B513B] uppercase tracking-wider block mb-1">
                      Active Challenge #04
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#063D2E] mb-2">
                      Reverse an Array in-Place
                    </h3>
                    <p className="text-xs text-[#171917]/70 leading-relaxed">
                      Given an array of integers, write a C function to reverse the array in place with O(n) time complexity and O(1) auxiliary space complexity.
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#E8EAE4] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#171917]/60">Expected Time:</span>
                        <span className="font-mono font-bold text-[#063D2E]">O(n)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#171917]/60">Expected Space:</span>
                        <span className="font-mono font-bold text-[#063D2E]">O(1)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#171917]/60">Lab Weight:</span>
                        <span className="font-bold text-[#063D2E]">10 Marks</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm">
                    <h4 className="font-serif text-sm font-bold text-[#063D2E] mb-3">
                      Automated Test Cases
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#F7F6F0] flex items-center justify-between">
                        <span>Test Case 1: [10, 20, 30, 40, 50]</span>
                        <span className="text-green-600 font-bold">Passed ✓</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#F7F6F0] flex items-center justify-between">
                        <span>Test Case 2: [1] (Single element)</span>
                        <span className="text-green-600 font-bold">Passed ✓</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#F7F6F0] flex items-center justify-between">
                        <span>Test Case 3: Negative numbers</span>
                        <span className="text-green-600 font-bold">Passed ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 4: STUDENT LEARNING PROGRESS & BADGES
              ===================================================================== */}
          {activeSection === 'progress' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                  Personal Learning Progress
                </h2>
                <p className="text-xs sm:text-sm text-[#171917]/70">
                  Track your mastery across data structure modules, experiment check-offs, and academic milestones.
                </p>
              </div>

              {/* Progress Summary Cards */}
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm text-center">
                  <div className="w-20 h-20 rounded-full bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-3 shadow-md">
                    {Math.round((completedTopics.length / topics.length) * 100)}%
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#063D2E]">Overall Completion</h3>
                  <span className="text-xs text-[#171917]/60 block mt-1">
                    {completedTopics.length} of {topics.length} Experiments Verified
                  </span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm text-center">
                  <div className="w-20 h-20 rounded-full bg-[#A8E6CF]/30 text-[#063D2E] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-3 border border-[#063D2E]/20">
                    56 / 60
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#063D2E]">Continuous Assessment</h3>
                  <span className="text-xs text-green-600 font-bold block mt-1">
                    Outstanding Evaluation (O Grade)
                  </span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm text-center">
                  <div className="w-20 h-20 rounded-full bg-[#0B513B]/10 text-[#0B513B] flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-3">
                    5
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#063D2E]">Earned Badges</h3>
                  <span className="text-xs text-[#171917]/60 block mt-1">
                    Recursion, Stacks, Trees, Graphs, Sorting
                  </span>
                </div>
              </div>

              {/* Topic by Topic Checklist */}
              <div className="bg-white rounded-2xl border border-[#E8EAE4] p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-[#063D2E] mb-4">
                  Syllabus Experiments Check-off
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {topics.map((t, idx) => {
                    const isDone = completedTopics.includes(t.id)
                    return (
                      <div
                        key={t.id}
                        onClick={() => markTopicComplete(t.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isDone
                            ? 'bg-[#A8E6CF]/15 border-[#063D2E]/20 text-[#063D2E]'
                            : 'bg-[#F7F6F0] border-[#E8EAE4] text-[#171917]/70 hover:border-[#063D2E]/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{t.icon}</span>
                          <div>
                            <span className="text-xs font-bold block">
                              {idx + 1}. {t.title}
                            </span>
                            <span className="text-[10px] opacity-75">
                              {t.timeComplexity.access} Access • {t.timeComplexity.search} Search
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            isDone ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {isDone ? 'Done ✓' : 'Click to Mark'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 5: FACULTY STUDENT ANALYTICS (STAFF ONLY)
              ===================================================================== */}
          {activeSection === 'analytics' && role === 'staff' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                  Classroom & Student Performance Analytics
                </h2>
                <p className="text-xs sm:text-sm text-[#171917]/70">
                  Comprehensive performance tracking across Batch A and Batch B laboratory cohorts.
                </p>
              </div>

              {/* Batch Breakdown Metrics */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold text-[#063D2E]">Batch A (Mon / Wed)</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">
                      84% Completion
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Arrays & Linked Lists</span>
                        <span className="font-bold">100% (62/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#063D2E] rounded-full w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Stack & Queue Applications</span>
                        <span className="font-bold">92% (57/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#063D2E] rounded-full w-[92%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Binary Search Tree ADT</span>
                        <span className="font-bold">74% (46/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#063D2E] rounded-full w-[74%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold text-[#063D2E]">Batch B (Tue / Thu)</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      76% Completion
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Arrays & Linked Lists</span>
                        <span className="font-bold">98% (61/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0B513B] rounded-full w-[98%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Stack & Queue Applications</span>
                        <span className="font-bold">85% (53/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0B513B] rounded-full w-[85%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[#171917]/70 mb-1">
                        <span>Binary Search Tree ADT</span>
                        <span className="font-bold">66% (41/62)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0B513B] rounded-full w-[66%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 6: FACULTY STUDENT SUBMISSIONS & EVALUATION (STAFF ONLY)
              ===================================================================== */}
          {activeSection === 'submissions' && role === 'staff' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                    Student Submissions & Evaluation Rubrics
                  </h2>
                  <p className="text-xs sm:text-sm text-[#171917]/70">
                    Evaluate practical C implementations, output correctness, and assign continuous assessment marks.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#171917]/60">Filter:</span>
                  <span className="px-3 py-1 rounded-md bg-white border border-[#E8EAE4] text-xs font-semibold text-[#063D2E]">
                    All Batches ({submissions.length})
                  </span>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="bg-white rounded-2xl border border-[#E8EAE4] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#063D2E]/5 border-b border-[#E8EAE4] text-[#063D2E] font-bold">
                      <tr>
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4">Roll No.</th>
                        <th className="py-3.5 px-4">Batch</th>
                        <th className="py-3.5 px-4">Experiment Title</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAE4]">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-[#F7F6F0] transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#063D2E]">{sub.studentName}</td>
                          <td className="py-3.5 px-4 font-mono text-[#171917]/70">{sub.rollNo}</td>
                          <td className="py-3.5 px-4">{sub.batch}</td>
                          <td className="py-3.5 px-4 font-medium">{sub.topic}</td>
                          <td className="py-3.5 px-4 text-[#171917]/60">{sub.submittedAt}</td>
                          <td className="py-3.5 px-4">
                            {sub.status === 'Graded' ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-bold">
                                Graded ({sub.score}/100)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setEvaluatingSub(sub)
                                setGradeInput(sub.score || 90)
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                            >
                              {sub.status === 'Graded' ? 'Edit Marks' : 'Evaluate Code'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evaluation Modal */}
              <AnimatePresence>
                {evaluatingSub && (
                  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAE4] space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-[#E8EAE4] pb-4">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-[#063D2E]">
                            Rubric Evaluation: {evaluatingSub.studentName}
                          </h3>
                          <span className="text-xs text-[#171917]/60">
                            {evaluatingSub.rollNo} • {evaluatingSub.topic}
                          </span>
                        </div>
                        <button
                          onClick={() => setEvaluatingSub(null)}
                          className="p-1.5 text-gray-400 hover:text-black rounded-lg"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Code preview */}
                      <div>
                        <span className="text-xs font-bold text-[#063D2E] block mb-1">
                          Submitted C Source:
                        </span>
                        <pre className="bg-[#0C120E] text-[#A8E6CF] p-3.5 rounded-xl font-mono text-xs overflow-x-auto max-h-[160px]">
                          <code>{evaluatingSub.code}</code>
                        </pre>
                      </div>

                      {/* Rubrics breakdown */}
                      <div className="grid grid-cols-3 gap-3 text-xs bg-[#F7F6F0] p-3.5 rounded-xl border border-[#E8EAE4]">
                        <div>
                          <span className="font-bold text-[#063D2E] block">Execution (40%)</span>
                          <span className="text-[#171917]/70">Zero segmentation faults</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#063D2E] block">Modularity (30%)</span>
                          <span className="text-[#171917]/70">Proper pointers & structs</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#063D2E] block">Lab Viva (30%)</span>
                          <span className="text-[#171917]/70">Complexity justification</span>
                        </div>
                      </div>

                      {/* Score Input */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <label className="text-xs font-bold text-[#063D2E]">Assign Total Marks:</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={gradeInput}
                            onChange={(e) => setGradeInput(parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-1.5 rounded-lg border border-[#E8EAE4] font-bold text-center text-sm"
                          />
                          <span className="text-xs text-[#171917]/60">/ 100</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEvaluatingSub(null)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#171917]/70 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveGrade}
                            className="px-6 py-2 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-bold text-xs shadow-md"
                          >
                            Save & Record Grade
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* =====================================================================
              SECTION 7: FACULTY BATCH & CLASSROOM MANAGEMENT (STAFF ONLY)
              ===================================================================== */}
          {activeSection === 'batch' && role === 'staff' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                  Classroom & Batch Management
                </h2>
                <p className="text-xs sm:text-sm text-[#171917]/70">
                  Manage lab schedules, attendance tracking, and student batch allocation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#063D2E]">Batch A Roster</h3>
                      <span className="text-xs text-[#171917]/60">Mondays & Wednesdays • 10:00 AM – 12:30 PM</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A8E6CF]/30 text-[#063D2E]">
                      62 Students
                    </span>
                  </div>

                  <p className="text-xs text-[#171917]/75">
                    Lab Venue: Computing Centre 3 (Systems Lab). Operating GCC 11.2 on Linux workstations.
                  </p>

                  <div className="pt-3 border-t border-[#E8EAE4] flex items-center justify-between text-xs">
                    <span className="text-green-700 font-bold">Attendance Average: 96.2%</span>
                    <button className="text-[#063D2E] font-bold hover:underline">
                      Download Attendance PDF
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#063D2E]">Batch B Roster</h3>
                      <span className="text-xs text-[#171917]/60">Tuesdays & Thursdays • 02:00 PM – 04:30 PM</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A8E6CF]/30 text-[#063D2E]">
                      62 Students
                    </span>
                  </div>

                  <p className="text-xs text-[#171917]/75">
                    Lab Venue: Computing Centre 3 (Systems Lab). Operating GCC 11.2 on Linux workstations.
                  </p>

                  <div className="pt-3 border-t border-[#E8EAE4] flex items-center justify-between text-xs">
                    <span className="text-green-700 font-bold">Attendance Average: 94.8%</span>
                    <button className="text-[#063D2E] font-bold hover:underline">
                      Download Attendance PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 8: MANAGE LAB UNITS (STAFF ONLY)
              ===================================================================== */}
          {activeSection === 'manage-labs' && role === 'staff' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                  Manage Laboratory Units & Experiments
                </h2>
                <p className="text-xs sm:text-sm text-[#171917]/70">
                  Control active lab access, configure submission deadlines, and adjust problem difficulty.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8EAE4] shadow-sm divide-y divide-[#E8EAE4]">
                {topics.map((t, idx) => (
                  <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{t.icon}</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#063D2E]">
                          Experiment {idx + 1}: {t.title}
                        </h4>
                        <span className="text-xs text-[#171917]/60 block">
                          Visualizer: {t.visualization} • Max Points: 10 Marks
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                        Active & Published
                      </span>
                      <button className="text-xs font-semibold text-[#063D2E] border border-[#E8EAE4] px-3 py-1.5 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 9: SYLLABUS & MODULES (ACCESSIBLE TO BOTH)
              ===================================================================== */}
          {activeSection === 'syllabus' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                    Curriculum Syllabus & Units
                  </h2>
                  <p className="text-xs sm:text-sm text-[#171917]/70">
                    N21UIT307 Data Structures Laboratory • Regulation 2021
                  </p>
                </div>
                <Link
                  to="/syllabus"
                  className="text-xs font-bold text-[#063D2E] hover:underline flex items-center gap-1"
                >
                  <span>Open 3D Textbook Mode</span>
                  <ExternalLink size={13} />
                </Link>
              </div>

              {/* Units Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#0B513B] uppercase">Unit I</span>
                  <h3 className="font-serif text-lg font-bold text-[#063D2E]">Linear Data Structures</h3>
                  <p className="text-xs text-[#171917]/75 leading-relaxed">
                    Array representation, insertion and deletion. Dynamic memory allocation with pointers. Linked List ADT: Singly, Doubly and Circular linked lists.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#0B513B] uppercase">Unit II</span>
                  <h3 className="font-serif text-lg font-bold text-[#063D2E]">Stacks & Queues</h3>
                  <p className="text-xs text-[#171917]/75 leading-relaxed">
                    Stack ADT, push and pop operations, infix to postfix notation conversion, parenthesis balancing. Queue ADT, circular queue, priority queue implementation.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#0B513B] uppercase">Unit III</span>
                  <h3 className="font-serif text-lg font-bold text-[#063D2E]">Trees & Binary Search Trees</h3>
                  <p className="text-xs text-[#171917]/75 leading-relaxed">
                    Binary tree representation, tree traversals (Inorder, Preorder, Postorder). Binary Search Tree insertion, search, and deletion operations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#0B513B] uppercase">Unit IV & V</span>
                  <h3 className="font-serif text-lg font-bold text-[#063D2E]">Graphs & Sorting Algorithms</h3>
                  <p className="text-xs text-[#171917]/75 leading-relaxed">
                    Graph representation, BFS, DFS, Dijkstra’s shortest path, Kruskal and Prim MST. Sorting algorithms: Insertion sort, Merge sort, Quick sort.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 10: ACADEMIC RESOURCES (ACCESSIBLE TO BOTH)
              ===================================================================== */}
          {activeSection === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                    Academic Resource Library
                  </h2>
                  <p className="text-xs sm:text-sm text-[#171917]/70">
                    Hand-curated algorithm textbooks, complexity cheat sheets, and practical viva guides.
                  </p>
                </div>
                <Link
                  to="/resources"
                  className="text-xs font-bold text-[#063D2E] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Resource Page</span>
                  <ExternalLink size={13} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((sec) => (
                  <div
                    key={sec.category}
                    className="bg-white p-5 rounded-2xl border border-[#E8EAE4] shadow-sm space-y-3"
                  >
                    <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8EAE4]">
                      <sec.icon size={18} className="text-[#063D2E]" />
                      <h3 className="font-serif font-bold text-[#063D2E] text-base">{sec.category}</h3>
                    </div>

                    <div className="space-y-2.5">
                      {sec.items.map((item) => (
                        <div key={item.title} className="text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-[#063D2E] block">{item.title}</span>
                            <span
                              className="text-[9.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: typeColors[item.type] || '#E8EAE4', color: '#063D2E' }}
                            >
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[#171917]/65 block mt-0.5 leading-relaxed text-[11px]">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              SECTION 11: USER PROFILE & SETTINGS
              ===================================================================== */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E]">
                  Account Profile & Workspace Settings
                </h2>
                <p className="text-xs sm:text-sm text-[#171917]/70">
                  Manage your personal credentials, laboratory notifications, and role permissions.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8EAE4] shadow-sm max-w-2xl space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-[#E8EAE4]">
                  <div className="w-16 h-16 rounded-2xl bg-[#063D2E] text-[#A8E6CF] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                    {user?.email ? user.email.slice(0, 2).toUpperCase() : role === 'student' ? 'ST' : 'FA'}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#063D2E]">
                      {user?.email || (role === 'student' ? 'student@dsalab.edu' : 'staff@dsalab.edu')}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#A8E6CF]/30 text-[#063D2E] mt-1 border border-[#063D2E]/20">
                      {role === 'student' ? 'Student Account' : 'Faculty / Administrator'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#171917]/60 block mb-1">Academic Department</span>
                    <span className="font-bold text-[#063D2E] text-sm">Information Technology</span>
                  </div>
                  <div>
                    <span className="text-[#171917]/60 block mb-1">Subject Code</span>
                    <span className="font-bold text-[#063D2E] text-sm">N21UIT307</span>
                  </div>
                  <div>
                    <span className="text-[#171917]/60 block mb-1">Active Laboratory Batch</span>
                    <span className="font-bold text-[#063D2E] text-sm">Batch A (Systems Lab)</span>
                  </div>
                  <div>
                    <span className="text-[#171917]/60 block mb-1">Session Mode</span>
                    <span className="font-bold text-[#063D2E] text-sm">Supabase Cloud + Local Auth</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8EAE4] flex items-center justify-between">
                  <span className="text-xs text-[#171917]/60">Switch Role View:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRoleToggle('student')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        role === 'student'
                          ? 'bg-[#063D2E] text-white'
                          : 'bg-gray-100 text-[#171917]/70 hover:bg-gray-200'
                      }`}
                    >
                      Student View
                    </button>
                    <button
                      onClick={() => handleRoleToggle('staff')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        role === 'staff'
                          ? 'bg-[#063D2E] text-white'
                          : 'bg-gray-100 text-[#171917]/70 hover:bg-gray-200'
                      }`}
                    >
                      Staff View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
