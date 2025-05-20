const HeaderChangeColor = () => {
    let lastScrollTop = 0; // 前回のスクロール位置を保持する変数

    window.addEventListener('scroll', function () {
        // l-header__wrap エレメントを取得
        var headerWrap = document.querySelector('.l-header__wrap');

        if (headerWrap) {
            // ページのトップからのスクロール距離
            var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
            let darkThemeElm = document.querySelectorAll('.js-header-theme-dark');
            let darkThemeSpace = [];

            Array.from(darkThemeElm).forEach((elm, index) => {
                let startPos = elm.getBoundingClientRect().top + window.pageYOffset;
                let endPos = startPos + elm.clientHeight;

                darkThemeSpace[index] = {
                    start: startPos,
                    end: endPos
                }
            })

            // darkThemeSpace の範囲をチェックしてテーマを切り替え
            let isDarkThemeActive = false; // 現在 `theme-dark` が適用中かどうかを追跡

            darkThemeSpace.forEach(({ start, end }) => {
                if (scrollDistance >= start && scrollDistance <= end) {
                    isDarkThemeActive = true; // 範囲内に入った場合
                }
            });

            // クラスを付与または削除
            if (isDarkThemeActive) {
                headerWrap.classList.add('theme-dark'); // 範囲内ならクラスを付与
            } else {
                headerWrap.classList.remove('theme-dark'); // 範囲外ならクラスを削除
            }

            // 画面の高さ
            var screenHeight = window.innerHeight;

            // スクロール距離が画面の高さ以上になったらクラスを追加
            if (scrollDistance >= (screenHeight / 2)) {
                headerWrap.classList.add('active');
                this.setTimeout(() => {
                    headerWrap.classList.add('transition');
                }, 300);
            } else {
                // それ以下の場合はactiveクラスを削除
                headerWrap.classList.remove('active');
                headerWrap.classList.remove('transition');
            }

            // スクロール方向を判定
            if (scrollDistance > lastScrollTop) {
                // 下にスクロール
                headerWrap.classList.remove('is-down');
            } else {
                // 上にスクロール
                headerWrap.classList.add('is-down');
            }

            // 前回のスクロール位置を更新
            lastScrollTop = scrollDistance <= 0 ? 0 : scrollDistance; // スクロール位置が負にならないようにする
        }
    });
}

HeaderChangeColor();