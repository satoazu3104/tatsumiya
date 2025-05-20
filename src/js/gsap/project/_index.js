import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const fvWrap = document.querySelector('.l-section__fv');
if (fvWrap) {
    const backImg = fvWrap.querySelector('.p-img__back');
    let fvPinBack = gsap.timeline({
        scrollTrigger: {
            scrub: .5,
            trigger: fvWrap,
            start: `top top`,
            end: 'bottom bottom',
            pin: backImg,              // この要素をピン
            pinSpacing: false,
            // pin: true,
            invalidateOnRefresh: true,
            // markers: true,
        }
    })

    let mediaParallax = gsap.timeline({
        scrollTrigger: {
            scrub: .5,
            trigger: fvWrap,
            start: `top top`,
            end: 'bottom top',
            // markers: true,
        }
    })

    gsap.set(backImg, {
        objectPosition: '0% 40%',
    })

    mediaParallax.to(backImg, {
        objectPosition: '0% 60%',
        ease: "power1.inOut",
    })
}