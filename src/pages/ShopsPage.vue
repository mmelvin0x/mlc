<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import CTAButton from '@/components/buttons/CTAButton.vue';
import BackButton from '@/components/buttons/BackButton.vue';
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">Shops</h1>
    </header>

    <main>
      <section class="d-flex flex-column align-items-center">
        <h4 class="text-center my-3">Memphis Depay Clothing</h4>
        <img
          class="my-3 img img-fluid"
          :src="require('@/assets/mdc-logo.png')"
          alt="placeholder"
        />
        <h5 class="text-center">BADTTW</h5>
        <p class="text-center fw-bold">Become blind and deaf to the world</p>
        <p class="text-center">
          The official webshop of MDC -&nbsp;
          <b-link
            href="https://memphisdepay.com"
            target="_blank"
            rel="noreferrer noopener"
            >Memphis Depay Clothing.</b-link
          >
        </p>
        <p class="fst-italic text-center col-6">
          It became very clear in an early stage that this logo had to do
          something with my trademark: fingers in both ears when I score. Blind
          and deaf to the world. It strengthens my focus, and makes me stronger.
          I want my brand to convey that.
        </p>

        <b-link href="https://airship.rightclickable.com" target="_black">
          <CTAButton class="m-5">
            <template v-slot:header>
              <h6 class="cta-header">Redeem via AirShip</h6>
            </template>
            <template v-slot:image>
              <img
                class="cta-image"
                :src="require('@/assets/blimp.png')"
                alt="AirShip"
              />
            </template>
          </CTAButton>
        </b-link>
      </section>
    </main>

    <PageFooter />
  </b-container>
</template>

<style scoped lang="scss"></style>
