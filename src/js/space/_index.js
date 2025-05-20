const Space = () => {

  const Set = (type) => {
    const el = document.querySelectorAll('.js-space');
    if(!el) return false;
    for(let i = 0; i < el.length; i++)
    {
      el[i].style.height = el[i].dataset[type]+'px';
    }
  }
  
  const Check = () => {
    let width = window.innerWidth;
    if(width < 1024) {
      Set('spaceSp');
    } else {
      Set('spacePc');
    }
  }

  window.addEventListener('resize', () => {
    Check();
  })
  Check();
}
Space();