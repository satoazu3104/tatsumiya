if (window.innerWidth > 1024) {
  const banners = document.getElementsByClassName('p-banner__content');
  if (banners) {
    const backgrounds = document.getElementsByClassName('p-banner__img--back__picture');
    const contentBackgrounds = document.getElementsByClassName('p-banner__img--main__picture')

    Array.from(banners).forEach((banner, index) => {
      banner.addEventListener('mouseover', () => {
        backgrounds[index].classList.add('is-active');
        Array.from(contentBackgrounds).forEach((contentBack) => {
          contentBack.classList.add('is-active');
        })
      })

      banner.addEventListener('mouseout', () => {
        backgrounds[index].classList.remove('is-active');
        Array.from(contentBackgrounds).forEach((contentBack) => {
          contentBack.classList.remove('is-active');
        })
      })
    });
  }
}