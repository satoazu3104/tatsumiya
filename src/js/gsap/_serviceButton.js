import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceItems = document.querySelectorAll('.p-service__items');

if (serviceItems) {
  serviceItems.forEach(elm => {
    let serviceTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: elm,
        start: 'top center-=10%',
        end: () => '+=' + (elm.clientHeight + elm.clientHeight),
        // markers: true
      }
    })

    if (window.matchMedia('(max-width: 1024px)').matches) {
      serviceTl.addLabel('start')
        .to(elm, {
          height: 210,
          duration: 1
        })
    }
  })
}