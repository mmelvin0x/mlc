import { Camera, MOUSE, Object3D, Scene, Vector3, WebGLRenderer } from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { Store } from 'vuex';
import { AppState } from '../state';
import {
  defaultPinClickAnimation,
  stagePinClickAnimation,
} from '../utils/animations';
import { hideAllPins, hideNonVideoPins } from '../utils/pins';

export const buildControls = (renderer: WebGLRenderer, camera: Camera) => {
  const _v = new Vector3();
  const minPan = new Vector3(-450, 0, -450);
  const maxPan = new Vector3(450, 0, 450);
  const controls = new MapControls(camera, renderer.domElement);

  controls.mouseButtons = {
    ...controls.mouseButtons,
    LEFT: MOUSE.PAN,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.ROTATE,
  };

  setRestrictedControls(controls);

  const onControlsChange = () => {
    _v.copy(controls.target);
    controls.target.clamp(minPan, maxPan);
  };

  controls.addEventListener('change', onControlsChange);

  return controls;
};

export const setRestrictedControls = (controls: MapControls) => {
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = 0;

  controls.minDistance = 100;
  controls.maxDistance = 2000;

  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.25;

  controls.panSpeed = 0.25;
  controls.rotateSpeed = 0.25;
  controls.zoomSpeed = 0.25;
};

export const loadCameraFromMemory = (
  camera: Camera,
  store: Store<AppState>
) => {
  const { cameraPosition } = store.state;
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
};

export const addListeners = (controls: MapControls, scene: Scene) => {
  document.addEventListener('pin-clicked', (e: any) =>
    onPinClicked(e, controls, scene)
  );
};

const onPinClicked = (e: any, controls: MapControls, scene: Scene) => {
  const { pin, route, icon } = e.detail;
  setRestrictedControls(controls);
  controls.update();
  handlePinClick(controls, pin, route, icon, scene);
};

const handlePinClick = (
  controls: MapControls,
  pin: Object3D,
  route: string,
  icon: string,
  scene: Scene
) => {
  switch (icon) {
    case 'volume-on':
      hideNonVideoPins();
      break;

    case 'stage':
      hideNonVideoPins();
      stagePinClickAnimation(controls, scene);
      break;

    default:
      hideAllPins();
      defaultPinClickAnimation(controls, pin, route);
      break;
  }
};
