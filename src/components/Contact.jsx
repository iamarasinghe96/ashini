import { site } from '../data/site'

const Icon = ({ children }) => (
  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-light text-xl transition group-hover:bg-pink group-hover:text-white">
    {children}
  </span>
)

export default function Contact() {
  const { contact } = site
  const waNumber = contact.whatsapp.replace(/[^\d]/g, '')

  const items = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: '✉️',
    },
    {
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
      icon: '📞',
    },
    {
      label: 'WhatsApp',
      value: 'Chat with us',
      href: `https://wa.me/${waNumber}`,
      icon: '💬',
    },
    {
      label: 'Instagram',
      value: '@sweettoppers',
      href: contact.socials.instagram,
      icon: '📸',
    },
    {
      label: 'Facebook',
      value: 'Sweet Toppers',
      href: contact.socials.facebook,
      icon: '👍',
    },
    {
      label: 'TikTok',
      value: '@sweettoppers',
      href: contact.socials.tiktok,
      icon: '🎵',
    },
  ]

  return (
    <section id="contact" className="bg-champagne-light py-16 sm:py-24">
      <div className="section">
        <div className="mb-10 text-center">
          <p className="eyebrow">Say hello</p>
          <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">Get in touch</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/65">
            Questions about a tutorial or a custom request? Reach us on any of these.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition hover:-translate-y-0.5"
            >
              <Icon>{item.icon}</Icon>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-ink/50">
                  {item.label}
                </span>
                <span className="block text-sm font-600 text-ink">{item.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
