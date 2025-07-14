<script lang="ts">
  import data from "$lib/data/data.json";
  import View from "../ui/View.svelte";

  import { onNavigate } from "$app/navigation";
  import { closeMobileMenu, mobileMenuOpen } from "$lib/stores/menu";
  import { ArrowRight } from "lucide-svelte";
  import { navigation } from "$lib/data";
  import { blur, fade } from "svelte/transition";

  onNavigate(() => {
    closeMobileMenu();
  });
</script>

{#if $mobileMenuOpen}
  <menu transition:blur>
    <View>
      <ul>
        <div class="links">
          {#each navigation as link, position}
            <li
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={position * 100}
            >
              <div class="link">
                <svelte:component this={link.icon} size="1.1rem" />

                <a href={link.href}>
                  {link.name}
                </a>
              </div>

              <div class="icon">
                <ArrowRight size="1.2rem" />
              </div>
            </li>
          {/each}
        </div>
      </ul>
    </View>
  </menu>
{/if}

<style>
  menu {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: calc(100% - var(--header-height));

    background-color: var(--background-color);
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;

    transition: transform var(--transition-duration) var(--transition-easing);
  }

  ul {
    width: 100%;
    padding: 0;
    margin: 0;

    list-style: none;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon {
    font-size: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-0.5rem) translateY(-0.1rem);
    opacity: 0;

    transition:
      transform var(--transition-duration) var(--transition-easing),
      opacity var(--transition-duration) var(--transition-easing);
  }

  li:hover .icon {
    opacity: 0.7;
    transform: translateX(0) translateY(-0.1rem);
  }

  li a {
    color: var(--text-color);
    text-transform: uppercase;

    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    transition: color var(--transition-duration) var(--transition-easing);
  }

  li:hover a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  /*

  This got replaced by transition:blur

  when closed
  menu {
    transform: translateX(-100%);
  }

  when open
  menu.open {
    transform: translateX(0);
  }

  */
</style>
