import { Component, Suspense, type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import HomePage from './pages/HomePage'
import SyllabusPage from './pages/SyllabusPage'
import LabsPage from './pages/LabsPage'
import ResourcesPage from './pages/ResourcesPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './contexts/AuthContext'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('App ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#D9E1D9] shadow-xl text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#123D2C] mb-2">Display Warning</h2>
            <p className="text-sm text-gray-600 mb-4">
              {this.state.error?.message || 'A rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="bg-[#123D2C] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#1E5C3A] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-[#F8F7F2] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="font-serif text-3xl font-bold text-[#123D2C] mb-4">DSA LAB</div>
        <div className="flex gap-2 justify-center">
          <div className="w-2.5 h-2.5 bg-[#769A84] rounded-full animate-bounce" />
          <div className="w-2.5 h-2.5 bg-[#B8E8D0] rounded-full animate-bounce [animation-delay:0.15s]" />
          <div className="w-2.5 h-2.5 bg-[#123D2C] rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <SmoothScroll>
            <div className="min-h-screen bg-[#F8F7F2]">
              <Navbar />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/syllabus" element={<SyllabusPage />} />
                  <Route path="/labs" element={<LabsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </div>
          </SmoothScroll>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}
