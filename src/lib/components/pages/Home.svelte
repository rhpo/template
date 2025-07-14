<script>
  import data from "$lib/data/data.json";
  import Button from "../ui/Button.svelte";

  let firstProduct = data.products[0];
</script>

<div class="construction-page">
  <div class="construction-content">
    <h1 data-aos="fade-up" data-aos-duration="800">En construction</h1>
    <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
      Notre site sera bientôt disponible. Découvrez nos produits premium dès
      maintenant.
    </p>
    <div
      class="construction-cta"
      data-aos="fade-up"
      data-aos-delay="400"
      data-aos-duration="800"
    >
      {#each data.products as product}
        <Button variant="outline" href="/product/{product.id}"
          >{product.name}</Button
        >
      {/each}
    </div>
  </div>
</div>

<style>
  .construction-page {
    min-height: calc(100svh - var(--header-height));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    color: var(--text-color);
    text-align: center;
    padding: 2rem;
  }

  .construction-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .construction-content {
    max-width: var(--view-width);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .construction-content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    font-weight: 300;
    letter-spacing: -0.04em;
  }

  .construction-content p {
    font-size: 18px;
    color: var(--text-light);
    margin-bottom: 3rem;
    max-width: 500px;

    width: 100%;
  }

  @media (max-width: 768px) {
    .construction-content h1 {
      font-size: 3rem;
    }
  }

  @media (max-width: 480px) {
    .construction-content h1 {
      font-size: 2.5rem;
    }
  }
</style>
