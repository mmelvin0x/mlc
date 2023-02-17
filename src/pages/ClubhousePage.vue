<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import CTAButton from '@/components/buttons/CTAButton.vue';
import BackButton from '@/components/buttons/BackButton.vue';
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">Clubhouse</h1>
    </header>

    <main class="d-flex align-items-center justify-content-evenly flex-wrap">
      <section class="mb-5">
        <img
          class="img-thumbnail"
          :src="require('@/assets/clubhouse.png')"
          alt="placeholder"
        />
      </section>

      <section class="mb-4">
        <h4 class="text-center mb-4">Member Benefits</h4>
        <p class="text-center">
          While we await the grand opening of our v1 Memphis Lions
          Metaclubhouse, drop into the
          <b-link
            href="https://discord.com/invite/memphislionsclub"
            target="_blank"
            rel="noreferrer noopener"
            >Official Discord</b-link
          >
          to ask any questions, create, collaborate, or just hang out with your
          fellow Lions. Our
          <b-link
            href="https://discord.com/invite/memphislionsclub"
            target="_blank"
            rel="noreferrer noopener"
            >Community</b-link
          >
          is moderated 24 hours a day, 7 days a week, with a professional and
          knowledgeable pride of Lions. Inside the Discord you will find updates
          from Memphis, game times, scores, social updates, merchandise prizes,
          whitelist opportunities, giveaways, and more! The Memphis Lions
          Discord is the easiest way to stay up to date and
          <b-link
            href="https://twitter.com/search?q=%23LiveLikeALion"
            target="_blank"
          >
            #LiveLikeALion!
          </b-link>
        </p>
      </section>
    </main>

    <section class="d-flex align-items-center justify-content-evenly flex-wrap">
      <b-link
        href="https://discord.com/invite/memphislionsclub"
        target="_blank"
        rel="noreferrer noopener"
      >
        <CTAButton class="mt-3">
          <template v-slot:header>
            <h6 class="cta-header">Join the Discord</h6>
          </template>
          <template v-slot:image>
            <img
              class="cta-image"
              :src="require('@/assets/discord.png')"
              alt="MLC"
            />
          </template>
        </CTAButton>
      </b-link>

      <CTAButton class="mt-3" :disabled="true">
        <template v-slot:header>
          <h6 class="cta-header">The Metaclub</h6>
        </template>
        <template v-slot:image>
          <img
            class="cta-image"
            :src="require('@/assets/lock.png')"
            alt="MLC"
          />
        </template>
      </CTAButton>
    </section>

    <PageFooter />
  </b-container>
</template>
