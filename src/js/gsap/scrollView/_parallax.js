import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const parallaxes = document.querySelectorAll('.js-parallax');

if (parallaxes) {

    parallaxes.forEach(item => {
        let setPosition = item.dataset.position ?? 50;
        let speed = item.dataset.speed ?? 1.5;

        let itemTl = gsap.timeline({
            scrollTrigger: {
                scrub: .5,
                trigger: item,
                start: `top bottom+=${setPosition + 'px'}`,
                end: () => '+=' + (item.clientHeight + window.innerHeight),
                // markers: true
            }
        })

        gsap.set(item, {
            objectPosition: '0% 30%',
        })

        itemTl.addLabel('start')
            .to(item, {
                objectPosition: '0% 80%',
                ease: 'power1.out'
            })
    });
}