import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'
import { productById } from '../data/products'
import { site } from '../data/site'

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div onClick={onClose} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-md sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-pink/15 px-6 py-4">
          <h2 className="font-display text-lg font-700 text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-ink/50 hover:bg-pink-light"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

// Faux Google button — triggers real Google popup in live mode, mock in demo.
function GoogleButton({ onClick, busy }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-medium text-ink shadow-sm transition hover:border-pink hover:shadow-soft disabled:opacity-60"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.4 5.1 29.5 3 24 3 16 3 9.1 7.5 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.2 35.9 26.7 37 24 37c-5.3 0-9.7-2.6-11.3-7l-6.5 5C9.1 40.4 16 45 24 45z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C40.9 35.6 45 30.4 45 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
      {busy ? 'Connecting…' : 'Continue with Google'}
    </button>
  )
}

export default function CheckoutModal() {
  const { checkoutOpen, checkoutPlan, closeCheckout } = useUI()
  const { user, signInWithGoogle } = useAuth()
  const { cart, completeCheckout } = useCart()

  const [busy, setBusy] = useState(false)
  const [step, setStep] = useState('pay') // 'pay' | 'success'
  const [error, setError] = useState('')

  const isSubscription = checkoutPlan === 'subscription'
  const items = isSubscription ? [] : cart.map(productById).filter(Boolean)
  const total = isSubscription
    ? site.subscription.price
    : items.reduce((sum, p) => sum + p.price, 0)

  // Reset to first step each time the modal opens.
  useEffect(() => {
    if (checkoutOpen) {
      setStep('pay')
      setError('')
      setBusy(false)
    }
  }, [checkoutOpen])

  if (!checkoutOpen) return null

  const handleLogin = async () => {
    setBusy(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (e) {
      setError('Sign-in was cancelled or failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const handlePay = async () => {
    setBusy(true)
    setError('')
    try {
      // ---- DUMMY PAYWALL ----
      // Real payment integration (Stripe / PayHere / etc.) goes here.
      // For now we simulate a successful payment after a short delay.
      await new Promise((r) => setTimeout(r, 1200))
      await completeCheckout({ subscribe: isSubscription })
      setStep('success')
    } catch (e) {
      setError('Payment could not be completed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  // STEP 1: must be signed in (checkout only asks for login).
  if (!user) {
    return (
      <Modal onClose={closeCheckout} title="Sign in to continue">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-light text-3xl">
            🔐
          </div>
          <p className="mt-4 text-sm text-ink/70">
            Almost there! Sign in with your Google account so we can save your
            tutorials to your library and unlock them after payment.
          </p>
          <div className="mt-6">
            <GoogleButton onClick={handleLogin} busy={busy} />
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <p className="mt-4 text-xs text-ink/45">
            We only use your account to identify your purchases.
          </p>
        </div>
      </Modal>
    )
  }

  // STEP 3: success.
  if (step === 'success') {
    return (
      <Modal onClose={closeCheckout} title="Payment complete">
        <div className="py-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne-light text-3xl">
            🎉
          </div>
          <h3 className="mt-4 font-display text-xl font-700 text-ink">
            You're all set!
          </h3>
          <p className="mt-2 text-sm text-ink/70">
            {isSubscription
              ? 'Your subscription is active — every tutorial is now unlocked.'
              : 'Your tutorial is unlocked. Find it in the tutorials section and hit “Watch”.'}
          </p>
          <button onClick={closeCheckout} className="btn-primary mt-6 w-full">
            Watch my tutorials
          </button>
        </div>
      </Modal>
    )
  }

  // STEP 2: dummy paywall.
  const nothingToBuy = !isSubscription && items.length === 0

  return (
    <Modal onClose={closeCheckout} title={isSubscription ? 'Subscribe' : 'Checkout'}>
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-champagne-light/60 p-3 text-sm">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-base">
          👤
        </span>
        <div className="min-w-0">
          <p className="truncate font-600 text-ink">{user.name}</p>
          <p className="truncate text-xs text-ink/55">{user.email}</p>
        </div>
      </div>

      {/* Order summary */}
      <div className="rounded-2xl border border-pink/15 p-4">
        {isSubscription ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-600 text-ink">Sweet Toppers Subscription</p>
              <p className="text-xs text-ink/55">
                All tutorials · billed monthly · cancel anytime
              </p>
            </div>
            <span className="font-600 text-ink">${site.subscription.price}</span>
          </div>
        ) : nothingToBuy ? (
          <p className="text-center text-sm text-ink/55">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/80">
                  <span>{p.emoji}</span>
                  {p.title}
                </span>
                <span className="text-ink/70">${p.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex items-center justify-between border-t border-pink/15 pt-3">
          <span className="text-sm font-medium text-ink">Total</span>
          <span className="font-display text-xl font-700 text-ink">
            ${total.toFixed(2)}
            {isSubscription && (
              <span className="text-sm font-400 text-ink/50">/mo</span>
            )}
          </span>
        </div>
      </div>

      {/* Dummy card form (non-functional placeholder until real provider added) */}
      <div className="mt-4 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
          Payment details (demo)
        </p>
        <input
          disabled
          placeholder="Card number ···· ···· ···· 4242"
          className="w-full rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm text-ink/50"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            disabled
            placeholder="MM / YY"
            className="w-full rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm text-ink/50"
          />
          <input
            disabled
            placeholder="CVC"
            className="w-full rounded-xl border border-pink/20 bg-champagne-light/40 px-4 py-2.5 text-sm text-ink/50"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button
        onClick={handlePay}
        disabled={busy || nothingToBuy}
        className="btn-primary mt-5 w-full"
      >
        {busy
          ? 'Processing…'
          : isSubscription
            ? `Subscribe · $${total.toFixed(2)}/mo`
            : `Pay $${total.toFixed(2)}`}
      </button>
      <p className="mt-2 text-center text-xs text-ink/45">
        🔒 This is a placeholder paywall — no real charge is made yet.
      </p>
    </Modal>
  )
}
