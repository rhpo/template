<script lang="ts">
  import { MessageCircle } from "lucide-svelte";

  interface Props {
    onClick?: () => void;
    color?: string;
    tip?: string;
    icon: any;
  }

  let {
    onClick = () => {},
    color = "var(--primary-color)",
    tip = "Enter tooltip text here",
    icon = MessageCircle,
  }: Props = $props();
</script>

<button
  class="bounce"
  onclick={onClick}
  aria-label={tip}
  style="background-color: {color};"
>
  <svelte:component this={icon} size="24" color="var(--background-color)" />
  <div class="tooltip">{tip}</div>
</button>

<style>
  button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-medium);
    cursor: pointer;
    transition: var(--transition);
    z-index: 1500;
    border: none;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
  }

  .tooltip {
    position: absolute;
    bottom: 50%;
    right: 64px;
    transform: translateY(50%);
    background: var(--text-color);
    color: var(--background-color);
    padding: 8px 12px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    pointer-events: none;
    font-weight: 500;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-left-color: var(--text-color);
  }

  button:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(50%) translateX(-4px);
  }

  @media (max-width: 768px) {
    button {
      bottom: 20px;
      right: 20px;
      width: 52px;
      height: 52px;
    }

    .tooltip {
      right: 60px;
    }
  }
</style>
