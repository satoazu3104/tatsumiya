import Luxy from 'luxy.js';

if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) {
  // スマートフォン向けの記述
} else if (navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  // タブレット向けの記述
} else {
  // PC向けの記述
  // Luxy.init();
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = href === '#' || href === '' ? document.documentElement : document.querySelector(href);
    const position = target.getBoundingClientRect().top + window.pageYOffset - 50;
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var a = location.hash; // URLからハッシュタグを取得：a
  if (a) { // aが存在する場合
    var targetElement = document.querySelector(a);
    if (targetElement) {
      var b = targetElement.offsetTop - 50; // aで取得したhref属性の値と同じ要素について、ページトップからの距離を取得する：b
      window.addEventListener("load", function () { // ページが読み込まれた時に実行
        window.scrollTo({
          top: b,
          behavior: "smooth" // スムーススクロール
        });
        return false;
      });
    }
  }
});