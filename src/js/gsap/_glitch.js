import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
  const glitchElements = document.querySelectorAll('.js-glitch');

  glitchElements.forEach(glitchElement => {
    const parentElement = glitchElement.parentElement;

    // ランダムなクリップパスを生成する関数
    function createRandomClipPath() {
      const randomWidth = Math.random() * 50 + 30; // ランダムな幅（10%～30%）
      const randomHeight = Math.random() * 5 + 1;  // ランダムな高さ（1%～6%）
      const randomLeft = Math.random() * (100 - randomWidth);
      const randomTop = Math.random() * (100 - randomHeight);

      return `polygon(${randomLeft}% ${randomTop}%, ${randomLeft + randomWidth}% ${randomTop}%, ${randomLeft + randomWidth}% ${randomTop + randomHeight}%, ${randomLeft}% ${randomTop + randomHeight}%)`;
    }

    if (parentElement && parentElement.classList.contains('js-glitch__picture')) {
      // 親要素にjs-glitch__pictureがある場合
      for (let i = 0; i < 5; i++) {
        const clonedElement = glitchElement.cloneNode(true);
        clonedElement.style.position = 'absolute';
        clonedElement.style.clipPath = createRandomClipPath();
        clonedElement.classList.add('js-glitch-clone');
        parentElement.appendChild(clonedElement);
      }
      parentElement.classList.add('js-glitch-wrapper');
    } else {
      // 親要素にjs-glitch__pictureが無い場合
      const wrapper = document.createElement('div');
      wrapper.classList.add('js-glitch-wrapper');
      wrapper.style.position = 'relative';

      glitchElement.before(wrapper); // 元の要素の前に挿入
      wrapper.appendChild(glitchElement); // 元の要素をラップ

      for (let i = 0; i < 5; i++) {
        const clonedElement = glitchElement.cloneNode(true);
        clonedElement.style.position = 'absolute';
        clonedElement.style.clipPath = createRandomClipPath();
        clonedElement.classList.add('js-glitch-clone');
        wrapper.appendChild(clonedElement);
      }
    }
  });

  // GSAPアニメーションの設定
  const glitchWrappers = document.querySelectorAll('.js-glitch-wrapper');
  let touchStartX = 0;
  let touchStartY = 0;

  glitchWrappers.forEach(wrapper => {
    function handleInteraction() {
      const child = wrapper.querySelector('.js-glitch');
      if (child && child.href) {
        window.location.href = child.href; // ページ移動
      }
    }

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });
    wrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) { // スクロールではなくタップと見なす閾値
        const child = wrapper.querySelector('.js-glitch');
        if (child && child.href) {
          setTimeout(() => {
            window.location.href = child.href; // ページ移動
          }, 300);
        }
      }
    });

    wrapper.addEventListener('mouseenter', () => {
      const children = wrapper.querySelectorAll('.js-glitch');
      children.forEach((child, index) => {
        if (index !== 0) {
          const length = 80;
          const randomXValues = Array.from({ length: length }, () => (Math.random() - .5) * 200); // ランダムなX値（50%±50%）
          const randomYValues = Array.from({ length: length }, () => (Math.random() - 1.5) * 40); // ランダムなY値（50%±50%）
          const randomScaleValues = Array.from({ length: length }, () => Math.random() * 0.1 + 1); // ランダムなスケール値

          gsap.to(child, {
            keyframes: {
              marginLeft: randomXValues,
              marginTop: randomYValues,
              scale: randomScaleValues,
            },
            opacity: 1,
            duration: .2,
            ease: "none",
          });
        }
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      const children = wrapper.querySelectorAll('.js-glitch');
      children.forEach((child, index) => {
        if (index !== 0) {
          gsap.killTweensOf(child); // アニメーションを停止
          gsap.to(child, {
            duration: 0.1,
            opacity: 0,
            clearProps: 'scale'
          });
        }
      });
    });
  });
});








import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { DigitalGlitch } from 'three/examples/jsm/shaders/DigitalGlitch.js';

