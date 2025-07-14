<script lang="ts">
  interface Props {
    category?: "textarea" | "input";
    type?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
  }

  let {
    category = "input",
    type = "text",
    label = "",
    value = $bindable(""),
    placeholder = "",
    error = "",
    required = false,
  }: Props = $props();
</script>

<main>
  {#if label}
    <label for={label.toLowerCase().replace(/\s+/g, "-")}>
      {label}
    </label>
  {/if}

  {#if category === "textarea"}
    <textarea
      class="input"
      id={label.toLowerCase().replace(/\s+/g, "-")}
      bind:value
      {placeholder}
      class:error
      {required}
    ></textarea>
  {:else}
    <input
      class="input"
      id={label.toLowerCase().replace(/\s+/g, "-")}
      {type}
      bind:value
      {placeholder}
      class:error
      {required}
    />
  {/if}
  {#if error}
    <span class="error-message">{error}</span>
  {/if}
</main>

<style>
  main {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input {
    width: 100%;
    padding: 16px 0;
    border: none;

    font-size: 16px;
    transition: var(--transition);
    background: transparent;
    font-family: var(--font-primary);
    color: var(--text-color);
  }

  .input:focus {
    outline: none;
    border-bottom-color: var(--text-color);
  }

  .input::placeholder {
    color: var(--text-muted);
  }

  .input.error {
    border-bottom-color: #e74c3c;
  }

  .error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 0.5rem;
    display: block;
  }
</style>
