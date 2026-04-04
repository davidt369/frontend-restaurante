# Documento: Frontend — Cajas y Transacciones/Ventas

> Versión: 1.0 — Enfocado en la implementación del frontend (Cajas y Transacciones/Ventas)

## Índice

- Resumen
- Alcance y objetivos
- Arquitectura y estructura de carpetas (frontend)
- Flujo de usuario: Caja
- Flujo de usuario: Transacciones / Ventas
- Componentes principales (UI)
- Integración con API (endpoints, payloads)
- Estado y manejo de datos (hooks / store)
- Validaciones y errores
- Accesibilidad y usabilidad
- Pruebas y E2E
- Estilos y tokenización
- Despliegue y exportar a PDF
- Anexos: fragmentos de código y ejemplos

---

## Resumen

Este documento describe el comportamiento, componentes y la integración del frontend del módulo "Cajas" y "Transacciones/Ventas". Está pensado para desarrolladores frontend que necesitan entender la UX, los componentes clave, las llamadas al backend y las consideraciones para exportar documentación a PDF.

## Alcance y objetivos

- Cubrir pantallas y flujos para abrir/cerrar caja, registrar ventas y ver histórico de transacciones.
- Documentar componentes reutilizables, estados y puntos de integración con el backend.
- Proveer ejemplos de payloads, manejo de errores y recomendaciones para pruebas.

## Arquitectura y estructura de carpetas (frontend)

- Punto de entrada: `src/main.tsx` / `src/App.tsx` (estructura del router y providers).
- Módulos relevantes:
  - `src/modules/caja/` — vistas y componentes de caja.
  - `src/modules/transacciones/` — lista de ventas, detalle, filtros.
  - `src/lib/axios.ts` — cliente HTTP central.
  - `src/hooks/` — hooks compartidos (ej. `useMobile`, hooks de datos).
- Estilo: CSS + variables (o CSS-in-JS según el proyecto). Tokens en `src/styles` (si existen).

> Nota: adapta rutas a la estructura real del repo (las carpetas listadas arriba son punto de partida).

## Flujo de usuario: Caja

1. Entrada a módulo Caja (pantalla principal de caja).
2. Mostrar estado actual de la caja: abierto / cerrado, saldo inicial, ventas del turno.
3. Acciones principales:
   - Abrir caja: formulario con `usuario`, `monto_inicial`, `fecha`.
   - Registrar venta rápida: seleccionar producto, cantidad, tipo de pago.
   - Cerrar caja: resumen de ventas, confirmar ajustes, guardar cierre.
4. Vista historial de turnos de caja: lista paginada con detalle por turno.

UX recomendaciones:
- Mostrar confirmaciones modales para abrir/cerrar caja.
- Indicar claramente el estado de conexión si la API no responde.
- Permitir búsqueda y filtros por fecha / usuario en historial.

## Flujo de usuario: Transacciones / Ventas

1. Listado de transacciones: paginado, con filtros por fecha, tipo, usuario, estado.
2. Ficha de transacción: detalle completo (items vendidos, totales, impuestos, método de pago).
3. Registrar/editar transacción (si la app lo permite): formulario con validaciones.
4. Exportar / imprimir recibo: acción para generar PDF o enviar a impresión.

UX recomendaciones:
- Indicadores de carga para consultas largas.
- Paginación y límites razonables (ej. 25 por página).
- Botones de acción claros: `Ver`, `Imprimir`, `Reembolsar`.

## Componentes principales (UI)

- `CajaHeader` — muestra estado de la caja, saldo y acciones rápidas.
- `CajaForm` — formulario de apertura/cierre de caja.
- `VentaQuickForm` — formulario compacto para ventas rápidas.
- `TransaccionesList` — tabla o lista virtualizada con filtros.
- `TransaccionDetail` — modal / página con detalle completo.
- `ConfirmModal` — componente reutilizable para confirmaciones.
- `Toast` / `Alert` — para notificaciones de éxito/error.

Estructura sugerida de componentes (ejemplo):

- `src/modules/caja/components/CajaHeader.tsx`
- `src/modules/caja/components/CajaForm.tsx`
- `src/modules/transacciones/components/TransaccionesList.tsx`
- `src/modules/transacciones/components/TransaccionDetail.tsx`


## Integración con API (endpoints, payloads)

A continuación ejemplos de endpoints REST típicos. Ajusta según el backend real.

- Obtener estado de caja actual
  - GET `/api/caja/estado` -> respuesta: `{ id, abierto, monto_inicial, saldo_actual, usuario }`

- Abrir caja
  - POST `/api/caja`  
  - Payload: `{ usuarioId, monto_inicial, informacion_adicional? }`
  - Respuesta: `{ id, abierto: true, monto_inicial, fecha_apertura }`

- Cerrar caja
  - POST `/api/caja/{id}/cerrar`  
  - Payload: `{ total_ventas, total_efectivo, notas? }`
  - Respuesta: `{ id, abierto: false, fecha_cierre, resumen }`

