import { site } from '../data/site'

export default function ClassSection() {
  const { classOffering: cls } = site

  return (
    <section id="classes" className="bg-champagne-light py-16 sm:py-24">
      <div className="section">
        <div className="mb-10 text-center">
          <p className="eyebrow">{cls.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">{cls.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink/70">{cls.intro}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cls.benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-pink/15 bg-white p-6 shadow-soft transition hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-light text-2xl">
                {b.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-600 text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-pink to-pink-dark p-8 text-center text-white shadow-soft sm:p-10">
          <h3 className="font-display text-2xl font-700">
            Ready to get your hands a little floury?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-white/85">
            Classes run in small groups and book out fast. Get in touch to check
            upcoming dates and reserve your spot.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn bg-white text-pink-dark hover:bg-champagne-light">
              {cls.ctaLabel}
            </a>
            {cls.price != null && (
              <span className="text-sm text-white/90">
                From <span className="font-700">${cls.price}</span> per class
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
