import { site } from '../data/site'

export default function Services() {
  return (
    <section id="services" className="section py-16 sm:py-24">
      <div className="mb-10 text-center">
        <p className="eyebrow">What you get</p>
        <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">Our services</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-pink/15 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-light text-2xl">
              {s.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-600 text-ink">{s.title}</h3>
            <p className="mt-2 text-sm text-ink/65">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
