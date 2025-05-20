import ScrollMagic from 'scrollmagic';

class ScrollFadeIn {
  constructor() {
    let boxes = document.querySelectorAll('.animation');
    if (boxes.length === 0) {
      return;
    }

    let controller = new ScrollMagic.Controller();

    boxes.forEach(box => {
      let dataOffset = box.dataset.offset ?? 50;
      let scene = new ScrollMagic.Scene({
        triggerElement: box,
        triggerHook: 0.8, // トリガーフックを調整
        reverse: true,
        offset: dataOffset // 必要に応じてオフセットを調整
      })
        .addTo(controller);

      scene.on('enter', () => {
        box.classList.add('active');
      });

      scene.on('leave', () => {
        box.classList.remove('active');
      });
    });
  }
}

new ScrollFadeIn();
