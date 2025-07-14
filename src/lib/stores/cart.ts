import type { Cart, CartItem } from "$lib/types"
import { writable, type Writable } from "svelte/store"

// Cart store for managing shopping cart state
export const cart: Writable<Cart> = writable([])
export const isCartOpen: Writable<boolean> = writable(false)

/**
 * Loads and synchronizes the shopping cart from local storage.
 */
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


/**
 * Toggles the cart open state.
 */
export function toggleCart() {
  isCartOpen.update((open) => !open)
}

/**
 * Closes the shopping cart by setting `isCartOpen` to false.
 */
export function closeCart() {
  isCartOpen.set(false)
}

/**
 * Opens the shopping cart by setting `isCartOpen` to true.
 */
export function openCart() {
  isCartOpen.set(true)
}

/**
 * Updates the quantity of a specified product in the cart.
 */
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

/**
 * Updates the shopping cart by adding or updating a cart item.
 *
 * This function checks if the specified `cartItem` already exists in the cart.
 * If it does, it increments the quantity of the existing item by the quantity of the new item.
 * If it doesn't exist, it adds the new item to the cart.
 *
 * @param {CartItem} cartItem - The cart item to be added or updated.
 */
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

/**
 * Removes a product from the cart by its ID.
 */
export function removeFromCart(productId: string) {
  cart.update((items: Cart) => items.filter((item: CartItem) => item.id !== productId))
}


/**
 * Clears all items from the cart.
 */
export function clearCart() {
  cart.set([])
}
