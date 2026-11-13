import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  rawUrl && rawKey && rawUrl.startsWith('http') && !rawUrl.includes('your-project-id')
)

const supabaseUrl = isSupabaseConfigured ? rawUrl : 'https://demo-dsa-lab.supabase.co'
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'demo-anon-key-placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          topic_id: string
          completed?: boolean
        }
        Update: {
          completed?: boolean
          updated_at?: string
        }
      }
    }
  }
}
