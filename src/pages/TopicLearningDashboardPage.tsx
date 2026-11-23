import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  GitBranch,
  Play,
  HelpCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  CheckCircle2,
  Layers,
  Sparkles,
  RefreshCw,
  Menu,
  X,
  Compass,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
  PanelLeft
} from 'lucide-react'
import {
  getSyllabusExperiment,
  getTopicById,
  findTopicGlobally,
  type TopicDetails,
  type SyllabusExperimentGroup
} from '../data/syllabusTopicsData'
import type { ExperimentDetail } from '../data/experimentsData'

// 8 Interactive Learning Sections
import ExperimentDetailsSection from '../components/experiment/ExperimentDetailsSection'
import TheoryAlgorithmSection from '../components/experiment/TheoryAlgorithmSection'
import FlowchartViewerSection from '../components/experiment/FlowchartViewerSection'
import LiveDemoSection from '../components/experiment/LiveDemoSection'
import PracticeSection from '../components/experiment/PracticeSection'
import VivaSection from '../components/experiment/VivaSection'
import FacultyEvaluationSection from '../components/experiment/FacultyEvaluationSection'
import MarksDisplaySection from '../components/experiment/MarksDisplaySection'
import ThemeMenu from '../components/ThemeMenu'
import { EXP_3D_ICONS, exp01Icon } from '../assets/experiments'

type TabType =
  | 'details'
  | 'theory'
  | 'flowchart'
  | 'demo'
  | 'practice'
  | 'viva'
  | 'evaluate'
  | 'marks'

interface NavSection {
  id: TabType
  number: string
  label: string
  shortLabel: string
  subtitle: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'details',
    number: '01',
    label: '1. Details',
    shortLabel: 'Details',
    subtitle: 'Aim, objectives & scope',
    icon: FileText
  },
  {
    id: 'theory',
    number: '02',
    label: '2. Theory & Algorithm',
    shortLabel: 'Theory & Algorithm',
    subtitle: 'Concepts & step-by-step logic',
    icon: BookOpen
  },
  {
    id: 'flowchart',
    number: '03',
    label: '3. Flowchart',
    shortLabel: 'Flowchart',
    subtitle: 'Visual execution diagrams',
    icon: GitBranch
  },
  {
    id: 'demo',
    number: '04',
    label: '4. Live Demo',
    shortLabel: 'Live Demo',
    subtitle: 'Step-by-step trace demo',
    icon: Play
  },
  {
    id: 'practice',
    number: '05',
    label: '5. Practice Session',
    shortLabel: 'Practice Session',
    subtitle: 'C editor & GCC compiler sandbox',
    icon: Code2
  },
  {
    id: 'viva',
    number: '06',
    label: '6. Viva Voce',
    shortLabel: 'Viva Voce',
    subtitle: 'Interactive viva questions',
    icon: HelpCircle
  },
  {
    id: 'evaluate',
    number: '07',
    label: '7. Evaluate',
    shortLabel: 'Evaluate',
    subtitle: 'Faculty rubrics & checkoff',
    icon: ShieldCheck
  },
  {
    id: 'marks',
    number: '08',
    label: '8. Marks',
    shortLabel: 'Marks',
    subtitle: 'Performance scorecard',
    icon: Award
  }
]

