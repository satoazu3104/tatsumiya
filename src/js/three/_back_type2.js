import * as THREE from 'three';

let scene, camera, renderer, particles, particleSystem, clock, offsets, speeds, originalSpeeds;
let explosion = false, explosionTime = 0, explosionDuration = .2, returnDuration = 1;
let speedMultiplier = 30; // 速度の増加倍率
let easingFunction = easeInOutQuad;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
  camera.position.y = 3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.classList.add('back-wave');
  document.body.appendChild(renderer.domElement);

  let particleCount = 8000;
  particles = new THREE.BufferGeometry();
  let positions = new Float32Array(particleCount * 3);
  let colors = new Float32Array(particleCount * 3);
  let sizes = new Float32Array(particleCount); // パーティクルのサイズ用
  offsets = new Float32Array(particleCount);
  speeds = new Float32Array(particleCount);
  originalSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    let x = (Math.random() - 0.1) * 200;
    let y = (Math.random() - 0.1) * 200;
    let z = (Math.random() - 0.1) * 200;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    colors[i * 3] = x / 200 + 0.1;
    colors[i * 3 + 1] = y / 200 + 0.1;
    colors[i * 3 + 2] = z / 200 + 0.1;

    sizes[i] = 0.05; // パーティクルのサイズを適切に設定
    offsets[i] = Math.random() * 1 * Math.PI;
    speeds[i] = 0.01 + Math.random() * 0.005;
    originalSpeeds[i] = speeds[i];
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1)); // サイズ属性を追加

  let textureLoader = new THREE.TextureLoader();
  let particleTexture = textureLoader.load(tmp_path.temp_uri + '/dist/assets/images/common/circle-particle.webp'); // テクスチャパスを適切に設定

  let particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: particleTexture },
    },
    vertexShader: /* glsl */`
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (1200.0 / -mvPosition.z);
        vAlpha = smoothstep(0.0, 1.0, (mvPosition.z + 100.0) / 200.0); // 近くのパーティクルを透明にし、遠くのパーティクルを不透明にする
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      varying float vAlpha;
      
      vec4 blur(sampler2D image, vec2 uv, vec2 resolution, float radius) {
        vec4 color = vec4(0.0);
        vec2 texelSize = 1.0 / resolution;
        float total = 0.0;
        
        for (float x = -radius; x <= radius; x++) {
          for (float y = -radius; y <= radius; y++) {
            float weight = exp(-(x*x + y*y) / (2.0 * radius * radius));
            color += texture2D(image, uv + vec2(x, y) * texelSize) * weight;
            total += weight;
          }
        }
        
        return color / total;
      }

      void main() {
        vec4 color = vec4(vColor, vAlpha); 
        color *= blur(pointTexture, gl_PointCoord, vec2(256.0, 256.0), 10.0); // ブラーを適用
        gl_FragColor = color;
      }
    `,
    transparent: true
  });

  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  clock = new THREE.Clock();

  animate();

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('click', onClick, false);

  const hoverElements = document.querySelectorAll('.js-particle-hover');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', onClick, false);
  });
}

function onClick(event) {
  explosion = true;
  explosionTime = clock.getElapsedTime();
}

function easeInOutQuad(t) {
  // return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animate() {
  requestAnimationFrame(animate);

  let time = clock.getElapsedTime();
  let positions = particleSystem.geometry.attributes.position.array;

  if (explosion) {
    let elapsed = time - explosionTime;
    let totalDuration = explosionDuration + returnDuration;
    if (elapsed < totalDuration) {
      let easeFactor;
      if (elapsed < explosionDuration) {
        easeFactor = easingFunction(elapsed / explosionDuration);
      } else {
        easeFactor = easingFunction(1 - (elapsed - explosionDuration) / returnDuration);
      }
      for (let i = 0; i < speeds.length; i++) {
        speeds[i] = originalSpeeds[i] * (1 + speedMultiplier * easeFactor); // 速度をイージングで増加/減少
      }
    } else {
      explosion = false;
      for (let i = 0; i < speeds.length; i++) {
        speeds[i] = originalSpeeds[i]; // 速度を元に戻す
      }
    }
  }

  for (let i = 0; i < positions.length / 3; i++) {
    let x = positions[i * 3];
    let offset = offsets[i];
    positions[i * 3 + 1] = 1.5 * Math.sin(0.1 * x + time + offset);

    // パーティクルを左に移動
    positions[i * 3] -= speeds[i];

    // 左に到達したら戻す
    if (positions[i * 3] < -100) {
      positions[i * 3] = 100;
    }
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
