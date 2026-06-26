// Purchase + subscription storage.
//
// REAL mode: a single Firestore document per user at `entitlements/{uid}`
//   { tutorials: ['id1', 'id2'], subscribed: false, updatedAt }
// DEMO mode: the same shape persisted in localStorage keyed by uid.

import { firebaseReady, db } from './firebase'

const demoKey = (uid) => `st_entitlements_${uid}`

const emptyEntitlements = () => ({ tutorials: [], subscribed: false })

export async function fetchEntitlements(uid) {
  if (!uid) return emptyEntitlements()

  if (firebaseReady) {
    const { doc, getDoc } = await import('firebase/firestore')
    const snap = await getDoc(doc(db, 'entitlements', uid))
    if (!snap.exists()) return emptyEntitlements()
    const data = snap.data()
    return {
      tutorials: Array.isArray(data.tutorials) ? data.tutorials : [],
      subscribed: Boolean(data.subscribed),
    }
  }

  try {
    const raw = localStorage.getItem(demoKey(uid))
    return raw ? { ...emptyEntitlements(), ...JSON.parse(raw) } : emptyEntitlements()
  } catch {
    return emptyEntitlements()
  }
}

async function persist(uid, entitlements) {
  if (firebaseReady) {
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    await setDoc(
      doc(db, 'entitlements', uid),
      { ...entitlements, updatedAt: serverTimestamp() },
      { merge: true },
    )
    return
  }
  localStorage.setItem(demoKey(uid), JSON.stringify(entitlements))
}

// Record a completed (dummy) checkout. `items` = array of product ids.
// `subscribe` = true when the subscription plan was bought.
export async function recordPurchase(uid, { items = [], subscribe = false } = {}) {
  const current = await fetchEntitlements(uid)
  const tutorials = Array.from(new Set([...current.tutorials, ...items]))
  const next = { tutorials, subscribed: current.subscribed || subscribe }
  await persist(uid, next)
  return next
}
