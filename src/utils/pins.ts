import {
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
} from 'three';

interface Pin {
  pin: Object3D;
  icon: string;
  route: string;
}

export const createPinDomElements = (scene: Scene): Object3D[] => {
  let pins: Pin[] = [];
  const icons = [
    'clubhouse',
    'arena',
    'gallery',
    'booth',
    'info',
    'stage',
    'shootout',
    'shopping',
    'charity',
    'arrow',
    'volume-off',
  ];
  const routes = [
    '/clubhouse',
    '/arena',
    '/gallery',
    '/partnership-pavilion',
    '/info',
    '/event-stage',
    '/penalty-shootout',
    '/shop',
    '/charity',
    '/event-stage',
    '',
  ];

  for (let i = 0; i < icons.length; i++) {
    const sphereGeometry = new SphereGeometry();
    const sphereMaterial = new MeshStandardMaterial({
      transparent: true,
      opacity: 0,
    });
    pins.push({
      pin: new Mesh(sphereGeometry, sphereMaterial),
      icon: icons[i],
      route: routes[i],
    });
  }

  pins = positionPins(pins);
  pins = pins.map((pin: Pin, i: number): Pin => assemblePinDomElements(pin, i));
  pins.forEach(({ pin }: Pin) => scene.add(pin));

  return pins.map((it) => it.pin);
};

const positionPins = (pins: Pin[]): Pin[] => {
  // Clubhouse
  pins[0].pin.position.x = -100;
  pins[0].pin.position.y = 0;
  pins[0].pin.position.z = 0;

  // Arena
  pins[1].pin.position.x = 685;
  pins[1].pin.position.y = 245;
  pins[1].pin.position.z = 70;

  // Gallery
  pins[2].pin.position.x = -400;
  pins[2].pin.position.y = 0;
  pins[2].pin.position.z = 700;

  // Partnership
  pins[3].pin.position.x = -650;
  pins[3].pin.position.y = 115;
  pins[3].pin.position.z = -100;

  // Info
  pins[4].pin.position.x = 100;
  pins[4].pin.position.y = 0;
  pins[4].pin.position.z = 500;

  // Stage
  pins[5].pin.position.x = -100;
  pins[5].pin.position.y = 10;
  pins[5].pin.position.z = -800;

  // Shootout
  pins[6].pin.position.x = 120;
  pins[6].pin.position.y = 135;
  pins[6].pin.position.z = -505;

  // Shops
  pins[7].pin.position.x = 400;
  pins[7].pin.position.y = 0;
  pins[7].pin.position.z = -700;

  // Charity
  pins[8].pin.position.x = 550;
  pins[8].pin.position.y = 0;
  pins[8].pin.position.z = 450;

  // Stage Link
  pins[9].pin.position.x = 255;
  pins[9].pin.position.y = -550;
  pins[9].pin.position.z = -700;

  // Stage volume
  pins[10].pin.position.x = -325;
  pins[10].pin.position.y = -550;
  pins[10].pin.position.z = -700;

  return pins;
};

