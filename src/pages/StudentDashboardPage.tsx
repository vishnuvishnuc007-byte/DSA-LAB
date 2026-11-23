import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Code2,
  Layers,
  BookOpen,
  Info,
  Bell,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  Pencil,
  Zap,
  Target,
  Cpu,
  Terminal,
  Sparkles,
  Play,
  ArrowRight,
  User,
  LogOut,
  ExternalLink,
  ChevronDown,
  X,
  FileCode,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
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

interface StudentProfile {
  name: string
  rollNo: string
  course: string
  role: string
  avatarInitials: string
  email?: string
  bio?: string
  github?: string
  notificationsEnabled?: boolean
}

interface ActivityItem {
  id: string
  title: string
  timestamp: string
  type: 'completed' | 'started'
}

interface Experiment {
  id: string
  number: string
  title: string
  shortTitle: string
  topics: string
  detailedTopics: string[]
  icon: 'code' | 'link' | 'stack' | 'parens' | 'queue' | 'tree' | 'dijkstra' | 'mst' | 'sort'
  cCodeSnippet: string
  complexity: string
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-01',
    number: '01',
    title: 'SIMPLE C PROGRAMS',
    shortTitle: 'SIMPLE C PROGRAMS',
    topics: 'Recursion, Structures, Pointers',
    detailedTopics: [
      'Programs using recursion (Factorial, Tower of Hanoi)',
      'Programs using structures (Student record, Node representation)',
      'Programs using pointers (Dynamic memory allocation, Pointer arithmetic)'
    ],
    icon: 'code',
    complexity: 'Time: O(N) | Space: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\n// Recursive Factorial\nlong long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\n// Student Structure using Pointers\nstruct Student {\n    char name[50];\n    int rollNo;\n    float gpa;\n};\n\nint main() {\n    printf("Factorial of 5: %lld\\n", factorial(5));\n    struct Student *s = malloc(sizeof(struct Student));\n    s->rollNo = 307;\n    printf("Allocated student roll: %d\\n", s->rollNo);\n    free(s);\n    return 0;\n}`
  },
  {
    id: 'exp-02',
    number: '02',
    title: 'LINKED LIST',
    shortTitle: 'LINKED LIST',
    topics: 'List ADT implementation',
    detailedTopics: [
      'Linked List Implementation of List ADT',
      'Insert at begin, end, and middle positions',
      'Delete by value and index, List Traversal'
    ],
    icon: 'link',
    complexity: 'Insert: O(1) | Search: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insertAtBeginning(struct Node** head, int val) {\n    struct Node* newNode = malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}\n\nvoid printList(struct Node* n) {\n    while (n != NULL) {\n        printf("%d -> ", n->data);\n        n = n->next;\n    }\n    printf("NULL\\n");\n}`
  },
  {
    id: 'exp-03',
    number: '03',
    title: 'IMPLEMENTATION OF STACK',
    shortTitle: 'IMPLEMENTATION OF STACK',
    topics: 'Arrays and Linked List',
    detailedTopics: [
      'Stack implementation using Arrays (Static contiguous buffer)',
      'Stack implementation using Linked List (Dynamic pointers)',
      'Push, Pop, Peek, and IsEmpty operation verification'
    ],
    icon: 'stack',
    complexity: 'Push/Pop: O(1) | Space: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#define MAX 100\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int x) {\n    if (top >= MAX - 1) { printf("Stack Overflow\\n"); return; }\n    stack[++top] = x;\n}\n\nint pop() {\n    if (top < 0) { printf("Stack Underflow\\n"); return -1; }\n    return stack[top--];\n}\n\nint peek() {\n    return (top >= 0) ? stack[top] : -1;\n}`
  },
  {
    id: 'exp-04',
    number: '04',
    title: 'BALANCED PARENTHESES',
    shortTitle: 'BALANCED PARENTHESES',
    topics: 'Checking Balanced Parentheses using Array',
    detailedTopics: [
      'Syntax bracket matching for (), {}, and [] sets',
      'Stack Array implementation for delimiter parsing',
      'Underflow / unmatched open-tag error detection'
    ],
    icon: 'parens',
    complexity: 'Time: O(N) | Space: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#include <string.h>\n#define MAX 100\n\nint isMatchingPair(char char1, char char2) {\n    if (char1 == '(' && char2 == ')') return 1;\n    if (char1 == '{' && char2 == '}') return 1;\n    if (char1 == '[' && char2 == ']') return 1;\n    return 0;\n}\n\nint checkBalanced(char exp[]) {\n    char stack[MAX];\n    int top = -1;\n    for (int i = 0; i < strlen(exp); i++) {\n        if (exp[i] == '(' || exp[i] == '{' || exp[i] == '[')\n            stack[++top] = exp[i];\n        else if (exp[i] == ')' || exp[i] == '}' || exp[i] == ']') {\n            if (top == -1 || !isMatchingPair(stack[top--], exp[i])) return 0;\n        }\n    }\n    return top == -1;\n}`
  },
  {
    id: 'exp-05',
    number: '05',
    title: 'IMPLEMENTATION OF QUEUE',
    shortTitle: 'IMPLEMENTATION OF QUEUE',
    topics: 'Arrays and Linked List',
    detailedTopics: [
      'Queue using Arrays (Front and Rear index tracking, Circular wraps)',
      'Queue using Linked List (Enqueue at rear, Dequeue at front)',
      'Boundary conditions, Overflow and Underflow assertions'
    ],
    icon: 'queue',
    complexity: 'Enqueue/Dequeue: O(1) | Space: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#define SIZE 5\n\nint items[SIZE], front = -1, rear = -1;\n\nvoid enQueue(int value) {\n    if ((front == 0 && rear == SIZE - 1) || (rear == (front - 1) % (SIZE - 1))) {\n        printf("Queue is Full\\n");\n        return;\n    }\n    if (front == -1) { front = rear = 0; }\n    else if (rear == SIZE - 1 && front != 0) { rear = 0; }\n    else { rear++; }\n    items[rear] = value;\n}`
  },
  {
    id: 'exp-06',
    number: '06',
    title: 'BINARY SEARCH TREES',
    shortTitle: 'BINARY SEARCH TREES',
    topics: 'Binary Search Trees implementation',
    detailedTopics: [
      'Recursive node insertion and search validation',
      'Tree Traversals: In-order, Pre-order, and Post-order',
      'Minimum, maximum, and node deletion algorithms'
    ],
    icon: 'tree',
    complexity: 'Search/Insert: O(log N) avg | Space: O(N)',
    cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct TreeNode {\n    int key;\n    struct TreeNode *left, *right;\n};\n\nstruct TreeNode* newNode(int item) {\n    struct TreeNode* temp = malloc(sizeof(struct TreeNode));\n    temp->key = item;\n    temp->left = temp->right = NULL;\n    return temp;\n}\n\nvoid inorder(struct TreeNode* root) {\n    if (root != NULL) {\n        inorder(root->left);\n        printf("%d ", root->key);\n        inorder(root->right);\n    }\n}`
  },
  {
    id: 'exp-07',
    number: '07',
    title: "DIJKSTRA'S ALGORITHM",
    shortTitle: "DIJKSTRA'S ALGORITHM",
    topics: "Dijkstra's Algorithm",
    detailedTopics: [
      'Single-source shortest path on weighted graphs',
      'Adjacency matrix representation and distance array',
      'Greedy vertex relaxation and visited node states'
    ],
    icon: 'dijkstra',
    complexity: 'Time: O(V^2) or O((V+E)log V)',
    cCodeSnippet: `#include <stdio.h>\n#include <limits.h>\n#define V 6\n\nint minDistance(int dist[], int sptSet[]) {\n    int min = INT_MAX, min_index;\n    for (int v = 0; v < V; v++)\n        if (sptSet[v] == 0 && dist[v] <= min)\n            min = dist[v], min_index = v;\n    return min_index;\n}`
  },
  {
    id: 'exp-08',
    number: '08',
    title: 'MINIMUM SPANNING TREE',
    shortTitle: 'MINIMUM SPANNING TREE',
    topics: "Kruskal's Algorithm, Prim's Algorithm",
    detailedTopics: [
      "Kruskal's Algorithm (Disjoint Set Union, edge sorting)",
      "Prim's Algorithm (Priority vertex cut)",
      'Cycle detection and cumulative weight benchmarking'
    ],
    icon: 'mst',
    complexity: 'Kruskal: O(E log E) | Prim: O(V^2)',
    cCodeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\n// Disjoint Set Union for Kruskal\nint find(int parent[], int i) {\n    if (parent[i] == -1) return i;\n    return find(parent, parent[i]);\n}\n\nvoid Union(int parent[], int x, int y) {\n    parent[x] = y;\n}`
  },
  {
    id: 'exp-09',
    number: '09',
    title: 'SORTING ALGORITHMS',
    shortTitle: 'SORTING ALGORITHMS',
    topics: 'Insertion Sort, Merge Sort, Quick Sort',
    detailedTopics: [
      'Insertion Sort (In-place adaptive)',
      'Merge Sort (Divide and Conquer, O(N log N))',
      'Quick Sort (Pivot partitioning strategy)'
    ],
    icon: 'sort',
    complexity: 'Merge: O(N log N) | Quick: O(N log N) avg',
    cCodeSnippet: `#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}`
  }
]

