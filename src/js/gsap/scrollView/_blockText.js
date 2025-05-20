import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const BlockTextAnimation = () => {

  gsap.registerPlugin(ScrollTrigger);

  const blockText = document.querySelectorAll('.p-blocks__wrap');

  if (blockText) {
    blockText.forEach(block => {
      let blockTl = gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: block,
          start: 'top bottom',
          end: () => '+=' + (block.clientHeight - block.clientHeight),
          // markers: true
        }
      })

      const wrap = block.querySelectorAll('.p-blocks__text__wrap');
      const decoy = block.querySelectorAll('.p-blocks__text__decoy');

      blockTl.addLabel('start')
        .to(wrap, {
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          duration: .8,
          stagger: {
            each: .1,
            grid: 'auto'
          }
        })
        .to(decoy, {
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          delay: .8,
          stagger: {
            each: .1,
            grid: 'auto'
          }
        })
    });
  }
}
export default BlockTextAnimation;

const blocksTexts = document.querySelectorAll('.js-blocks-text');
if (blocksTexts) {
  blocksTexts.forEach(block => {
    let innerTexts = block.innerHTML;
    let textsArray = innerTexts.split('<br>'); // 改行で分割

    // div要素を作成
    let divElement = document.createElement('div');
    let classes = Array.from(block.classList).filter(className => className !== 'js-blocks-text');
    divElement.classList.add('p-blocks__wrap');
    divElement.classList.add('c-text--noheight');
    divElement.classList.add(...classes);


    textsArray.forEach(text => {
      // p要素を作成
      let pElement = document.createElement('p');
      let pWrapElement = document.createElement('div');
      let pDecoyElement = document.createElement('div');
      // ブロックのクラスから'js-blocks-text'を削除してクラスを付与
      pElement.classList.add(...classes);
      pElement.classList.add('p-blocks__text');
      pElement.innerHTML = text.trim(); // 余分な空白を削除して挿入

      pWrapElement.classList.add('p-blocks__text__wrap');
      pWrapElement.classList.add('c-text--noheight');
      pWrapElement.classList.add(...classes);
      pDecoyElement.classList.add('p-blocks__text__decoy');

      pWrapElement.appendChild(pElement);
      pWrapElement.appendChild(pDecoyElement);

      divElement.appendChild(pWrapElement); // p要素をdiv要素に追加
    });

    // 最初の"js-blocks-text"の親要素にdiv要素を挿入
    block.parentNode.insertBefore(divElement, block.nextSibling);
  });

  BlockTextAnimation();

}