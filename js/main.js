// js/main.js

// Conf Global Marked
marked.setOptions({
  gfm: true,
  breaks: true,
  mangle: false,    // Evita "ofuscar" emails, ya no necesario
  smartLists: true, // Mejor manejo de listas anidadas
  smartypants: true,// Comillas y guiones tipográficos
  headerIds: true,  // Generar IDs en encabezados
  headerPrefix: 'md-', // Prefijo de IDs para evitar conflictos
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    // Si no se detecta el lenguaje, uso highlight automático
    return hljs.highlightAuto(code).value;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar AOS
  AOS.init({
    duration: 800 // la duración de la animación
    // Puedes poner otras opciones si quieres
  });

  // 1) Cargar hero.html en #hero-container
  loadHTMLInto("_includes/hero.html", "hero-container", () => {
    AOS.refresh();
  });

  // 2) Cargar cada Markdown
  loadMarkdownInto("md/about.md", "about-content");
  loadMarkdownInto("md/experience.md", "experience-content");
  loadMarkdownInto("md/education.md", "education-content");
  loadMarkdownInto("md/skills.md", "skills-content");
});

/** 
 * Inyectar un archivo HTML (hero.html) en un elemento dado
 */
function loadHTMLInto(htmlPath, elementId, callback) {
  fetch(htmlPath)
    .then(res => res.text())
    .then(htmlContent => {
      document.getElementById(elementId).innerHTML = htmlContent;
      if (callback) callback();
    })
    .catch(err => console.error(`Error cargando ${htmlPath}:`, err));
}

/**
 * Función para cargar Markdown y convertirlo a HTML con marked.
 * Luego inyectar en un contenedor, y refrescar AOS para que detecte nuevos elementos.
 */
function loadMarkdownInto(mdPath, elementId) {
  fetch(mdPath)
    .then(response => response.text())
    .then(mdText => {
      // Convertimos el MD a HTML
      const html = marked.parse(mdText);
      // Inyectamos en el contenedor
      document.getElementById(elementId).innerHTML = html;
      
      // AOS necesita "refrescar" para detectar si hay nuevos elementos que animar
      AOS.refresh();
    })
    .catch(error => {
      console.error(`Error cargando ${mdPath}:`, error);
      document.getElementById(elementId).innerHTML = "<p>Error al cargar el contenido.</p>";
    });
}
