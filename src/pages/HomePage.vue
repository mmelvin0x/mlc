<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Camera, Renderer, RendererPublicInterface, Scene } from 'troisjs';
import {
  animateBlimp,
  createPinDomElements,
  loadWorldModel,
  movePins,
  setWelcomeInstruction,
  addListeners,
  animateBall,
  loadCameraFromMemory,
  loadBlimp,
  buildControls,
  createSkybox,
  loadPortalScreen,
} from '@/utils';
import WelcomeInstruction from '@/components/WelcomeInstruction.vue';
import SidebarNav from '@/components/SidebarNav.vue';
import {
  Object3D,
  WebGLRenderer,
  PerspectiveCamera,
  Scene as Scene3,
} from 'three';
import { ActionTypes, useStore } from '@/state';
import { update as tweenUpdate } from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onBeforeRouteLeave } from 'vue-router';

const store = useStore();
const rendererRef = ref({} as RendererPublicInterface);
const sceneRef = ref({} as any);
const cameraRef = ref({} as any);
const year = computed(() => new Date().getFullYear());

let renderer: WebGLRenderer;
let scene: Scene3;
let camera: PerspectiveCamera;
let controls: OrbitControls;
let pins: Object3D[] = [];

onBeforeRouteLeave(() => {
  const wrapper = document.getElementById('canvas-wrapper')!;
  const clone = wrapper.cloneNode(true);
  wrapper.parentNode?.replaceChild(clone, wrapper);
});

onMounted(async () => {
  renderer = rendererRef.value?.renderer as WebGLRenderer;
  camera = cameraRef.value?.camera;
  scene = sceneRef.value?.scene;
  await loadWorldModel(scene);
  await createSkybox(scene);

  loadCameraFromMemory(camera, store);
  setWelcomeInstruction();
  pins = createPinDomElements(scene);
  controls = buildControls(renderer, camera);

  addListeners(controls, scene);
  await loadPortalScreen(scene, renderer, controls);
  await loadBlimp(scene, renderer, controls);

  setTimeout(() => {
    store.dispatch(ActionTypes.LOADED, true);
  }, 1500);

  rendererRef.value?.onBeforeRender(() => {
    controls.update();
    if (pins.length) {
      pins = movePins(camera, pins);
    }

    animateBlimp(scene);
    animateBall(scene);
    tweenUpdate();
    controls.update();
  });
});
</script>

<template>
  <div class="canvas-container">
    <div class="container-border-top"></div>
    <div class="container-border-right"></div>
    <div class="container-border-bottom">
      <span>&copy; RightClickable {{ year }}</span>
    </div>
    <div class="container-border-left"></div>
    <transition name="fade">
      <div class="loading-screen" v-if="!store.state.loaded">
        <img
          class="img-fluid"
          :src="require('@/assets/loading.gif')"
          alt="MLC"
        />
        <h3 class="text-center mt-4">Loading...</h3>
      </div>
    </transition>

    <transition name="fade">
      <WelcomeInstruction></WelcomeInstruction>
    </transition>

    <template v-if="store.state.loaded">
      <b-link to="/">
        <img
          class="top-logo"
          :src="require('@/assets/mlc-logo-yellow.png')"
          alt="MLC"
        />
      </b-link>
      <SidebarNav />
    </template>

    <div id="canvas-wrapper" class="relative">
      <Renderer ref="rendererRef" resize antialias>
        <Camera ref="cameraRef" :near="1" :far="7500" />
        <Scene ref="sceneRef" />
      </Renderer>
    </div>
  </div>
</template>

<style scoped lang="scss">
#canvas-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container-border-top {
  position: absolute;
  width: 100%;
  height: 50px;
  right: 0;
  background-color: #28273d;
  z-index: 10;
}

.container-border-right {
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  background-color: #28273d;
  z-index: 10;
}

.container-border-bottom {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #28273d;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd368;
}

.container-border-left {
  position: absolute;
  width: 50px;
  height: 100%;
  left: 0;
  background-color: #28273d;
  z-index: 10;
}

.top-logo {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 5px;
  left: calc(50% - 17.5px);
  z-index: 100;

  &:hover {
    transform: scale(1.15);
  }
}

.loading-screen {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #28273d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 992px) {
  .container-border-top,
  .container-border-right,
  .container-border-bottom,
  .container-border-left {
    display: none;
  }
}
</style>
