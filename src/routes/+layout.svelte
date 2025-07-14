<script lang="ts">
  import "../app.css";
  import "aos/dist/aos.css";

  import AOS from "aos";

  import ButtonFloat from "$lib/components/ui/ButtonFloat.svelte";
  import MobileMenu from "$lib/components/Mobile/Menu.svelte";
  import Header from "$lib/components/Header/Header.svelte";
  import Footer from "$lib/components/Footer/Footer.svelte";
  import Cart from "$lib/components/Cart/Cart.svelte";
  import Portal from "svelte-portal";

  import { isCartOpen } from "$lib/stores/cart";
  import { mobileMenuOpen } from "$lib/stores/menu";
  import { isFormOpen } from "$lib/stores/form";
  import { MessageCircle } from "lucide-svelte";

  let { children } = $props();

  let noScroll = $state(false);

  $effect(() => {
    noScroll = $isCartOpen || $mobileMenuOpen || $isFormOpen;
    document.documentElement.classList.toggle("no-scroll", noScroll);
  });

  $effect(() => {
    AOS.init({
      duration: 800,
    });
  });
</script>

<main data-aos="fade-in" data-aos-duration="1500">
  <Header />

  <div class="screen">
    <div class="content">
      {@render children?.()}
      <Footer />
    </div>

    <Cart view="desktop" />
  </div>
</main>

<Portal target="body">
  <Cart view="mobile" />
</Portal>

<MobileMenu />
<ButtonFloat icon={MessageCircle} />

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100svh;
  }

  :global(html.no-scroll) {
    overflow: hidden;
  }

  .screen {
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: 100%;
  }

  .content {
    width: 100%;
    min-height: calc(100svh - var(--header-height));
    box-sizing: border-box;
  }

  :global(html.no-scroll) {
    overflow: hidden;
  }
</style>
