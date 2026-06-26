import { useAuth } from '../context/AuthContext'

// Small notice shown only while running without Firebase config.
export default function DemoBanner() {
  const { isDemo } = useAuth()
  if (!isDemo) return null
  return (
    <div className="bg-ink/90 px-4 py-1.5 text-center text-[11px] font-medium text-champagne-light">
      Demo mode — login &amp; purchases are simulated locally. Add your Firebase
      config to go live.
    </div>
  )
}
