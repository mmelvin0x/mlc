<script setup lang="ts">
import MintModal from '@/components/modals/MintModal.vue';
import MintLive from '@/components/modals/MintLive.vue';
import { onMounted, ref } from 'vue';
import PageFooter from '@/components/PageFooter.vue';
import CTAButton from '@/components/buttons/CTAButton.vue';
import { getCurrentInstance } from 'vue';
import { isMobile } from 'mobile-device-detect';
import { router } from '@/router';

interface IBrowserDetect {
  isChrome: boolean;
  isChromeIOS: boolean;
  isEdge: boolean;
  isFirefox: boolean;
  isIE: boolean;
  isIOS: boolean;
  isOpera: boolean;
  isSafari: boolean;
}

const showMintModal = ref(false);
const showMintLive = ref(true);

const onShowMintLiveClose = () => {
  showMintModal.value = false;
  window.open('https://mint.memphislionsclub.com', '_blank');
};
</script>

<template>
  <b-container>
    <MintModal v-if="showMintModal" @close="showMintModal = false" />
    <MintLive
      v-if="showMintLive"
      @close="showMintLive = false"
      @action="onShowMintLiveClose"
    />
    <header class="my-5 d-flex justify-content-center">
      <img
        class="header-img"
        :src="require('@/assets/mlc-logo-fill.png')"
        alt="MLC"
      />
    </header>

    <main class="my-5">
      <p class="text-center">
        The Memphis Lions are a set of 9,999 unique, hand-drawn, digital
        avatars, designed in partnership with Memphis and to embody the
        philosophy of Memphis. Each Memphis Lion entitles the owner to unique
        tangible benefits in both the digital and physical worlds, as well as
        access to our immersive and content-rich meta spaces. Explore this site
        to learn more and prepare yourself to
        <b-link
          class="intro-link fw-bold"
          href="https://twitter.com/search?q=%23LiveLikeALion"
          target="_blank"
        >
          #LiveLikeALion!
        </b-link>
      </p>

      <div class="my-5 d-flex justify-content-center">
        <b-link to="home">
          <CTAButton>
            <template v-slot:header>
              <h6 class="cta-header">Explore the club</h6>
            </template>
            <template v-slot:image>
              <img
                class="cta-image"
                :src="require('@/assets/jungle.png')"
                alt="MLC"
              />
            </template>
          </CTAButton>
        </b-link>
      </div>
    </main>

    <footer class="d-flex flex-column align-items-center">
      <p class="info-redirect">
        Don't forget to visit our
        <b-link to="info">Info Kiosk</b-link>
        and
        <b-link to="gallery">NFT Gallery</b-link>
        for everything MLC.
      </p>
    </footer>

    <PageFooter />
  </b-container>
</template>

<style scoped>
p {
  font-size: 1.5rem;
}

h5 {
  text-align: center;
}

.header-img {
  width: 250px;
  height: 250px;
  margin-top: 3rem;
}

.info-redirect {
  font-size: 1rem;
  text-align: center;
}
</style>
