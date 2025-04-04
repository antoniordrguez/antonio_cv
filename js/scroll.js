// js/scroll.js

const main = document.querySelector('main');
const sections = document.querySelectorAll('section');
let scrollTimeout = null;

// Función de interpolación (easing) para la animación: easeInOutQuad
// - va acelerando al principio y desacelerando al final
function easeInOutQuad(t) {
  return t < 0.5 
    ? 2 * t * t 
    : -1 + (4 - 2 * t) * t;
}

/**
 * Desplaza el scroll de `main` hacia la posición `targetY` (en píxeles)
 * usando requestAnimationFrame durante `durationMs`.
 */
function customSmoothScroll(targetY, durationMs = 800) {
  const startY = main.scrollTop;
  const diff = targetY - startY;   // desplazamiento total a recorrer
  const startTime = performance.now();

  function tick(now) {
    // tiempo transcurrido desde que inició la animación
    const elapsed = now - startTime;
    // progreso normalizado en rango [0..1]
    const progress = Math.min(elapsed / durationMs, 1);

    // aplica la curva de animación (ease in out)
    const easedProgress = easeInOutQuad(progress);

    // establece la posición de scroll en base al easedProgress
    main.scrollTop = startY + diff * easedProgress;

    if (progress < 1) {
      // si no hemos terminado la animación, sigue
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Escucha el evento scroll en el main
main.addEventListener('scroll', () => {
  // cada vez que haya scroll, limpiamos el timeout anterior
  if (scrollTimeout) clearTimeout(scrollTimeout);

  // definimos un nuevo timeout para detectar que el usuario "paró" de scrollear
  scrollTimeout = setTimeout(() => {
    // Calcula el centro visible del main
    const scrollTop = main.scrollTop;
    const viewportHeight = main.clientHeight;
    const viewportCenterY = scrollTop + viewportHeight / 2;

    let closestSection = null;
    let minDistance = Infinity;

    // Determina cuál sección está más cerca del centro
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

    // Si encontramos la sección más cercana
    if (closestSection) {
      // Calculamos la posición Y para que quede centrada en la pantalla
      const targetY =
        closestSection.offsetTop
        + closestSection.offsetHeight / 2
        - viewportHeight / 2;

      // Desplazamiento suave con easeInOut
      customSmoothScroll(targetY, 1000); 
      // 1000 ms = duración de 1 segundo; ajústalo a tu gusto
    }

  }, 200); // Espera de 200ms tras el último scroll; ajústalo según tu preferencia
});
