<script lang="ts">
  import MobileMenu from "../Mobile/Menu.svelte";
  import NavigationBar from "./NavigationBar/NavigationBar.svelte";
  import Notification from "./Notification/Notification.svelte";
</script>

<MobileMenu />

<header>
  <Notification message="Livraison Disponible à Alger." />

  <NavigationBar />
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 1000;

    width: 100%;
    height: var(--header-height);
  }
</style>
