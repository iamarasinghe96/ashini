import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

// Looping 3s preview. Falls back to a gradient + emoji placeholder when the
// mp4 file is missing (so the card always looks good before assets are added).
function PreviewMedia({ product }) {
  const [failed, setFailed] = useState(false)
  const videoRef = useRef(null)

  if (product.video && !failed) {
    return (
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={product.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${product.accent} 0%, #FBF5EA 100%)`,
      }}
    >
      <span className="text-6xl drop-shadow-sm">{product.emoji}</span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const { owns, inCart, addToCart, removeFromCart } = useCart()
  const { openTutorial } = useUI()

  const owned = owns(product.id)
  const added = inCart(product.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <PreviewMedia product={product} />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          ${product.price.toFixed(2)}
        </span>
        {owned && (
          <span className="absolute right-3 top-3 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-white">
            Owned
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-600 text-ink">{product.title}</h3>
        <p className="mt-1 flex-1 text-sm text-ink/65">{product.blurb}</p>

        <div className="mt-4">
          {owned ? (
            <button
              onClick={() => openTutorial(product)}
              className="btn-champagne w-full"
            >
              ▶ Watch tutorial
            </button>
          ) : added ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="btn-ghost w-full"
            >
              ✓ In cart · Remove
            </button>
          ) : (
            <button
              onClick={() => addToCart(product.id)}
              className="btn-primary w-full"
            >
              Add to cart · ${product.price.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
