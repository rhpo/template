import { writable } from "svelte/store";

export const isFormOpen = writable(false);

export function toggleForm() {
    isFormOpen.update((open) => !open);
}

export function closeForm() {
    isFormOpen.set(false);
}

export function openForm() {
    isFormOpen.set(true);
}
