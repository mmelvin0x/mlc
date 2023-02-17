<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div>
    <i
      class="fa fa-bars sidebar-button"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-controls="offcanvasExample"
    ></i>

    <div
      class="offcanvas offcanvas-start sidebar"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <button
        class="btn-close btn-close-white sidebar-close"
        data-bs-dismiss="offcanvas"
      ></button>
      <div class="offcanvas-header sidebar-header">
        <h5 id="offcanvasExampleLabel" class="text-center">
          Memphis Lions Club
        </h5>
      </div>
      <div class="offcanvas-body sidebar-body">
        <img
          class="sidebar-logo"
          :src="require('@/assets/mlc-logo-fill.png')"
          alt="MLC"
        />

        <div class="sidebar-links">
          <button
            data-bs-dismiss="offcanvas"
            class="sidebar-link btn btn-link text-decoration-none"
            @click="router.push('gallery')"
          >
            <i class="fa fa-palette me-2"></i> Mint and View your NFTs
          </button>
          <button
            data-bs-dismiss="offcanvas"
            class="sidebar-link btn btn-link text-decoration-none"
            @click="router.push('clubhouse')"
          >
            <i class="fa fa-home me-2"></i> Visit the Clubhouse
          </button>
          <button
            data-bs-dismiss="offcanvas"
            class="sidebar-link btn btn-link text-decoration-none"
            @click="router.push('partnership-pavilion')"
          >
            <i class="fa fa-handshake me-2"></i> Checkout our Partners
          </button>
          <button
            data-bs-dismiss="offcanvas"
            class="sidebar-link btn btn-link text-decoration-none"
            @click="router.push('shop')"
          >
            <i class="fa fa-store me-2"></i> Buy Merchanise
          </button>
          <!-- TODO: Comment in when airship is up -->
          <!-- <button class="sidebar-link btn btn-link text-decoration-none" href="https://nftairship.com"
            ><i class="fa fa-store me-2"></i> Redeem Digital & Physical
            Rewards</button
          > -->
          <button
            data-bs-dismiss="offcanvas"
            class="sidebar-link btn btn-link text-decoration-none"
            @click="router.push('info')"
          >
            <i class="fa fa-question me-2"></i> More Info
          </button>
          <PageFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  background-color: #28273d;

  &-close {
    position: absolute;
    right: 0;
    margin: 1rem;
  }

  &-header {
    margin: 2rem 0;
  }

  &-logo {
    width: 200px;
    height: 200px;
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-button {
    position: absolute;
    top: 50%;
    left: 17.5px;
    max-width: 35px;
    background-color: transparent;
    z-index: 100;
  }

  &-links {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
  }

  &-link {
    padding: 0.5rem;
    color: #ffedf9;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: #ffd368;
    }
  }
}

@media (max-width: 992px) {
  .sidebar-button {
    top: 15px;
    left: 15px;
  }
}
</style>
