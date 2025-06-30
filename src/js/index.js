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

        const placeholders = {
            '金属材料について':
                '例：「銅の材料 C1020 2mm コイル材を探しています。50mm幅ぐらいを最少ロットで見積いただくことは可能でしょうか？」\n「銅のコイル材を安定的に納入していただける会社を探しています。相談したいので一度連絡いただくことは可能でしょうか？」',
            'パイプ加工について':
                '例：「設備の補修で、ステンレスの配管部品が必要になりました。必要なのは数個だけなのですが、対応可能でしょうか？」\n「銅の熱交換器の製作を検討しています。ぐるぐるとらせん状に巻きたいのですが、図面（ポンチ絵可）をお送りさせて下さい。」',
            '切削加工について':
                '例：「黄銅の切削部品を使用しています。鉛レス材の対応を求められているのですが、材料の選定から相談乗っていただけますか？」\n「純銅の切削加工をやってくれる業者を探しています。一度図面を見ていただきたいのですが。」',
            'その他お問い合わせ': ''
        };

        function updatePlaceholder() {
            const selected = subjectSelect.value;
            bodyTextarea.placeholder = placeholders[selected] || '';
        }

        // 初期表示
        updatePlaceholder();

        // 変更時
        subjectSelect.addEventListener('change', updatePlaceholder);
    }
});