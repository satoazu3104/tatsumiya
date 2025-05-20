import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const blockMedias = document.querySelectorAll('.js-block-media__picture');
if (blockMedias) {
    blockMedias.forEach(media => {
        let mediaTl = gsap.timeline({
            scrollTrigger: {
                scrub: 2,
                trigger: media,
                start: 'top center+=20%',
                end: () => '+=' + (media.clientHeight - media.clientHeight),
                // markers: true,
            }
        })

        const innerMedia = media.querySelector('.js-block-media');

        mediaTl.addLabel('start')
            .to(media, {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                duration: 2,
                stagger: {
                    each: .1,
                    grid: 'auto'
                }
            })
            .to(innerMedia, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                delay: .5,
                duration: 1.5,
                stagger: {
                    each: .1,
                    grid: 'auto'
                }
            })
    });
}