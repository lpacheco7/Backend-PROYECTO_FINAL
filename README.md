Trabajo Integrador Final — Sistema de Partidos + Invitaciones

Descripción
Aplicación web full-stack para la gestión de partidos deportivos. Permite a los usuarios crear partidos, invitar participantes por correo electrónico, y administrar su participación en distintos eventos.

El sistema incluye autenticación segura con verificación de email, control de acceso mediante JWT y un flujo completo de invitaciones entre usuarios.

Funcionalidades principales
  Autenticación
    Registro de usuario con verificación por correo electrónico
    Login con generación de token JWT
    Acceso protegido a rutas privadas mediante middleware
  Gestión de partidos
    Creación de partidos con:
      Cancha / ubicación
      Fecha
      Horario
      Tamaño del partido (cantidad de jugadores)
      Eliminación de partidos
      Visualización de partidos asociados al usuario
  Sistema de invitaciones
    Invitación de usuarios a partidos por email
    Aceptar o rechazar invitaciones

Arquitectura del backend
src/
 ├─ config/
 ├─ models/
 ├─ repositories/
 ├─ services/
 ├─ controllers/
 ├─ routes/
 └─ middleware/

Seguridad
  Hash de contraseñas con bcrypt
  Autenticación con JWT (Bearer Token)
  Verificación de email mediante token de activación
  Middleware de protección de rutas sensibles
  Expiración de tokens JWT
  
Endpoints de la API
POST /auth/register
Registro de usuario y envío de email de verificación.

GET /auth/verify-email?token=...
Verificación de cuenta mediante token enviado por email.

POST /auth/login
Inicio de sesión y generación de JWT.

POST /partido/create
Crear un nuevo partido.

GET /partido/getallbyuser
Obtener todos los partidos asociados al usuario autenticado.

PUT /partido/update/:partido_id
Actualizar información de un partido.

DELETE /partido/delete/:partido_id
Eliminar un partido.

POST /partido/:partido_id/members
Invitar usuarios a un partido por email.

GET /partido/:partido_id/members/:decision
Aceptar o rechazar una invitación.

DELETE /partido/members/:partido_id/remove
Eliminar un usuario de un partido.

Middleware de autenticación
  Todas las rutas de /partido (excepto invitaciones iniciales) están protegidas mediante JWT:

Validación del token Bearer
  Acceso restringido a usuarios autenticados
  Control de permisos por usuario

Sistema de invitaciones por email
  Un usuario crea un partido
  Invita a otros usuarios mediante email
  El invitado recibe un correo con la invitación
  Puede aceptar o rechazar la participación

Flujo general de la aplicación
  Registro de usuario
  Verificación de email
  Login → recepción de JWT
  Acceso al Home  
    Visualización de partidos propios y compartidos
    Creación o gestión de partidos
    Invitación de otros usuarios por email
    Gestión de asistencia (aceptar / rechazar)

Tecnologías utilizadas
Frontend
  React
  React Router
  Fetch / Axios
  Vite o CRA

Backend
  Node.js
  Express
  MongoDB + Mongoose
  JWT
  bcrypt
  Nodemailer
  CORS
  dotenv

Despliegue
Frontend - Vercel: https://frontend-proyecto-final-two.vercel.app/

Backend - Vercel: https://backend-proyecto-final-pink.vercel.app/

Base de datos- MongoDB Atlas

Variables de entorno para el backend
MONGO_DB_CONNECTION_STRING=
MONGO_DB_NAME=
MODE=
PORT=
GMAIL_PASSWORD=
GMAIL_USERNAME=
URL_BACKEND=
URL_FRONTEND= 
JWT_SECRET=

Variables de entorno para el frontend
VITE_API_URL=

Usuario de prueba
Email: test@test.com
Password: 123456
Estado: verificado

POSTMAN: 
https://lorenzopacheco02-3542780.postman.co/workspace/UTN~9d491c44-8679-485f-b941-643a170e2dba/collection/54488563-9398b231-3248-4147-b4e5-8f1b8db16590?action=share&amp;source=copy-link&amp;creator=54488563

Instalación y ejecución del proyecto
1. Clonar repositorios
  Clonar backend y frontend por separado:
git clone <URL_REPOSITORIO_BACKEND>
git clone <URL_REPOSITORIO_FRONTEND>

2. Configuración del Backend
  2.1 Ingresar al proyecto
    cd backend
  2.2 Instalar dependencias
    npm install
  2.3 Crear archivo .env
  2.4 Ejecutar backend

3. Configuración del Frontend
  3.1 Ingresar al proyecto
    cd frontend
  3.2 Instalar dependencias
    npm install
  3.3 Crear archivo .env
    VITE_API_URL=http://localhost:3000
  3.4 Ejecutar frontend
    npm run dev
4. Configuración de MongoDB Atlas
    Crear cluster en MongoDB Atlas
    Crear usuario de base de datos
    Permitir acceso desde cualquier IP (0.0.0.0/0)
    Copiar URI de conexión
    Reemplazar en MONGO_URI

5. Configuración de Email (Nodemailer)
  Si se usa Gmail:
  Activar verificación en 2 pasos
  Generar “App Password”
  Usar ese password en:
  EMAIL_PASS=app_password_generada

6. Flujo de ejecución completo
  Levantar backend (npm run dev)
  Levantar frontend (npm run dev)
  Registrar usuario
  Verificar email
  Iniciar sesión
  Usar la aplicación
