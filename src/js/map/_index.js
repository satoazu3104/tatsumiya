const mapWrap = document.getElementById('googleMap');
if(mapWrap) {
  // 動的にIframeを作成
  let iframe = document.createElement('iframe');

  // Iframeの属性を設定
  iframe.src = 'https://www.google.com/maps/embed?pb=...'; // ここには適切なGoogleマップのURLを入力してください
  iframe.classList.add('p-access__map');
  iframe.style.border = '0';
  iframe.allowFullscreen = true;
  iframe.setAttribute('aria-hidden', 'false');
  iframe.tabIndex = 0;

  // Iframeをページに追加
  mapWrap.appendChild(iframe);
}