- Registrar venta
  - POST `/api/transacciones`  
  - Payload ejemplo:
    ```json
    {
      "cajaId": 1,
      "usuarioId": 42,
      "items": [{ "productoId": 7, "cantidad": 2, "precio": 12.5 }],
      "metodoPago": "efectivo",
      "total": 25.0
    }
    ```
  - Respuesta: `{ id, estado: 'completada', reciboUrl? }`

- Listar transacciones
  - GET `/api/transacciones?from=2026-01-01&to=2026-01-31&page=1&pageSize=25`

Manejo de errores:
- Códigos 400/422 -> mostrar errores de validación campo a campo.
- 401 -> redirigir a login.
- 500 -> mensaje genérico y opción de reintentar.

## Estado y manejo de datos (hooks / store)

Patrones recomendados:
- Usar un cliente HTTP central (`src/lib/axios.ts`) con interceptor para tokens.
- Hooks por entidad: `useCaja()`, `useTransacciones(params)`.
- Cache local para listados con revalidación (ej. SWR o React Query) para:
  - Listas de transacciones
  - Estado de la caja actual

Ejemplo simple de hook (conceptual):

```ts
// useCaja.ts
export function useCaja() {
  const { data, error, isLoading, refetch } = useQuery('caja-estado', () => api.get('/caja/estado'))
  return { data, error, isLoading, refetch }
}
```

Sincronización en tiempo real (opcional):
- Si se requiere simultaneidad (múltiples terminales), usar WebSocket o polling corto para actualizar estado de caja.

## Validaciones y errores

- Validaciones en cliente:
  - `monto_inicial` debe ser >= 0.
  - `cantidad` de item > 0.
  - `total` calculado debe coincidir con suma de items.
- UX de errores:
  - Mostrar errores inline en formularios.
  - Mostrar toasts para errores generales.
  - Bloquear acciones críticas (ej. cerrar caja) hasta confirmación.

## Accesibilidad y usabilidad

- Formularios accesibles con labels y `aria-*` donde aplique.
- Teclas rápidas para ventas rápidas (si el flujo lo demanda).
- Contraste y tamaño de botones para uso en dispositivos de caja (pantallas táctiles).

## Pruebas y E2E

- Unit tests para lógica de componentes: validaciones y cálculo de totales.
- E2E (Playwright / Cypress):
  - Escenario: abrir caja -> registrar venta -> cerrar caja -> verificar resumen.
  - Escenario: ver historial de transacciones y filtrar por fecha.

Archivo de ejemplo en repo: `playwright.config.ts` (usar el runner del proyecto para pruebas E2E).

## Estilos y tokenización

- Definir variables CSS para colores, espaciados y tipografías.
- Usar componentes visuales consistentes (`Button`, `Input`, `Table`) para evitar discrepancias.
- Soporte para modo móvil: diseñar `VentaQuickForm` con inputs grandes y botones táctiles.

## Despliegue y exportar a PDF

- El documento `.md` puede exportarse a PDF con herramientas como `pandoc`, `markdown-pdf`, o usando la funcionalidad de impresión del navegador (Abrir `file://` o vista en GitHub y Print -> Save as PDF).

Comandos útiles:

```bash
# con pandoc
pandoc restaurante-v2-frontend/docs/cajas-transacciones.md -o cajas-transacciones.pdf --pdf-engine=xelatex

# con grip (renderiza y abre en navegador) + imprimir a PDF manualmente
pip install grip
grip restaurante-v2-frontend/docs/cajas-transacciones.md --browser
```

## Anexos: fragmentos de código y ejemplos

1) Ejemplo: llamada para registrar venta (axios)

```ts
// src/lib/axios.ts (ejemplo de uso)
import axios from 'axios'
export const api = axios.create({ baseURL: process.env.API_URL })

// registrar venta
await api.post('/transacciones', {
  cajaId: 1,
  usuarioId: 42,
  items: [{ productoId: 7, cantidad: 2, precio: 12.5 }],
  metodoPago: 'efectivo',
  total: 25.0
})
```

2) Ejemplo: estructura de objeto de `Transaccion` (TypeScript)

```ts
interface ItemVenta { productoId: number; cantidad: number; precio: number }
interface Transaccion {
  id: number
  cajaId: number
  usuarioId: number
  items: ItemVenta[]
  total: number
  metodoPago: 'efectivo' | 'tarjeta' | 'otro'
  fecha: string
}
```

---

## Instrucciones rápidas para generar PDF (recomendado)

1. Abrir una terminal en la raíz del proyecto.
2. Instalar `pandoc` y una engine PDF (`tectonic` o `xelatex`) según tu SO.
3. Ejecutar:

```bash
pandoc restaurante-v2-frontend/docs/cajas-transacciones.md -o restaurante-v2-frontend/docs/cajas-transacciones.pdf --pdf-engine=xelatex
```

Alternativa: abrir el archivo `.md` en VS Code, usar la extensión Markdown PDF o usar la vista previa (`Ctrl+Shift+V`) y luego imprimir a PDF.

---

Si quieres, adapto el documento incluyendo fragmentos de código reales desde el frontend del repo (`src/modules/caja`, `src/modules/transacciones`) y agrego capturas de pantalla o ejemplos E2E concretos.
