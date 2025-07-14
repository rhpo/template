<script lang="ts">
  import { BRAND_DESCRIPTION, BRAND_NAME } from "$lib/data";
  import { goto } from "$app/navigation";

  import { footer } from "$lib/data";
  import View from "../ui/View.svelte";
  import Separator from "../ui/Separator.svelte";

  function navigateTo(href: string) {
    goto(href);
  }
</script>

<main>
  <View>
    <footer data-aos="zoom-in" data-aos-duration="800">
      <div class="content">
        <div class="brand">
          <h3>{BRAND_NAME}</h3>
          <p>{BRAND_DESCRIPTION}</p>
        </div>

        {#each footer.links as section}
          <div class="section" data-aos="fade-up" data-aos-duration="800">
            <h4>{section.name}</h4>
            <ul class="links">
              {#each section.content as link}
                <li>
                  <a
                    href={link.href}
                    on:click|preventDefault={() => navigateTo(link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}

        <Separator />

        <div class="bottom">
          <p>
            Made by the <a
              class="codiha"
              href="https://www.codiha.com"
              target="_blank">CODIHA</a
            >&trade; Agency.
          </p>

          <p>
            {new Date().getFullYear()}
            {BRAND_NAME} Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  </View>
</main>

<style>
  footer {
    width: 100%;
  }

  .codiha {
    text-decoration: none;
    transition: var(--transition);
  }

  .codiha,
  .codiha:visited {
    color: var(--text-color);
  }

  .codiha:hover {
    color: var(--accent-color);
  }

  main {
    background: var(--background-light);
    color: var(--text-color);
    padding: 4rem 0 2rem;
    margin-top: 6rem;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .brand h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .brand p {
    line-height: 1.6;
    font-size: 14px;
  }

  .section h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .links {
    list-style: none;
  }

  .links li {
    margin-bottom: 0.75rem;
  }

  .links a {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    text-decoration: none;
    font-size: 14px;
    transition: var(--transition);
    text-align: left;
    padding: 0;
    font-family: inherit;
  }

  .links a:hover {
    color: var(--accent-color);
  }

  .bottom {
    padding-top: 2rem;
    text-align: center;
  }

  .bottom p {
    color: #999999;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .content {
      text-align: center;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    li {
      width: 100%;
      text-align: center;

      /* fallback for ios safari */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
