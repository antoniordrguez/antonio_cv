// js/main.js

// Cuando el DOM cargue...
document.addEventListener("DOMContentLoaded", () => {
    // Cargar each .md con fetch
    loadMarkdownInto("md/about.md", "about-content");
    loadMarkdownInto("md/experience.md", "experience-content");
    loadMarkdownInto("md/education.md", "education-content");
    loadMarkdownInto("md/skills.md", "skills-content");
  
    // Si quisieras hacer hero también en .md, solo harías lo mismo:
    // loadMarkdownInto("md/hero.md", "hero-content");
  });
  
  /**
   * Carga un archivo Markdown, lo convierte a HTML y lo inyecta en un contenedor con un ID dado.
   * @param {string} mdPath - Ruta del archivo Markdown
   * @param {string} elementId - ID del elemento donde inyectar el contenido
   */
  function loadMarkdownInto(mdPath, elementId) {
    fetch(mdPath)
      .then(response => response.text())
      .then(mdText => {
        // Convertir Markdown a HTML con la librería Marked
        const html = marked.parse(mdText);
        // Insertar en el contenedor
        document.getElementById(elementId).innerHTML = html;
      })
      .catch(error => {
        console.error(`Error cargando ${mdPath}:`, error);
        document.getElementById(elementId).innerHTML = "<p>Error al cargar el contenido.</p>";
      });
  }
    