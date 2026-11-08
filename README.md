# Tienda 3D Personalizada (Bambu Lab P1S)

Aplicación web Full-Stack construida con Next.js, Supabase y Stripe, optimizada para gestionar impresiones 3D personalizadas, subida de archivos `.stl`/`.3mf` y pagos seguros.

## Guía de Despliegue Gratuito

### 1. Supabase (Base de Datos y Almacenamiento)
1. Crea una cuenta gratuita en [Supabase](https://supabase.com).
2. Crea un nuevo proyecto.
3. Ve a **SQL Editor** y ejecuta el contenido de `schema.sql`.
4. Ve a **Storage**, crea un Bucket público llamado `print-files`.
5. Obtén tus credenciales (`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`) en **Project Settings > API**.

### 2. Vercel (Hosting Gratuito del Frontend y Backend)
1. Sube este repositorio a tu cuenta de GitHub.
2. Inicia sesión en [Vercel](https://vercel.com) con GitHub y selecciona **Add New > Project**.
3. Importa tu repositorio.
4. En **Environment Variables**, añade:
   - `SUPABASE_URL` = tu url de supabase
   - `SUPABASE_SERVICE_ROLE_KEY` = tu llave de servicio
   - `STRIPE_SECRET_KEY` = tu llave secreta de stripe (opcional para pruebas iniciales)
5. Haz clic en **Deploy**. ¡Listo!