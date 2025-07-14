import { writable } from "svelte/store";

export const notificationOpen = writable(true);
export function closeNotification() {
  notificationOpen.set(false);

  document.documentElement.style.setProperty(
    "--notification-height",
    "0px"
  );
}
