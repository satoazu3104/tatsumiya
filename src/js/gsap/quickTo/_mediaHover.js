import { gsap } from 'gsap';

let quickPictures = document.querySelectorAll('.js-quick-media__picture');
quickPictures.forEach(picture => {

  const inner = picture.querySelector('.js-quick-media');

  const initialSpace = 18;

  let computedStyle = window.getComputedStyle(picture);
  let position = computedStyle.getPropertyValue('position') == 'static' ? 'relative' : computedStyle.getPropertyValue('postiion');
  let index = computedStyle.getPropertyValue('z-index') == 'auto' ? '1' : computedStyle.getPropertyValue('z-index');
  let move = Number(picture.dataset.move);
  let space = move ? initialSpace * move : initialSpace;

  gsap.set(picture, {
    overflow: 'hidden',
    position: position,
    zIndex: index,
  });

  gsap.set(inner, {
    xPercent: -50,
    yPercent: -50,
    top: '50%',
    left: '50%',
    position: 'absolute',
    width: `calc(100% + ${space * 2}px)`,
    height: `calc(100% + ${space * 2}px)`,
  });

  let duration = 2;

  let xTo = gsap.utils.pipe(
    gsap.utils.clamp(-space, space),    // make sure the number is between 0 and 100
    gsap.utils.snap(5),          // snap to the closest increment of 5
    gsap.quickTo(inner, "x", { duration: duration, ease: "power3" }) // apply it to the #id element's x property, have it take 0.8 seconds each time it's updated, and use a "power3" ease
  );

  let yTo = gsap.utils.pipe(
    gsap.utils.clamp(-space, space),    // make sure the number is between 0 and 100
    gsap.utils.snap(5),          // snap to the closest increment of 5
    gsap.quickTo(inner, "y", { duration: duration, ease: "power3" }) // apply it to the #id element's x property, have it take 0.8 seconds each time it's updated, and use a "power3" ease
  );

  window.addEventListener("mousemove", e => {
    let divValueX = (window.innerWidth / 2) / space;
    let divValueY = (window.innerHeight / 2) / space;
    xTo((e.clientX - window.innerWidth / 2) / divValueX);
    yTo((e.clientY - window.innerHeight / 2) / divValueY);
  });
})