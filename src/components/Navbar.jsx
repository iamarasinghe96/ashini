import { useState, useEffect } from 'react'
import { site } from '../data/site'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'

const links = [
  { href: '#tutorials', label: 'Tutorials' },
  { href: '#subscription', label: 'Subscribe' },
  { href: '#classes', label: 'Classes' },
  { href: '#services', label: 'Services' },
  { href: '#suggestions', label: 'Suggestions' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { cart } = useCart()
  const { user, signInWithGoogle, signOut } = useAuth()
  const { openCart } = useUI()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? 'bg-white/85 shadow-soft backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="section flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src="/img/logo.svg" alt="" className="h-9 w-9" />
          <span className="font-display text-lg font-700 text-ink">{site.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink/80 transition hover:text-pink-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={signOut}
              className="hidden text-xs font-medium text-ink/70 hover:text-pink-dark sm:block"
              title={user.email}
            >
              Hi, {user.name?.split(' ')[0] || 'baker'} · Sign out
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="hidden text-xs font-medium text-ink/70 hover:text-pink-dark sm:block"
            >
              Sign in
            </button>
          )}

          <button
            onClick={openCart}
            className="relative rounded-full bg-pink px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-pink-dark"
            aria-label="Open cart"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-champagne-dark text-[11px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 rounded-lg p-2 text-ink md:hidden"
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="mt-1 block h-0.5 w-5 bg-ink" />
            <span className="mt-1 block h-0.5 w-5 bg-ink" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-pink/20 bg-white/95 px-5 py-3 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-pink-light"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              {user ? (
                <button
                  onClick={() => {
                    signOut()
                    setOpen(false)
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink/80 hover:bg-pink-light"
                >
                  Sign out ({user.email})
                </button>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle()
                    setOpen(false)
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink/80 hover:bg-pink-light"
                >
                  Sign in with Google
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
