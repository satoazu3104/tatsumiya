import { gsap } from 'gsap';

let tiltElements = document.querySelectorAll('.js-quick-tilt');
let tiltMedias = document.querySelectorAll('.js-quick-tilt-media__picture');

const TiltHover = (elements) => {
  elements.forEach(element => {

    // GSAP quickTo for smooth animations
    const setRotationX = gsap.utils.pipe(
      gsap.quickTo(element, "rotationX", { duration: .3 })
    );
    const setRotationY = gsap.utils.pipe(
      gsap.quickTo(element, "rotationY", { duration: .3 })
    );

    const rect = element.getBoundingClientRect();
    const perspectiveValue = rect.height * 2.5; // Adjust multiplier as needed
    element.style.transform = `perspective(${perspectiveValue}px)`;

    element.addEventListener('mouseenter', () => {
      // Set perspective based on element size
      gsap.to(element, {
        scale: 1.02,
        zIndex: 10,
        // filter: 'drop-shadow(0 3px 10px rgba(73, 168, 56, .12))',
        duration: .4,
        ease: "power1.inOut",
      })
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxRotateX = 3;
      const maxRotateY = 1.5;

      // Calculate rotation values based on mouse position
      const rotateX = ((mouseY - centerY) / centerY) * maxRotateX;
      const rotateY = ((mouseX - centerX) / centerX) * -maxRotateY;

      setRotationX(rotateX);
      setRotationY(rotateY);
    });

    element.addEventListener('mouseleave', () => {
      // setTimeout(() => {
      setRotationX(0);
      setRotationY(0);
      gsap.to(element, {
        scale: 1,
        zIndex: 1,
        filter: 'drop-shadow(0 3px 10px rgba(73, 168, 56, 0))',
        duration: .4,
        ease: "power1.inOut",
      });
      // }, 200);
    });
  });
}

TiltHover(tiltElements);
TiltHover(tiltMedias);