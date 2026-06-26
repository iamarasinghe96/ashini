import { testimonials } from '../data/testimonials'

function Stars({ count }) {
  return (
    <div className="text-champagne-dark" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      <span className="text-champagne-soft">{'★'.repeat(5 - count)}</span>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-pink-light/60 py-16 sm:py-24">
      <div className="section">
        <div className="mb-10 text-center">
          <p className="eyebrow">Loved by bakers</p>
          <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">
            What our customers say
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-soft"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-light text-xl">
                  {t.avatar}
                </span>
                <span>
                  <span className="block text-sm font-600 text-ink">{t.name}</span>
                  <span className="block text-xs text-ink/55">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
