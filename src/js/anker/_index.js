document.addEventListener('click', (e) => {
  const anker = e.target.closest('a');
  if (anker && anker.hash) {
    e.preventDefault();
    HashMove(anker.hash, anker);
  }
})

window.addEventListener('load', () => {
  const hash = location.hash;
  if (hash) {
    HashMove(hash);
  }
})

function HashMove(hash, anker = '') {
  const header = document.getElementsByClassName('l-header__inner')[0];

  try {
    const decodedHash = decodeURIComponent(hash);
    console.log(decodedHash);
    const target = document.querySelector(decodedHash);

    if (anker) {
      window.location = anker.href;
    }
    const headerResult = header.getBoundingClientRect();
    const headerBottomHeight = headerResult.bottom;
    const gap = 64;
    const result = target.getBoundingClientRect();
    const y = result.top + window.scrollY;
    const scrollValue = y - headerBottomHeight - gap;
    console.dir(scrollValue);
    window.scrollTo({
      top: scrollValue,
      behavior: 'smooth'
    })
  } catch (error) {
    console.error(`Invalid selector: ${hash}`, error)
    if (anker) {
      window.location = anker.href;
    }
  }
}