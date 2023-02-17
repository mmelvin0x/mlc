<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ActionTypes, useStore } from '../../state';
import { isMobile } from 'mobile-device-detect';

const router = useRouter();
const store = useStore();

const onClick = async () => {
  await store.dispatch(ActionTypes.LOADED, false);
  await router.back();
};
</script>

<template>
  <div class="back-button">
    <button v-if="isMobile" class="btn btn-link" @click="onClick">
      <img
        :width="30"
        :height="30"
        src="../../assets/back-mobile.png"
        alt="back"
      />
    </button>
    <button v-else class="btn btn-link" @click="onClick">
      Back to the Memphisverse
    </button>
  </div>
</template>

<style scoped lang="scss">
.back-button {
  position: absolute;
}
</style>
