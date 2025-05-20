import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const scaleMedias = document.querySelectorAll('.js-scale-media__picture');
if (scaleMedias) {
  scaleMedias.forEach(media => {
    media.style.overflow = 'hidden';
    let mediaTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: media,
        start: 'top center-=20%',
        end: () => '+=' + (media.clientHeight + media.clientHeight),
        // markers: true,
      }
    })

    const innerMedia = media.querySelector('.js-scale-media');

    mediaTl.addLabel('start')
      .to(innerMedia, {
        scale: 1.3,
        ease: "expoScale(0.5,7,none)",
        duration: .8,
      })
  })
}
const scaleOutMedias = document.querySelectorAll('.js-scale-out-media__picture');
if (scaleOutMedias) {
  scaleOutMedias.forEach(media => {
    media.style.overflow = 'hidden';
    let mediaTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: media,
        start: 'top center+=20%',
        end: () => '+=' + (media.clientHeight + media.clientHeight),
        // markers: true,
      }
    })

    const innerMedia = media.querySelector('.js-scale-out-media');
    innerMedia.style.transform = 'scale(1.3)';

    mediaTl.addLabel('start')
      .to(innerMedia, {
        scale: 1,
        ease: "expoScale(0.5,7,none)",
        duration: .8,
      })
  })
}
