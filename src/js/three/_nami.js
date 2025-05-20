import * as THREE from 'three';
import { gsap } from 'gsap';

if (window.innerWidth >= 1024) {
  document.querySelectorAll('.js-nami__picture').forEach(pictureElement => {
    init(pictureElement);
  });
}
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    document.querySelectorAll('.js-nami__picture').forEach(pictureElement => {
      init(pictureElement);
    });
  }
});

function init(pictureElement) {
  const imgElement = pictureElement.querySelector('img');

  let camera, scene, renderer;
  let uniforms;
  let isAnimating = false;
  let hover = false;

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneGeometry(2, 2);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(imgElement.src);

  uniforms = {
    u_time: { value: 1.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_texture: { value: texture },
    u_ripple_center: { value: new THREE.Vector2(0.5, 0.5) }, // 中心に固定
    u_amplitude: { value: 0.0 } // 波の振幅
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader()
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(imgElement.clientWidth, imgElement.clientHeight);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.classList.add('nami');
  pictureElement.appendChild(renderer.domElement);

  const target = pictureElement.closest('.js-nami-target');

  let targetElm;

  if (target == null) {
    targetElm = pictureElement;
  } else {
    targetElm = target;
  }

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  targetElm.addEventListener('mouseenter', onMouseEnter, false);
  targetElm.addEventListener('mouseleave', onMouseLeave, false);

  function onWindowResize() {
    uniforms.u_resolution.value.x = imgElement.clientWidth;
    uniforms.u_resolution.value.y = imgElement.clientHeight;

    renderer.setSize(imgElement.clientWidth, imgElement.clientHeight);
  }

  function onMouseEnter(event) {
    hover = true;
    if (!isAnimating) {
      isAnimating = true;
      uniforms.u_time.value = 0; // ホバーごとにリセット
      animate();
    }
    gsap.to(uniforms.u_amplitude, { value: 0.005, duration: 1, ease: "power2.out" }); // イージングで振幅を増加
  }

  function onMouseLeave(event) {
    hover = false;
    gsap.to(uniforms.u_amplitude, { value: 0.0, duration: 1, ease: "power2.out", onComplete: () => { isAnimating = false; } }); // イージングで振幅を減少
  }

  function animate() {
    if (hover || uniforms.u_amplitude.value > 0) {
      requestAnimationFrame(animate);
      render();
    }
  }

  function render() {
    uniforms.u_time.value += 0.005; // アニメーション速度
    renderer.render(scene, camera);
  }

  function vertexShader() {
    return `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `;
  }

  function fragmentShader() {
    return `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_ripple_center;
            uniform sampler2D u_texture;
            uniform float u_amplitude;

            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                vec2 rippleCenter = u_ripple_center;
                float dist = distance(st, rippleCenter);
                float ripple = sin((dist - u_time) * 2.0) * u_amplitude / (dist + 0.5); // 波紋の中心から広がる波
                st += ripple;

                vec4 color = texture2D(u_texture, st);
                gl_FragColor = color;
            }
        `;
  }
}
