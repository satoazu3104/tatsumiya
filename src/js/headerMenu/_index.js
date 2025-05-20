import './_changeColor';

const HeaderMenuToggle = () => {
  const headerButton = document.getElementsByClassName('js-menu-button')[0];
  if(!headerButton) return;
  
  const container = document.getElementsByClassName('js-menu-wrap')[0];
  const items = container.querySelectorAll('.l-header__items');
  const line = document.getElementsByClassName('js-menu-line');

  Array.from(items).forEach(item => {
    item.addEventListener('click', () => {
      Toggle();
    })
  });
  
  const Toggle = () => {
    if(!container.classList.contains('is-open')) {
      container.classList.add('is-open');
      headerButton.classList.add('is-open');
      Array.from(line).forEach((elm) => {
        elm.classList.add('is-open');
      })
    } else {
      container.classList.remove('is-open');
      headerButton.classList.remove('is-open');
      Array.from(line).forEach((elm) => {
        elm.classList.remove('is-open');
      })
    }
  }
  
  headerButton.addEventListener('click', () => {
    if(!container) {
      console.log('メニュー要素が見つかりません');
      return;
    }
    Toggle();
  })
}

HeaderMenuToggle();

const FixMenu = () => {
  const menu = document.getElementsByClassName('js-fix-bottom')[0];
  if(menu) {
    window.addEventListener('scroll', () => {
      let scroll_y = window.scrollY;
      if(scroll_y > 500) {
        menu.classList.add('active');
      }
      if(scroll_y < 500) {
        menu.classList.remove('active');
      }
    })
  }
}

FixMenu();