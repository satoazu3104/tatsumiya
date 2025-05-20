import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const positionMedias = document.querySelectorAll('.js-position-media__picture');

if (positionMedias) {
  positionMedias.forEach(elm => {
    let elmTl = gsap.timeline({
      scrollTrigger: {
        scrub: .5,
        trigger: elm,
        start: 'top bottom',
        end: () => '+=' + (window.innerHeight + elm.clientHeight),
        // markers: true,
        invalidateOnRefresh: true,
      }
    })

    const inner = elm.querySelector('.js-position-media');
    inner.style.objectPosition = '0% 10%';

    elmTl.addLabel('start')
      .to(inner, {
        objectPosition: '0% 90%',
        duration: 1,
      })
  })
}