export default function StudentDashboardPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  // Route Protection: Ensure unauthenticated users are redirected
  useEffect(() => {
    if (!user && !localStorage.getItem('dsalab_student_profile') && !localStorage.getItem('dsalab_user_role')) {
      const timer = setTimeout(() => {
        if (!user) {
          navigate('/login?role=student&redirect=/student/dashboard')
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [user, navigate])

  // Student Profile State (Loaded from Supabase or LocalStorage)
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('dsalab_student_profile')
      if (saved) return JSON.parse(saved)
    } catch {}

    const emailName = user?.email?.split('@')[0] || 'Vishnu Student'
    const formattedName = emailName
      .split(/[._-]/)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')

    return {
      name: formattedName.includes('Student') ? formattedName : `${formattedName} Student`,
      rollNo: '21UIT307',
      course: 'Data Structures Laboratory',
      role: 'STUDENT',
      avatarInitials: 'VS',
      email: user?.email || 'student@dsalab.edu',
      bio: 'B.Tech IT Undergraduate studying Data Structures & Algorithms (Regulation 2021).',
      notificationsEnabled: true
    }
  })

  // Experiment Progress State
  const [completedExpIds, setCompletedExpIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsalab_student_completed_exp')
      if (saved) return JSON.parse(saved)
    } catch {}
    // Default matching reference image: 3 completed (01, 02, and another or user's)
    return ['exp-01', 'exp-02']
  })

  const [inProgressExpIds, setInProgressExpIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsalab_student_inprogress_exp')
      if (saved) return JSON.parse(saved)
    } catch {}
    // Default matching reference image: Exp 03 In Progress
    return ['exp-03']
  })

  // Recent Activity State
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem('dsalab_student_activities')
      if (saved) return JSON.parse(saved)
    } catch {}
    return [
      {
        id: 'act-1',
        title: 'Completed Experiment 01',
        timestamp: '2 hours ago',
        type: 'completed'
      },
      {
        id: 'act-2',
        title: 'Started Experiment 03',
        timestamp: '1 day ago',
        type: 'started'
      }
    ]
  })

  // Modals & UI Controls
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [selectedExpModal, setSelectedExpModal] = useState<Experiment | null>(null)
  const [showAllExperiments, setShowAllExperiments] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Edit Profile Form State
  const [editName, setEditName] = useState(profile.name)
  const [editBio, setEditBio] = useState(profile.bio || '')
  const [editGithub, setEditGithub] = useState(profile.github || '')
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false)

  // Sync / Load from Supabase on mount
  useEffect(() => {
    const fetchSupabaseProgress = async () => {
      if (!isSupabaseConfigured || !user) return
      try {
        const { data } = await supabase
          .from('user_progress')
          .select('topic_id, completed')
          .eq('user_id', user.id)

        if (data && data.length > 0) {
          const completed = data.filter(r => r.completed).map(r => r.topic_id)
          if (completed.length > 0) {
            setCompletedExpIds(prev => Array.from(new Set([...prev, ...completed])))
          }
        }
      } catch (e) {
        console.warn('Could not query Supabase user_progress:', e)
      }
    }
    fetchSupabaseProgress()
  }, [user])

  // Calculate dynamic stats
  const totalExperiments = 9
  const completedCount = completedExpIds.length
  const remainingCount = Math.max(0, totalExperiments - completedCount)
  const progressPercent = Math.min(100, Math.round((completedCount / totalExperiments) * 100))

  // Persist Profile helper
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const initials = editName
      .split(' ')
      .filter(Boolean)
      .map(n => n[0].toUpperCase())
      .slice(0, 2)
      .join('') || 'VS'

    const updatedProfile: StudentProfile = {
      ...profile,
      name: editName,
      bio: editBio,
      github: editGithub,
      avatarInitials: initials
    }

    setProfile(updatedProfile)
    try {
      localStorage.setItem('dsalab_student_profile', JSON.stringify(updatedProfile))
    } catch {}

    // If Supabase is configured, sync to profiles table
    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: editName,
          bio: editBio,
          updated_at: new Date().toISOString()
        })
      } catch (err) {
        console.warn('Supabase profile save error:', err)
      }
    }

    setProfileSaveSuccess(true)
    setTimeout(() => {
      setProfileSaveSuccess(false)
      setEditProfileOpen(false)
    }, 800)
  }

  // Handle Experiment Status Change
  const handleSetExperimentStatus = async (expId: string, status: 'completed' | 'inprogress' | 'notstarted') => {
    const exp = EXPERIMENTS.find(e => e.id === expId)
    if (!exp) return

    let newCompleted = [...completedExpIds]
    let newInProgress = [...inProgressExpIds]

    if (status === 'completed') {
      if (!newCompleted.includes(expId)) newCompleted.push(expId)
      newInProgress = newInProgress.filter(id => id !== expId)

      // Add to recent activity
      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: `Completed Experiment ${exp.number}`,
        timestamp: 'Just now',
        type: 'completed'
      }
      setRecentActivities(prev => [newAct, ...prev.slice(0, 5)])
    } else if (status === 'inprogress') {
      newCompleted = newCompleted.filter(id => id !== expId)
      if (!newInProgress.includes(expId)) newInProgress.push(expId)

      const newAct: ActivityItem = {
        id: `act-${Date.now()}`,
        title: `Started Experiment ${exp.number}`,
        timestamp: 'Just now',
        type: 'started'
      }
      setRecentActivities(prev => [newAct, ...prev.slice(0, 5)])
    } else {
      newCompleted = newCompleted.filter(id => id !== expId)
      newInProgress = newInProgress.filter(id => id !== expId)
    }

    setCompletedExpIds(newCompleted)
    setInProgressExpIds(newInProgress)

    try {
      localStorage.setItem('dsalab_student_completed_exp', JSON.stringify(newCompleted))
      localStorage.setItem('dsalab_student_inprogress_exp', JSON.stringify(newInProgress))
      localStorage.setItem('dsalab_student_activities', JSON.stringify(recentActivities))
    } catch {}

    // Persist to Supabase if configured
    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('user_progress').upsert({
          user_id: user.id,
          topic_id: expId,
          completed: status === 'completed',
          updated_at: new Date().toISOString()
        })
      } catch (err) {
        console.warn('Supabase user_progress error:', err)
      }
    }

    setSelectedExpModal(null)
  }

  const handleLogout = async () => {
    await signOut()
    try {
      localStorage.removeItem('dsalab_user_role')
    } catch {}
    navigate('/login')
  }

  // Get status of an experiment
  const getExperimentStatus = (expId: string): 'Completed' | 'In Progress' | 'Not Started' => {
    if (completedExpIds.includes(expId)) return 'Completed'
    if (inProgressExpIds.includes(expId)) return 'In Progress'
    return 'Not Started'
  }

  // Helper for rendering custom icons matching the reference design
  const renderExpIcon = (type: Experiment['icon']) => {
    switch (type) {
      case 'code':
        return <span className="font-mono font-bold text-base">&lt;/&gt;</span>
      case 'link':
        return <span className="text-lg">🔗</span>
      case 'stack':
        return <Layers size={20} className="text-[#A8E6CF]" />
      case 'parens':
        return <span className="font-mono font-bold text-lg">( )</span>
      case 'queue':
        return <Cpu size={20} className="text-[#A8E6CF]" />
      case 'tree':
        return <Sparkles size={20} className="text-[#A8E6CF]" />
      case 'dijkstra':
        return <Zap size={20} className="text-[#A8E6CF]" />
      case 'mst':
        return <Target size={20} className="text-[#A8E6CF]" />
      case 'sort':
        return <Terminal size={20} className="text-[#A8E6CF]" />
    }
  }

  const displayedExperiments = showAllExperiments ? EXPERIMENTS : EXPERIMENTS.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#171917] selection:bg-[#A8E6CF]/50 selection:text-[#063D2E] relative font-sans">
      {/* =========================================================================
          1. TOP NAVIGATION BAR (Exact match to Reference Image)
          ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-[#F7F6F0]/90 backdrop-blur-md border-b border-[#E8EAE4] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          {/* Left: DSA LAB Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#063D2E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8E6CF" strokeWidth="1.8">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                <circle cx="9" cy="8" r="1" fill="#A8E6CF" />
                <circle cx="15" cy="8" r="1" fill="#A8E6CF" />
                <circle cx="8" cy="14" r="1" fill="#A8E6CF" />
                <circle cx="16" cy="14" r="1" fill="#A8E6CF" />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#063D2E]">
              DSA <span className="font-normal font-display italic text-[#0B513B]">LAB</span>
            </span>
          </Link>

          {/* Center Navigation Links: Dashboard (Active) | Experiments | Syllabus | About */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              to="/student/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#063D2E] text-white dark:bg-[#10B981] dark:text-[#063D2E] shadow-sm transition-all"
            >
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <div className="bg-[#A8E6CF] dark:bg-[#063D2E] rounded-[1px]" />
                <div className="bg-[#A8E6CF] dark:bg-[#063D2E] rounded-[1px]" />
                <div className="bg-[#A8E6CF] dark:bg-[#063D2E] rounded-[1px]" />
                <div className="bg-[#A8E6CF] dark:bg-[#063D2E] rounded-[1px]" />
              </div>
              <span>Dashboard</span>
            </Link>

            <a
              href="#my-experiments"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#063D2E]/80 dark:text-[#F3F4F6] hover:text-[#063D2E] dark:hover:text-[#34D399] hover:bg-[#063D2E]/5 dark:hover:bg-white/5 transition-all"
            >
              <span className="font-mono text-xs font-bold text-[#063D2E] dark:text-[#34D399]">&lt;&gt;</span>
              <span>Experiments</span>
            </a>

            <Link
              to="/syllabus"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#063D2E]/80 dark:text-[#F3F4F6] hover:text-[#063D2E] dark:hover:text-[#34D399] hover:bg-[#063D2E]/5 dark:hover:bg-white/5 transition-all"
            >
              <BookOpen size={14} className="text-[#0B513B] dark:text-[#34D399]" />
              <span>Syllabus</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#063D2E]/80 dark:text-[#F3F4F6] hover:text-[#063D2E] dark:hover:text-[#34D399] hover:bg-[#063D2E]/5 dark:hover:bg-white/5 transition-all"
            >
              <Info size={14} className="text-[#0B513B] dark:text-[#34D399]" />
              <span>About</span>
            </Link>

            {/* Three-Dot Theme Menu next to About */}
            <ThemeMenu align="right" />
          </div>

          {/* Right Actions: Theme Menu (Mobile/Desktop) + Notification Bell + Student Avatar Pill */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <ThemeMenu align="right" />
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationsOpen(o => !o)}
              className="relative p-2 rounded-xl text-[#063D2E]/80 hover:text-[#063D2E] hover:bg-[#063D2E]/5 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            </button>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(o => !o)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#E8EAE4]/60 hover:bg-[#E8EAE4] border border-[#063D2E]/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#063D2E] text-white font-serif font-bold text-xs flex items-center justify-center shadow-sm">
                  {profile.avatarInitials}
                </div>
                <ChevronDown size={14} className="text-[#063D2E]/70" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8EAE4] py-2 z-50 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="px-4 py-2.5 border-b border-[#E8EAE4]/80">
                      <p className="font-serif font-bold text-sm text-[#063D2E]">{profile.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{profile.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A8E6CF]/30 text-[#063D2E]">
                        STUDENT • {profile.rollNo}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false)
                        setEditProfileOpen(true)
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F6F0] hover:text-[#063D2E] flex items-center gap-2"
                    >
                      <Pencil size={13} className="text-[#0B513B]" />
                      <span>Edit Profile</span>
                    </button>

                    <Link
                      to="/syllabus"
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F6F0] hover:text-[#063D2E] flex items-center gap-2"
                    >
                      <BookOpen size={13} className="text-[#0B513B]" />
                      <span>View Syllabus</span>
                    </Link>

                    <div className="border-t border-[#E8EAE4]/80 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={13} />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          2. WELCOME HERO SECTION & TOP PROFILE CARD (Matching Reference Image)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-10 border-b border-[#E8EAE4]/80">
        {/* Subtle Ambient Background Flowing Ribbons (Image 2 Asset) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div
            className="absolute -inset-4 bg-cover bg-right"
            style={{
              backgroundImage: `url('/images/syllabus-hero-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'right 20% center',
              opacity: 0.28,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #F7F6F0 0%, #F7F6F0 42%, rgba(247,246,240,0.85) 65%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Student Portal Tag, Welcome Heading, Statistics Cards & Progress Bar */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.28em] text-[#0B513B] uppercase block mb-1">
                  STUDENT PORTAL
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#063D2E] tracking-tight leading-tight">
                  Welcome back, <span className="font-normal font-display italic text-[#0B513B]">{profile.name.split(' ')[0]}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  Continue your Data Structures Laboratory learning journey.
                </p>
              </div>

              {/* 3 Statistics Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                {/* Card 1: Total Experiments */}
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-[#E8EAE4] shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#063D2E] flex items-center justify-center shrink-0 border border-emerald-100">
                    <FlaskConical size={18} className="text-[#0B513B]" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl sm:text-2xl text-[#063D2E] leading-none">
                      {String(totalExperiments).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1">Total Experiments</div>
                  </div>
                </div>

                {/* Card 2: Completed */}
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-[#E8EAE4] shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#063D2E] flex items-center justify-center shrink-0 border border-emerald-100">
                    <CheckCircle2 size={18} className="text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl sm:text-2xl text-[#063D2E] leading-none">
                      {String(completedCount).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1">Completed</div>
                  </div>
                </div>

                {/* Card 3: Remaining */}
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-[#E8EAE4] shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-100">
                    <Clock size={18} className="text-amber-700" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-xl sm:text-2xl text-[#063D2E] leading-none">
                      {String(remainingCount).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1">Remaining</div>
                  </div>
                </div>
              </div>

              {/* Learning Progress Bar */}
              <div className="pt-2 max-w-xl">
                <div className="flex items-center justify-between text-xs font-semibold text-[#063D2E] mb-2">
                  <span>Learning Progress</span>
                  <span className="font-sans text-[11px] text-slate-600 font-normal">
                    <strong className="text-[#063D2E] font-semibold">{completedCount}</strong> of {totalExperiments} experiments &bull;{' '}
                    <strong className="text-[#0B513B] font-semibold">{progressPercent}%</strong>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#E8EAE4] rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0B513B] to-[#063D2E] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Floating Student Profile Card (Matching Reference Image) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#E8EAE4] shadow-[0_12px_36px_-6px_rgba(6,61,46,0.08)] hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  {/* Large Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#063D2E] text-[#A8E6CF] text-2xl font-serif font-bold flex items-center justify-center shadow-md shrink-0">
                    {profile.avatarInitials}
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-[#063D2E] truncate">
                        {profile.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#A8E6CF]/30 text-[#063D2E] border border-[#063D2E]/15">
                        {profile.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <GraduationCap size={13} className="text-[#0B513B] shrink-0" />
                      <span>Roll No : <strong className="font-mono text-[#063D2E]">{profile.rollNo}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                      <BookOpen size={13} className="text-[#0B513B] shrink-0" />
                      <span className="truncate">Course : {profile.course}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-5 pt-4 border-t border-[#E8EAE4]/80 flex justify-end">
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F7F6F0] hover:bg-[#E8EAE4] border border-[#063D2E]/15 text-[#063D2E] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Pencil size={12} className="text-[#0B513B]" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: MY EXPERIMENTS (Left) & SIDEBAR (Right)
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: MY EXPERIMENTS GRID (~8 Columns)
              ===================================================================== */}
          <div id="my-experiments" className="lg:col-span-8 space-y-6">
            {/* Section Heading */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063D2E] flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#0B513B] rounded-full inline-block" />
                  My Experiments
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                  Your practical learning activities
                </p>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E8EAE4] text-[#063D2E]">
                {completedCount} / {totalExperiments} Complete
              </span>
            </div>

            {/* Experiments 2-Column Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {displayedExperiments.map(exp => {
                const status = getExperimentStatus(exp.id)

                return (
                  <motion.div
                    key={exp.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8EAE4] shadow-sm hover:shadow-md hover:border-[#063D2E]/30 transition-all flex flex-col justify-between group"
                    whileHover={{ y: -2 }}
                  >
                    <div>
                      {/* Card Top: Icon, Title & Number, and Status Badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3">
                          {/* 3D Custom Emerald Icon */}
                          <div className="w-12 h-12 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <img
                              src={EXP_3D_ICONS[exp.id]}
                              alt={exp.shortTitle}
                              className="w-full h-full object-contain filter drop-shadow-[0_3px_8px_rgba(6,61,46,0.22)]"
                              loading="lazy"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-5 h-5 rounded-full bg-[#063D2E] text-white text-[10px] font-bold flex items-center justify-center shrink-0 font-mono">
                                {exp.number}
                              </span>
                              <h3 className="font-serif font-bold text-sm sm:text-base text-[#063D2E] leading-tight">
                                {exp.shortTitle}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-500 font-sans line-clamp-1">
                              {exp.topics}
                            </p>

                            {/* Sub-experiment Quick Selector for Exp 01 */}
                            {exp.id === 'exp-01' && (
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                {[
                                  { label: 'Recursion', id: 'recursion' },
                                  { label: 'Structure', id: 'structure' },
                                  { label: 'Pointer', id: 'pointer' }
                                ].map(sub => (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      navigate(`/student/experiment/exp-01/topic/${sub.id}`)
                                    }}
                                    className="px-2 py-0.5 rounded-md bg-[#FAF9F5] hover:bg-[#063D2E] text-[10px] font-semibold text-[#063D2E] hover:text-white border border-[#E8EAE4] transition-all cursor-pointer"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom: Status Pill + View Experiment Button */}
                    <div className="pt-3 mt-2 border-t border-[#E8EAE4]/70 flex items-center justify-between">
                      {/* Dynamic Status Badge */}
                      {status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                          <Check size={12} className="text-emerald-700" />
                          <span>Completed</span>
                        </span>
                      ) : status === 'In Progress' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-semibold">
                          <Clock size={12} className="text-sky-600" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold">
                          <Play size={10} className="text-slate-400" />
                          <span>Not Started</span>
                        </span>
                      )}

                      {/* View Experiment Button */}
                      <button
                        onClick={() => navigate(`/student/experiment/${exp.id}`)}
                        className="text-xs font-semibold text-[#063D2E] hover:text-[#0B513B] flex items-center gap-1 transition-colors cursor-pointer group/btn"
                      >
                        <span>View Experiment</span>
                        <ArrowRight size={13} className="text-[#0B513B] group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Action Strip (Matching Reference Image) */}
            <div className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#E8EAE4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <button
                onClick={() => setShowAllExperiments(v => !v)}
                className="font-bold text-[#063D2E] hover:text-[#0B513B] flex items-center gap-2 cursor-pointer"
              >
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                  <div className="bg-[#063D2E] rounded-[1px]" />
                  <div className="bg-[#063D2E] rounded-[1px]" />
                  <div className="bg-[#063D2E] rounded-[1px]" />
                  <div className="bg-[#063D2E] rounded-[1px]" />
                </div>
                <span>{showAllExperiments ? 'Show Less (First 6)' : 'View All 9 Experiments →'}</span>
              </button>

              <div className="flex items-center gap-2 text-slate-500 font-sans text-center sm:text-right">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>Dijkstra&apos;s Algorithm, Minimum Spanning Tree and Sorting Algorithms are further down...</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: SIDEBAR PANELS (~4 Columns)
              ===================================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* Panel 1: My Profile */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-4">
                <User size={15} className="text-[#0B513B]" />
                <span>My Profile</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#063D2E] text-[#A8E6CF] text-xl font-serif font-bold flex items-center justify-center shrink-0 shadow-sm">
                  {profile.avatarInitials}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#063D2E] leading-tight">
                    {profile.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{profile.course}</p>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">Roll No: {profile.rollNo}</p>
                </div>
              </div>

              <button
                onClick={() => setEditProfileOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F7F6F0] hover:bg-[#E8EAE4] border border-[#063D2E]/15 text-[#063D2E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Pencil size={13} className="text-[#0B513B]" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Panel 2: Quick Access */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-2">
                <Zap size={15} className="text-[#0B513B]" />
                <span>Quick Access</span>
              </div>

              <Link
                to="/syllabus"
                className="w-full p-3 rounded-xl bg-[#F7F6F0]/80 hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen size={15} className="text-[#0B513B]" />
                  <span>View Full Syllabus</span>
                </div>
                <ArrowRight size={13} className="text-[#0B513B] group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => {
                  const nextExp = EXPERIMENTS.find(e => !completedExpIds.includes(e.id)) || EXPERIMENTS[0]
                  navigate(`/student/experiment/${nextExp.id}`)
                }}
                className="w-full p-3 rounded-xl bg-[#F7F6F0]/80 hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Play size={14} className="text-[#0B513B]" />
                  <span>Continue Experiment</span>
                </div>
                <ArrowRight size={13} className="text-[#0B513B] group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/resources"
                className="w-full p-3 rounded-xl bg-[#F7F6F0]/80 hover:bg-[#F7F6F0] border border-[#E8EAE4] text-xs font-semibold text-[#063D2E] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink size={15} className="text-[#0B513B]" />
                  <span>Learning Resources</span>
                </div>
                <ArrowRight size={13} className="text-[#0B513B] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Panel 3: Recent Activity */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8EAE4] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#063D2E] mb-4">
                <Clock size={15} className="text-[#0B513B]" />
                <span>Recent Activity</span>
              </div>

              {recentActivities.length > 0 ? (
                <div className="space-y-3.5">
                  {recentActivities.map(act => (
                    <div key={act.id} className="flex items-start gap-3 text-xs">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.type === 'completed' ? 'bg-emerald-600' : 'bg-sky-500'}`} />
                      <div>
                        <p className="font-semibold text-[#063D2E]">{act.title}</p>
                        <p className="text-[11px] text-slate-500">{act.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-500">
                  <AlertCircle size={20} className="mx-auto mb-1 text-slate-400" />
                  <span>No recent activity recorded yet. Start your first experiment!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          4. MODAL: EDIT PROFILE (Protected Academic Fields)
          ========================================================================= */}
      <AnimatePresence>
        {editProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8EAE4] shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE4] mb-5">
                <h3 className="font-serif font-bold text-xl text-[#063D2E] flex items-center gap-2">
                  <Pencil size={18} className="text-[#0B513B]" />
                  <span>Edit Student Profile</span>
                </h3>
                <button
                  onClick={() => setEditProfileOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {profileSaveSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#063D2E] text-slate-800"
                  />
                </div>

                {/* Locked Academic Fields: Role & Roll Number (Security requirement) */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Verified Roll No</span>
                    <span className="font-mono font-bold text-[#063D2E]">{profile.rollNo}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Academic Locked</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">System Role</span>
                    <span className="font-bold text-emerald-800">{profile.role}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Faculty Assigned</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registered Course</label>
                  <input
                    type="text"
                    value={profile.course}
                    disabled
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bio / Learning Focus</label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={e => setEditBio(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#063D2E] text-slate-800"
                    placeholder="E.g. Focusing on Tree Traversals and Shortest Path Algorithms"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditProfileOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white font-semibold shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          5. MODAL: EXPERIMENT DETAIL & LAB ACTIONS
          ========================================================================= */}
      <AnimatePresence>
        {selectedExpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8EAE4] shadow-2xl relative max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#E8EAE4] mb-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                    <img
                      src={EXP_3D_ICONS[selectedExpModal.id]}
                      alt={selectedExpModal.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(6,61,46,0.2)]"
                    />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#063D2E] text-[#A8E6CF] text-xs font-mono font-bold tracking-wider">
                      EXPERIMENT {selectedExpModal.number}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#063D2E] mt-2">
                      {selectedExpModal.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">{selectedExpModal.complexity}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExpModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Topics / Syllabus Scope */}
              <div className="space-y-4 mb-6 text-xs text-slate-700">
                <div>
                  <h4 className="font-bold text-[#063D2E] uppercase tracking-wider mb-2">Syllabus Scope &amp; Deliverables:</h4>
                  <ul className="space-y-1.5">
                    {selectedExpModal.detailedTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* C Implementation Preview */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[#063D2E] uppercase tracking-wider">Reference C Implementation:</span>
                    <span className="text-[10px] text-slate-500 font-mono">GCC C99/C11</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                    {selectedExpModal.cCodeSnippet}
                  </pre>
                </div>
              </div>

              {/* Action Controls to update student progress */}
              <div className="pt-4 border-t border-[#E8EAE4] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Current Status:</span>
                  <span className="text-xs font-bold text-[#063D2E]">
                    {getExperimentStatus(selectedExpModal.id)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const expId = selectedExpModal.id
                      setSelectedExpModal(null)
                      navigate(`/student/experiment/${expId}`)
                    }}
                    className="px-4 py-2 rounded-xl bg-[#063D2E] hover:bg-[#0B513B] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Full Learning Module</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          6. NOTIFICATIONS DRAWER
          ========================================================================= */}
      <AnimatePresence>
        {notificationsOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/20 backdrop-blur-xs">
            <motion.div
              className="bg-white rounded-3xl w-full max-w-sm p-5 border border-[#E8EAE4] shadow-2xl relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE4] mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#063D2E]">
                  <Bell size={16} className="text-[#0B513B]" />
                  <span>Student Notifications</span>
                </div>
                <button onClick={() => setNotificationsOpen(false)}>
                  <X size={16} className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F6F0] border border-[#E8EAE4]">
                  <p className="font-semibold text-[#063D2E]">Data Structures Laboratory</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">Regulation N21UIT307 curriculum active. Complete your practical experiments before batch review.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Semester 3 • Academic Year 2026</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <p className="font-semibold text-emerald-900">Virtual IDE Enabled</p>
                  <p className="text-emerald-800 text-[11px] mt-0.5">All 9 experiments now support step-by-step memory pointer visualizations.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          7. FOOTER (Matching DSA LAB standard)
          ========================================================================= */}
      <footer className="mt-16 bg-[#063D2E] text-white py-10 border-t border-[#04241B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#A8E6CF]">
              <Sparkles size={16} />
            </div>
            <div className="font-serif font-bold text-lg tracking-wider">
              DSA <span className="text-[#A8E6CF] font-display italic">LAB</span>
            </div>
          </div>
          <div className="text-xs text-white/70 text-center md:text-left">
            N21UIT307 Data Structures Laboratory • Student Portal • Build Your Logic, Shape Your Future
          </div>
          <div className="text-xs text-white/45">
            &copy; 2026 Virtual Learning Platform &bull; All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
