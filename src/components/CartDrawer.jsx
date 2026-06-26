import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import { productById } from '../data/products'

export default function CartDrawer() {
  const { cart, removeFromCart, owns } = useCart()
  const { cartOpen, closeCart, openCheckout } = useUI()

  const items = cart.map(productById).filter(Boolean)
  const total = items.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity ${
          cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-champagne-light shadow-2xl transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!cartOpen}
      >
        <header className="flex items-center justify-between border-b border-pink/15 px-5 py-4">
          <h2 className="font-display text-xl font-700 text-ink">Your cart</h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-ink/60 hover:bg-pink-light"
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-ink/55">
              <div className="text-5xl">🛒</div>
              <p className="mt-3 font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm">Add a tutorial to get started.</p>
              <button onClick={closeCart} className="btn-ghost mt-5">
                Browse tutorials
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft"
                >
                  <span
                    className="flex h-14 w-14 flex-none items-center justify-center rounded-xl text-2xl"
                    style={{ background: p.accent }}
                  >
                    {p.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-600 text-ink">{p.title}</p>
                    <p className="text-sm text-ink/60">${p.price.toFixed(2)}</p>
                    {owns(p.id) && (
                      <p className="text-xs text-champagne-dark">Already owned</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="rounded-full p-2 text-ink/40 hover:bg-pink-light hover:text-pink-dark"
                    aria-label={`Remove ${p.title}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-pink/15 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-ink">
              <span className="text-sm text-ink/65">Total</span>
              <span className="font-display text-2xl font-700">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => openCheckout('tutorials')}
              className="btn-primary w-full"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-xs text-ink/50">
              You'll sign in with Google to complete your purchase.
            </p>
          </footer>
        )}
      </aside>
    </>
  )
}
