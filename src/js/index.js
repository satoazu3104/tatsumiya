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