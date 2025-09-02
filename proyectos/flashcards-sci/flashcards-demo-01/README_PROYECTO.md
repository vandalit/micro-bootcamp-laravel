# 🧪 FlashCards Científicas - Sistema de Autenticación Institucional

**Proof of Concept** para bootcamp educativo - Validación de sistemas de autenticación institucional escalable.

## 🎯 Objetivo del Proyecto

Sistema que permite **autenticación Google OAuth** con **restricción dinámica por dominio institucional**. Por defecto acepta cualquier cuenta Google, pero puede configurarse para restringir acceso solo a emails de dominios específicos (ej: @ubo.cl).

## ✨ Características Principales

### 🔐 **Sistema de Autenticación Dual**
- **Modo Libre**: Cualquier cuenta Google puede acceder
- **Modo Institucional**: Solo emails del dominio configurado (@ubo.cl)
- **Configuración dinámica**: Cambio en tiempo real desde la interfaz

### 📚 **Dashboard Científico**
- **Diseño Bento Cards** moderno y responsivo
- **Formulario científico** con campos especializados
- **Biblioteca colaborativa** de flashcards
- **Efectos UI/UX** con hover y transiciones

### 🏛️ **Escalabilidad Institucional**
- Reutilizable para múltiples universidades
- Gestión de dominios desde interfaz web
- Historial de configuraciones

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
composer install
composer require laravel/socialite

# 2. Configurar entorno
cp .env.example .env
php artisan key:generate

# 3. Base de datos
php artisan migrate
php artisan db:seed

# 4. Ejecutar servidor
php artisan serve
```

## 🔧 Configuración Google OAuth

1. **Google Cloud Console**: Crear proyecto y habilitar Google+ API
2. **Credenciales OAuth 2.0**: Configurar URLs de redirección
3. **Actualizar .env**:
```env
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback
```

## 📋 Funcionalidades Implementadas

### ✅ **Backend**
- [x] Google OAuth con Laravel Socialite
- [x] Modelos: User, Flashcard, DomainSetting
- [x] Controladores: Auth, Flashcard, Domain
- [x] Middleware de restricción de dominio
- [x] Migraciones y seeders

### ✅ **Frontend**
- [x] Login con diseño moderno
- [x] Dashboard con layout bento
- [x] Formulario científico completo
- [x] Configuración de dominios
- [x] Efectos hover y transiciones

### ✅ **Seguridad**
- [x] Validación de dominios institucionales
- [x] Protección CSRF
- [x] Sanitización de datos
- [x] Middleware de autenticación

## 🎓 Caso de Uso: Universidad Bernardo O'Higgins

```
Institución: Universidad Bernardo O'Higgins
Dominio: @ubo.cl
Resultado: Solo emails como profesor@ubo.cl pueden acceder
```

## 📊 Datos de Ejemplo

El sistema incluye:
- **6 flashcards científicas** (Biología, Química, Física, Matemáticas)
- **Configuración UBO** preestablecida
- **Usuarios de ejemplo** con diferentes roles

## 🔄 Flujo de Autenticación

1. Usuario hace clic en "Continuar con Google"
2. Redirección a Google OAuth
3. Google retorna con datos del usuario
4. Sistema verifica restricción de dominio (si está activa)
5. Si es válido: Login exitoso → Dashboard
6. Si no es válido: Rechazo con mensaje de error

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Google OAuth  │───▶│  AuthController  │───▶│   Dashboard     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ DomainRestriction│
                    │   Middleware     │
                    └──────────────────┘
```

## 🎯 Próximas Mejoras

- [ ] Roles y permisos avanzados
- [ ] Categorías personalizadas
- [ ] Sistema de favoritos
- [ ] Exportación de flashcards
- [ ] API REST para móviles
- [ ] Integración con LMS

## 📞 Soporte

Este proyecto es un **proof of concept educativo** desarrollado para validar tecnologías de autenticación institucional. Perfecto para bootcamps, universidades y organizaciones que necesiten controlar acceso por dominio de email.

---
**Desarrollado para el Micro-Bootcamp Laravel** 🚀
