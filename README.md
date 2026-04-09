# Restaurante V2 Frontend

Aplicacion web construida con React, Vite y TypeScript para operar el sistema Restaurante V2 desde el navegador.

Este frontend esta pensado para dos perfiles principales:

- administracion,
- caja / operacion diaria.

La aplicacion consume la API del backend, protege rutas por sesion y muestra las pantallas necesarias para trabajar con ventas, caja, cocina, catalogos y dashboard.

## Que resuelve este frontend

El frontend organiza la experiencia de uso para que el personal del restaurante pueda trabajar sin depender de procesos manuales o pantallas dispersas.

- Permite iniciar sesion y mantener una sesion activa.
- Evita que usuarios sin permisos entren a modulos restringidos.
- Facilita el registro rapido de operaciones diarias.
- Presenta indicadores claros para decisiones del negocio.
- Conecta directamente con el backend para consultar y guardar informacion.

## Flujo principal de uso

1. El usuario entra a la pantalla de inicio.
2. Hace clic en iniciar sesion.
3. Ingresa nombre de usuario y contrasena.
4. El sistema valida credenciales con la API.
5. Si el acceso es correcto, el usuario entra al dashboard o al modulo correspondiente.
6. Desde ahi puede trabajar en caja, ventas, cocina o administracion segun su rol.

## Páginas y rutas principales

### Publicas

- `/`: pagina de inicio.
- `/login`: formulario de acceso.

### Protegidas

- `/dashboard`: analitica principal.
- `/caja`: listado y control de cajas.
- `/caja/:id`: detalle de una caja especifica.
- `/caja/reporte`: resumen y reporte de caja.
- `/dashboard/ventas`: registro de ventas.
- `/ventas/historial`: historial de transacciones.
- `/dashboard/cocina`: seguimiento de cocina.

### Restringidas por rol

- `/dashboard/usuarios`: gestion de usuarios.
- `/dashboard/productos`: gestion de productos.
- `/dashboard/ingredientes`: gestion de ingredientes.
- `/dashboard/platos`: gestion de platos.

## Experiencia de usuario

### Inicio

La pagina principal presenta el sistema de forma simple y lleva al usuario al login.

### Login

El formulario valida que el usuario complete nombre de usuario y contrasena antes de enviar los datos al backend. Si las credenciales son correctas, se guarda la sesion y el usuario entra a la app.

### Dashboard

El dashboard muestra una lectura rapida de la operacion:

- ventas totales,
- gastos,
- ganancia neta,
- cantidad de transacciones,
- graficos por periodo,
- filtros de fecha.

### Caja

Desde caja se pueden abrir turnos, registrar gastos, revisar resumen y cerrar la jornada con control de diferencias.

### Ventas y cocina

El usuario puede registrar ventas, consultar historial y revisar pedidos pendientes o completados segun su rol.

## Stack tecnologico

- React 19
- Vite
- TypeScript
- React Router
- Axios
- Tailwind CSS
- shadcn/ui
- Recharts
- Vitest
- Playwright

## Requisitos previos

- Node.js 22 o superior.
- npm o pnpm segun tu entorno.
- Backend REST ejecutandose y accesible.

## Instalacion

```bash
npm install
```

## Configuracion de entorno

Define la variable principal de conexion a la API:

```bash
VITE_API_URL=http://localhost:3000/api
```

Si trabajas con el backend en Docker, normalmente la API esta disponible en `http://localhost:3000/api`.

## Comandos utiles

### Desarrollo

```bash
npm run dev
```

### Construccion y vista previa

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

### Pruebas unitarias o de componentes

```bash
npm run test
npm run test:run
npm run test:ui
```

### Pruebas end-to-end

```bash
npm run test:e2e
npm run test:e2e:ui
```

### Ejecucion con Docker

```bash
npm run docker:dev
```

## Autenticacion y manejo de sesion

El frontend guarda el token JWT en `localStorage` y lo agrega automaticamente a cada peticion protegida.

### Que hace cuando el token falla

- elimina el token y el usuario guardado,
- evita que la app siga usando una sesion invalida,
- redirige al login.

### Control por roles

Las rutas sensibles solo se muestran si el rol del usuario coincide con el permiso requerido.

- `admin`: acceso a usuarios y catalogos.
- `cajero`: acceso a caja, ventas y cocina.

## Componentes funcionales destacados

### LoginForm

Captura credenciales y valida campos obligatorios antes de enviar la solicitud.

### ProtectedRoute

Protege pantallas y evita acceso no autorizado.

### AuthProvider

Mantiene el estado global de sesion durante la navegacion.

### DashboardPage

Presenta metricas, graficos y filtros de fecha para analisis operativo.

## Indicadores que muestra la aplicacion

- ventas totales del periodo,
- gastos del periodo,
- ganancia neta,
- numero de transacciones,
- tendencia de ingresos y salidas,
- comparacion por rango de fechas.

## Uso recomendado por rol

### Administrador

- Revisa dashboard.
- Gestiona usuarios.
- Gestiona productos, ingredientes y platos.
- Supervisa la operacion general.

### Cajero

- Inicia sesion.
- Abre caja.
- Registra ventas y pagos.
- Registra gastos.
- Cierra caja con resumen.

### Apoyo de cocina

- Consulta ordenes pendientes o terminadas.
- Da seguimiento a pedidos registrados.

## Pruebas

La aplicacion cuenta con:

- pruebas unitarias de componentes y formularios,
- pruebas de integracion de flujo de autenticacion,
- pruebas end-to-end con Playwright.

Comandos sugeridos:

```bash
npm run test
npm run test:e2e
```

## Estructura general del frontend

- `src/App.tsx`: rutas y proteccion de acceso.
- `src/pages`: paginas publicas y principales.
- `src/modules/auth`: autenticacion, sesion y login.
- `src/modules/caja`: modulo de caja.
- `src/modules/dashboard`: metricas y analitica.
- `src/modules/productos`: catalogo de productos.
- `src/modules/ingredientes`: inventario de ingredientes.
- `src/modules/platos`: catalogo de platos.
- `src/modules/transacciones`: ventas e historial.
- `src/components`: UI reutilizable.
- `src/lib/axios.ts`: cliente HTTP central.

## Despliegue

### Desarrollo local

1. Inicia el backend.
2. Configura `VITE_API_URL`.
3. Ejecuta `npm run dev`.
4. Accede a la aplicacion desde la URL indicada por Vite.

### Build de produccion

```bash
npm run build
```

## Problemas frecuentes

### La pantalla de login no conecta con la API

- Verifica `VITE_API_URL`.
- Confirma que el backend este corriendo.
- Revisa errores de CORS en consola.

### Me redirige al login inmediatamente

- El token puede estar ausente o vencido.
- Revisa si la API respondio con `401`.
- Vuelve a iniciar sesion.

### No aparecen datos en dashboard o caja

- Confirma que existan registros en el backend.
- Revisa que el usuario tenga permisos.
- Verifica que la fecha seleccionada tenga informacion.

## Usuarios de prueba

En la pantalla de login se muestran usuarios de prueba cargados por seed cuando estan disponibles. Si cambiaste el seed o la base de datos, revisa las credenciales actuales en el backend.

## Referencias utiles

- Documentacion general del proyecto.
- README del backend.
- Pruebas E2E en `e2e`.
- Pagina de dashboard para validar el flujo real.