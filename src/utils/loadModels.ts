import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Scene,
  TextureLoader,
  MeshBasicMaterial,
  Vector3,
  Raycaster,
  Mesh,
  Object3D,
  WebGLRenderer,
  VideoTexture,
  PlaneGeometry,
  RGBAFormat,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as Tween from '@tweenjs/tween.js';
import { router } from '../router';
import gsap from 'gsap';

export const loadWorldModel = async (scene: Scene): Promise<boolean> => {
  if (scene) {
    const loader = new GLTFLoader();
    const singleTexturedModels = [
      'arena',
      'billboards',
      'booth',
      'clubhouse',
      'gallery',
      'ground',
      'heart',
      'lights',
      'map',
      'map1',
      'shops',
      'mountains',
      'portal',
      'rc',
      'soccer_ball_ball',
      'soccer_ball_base',
      'stage',
      'trees',
    ];

    for (let i = 0; i < singleTexturedModels.length; i++) {
      await loadObject(singleTexturedModels[i], scene, loader);
    }

    await loadShopScreens(scene, loader);
    await loadScreens(scene, loader);
    return true;
  }

  return false;
};

const loadShopScreens = async (
  scene: Scene,
  loader: GLTFLoader
): Promise<void> => {
  const gltf = await loader.loadAsync(`./models/shops_v2.glb`);
  const textureLoader = new TextureLoader();
  gltf.scene.children[0].children.forEach((obj, i) => {
    const texture = textureLoader.load(`./textures/shops_0${i + 1}.png`);
    // @ts-ignore
    obj.material = new MeshBasicMaterial({ map: texture });
    // @ts-ignore
    obj.material.map.flipY = false;
  });

  scene.add(gltf.scene);
};

export const loadObject = async (
  name: string,
  scene: Scene,
  loader: GLTFLoader
): Promise<Object3D> => {
  const gltf = await loader.loadAsync(`./models/${name}.glb`);
  const obj = gltf.scene.getObjectByName(`${name.toUpperCase()}`);
  const texture = new TextureLoader().load(`./textures/${name}.png`);
  // @ts-ignore
  obj.material = new MeshBasicMaterial({ map: texture });
  // @ts-ignore
  obj.material.map.flipY = false;
  scene.add(gltf.scene);

  return obj!;
};

export const createSkybox = async (scene: Scene) => {
  const geometry = new PlaneGeometry(16000, 9000);
  const texture = new TextureLoader().load('./textures/skybox.png');
  const material = new MeshBasicMaterial({ map: texture });
  const skybox = new Mesh(geometry, material);

  skybox.position.set(0, 0, -2750);
  skybox.name = 'SKYBOX';
  scene.add(skybox);
};

export const loadPortalScreen = async (
  scene: Scene,
  renderer: WebGLRenderer,
  controls?: OrbitControls
): Promise<Object3D> => {
  const raycaster = new Raycaster();
  const loader = new GLTFLoader();
  const meshes: Object3D[] = [];
  const gltf = await loader.loadAsync('./models/disc.glb');
  const obj = gltf.scene.children[0];
  const portalVideo = document.getElementById('portal') as HTMLVideoElement;
  await portalVideo.play();

  const texture = new VideoTexture(portalVideo);
  texture.format = RGBAFormat;
  // const texture = new TextureLoader().load('./textures/ramp.png');
  // @ts-ignore
  obj.material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  gltf.scene.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      meshes.push(child);
    }
  });

  scene.add(gltf.scene);

  if (!controls) return obj;

  renderer.domElement.addEventListener(
    'click',
    (event) => {
      raycaster.setFromCamera(
        {
          x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
          y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
        },
        controls.object
      );

      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        const { point } = intersects[0];
        const pins = document.getElementsByClassName('pin-container');
        for (let i = 0; i < pins.length; i++) {
          (pins[i] as HTMLDivElement).style.visibility = 'hidden';
        }

        gsap.to(controls.object.position, {
          duration: 2,
          x: 0,
          y: 0,
          z: 1750,
          onUpdate() {
            controls.object.lookAt(point.x, point.y, point.z);
          },
          onComplete() {
            new Tween.Tween(controls.target)
              .to({ x: point.x, y: point.y - 1000, z: point.z - 1325 }, 2000)
              .easing(Tween.Easing.Linear.None)
              .onStart(() => {
                controls.object.lookAt(point.x, point.y - 1000, point.z - 1325);
              })
              .onComplete(() => {
                router.push('/portal');
              })
              .start();
          },
        });
      }
    },
    false
  );

  return obj!;
};

