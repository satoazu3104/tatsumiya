import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const containers = document.querySelectorAll('.js-horizontal');

if (containers) {
  containers.forEach(container => {
    const items = container.querySelectorAll('.js-horizontal-items');

    if (window.innerWidth >= 1025) {

      let scrollContainer = gsap.to(container, {
        xPercent: -100 * (items.length - 1),
        x: container.innerWidth,
        ease: 'power0.inOut',

        scrollTrigger: {
          trigger: container,
          start: 'top top+=25%',
          end: () => '+=' + (container.offsetWidth) + 'px',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onSnapComplete: () => {
          }
          // anticipatePin: 1,
          // markers: true
        }
      })

    } else {

    }

  });
}