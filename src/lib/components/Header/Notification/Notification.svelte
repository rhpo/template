<script lang="ts">
  import type { Snippet } from "svelte";
  import View from "$lib/components/ui/View.svelte";
  import {
    closeNotification,
    notificationOpen,
  } from "$lib/stores/notification";

  interface Props {
    message: string;
    onClose?: () => void;
    children?: Snippet;
  }

  let { message, onClose = () => {}, children }: Props = $props();

  let scrollState = $state("down");
  $effect(() => {
    let lastScrollY = window.scrollY;
    const epsilon = 10;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      scrollState =
        currentScrollY > lastScrollY + epsilon
          ? "up"
          : currentScrollY < lastScrollY - epsilon
            ? "down"
            : scrollState;

      notificationOpen.set(scrollState === "down" ? true : false);

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function close() {
    closeNotification();
    onClose();
  }

  // set html.notification-open globally
  $effect(() => {
    if ($notificationOpen) {
      document.documentElement.classList.add("notification-open");
    } else {
      document.documentElement.classList.remove("notification-open");
    }
  });
</script>

<main
  class:closed={!$notificationOpen}
  style="height: {scrollState === 'down' ? 'var(--notification-height)' : '0'};"
>
  <View>
    <div class="stretch">
      <div></div>

      {#if children}
        {@render children?.()}
      {:else}
        <p>{message}</p>
      {/if}

      <button onclick={close} aria-label="Fermer la notification">
        &times;
      </button>
    </div>
  </View>
</main>

<style>
  :root {
    --button-width: calc(var(--notification-height) - 16px);
  }

  div,
  button {
    width: var(--button-width);
  }

  main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--primary-color);
    color: var(--background-color);

    transition: all var(--transition-duration) var(--transition-easing);
    overflow: hidden;
  }

  main.closed {
    height: 0 !important; /* Set height to 0 when closed */
  }

  p {
    font-size: 0.7rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
  }

  .stretch {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    aspect-ratio: 1;
    background: transparent;
    border: none;
    color: var(--background-color);
    font-size: 24px;
    cursor: pointer;

    transition: color var(--transition-duration) var(--transition-easing);
  }

  button:hover {
    color: red;
  }
</style>
