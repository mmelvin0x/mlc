<script setup lang="ts">
import ModalBase from '@/components/modals/ModalBase.vue';
</script>

<template>
  <ModalBase
    title="Mint is Live!"
    close-text="Close"
    :show-other-button="true"
    other-button-text="Mint Now!"
  >
    <template v-slot:content>
      <div class="d-flex flex-column align-items-center m-3">
        <p class="text-center">Join the Memphis Lions Club</p>
        <p class="text-center">1000 Lions are now available</p>
      </div>
    </template>
  </ModalBase>
</template>
