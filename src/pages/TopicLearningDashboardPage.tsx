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
  RefreshCw
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

import exp01Icon from '../assets/experiments/experiment-01-code.png'
import exp02Icon from '../assets/experiments/experiment-02-linked-list.png'
import exp03Icon from '../assets/experiments/experiment-03-stack.png'
import exp04Icon from '../assets/experiments/experiment-04-parentheses.png'
import exp05Icon from '../assets/experiments/experiment-05-queue.png'
import exp06Icon from '../assets/experiments/experiment-06-binary-tree.png'
import exp07Icon from '../assets/experiments/experiment-07-dijkstra.png'
import exp08Icon from '../assets/experiments/experiment-08-mst.png'
import exp09Icon from '../assets/experiments/experiment-09-sorting.png'

const EXP_3D_ICONS: Record<string, string> = {
  'exp-01': exp01Icon,
  'exp-02': exp02Icon,
  'exp-03': exp03Icon,
  'exp-04': exp04Icon,
  'exp-05': exp05Icon,
  'exp-06': exp06Icon,
  'exp-07': exp07Icon,
  'exp-08': exp08Icon,
  'exp-09': exp09Icon,
}

type TabType =
  | 'details'
  | 'theory'
  | 'flowchart'
  | 'demo'
  | 'practice'
  | 'viva'
  | 'evaluate'
  | 'marks'

export default function TopicLearningDashboardPage() {
  const { expId = 'exp-01', topicId = 'recursion' } = useParams<{ expId: string; topicId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('details')

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
      <div className="min-h-screen bg-[#F7F6F0] flex items-center justify-center p-6 text-[#123D2C]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8EAE4] shadow-xl text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#063D2E] mb-2">Topic Not Found</h2>
          <p className="text-sm text-slate-600 mb-6 font-sans">
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

  const TABS = [
    { id: 'details', label: '1. Details', icon: FileText },
    { id: 'theory', label: '2. Theory & Algorithm', icon: BookOpen },
    { id: 'flowchart', label: '3. Flowchart', icon: GitBranch },
    { id: 'demo', label: '4. Live Demo', icon: Play },
    { id: 'practice', label: '5. Practice Session', icon: Code2 },
    { id: 'viva', label: '6. Viva Voce', icon: HelpCircle },
    { id: 'evaluate', label: '7. Evaluate', icon: ShieldCheck },
    { id: 'marks', label: '8. Marks', icon: Award },
  ] as const

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#123D2C] selection:bg-[#B8E8D0] selection:text-[#063D2E]">
      {/* Sticky Top Header with Breadcrumbs and Back Action */}
      <header className="sticky top-0 z-40 bg-[#F7F6F0]/95 backdrop-blur-md border-b border-[#E8EAE4] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-sans flex-wrap">
            <button
              onClick={() => navigate(`/student/experiment/${expGroup.id}`)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer group"
              title="Return to Topic Selection"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Topics</span>
            </button>

            <span className="text-slate-300">/</span>
            <Link
              to="/student/dashboard"
              className="text-slate-500 hover:text-[#063D2E] font-medium transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              to={`/student/experiment/${expGroup.id}`}
              className="text-slate-500 hover:text-[#063D2E] font-medium transition-colors"
            >
              Exp {expGroup.number} ({expGroup.shortTitle})
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#063D2E] font-bold">
              Topic {topic.topicNumber} · {topic.shortTitle}
            </span>
          </div>

          {/* Right Actions: Theme Menu & Exit to Dashboard */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-[#063D2E] transition-colors cursor-pointer hidden md:flex items-center gap-1"
            >
              <span>Student Dashboard</span>
              <ChevronRight size={13} />
            </button>
            <ThemeMenu align="right" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Topic Title Card with Sibling Quick Switcher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE4] shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* 3D Custom Emerald Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-[#F7F6F0] border border-[#E8EAE4] p-1.5 flex items-center justify-center shadow-inner">
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
                  <span className="px-2.5 py-0.5 rounded-md bg-[#B8E8D0]/50 text-[#063D2E] text-xs font-bold font-sans">
                    Part of Exp {expGroup.number}: {expGroup.shortTitle}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                    {topic.learningOutcome.split(':')[0]}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] tracking-tight mb-1">
                  {topic.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
                  {topic.topicsSummary}
                </p>
              </div>
            </div>

            {/* Change Topic Button */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => navigate(`/student/experiment/${expGroup.id}`)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#E8EAE4] border border-[#E8EAE4] text-xs font-bold text-[#063D2E] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RefreshCw size={13} />
                <span>Change Topic ({expGroup.topics.length} total)</span>
              </button>
            </div>
          </div>

          {/* Sibling Topic Quick Selector (If multiple topics exist in this experiment) */}
          {expGroup.topics.length > 1 && (
            <div className="mt-6 pt-5 border-t border-[#E8EAE4]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 font-sans">
                  All Topics in Experiment {expGroup.number}:
                </span>
                <span className="text-[11px] text-slate-500 font-sans">
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
                          : 'bg-[#FAF9F5] hover:bg-white text-slate-700 border-[#E8EAE4]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center font-mono ${
                        isCurrent ? 'bg-[#B8E8D0] text-[#063D2E]' : 'bg-slate-200 text-slate-700'
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

        {/* 8 Learning Options Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-[#E8EAE4] shadow-sm overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#063D2E] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#063D2E] hover:bg-[#FAF9F5]'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#B8E8D0]' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
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
              transition={{ duration: 0.25 }}
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
      </main>
    </div>
  )
}
