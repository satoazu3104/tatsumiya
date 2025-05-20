import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './_positionMedia';
import './_parallax';
import './_blockText';
import './_zoomOut';
import './_splitText';
import './_openMedia';
import './_blurMedia';

gsap.registerPlugin(ScrollTrigger);

const scrollDown = document.querySelectorAll('.js-scroll-down');
const scrollUp = document.querySelectorAll('.js-scroll-up');
const scrollUpLeft = document.querySelectorAll('.js-scroll-up-left');
const scrollUpRight = document.querySelectorAll('.js-scroll-up-right');
const scrollLeft = document.querySelectorAll('.js-scroll-left');
const scrollRight = document.querySelectorAll('.js-scroll-right');
const scrollView = document.querySelectorAll('.js-scroll-view');
const scrollSkew = document.querySelectorAll('.js-scroll-skew');

const GetTriggerPoint = (trigger) => {
    const state = trigger.dataset.position;
    if (state === 'center' || !state) {
        return 'top bottom-=8%';
    } else if (state === 'bottom') {
        return 'top bottom-=8%';
    }
};

// 汎用的に from→to のアニメーションを作る関数
function createScrollAnimation(elm, fromVars, toVars) {
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 2,
            trigger: elm,
            start: GetTriggerPoint(elm),
            // markers: true,
            end: () => '+=' + (elm.clientHeight - elm.clientHeight),
            onRefresh(self) {
                if (self.isActive) {
                    // ビューポート内なら一度アニメーションを再生
                    self.animation.restart();
                }
            }
        }
    });

    // 初期状態セット
    gsap.set(elm, fromVars);


    // 実際のアニメーション
    tl.addLabel('start').to(elm, toVars);
}

// 各セレクタごとにアニメーション設定
scrollDown.forEach(elm => {
    createScrollAnimation(elm,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
    );
});

scrollUp.forEach(elm => {
    createScrollAnimation(elm,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
});

scrollUpLeft.forEach(elm => {
    createScrollAnimation(elm,
        { y: 80, opacity: 0, rotate: '0deg' },
        { y: 0, opacity: 1, duration: 1, rotate: '-2deg', delay: 0.5 }
    );
});

scrollUpRight.forEach(elm => {
    createScrollAnimation(elm,
        { y: 80, opacity: 0, rotate: '0deg' },
        { y: 0, opacity: 1, duration: 1, rotate: '2deg', delay: 0.5 }
    );
});

scrollLeft.forEach(elm => {
    createScrollAnimation(elm,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
});

scrollRight.forEach(elm => {
    createScrollAnimation(elm,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
});

scrollView.forEach(elm => {
    createScrollAnimation(elm,
        { opacity: 0 },
        { opacity: 1, duration: 2, delay: 1 }
    );
});

scrollSkew.forEach(elm => {
    createScrollAnimation(elm,
        { skewY: 4, transformOrigin: 'left top', y: 80, opacity: 0 },
        { skewY: 0, y: 0, opacity: 1, duration: 2, delay: 0.8 }
    );
});

// ページロード後に一度だけ全 ScrollTrigger をリフレッシュ
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
