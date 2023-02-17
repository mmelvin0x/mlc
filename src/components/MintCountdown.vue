<script setup lang="ts">
import { MintStatus } from '@/utils';

const props = defineProps(['time', 'status']);
const mintStatus = MintStatus;
</script>

<template>
  <div>
    <VueCountdown
      v-if="
        !(
          props.status === mintStatus.LIVE ||
          props.status === mintStatus.COMPLETED
        )
      "
      :time="props.time"
      v-slot="{ days, hours, minutes }"
    >
      <div class="d-flex align-items-center">
        <div class="info-box">{{ days }}</div>
        :
        <div class="info-box">{{ hours }}</div>
        :
        <div class="info-box">{{ minutes }}</div>
      </div>
    </VueCountdown>
    <div class="info-box w-100">{{ props.status }}</div>
  </div>
</template>
