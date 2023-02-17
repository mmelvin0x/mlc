<script setup lang="ts">
const props = defineProps([
  'title',
  'closeText',
  'showOtherButton',
  'otherButtonText',
]);
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <b-card class="modal-container">
        <b-card-body>
          <b-card-title class="text-center">
            {{ props.title }}
          </b-card-title>

          <slot name="content" />

          <div class="d-flex justify-content-end gap-2">
            <b-button variant="outline-primary" @click="$emit('close')">
              {{ closeText }}
            </b-button>
            <b-button
              v-if="showOtherButton"
              variant="primary"
              @click="$emit('action')"
            >
              {{ otherButtonText }}
            </b-button>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>
