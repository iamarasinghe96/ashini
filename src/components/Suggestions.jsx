import { useState } from 'react'
import { firebaseReady, db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

// Customers describe a topper they'd love to learn — the owner uses these as
// inspiration for new tutorials. Saved to Firestore ('suggestions') in real
// mode, or localStorage in demo mode.
async function saveSuggestion(payload) {
  if (firebaseReady) {
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
    await addDoc(collection(db, 'suggestions'), {
      ...payload,
      createdAt: serverTimestamp(),
    })
    return
  }
  const key = 'st_suggestions'
  const existing = JSON.parse(localStorage.getItem(key) || '[]')
  existing.push({ ...payload, createdAt: new Date().toISOString() })
  localStorage.setItem(key, JSON.stringify(existing))
}

export default function Suggestions() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', idea: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.idea.trim()) return
    setStatus('sending')
    try {
      await saveSuggestion({
        name: form.name || user?.name || 'Anonymous',
        email: form.email || user?.email || '',
        idea: form.idea.trim(),
      })
      setStatus('done')
      setForm({ name: '', email: '', idea: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="suggestions" className="section py-16 sm:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Got an idea?</p>
          <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">
            Suggest a topper
          </h2>
          <p className="mt-4 max-w-md text-ink/70">
            Dreaming of a topper you can't find a tutorial for? Tell us about it.
            We read every suggestion and turn the most-requested ideas into brand
            new tutorials — so your wish might become the next lesson on Sweet
            Toppers.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink/65">
            <li>💡 Describe the theme, colours, or event.</li>
            <li>📸 Mention any reference you have in mind.</li>
            <li>🎉 Get notified when your idea becomes a tutorial.</li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-6 shadow-soft sm:p-8"
        >
          {status === 'done' ? (
            <div className="py-10 text-center">
              <div className="text-4xl">🎉</div>
              <h3 className="mt-3 font-display text-xl font-600 text-ink">
                Thank you!
              </h3>
              <p className="mt-2 text-sm text-ink/65">
                Your idea is in. We'll use it as inspiration for upcoming tutorials.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-ghost mt-5"
                type="button"
              >
                Suggest another
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-medium text-ink/70">Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm outline-none focus:border-pink"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-ink/70">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@email.com"
                    className="mt-1 w-full rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm outline-none focus:border-pink"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-xs font-medium text-ink/70">
                  Your topper idea *
                </span>
                <textarea
                  required
                  value={form.idea}
                  onChange={update('idea')}
                  rows={4}
                  placeholder="e.g. A pastel rainbow with fondant clouds for a 1st birthday…"
                  className="mt-1 w-full resize-none rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm outline-none focus:border-pink"
                />
              </label>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-500">
                  Something went wrong — please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-5 w-full"
              >
                {status === 'sending' ? 'Sending…' : 'Send my idea'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
