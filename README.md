# 📅 Organizator - Gestor de Horario Personal

Aplicación web completa para gestionar tu horario fijo diario, con tareas, alarmas y notificaciones.

## ✨ Características

- ✅ **Horario fijo diario** con 9 bloques de tiempo predefinidos
- ✅ **Gestión de tareas** dentro de cada bloque (añadir, editar, eliminar)
- ✅ **Marcar tareas como completadas** con persistencia
- ✅ **Posponer tareas** al día siguiente
- ✅ **Sistema de alarmas** con notificaciones 5 minutos antes de cada cambio de bloque
- ✅ **Modo claro/oscuro** con persistencia de preferencias
- ✅ **Interfaz responsive** para móvil y PC
- ✅ **Persistencia local** con localStorage

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+ y npm (o yarn/pnpm)

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - La aplicación se abrirá automáticamente en `http://localhost:5173`
   - Si no se abre automáticamente, navega manualmente a esa URL

4. **Permitir notificaciones:**
   - Cuando la app solicite permisos de notificación, acepta para recibir las alarmas
   - Las alarmas sonarán 5 minutos antes de cada cambio de bloque

## 📦 Construcción para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

Para previsualizar la versión de producción:

```bash
npm run preview
```

## 🌐 Despliegue en Vercel

La aplicación está lista para desplegarse en Vercel. Ver `DEPLOY.md` para instrucciones detalladas.

**Despliegue rápido:**
1. Sube el código a GitHub
2. Conecta el repositorio con Vercel
3. ¡Despliega automáticamente!

El archivo `vercel.json` ya está configurado.

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx       # Barra superior con controles de tema y alarmas
│   ├── ScheduleBlock.tsx # Componente para cada bloque del horario
│   ├── TaskList.tsx     # Lista de tareas dentro de un bloque
│   └── TaskItem.tsx     # Componente individual de tarea
├── context/
│   └── AppContext.tsx   # Context API para estado global
├── constants/
│   └── schedule.ts      # Horario fijo por defecto
├── types/
│   └── index.ts         # Definiciones de tipos TypeScript
├── utils/
│   ├── alarms.ts        # Sistema de alarmas y notificaciones
│   ├── storage.ts       # Persistencia con localStorage
│   └── time.ts          # Utilidades para manejo de tiempo
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales con Tailwind
```

## 📋 Horario Fijo

El horario incluye los siguientes bloques:

| Hora | Actividad |
|------|-----------|
| 08:00-08:15 | Desayuno |
| 08:15-08:30 | Ducha |
| 08:30-10:30 | Gimnasio |
| 10:30-14:30 | Programar |
| 14:30-15:30 | Comer |
| 15:30-19:30 | Jugar al LoL |
| 20:00-23:00 | Descanso |
| 23:00-24:00 | Desconexión ligera |
| 24:00 | Dormir |

## 🎯 Uso

### Añadir Tareas

1. Haz clic en el botón **▶** de cualquier bloque para expandirlo
2. Escribe la tarea en el campo de texto
3. Presiona "Añadir" o Enter

### Editar Tareas

- Haz **doble clic** en el texto de la tarea para editarla
- Presiona Enter para guardar o Escape para cancelar

### Marcar como Completada

- Haz clic en el checkbox junto a la tarea

### Posponer Tarea

- Haz clic en el botón **⏭️** junto a la tarea
- La tarea se marcará como pospuesta y se moverá al día siguiente

### Eliminar Tarea

- Haz clic en el botón **🗑️** junto a la tarea

### Controlar Alarmas

- **Global:** Usa el botón "🔔 Alarmas ON/OFF" en el header
- **Por bloque:** Haz clic en el icono de alarma (🔔/🔕) en cada bloque

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Context API** - Gestión de estado
- **Notification API** - Notificaciones del navegador
- **localStorage** - Persistencia de datos

## 📝 Notas

- Las alarmas verifican cada minuto si falta exactamente 5 minutos para el inicio de un bloque
- Los datos se guardan automáticamente en localStorage del navegador
- El modo claro/oscuro se persiste entre sesiones
- Las notificaciones requieren permisos del navegador

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta el linter

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal.

---

¡Disfruta organizando tu día! 🎉


