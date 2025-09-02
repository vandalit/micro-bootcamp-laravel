# 🧪 FlashCards Científicas - Configuración

Sistema de autenticación institucional para flashcards científicas desarrollado para bootcamp educativo.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
composer install
npm install
```

### 2. Configurar Entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Configurar Base de Datos
```bash
php artisan migrate
php artisan db:seed
```

### 4. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Configura las URLs de redirección:
   - `http://localhost/auth/google/callback`
   - `http://localhost:8000/auth/google/callback`

6. Actualiza tu archivo `.env`:
```env
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback
```

### 5. Instalar Laravel Socialite
```bash
composer require laravel/socialite
```

## 🏃‍♂️ Ejecutar la Aplicación

```bash
php artisan serve
```

Visita: `http://localhost:8000`

## 🏛️ Funcionalidades

### Autenticación Institucional
- **Modo Libre**: Cualquier cuenta Google puede acceder
- **Modo Institucional**: Solo emails del dominio configurado (@ubo.cl)
- Configuración dinámica desde la interfaz web

### Dashboard
- Diseño bento cards moderno
- Formulario para crear flashcards científicas
- Biblioteca de flashcards con filtros
- Efectos hover y transiciones suaves

### Campos de Flashcard
- **Título**: Nombre del concepto científico
- **Categoría**: Biología, Química, Física, etc.
- **Descripción**: Explicación detallada
- **Enlace**: Referencia externa (opcional)
- **Creador**: Email del usuario que la creó

## 🔧 Configuración de Dominio

1. Accede a `/domain/config`
2. Agrega un nuevo dominio institucional
3. Activa la restricción de dominio
4. Solo usuarios con emails del dominio podrán acceder

### Ejemplo: Universidad Bernardo O'Higgins
- **Institución**: Universidad Bernardo O'Higgins
- **Dominio**: @ubo.cl
- **Resultado**: Solo emails como `usuario@ubo.cl` pueden acceder

## 📊 Datos de Ejemplo

El seeder incluye:
- Configuración para @ubo.cl
- 6 flashcards científicas de ejemplo
- Categorías: Biología, Química, Física, Matemáticas

## 🛠️ Estructura del Proyecto

```
app/
├── Http/Controllers/
│   ├── AuthController.php      # Autenticación Google OAuth
│   ├── FlashcardController.php # CRUD de flashcards
│   └── DomainController.php    # Configuración de dominios
├── Models/
│   ├── User.php               # Usuario con OAuth
│   ├── Flashcard.php          # Modelo de flashcard
│   └── DomainSetting.php      # Configuración de dominios
resources/views/
├── auth/login.blade.php       # Página de login
├── dashboard.blade.php        # Dashboard principal
└── domain/config.blade.php    # Configuración de dominios
```

## 🎯 Casos de Uso

1. **Bootcamp Educativo**: Validar conceptos de autenticación
2. **Instituciones Educativas**: Restringir acceso por dominio
3. **Colaboración Científica**: Crear y compartir flashcards
4. **Escalabilidad**: Reutilizable para múltiples instituciones

## 🔐 Seguridad

- Autenticación OAuth con Google
- Validación de dominios institucionales
- Protección CSRF en formularios
- Sanitización de datos de entrada
