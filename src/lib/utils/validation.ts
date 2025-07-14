/**
 * Validate email format
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate quantity
 */
export function isValidQuantity(quantity: number) {
  return Number.isInteger(quantity) && quantity > 0
}

/**
 * Sanitize input string
 */
export function sanitizeString(str: string) {
  return str.trim().replace(/[<>]/g, "")
}
