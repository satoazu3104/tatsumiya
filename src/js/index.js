"use strict";

import './css_load';
import '@splidejs/splide/src/css/template/default/index.scss';
import "../scss/style.scss";
import './map/_index';
import './scrollTop/_index';
import './scrollAnimation/_index';
import './accordion/_index';
import './splide/_index';
import './headerMenu/_index';
import './firstAnimation/_index';
import './gsap/_index';
import './blocks/_medias-front';
import './hover/_index';
// import './vivus/_index';
import './style/_index';
import './anker/_index';

window.addEventListener('load', () => {
})

document.addEventListener('DOMContentLoaded', function () {
    var div = document.querySelector('.js-contact-form-wrap');
    if (div) {
        // 新しいlabelタグを作成
        var label = document.createElement('label');

        // 元のdivの属性をコピー
        for (var i = 0; i < div.attributes.length; i++) {
            var attr = div.attributes[i];
            label.setAttribute(attr.name, attr.value);
        }

        // 子要素をコピー
        while (div.firstChild) {
            label.appendChild(div.firstChild);
        }

        // 元のdivをlabelに置き換え
        div.parentNode.replaceChild(label, div);
    }
});

// 角度を度からラジアンに変換する関数
function degToRad(deg) {
    return deg * Math.PI / 180;
}

// project処理
document.addEventListener('DOMContentLoaded', function () {
    const subjectSelect = document.querySelector('select[name="subject"]');
    if (subjectSelect) {
        const bodyTextarea = document.querySelector('textarea[name="body"]');
        const processingFields = document.querySelectorAll('.c-input__items.processing');

        const placeholders = {
            '材料について':
                '例：「銅の材料 C1020 2mm コイル材を探しています。50mm幅ぐらいを最少ロットで見積いただくことは可能でしょうか？」\n「銅のコイル材を安定的に納入していただける会社を探しています。相談したいので一度連絡いただくことは可能でしょうか？」',
            '加工について':
                '例：「設備の補修で、ステンレスの配管部品が必要になりました。必要なのは数個だけなのですが、対応可能でしょうか？」\n「銅の熱交換器の製作を検討しています。ぐるぐるとらせん状に巻きたいのですが、図面（ポンチ絵可）をお送りさせて下さい。」\n\n例：「黄銅の切削部品を使用しています。鉛レス材の対応を求められているのですが、材料の選定から相談乗っていただけますか？」\n「純銅の切削加工をやってくれる業者を探しています。一度図面を見ていただきたいのですが。」',
            'その他': ''
        };

        function updateFormState() {
            const selected = subjectSelect.value;

            // プレースホルダー更新
            bodyTextarea.placeholder = placeholders[selected] || '';

            // processing クラスを表示／非表示に
            processingFields.forEach(el => {
                if (selected === '加工について') {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });
        }

        // 初期表示
        updateFormState();

        // 変更時
        subjectSelect.addEventListener('change', updateFormState);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href*="/category/uncategorized"]');

    links.forEach(function (link) {
        // URLの書き換え
        link.setAttribute('href', '/news/');
        // タイトル属性の変更
        link.setAttribute('title', '新着情報');
        // 表示テキストの変更
        link.textContent = '新着情報';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const popUps = document.querySelectorAll('.p-img__pop-up__picture');
    const html = document.querySelector('html');
    const main = document.querySelector('main');
    if (popUps.length > 0) {
        console.log(popUps);
        popUps.forEach(function (pop) {
            const meida = pop.querySelector('.p-img__pop-up');
            pop.addEventListener('click', (e) => {
                pop.classList.toggle('is-active');
                meida.classList.toggle('is-active');
                html.classList.toggle('pop-up');
                main.classList.toggle('pop-up');
            })
        })
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const popTargets = document.querySelectorAll('.js-popup');
    const html = document.querySelector('html');
    const main = document.querySelector('main');

    if (popTargets.length == 0) return false;

    popTargets.forEach((pop) => {
        function CreatePop() {
            let outline = document.createElement('div');
            outline.classList.add('p-img__popup__outline');
            let popWrap = document.createElement('div');
            popWrap.classList.add('p-img__popup__wrap');
            let media = document.createElement('img');
            media.src = pop.src;
            media.alt = 'popup';
            media.classList.add('p-img__popup');
            html.classList.add('popup');
            main.classList.add('popup');
            popWrap.appendChild(media);
            outline.appendChild(popWrap);
            main.appendChild(outline);
            popTargets.forEach((img) => {
                img.style.pointerEvents = 'none';
            })

            outline.addEventListener('click', (e) => {
                RemovePop();
            })
        }

        function RemovePop() {
            let popWrap = document.querySelector('.p-img__popup__outline');
            popWrap.remove();
            html.classList.remove('popup');
            main.classList.remove('popup');
            popTargets.forEach((img) => {
                img.style.pointerEvents = 'unset';
            })
        }

        pop.addEventListener('click', (e) => {
            if (!html.classList.contains('popup')) {
                CreatePop();
            }
        })
    })
})

function applyLanguage(lang) {
    const isJa = (lang === 'ja');

    // テキストの表示切替
    document.querySelectorAll('.lang.ja').forEach(el => {
        el.classList.toggle('is-active', isJa);
    });
    document.querySelectorAll('.lang.en').forEach(el => {
        el.classList.toggle('is-active', !isJa);
    });
    document.querySelectorAll('.lang-media__picture.ja-media__picture').forEach(el => {
        el.classList.toggle('is-active__picture', isJa);
    });
    document.querySelectorAll('.lang-media__picture.en-media__picture').forEach(el => {
        el.classList.toggle('is-active__picture', !isJa);
    });

    // ボタン側の表示・状態更新
    const btn = document.getElementById('switch');
    if (btn) {
        btn.dataset.lang = lang;
        if (lang === 'ja') {
            btn.classList.add('is-ja')
            btn.classList.remove('is-en');
        } else {
            btn.classList.add('is-en');
            btn.classList.remove('is-ja');
        }
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const btn = document.getElementById('switch');

//     // 1. 保存されている言語を取得（なければ ja）
//     const savedLang = localStorage.getItem('siteLang');
//     const initialLang = (savedLang === 'en') ? 'en' : 'ja';

//     // 2. 初期表示を反映
//     applyLanguage(initialLang);

//     // 3. ボタンクリックで言語切替＋保存
//     if (btn) {
//         btn.addEventListener('click', () => {
//             const currentLang = btn.dataset.lang || 'ja';
//             const nextLang = (currentLang === 'ja') ? 'en' : 'ja';

//             applyLanguage(nextLang);
//             localStorage.setItem('siteLang', nextLang); // ★ここで保持
//         });
//     }
// });
