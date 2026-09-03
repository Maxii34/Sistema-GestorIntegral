
<div align="center">

# IronGym

### Panel web para la gestión integral de gimnasios

Controlá socios, membresías, renovaciones, ingresos y vencimientos desde una interfaz administrativa rápida y clara.

![Next.js](https://img.shields.io/badge/Next.js-16.3.3-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)

</div>

## Descripción

IronGym es una aplicación web para operadores y administradores de gimnasios. El frontend se comunica con una API REST para administrar el padrón de socios, los planes de membresía, las renovaciones y los datos financieros del dashboard.

## Funcionalidades

- Inicio con resumen de actividad y carrusel de membresías disponibles.
- Inicio de sesión y registro de administradores.
- Alta, búsqueda, renovación y eliminación de socios.
- Creación, edición, activación y eliminación de membresías.
- Resumen de socios activos, ingresos y vencimientos.
- Historial de altas y renovaciones.
- Integración con el backend local o desplegado en Vercel.

## Tecnologías

- **Next.js 16** con App Router.
- **React 19** y TypeScript.
- **Tailwind CSS 4** para estilos responsivos.
- **Lucide React** para iconografía.
- **SweetAlert2** para alertas y notificaciones.
- **API REST** desarrollada con Node.js, Express y MongoDB.

## Configuración

Creá un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=https://force-gym-backend.vercel.app
```

Para trabajar con el backend local:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

La variable `NEXT_PUBLIC_API_URL` debe configurarse también en las variables de entorno del proyecto frontend en Vercel. Después de modificarla, es necesario realizar un nuevo deploy.

## Instalación y desarrollo

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la compilación de producción
npm run start    # Inicia la aplicación compilada
npm run lint     # Ejecuta ESLint
```

## Backend

La API desplegada está disponible en:

**https://force-gym-backend.vercel.app/**

El frontend consume, entre otras, estas rutas:

- `/api/admin/login`
- `/api/usuarios`
- `/api/membrecia`
- `/api/renovar`
- `/api/stats/dashboard`

## Estructura principal

```text
src/
├── app/                 # Páginas y rutas del App Router
├── componentes/         # Componentes visuales y del dashboard
└── lib/api/             # Cliente y funciones de comunicación con la API
```

## Autor

**Maxi Ordoñez** || Desarrollador full stack

Proyecto desarrollado para la gestión operativa de gimnasios.