export const assemblePinDomElements = (pinObj: Pin, index: number): Pin => {
  const { pin, icon, route } = pinObj;
  const { x, y, z } = pin.position;
  const wrapper = document.getElementById('canvas-wrapper')!;
  const pinContainer = document.createElement('div');
  const pinEl = document.createElement('router-link') as HTMLAnchorElement;
  const pinElIcon = document.createElement('img');
  const pinStem = document.createElement('div');
  const pinBase = document.createElement('img');

  pinContainer.id = `pin-container-${index}`;
  pinContainer.className = 'pin-container';

  pinEl.id = `pin-${index}`;
  pinEl.className = 'pin';

  pinElIcon.id = `pin-icon-${index}`;
  pinElIcon.src = `/icons/pin-icons/${icon}.png`;
  pinElIcon.alt = icon;
  pinElIcon.className = 'pin-icon';

  pinStem.id = `pin-stem-${index}`;
  pinStem.className = 'pin-stem';

  pinBase.id = `pin-base-${index}`;
  pinBase.className = 'pin-base';
  pinBase.src = 'icons/pin-icons/pin-base.png';

  // Gallery adjustments
  if (index === 2) {
    pinElIcon.style.marginRight = '-5px';
  }

  // Stage adjustments
  if (index === 5) {
    pinStem.style.display = 'none';
    pinBase.style.display = 'none';
  }

  // Stage player adjustments
  if (index === 9 || index === 10) {
    pinContainer.style.display = 'none';
    pinStem.style.display = 'none';
    pinBase.style.display = 'none';
  }

  wrapper.appendChild(pinContainer);
  pinContainer.appendChild(pinEl);
  pinContainer.appendChild(pinStem);
  pinContainer.appendChild(pinBase);
  pinEl.appendChild(pinElIcon);

  pinEl.addEventListener('mouseenter', () =>
    onMouseEnter(pinEl, pinElIcon, icon)
  );
  pinEl.addEventListener('mouseleave', () =>
    onMouseLeave(pinEl, pinElIcon, icon)
  );
  pinEl.addEventListener('click', (e: MouseEvent) =>
    onPinClicked(e, route, pin, icon)
  );

  return pinObj;
};

const onPinClicked = (
  event: MouseEvent,
  route: string,
  pin: Object3D,
  icon: string
) => {
  if (
    [
      'gallery',
      'booth',
      'shopping',
      'info',
      'charity',
      'clubhouse',
      'stage',
    ].includes(icon)
  ) {
    document.dispatchEvent(
      new CustomEvent<{
        route: string;
        event: MouseEvent;
        pin: Object3D;
        icon: string;
      }>('pin-clicked', {
        detail: {
          route,
          event,
          pin,
          icon,
        },
      })
    );
  }
};

const onMouseEnter = (
  pinEl: HTMLAnchorElement,
  pinElIcon: HTMLImageElement,
  icon: string
) => {
  pinEl.style.backgroundColor = '#ffd368';

  if (['volume-on', 'volume-off'].includes(icon)) {
    return;
  } else if (['arena', 'shootout'].includes(icon)) {
    pinElIcon.src = `/icons/pin-icons/lock.png`;
  } else {
    pinElIcon.src = `icons/pin-icons/${icon}-dark.png`;
  }
};

const onMouseLeave = (
  pinEl: HTMLAnchorElement,
  pinElIcon: HTMLImageElement,
  icon: string
) => {
  pinEl.style.backgroundColor = '#28273d';

  if (['volume-on', 'volume-off'].includes(icon)) {
    return;
  }

  pinElIcon.src = `icons/pin-icons/${icon}.png`;
};

export const convert3dTo2d = (
  position: Vector3,
  camera: PerspectiveCamera
): Vector3 => {
  const p = new Vector3().copy(position);
  const vector = p.project(camera);
  const wrapper = document.getElementById('canvas-wrapper')!;

  vector.x = ((vector.x + 1) / 2) * wrapper.clientWidth;
  vector.y = (-(vector.y - 1) / 2) * wrapper.clientHeight;

  return vector;
};

export const movePins = (
  camera: PerspectiveCamera,
  pins: Object3D[]
): Object3D[] => {
  const positions = pins.map((it: Object3D) =>
    convert3dTo2d(it.position, camera)
  );

  positions.forEach((position: { x: number; y: number }, index: number) => {
    const pinContainer = document.getElementById(`pin-container-${index}`)!;

    pinContainer.style.top = `${position.y - 117.5}px`;
    pinContainer.style.left = `${position.x - 32.5}px`;
  });

  return pins;
};

export const hideNonVideoPins = () => {
  const pins = document.getElementsByClassName('pin-container');

  for (let i = 0; i < pins.length; i++) {
    if (pins[i].id !== 'pin-container-9' || pins[i].id !== 'pin-container-10') {
      (pins[i] as HTMLDivElement).style.visibility = 'hidden';
    }
  }
};

export const hideAllPins = () => {
  const pins = document.getElementsByClassName('pin-container');

  for (let i = 0; i < pins.length; i++) {
    (pins[i] as HTMLDivElement).style.visibility = 'hidden';
  }
};
