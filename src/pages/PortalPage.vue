<script setup lang="ts">
import PageFooter from '@/components/PageFooter.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import { onMounted, ref } from 'vue';
import {
  RendererPublicInterface,
  Camera,
  Renderer,
  Scene,
  Plane,
  LambertMaterial,
  MatcapMaterial,
  AmbientLight,
  Group,
} from 'troisjs';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { Scene as Scene3 } from 'three/src/scenes/Scene';
import { onBeforeRouteLeave } from 'vue-router';
import { buildControls, loadPortalScreen, loadObject } from '@/utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const rendererRef = ref({} as RendererPublicInterface);
const sceneRef = ref({} as any);
const cameraRef = ref({} as any);

let renderer: WebGLRenderer;
let scene: Scene3;
let camera: PerspectiveCamera;

onBeforeRouteLeave(() => {
  const wrapper = document.getElementById('canvas-wrapper')!;
  const clone = wrapper.cloneNode(true);
  wrapper.parentNode?.replaceChild(clone, wrapper);
});

onMounted(async () => {
  renderer = rendererRef.value?.renderer as WebGLRenderer;
  camera = cameraRef.value?.camera;
  scene = sceneRef.value?.scene;
  const portal = await loadObject('portal', scene, new GLTFLoader());
  const screen = await loadPortalScreen(scene, renderer);
  const controls = buildControls(renderer, camera);
  controls.enabled = false;

  portal.position.set(-311, -50, -900);
  screen.position.set(-0, 0, -100);
  scene.rotateX(-Math.PI / 2);

  rendererRef.value?.onBeforeRender(() => {
    controls.update();
  });
});
</script>

<template>
  <b-container>
    <BackButton />

    <header class="m-5">
      <h1 class="text-center">MetaPortal</h1>
    </header>

    <main class="d-flex align-items-center justify-content-evenly flex-wrap">
      <section class="mb-5">
        <div id="canvas-wrapper" class="relative">
          <Renderer ref="rendererRef" resize antialias>
            <Camera ref="cameraRef" :position="{ x: 0, y: 0, z: 0 }" />
            <Scene ref="sceneRef" background="#28273D">
              <AmbientLight />
              <Group
                :rotation="{ x: -Math.PI / 2, y: 0, z: 0 }"
                :position="{ y: -45 }"
              >
                <Plane
                  :width="10000"
                  :height="10000"
                  :rotation="{ x: 0 }"
                  :position="{ x: 0, y: 0, z: 0 }"
                >
                  <LambertMaterial
                    :props="{
                      color: '#28273D',
                    }"
                  >
                  </LambertMaterial>
                </Plane>
              </Group>
            </Scene>
          </Renderer>
        </div>
      </section>

      <section class="mb-4">
        <p class="text-center">
          The MetaPortal is your doorway to the RightClickable Multimetaverse!
          Discover and connect with new communities owned, operated, or leased
          by Memphis Lion holders. A Memphis Lions Club NFT not only grants it’s
          holder access to all of the utility and fun in the Memphisverse, it
          entitles it’s owner to create their very own metaverse for a
          collection. The MetaPortal connects these communities in a powerful
          network to enable collaboration, cross promotion, and continuity of
          user experience across domains. RightClickable replaces the web2
          hyperlink with the web3 metajump. A MetaJump allows user settings and
          wallet connectivity to migrate through the entire Multimetaverse
          Network!
        </p>
      </section>
    </main>
    <PageFooter />
  </b-container>
</template>

<style scoped lang="scss">
#canvas-wrapper {
  width: 100vh;
  height: 50vh;
}
</style>
