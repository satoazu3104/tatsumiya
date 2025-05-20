import { getColorClassName } from "@wordpress/block-editor";

const contents = document.querySelectorAll('.p-service__items');
Array.from(contents).forEach(content => {
  content.onmousemove = (e) => {
    const circle = content.querySelector('.p-service__img--back');
    let left = e.offsetX - 140;
    let top = e.offsetY - 140;
    let limit = 20;
    left = -limit > left ? -limit : left > limit ? limit : left;
    top = -limit > top ? -limit : top > limit ? limit : top;
    circle.style.left = left + 'px';
    circle.style.top = top + 'px';
    circle.style.transition = 'top .8s, left .8s'
  }
  
  content.onmouseout = (e) => {
    const circle = content.querySelector('.p-service__img--back');
    circle.style.transition = 'top .8s, left .8s'
    circle.style.left = '0px';
    circle.style.top = '0px';
  }
});