<script setup lang="ts">
const props = defineProps(['disabled']);
</script>

<template>
  <b-button
    class="d-flex align-items-center justify-content-between"
    size="lg"
    :disabled="$props.disabled"
  >
    <slot name="header"></slot>
    <slot name="image"></slot>
  </b-button>
</template>

<style scoped lang="scss">
button {
  background-color: #ffd368;
  border: 1px solid #ffd368;
  display: flex;
  color: #28273d;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #ffd368;
    border: 1px solid #ffd368;
    transform: scale(1.05);
  }
}
</style>
