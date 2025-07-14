import { writable } from "svelte/store";

export const mobileMenuOpen = writable(false);

/**
 * Toggles the state of the mobile menu open/closed.
 */
export function toggleMobileMenu() {
    mobileMenuOpen.update((open) => !open);
}

/**
 * Closes the mobile menu by setting its open state to false.
 */
export function closeMobileMenu() {
    mobileMenuOpen.set(false);
}

/**
 * Sets the mobile menu state to open.
 */
export function openMobileMenu() {
    mobileMenuOpen.set(true);
}
