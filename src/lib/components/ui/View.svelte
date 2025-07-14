<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
    align?: "row" | "column" | "default";
  }

  let { children, align = "default" }: Props = $props();
</script>

<div class="view" data-align={align}>
  {@render children?.()}
</div>

<style>
  /* Layout utilities */
  .view {
    width: 100%;
    max-width: var(--view-width);
    margin: 0 auto;
    padding: 0 24px;

    transition: height var(--transition-duration) var(--transition-easing);
  }

  @media (max-width: 768px) {
    .view {
      padding: 0 20px;
    }
  }

  div[data-align] {
    display: flex;
  }

  div[data-align="row"] {
    flex-direction: row;
  }

  div[data-align="column"] {
    flex-direction: column;
  }
</style>
