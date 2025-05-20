import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const splideFvElements = document.getElementsByClassName('splide__fv splide'); // right-image
const splideFvTextElements = document.getElementsByClassName('splide__fv-text splide'); // right-image

/**
 * 指定したスライド内のすべての対象要素に is-active クラスを付与または削除する関数
 * @param {Element} slide - 対象のスライド
 * @param {Array} selectors - is-active クラスを付与したい要素のセレクタの配列
 * @param {boolean} add - true: クラスを追加, false: クラスを削除
 */
function toggleActiveClass(slide, selectors, add) {
    // クローン要素はスキップ
    if (slide.classList.contains('splide__slide--clone')) {
        return;
    }


    selectors.forEach(selector => {
        const elements = slide.querySelectorAll(selector);
        elements.forEach(element => {
            if (add) {
                element.classList.add('is-active');
            } else {
                element.classList.remove('is-active');
            }
        });
    });
}

if (splideFvElements.length) {
    let fvSlides = [];
    let fvTextSlides = [];

    // 付与・削除したい対象要素のセレクタを変数にまとめる
    const targetSelectors = [];

    // FVスライダーの初期化
    for (let i = 0; i < splideFvElements.length; i++) {
        let fvSlide = new Splide(splideFvElements[i], {
            // ここにオプションを設定
            type: 'fade',
            rewind: true,
            arrows: false,
            pagination: false,
            autoplay: true,
            speed: 800,
            pauseOnHover: false,
            interval: 8000,
            breakpoints: {
                1025: {
                }
            }
        });

        // スライダーの初期化が完了したら最初のスライドに is-active クラスを追加
        fvSlide.on('mounted', function () {
            let activeSlide = fvSlide.Components.Slides.getAt(fvSlide.index).slide;
            toggleActiveClass(activeSlide, targetSelectors, true);
        });

        // スライドのアクティブ状態変更時の処理
        fvSlide.on('move', function (newIndex) {
            // すべてのスライドを取得
            let slides = splideFvElements[i].querySelectorAll('.splide__slide');

            // すべてのスライドから is-active クラスを削除
            slides.forEach(slide => {
                toggleActiveClass(slide, targetSelectors, false);
            });

            // 新しくアクティブになったスライドに is-active クラスを追加
            let activeSlide = fvSlide.Components.Slides.getAt(fvSlide.index).slide;
            toggleActiveClass(activeSlide, targetSelectors, true);
        });

        // スライダーをマウント
        fvSlide.mount();

        fvSlides.push(fvSlide);
    }

    for (let i = 0; i < splideFvTextElements.length; i++) {
        let fvTextSlide = new Splide(splideFvTextElements[i], {
            type: 'fade',
            rewind: true,
            arrows: false,
            pagination: false,
            autoplay: true,
            speed: 800,
            pauseOnHover: false,
            interval: 8000,
            breakpoints: {
                1025: {
                }
            }
        }).mount();

        fvTextSlides.push(fvTextSlide);
    }

    fvSlides.forEach((fvSlide, index) => {
        fvSlide.on('move', (newIndex) => {
            fvTextSlides[index].go(newIndex);
        });
    });

    fvTextSlides.forEach((fvTextSlide, index) => {
        fvTextSlide.on('move', (newIndex) => {
            fvSlides[index].go(newIndex);
        });
    });

}

const splideGalleryElements = document.getElementsByClassName('splide__gallery splide');
if (splideGalleryElements.length) {
    for (let i = 0; i < splideGalleryElements.length; i++) {
        let gallerySlide = new Splide(splideGalleryElements[i], {
            type: 'loop',
            rewind: true,
            arrows: false,
            pagination: false,
            perPage: 3,
            autoplay: false,
            speed: 800,
            pauseOnHover: false,
            interval: 8000,
            autoScroll: {
                speed: .3
            },
            breakpoints: {
                1025: {
                    perPage: 2,
                    padding: 36
                }
            }
        })

        gallerySlide.mount({ AutoScroll });
    }
}

const splidePositionElements = document.getElementsByClassName('splide__position splide');
if (splidePositionElements.length) {
    for (let i = 0; i < splidePositionElements.length; i++) {
        let positionSlide = new Splide(splidePositionElements[i], {
            type: 'loop',
            rewind: true,
            arrows: true,
            pagination: false,
            autoplay: true,
            perPage: 1,
            focus: 'center',
            speed: 800,
            gap: '2px',
            pauseOnHover: false,
            interval: 8000,
            breakpoints: {
                1025: {
                    perPage: 1
                }
            }
        }).mount();
    }
}