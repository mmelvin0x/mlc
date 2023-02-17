import { Object3D, Scene } from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { store } from '../state';
import { router } from '../router';
import { detect } from 'detect-browser';
import { loadCameraFromMemory, setRestrictedControls } from '../utils/controls';
import { isMobile, isMobileSafari, isSafari } from 'mobile-device-detect';

export const animateBlimp = (scene: Scene, WORLD_UNIT: number = 1000) => {
  const blimp = scene.getObjectByName('BLIMP');

  if (blimp) {
    const date = Date.now() * 0.00001;
    const orbitRadius = WORLD_UNIT / 1.5;

    blimp.position.set(
      Math.cos(date) * orbitRadius,
      blimp.position.y,
      Math.sin(date) * orbitRadius
    );

    blimp.rotation.y = -date;
  }
};

export const animateBall = (scene: Scene) => {
  const ball = scene.getObjectByName('SOCCER_BALL_BALL');

  if (ball) {
    ball.rotation.y += 0.01;
  }
};

export const stagePinClickAnimation = (controls: MapControls, scene: Scene) => {
  const browser = detect();
  const ratio =
    browser?.name === 'chrome' && browser.os === 'Mac OS'
      ? devicePixelRatio
      : 1;

  if (isMobile) {
    window.location.replace('https://metastage.memphislionsclub.com');
  } else {
    gsap.to(controls.target, {
      duration: 2,
      x: 0,
      y: -20,
      z: -2000,
      onUpdate() {
        scene.rotation.y -= 4.25 / 1000 / ratio;
        scene.rotation.x -= 5 / 1000 / ratio;
        scene.position.y += 3 / ratio;
        scene.position.z += 3 / ratio;
      },
      onComplete() {
        window.location.replace('https://metastage.memphislionsclub.com');
      },
    });
  }
};

export const defaultPinClickAnimation = (
  controls: MapControls,
  pin: Object3D,
  route: string
) => {
  gsap.to(controls.object.position, {
    duration: 1,
    x: 0,
    y: 500,
    z: 1500,
    onUpdate() {
      controls.object.lookAt(0, 0, 0);
    },
    onComplete() {
      gsap.to(controls.target, {
        duration: 2,
        x: pin.position.x,
        y: pin.position.y,
        z: pin.position.z - 1500,
        onUpdate() {
          controls.object.lookAt(
            pin.position.x,
            pin.position.y,
            pin.position.z - 1500
          );
          controls.update();
        },
        onComplete() {
          loadCameraFromMemory(controls.object, store);
          setRestrictedControls(controls);
          controls.update();
          router.push(route);
        },
      });
    },
  });
};
