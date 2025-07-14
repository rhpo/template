import type { Cart, CartItem } from "$lib/types"
import { writable, type Writable } from "svelte/store"

// Cart store for managing shopping cart state
export const cart: Writable<Cart> = writable([])
export const isCartOpen: Writable<boolean> = writable(false)

export function loadCart() {
  const storedCart = localStorage.getItem("cart")
  if (storedCart) {
    const parsedCart: Cart = JSON.parse(storedCart)
    cart.set(parsedCart)
  }

  cart.subscribe((items) => {
    localStorage.setItem("cart", JSON.stringify(items))
  })
}


export function toggleCart() {
  isCartOpen.update((open) => !open)
}

export function closeCart() {
  isCartOpen.set(false)
}

export function openCart() {
  isCartOpen.set(true)
}

export function updateQuantity(productId: string, delta: number) {
  cart.update((items: Cart) =>
    items
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0)
  )
}

export function addToCart(cartItem: CartItem) {
  cart.update((items: Cart) => {
    const existingItem = items.find((item) => item.id === cartItem.id)

    if (existingItem) {
      existingItem.quantity += cartItem.quantity
      return items
    } else {
      return [...items, cartItem]
    }
  })
}

export function removeFromCart(productId: string) {
  cart.update((items: Cart) => items.filter((item: CartItem) => item.id !== productId))
}


export function clearCart() {
  cart.set([])
}
