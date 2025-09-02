# Cards Backlog

Un sistema de gestión de ideas y proyectos con diseño Bento que permite organizar cards en decks de manera visual e intuitiva.

## 🚀 Características

### ✨ Gestión de Decks y Cards
- **Decks**: Contenedores para organizar tus ideas (como carpetas)
- **Cards**: Ideas individuales con información detallada (como archivos)
- Interfaz tipo escritorio tradicional con drag & drop

### 🎯 Información de Cards
- **Título**: Nombre de la idea/proyecto
- **Categoría**: Clasificación principal
- **Descripción**: Resumen de la idea
- **Notas**: Información detallada
- **Hashtags**: Para vinculación PKM (#importante #proyecto)
- **Imágenes**: URLs de imágenes relacionadas

### 🔍 Filtrado y Búsqueda
- **Búsqueda**: Por título, descripción, notas y hashtags
- **Filtros por categoría**: Filtrado clásico por categorías
- **Filtros por hashtags**: Para vinculación de conocimiento

### 💾 Persistencia de Datos
- **Almacenamiento local**: Datos guardados en localStorage del navegador
- **Exportar CSV**: Backup completo de todos los datos
- **Importar CSV**: Restaurar datos desde archivo
- **Limpiar datos**: Reinicio completo del sistema

### 🎨 Diseño
- **Tema oscuro**: Esquema de colores dark por defecto
- **Colores vibrantes**: Paleta de colores cítricos
- **Layout Bento**: Diseño moderno tipo grid
- **Iconos**: Representación visual con Font Awesome
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Vista detalle**: Modal con formato card y efectos parallax
- **Mouse parallax**: Efectos 3D inspirados en Ana Cards

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y grid
- **JavaScript ES6+**: Funcionalidad completa con clases
- **Font Awesome**: Iconografía
- **LocalStorage**: Persistencia de datos

## 📁 Estructura del Proyecto

```
idea-deck-manager/
├── index.html          # Estructura principal
├── styles.css          # Estilos y tema visual
├── script.js           # Lógica de la aplicación
└── README.md           # Documentación
```

## 🚀 Uso

1. **Abrir la aplicación**: Abre `index.html` en tu navegador
2. **Crear un deck**: Haz clic en "Crear Deck" para organizar tus ideas
3. **Agregar cards**: Dentro de cada deck, agrega nuevas ideas
4. **Organizar**: Arrastra cards entre decks para reorganizar
5. **Filtrar**: Usa la búsqueda y filtros para encontrar ideas específicas
6. **Backup**: Exporta tus datos regularmente usando "Exportar CSV"

## 🎯 Casos de Uso

- **Gestión de proyectos**: Organiza ideas por estado o tipo
- **Brainstorming**: Captura y categoriza ideas rápidamente
- **PKM (Personal Knowledge Management)**: Vincula conceptos con hashtags
- **Planning**: Agrupa tareas y proyectos por contexto
- **Portfolio**: Organiza trabajos y referencias visuales

## 🔧 Funcionalidades Avanzadas

### Drag & Drop
- Arrastra cards entre decks para moverlas
- Indicadores visuales durante el arrastre
- Confirmación automática de movimientos

### Vista Detalle con Parallax
- **Modal card-shaped**: Mantiene proporciones de card (16:10)
- **Mouse parallax 3D**: Movimiento siguiendo el cursor
- **Elementos flotantes**: Categoría y título con efectos independientes
- **Fondo dinámico**: Parallax background con movimiento opuesto
- **Animaciones suaves**: Transiciones cubic-bezier para retorno

### Sistema de Filtros
- **Categorías**: Se generan automáticamente de las cards
- **Hashtags**: Extraídos automáticamente del texto
- **Combinación**: Filtra por múltiples criterios simultáneamente

### Exportación/Importación
- **Formato CSV**: Compatible con Excel y Google Sheets
- **Estructura completa**: Incluye todos los campos de datos
- **Encoding UTF-8**: Soporte para caracteres especiales

## 🎨 Paleta de Colores

- **Fondo primario**: `#0a0a0a` (Negro profundo)
- **Fondo secundario**: `#1a1a1a` (Gris oscuro)
- **Naranja vibrante**: `#ff6b35` (Acento principal)
- **Lima**: `#a4ff35` (Filtros activos)
- **Amarillo**: `#ffd635` (Gradientes)
- **Rosa**: `#ff35a4` (Acciones peligrosas)
- **Cian**: `#35d4ff` (Enlaces y focus)
- **Púrpura**: `#a435ff` (Categorías)

## 📱 Responsive Design

- **Desktop**: Grid completo con múltiples columnas
- **Tablet**: Adaptación a 2 columnas
- **Mobile**: Vista de columna única optimizada

## 🔒 Privacidad

- **Sin servidor**: Todos los datos se almacenan localmente
- **Sin tracking**: No hay análisis ni seguimiento
- **Offline**: Funciona completamente sin conexión a internet

## 🚀 Instalación

No requiere instalación. Simplemente:

1. Descarga los archivos del proyecto
2. Abre `index.html` en tu navegador web
3. ¡Comienza a organizar tus ideas!

## 🤝 Contribuciones

Este es un proyecto personal, pero las sugerencias y mejoras son bienvenidas.

---

**Desarrollado con ❤️ para la gestión eficiente de cards y backlogs**
