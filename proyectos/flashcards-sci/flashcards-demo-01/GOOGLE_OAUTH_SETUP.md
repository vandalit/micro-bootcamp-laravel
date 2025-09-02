# 🔑 Configuración Google OAuth - Paso a Paso

## 📋 **Pasos para obtener credenciales de Google**

### **1. Acceder a Google Cloud Console**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con tu cuenta de Google

### **2. Crear o Seleccionar Proyecto**
1. En la parte superior, haz clic en el selector de proyectos
2. **Opción A**: Selecciona un proyecto existente
3. **Opción B**: Haz clic en "Nuevo Proyecto"
   - Nombre: `FlashCards-Cientificas` (o el que prefieras)
   - Haz clic en "Crear"

### **3. Habilitar APIs necesarias**
1. En el menú lateral, ve a **"APIs y servicios" > "Biblioteca"**
2. Busca **"Google+ API"** y habilítala
3. También busca y habilita **"People API"** (recomendado)

### **4. Configurar Pantalla de Consentimiento OAuth**
1. Ve a **"APIs y servicios" > "Pantalla de consentimiento de OAuth"**
2. Selecciona **"Externo"** (para testing)
3. Completa la información básica:
   - **Nombre de la aplicación**: FlashCards Científicas
   - **Email de soporte del usuario**: tu-email@gmail.com
   - **Dominios autorizados**: localhost
   - **Email de contacto del desarrollador**: tu-email@gmail.com
4. Haz clic en **"Guardar y continuar"**
5. En "Alcances", haz clic en **"Guardar y continuar"** (sin agregar alcances adicionales)
6. En "Usuarios de prueba", agrega tu email y otros emails que usarás para testing

### **5. Crear Credenciales OAuth 2.0**
1. Ve a **"APIs y servicios" > "Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES"**
3. Selecciona **"ID de cliente de OAuth 2.0"**
4. Configura:
   - **Tipo de aplicación**: Aplicación web
   - **Nombre**: FlashCards Científicas Web Client
   - **URIs de JavaScript autorizados**:
     ```
     http://localhost:8000
     http://127.0.0.1:8000
     ```
   - **URIs de redirección autorizados**:
     ```
     http://localhost:8000/auth/google/callback
     http://127.0.0.1:8000/auth/google/callback
     ```
5. Haz clic en **"Crear"**

### **6. Copiar Credenciales**
1. Aparecerá un modal con tus credenciales
2. **Copia el "ID de cliente"** (empieza con algo como `123456789-abc...googleusercontent.com`)
3. **Copia el "Secreto del cliente"** (string aleatorio)
4. Guarda estos valores de forma segura

## 🔧 **Configurar en tu aplicación Laravel**

### **1. Editar archivo .env**
Abre el archivo `.env` en tu proyecto y actualiza estas líneas:

```env
GOOGLE_CLIENT_ID=tu_client_id_copiado_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_copiado_aqui
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback
```

### **2. Ejemplo de configuración:**
```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-1234567890abcdefghijklmnop
GOOGLE_REDIRECT_URL=http://localhost:8000/auth/google/callback
```

## ✅ **Verificar configuración**

### **1. Reiniciar servidor Laravel**
```bash
# Detener el servidor (Ctrl+C)
# Volver a iniciar
php artisan serve
```

### **2. Probar autenticación**
1. Ve a `http://localhost:8000/login`
2. Haz clic en "Continuar con Google"
3. Debería redirigirte a Google para autenticación
4. Después del login, deberías llegar al dashboard

## 🚨 **Problemas comunes**

### **Error: "redirect_uri_mismatch"**
- Verifica que las URIs de redirección en Google Cloud coincidan exactamente
- Asegúrate de usar `http://localhost:8000` (no `127.0.0.1` si configuraste localhost)

### **Error: "invalid_client"**
- Verifica que copiaste correctamente el CLIENT_ID y CLIENT_SECRET
- No debe haber espacios extra al inicio o final

### **Error: "access_denied"**
- Asegúrate de que tu email esté en la lista de usuarios de prueba
- Verifica que la aplicación esté en modo "Testing" en Google Cloud

## 🔄 **Cambiar a producción (más adelante)**

Cuando quieras usar la app en producción:
1. Cambia el estado de la app de "Testing" a "En producción" en Google Cloud
2. Actualiza las URIs de redirección con tu dominio real
3. Actualiza el archivo `.env` con la URL de producción
