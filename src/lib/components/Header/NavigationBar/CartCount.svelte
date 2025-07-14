<script>
  import { ShoppingCart } from "lucide-svelte";
  import { cart, isCartOpen, toggleCart } from "$lib/stores/cart";
  import { blur } from "svelte/transition";
</script>

<button onclick={toggleCart} aria-label="Panier" class:open={$isCartOpen}>
  {#if $cart.length > 0}
    <span class="count" transition:blur>{$cart.length}</span>
  {/if}

  <div class="icon">
    <ShoppingCart size={22} />
  </div>
</button>

<style>
  .icon {
    transform: translate(-1px, 1px);
  }

  button {
    position: relative;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius);

    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    background: var(--background-light);
  }

  button.open {
    background: var(--accent-color);
    color: var(--background-color);
  }

  .count {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--accent-color);
    color: var(--background-color);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.125rem 0.375rem;
    border-radius: 1rem;
    min-width: 1.25rem;
    text-align: center;

    z-index: 2;
  }
</style>
