import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-champagne-light">
      <div className="section flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <img src="/img/logo.svg" alt="" className="h-8 w-8" />
          <span className="font-display text-lg font-700">{site.name}</span>
        </div>
        <p className="text-sm text-champagne-light/70">
          © {new Date().getFullYear()} {site.name}. Made with 💗 for cake lovers.
        </p>
        <div className="flex gap-4 text-sm">
          <a href={site.contact.socials.instagram} className="hover:text-pink" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.contact.socials.facebook} className="hover:text-pink" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={site.contact.socials.tiktok} className="hover:text-pink" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  )
}
