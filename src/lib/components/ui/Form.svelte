<script lang="ts">
  import { fly } from "svelte/transition";
  import { formatPrice } from "$lib/utils/currency";
  import { validateForm } from "$lib/utils/validate";

  import Button from "./Button.svelte";
  import Input from "./Input.svelte";

  import type { Order, Product } from "$lib/types";
  import { cart } from "$lib/stores/cart";
  import { closeForm, isFormOpen } from "$lib/stores/form";

  interface Props {
    onsubmit?: (orderData: Order) => void;
  }

  let { onsubmit = () => {} }: Props = $props();

  let formData: Order = $state({
    cart: $cart,
    customer: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  let isSubmitting = $state(false);
  let submitStatus = $state<"idle" | "success" | "error">("idle");
  let submitMessage = $state("");

  async function submit(order: Order) {
    const formData = new FormData();
    formData.append("cart", JSON.stringify(order.cart));
    formData.append("customer", JSON.stringify(order.customer));

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  let errors: Record<string, string> = $state({});

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (Object.keys((errors = validateForm(formData))).length) {
      return;
    }

    isSubmitting = true;
    submitStatus = "idle";
    submitMessage = "";

    try {
      const response = await submit(formData);

      if (response.ok) {
        submitStatus = "success";
        submitMessage =
          "Commande envoyée avec succès! Nous vous contacterons bientôt.";

        onsubmit(formData);

        setTimeout(() => {
          close();
        }, 2000);
      } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      submitStatus = "error";
      submitMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi de la commande";
    } finally {
      isSubmitting = false;
    }
  }

  function close() {
    closeForm();
  }

  function overlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      close();
    }
  }
</script>

{#if $isFormOpen}
  <div
    class="overlay"
    tabindex="0"
    onclick={overlayClick}
    onkeydown={(e) => e.key === "Escape" && close()}
    role="dialog"
    aria-modal="true"
    transition:fly
  >
    <div class="modal">
      <div class="header">
        <h2 class="title">Finaliser la commande</h2>
        <button class="close" onclick={close} aria-label="Fermer">
          &times;
        </button>
      </div>

      <div class="order-summary">
        <h3>Résumé</h3>
        {#each $cart as item (item.id)}
          <div class="order-item">
            <div class="item-details">
              <span class="item-name">{item.name}</span>
              <span class="item-quantity">Quantité: {item.quantity}</span>
            </div>
            <span class="item-price">
              {formatPrice(item.price.new * item.quantity)}
            </span>
          </div>
        {/each}
      </div>

      <!-- Status Messages -->
      {#if submitStatus === "success"}
        <div class="status-message success">
          <span class="status-icon">✓</span>
          {submitMessage}
        </div>
      {:else if submitStatus === "error"}
        <div class="status-message error">
          <span class="status-icon">✗</span>
          {submitMessage}
        </div>
      {/if}

      <form onsubmit={handleSubmit} class="order-form">
        <div class="form-row">
          <Input
            label="Nom complet"
            type="text"
            bind:value={formData.customer.name}
            placeholder="Votre nom complet"
            error={errors.name}
            required
          />

          <Input
            label="Téléphone"
            type="tel"
            bind:value={formData.customer.phone}
            placeholder="+213 555 123 456"
            error={errors.phone}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          bind:value={formData.customer.email}
          placeholder="votre@email.com"
          error={errors.email}
          required
        />

        <Input
          label="Adresse de livraison"
          bind:value={formData.customer.address}
          placeholder="Votre adresse complète"
          error={errors.address}
          required
        />

        <div class="form-actions">
          <Button variant="secondary" onclick={close}>Annuler</Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || submitStatus === "success"}
          >
            {#if isSubmitting}
              <span class="loading"></span>
              Envoi...
            {:else if submitStatus === "success"}
              Envoyé ✓
            {:else}
              Confirmer
            {/if}
          </Button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: var(--background-light);
    padding: 3rem;
    max-width: 600px;
    width: 90%;
    max-height: 70vh;
    overflow-y: auto;

    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-light);
    padding: 0.5rem;
    line-height: 1;
  }

  .close:hover {
    color: var(--text-color);
  }

  .order-summary {
    background: var(--background-light);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .order-summary h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-name {
    font-weight: 500;
    color: var(--text-color);
    line-height: 1.4;
    font-size: 14px;
  }

  .item-quantity {
    color: var(--text-light);
    font-size: 13px;
  }

  .item-price {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-color);
  }

  .status-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
    font-weight: 500;
  }

  .status-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .status-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .status-icon {
    font-weight: bold;
    font-size: 16px;
  }

  .order-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .form-actions :global(.btn) {
    flex: 1;
    max-width: 150px;
  }

  .loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-50px) scale(0.95);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .modal {
      padding: 2rem;
      margin: 1rem;
    }

    .title {
      font-size: 20px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }

    .form-actions :global(.btn) {
      max-width: none;
    }

    .order-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
