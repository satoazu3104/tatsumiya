import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blurMedias = document.querySelectorAll('.js-blur-media__picture');
if (blurMedias) {
  // BlurMedia(blurMedias);
}

export default function BlurMedia(medias) {
  medias.forEach(media => {
    // オリジナル要素の複製
    const origin = media.cloneNode(true);

    // wraper要素の作成
    const wrapper = document.createElement('div');
    wrapper.classList.add('js-blur-media__wrap');
    gsap.set(wrapper, {
      position: 'relative',
      zIndex: 1
    })
    wrapper.appendChild(origin);

    // エフェクト要素の作成
    const effect = media.cloneNode(true);
    const effectChild = effect.querySelector('.js-blur-media');

    const scaleValue = {
      normal: {
        x: 42,
        y: 20
      }
    }

    const setScale = {
      normal: 1.036,
      big: 1.138,
      fv: 1,
    }

    const setPosition = {
      x: {
        normal: {
          left: -42,
          right: 20,
        },
        big: {
          // left: `clamp(${-127 * .66}px, ${-127 / 1920 * 100}vw, -127px)`,
          // right: `clamp(${127 * .66}px, ${127 / 1920 * 100}vw, 127px)`,
          left: -127,
          right: 27,
        },
        fv: {
          left: 80,
        }
      },
      y: {
        normal: 20,
        big: 0,
        fv: 80,
      },
      left: {
        left: 0,
        right: 'unset',
      },
      right: {
        left: 'unset',
        right: 0,
      }
    }

    const position = effectChild.dataset.position ?? 'left';
    const scale = effectChild.dataset.scale ?? 'normal';
    
    console.log(scale);

    gsap.set(effect, {
      overflow: 'hidden',
      position: 'absolute',
      transformOrigin: 'left top',
      scale: setScale[scale],
      zIndex: -10,
      top: 0,
      left: setPosition[position],
      right: 0,
      opacity: 0,
    })
    gsap.set(effectChild, {
      filter: 'blur(30px)',
      opacity: .8,
      scale: .88
    })
    wrapper.appendChild(effect);

    // オリジナル要素の後に挿入
    media.after(wrapper);

    let blurTl = gsap.timeline({
      scrollTrigger: {
        scrub: 3,
        trigger: origin,
        start: 'top bottom-=20%',
        end: () => '+=' + (origin.clientHeight - origin.clientHeight),
        // markers: true
      }
    })

    blurTl.addLabel('start')
      .to(effect, {
        opacity: 1,
        x: setPosition['x'][scale][position],
        y: setPosition['y'][scale],
      })

    media.remove();
  });
}