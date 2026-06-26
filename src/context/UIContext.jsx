import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  // Which tutorial's player is open (product object) or null.
  const [activeTutorial, setActiveTutorial] = useState(null)
  // Pre-select subscription plan when opening checkout.
  const [checkoutPlan, setCheckoutPlan] = useState('tutorials') // 'tutorials' | 'subscription'

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const openCheckout = useCallback((plan = 'tutorials') => {
    setCheckoutPlan(plan)
    setCartOpen(false)
    setCheckoutOpen(true)
  }, [])
  const closeCheckout = useCallback(() => setCheckoutOpen(false), [])

  const openTutorial = useCallback((product) => setActiveTutorial(product), [])
  const closeTutorial = useCallback(() => setActiveTutorial(null), [])

  const value = useMemo(
    () => ({
      cartOpen,
      openCart,
      closeCart,
      checkoutOpen,
      checkoutPlan,
      openCheckout,
      closeCheckout,
      activeTutorial,
      openTutorial,
      closeTutorial,
    }),
    [
      cartOpen,
      openCart,
      closeCart,
      checkoutOpen,
      checkoutPlan,
      openCheckout,
      closeCheckout,
      activeTutorial,
      openTutorial,
      closeTutorial,
    ],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
