<script lang="ts">
  import Separator from "../ui/Separator.svelte";
  import CartItem from "./CartItem.svelte";
  import Portal from "svelte-portal";
  import Button from "../ui/Button.svelte";
  import Form from "../ui/Form.svelte";

  import { cart, closeCart, isCartOpen, loadCart } from "$lib/stores/cart";
  import { ShoppingCart, X } from "lucide-svelte";
  import { formatPrice } from "$lib/utils/currency";
  import { blur } from "svelte/transition";
  import { openForm } from "$lib/stores/form";

  interface Props {
    view: "desktop" | "mobile";
  }

  let { view = "desktop" }: Props = $props();

  $effect(() => {
    if ($cart.length === 0) {
      closeCart();
    }
  });

  $effect(() => {
    loadCart();
  });
</script>

<main class:open={$isCartOpen} data-view={view}>
  <h1 class="title">Panier <ShoppingCart size={28} /></h1>

  {#if $cart.length <= 0}
    <div class="center">
      <div class="content-center">
        <X size={48} />
        <h2 class="empty">Votre panier est vide.</h2>
      </div>
    </div>
  {:else}
    <div class="cart">
      <div class="content" transition:blur>
        {#each $cart as item (item.id)}
          <CartItem {item} />
        {/each}
      </div>

      <Separator space="0.5rem" />

      <div class="total">
        <span
          >{formatPrice(
            $cart.reduce((acc, item) => acc + item.price.new * item.quantity, 0)
          )}</span
        >
      </div>

      <div class="actions">
        <Button variant="primary" fullWidth onclick={() => openForm()}>
          Passer commande
        </Button>
      </div>
    </div>
  {/if}
</main>

<Portal target="body">
  <Form />
</Portal>

<style>
  .cart {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    overflow-x: hidden;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: sticky;
    top: var(--navbar-height);
    left: 0;

    height: calc(100svh - var(--navbar-height));
    width: 0;
    overflow: hidden;
    background-color: var(--background-light);
    transition: all var(--transition-duration) var(--transition-easing);
  }

  main {
    padding: 0 0;
  }

  main.open {
    width: var(--cart-width);
    overflow: auto;
    box-shadow: 0 0 80px 10px rgba(0, 0, 0, 0.35);

    padding: 1.5rem 1.5rem;
  }

  :global(html.notification-open) main {
    top: calc(var(--header-height));
    height: calc(100svh - var(--header-height));
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .center .empty {
    text-align: center;
    width: 100%;
    font-size: 1.2rem;
    color: var(--text-color);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .total {
    text-transform: capitalize;
    color: var(--accent-color);
    font-weight: 200;
    font-size: 2rem;
    text-align: center;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    padding: 0.5rem 1rem 0 0.5rem;
  }

  main[data-view="desktop"] {
    display: flex;
  }

  main[data-view="mobile"] {
    display: none;
  }

  @media (max-width: 768px) {
    main[data-view="desktop"] {
      display: none;
    }

    main[data-view="mobile"] {
      display: flex;
    }

    main {
      position: fixed;
      right: 0;
      width: 0;
      height: 100svh;

      box-shadow: none !important;
    }

    main.open {
      width: 100%;
    }

    .content {
      flex-direction: column;
      gap: 1rem;
    }

    .actions {
      padding: 1rem 1rem 0 1rem;
    }
  }
</style>
