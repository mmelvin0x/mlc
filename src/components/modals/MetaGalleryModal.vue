<script setup lang="ts">
import ModalBase from '@/components/modals/ModalBase.vue';
</script>

<template>
  <ModalBase title="View Curated NFT Selections">
    <template v-slot:content>
      <div class="d-flex flex-column align-items-center m-5">
        <b-button
          size="lg"
          variant="primary"
          href="https://metagallery.memphislionsclub.com"
          target="_blank"
          rel="noopener noreferrer"
          >Enter your Metagallery
        </b-button>
      </div>
    </template>
  </ModalBase>
</template>
