// js/scroll.js

// Seleccionar todas las secciones de la página
const sections = document.querySelectorAll('section');

// Variable para almacenar el tiempo de scroll
let scrollTimeout = null;

// Escuchar el evento de scroll en el main
const main = document.querySelector('main');
main.addEventListener('scroll', () => {
  // Limpiar el timeout anterior (si existe)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Definir un nuevo timeout para cuando el usuario deja de hacer scroll
  scrollTimeout = setTimeout(() => {
    // Calcular el centro visible del main
    const scrollTop = main.scrollTop;
    const viewportHeight = main.clientHeight;
    const viewportCenterY = scrollTop + (viewportHeight / 2);

    let closestSection = null;
    let minDistance = Infinity;

    // Recorrer cada sección y hallar la que esté más cerca del centro
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenterY = sectionTop + (sectionHeight / 2);

      const distance = Math.abs(sectionCenterY - viewportCenterY);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    // Hacer scroll suave hacia la sección más cercana (centrándola)
    if (closestSection) {
      // Podemos usar scrollIntoView con behavior smooth
      // O hacer un cálculo manual para posicionar el scroll
      closestSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, 200); // 200ms de espera, ajustable
});
