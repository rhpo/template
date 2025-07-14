<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
    variant?: "primary" | "secondary" | "outline";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onclick?: () => void;
    content?: import("svelte").Snippet;
    href?: string;
    fullWidth?: boolean;
  }

  let {
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    onclick = () => {},
    content,
    href = "",
    fullWidth = false,
  }: Props = $props();
</script>

{#if href}
  <a class="button btn-{variant}" {href} {type} class:full={fullWidth}>
    {#if content}
      {content()}
    {:else}
      {@render children?.()}
    {/if}
  </a>
{:else}
  <button
    class="button btn-{variant}"
    {type}
    {disabled}
    {onclick}
    class:full={fullWidth}
  >
    {#if content}
      {content()}
    {:else}
      {@render children?.()}
    {/if}
  </button>
{/if}

<style>
  .button {
    padding: 16px 32px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    min-height: 48px;
    font-family: var(--font-primary);
  }

  .button.full {
    width: 100%;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .btn-primary {
    background: var(--text-color);
    color: var(--background-color);
    border-color: var(--text-color);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    border-color: var(--primary-hover);
  }

  .btn-secondary {
    background: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);
  }

  .btn-secondary:hover:not(:disabled) {
    border-color: var(--text-color);
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--text-color);
    color: var(--text-color);
  }

  .btn-outline:hover:not(:disabled) {
    background: var(--text-color);
    color: var(--background-color);
  }

  @media (max-width: 768px) {
    .button {
      padding: 14px 28px;
      font-size: 13px;
    }
  }
</style>
