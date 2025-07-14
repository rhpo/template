<script lang="ts">
  import Home from "$lib/components/pages/Home.svelte";
  import { BRAND_NAME } from "$lib/data";
</script>

<svelte:head>
  <title>{BRAND_NAME} | Home</title>
  <meta name="description" content="Welcome to {BRAND_NAME}!" />
</svelte:head>

<Home />
