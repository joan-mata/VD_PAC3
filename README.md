# ¿Quién es el huésped perfecto? · PAC3

Este repositorio contiene la implementación interactiva y el storytelling de la **PAC3 de 
Visualización de Datos (UOC)**. El proyecto analiza un dataset de 119.390 reservas de hoteles 
en Portugal (2015-2017) para identificar los perfiles de cliente más rentables y fieles.

## 🌐 Visualización en vivo
Puedes ver la página funcionando en la siguiente dirección:
👉 **[joanmata.com/VD/PAC3/index.html](https://joanmata.com/VD/PAC3/index.html)**

## 📂 Estructura de archivos del repositorio

Para garantizar que la visualización funcione correctamente como respaldo de la URL principal, 
se han incluido únicamente los archivos esenciales:

- **`index.html`**: Estructura semántica de la narrativa, dividida en 4 actos y una sección de 
exploración inicial.
- **`styles.css`**: Diseño visual con tema oscuro (*dark mode*), tipografías elegantes 
(Playfair Display) y layouts responsivos.
- **`data.js`**: Capa de datos procesados. Contiene los objetos y arrays que alimentan los 
gráficos y contadores.
- **`charts.js`**: Lógica de interacción, animaciones de barras, gráficos dinámicos y 
observadores de scroll.
- **`nav.js`**: Control de la navegación lateral, barra de progreso superior y efectos de 
revelado.

## 🛠️ Tecnologías utilizadas

- **Vanilla JavaScript (ES6+):** Programación modular sin dependencias externas.
- **CSS Moderno:** Variables CSS, Flexbox y animaciones nativas.
- **Intersection Observer API:** Para disparar las animaciones de datos al hacer scroll.

---
**Autor:** Joan Mata  
**Asignatura:** Visualización de Datos  
**Grado:** Ciencia de Datos Aplicada (UOC)
