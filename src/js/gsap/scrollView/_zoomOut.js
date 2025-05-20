import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollZoomOut = document.querySelectorAll('.js-zoom-out');
if (scrollZoomOut) {
  scrollZoomOut.forEach(elm => {
    let elmTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: elm,
        start: 'top bottom-=20%',
        end: () => '+=' + (elm.clientHeight - elm.clientHeight + 50),
        // markers: true
      }
    })

    const inners = elm.querySelectorAll('.js-zoom-out-inner');

    inners.forEach((inner, index) => {

      const state = inner.dataset.state ?? 'y';

      const rect = inner.getBoundingClientRect();
      const perspectiveValue = window.innerWidth / 2 * 2.5; // Adjust multiplier as needed
      inner.style.transform = `perspective(${perspectiveValue}px)`;

      let set = {
        'x': {
          scale: 0.8,
          opacity: 0,
          rotateY: '24deg',
          x: 200
        },
        'y': {
          scale: 0.8,
          opacity: 0,
          rotateX: '-65deg',
          y: 200
        }
      }

      let to = {
        'x': {
          x: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          delay: 0.1 * index
        },
        'y': {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          delay: 0.1 * index
        }
      }

      gsap.set(inner, set[state]);

      elmTl.addLabel('start')
        .to(inner, to[state], '<');
    })
  })
}