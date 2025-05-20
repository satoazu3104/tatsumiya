const firsts = document.getElementsByClassName('js-first-animation');
window.addEventListener('load', () => {
    console.log('load')
    if (firsts.length) {
        FirstAnime(firsts);
    } else {
        NextAnim();
    }
});

const FirstAnime = (firsts) => {
    Array.from(firsts).forEach((first, index, array) => {
        first.classList.add('active');

        // 最後のアニメーション要素にだけイベントリスナーを設定
        if (index === array.length - 1) {
            first.addEventListener('animationend', () => {
                NextAnim();  // アニメーションが終わったらNextAnimを実行
            });
        }
    });
}

const NextAnim = () => {
    console.log('next');
    const section = document.getElementsByClassName('l-section__main')[0];
    const loadedAnim = document.getElementsByClassName('js-loaded-animation');
    Array.from(loadedAnim).forEach((loaded) => {
        loaded.classList.add('is-active');
    });
    section.style.opacity = 1;
    const fixBase = document.getElementsByClassName('c-button__fix-base')[0];
    if (fixBase) {
        fixBase.classList.add('is-active');
    }
}
