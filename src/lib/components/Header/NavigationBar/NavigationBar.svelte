<script lang="ts">
  import View from "$lib/components/ui/View.svelte";
  import Hamburger from "$lib/components/ui/Hamburger.svelte";

  import { BRAND_NAME, navigation } from "$lib/data";
  import CartCount from "./CartCount.svelte";
  import Links from "./Links.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import ThemeButton from "$lib/components/ui/ThemeButton.svelte";
</script>

<nav>
  <View align="row">
    <div class="stretch">
      <div class="wrapper">
        <div class="image">
          <Logo />
        </div>

        <a class="logo" href="/">
          {BRAND_NAME}
        </a>
      </div>

      <div class="wrapper desktop">
        <Links links={navigation} />
      </div>

      <div class="wrapper desktop">
        <div class="controls">
          <ThemeButton />
          <CartCount />
        </div>
      </div>

      <div class="mobile">
        <div class="controls">
          <ThemeButton />
          <CartCount />
        </div>
        <Hamburger />
      </div>
    </div>
  </View>
</nav>

<style>
  :root {
    --border-size: 1px;
  }

  .image {
    width: 2.2rem;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stretch {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  nav {
    width: 100%;
    height: var(--navbar-height);

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid var(--border-color);
    background: var(--background-light);

    transition: all var(--transition-duration) var(--transition-easing);
  }

  .wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    font-weight: 500;
    font-size: 1.5rem;
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition);
  }

  .logo:hover {
    color: var(--accent-color);
  }

  .mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .wrapper.desktop {
      display: none;
    }

    .mobile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
</style>
