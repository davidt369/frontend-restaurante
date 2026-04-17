# Documentación: Historial de Commits — Repositorio `frontend-restaurante`

> **URL del repositorio:** https://github.com/davidt369/frontend-restaurante  
> **Fecha de elaboración:** 28 de marzo de 2026

---

## Índice

1. [Introducción](#1-introducción)
2. [Desarrollo de Contenido](#2-desarrollo-de-contenido)
   - 2.1 Creación del Repositorio
   - 2.2 Implementación de Ramas para Desarrollo
   - 2.3 Historial Completo de Commits
   - 2.4 Fusiones de Código (Pull Requests)
3. [Conclusión](#3-conclusión)
4. [Referencias Bibliográficas](#4-referencias-bibliográficas)

---

## 1. Introducción

El repositorio **`frontend-restaurante`** es un proyecto de interfaz de usuario (frontend) para un sistema de gestión de restaurante, desarrollado con **React**, **TypeScript** y **Vite**. El sistema abarca módulos de autenticación, gestión de caja, cocina, transacciones/ventas, platos, ingredientes, productos y usuarios.

Este documento recoge evidencia del trabajo colaborativo realizado en el repositorio: la estructura de ramas adoptada, el historial cronológico de commits y las fusiones de código mediante Pull Requests, cumpliendo con los requisitos mínimos de:

1. Creación de un repositorio de proyecto.
2. Implementación de ramas para desarrollo.
3. Realización de commits y fusiones de código.

---

## 2. Desarrollo de Contenido

### 2.1 Creación del Repositorio

El repositorio fue creado y configurado inicialmente por el usuario **Dex** (`davidt369`). El primer commit registrado data del **3 de febrero de 2026**, donde se estableció la estructura base del proyecto.

| Campo | Detalle |
|---|---|
| **Propietario** | `davidt369` |
| **Nombre** | `frontend-restaurante` |
| **Visibilidad** | Público |
| **Rama protegida** | `main` |
| **Tecnologías** | React 18, TypeScript, Vite, TailwindCSS, shadcn/ui |
| **Primer commit** | `c34687f` — `inicio` (03-Feb-2026) |
| **URL** | https://github.com/davidt369/frontend-restaurante |

---

### 2.2 Implementación de Ramas para Desarrollo

El equipo organizó el trabajo en **5 ramas** distintas, siguiendo un flujo de trabajo basado en ramas de características (*feature branches*):

| # | Rama | Propósito | Autor Principal | Estado |
|---|---|---|---|---|
| 1 | `main` | Rama principal de producción (protegida) | DEX | ✅ Activa |
| 2 | `develop` | Rama de integración / desarrollo colaborativo | DEX | ✅ Activa |
| 3 | `cambios-joel` | Rama personal de Joel (MAPACHE32) — cambios en módulos de login y productos | MAPACHE32 | ✅ Fusionada |
| 4 | `cambio-erick` | Rama personal de Erick (trello2146-netizen) — cambios en títulos y textos | trello2146-netizen | ✅ Fusionada |
| 5 | `copilot/documentacion-historial-de-comits` | Rama de documentación (Copilot) | GitHub Copilot | ✅ Activa |

#### Diagrama del flujo de ramas

```
main (protegida)
  │
  └── develop
        ├── cambios-joel  ──(PR #2, merged 24-Mar-2026)──►  develop
        ├── cambio-erick  ──(PR #1, merged 24-Mar-2026)──►  develop
        └── celsofranciscano/main ─(PR #3, merged 24-Mar-2026)─► develop
```

> La rama `develop` actúa como rama de integración donde todos los colaboradores fusionan sus cambios antes de llegar a `main`.

---

### 2.3 Historial Completo de Commits

El repositorio acumula **más de 40 commits** distribuidos entre todas las ramas. A continuación se presenta el historial organizado por fases de desarrollo.

---

#### 🔷 FASE 1 — Inicio del Proyecto (Febrero 2026)

Commits realizados en `main` por el autor principal **Dex**:

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `c34687f` | 03-Feb-2026 | Dex | `inicio` |
| `411f305` | 05-Feb-2026 | Dex | `interfaces de arqueo de caja` |
| `1c6bdf9` | 07-Feb-2026 | Dex | `crud completo de platos, productos, pedidos` |
| `f5200c9` | 07-Feb-2026 | Dex | `funcionalidad de transaccion completada` |
| `230f910` | 07-Feb-2026 | Dex | `validacion de abrir caja para pedido` |

---

#### 🔷 FASE 2 — Configuración de Despliegue y Componentes (Febrero 2026)

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `fa798c7` | 07-Feb-2026 | Dex | `configuracion para deploy` |
| `f7a8172` | 07-Feb-2026 | Dex | `configuracion para deploy2` |
| `3fc0617` | 07-Feb-2026 | Dex | `configuracion para deploy33` |
| `66daaee` | 07-Feb-2026 | Dex | `configuracion para deploy3323` |
| `da824fd` | 09-Feb-2026 | Dex | `correcion de decimales en ingredientes` |
| `324bb49` | 09-Feb-2026 | Dex | `nuevos componentes` |
| `5e7f409` | 09-Feb-2026 | Dex | `nuevos componentes v2` |
| `0749724` | 09-Feb-2026 | Dex | `nuevos componentes v22` |
| `96031d1` | 09-Feb-2026 | Dex | `nuevos componentes v223` |

---

#### 🔷 FASE 3 — Módulo de Caja y Transacciones (Febrero 2026)

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `78445a3` | 11-Feb-2026 | Dex | `configuracion de caja` |
| `7826517` | 12-Feb-2026 | Dex | `configuracion de historial de cajas v2` |
| `afa2688` | 12-Feb-2026 | Dex | `configuracion de historial de transacciones` |
| `facf49e` | 15-Feb-2026 | Dex | `configuracion de cocina y transacciones` |
| `2257a69` | 15-Feb-2026 | Dex | `configuracion de transacciones y mejora de UI y UX` |
| `eaa10a1` | 15-Feb-2026 | Dex | `configuracion de transacciones y mejora de UI y UX2` |
| `cb96f5c` | 22-Feb-2026 | Dex | `cambios de caja configuracion e historiales` |

---

#### 🔷 FASE 4 — Mejoras de UI y Dashboard (Marzo 2026)

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `aa05d5e` | 08-Mar-2026 | Dex | `mejroa de colores e integraciond e api de dashboard` |
| `a5dc3a4` | 08-Mar-2026 | Dex | `se quito el darkmode` |
| `d092e71` | 19-Mar-2026 | Dex | `Refactorización: actualización del estilo y la estructura en varios componentes` |
| `e20592c` | 19-Mar-2026 | Dex | `Mejoras: actualización de los componentes de gestión de efectivo y adición de nuevas funcionalidades` |
| `20eea05` | 19-Mar-2026 | Dex | `Mejoras: renombrar transacciones a ventas en componentes y rutas, y agregar control de acceso por roles` |
| `d21caef` | 20-Mar-2026 | Dex | `Mejoras: renombrar transacciones a ventas (v2)` |
| `66a95cb` | 20-Mar-2026 | Dex | `feat: add sales count and average sale to ResumenCierre; enhance transaction history page with best sellers and sales by table; implement PDF preview dialog` |
| `a7704b5` | 20-Mar-2026 | Dex | `nuevas configuraciones de reportes` |
| `4cb4c99` | 20-Mar-2026 | Dex | `nuevas configuraciones de reportes2` |
| `4964623` | 20-Mar-2026 | Dex | `nuevas configuraciones de reportes22` |

---

#### 🔷 FASE 5 — Trabajo Colaborativo en Ramas Individuales (23–24 Marzo 2026)

Esta fase representa el trabajo colaborativo más visible del proyecto, donde múltiples contribuidores trabajaron en ramas separadas.

**Rama `develop` — Commit base para colaboración:**

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `2fb04c8` | 23-Mar-2026 | DEX | `rama de desarrollo` |

---

**Rama `cambios-joel` — Commits de MAPACHE32 (Joel Benitez):**

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `f4efab1` | 23-Mar-2026 | MAPACHE32 | `Cambios en login un poco de texto` |
| `e06d01f` | 23-Mar-2026 | MAPACHE32 | `Prueba 1: Añadiendo comentario inicial` |
| `9fa7d53` | 23-Mar-2026 | MAPACHE32 | `Prueba 2: Creacion de archivo` |
| `91a58cc` | 23-Mar-2026 | MAPACHE32 | `Prueba 3: texto en archivo` |
| `2968c29` | 23-Mar-2026 | MAPACHE32 | `Prueba 4: texto extra en archivo productospage` |
| `d08affe` | 23-Mar-2026 | MAPACHE32 | `Prueba 5: cambio de notificacion de eliminar plato` |

---

**Rama `cambio-erick` — Commits de trello2146-netizen (Erick):**

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `2019fe6` | 23-Mar-2026 | trello2146-netizen | `cambio 1 erick` |
| `f86786e` | 23-Mar-2026 | trello2146-netizen | `cambio 2 erick` |
| `814728b` | 23-Mar-2026 | trello2146-netizen | `cambio 3 erick` |
| `54d3b58` | 23-Mar-2026 | trello2146-netizen | `cambio 4 erick` |
| `c619260` | 23-Mar-2026 | trello2146-netizen | `cambio 5 erick` |

---

**Commits de Celso Franciscano (colaborador externo via fork):**

| SHA | Fecha | Autor | Mensaje del Commit |
|---|---|---|---|
| `05cc1a0` | 23-Mar-2026 | Celso Franciscano | `refactor(caja): refactor completo de CajaPage manteniendo UI y funcionalidad` |
| `9d2d3da` | 23-Mar-2026 | Celso Franciscano | `correcion de palabras` |
| `35b28ea` | 23-Mar-2026 | Celso Franciscano | `correcion de ortografia` |
| `8a8add2` | 23-Mar-2026 | Celso Franciscano | `update sintaxis` |
| `d30c04f` | 23-Mar-2026 | Celso Franciscano | `update class tailwindcss` |
| `becb44f` | 23-Mar-2026 | Celso Franciscano | `claridad en manejo de errores` |

---

### 2.4 Fusiones de Código (Pull Requests)

El repositorio registra **3 Pull Requests** cerrados y fusionados, todos entre el 23 y 24 de marzo de 2026, evidenciando el proceso de revisión y fusión de código colaborativo:

---

#### PR #1 — Cambio erick

| Campo | Detalle |
|---|---|
| **Título** | Cambio erick |
| **Autor** | `trello2146-netizen` (Erick) |
| **Rama origen** | `cambio-erick` |
| **Rama destino** | `develop` |
| **Estado** | ✅ Fusionado (merged) |
| **Fecha apertura** | 23-Mar-2026 |
| **Fecha fusión** | 24-Mar-2026 a las 01:33 UTC |
| **Descripción** | _"cambios a algunos titulos, solo texto"_ |
| **Revisado por** | DEX (davidt369) |
| **URL** | https://github.com/davidt369/frontend-restaurante/pull/1 |

**Commits incluidos en este PR:**
- `cambio 1 erick` — `cambio 2 erick` — `cambio 3 erick` — `cambio 4 erick` — `cambio 5 erick`

---

#### PR #2 — Actualizar texto de inicio de sesión y modificar notificaciones

| Campo | Detalle |
|---|---|
| **Título** | Actualizar el texto de inicio de sesión y modificar las notificaciones de la página del producto |
| **Autor** | `MAPACHE32` (Joel Benitez) |
| **Rama origen** | `cambios-joel` |
| **Rama destino** | `develop` |
| **Estado** | ✅ Fusionado (merged) |
| **Fecha apertura** | 23-Mar-2026 |
| **Fecha fusión** | 24-Mar-2026 a las 01:32 UTC |
| **Descripción** | _"solo texto a los archivos en modules"_ |
| **Revisado por** | DEX (davidt369) |
| **URL** | https://github.com/davidt369/frontend-restaurante/pull/2 |

**Commits incluidos en este PR:**
- `Cambios en login un poco de texto` — `Prueba 1` a `Prueba 5` — Merge de `develop` en `cambios-joel`

---

#### PR #3 — Refactorización de página de caja

| Campo | Detalle |
|---|---|
| **Título** | refactorizacion de pagina de caja |
| **Autor** | `celsofranciscano` (Celso Franciscano — fork externo) |
| **Rama origen** | `main` (del fork `celsofranciscano/frontend-restaurante-david`) |
| **Rama destino** | `develop` |
| **Estado** | ✅ Fusionado (merged) |
| **Fecha apertura** | 23-Mar-2026 |
| **Fecha fusión** | 24-Mar-2026 a las 01:17 UTC |
| **Descripción** | Estado unificado en interfaz `CajaPageState`, navegación centralizada (`navigateTab`), uso de `useCallback` para optimización, mejoras de responsividad, manejo de errores más consistente. Sin alterar comportamiento observable. |
| **Revisado por** | DEX (davidt369) |
| **URL** | https://github.com/davidt369/frontend-restaurante/pull/3 |

**Commits incluidos en este PR:**
- `refactor(caja): refactor completo de CajaPage` — `correcion de palabras` — `correcion de ortografia` — `update sintaxis` — `update class tailwindcss` — `claridad en manejo de errores`

---

#### Merge commits de integración (rama `develop`)

| SHA | Fecha | Mensaje |
|---|---|---|
| `cd9307e` | 24-Mar-2026 | `Merge pull request #3 from celsofranciscano/main — refactorizacion de pagina de caja` |
| `e7dbe8b` | 24-Mar-2026 | `Merge branch 'develop' into cambios-joel` |
| `4c6af8c` | 24-Mar-2026 | `Merge pull request #2 from davidt369/cambios-joel — Actualizar el texto de inicio de sesión...` |
| `70cba1f` | 24-Mar-2026 | `Merge branch 'develop' into cambio-erick` |
| `4a2eb06` | 24-Mar-2026 | `Merge pull request #1 from davidt369/cambio-erick — Cambio erick` |

---

### Resumen estadístico de contribuidores

| Contribuidor | GitHub | Total commits | Rol |
|---|---|---|---|
| **Dex** | `davidt369` | ~25 | Autor principal / Revisor de PRs |
| **MAPACHE32** | `MAPACHE32` | 7 | Colaborador (rama `cambios-joel`) |
| **trello2146-netizen** | `trello2146-netizen` | 5 | Colaborador (rama `cambio-erick`) |
| **Celso Franciscano** | `celsofranciscano` | 6 | Colaborador externo (fork → PR #3) |

---

## 3. Conclusión

El repositorio `frontend-restaurante` demuestra evidencia concreta de trabajo colaborativo mediante control de versiones Git:

1. **Creación del repositorio**: El proyecto fue inicializado el 3 de febrero de 2026 por `Dex`, con estructura de proyecto completa en el primer commit (`c34687f`), incluyendo 156 archivos y más de 25,600 líneas de código.

2. **Ramas para desarrollo**: Se implementó un flujo de trabajo con ramas especializadas: `main` (producción, protegida), `develop` (integración), y ramas personales por cada colaborador (`cambios-joel`, `cambio-erick`). Además, se recibieron contribuciones externas vía fork desde `celsofranciscano/frontend-restaurante-david`.

3. **Commits y fusiones**: El historial acumula más de 40 commits distribuidos en 5 ramas, con 3 Pull Requests formalmente revisados y fusionados el 24 de marzo de 2026 hacia la rama `develop`. Este proceso aseguró que los cambios fueran revisados antes de integrarse, cumpliendo con buenas prácticas de desarrollo colaborativo.

La evolución del proyecto muestra una progresión ordenada: desde la creación de módulos base (CRUD, autenticación, caja) en febrero, pasando por mejoras de UX y reportes en marzo, hasta el trabajo colaborativo formalizado con PRs a finales de marzo.

---

## 4. Referencias Bibliográficas

- **Repositorio oficial:** https://github.com/davidt369/frontend-restaurante
- Chacon, S. & Straub, B. (2014). *Pro Git* (2nd ed.). Apress. Disponible en: https://git-scm.com/book/es/v2
- GitHub Docs. (2026). *About pull requests*. https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
- GitHub Docs. (2026). *About branches*. https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
- Atlassian. (2026). *Git Feature Branch Workflow*. https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
- React Docs. (2026). *React — The library for web and native user interfaces*. https://react.dev
- Vite Docs. (2026). *Vite — Next Generation Frontend Tooling*. https://vite.dev

---

*Documento generado a partir del historial real del repositorio `davidt369/frontend-restaurante` con fecha de corte 28 de marzo de 2026.*
