import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Subscription from './components/Subscription'
import ClassSection from './components/ClassSection'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Suggestions from './components/Suggestions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import TutorialModal from './components/TutorialModal'
import DemoBanner from './components/DemoBanner'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <DemoBanner />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Subscription />
        <ClassSection />
        <Services />
        <Testimonials />
        <Suggestions />
        <Contact />
      </main>
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <TutorialModal />
    </div>
  )
}
