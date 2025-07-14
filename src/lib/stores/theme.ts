
// theme
import { writable, type Writable } from "svelte/store";
export const isDarkMode: Writable<boolean> = writable(false);

export function setupDarkMode() {
    let stored =  JSON.parse(localStorage.getItem("isDarkMode") as string);
    stored ??= window.matchMedia("(prefers-color-scheme: dark)").matches as boolean;

    isDarkMode.set(
        stored
    );

    isDarkMode.subscribe((value) => {
        localStorage.setItem("isDarkMode", JSON.stringify(value));

        value ?
            document.documentElement.classList.add("dark") :
            document.documentElement.classList.remove("dark");

    });
}

export function toggleDarkMode() {
  isDarkMode.update((current) => !current);
}

