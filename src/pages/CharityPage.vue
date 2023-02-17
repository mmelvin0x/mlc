<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import BackButton from '@/components/buttons/BackButton.vue';
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">Memphis Foundation</h1>
    </header>

    <main>
      <section class="d-flex flex-column align-items-center">
        <img
          class="my-3 banner-image img-thumbnail"
          :src="require('@/assets/charity.png')"
          alt="placeholder"
        />
        <p class="text-center">
          The official website of the
          <b-link
            href="https://memphisfoundation.org"
            target="_blank"
            rel="noreferrer noopener"
            >Memphis Foundation.</b-link
          >
        </p>
        <h5 class="text-center fw-bold">OUR MISSION</h5>
        <p class="text-center col-6">
          At the Memphis Foundation we work to empower deaf and blind young
          people and to strengthen communities that support these young people
          through the power of sports and music.
        </p>
      </section>
    </main>

    <PageFooter />
  </b-container>
</template>

<style scoped lang="scss">
.banner-image {
  max-width: 100%;
}
</style>
