<script>
  import { isDarkMode, setupDarkMode, toggleDarkMode } from "$lib/stores/theme";
  import { Moon, Sun } from "lucide-svelte";
  import { scale } from "svelte/transition";

  $effect(() => {
    setupDarkMode();
  });
</script>

<button onclick={toggleDarkMode} aria-label="Toggle theme">
  <div class="hidden">
    <Moon size={20} />
  </div>

  {#if $isDarkMode}
    <div class="icon" transition:scale>
      <Moon size={20} />
    </div>
  {:else}
    <div class="icon" transition:scale>
      <Sun size={20} />
    </div>
  {/if}
</button>

<style>
  button {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    transition: var(--transition);

    position: relative;
  }

  button:hover {
    background: var(--background-light);
  }

  .icon {
    position: absolute;
    /* centeded */
    top: 50%;
    left: 50%;

    transform: translateX(-50%) translateY(-50%);
  }

  .hidden {
    opacity: 0;
  }
</style>
