<script setup lang="ts">
import PageFooter from '../components/PageFooter.vue';
import BackButton from '../components/buttons/BackButton.vue';
import YTLite from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/dist/style.css';

const youTubeVideos: any[] = [
  // { id: 'cmKzUCWrvKg', title: 'MLC - 1' },
  // { id: 'xjtNp-RStOs', title: 'MLC - 2' },
  // { id: '6h_-5lb-95M', title: 'MLC - 3' },
  // { id: 'oss23JNZ3q4', title: 'MLC - 4' },
];
</script>

<template>
  <b-container class="mt-3">
    <BackButton />

    <main>
      <div class="h-100 d-flex flex-column justify-content-center">
        <section
          id="video-carousel"
          class="carousel slide carousel-fade mb-3"
          :data-bs-interval="false"
        >
          <div class="carousel-inner">
            <video
              ref="video1"
              class="carousel-item active"
              id="stage-preview-component"
              crossorigin="anonymous"
              controls
              autoplay
              playsinline
            >
              <source
                src="/textures/stage-preview.mov"
                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              />
            </video>
            <div
              v-for="vid in youTubeVideos"
              :key="vid.id"
              class="carousel-item img-fluid"
            >
              <YTLite :id="vid.id" :title="vid.title" />
            </div>
          </div>
        </section>

        <section
          v-if="youTubeVideos.length"
          class="mb-4 d-flex justify-content-center"
        >
          <button
            class="btn btn-link me-2"
            type="button"
            data-bs-target="#video-carousel"
            data-bs-slide="prev"
          >
            &lsaquo;
          </button>
          <button
            class="btn btn-link ms-2"
            type="button"
            data-bs-target="#video-carousel"
            data-bs-slide="next"
          >
            &rsaquo;
          </button>
        </section>

        <hr class="text-primary" />
      </div>
    </main>

    <PageFooter />
  </b-container>
</template>
