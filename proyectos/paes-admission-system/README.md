# Sistema de Admisión Universitaria - PAES

Un sistema web moderno para la gestión de admisiones universitarias basado en puntajes PAES (Prueba de Acceso a la Educación Superior).

## 🚀 Características

- **Autenticación de estudiantes** con RUT y contraseña
- **Dashboard personalizado** con información del estudiante
- **Cálculo automático de becas** basado en puntaje PAES
- **Catálogo de carreras** con filtros por departamento y puntaje
- **Detalles completos de carreras** incluyendo malla curricular
- **Sistema de matrícula** con validación de elegibilidad
- **Diseño responsive** y moderno
- **Interfaz intuitiva** con excelente UX/UI

## 📋 Funcionalidades

### Sistema de Login
- Validación de credenciales con base de datos mock
- Interfaz moderna con animaciones suaves
- Credenciales de prueba incluidas

### Dashboard del Estudiante
- Información personal del estudiante
- Puntaje PAES y porcentaje de beca
- Navegación intuitiva

### Catálogo de Carreras
- 8 carreras universitarias disponibles
- Filtros por departamento y rango de puntaje
- Indicadores de elegibilidad
- Información detallada de cada carrera

### Sistema de Becas
- Cálculo automático basado en puntaje PAES:
  - 750+ pts: 100% de beca
  - 700-749 pts: 80% de beca
  - 650-699 pts: 60% de beca
  - 600-649 pts: 40% de beca
  - 550-599 pts: 25% de beca
  - 500-549 pts: 15% de beca
  - <500 pts: Sin beca

## 🎓 Carreras Disponibles

1. **Ingeniería Civil** (Puntaje mín: 650)
2. **Medicina** (Puntaje mín: 750)
3. **Derecho** (Puntaje mín: 600)
4. **Psicología** (Puntaje mín: 580)
5. **Ingeniería en Informática** (Puntaje mín: 620)
6. **Administración de Empresas** (Puntaje mín: 550)
7. **Pedagogía en Educación Básica** (Puntaje mín: 500)
8. **Biología** (Puntaje mín: 590)

## 👥 Usuarios de Prueba

| RUT | Contraseña | Puntaje PAES | Beca |
|-----|------------|--------------|------|
| 12.345.678-9 | demo123 | 720 pts | 80% |
| 98.765.432-1 | demo456 | 650 pts | 60% |
| 11.222.333-4 | demo789 | 580 pts | 25% |

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con gradientes y animaciones
- **JavaScript ES6+** - Lógica de aplicación
- **Font Awesome** - Iconografía
- **Responsive Design** - Compatible con dispositivos móviles

## 📱 Diseño Responsive

El sistema está optimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Características de Diseño

- **Gradientes modernos** y efectos de blur
- **Animaciones suaves** en transiciones
- **Cards interactivas** con hover effects
- **Modal system** para detalles de carreras
- **Color coding** para elegibilidad
- **Typography** jerárquica y legible

## 📂 Estructura del Proyecto

```
paes-admission-system/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica de la aplicación
├── data.js            # Datos mock (estudiantes y carreras)
└── README.md          # Documentación
```

## 🚀 Cómo Usar

1. Abrir `index.html` en un navegador web
2. Usar las credenciales de prueba para iniciar sesión
3. Explorar el dashboard y catálogo de carreras
4. Hacer clic en una carrera para ver detalles completos
5. Matricularse en carreras elegibles

## 🔧 Personalización

### Agregar Nuevas Carreras
Editar el array `careersDB` en `data.js`:

```javascript
{
    id: "nueva-carrera",
    name: "Nueva Carrera",
    department: "departamento",
    description: "Descripción...",
    duration: "X años",
    minScore: XXX,
    maxStudents: XXX,
    curriculum: [...]
}
```

### Modificar Sistema de Becas
Ajustar la función `calculateScholarship()` en `data.js`.

### Agregar Nuevos Estudiantes
Añadir entradas al objeto `studentsDB` en `data.js`.

## 📈 Futuras Mejoras

- Integración con base de datos real
- Sistema de notificaciones por email
- Proceso de pago de matrícula
- Dashboard administrativo
- Reportes y estadísticas
- API REST para integración móvil

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
