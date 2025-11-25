# 🚀 Guía de Despliegue en Vercel

## Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/organizator.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add New Project"
   - Selecciona el repositorio `organizator`
   - Vercel detectará automáticamente la configuración de Vite
   - Haz clic en "Deploy"

3. **¡Listo!** Tu app estará disponible en `https://tu-proyecto.vercel.app`

## Opción 2: Despliegue desde CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```

4. **Para producción:**
   ```bash
   vercel --prod
   ```

## Configuración Automática

El archivo `vercel.json` ya está configurado con:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite
- ✅ Rewrites para SPA (Single Page Application)

## Verificación Post-Despliegue

1. **Diseño Móvil:**
   - Abre la app en tu móvil o usa las herramientas de desarrollador del navegador
   - Verifica que:
     - El header se adapta correctamente
     - Los bloques del horario son legibles
     - Los botones son fáciles de tocar
     - Las tareas se muestran correctamente

2. **Prueba de Alarmas:**
   - Haz clic en "Permitir Notificaciones" en el componente de prueba
   - Haz clic en "Probar Alarma Ahora" para verificar que funcionan
   - Las notificaciones deberían aparecer en tu dispositivo

## Notas Importantes

- ⚠️ **Notificaciones:** Las notificaciones del navegador solo funcionan en contextos seguros (HTTPS). Vercel proporciona HTTPS automáticamente.
- 📱 **Móvil:** Las notificaciones requieren que el usuario las permita explícitamente.
- 🔔 **Alarmas:** Las alarmas funcionan en segundo plano mientras la pestaña esté abierta. Para que funcionen cuando la pestaña está cerrada, necesitarías un Service Worker (implementación futura).

## Solución de Problemas

### Build falla
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm install` funciona localmente

### Notificaciones no funcionan
- Verifica que estás usando HTTPS (Vercel lo proporciona automáticamente)
- Asegúrate de haber permitido las notificaciones en el navegador
- Algunos navegadores móviles tienen restricciones adicionales

### Diseño móvil no se ve bien
- Verifica que Tailwind CSS está configurado correctamente
- Revisa las clases responsive (`sm:`, `md:`, etc.)

