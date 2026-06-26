import { site } from '../data/site'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

export default function Subscription() {
  const { entitlements } = useCart()
  const { openCheckout } = useUI()
  const { subscription } = site

  return (
    <section
      id="subscription"
      className="bg-gradient-to-br from-pink to-pink-dark py-16 text-white sm:py-24"
    >
      <div className="section grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Best value
          </p>
          <h2 className="mt-2 text-3xl font-700 sm:text-4xl">
            Unlock every tutorial
          </h2>
          <p className="mt-4 max-w-md text-white/85">
            Love more than one topper? The subscription gives you the entire
            library — including everything we add in the future — for one simple
            monthly price.
          </p>
          <ul className="mt-6 space-y-2">
            {subscription.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-white/90">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white/95 p-8 text-ink shadow-soft">
          <p className="text-sm font-medium text-pink-dark">Subscription</p>
          <div className="mt-2 flex items-end gap-1">
            <span className="font-display text-5xl font-700">
              ${subscription.price}
            </span>
            <span className="mb-2 text-ink/60">/ {subscription.period}</span>
          </div>
          <p className="mt-2 text-sm text-ink/60">
            Cancel anytime. Way cheaper than buying every tutorial separately.
          </p>
          {entitlements.subscribed ? (
            <div className="mt-6 rounded-full bg-champagne-light py-3 text-center text-sm font-semibold text-champagne-dark">
              ✓ You are subscribed — enjoy the library!
            </div>
          ) : (
            <button
              onClick={() => openCheckout('subscription')}
              className="btn-primary mt-6 w-full"
            >
              Subscribe now
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
