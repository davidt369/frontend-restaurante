# PRD — Frontend (Restaurante V2)

> Versión: 1.0
> Fecha: 31 de marzo de 2026
> Autor: Equipo Frontend

## Resumen ejecutivo

Este documento de Requisitos de Producto (PRD) describe la visión, objetivos, alcance, funcionalidades, requisitos no funcionales y criterios de aceptación del frontend de la aplicación "Restaurante V2". El foco principal es ofrecer una interfaz responsiva, confiable y rápida para los módulos clave: cajas, transacciones/ventas, gestión de productos/ingredientes, usuarios y tablero (dashboard).

## Objetivos del producto

- Entregar una experiencia de caja rápida y táctil optimizada para puntos de venta.
- Garantizar integridad y sincronización de transacciones entre múltiples terminales.
- Facilitar la trazabilidad y consulta de transacciones por fecha, usuario y método de pago.
- Proveer una UI consistente y accesible para tareas de administración (productos, usuarios, reportes).
- Mantener un frontend modular, testeable y fácil de mantener.

## Alcance

Incluye:
- Interfaz de caja (abrir/gestionar/cerrar caja, venta rápida, impresión de recibos).
- Módulo de transacciones (listado, filtrado, detalle, reembolsos/parciales si aplica).
- Dashboard con métricas clave (ventas por día, top productos, resumen de caja).
- Gestión de productos y ingredientes (CRUD básico con búsquedas rápidas).
- Autenticación y roles (login, manejo de permisos: admin, cajero, cocina).

No incluye (fuera de alcance):
- Backend (API), aunque el PRD define integraciones y contratos.
- Integración con TPV de terceros o pasarelas complejas (solo flujos básicos de pago registrados).

## Stakeholders

- Product Owner: define priorización y aceptación.
- Equipo Frontend: implementación, pruebas y despliegue.
- Equipo Backend: contratos de API y soporte.
- Operaciones/Caja (usuarios finales): validación de UX en puntos de venta.

## Personas

- Cajero(a): usuario que registra ventas de manera rápida; necesidades: rapidez, botones grandes, confirmaciones claras.
- Gerente/Administrador: consulta reportes y cierra cajas, necesita filtros y exportes.
- Cocinero/Planta: consulta ordenes (si aplica), necesita datos claros y estados.

## Requisitos funcionales (RF)

RF-1: Inicio de sesión
- El sistema debe permitir login con email/usuario y contraseña.
- Soportar sesión persistente con token expiración.

RF-2: Estado de la caja
- Mostrar estado: abierto/cerrado, monto inicial, saldo actual, usuario responsable.
- Permitir abrir/cerrar caja con evidencia (monto inicial, notas).

RF-3: Registrar venta rápida
- Formulario compacto: búsqueda de producto por código/nombre, selección de cantidad, botón de pago.
- Calcular totales (subtotal, impuestos, descuento, total) en cliente antes de enviar.
- Confirmar venta con modal y mostrar recibo o `reciboUrl` si lo provee el backend.

RF-4: Listado y detalle de transacciones
- Listar transacciones paginadas por fecha/usuario/tipo.
- Filtrar por rangos de fecha, método de pago, estado.
- Ver detalle: items, totales, impuesto, usuario, hora, cajaId.

RF-5: Gestión de productos/ingredientes
- CRUD de productos con campos: nombre, precio, código, categoría, stock.
- Búsqueda incremental y autocompletar en formulario de venta.

RF-6: Dashboard
- Mostrar KPIs: ventas totales del día, tickets promedio, top 10 productos.
- Filtros por rango de fecha y por sucursal/terminal si aplica.

RF-7: Notificaciones y errores
- Toastr o componente de alertas para mostrar éxito/errores.
- Validaciones inline en formularios.

RF-8: Impresión/Exportes
- Generar vista imprimible de recibo y opción de exportar listados a CSV/PDF.

## Requisitos no funcionales (RNF)

RNF-1: Rendimiento
- La pantalla de caja debe renderizar y estar lista para interactuar en < 300ms en dispositivos razonables.
- Consultas de listados deben paginar y devolver cada página en < 800ms bajo carga normal.

RNF-2: Disponibilidad / Tolerancia a fallos
- Debe haber manejo de desconexión: operaciones en modo offline limitada (cache local) y reintento o cola para sincronización.

RNF-3: Seguridad
- Usar HTTPS para todas las llamadas.
- Manejo seguro de tokens (almacenamiento en HttpOnly cookie o secure storage según plataforma).
- Control de accesos por roles en UI (renderización condicional y protección de rutas).

RNF-4: Accesibilidad
- Cumplir WCAG AA en elementos críticos: contrastes, labels, navegación por teclado y lectores de pantalla.

RNF-5: Escalabilidad técnica
- Arquitectura modular por features; componentes reutilizables y hooks para lógica de datos.

## UX / Diseño

Principios:
- Minimalismo en flujo de caja: máximo 3 acciones para completar una venta.
- Componentes táctiles grandes para dispositivos de punto de venta.
- Feedback inmediato en cada acción (spinner en botones, toasts en respuestas).

