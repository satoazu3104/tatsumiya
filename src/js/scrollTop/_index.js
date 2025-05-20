let button = document.getElementById('scrollToTopButton');

if (button) {
    button.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // これによりスクロールがなめらかになります
        });
    });
}

let scrollButton = document.getElementById('scrollToButton');

if(scrollButton) {
    const firstview = document.getElementsByClassName('c-fv__wrap')[0];
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: (firstview.clientHeight),
            behavior: 'smooth'
        })
    });
}