export const loadBlimp = async (
  scene: Scene,
  renderer: WebGLRenderer,
  controls: OrbitControls
): Promise<boolean> => {
  const raycaster = new Raycaster();
  const loader = new GLTFLoader();
  const meshes: Object3D[] = [];
  const gltf = await loader.loadAsync('./models/blimp.glb');
  const obj = gltf.scene.children[0];
  const texture = new TextureLoader().load('./textures/blimp.png');
  // @ts-ignore
  obj.material = new MeshBasicMaterial({ map: texture });
  // @ts-ignore
  obj.material.map.flipY = false;

  gltf.scene.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      meshes.push(child);
    }
  });

  gltf.scene.name = 'BLIMP';
  gltf.scene.scale.set(0.85, 0.85, 0.85);
  gltf.scene.position.copy(new Vector3(0, 500, 0));

  scene.add(gltf.scene);

  renderer.domElement.addEventListener(
    'click',
    (event) => {
      raycaster.setFromCamera(
        {
          x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
          y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
        },
        controls.object
      );

      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        const { point } = intersects[0];
        const pins = document.getElementsByClassName('pin-container');
        for (let i = 0; i < pins.length; i++) {
          (pins[i] as HTMLDivElement).style.visibility = 'hidden';
        }

        new Tween.Tween(controls.target)
          .to({ x: point.x, y: point.y - 500, z: point.z - 1250 }, 2000)
          .easing(Tween.Easing.Linear.None)
          .onStart(() => {
            controls.minDistance = 0;
            controls.update();
            controls.object.lookAt(point.x, point.y - 500, point.z - 1250);
            controls.object.rotateX(2 * Math.PI);
          })
          .onComplete(() => {
            controls.minDistance = 500;
            controls.update();
            window.open('https://airship.rightclickable.com', '_blank');
            router.push('/');
          })
          .start();
      }
    },
    false
  );

  return true;
};

const loadScreens = async (scene: Scene, loader: GLTFLoader): Promise<void> => {
  const textureLoader = new TextureLoader();
  const gltf = await loader.loadAsync('./models/screens.glb');

  const stageRight = gltf.scene.children[0].children[0];
  const stageMiddle = gltf.scene.children[0].children[1];
  const stageLeft = gltf.scene.children[0].children[2];
  const galleryLeft = gltf.scene.children[0].children[3];
  const galleryRight = gltf.scene.children[0].children[4];
  const billboard = gltf.scene.children[0].children[5];
  const info = gltf.scene.children[0].children[6];

  const stageRightVideo = document.getElementById(
    'stage-right'
  ) as HTMLVideoElement;
  const stageMiddleVideo = document.getElementById(
    'stage-mid'
  ) as HTMLVideoElement;
  const stageLeftVideo = document.getElementById(
    'stage-left'
  ) as HTMLVideoElement;
  const galleryVideo = document.getElementById('gallery') as HTMLVideoElement;
  const billboardVideo = document.getElementById(
    'billboard'
  ) as HTMLVideoElement;

  await stageRightVideo.play();
  await stageMiddleVideo.play();
  await stageLeftVideo.play();
  await galleryVideo.play();
  await billboardVideo.play();

  const stageRightTexture = new VideoTexture(stageRightVideo);
  const stageMiddleTexture = new VideoTexture(stageMiddleVideo);
  const stageLeftTexture = new VideoTexture(stageLeftVideo);
  const galleryRightTexture = new VideoTexture(galleryVideo);
  const billboardTexture = new VideoTexture(billboardVideo);

  const galleryLeftTexture = textureLoader.load(
    './textures/screen-gallery-left.png'
  );
  const infoTexture = textureLoader.load('./textures/screen-info.png');

  // @ts-ignore
  stageRight.material = new MeshBasicMaterial({
    map: stageRightTexture,
  });
  // @ts-ignore
  stageRight.material.map.flipY = false;
  // @ts-ignore
  stageMiddle.material = new MeshBasicMaterial({
    map: stageMiddleTexture,
  });
  // @ts-ignore
  stageMiddle.material.map.flipY = false;
  // @ts-ignore
  stageLeft.material = new MeshBasicMaterial({
    map: stageLeftTexture,
  });
  // @ts-ignore
  stageLeft.material.map.flipY = false;

  // @ts-ignore
  galleryRight.material = new MeshBasicMaterial({
    map: galleryRightTexture,
  });
  // @ts-ignore
  galleryRight.material.map.flipY = false;
  // @ts-ignore
  galleryLeft.material = new MeshBasicMaterial({
    map: galleryLeftTexture,
  });
  // @ts-ignore
  galleryLeft.material.map.flipY = false;

  // @ts-ignore
  billboard.material = new MeshBasicMaterial({
    map: billboardTexture,
  });
  // @ts-ignore
  billboard.material.map.flipY = false;

  // @ts-ignore
  info.material = new MeshBasicMaterial({ map: infoTexture });
  // @ts-ignore
  info.material.map.flipY = false;

  scene.add(gltf.scene);
};
