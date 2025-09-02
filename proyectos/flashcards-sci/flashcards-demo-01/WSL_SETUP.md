# 🐧 Configuración para WSL (Windows Subsystem for Linux)

## 🚀 Comandos para ejecutar en WSL

Abre tu terminal WSL y navega al directorio del proyecto:

```bash
cd /mnt/c/Users/vanda/Documents/Codigo/micro-bootcamp-laravel/proyectos/flashcards-sci/flashcards-demo-01
```

## 📋 Pasos de Configuración

### 1. Verificar PHP y Composer
```bash
php --version
composer --version
```

### 2. Instalar dependencias
```bash
composer install
composer require laravel/socialite
```

### 3. Configurar entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configurar base de datos
```bash
touch database/database.sqlite
php artisan migrate
php artisan db:seed
```

### 5. Ejecutar servidor
```bash
php artisan serve
```

## 🔧 Si PHP no está instalado en WSL

### Ubuntu/Debian WSL:
```bash
sudo apt update
sudo apt install php8.2 php8.2-cli php8.2-common php8.2-mysql php8.2-zip php8.2-gd php8.2-mbstring php8.2-curl php8.2-xml php8.2-bcmath php8.2-sqlite3
```

### Instalar Composer:
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## 🌐 Acceder a la aplicación

Una vez que ejecutes `php artisan serve`, la aplicación estará disponible en:
- `http://localhost:8000`
- `http://127.0.0.1:8000`

## ⚠️ Problemas comunes en WSL

### Permisos de archivos:
```bash
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

### Si SQLite da problemas:
```bash
sudo apt install sqlite3
```

## 🔑 Configuración Google OAuth

Edita el archivo `.env` y agrega:
```env
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback
```

## 📊 Verificar que todo funciona

1. **Base de datos**: `php artisan migrate:status`
2. **Rutas**: `php artisan route:list`
3. **Configuración**: `php artisan config:show`
