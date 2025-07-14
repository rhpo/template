<script lang="ts">
  interface Props {
    links: { name: string; href: string }[];
  }

  let { links }: Props = $props();
</script>

<div class="wrapper desktop">
  <ul class="links">
    {#each links as link}
      <li class="link">
        <a href={link.href}>
          {link.name}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .link a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
    position: relative;
  }

  .link a:hover {
    color: var(--accent-color);
  }

  .link a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width var(--transition);
  }

  .link a:hover::after {
    width: 100%;
  }
</style>
