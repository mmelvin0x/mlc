<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'PageFooter' });
</script>

<template>
  <footer class="d-flex align-items-center justify-content-center m-5">
    <b-link
      href="https://twitter.com/MemphisLions"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="rc-logo m-3"
        :src="require('@/assets/twitter-t.png')"
        alt="Twitter"
      />
    </b-link>
    <b-link
      href="https://rightclickable.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="rc-logo m-3"
        :src="require('@/assets/rc-black-burst.png')"
        alt="RightClickable.com"
      />
    </b-link>
    <b-link
      href="https://discord.gg/MemphisLionsClub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="rc-logo m-3"
        :src="require('@/assets/discord.png')"
        alt="Discord"
      />
    </b-link>
  </footer>
</template>

<style scoped>
.rc-logo {
  width: 35px;
}

.rc-logo:hover {
  transform: scale(1.15);
}
</style>
