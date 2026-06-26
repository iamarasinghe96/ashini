import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from './AuthContext'
import { fetchEntitlements, recordPurchase } from '../lib/purchases'

const CartContext = createContext(null)
const CART_KEY = 'st_cart'

export function CartProvider({ children }) {
  const { user } = useAuth()

  // Cart is a list of product ids (each tutorial bought once).
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // Entitlements = what the signed-in user already owns.
  const [entitlements, setEntitlements] = useState({ tutorials: [], subscribed: false })
  const [loadingEntitlements, setLoadingEntitlements] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // Refresh entitlements whenever the user changes.
  useEffect(() => {
    let active = true
    if (!user) {
      setEntitlements({ tutorials: [], subscribed: false })
      return
    }
    setLoadingEntitlements(true)
    fetchEntitlements(user.uid).then((e) => {
      if (active) {
        setEntitlements(e)
        setLoadingEntitlements(false)
      }
    })
    return () => {
      active = false
    }
  }, [user])

  const owns = useCallback(
    (productId) => entitlements.subscribed || entitlements.tutorials.includes(productId),
    [entitlements],
  )

  const inCart = useCallback((productId) => cart.includes(productId), [cart])

  const addToCart = useCallback(
    (productId) => {
      setCart((prev) => (prev.includes(productId) ? prev : [...prev, productId]))
    },
    [],
  )

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((id) => id !== productId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // Called after the dummy paywall "completes". Persists entitlements.
  const completeCheckout = useCallback(
    async ({ subscribe = false } = {}) => {
      if (!user) throw new Error('Must be signed in to checkout')
      const next = await recordPurchase(user.uid, {
        items: subscribe ? [] : cart,
        subscribe,
      })
      setEntitlements(next)
      clearCart()
      return next
    },
    [user, cart, clearCart],
  )

  const value = useMemo(
    () => ({
      cart,
      entitlements,
      loadingEntitlements,
      owns,
      inCart,
      addToCart,
      removeFromCart,
      clearCart,
      completeCheckout,
    }),
    [
      cart,
      entitlements,
      loadingEntitlements,
      owns,
      inCart,
      addToCart,
      removeFromCart,
      clearCart,
      completeCheckout,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
