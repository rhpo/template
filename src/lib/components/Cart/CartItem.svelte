<script lang="ts">
  import { removeFromCart, updateQuantity } from "$lib/stores/cart";
  import { formatPrice } from "$lib/utils/currency";
  import type { CartItem } from "$lib/types";
  import { Trash2, Plus, Minus } from "lucide-svelte";
  import { blur } from "svelte/transition";

  let { item }: { item: CartItem } = $props();

  function increaseQuantity() {
    updateQuantity(item.id, +1);
  }

  function decreaseQuantity() {
    updateQuantity(item.id, -1);
  }

  function handleRemove() {
    removeFromCart(item.id);
  }

  let totalPrice = $derived(item.price.new * item.quantity);
</script>

<main>
  <div class="image">
    <img src={item.image} alt={item.name} />
  </div>

  <div class="details">
    <h3 class="name">{item.name}</h3>
    <div class="price">
      <span class="unit-price"
        >{formatPrice(item.price.new, item.currency)}</span
      >
      {#if item.quantity > 1}
        <span class="total-price">
          Total: {formatPrice(totalPrice, item.currency)}
        </span>
      {/if}
    </div>
  </div>

  <div class="controls">
    <button class="remove-btn" onclick={handleRemove} aria-label="Remove item">
      <Trash2 size={18} />
    </button>

    <div class="quantity-controls">
      <button
        class="quantity-btn decrease"
        onclick={decreaseQuantity}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span class="quantity">{item.quantity}</span>

      <button
        class="quantity-btn increase"
        onclick={increaseQuantity}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--background-color);
    border: 1px solid var(--border-light);
    border-radius: var(--border-radius);
    transition: var(--transition);
    position: relative;
    width: 100%;
  }

  main:hover {
    border-color: var(--border-color);
    box-shadow: var(--shadow-light);
  }

  .image {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius);
    overflow: hidden;
    background: var(--background-light);

    padding: 0.5rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .name {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .unit-price {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-color);
  }

  .total-price {
    font-size: 12px;
    color: var(--text-light);
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: var(--text-light);
    cursor: pointer;
    transition: var(--transition);
    padding: 0;
  }

  .remove-btn:hover {
    color: #dc2626;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: var(--background-light);
    border: 1px solid var(--border-light);
    border-radius: var(--border-radius);
    padding: 0.125rem;
  }

  .quantity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: var(--background-color);
    color: var(--text-color);
    border-radius: 2px;
    cursor: pointer;
    transition: var(--transition);
    padding: 0;
  }

  .quantity-btn:hover {
    background: var(--accent-color);
    color: var(--background-color);
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    font-weight: 600;
    font-size: 13px;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    main {
      padding: 0.75rem;
      gap: 0.5rem;
    }

    .image {
      width: 64px;
      height: 64px;
    }

    .name {
      font-size: 16px;
    }

    .unit-price {
      font-size: 15px;
    }

    .total-price {
      font-size: 14px;
    }

    .remove-btn {
      width: 32px;
      height: 32px;
    }

    .quantity-btn {
      width: 32px;
      height: 32px;
      font-size: 18px;
    }

    .quantity {
      min-width: 32px;
      font-size: 16px;
    }
  }

  @media (max-width: 320px) {
    main {
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.75rem;
    }

    .image {
      align-self: center;
      width: 72px;
      height: 72px;
    }

    .details {
      text-align: center;
    }

    .name {
      display: block;
      font-size: 18px;
    }

    .controls {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .quantity-controls {
      order: 2;
    }

    .remove-btn {
      order: 1;
      width: 36px;
      height: 36px;
    }

    .quantity-btn {
      width: 36px;
      height: 36px;
      font-size: 20px;
    }

    .quantity {
      min-width: 36px;
      font-size: 18px;
    }

    .unit-price {
      font-size: 18px;
    }

    .total-price {
      font-size: 16px;
    }
  }
</style>
