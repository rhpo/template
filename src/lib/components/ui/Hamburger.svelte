<script>
  import { onNavigate } from "$app/navigation";
  import { navigating } from "$app/state";
  import { mobileMenuOpen } from "$lib/stores/menu";
  import { Hamburger } from "svelte-hamburgers";

  let isOpen = $state($mobileMenuOpen);

  $effect(() => {
    mobileMenuOpen.set(isOpen);
  });

  onNavigate(() => {
    isOpen = false;
  });
</script>

<Hamburger bind:open={isOpen} />
