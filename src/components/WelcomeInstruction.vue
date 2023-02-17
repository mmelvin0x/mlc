<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const data = reactive({ showIntro: false });

onMounted(() => {
  const showIntro = localStorage.getItem('showIntro');
  data.showIntro = showIntro ? !JSON.parse(showIntro).visited : true;

  setTimeout(() => {
    data.showIntro = false;
  }, 15 * 1000);
});
</script>

<template>
  <div class="intro" v-if="data.showIntro">
    <div class="intro-overlay" @click="data.showIntro = false"></div>
    <b-card class="intro-card">
      <div class="position-relative">
        <b-card-title>Welcome to the Memphis Lions Club</b-card-title>
      </div>

      <b-card-body>
        <b-card-text>
          This website is your portal to the Memphis Metaverse, a digital
          playground for you to socialize, create, compete in, and enjoy.
        </b-card-text>

        <div class="d-flex align-items-center justify-content-evenly mt-3">
          <div>
            <b-img
              height="60%"
              :src="require('@/assets/drag.png')"
              alt="Click and drag."
            />
            <b-card-text class="text-uppercase font-weight-bold mt-3">
              Click & Drag to Explore
            </b-card-text>
          </div>
          <div>
            <b-img
              height="60%"
              :src="require('@/assets/scroll.png')"
              alt="Scroll"
            />
            <b-card-text class="text-uppercase font-weight-bold mt-3">
              Scroll to zoom in & out
            </b-card-text>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<style>
.intro-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(12, 35, 64, 0.6);
}

.intro {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.intro-card {
  width: 45%;
  margin: 15% auto;
  text-align: center;
}

@media (max-width: 992px) {
  .intro-card {
    width: 75%;
    margin: 25% auto;
  }
}

@media (max-width: 768px) {
  .intro-card {
    width: 95%;
    margin: 50% auto;
  }
}
</style>
