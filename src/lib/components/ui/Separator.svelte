<script lang="ts">
  let { space = "0.5rem", ...rest } = $props();
</script>

<div class="separator" style="margin: {space} 0;" {...rest}></div>

<style>
  .separator {
    width: 100%;
    height: var(--border-size);
    background-color: var(--border-color);
  }
</style>
