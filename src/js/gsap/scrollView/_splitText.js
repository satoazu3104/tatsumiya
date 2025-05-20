import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const splitTexts = document.querySelectorAll('.js-split-text');

if (splitTexts) {
  splitTexts.forEach((text, index) => {

    let parentClasses = text.classList.value;
    parentClasses = parentClasses.replace(/ /g, ',').split(',');
    const splitList = document.createElement('div');

    parentClasses.forEach(className => {
      if (className.trim() && className !== 'js-split-text') {
        splitList.classList.add(className);
      }
    });

    splitList.classList.add('js-split-text__list');

    const innerHTML = text.innerHTML;
    const splitItems = innerHTML.split('<br>');

    // splitListに新しい内容を追加
    splitItems.forEach(item => {
      const line = document.createElement('div');
      line.classList.add('js-split-text__items');

      for (let i = 0; i < item.length; i++) {
        const span = document.createElement('span');
        span.classList.add('js-split-text__span');
        if (item[i] == ' ') {
          span.classList.add('js-split-text__space');
        }
        span.innerHTML = item[i];
        line.appendChild(span);
      }

      splitList.appendChild(line);
    });

    // 元のテキスト要素を空にして、splitListを追加
    text.innerHTML = '';
    gsap.set(text, {
      display: 'none',
    })

    text.after(splitList);

    gsap.set('.js-split-text__span', {
      scale: 1,
      opacity: 0,
      y: '0.5em',
      x: 0,
    //   x: '-0.5em',
    //   y: 0,
    })

    // gsap animation
    let splitTl = gsap.timeline({
      scrollTrigger: {
        scrub: 2,
        trigger: splitList,
        start: 'top bottom-=20%',
        end: () => '+=' + (splitList.clientHeight - splitList.clientHeight),
        // markers: true
      }
    })

    const span = splitList.querySelectorAll('.js-split-text__span');

    splitTl.addLabel('start')
      .to(span, {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        stagger: {
          each: .1,
        }
      })
  });
}