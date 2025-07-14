<script lang="ts">
  let { quantity = $bindable(), max = null } = $props();

  function increase() {
    if (max === null || quantity < max) {
      quantity += 1;
    }
  }

  function decrease() {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  function handleInput(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (!isNaN(value) && value > 0 && (max === null || value <= max)) {
      quantity = value;
    }
  }
</script>

<div class="quantity-selector" data-aos="fade-up" data-aos-delay="100">
  <button
    class="quantity-btn"
    onclick={decrease}
    disabled={quantity <= 1}
    oninput={handleInput}
    aria-label="Diminuer la quantité"
  >
    −
  </button>

  <input
    type="number"
    class="quantity-input mono"
    value={quantity}
    min="1"
    oninput={handleInput}
    aria-label="Quantité"
  />

  <button
    class="quantity-btn"
    onclick={increase}
    aria-label="Augmenter la quantité"
  >
    +
  </button>
</div>

<style>
  .quantity-selector {
    display: flex;
    align-items: center;
    gap: 0;
    width: 100%;
    min-width: fit-content;
    border: 1px solid var(--border-color);
  }

  .quantity-selector > * {
    flex: 1;
  }

  .quantity-btn {
    width: 48px;
    height: 48px;
    border: none;
    background: var(--background-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    transition: var(--transition);
    color: var(--text-color);
  }

  .quantity-btn:hover:not(:disabled) {
    background: var(--background-light);
  }

  .quantity-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .quantity-btn:first-child {
    border-right: 1px solid var(--border-color);
  }

  .quantity-btn:last-child {
    border-left: 1px solid var(--border-color);
  }

  .quantity-input {
    width: 60px;
    height: 48px;
    text-align: center;
    border: none;
    font-size: 16px;
    font-weight: 500;
    background: var(--background-color);
    color: var(--text-color);
  }

  .quantity-input:focus {
    outline: none;
  }
</style>
