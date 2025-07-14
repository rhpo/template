import { writable } from "svelte/store";

export const isFormOpen = writable(false);

/**
 * Toggles the form's open/close state.
 */
export function toggleForm() {
    isFormOpen.update((open) => !open);
}

/**
 * Closes the form by setting `isFormOpen` to false.
 */
export function closeForm() {
    isFormOpen.set(false);
}

/**
 * Opens the form by setting `isFormOpen` to true.
 */
export function openForm() {
    isFormOpen.set(true);
}
