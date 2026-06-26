import { site } from '../data/site'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-b from-pink-light via-champagne-light to-champagne-light"
    >
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-soft/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-champagne-soft/60 blur-3xl" />

      <div className="section grid items-center gap-10 py-16 sm:py-24 md:grid-cols-2">
        <div className="animate-fade-in-up">
          <p className="eyebrow mb-3">Handmade cake toppers · video tutorials</p>
          <h1 className="text-4xl font-700 leading-tight text-ink sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#tutorials" className="btn-primary">
              Browse tutorials
            </a>
            <a href="#subscription" className="btn-ghost">
              See subscription
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-ink/60">
            <span>⭐ 4.9 average rating</span>
            <span>🎂 6+ tutorials</span>
          </div>
        </div>

        {/* Logo / brand card */}
        <div className="animate-fade-in-up">
          <div className="mx-auto max-w-sm rounded-3xl bg-white/70 p-8 text-center shadow-soft backdrop-blur">
            <img src="/img/logo.svg" alt={site.name} className="mx-auto h-24 w-24" />
            <h2 className="mt-4 font-display text-2xl font-700 text-ink">{site.name}</h2>
            <p className="mt-2 text-sm text-ink/60">
              Buy a single tutorial, or subscribe for the whole library.
            </p>
            <div className="mt-6 flex justify-center gap-3 text-3xl">
              <span>🌸</span>
              <span>👑</span>
              <span>🦋</span>
              <span>🌹</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
