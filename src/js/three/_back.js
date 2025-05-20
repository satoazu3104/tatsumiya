import * as THREE from 'three';

// 頂点シェーダー
const vertexShader = /* glsl */`
  uniform float time;
  varying float vRadius;
  void main() {
    vec3 pos = position;
    float angle = atan(pos.y, pos.x);
    float radius = length(pos.xy);
    radius += 0.1 * sin(1.0 * angle + time) * cos(1.0 * angle + 0.5 * time);

    // 横方向に大きく伸びたり縮んだりさせる。
    float stretch = 1.3 + 0.5 * sin(time * 0.2);
    pos.x *= stretch;
    
    // 位置の変動を追加
    float moveSpeed = 0.5; // 移動速度
    pos.x += 5.0 - mod(time * moveSpeed, 10.0); // 右から左へ移動し続ける
    pos.y += 0.5 * cos(time * 0.5);

    vRadius = radius;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// フラグメントシェーダー
const fragmentShader = /* glsl */`
  uniform float time;
  varying float vRadius;

  // シンプルなノイズ関数
  float random(vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
  }

  void main() {
    float alpha = 1.0 - smoothstep(0.1, 3.0, vRadius);

    vec2 st = gl_FragCoord.xy / vec2(800.0, 600.0); // 画面の解像度に基づいた座標
    float noise = random(st + vRadius * 1.0); // ノイズの生成
    float intensity = noise * 2.5 + 0.05; // ノイズの濃さを調整
    
    vec3 noiseColor = vec3(3.0) * intensity; //ノイズの色
    vec3 bgColor = vec3(21.0 / 255.0, 104.0 / 255.0, 168.0 / 255.0); // 背景色
    
    float bgAlpha = .5 - smoothstep(1.0, 3.0, vRadius);
    vec4 bgColorWithAlpha = vec4(bgColor, bgAlpha);
    
    // 背景色とノイズを合成
    vec3 color = mix(bgColorWithAlpha.rgb, noiseColor, intensity);

    gl_FragColor = vec4(color, alpha); // ノイズを適用した色
    // gl_FragColor = vec4(21.0, 104.0, 168.0, 1.0); // ノイズを適用しない色
  }
`;

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.z = 2;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const circleGeometry = new THREE.CircleGeometry(3, 200);

const uniformsBottom = {
  time: { value: 1.0 }
};

const uniformsTop = {
  time: { value: 1.0 }
};

const materialBottom = new THREE.ShaderMaterial({
  uniforms: uniformsBottom,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  transparent: true, // 透明を有効にする
  depthWrite: false, // 深度バッファへの書き込みを無効にする
  blending: THREE.NormalBlending // 通常のブレンドモード
});

const materialTop = new THREE.ShaderMaterial({
  uniforms: uniformsTop,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  transparent: true, // 透明を有効にする
  depthWrite: false, // 深度バッファへの書き込みを無効にする
  blending: THREE.NormalBlending // 通常のブレンドモード
});

const circleBottom = new THREE.Mesh(circleGeometry, materialBottom);
circleBottom.position.y = -2;
scene.add(circleBottom);

const circleTop = new THREE.Mesh(circleGeometry, materialTop);
circleTop.position.x = 4;
circleTop.position.y = 2;
scene.add(circleTop);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

const mod = (n, m) => ((n % m) + m) % m;

const animate = () => {
  requestAnimationFrame(animate);

  // 円の移動を個別に管理
  circleBottom.position.x = 5.0 - mod(uniformsBottom.time.value * 0.5, 10.0);
  circleBottom.position.y = -2 + 0.5 * Math.cos(uniformsBottom.time.value * 0.5);

  circleTop.position.x = 4 + 5.0 - mod(uniformsTop.time.value * 0.5, 10.0);
  circleTop.position.y = 2 + 0.5 * Math.cos(uniformsTop.time.value * 0.5);

  uniformsBottom.time.value += 0.01;
  uniformsTop.time.value += 0.01;

  renderer.render(scene, camera);
};
animate();
