<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import BackButton from '@/components/buttons/BackButton.vue';
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">Partnership Pavilion</h1>
    </header>

    <main>
      <section
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <img :src="require('@/assets/mdc-logo.png')" alt="MDC" />
        <p class="text-center fw-bold">
          Official webshop of MDC - Memphis Depay Clothing.
        </p>
        <p class="fst-italic text-center">
          "It became very clear in an early stage that this logo had to do
          something with my trademark: fingers in both ears when I score. Blind
          and deaf to the world. It strengthens my focus, and makes me stronger.
          I want my brand to convey that."
        </p>
        <div class="d-flex align-items-center">
          <b-link
            class="me-3"
            href="https://memphisdepay.com"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-link fa-2x"></i
          ></b-link>
          <b-link
            class="m-3"
            href="https://instagram.com/memphisdepayclothing"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-instagram fa-2x"></i
          ></b-link>
          <b-link
            class="ms-3"
            href="https://twitter.com/official_MDC"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-twitter fa-2x"></i
          ></b-link>
        </div>
      </section>

      <section
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <img
          id="redbull"
          class="img img-thumbnail"
          :src="require('@/assets/red-bull-memphis.png')"
          alt="Red Bull"
        />
        <p class="text-center">
          They say "Red Bull gives you wiiings", and for me this is absolutely
          true. Red Bull brings creativity and energy to everything they do and
          these shared values and their support are invaluable in helping me
          bring my vision and dreams to reality.
        </p>
        <div class="d-flex align-items-center">
          <b-link
            class="me-3"
            href="https://redbull.com"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-link fa-2x"></i
          ></b-link>
          <b-link
            class="m-3"
            href="https://instagram.com/redbull"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-instagram fa-2x"></i
          ></b-link>
          <b-link
            class="ms-3"
            href="https://twitter.com/redbull"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-twitter fa-2x"></i
          ></b-link>
        </div>
      </section>

      <section
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <img :src="require('@/assets/puma-logo.png')" alt="Puma" />
        <p class="text-center">
          Sports have the power to transform and empower us. As one of the
          world's leading sports brands, it's only natural that we want to stand
          on the same playing field as the fastest athletes on the planet. To
          achieve that, the PUMA brand is based on the very values that make an
          excellent athlete.
        </p>
        <div class="d-flex align-items-center">
          <b-link
            class="me-3"
            href="https://puma.com"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-link fa-2x"></i
          ></b-link>
          <b-link
            class="m-3"
            href="https://instagram.com/puma"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-instagram fa-2x"></i
          ></b-link>
          <b-link
            class="ms-3"
            href="https://twitter.com/puma"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-twitter fa-2x"></i
          ></b-link>
        </div>
      </section>

      <section
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <img
          :src="require('@/assets/right-clickable-logo.png')"
          alt="rightclickable"
        />
        <p class="text-center">
          At
          <b-link
            href="https://rightclickable.com"
            target="_blank"
            rel="noopener noreferrer"
            >rightclickable.com</b-link
          >
          we are focused on creating and managing bespoke turnkey brand-aligned
          NFT solutions, which have a distinctive personality, utility and
          community. RightClickable enables brands, personalities and public
          figures to harness the power of NFTs and play a significant role in
          the future of DeFi, P2E, gaming, wearables, and authentication as
          users migrate towards Web3.
        </p>
        <div class="d-flex align-items-center">
          <b-link
            class="me-3"
            href="https://rightclickable.com"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa fa-link fa-2x"></i
          ></b-link>
          <b-link
            class="m-3"
            href="https://instagram.com/rightclickable"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-instagram fa-2x"></i
          ></b-link>
          <b-link
            class="ms-3"
            href="https://twitter.com/rightclickable_"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-twitter fa-2x"></i
          ></b-link>
        </div>
      </section>
    </main>
    <PageFooter />
  </b-container>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5rem;
}

@media (max-width: 992px) {
  main {
    display: flex;
    flex-direction: column;
  }
}

section {
  margin-bottom: 3rem;
}

img {
  max-height: 150px;
  max-width: 50%;
  margin-bottom: 2rem;
}

#redbull {
  max-height: 350px;
}
</style>
