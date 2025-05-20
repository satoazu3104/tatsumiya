document.addEventListener('DOMContentLoaded', () => {
  const clipTargets = document.querySelectorAll('.js-clip-target');
  if (clipTargets) {
    clipTargets.forEach(clipTarget => {
      function setClipPath() {
        const position = clipTarget.getAttribute('data-position');
        const angle = parseFloat(clipTarget.getAttribute('data-angle')) || 16;
        const width = clipTarget.offsetWidth;
        const height = clipTarget.offsetHeight;
        const radians = angle * (Math.PI / 180);
        let distance = Math.abs(height * Math.tan(radians))
      
        // console.log(distance)

        let clipPath;

        switch (position) {
          case 'top-left':
            clipPath = `polygon(0 0, 100% 0, 100% 100%, calc(0% + ${distance}px) 100%)`;
            break;
          case 'top-right':
            clipPath = `polygon(0 0, 100% 0, calc(100% - ${distance}px) 100%, 0 100%`;
            break;
          case 'bottom-left':
            clipPath = `polygon(calc(0% + ${distance}px) 0, 100% 0, 100% 100%, 0% 100%)`;
            break;
          case 'bottom-right':
            clipPath = `polygon(0 0, calc(100% - ${distance}px) 0, 100% 100%, 0 100%)`;
            break;
        }

        clipTarget.style.clipPath = clipPath;
      };

      window.addEventListener('resize', setClipPath);

      // 初期状態で設定
      setClipPath();
    });
  }
})