// カスタムグリッチパスを作成
class CustomGlitchPass extends ShaderPass {
  constructor(dt_size = 100, glitchDuration = 20) {
    super({
      uniforms: THREE.UniformsUtils.clone(DigitalGlitch.uniforms),
      vertexShader: DigitalGlitch.vertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D tDisp;
        varying vec2 vUv;
        uniform float amount;
        uniform float angle;
        uniform float seed;
        uniform float seed_x;
        uniform float seed_y;
        uniform float distortion_x;
        uniform float distortion_y;
        
        float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 p = vUv;
          vec4 color = texture2D(tDiffuse, p);

          vec2 disp = texture2D(tDisp, p * seed * seed).rg;
          vec2 offset = amount * 0.5 * vec2(sin(angle), cos(angle)); // offset を増加
          vec4 cr = texture2D(tDiffuse, p + disp * distortion_x + offset);
          vec4 cga = texture2D(tDiffuse, p + disp * distortion_y - offset);
          vec4 glitchColor = vec4(cr.r, color.g, cga.b, color.a);
          


          gl_FragColor = glitchColor;
        }
      `,
    });

    this.uniforms['tDisp'].value = this.generateHeightmap(dt_size);

    this.goWild = false;
    this.curF = 0;
    this.glitchDuration = glitchDuration; // グリッチの持続時間
    this.inGlitch = false;
    this.generateTrigger();

    this.dt_size = dt_size;
  }

  generateTrigger() {
    // グリッチ間の時間を短くし、頻繁に発生させる
    this.randX = THREE.MathUtils.randInt(600, 700); // グリッチの間隔を短く設定
  }

  generateHeightmap(dt_size) {
    const data_arr = new Float32Array(dt_size * dt_size * 3);
    const length = dt_size * dt_size;

    for (let i = 0; i < length; i++) {
      const val = THREE.MathUtils.randFloat(0, 1);
      data_arr[i * 3 + 0] = val;
      data_arr[i * 3 + 1] = val;
      data_arr[i * 3 + 2] = val;
    }

    return new THREE.DataTexture(data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType);
  }

  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    this.uniforms['tDiffuse'].value = readBuffer.texture;
    this.uniforms['seed'].value = Math.random();
    this.uniforms['byp'].value = 0;

    if (this.curF % this.randX === 0 || this.goWild) {
      this.uniforms['amount'].value = Math.random() / 30;
      this.uniforms['angle'].value = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
      this.uniforms['seed_x'].value = THREE.MathUtils.randFloat(-0.1, 0.1);
      this.uniforms['seed_y'].value = THREE.MathUtils.randFloat(-0.1, 0.1);
      this.uniforms['distortion_x'].value = THREE.MathUtils.randFloat(0, 0.1);
      this.uniforms['distortion_y'].value = THREE.MathUtils.randFloat(0, 0.1);
      this.uniforms['col_s'].value = 0.01;
      this.curF = 0;
      this.generateTrigger();
    } else if (this.curF % this.randX < this.randX / 5) {
      this.uniforms['amount'].value = Math.random() / 90;
      this.uniforms['angle'].value = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
      this.uniforms['seed_x'].value = THREE.MathUtils.randFloat(-0.3, 0.3);
      this.uniforms['seed_y'].value = THREE.MathUtils.randFloat(-0.3, 0.3);
      this.uniforms['distortion_x'].value = THREE.MathUtils.randFloat(0, 0.1);
      this.uniforms['distortion_y'].value = THREE.MathUtils.randFloat(0, 0.1);
      this.uniforms['col_s'].value = 0.01;
    } else if (!this.goWild) {
      this.uniforms['byp'].value = 1;
      this.uniforms['amount'].value = 0.0; // カラーシフトをリセット
      this.uniforms['distortion_x'].value = 0.0; // カラーシフトをリセット
      this.uniforms['distortion_y'].value = 0.0; // カラーシフトをリセット
    }

    this.curF++;

    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
  }
}

function isDesktop() {
  return window.innerWidth > 1024;
}
function runForDesktop() {
  if (isDesktop()) {
    document.addEventListener("DOMContentLoaded", function () {
      // js-glitch__pictureクラスを持つすべての<picture>要素を取得
      const pictureElements = document.querySelectorAll('.js-glitch-media__picture');

      pictureElements.forEach(pictureElement => {
        // <img>要素を取得し、src属性からURLを取得
        const imgElement = pictureElement.querySelector('img');
        const imgSrc = imgElement ? imgElement.src : null;

        if (imgSrc) {
          // キャンバスコンテナを作成して追加
          const canvasContainer = document.createElement('div');
          canvasContainer.className = 'canvas-container';
          pictureElement.appendChild(canvasContainer);

          // シーン、カメラ、レンダラーを作成
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, pictureElement.clientWidth / pictureElement.clientHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true });
          renderer.setSize(pictureElement.clientWidth, pictureElement.clientHeight);
          canvasContainer.appendChild(renderer.domElement);

          // テクスチャのロード
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(imgSrc, function () {
            // アスペクト比を計算
            const aspect = pictureElement.clientWidth / pictureElement.clientHeight;
            let width, height;
            if (aspect > 1) {
              width = aspect;
              height = 1;
            } else {
              width = 1;
              height = 1 / aspect;
            }

            // 平面ジオメトリとマテリアルを作成し、画像を貼り付ける
            const geometry = new THREE.PlaneGeometry(width, height);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const plane = new THREE.Mesh(geometry, material);
            scene.add(plane);

            // カメラ位置を調整
            const pictureAspect = pictureElement.clientWidth / pictureElement.clientHeight;
            if (pictureAspect > aspect) {
              camera.position.z = width / 2 / Math.tan((camera.fov / 2) * (Math.PI / 180));
            } else {
              camera.position.z = height / 2 / Math.tan((camera.fov / 2) * (Math.PI / 180));
            }
            camera.updateProjectionMatrix();

            // ポストプロセシング用のEffectComposerを作成
            const composer = new EffectComposer(renderer);
            const renderPass = new RenderPass(scene, camera);
            composer.addPass(renderPass);

            // カスタムグリッチパスを追加
            const glitchPass = new CustomGlitchPass(100, 50);
            glitchPass.goWild = false; // グリッチモードの設定
            composer.addPass(glitchPass);

            // アニメーションループ
            function animate() {
              requestAnimationFrame(animate);
              composer.render();
            }
            animate();
          });

          // ウィンドウサイズ変更時にレンダラーとカメラのサイズを更新
          window.addEventListener('resize', function () {
            const width = pictureElement.clientWidth;
            const height = pictureElement.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          });
        }
      });
    });
  }
}

runForDesktop();