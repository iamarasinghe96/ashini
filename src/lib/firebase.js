// Firebase bootstrap.
//
// The app works in two modes:
//   1. REAL mode  — when all VITE_FIREBASE_* env vars are present, we init the
//      real Firebase SDK (Google sign-in + Firestore purchases).
//   2. DEMO mode  — when they are missing, `firebaseReady` is false and the rest
//      of the app falls back to a localStorage-based mock so the whole flow
//      (login → checkout → unlock tutorial) can be previewed without a backend.
//
// To go live: copy .env.example to .env, fill in your Firebase web config,
// and restart `npm run dev`.

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseReady = Boolean(config.apiKey && config.projectId && config.appId)

let app = null
let auth = null
let db = null
let googleProvider = null

if (firebaseReady) {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
} else {
  // eslint-disable-next-line no-console
  console.info(
    '[Sweet Toppers] Running in DEMO mode (no Firebase config). ' +
      'Login & purchases are simulated with localStorage. ' +
      'Add VITE_FIREBASE_* env vars to enable real auth.',
  )
}

export { auth, db, googleProvider }
