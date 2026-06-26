import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { firebaseReady, auth, googleProvider } from '../lib/firebase'

const AuthContext = createContext(null)

const DEMO_USER_KEY = 'st_demo_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (firebaseReady) {
      let unsub = () => {}
      // Lazy-load auth listener only in real mode.
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        unsub = onAuthStateChanged(auth, (u) => {
          setUser(
            u
              ? { uid: u.uid, name: u.displayName, email: u.email, photo: u.photoURL }
              : null,
          )
          setLoading(false)
        })
      })
      return () => unsub()
    }

    // Demo mode: restore mock session from localStorage.
    try {
      const saved = localStorage.getItem(DEMO_USER_KEY)
      if (saved) setUser(JSON.parse(saved))
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (firebaseReady) {
      const { signInWithPopup } = await import('firebase/auth')
      await signInWithPopup(auth, googleProvider)
      return
    }
    // Demo mode: simulate a Google account.
    const demoUser = {
      uid: 'demo-' + Math.random().toString(36).slice(2, 9),
      name: 'Demo Baker',
      email: 'demo.baker@gmail.com',
      photo: '',
      demo: true,
    }
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }, [])

  const signOut = useCallback(async () => {
    if (firebaseReady) {
      const { signOut: fbSignOut } = await import('firebase/auth')
      await fbSignOut(auth)
      return
    }
    localStorage.removeItem(DEMO_USER_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, isDemo: !firebaseReady, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
