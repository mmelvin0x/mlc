<script setup lang="ts">
import MintModal from '@/components/modals/MintModal.vue';
import MetaGalleryModal from '@/components/modals/MetaGalleryModal.vue';
import { ref } from 'vue';
import PageFooter from '@/components/PageFooter.vue';
import CTAButton from '@/components/buttons/CTAButton.vue';
import BackButton from '@/components/buttons/BackButton.vue';

const showMintModal = ref(false);
const showMetaGalleryModal = ref(false);

const onMintLionButtonClick = () => {
  window.open('https://mint.memphislionsclub.com', '_blank');
};
</script>

<template>
  <b-container class="container-md">
    <transition name="fade">
      <MintModal v-if="showMintModal" @close="showMintModal = false" />
    </transition>

    <BackButton />

    <header class="m-5">
      <h1 class="text-center">NFT Gallery</h1>
    </header>

    <p class="text-center fs-3 px-5 my-5">
      Welcome to the Memphis Lions Club MetaGallery! In the future you will be
      able to launch your own NFT collection and trade your NFTs, but in the
      meantime you can view specially curated NFTs from the MLC and our partner
      collections.
    </p>

    <div
      class="d-flex flex-wrap align-items-center justify-content-evenly my-5"
    >
      <div class="mt-3">
        <CTAButton @click="onMintLionButtonClick">
          <template v-slot:header>
            <h6 class="cta-header">Mint a Lion</h6>
          </template>
          <template v-slot:image>
            <img
              class="cta-image"
              :src="require('@/assets/mlc-logo-fill.png')"
              alt="MLC"
            />
          </template>
        </CTAButton>
      </div>

      <div class="mt-3">
        <b-link href="https://metagallery.memphislionsclub.com" target="_blank">
          <CTAButton>
            <template v-slot:header>
              <h6 class="cta-header">Metagallery</h6>
            </template>
            <template v-slot:image>
              <img
                class="cta-image"
                :src="require('@/assets/mlc-logo-fill.png')"
                alt="MLC"
              />
            </template>
          </CTAButton>
        </b-link>
      </div>
    </div>

    <div class="my-5">
      <!-- Gallery Images -->
      <div class="my-5">
        <div class="d-flex justify-content-center flex-wrap">
          <img
            class="img-thumbnail w-100 m-3 lion-gif"
            :src="require('@/assets/lions.gif')"
            alt="NFT"
          />
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-001.png')"
            alt="NFT"
          />
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-002.png')"
            alt="NFT"
          />
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-003.png')"
            alt="NFT"
          />
        </div>
        <div class="d-flex justify-content-center flex-wrap">
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-004.png')"
            alt="NFT"
          />
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-005.png')"
            alt="NFT"
          />
          <img
            class="img-thumbnail w-25 m-3 hidden-sm"
            :src="require('@/assets/lion-006.png')"
            alt="NFT"
          />
        </div>
      </div>

      <div
        class="d-flex align-items-center justify-content-evenly w-100 flex-wrap my-5"
      >
        <!-- TODO: make sure link is correct -->
        <div class="d-flex justify-content-center flex-wrap">
          <b-link
            href="https://ftx.us/nfts"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="icon-image"
              :src="require('@/assets/ftx-on-dark.png')"
              alt="FTX"
            />
          </b-link>
        </div>
      </div>
    </div>
    <PageFooter />
  </b-container>
</template>

<style scoped>
i:hover {
  transform: scale(1.15);
  color: #ffd368 !important;
}

.icon-image {
  max-width: 200px;
}

.icon-image:hover {
  transform: scale(1.15);
}

.lion-gif {
  display: none;
}

@media (max-width: 1200px) {
  .hidden-sm {
    display: none;
  }

  .lion-gif {
    display: block;
  }
}

@media (max-width: 576px) {
  .icon-image {
    padding-top: 2rem;
  }

  .hidden-sm {
    display: none;
  }
}
</style>
