
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to empty strings if not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if URL and key are available
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Graceful fallback if supabase client is not configured
// This will be used as a placeholder for methods that require the supabase client
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    // Return a mock client with no-op methods for safety
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error('Supabase not configured') })
          }),
          async get() {
            return { data: [], error: new Error('Supabase not configured') };
          }
        })
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      },
      auth: {
        signIn: async () => ({ user: null, session: null, error: new Error('Supabase not configured') }),
        signUp: async () => ({ user: null, session: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null })
      }
    };
  }
  return supabase;
};

export default supabase;
