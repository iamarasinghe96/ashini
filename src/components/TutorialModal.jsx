import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

// Plays the full YouTube tutorial. The video URL is ONLY rendered when the
// signed-in user actually owns the tutorial (or is subscribed).
export default function TutorialModal() {
  const { activeTutorial, closeTutorial } = useUI()
  const { owns } = useCart()

  if (!activeTutorial) return null

  const product = activeTutorial
  const allowed = owns(product.id)
  const youtubeUrl = `https://www.youtube.com/watch?v=${product.youtubeId}`

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={closeTutorial} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-pink/15 px-5 py-3">
          <h2 className="font-display text-lg font-700 text-ink">
            {product.emoji} {product.title}
          </h2>
          <button
            onClick={closeTutorial}
            className="rounded-full p-2 text-ink/50 hover:bg-pink-light"
            aria-label="Close player"
          >
            ✕
          </button>
        </div>

        {allowed ? (
          <>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${product.youtubeId}?rel=0`}
                title={product.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm text-ink/65">
              <span>🔓 Unlocked — thanks for your purchase!</span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-pink-dark hover:underline"
              >
                Open on YouTube ↗
              </a>
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl">🔒</div>
            <p className="mt-3 font-medium text-ink">This tutorial is locked</p>
            <p className="mt-1 text-sm text-ink/60">
              Purchase this tutorial or subscribe to watch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