export default function TopicLearningDashboardPage() {
  const { expId = 'exp-01', topicId = 'recursion' } = useParams<{ expId: string; topicId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false) // Default: OPEN on desktop

  // Lookup topic
  const normalizedExpId = expId.startsWith('exp-') ? expId : `exp-${expId.padStart(2, '0')}`
  let topic: TopicDetails | undefined = getTopicById(normalizedExpId, topicId)
  if (!topic) {
    topic = findTopicGlobally(topicId)
  }

  // Lookup parent experiment group
  const parentExpId = topic ? topic.parentExperimentId : normalizedExpId
  const expGroup: SyllabusExperimentGroup | undefined = getSyllabusExperiment(parentExpId)

  // Scroll to top on topic change or tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [topicId, activeTab])

  if (!topic || !expGroup) {
    return (
      <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#0B1310] flex items-center justify-center p-6 text-[#123D2C] dark:text-[#E8EAE4]">
        <div className="max-w-md w-full bg-white dark:bg-[#14221C] rounded-3xl p-8 border border-[#E8EAE4] dark:border-[#22382D] shadow-xl text-center">
          <div className="w-14 h-14 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#063D2E] dark:text-[#E8EAE4] mb-2">Topic Not Found</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-sans">
            Could not find topic matching &quot;{topicId}&quot; in experiment &quot;{expId}&quot;.
          </p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full bg-[#063D2E] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#0B513B] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Return to Student Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  // Adapt TopicDetails into ExperimentDetail for the 8 existing components
  const adaptedExp: ExperimentDetail = {
    id: topic.parentExperimentId, // retains exp-01...exp-09 for 3D icons & demos
    number: topic.topicNumber,
    title: topic.title,
    shortTitle: topic.shortTitle,
    topics: topic.topicsSummary,
    aim: topic.aim,
    problemStatement: topic.problemStatement,
    objectives: topic.objectives,
    requiredConcepts: topic.requiredConcepts,
    syllabusScope: topic.syllabusScope,
    expectedOutput: topic.expectedOutput,
    learningOutcome: topic.learningOutcome,
    theory: topic.theory,
    flowchartNodes: topic.flowchartNodes,
    practiceProblems: topic.practiceProblems,
    vivaQuestions: topic.vivaQuestions,
    defaultCodeSnippet: topic.cCodeSnippet,
  }

  const iconSrc = EXP_3D_ICONS[topic.parentExperimentId] || exp01Icon

  // Calculate current section index for sequential navigation
  const currentSectionIndex = NAV_SECTIONS.findIndex(s => s.id === activeTab)
  const prevSection = currentSectionIndex > 0 ? NAV_SECTIONS[currentSectionIndex - 1] : null
  const nextSection = currentSectionIndex < NAV_SECTIONS.length - 1 ? NAV_SECTIONS[currentSectionIndex + 1] : null
  const activeSectionObj = NAV_SECTIONS[currentSectionIndex] || NAV_SECTIONS[0]

  const handleSelectTab = (tabId: TabType) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#0B1310] text-[#123D2C] dark:text-[#E8EAE4] selection:bg-[#B8E8D0] selection:text-[#063D2E] flex flex-col">
      {/* =========================================================================
          TOP BREADCRUMB HEADER (Full Width, Sticky)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#F7F6F0]/95 dark:bg-[#0B1310]/95 backdrop-blur-md border-b border-[#E8EAE4] dark:border-[#22382D] px-4 sm:px-6 lg:px-8 py-3.5 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumbs & Desktop Sidebar Toggle */}
          <div className="flex items-center gap-2 text-xs font-sans flex-wrap">
            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg bg-white dark:bg-[#14221C] hover:bg-[#E8EAE4] dark:hover:bg-[#1C2C24] border border-[#E8EAE4] dark:border-[#22382D] text-[#063D2E] dark:text-[#34D399] transition-all cursor-pointer shadow-sm items-center justify-center mr-1"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle Left Sidebar"
            >
              {isCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
            </button>

            <button
              onClick={() => navigate(`/student/experiment/${expGroup.id}`)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-[#14221C] hover:bg-[#E8EAE4] dark:hover:bg-[#1C2C24] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-bold text-[#063D2E] dark:text-[#34D399] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer group"
              title="Return to Topic Selection"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Topics</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">/</span>
            <Link
              to="/student/dashboard"
              className="text-slate-500 hover:text-[#063D2E] dark:hover:text-[#34D399] font-medium transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <Link
              to={`/student/experiment/${expGroup.id}`}
              className="text-slate-500 hover:text-[#063D2E] dark:hover:text-[#34D399] font-medium transition-colors"
            >
              Exp {expGroup.number} ({expGroup.shortTitle})
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-[#063D2E] dark:text-[#34D399] font-bold">
              Topic {topic.topicNumber} · {topic.shortTitle}
            </span>
          </div>

          {/* Right Actions: Theme Menu & Exit to Dashboard */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-[#063D2E] dark:hover:text-[#34D399] transition-colors cursor-pointer hidden md:flex items-center gap-1"
            >
              <span>Student Dashboard</span>
              <ChevronRight size={13} />
            </button>
            <ThemeMenu align="right" />
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SECTION NAVIGATION DRAWER BAR (< lg screens)
          ========================================================================= */}
      <div className="lg:hidden sticky top-[57px] z-30 bg-white dark:bg-[#14221C] border-b border-[#E8EAE4] dark:border-[#22382D] px-4 py-2.5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-[#064E3B] text-white flex items-center justify-center shrink-0">
              <activeSectionObj.icon size={15} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Section {currentSectionIndex + 1} of 8
              </div>
              <div className="text-xs font-bold text-[#063D2E] dark:text-[#E8EAE4] truncate">
                {activeSectionObj.label}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            <span>{mobileMenuOpen ? 'Close Menu' : 'All Sections'}</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-3 mt-2 border-t border-[#E8EAE4] dark:border-[#22382D]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
                {NAV_SECTIONS.map((section) => {
                  const Icon = section.icon
                  const isActive = activeTab === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSelectTab(section.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#064E3B] text-white shadow-sm'
                          : 'bg-[#F7F6F0] dark:bg-[#1C2C24] text-slate-700 dark:text-slate-300 hover:bg-[#E8EAE4] dark:hover:bg-[#25392F]'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#047857] text-[#D1FAE5]' : 'bg-white dark:bg-[#14221C] text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon size={14} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">{section.label}</div>
                        <div className={`text-[10px] truncate ${isActive ? 'text-[#D1FAE5]' : 'text-slate-400'}`}>
                          {section.subtitle}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          FULL-VIEWPORT BODY: RECTANGULAR FLUSH LEFT SIDEBAR + MAIN CONTENT AREA
          ========================================================================= */}
      <div className="flex-1 flex w-full min-h-[calc(100vh-57px)]">
        {/* =========================================================================
            1. FULL-HEIGHT RECTANGULAR LEFT SIDEBAR (Desktop)
               - Attached directly to left viewport edge (left: 0)
               - Perfect rectangular shape: border-radius: 0px (rounded-none)
               - Interactive Open (320px) and Collapse (76px) functionality
               - Smooth 300ms width transition
               - Tooltips on hover when collapsed
            ========================================================================= */}
        <aside
          className={`hidden lg:flex flex-col shrink-0 sticky top-[57px] h-[calc(100vh-57px)] bg-[#064E3B] dark:bg-[#022C22] border-r border-[#0B654D]/50 dark:border-[#134E39] z-20 rounded-none shadow-sm transition-[width] duration-300 ease-in-out ${
            isCollapsed ? 'w-[76px]' : 'w-[320px]'
          }`}
          style={{ borderRadius: '0px' }}
        >
          {/* Sidebar Top Header with Integrated Toggle Button */}
          <div className="border-b border-white/10 shrink-0 bg-[#053F30] dark:bg-[#01221A] rounded-none">
            {isCollapsed ? (
              /* Collapsed Header: Centered Toggle Icon & Units Indicator */
              <div className="p-3 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-[#D1FAE5] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm group"
                  title="Expand Sidebar"
                  aria-label="Expand Sidebar"
                >
                  <PanelLeftOpen size={18} className="group-hover:scale-105 transition-transform" />
                </button>
                <span className="text-[9px] font-mono font-bold text-[#D1FAE5]/70 uppercase tracking-tighter">
                  8 Units
                </span>
              </div>
            ) : (
              /* Open Header: Full Academic Badge, Topic Title & Collapse Toggle */
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <GraduationCap size={15} className="text-[#D1FAE5]" />
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D1FAE5] truncate">
                      DSA LAB MODULE
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded-full bg-[#047857] text-[#D1FAE5] text-[10px] font-mono font-bold">
                      8 Units
                    </span>
                    {/* Toggle Button to Collapse */}
                    <button
                      onClick={() => setIsCollapsed(true)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D1FAE5] hover:text-white transition-colors cursor-pointer"
                      title="Collapse Sidebar"
                      aria-label="Collapse Sidebar"
                    >
                      <PanelLeftClose size={16} />
                    </button>
                  </div>
                </div>

                <h2 className="font-serif text-sm font-bold text-white tracking-tight leading-snug line-clamp-2">
                  {topic.title}
                </h2>
                <div className="text-[11px] text-[#D1FAE5]/70 mt-0.5 font-sans truncate">
                  Exp {expGroup.number}: {expGroup.shortTitle}
                </div>
              </div>
            )}
          </div>

          {/* Section Navigation Header Label (Visible only when expanded) */}
          {!isCollapsed && (
            <div className="px-5 pt-3.5 pb-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#D1FAE5]/60 shrink-0">
              <span>Learning Sections</span>
              <Compass size={12} className="text-[#D1FAE5]/40" />
            </div>
          )}

          {/* Navigation Items List (Scrollable, full height) */}
          <nav
            className={`flex-1 overflow-y-auto space-y-1.5 scrollbar-thin rounded-none ${
              isCollapsed ? 'p-2' : 'p-3'
            }`}
            aria-label="Learning Sections"
          >
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon
              const isActive = activeTab === section.id

              return (
                <div key={section.id} className="relative group">
                  <button
                    onClick={() => handleSelectTab(section.id)}
                    className={`w-full group flex items-center rounded-xl text-left transition-all duration-150 cursor-pointer relative ${
                      isCollapsed
                        ? 'justify-center p-2.5'
                        : 'gap-3 px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-[#047857] text-white shadow-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSharpSidebarIndicator"
                        className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#D1FAE5] rounded-r shadow-[0_0_8px_#D1FAE5]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Icon Container */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#065F46] text-[#D1FAE5] border border-[#D1FAE5]/30 shadow-inner'
                          : 'bg-white/10 text-white/75 group-hover:bg-white/15 group-hover:text-white group-hover:scale-105'
                      }`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* Label & Description (Visible only when open) */}
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold tracking-tight truncate">
                            {section.label}
                          </div>
                          <div
                            className={`text-[10px] font-normal truncate ${
                              isActive ? 'text-[#D1FAE5]/90' : 'text-white/50 group-hover:text-white/70'
                            }`}
                          >
                            {section.subtitle}
                          </div>
                        </div>

                        {/* Caret */}
                        <ChevronRight
                          size={13}
                          className={`shrink-0 transition-transform duration-150 ${
                            isActive
                              ? 'text-[#D1FAE5] translate-x-0.5'
                              : 'text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5'
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Tooltip on Hover when Collapsed */}
                  {isCollapsed && (
                    <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-xl bg-[#032219] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-xl border border-[#0B654D]/60 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D1FAE5]" />
                      <span>{section.label}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Sidebar Footer with Unit Progress */}
          <div className="border-t border-white/10 shrink-0 bg-[#053F30]/70 dark:bg-[#01221A]/90 rounded-none">
            {isCollapsed ? (
              <div className="p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono font-bold text-[#D1FAE5]">
                  {currentSectionIndex + 1}/8
                </span>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-[#D1FAE5]/90">
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    Active Section
                  </span>
                  <span className="font-bold text-white font-mono text-[11px]">
                    {currentSectionIndex + 1} / 8
                  </span>
                </div>
                <div className="w-full bg-black/25 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-[#D1FAE5] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentSectionIndex + 1) / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* =========================================================================
            2. MAIN CONTENT AREA (Smoothly expands when sidebar collapses)
            ========================================================================= */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 max-w-full transition-all duration-300 ease-in-out">
          {/* Topic Title Card with Sibling Quick Switcher */}
          <div className="bg-white dark:bg-[#14221C] rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] dark:border-[#22382D] shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* 3D Custom Emerald Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-[#F7F6F0] dark:bg-[#1A2E24] border border-[#E8EAE4] dark:border-[#22382D] p-1.5 flex items-center justify-center shadow-inner">
                  <img
                    src={iconSrc}
                    alt={topic.shortTitle}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(6,61,46,0.18)]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#063D2E] text-white text-xs font-mono font-bold">
                      TOPIC {topic.topicNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#B8E8D0]/50 dark:bg-[#1A382A] text-[#063D2E] dark:text-[#34D399] text-xs font-bold font-sans">
                      Part of Exp {expGroup.number}: {expGroup.shortTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1C2C24] text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                      {topic.learningOutcome.split(':')[0]}
                    </span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] dark:text-[#E8EAE4] tracking-tight mb-1">
                    {topic.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-3xl leading-relaxed">
                    {topic.topicsSummary}
                  </p>
                </div>
              </div>

              {/* Change Topic Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/student/experiment/${expGroup.id}`)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#1C2C24] hover:bg-[#E8EAE4] dark:hover:bg-[#25392F] border border-[#E8EAE4] dark:border-[#22382D] text-xs font-bold text-[#063D2E] dark:text-[#34D399] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw size={13} />
                  <span>Change Topic ({expGroup.topics.length} total)</span>
                </button>
              </div>
            </div>

            {/* Sibling Topic Quick Selector (If multiple topics exist in this experiment) */}
            {expGroup.topics.length > 1 && (
              <div className="mt-6 pt-5 border-t border-[#E8EAE4] dark:border-[#22382D]">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 font-sans">
                    All Topics in Experiment {expGroup.number}:
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    Click to switch topic learning dashboard
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {expGroup.topics.map((sib) => {
                    const isCurrent = sib.id === topic.id
                    return (
                      <button
                        key={sib.id}
                        onClick={() => navigate(`/student/experiment/${expGroup.id}/topic/${sib.id}`)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                          isCurrent
                            ? 'bg-[#063D2E] text-white border-[#063D2E] shadow-sm'
                            : 'bg-[#FAF9F5] dark:bg-[#1A2E24] hover:bg-white dark:hover:bg-[#223C2F] text-slate-700 dark:text-slate-300 border-[#E8EAE4] dark:border-[#22382D]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center font-mono ${
                          isCurrent ? 'bg-[#B8E8D0] text-[#063D2E]' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {sib.topicNumber.split('.')[1]}
                        </span>
                        <span>{sib.shortTitle}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Current Active Section Badge Bar */}
          <div className="bg-white dark:bg-[#14221C] rounded-2xl px-5 py-3 border border-[#E8EAE4] dark:border-[#22382D] shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm">
                <activeSectionObj.icon size={16} />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  ACTIVE LEARNING SECTION {currentSectionIndex + 1} OF 8
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#063D2E] dark:text-[#E8EAE4] leading-tight">
                  {activeSectionObj.label}
                </h3>
              </div>
            </div>

            {/* Fast Jump Quick Links for Previous / Next Section */}
            <div className="flex items-center gap-2">
              {prevSection && (
                <button
                  onClick={() => handleSelectTab(prevSection.id)}
                  className="px-3 py-1.5 rounded-xl border border-[#E8EAE4] dark:border-[#22382D] hover:bg-[#FAF9F5] dark:hover:bg-[#1C2C24] text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title={`Go to ${prevSection.label}`}
                >
                  <ArrowLeft size={13} />
                  <span className="hidden sm:inline">{prevSection.shortLabel}</span>
                </button>
              )}

              {nextSection && (
                <button
                  onClick={() => handleSelectTab(nextSection.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm transition-colors"
                  title={`Proceed to ${nextSection.label}`}
                >
                  <span className="hidden sm:inline">{nextSection.shortLabel}</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Section Content Display */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + '-' + topic.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'details' && (
                  <ExperimentDetailsSection
                    exp={adaptedExp}
                    onProceedToTheory={() => setActiveTab('theory')}
                  />
                )}

                {activeTab === 'theory' && (
                  <TheoryAlgorithmSection exp={adaptedExp} />
                )}

                {activeTab === 'flowchart' && (
                  <FlowchartViewerSection exp={adaptedExp} />
                )}

                {activeTab === 'demo' && (
                  <LiveDemoSection
                    exp={adaptedExp}
                    onProceedToPractice={() => setActiveTab('practice')}
                  />
                )}

                {activeTab === 'practice' && (
                  <PracticeSection exp={adaptedExp} />
                )}

                {activeTab === 'viva' && (
                  <VivaSection exp={adaptedExp} />
                )}

                {activeTab === 'evaluate' && (
                  <FacultyEvaluationSection exp={adaptedExp} />
                )}

                {activeTab === 'marks' && (
                  <MarksDisplaySection exp={adaptedExp} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Section Navigator Footer */}
          <div className="bg-white dark:bg-[#14221C] rounded-2xl p-4 sm:p-5 border border-[#E8EAE4] dark:border-[#22382D] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Topic Navigation:
              </span>
              <span className="text-xs font-bold text-[#063D2E] dark:text-[#34D399]">
                {activeSectionObj.label} ({currentSectionIndex + 1} of 8)
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {prevSection ? (
                <button
                  onClick={() => handleSelectTab(prevSection.id)}
                  className="px-4 py-2 rounded-xl border border-[#E8EAE4] dark:border-[#22382D] hover:bg-[#FAF9F5] dark:hover:bg-[#1C2C24] text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Previous: {prevSection.shortLabel}</span>
                </button>
              ) : (
                <div />
              )}

              {nextSection && (
                <button
                  onClick={() => handleSelectTab(nextSection.id)}
                  className="px-5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <span>Next: {nextSection.shortLabel}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
