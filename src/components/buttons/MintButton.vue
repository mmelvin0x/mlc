<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps(['candyMachine', 'isMinting', 'onMint']);
const clicked = ref(false);

const getMintButtonContent = computed(() => {
  if (props.candyMachine?.state?.isSoldOut) {
    return 'SOLD OUT';
  } else if (props.isMinting) {
    return 'LOADING...';
  } else if (props.candyMachine?.state?.isPresale) {
    return 'PRESALE MINT';
  }

  return 'MINT';
});

const disabled = computed(
  () =>
    props.candyMachine?.state?.isSoldOut ||
    props.isMinting ||
    !props.candyMachine?.state?.isActive
);

watch([clicked], props.onMint);
</script>

<template>
  <b-button
    size="lg"
    class="my-3"
    variant="primary"
    :disabled="disabled"
    @click="clicked = true"
  >
    <div class="text-center">
      {{ getMintButtonContent }}
    </div>
  </b-button>
</template>
