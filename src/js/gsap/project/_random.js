import { gsap } from 'gsap';
import { _isUndefined } from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const randomWrappers = document.querySelectorAll('.js-random-wrap');
if (randomWrappers) {
    randomWrappers.forEach(wrapper => {

        const randomElms = wrapper.querySelectorAll('.js-random-number');
        randomElms.forEach(element => {

            let randomTl = gsap.timeline({
                scrollTrigger: {
                    scrub: 1,
                    trigger: wrapper,
                    start: 'top bottom-=8%',
                    end: () => '+=' + (wrapper.clientHeight - wrapper.clientHeight),
                    // markers: true
                }
            })

            const radix = 10;
            const digits = element.innerText.length;
            const finalNumber = parseInt(element.innerText, 10);
            const totalCycles = 100; // total number of times the number will change
            const cycleDuration = .5; // duration for each cycle in seconds
            let randomValue = 0;


            if (digits == 1) {
                randomValue = 10;
            } else if (digits == 2) {
                randomValue = 100;
            } else {
                if (finalNumber == 100) {
                    randomValue = 100;
                } else {
                    randomValue = 1000;
                }
            }

            randomTl.addLabel('start')
                .to(element, {
                    duration: .02,
                    ease: 'linear',
                    repeat: totalCycles - 1,
                    onRepeat: () => {
                        element.innerText = Math.floor(Math.random() * randomValue); // Random number between 0 and 99
                    },
                    onComplete: () => {
                        element.innerText = finalNumber; // Set to the final number
                    }
                })
        })
    })
}