Wireframes y flujos (resumen):
- Pantalla Caja: `CajaHeader` (estado), `VentaQuickForm` (productos + totales), panel lateral con `Transacciones del Turno`.
- Pantalla Transacciones: filtros arriba, lista en tabla, `Ver` abre modal con detalle y botones de acción (Imprimir, Reembolsar).
- Dashboard: tarjetas KPI, gráfico de ventas por día, lista de top productos.

## Integración API y contratos (ejemplos)

Se definirá contracto con Backend; ejemplos esperados:

- GET `/api/caja/estado` -> 200 `{ id, abierto, monto_inicial, saldo_actual, usuarioId }`
- POST `/api/caja` -> 201 `{ id, abierto: true, fecha_apertura }`
- POST `/api/caja/{id}/cerrar` -> 200 `{ id, abierto: false, resumen }`
- POST `/api/transacciones` -> 201 `{ id, estado:'completada', reciboUrl? }`
- GET `/api/transacciones?from=&to=&page=&pageSize=&usuarioId=` -> 200 `{ items: [...], total }`

Contratos deben documentarse y versionarse (OpenAPI/Swagger recomendado).

## Modelo de datos (resumen)

- Usuario: `{ id, nombre, rol }`
- Caja: `{ id, abierto, monto_inicial, saldo_actual, fecha_apertura, fecha_cierre, usuarioId }`
- Producto: `{ id, nombre, precio, codigo, categoria, stock }`
- Transaccion: `{ id, cajaId, usuarioId, items: [{productoId,cantidad,precio}], total, metodoPago, fecha }`

## Estado y arquitectura cliente

- Librería UI: componentes atómicos (`Button`, `Input`, `Table`, `Modal`).
- Estado remoto: React Query / SWR para listados y sincronización.
- Estado local: React Context o Zustand para estado de sesión y preferencia (tema, locale).
- Cliente HTTP central: `src/lib/axios.ts` con interceptors.
- Estructura modular por carpeta `src/modules/<feature>`.

## Testing y QA

- Unit tests: componentes, hooks y utilitarios (Jest + Testing Library).
- E2E: Playwright (ya presente en repo); escenarios críticos:
  - Abrir caja -> registrar varias ventas -> cerrar caja -> verificar resumen.
  - Listado de transacciones y filtros.
- Pruebas de rendimiento: carga básica en listados y latencia de endpoints simulados.

## Métricas de éxito

- Tiempo promedio para registrar una venta (objetivo < 10s desde inicio de venta hasta confirmación).
- Tasa de errores en ventas (objetivo < 0.5%).
- Latencia promedio de consultas de transacciones (< 800ms).
- Satisfacción de usuarios operativos (NPS/feedback manual tras piloto).

## Criterios de aceptación

- RF-3 (Registrar venta rápida): tests unitarios cubren cálculo de totales; E2E valida flujo completo.
- RF-4 (Listado/Detalle): paginación y filtros funcionan y muestran datos correctos del backend.
- UI accesible: audit con axe-core o herramienta similar y corrección de problemas críticos.
- Documentación: contractos API versionados y `README` de frontend actualizado con comandos para pruebas y despliegue.

## Roadmap y priorización

MVP (0–4 semanas):
- Login, pantalla de caja (abrir/venta/cerrar), registrar venta, ver transacciones del turno, imprimir recibo.

MVP+ (4–8 semanas):
- Listado completo de transacciones con filtros, dashboard básico, gestión de productos.

Iteraciones siguientes (8+ semanas):
- Offline sync robusta, roles avanzados, exportes y reportes programados.

## Riesgos y mitigaciones

- Riesgo: inconsistencias entre terminales debido a latencia o desconexión.
  - Mitigación: cola de transacciones locales y reconciliación, bloqueo de doble envío.
- Riesgo: UX de caja poco intuitivo que reduce velocidad de ventas.
  - Mitigación: pruebas con usuarios reales y ajustar botones/flujo.

## Operaciones y despliegue

- Entorno: desplegar frontend como SPA (Vite) en CDN o servicio de hosting (Netlify/Vercel) o en contenedor según CI/CD actual.
- Variables de entorno: `VITE_API_URL`, `VITE_FEATURE_FLAGS`.
- Health checks: endpoint de API y prueba simple de login/sesion.

## Apéndices

- `src` clave a revisar para referencia: `src/modules/caja`, `src/modules/transacciones`, `src/lib/axios.ts`, `playwright.config.ts`.
- Exportar a PDF: usar `pandoc` o vista previa de VS Code e imprimir a PDF. Ejemplo:

```bash
pandoc c:/Users/David/Documents/APKMobile/FullStack/restaurante-v2/restaurante-v2-frontend/docs/frontend-prd.md -o frontend-prd.pdf --pdf-engine=xelatex
```

---

Si quieres, adapto este PRD incluyendo:
- Wireframes concretos (imágenes/SVG) incrustadas.
- Conexión directa a los fragmentos de código reales extraídos de `src/modules/caja` y `src/modules/transacciones`.
- Una checklist de aceptación para QA lista para ejecutar en Playwright.
