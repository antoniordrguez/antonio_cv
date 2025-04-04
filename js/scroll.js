// js/scroll.js

const main = document.querySelector('#scroll-container'); // ahora tiene un ID
const sections = document.querySelectorAll('section');
let scrollTimeout = null;

// Curva de easing: aceleración suave y desaceleración (easeInOutQuad)
function easeInOutQuad(t) {
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

/**
 * Scroll animado desde la posición actual hasta `targetY`
 * usando easing y requestAnimationFrame
 */
function customSmoothScroll(targetY, durationMs = 800, callback) {
  const startY = main.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const easedProgress = easeInOutQuad(progress);

    main.scrollTop = startY + distance * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else if (callback && typeof callback === 'function') {
      callback(); // ejecuta AOS.refresh u otro código al final
    }
  }

  requestAnimationFrame(animateScroll);
}

// Detectar fin de scroll manual
main.addEventListener('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const scrollTop = main.scrollTop;
    const viewportHeight = main.clientHeight;
    const viewportCenterY = scrollTop + viewportHeight / 2;

    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenterY = sectionTop + sectionHeight / 2;
      const distance = Math.abs(sectionCenterY - viewportCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const targetY =
        closestSection.offsetTop +
        closestSection.offsetHeight / 2 -
        viewportHeight / 2;

      // Scroll animado + refresh de AOS al finalizar
      customSmoothScroll(targetY, 1000, () => {
        if (window.AOS && typeof AOS.refresh === 'function') {
          AOS.refresh();
        }
      });
    }
  }, 300); // espera tras scroll (ajustable)
});
