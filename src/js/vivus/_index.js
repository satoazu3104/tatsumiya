import Vivus from 'vivus';

window.onload = function () {
  const firstAnimWrap = document.querySelector('.u-anim__first');
  const logo = document.querySelector('.u-anim__first__logo');
  if (logo) {
    logo.classList.add('active');
  }

  if (firstAnimWrap) {
    // デバイスの幅に応じてアニメーションのdurationを設定
    const isMobile = window.innerWidth <= 768; // スマホの幅を768pxと仮定
    const duration = isMobile ? 150 : 300; // スマホは150、PCは300に設定

    // Vivusインスタンスを初期化
    const animate = new Vivus('my-svg', {
      type: 'delayed',
      duration: duration,
      pathTimingFunction: Vivus.EASE,
      animTimingFunction: Vivus.EASE,
      start: 'manual', // 手動で再生
    });

    // アニメーションを開始し、終了後にクラスを追加
    animate.play(1, function () {
      firstAnimWrap.classList.add('active'); // アニメーション終了時のクラス追加
    });
  }
};