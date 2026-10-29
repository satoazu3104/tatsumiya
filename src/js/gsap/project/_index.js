import './_random';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const fvWrap = document.querySelector('.l-section__fv');
if (fvWrap) {
    const backImg = fvWrap.querySelector('.p-img__back__picture');
    const backImgInner = backImg.querySelector('img');
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

    gsap.set(backImgInner, {
        objectPosition: '0% 40%',
    })

    mediaParallax.to(backImgInner, {
        objectPosition: '0% 60%',
        ease: "power1.inOut",
    })
}