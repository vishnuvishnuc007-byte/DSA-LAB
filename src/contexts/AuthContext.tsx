import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  completedTopics: string[]
  markTopicComplete: (topicId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsalab_completed_topics')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        if (session?.user) {
          await loadProgress(session.user.id)
        }
      })
      return () => subscription.unsubscribe()
    } catch (e) {
      console.warn('Supabase auth listener setup failed:', e)
      setLoading(false)
    }
  }, [])

  const loadProgress = async (userId: string) => {
    if (!isSupabaseConfigured) return
    try {
      const { data } = await supabase
        .from('user_progress')
        .select('topic_id')
        .eq('user_id', userId)
        .eq('completed', true)
      if (data) {
        setCompletedTopics(data.map(r => r.topic_id))
      }
    } catch (e) {
      console.warn('Progress load failed:', e)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Local mock login for demo
      const mockUser = { id: 'demo-user', email } as unknown as User
      setUser(mockUser)
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error as Error | null }
  }

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const mockUser = { id: 'demo-user', email } as unknown as User
      setUser(mockUser)
      return { error: null }
    }
    const { error } = await supabase.auth.signUp({ email, password })
    return { error: error as Error | null }
  }

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setSession(null)
  }

  const markTopicComplete = async (topicId: string) => {
    setCompletedTopics(prev => {
      const updated = [...new Set([...prev, topicId])]
      try {
        localStorage.setItem('dsalab_completed_topics', JSON.stringify(updated))
      } catch {}
      return updated
    })

    if (user && isSupabaseConfigured) {
      try {
        await supabase.from('user_progress').upsert({
          user_id: user.id,
          topic_id: topicId,
          completed: true,
          updated_at: new Date().toISOString(),
        })
      } catch (e) {
        console.warn('Progress save to Supabase failed:', e)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, completedTopics, markTopicComplete }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
