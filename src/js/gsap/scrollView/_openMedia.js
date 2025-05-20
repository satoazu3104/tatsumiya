import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const openMedias = document.querySelectorAll('.js-open-media');

if (openMedias) {
  openMedias.forEach(media => {
    let mediaTl = gsap.timeline({
      scrollTrigger: {
        scrub: 4,
        trigger: media,
        start: 'top center+=20%',
        end: () => '+=' + (media.clientHeight - media.clientHeight),
        markers: true
      }
    })

    gsap.set(media, {
      transformOrigin: 'left top',
      rotate: '20deg',
      opacity: 0
    })

    mediaTl.add('start')
      .to(media, {
        opacity: 1,
        rotate: '0deg',
        duration: .2,
        ease: "elastic.out(1,0.3)",
      })
  })
}