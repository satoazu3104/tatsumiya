const BlockMediaLoading = () => {
    const blockMedia = document.getElementsByClassName('block-media');
    if (!blockMedia) return false;
    const theme_uri = tmp_path.temp_uri;
    let ver = 5.0;

    const loadImage = (element) => {
        const srcUrl = theme_uri + element.dataset.src + '?' + ver;
        if (element.src) {
            element.src = srcUrl;
        } else {
            element.srcset = srcUrl;
        }
    };

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1 // この値は必要に応じて調整
    });

    [...blockMedia].forEach(element => {
        if (element.classList.contains('lazyload')) {
            // lazyloadクラスがある要素を監視
            observer.observe(element);
        } else {
            loadImage(element);
        }
    });
}

BlockMediaLoading();