
import { createClient } from '@supabase/supabase-js'

// Fallback values for development - these will be replaced by actual values when Supabase is properly configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if we have real values
const hasValidConfig = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey !== 'placeholder-key'

export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => hasValidConfig
