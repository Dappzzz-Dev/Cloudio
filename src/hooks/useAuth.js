import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If Supabase is not configured, skip auth check entirely
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let mounted = true

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      })
      .catch(() => {
        // Auth failed silently — just set loading false
        if (mounted) setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        if (session?.user) setIsGuest(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Vercel.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setIsGuest(false)
  }

  const signUp = async (email, password, fullName) => {
    if (!isSupabaseConfigured) throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Vercel.')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw error
  }

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {})
    }
    setUser(null)
    setIsGuest(false)
  }

  const enterAsGuest = () => {
    setIsGuest(true)
    setUser(null)
  }

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) throw new Error('Supabase belum dikonfigurasi.')
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  return {
    user,
    isGuest,
    loading,
    isLoggedIn: !!user,
    isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    enterAsGuest,
    resetPassword,
  }
}
