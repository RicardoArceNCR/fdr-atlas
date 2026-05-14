# CLAUDE.md — Atlas FDR / Dípticos Cartográficos

Contexto operativo para Claude y cualquier IA de editor. Leer antes de modificar código, CSS, SVG o assets.

---

## Qué es este proyecto

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para **Fundación del Río (FDR)**.

El producto final son **15 dípticos web**:

- embebibles vía `<iframe>`
- convertibles a PDF mediante print CSS
- construidos con HTML/CSS/JS estático
- alimentados por data estructurada en JavaScript
- apoyados por un sistema de diseño con tokens

No es dashboard. No es una app GIS completa. No es una galería de imágenes. Es un producto editorial cartográfico.

---

## Decisión arquitectónica actual

La arquitectura confirmada para mapas complejos es:

```txt
SVG completo por breakpoint
+
panel editorial HTML/CSS/JS
+
data estructurada por territorio
+
tokens de diseño
```

Para el mapa piloto `03-waupasa-twi`, el render activo usa:

```txt
mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg
mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg
```

Cada SVG debe ser autocontenido o tener links válidos a imágenes embebidas. La precisión mapa/SVG se resuelve dentro del propio SVG, no mediante hacks CSS.

---

## Cambio importante respecto a versiones anteriores

Antes se exploró:

```txt
raster base + SVG overlay separado
```

Ese enfoque causó problemas de alineación responsive entre raster y overlay. Para el piloto Waupasa Twi se decidió usar **SVG completo por breakpoint**, cargado en un `<object>`.

No volver a separar raster + overlay para este mapa salvo que exista una razón técnica fuerte.

---

## Archivos clave

```txt
css/diptico.css
js/data-territorios.js
js/render-diptico.js
templates/diptico-base.html
mapas-svg/03-waupasa-twi/*.svg
design-system/tokens/build/tokens.css
```

---

## Render actual

`render-diptico.js` hace lo siguiente:

1. Lee `document.body.dataset.territorio`.
2. Busca ese ID en `data-territorios.js`.
3. Carga `templates/diptico-base.html`.
4. Renderiza header, mapa, stats, concesiones, fuente e insets.
5. Cambia el mapa SVG según breakpoint.

Breakpoints actuales:

```js
function getBreakpoint() {
  const width = window.innerWidth;
  if (width <= 767) return "mobile";
  if (width <= 1199) return "tablet";
  return "desktop";
}
```

No cambiar estos cortes sin revisar también CSS y assets exportados.

---

## Data actual para Waupasa Twi

En `data-territorios.js`:

```js
{
  id: '03-waupasa-twi',
  numero: '03',
  nombre: 'Waupasa Twi',
  assets: {
    desktop: { svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg" },
    tablet:  { svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg" },
    mobile:  { svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg" },
  },
  layout: 'A'
}
```

El mapa tiene 9 concesiones registradas como data editorial. Varios campos siguen como placeholder `—` y deben verificarse con FDR.

---

## Template actual

`templates/diptico-base.html` usa:

```html
<div class="mapa-editorial">
  <object id="mapa-editorial-obj" data="" type="image/svg+xml"></object>
</div>
```

El mapa se carga reemplazando el atributo `data` del `<object>`.

El template todavía contiene leyenda HTML superpuesta:

```html
<div class="diptico__leyenda-mapa">
  ...
</div>
```

Si el SVG ya trae leyenda integrada, esta leyenda puede duplicarse. No eliminarla globalmente sin decidir si se usará en otros mapas.

---

## CSS actual relevante

En `css/diptico.css`:

```css
.diptico[data-layout="A"] {
  grid-template-columns: 55fr 45fr;
}

.diptico__mapa {
  grid-column: 1;
  grid-row: 1 / -1;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: var(--mapa-tierra-exterior);
  padding: 2rem;
}

.mapa-editorial {
  width: min(100%, 920px);
  margin-inline: auto;
}

.mapa-editorial svg,
.mapa-editorial object {
  width: 100%;
  height: auto;
  display: block;
}
```

Tablet:

```css
@media (min-width: 768px) and (max-width: 1199px) {
  .diptico[data-layout="A"] {
    grid-template-columns: 58fr 42fr;
  }

  .diptico__mapa {
    height: auto;
    position: relative;
    padding: clamp(1rem, 3vw, 2rem);
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .mapa-editorial {
    width: min(100%, 760px);
  }
}
```

Mobile apila mapa + info desde `max-width: 767px`.

---

## Pipeline correcto de Illustrator

Para cada mapa complejo:

### 1. Crear composiciones por breakpoint

```txt
MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE
```

Cada composición puede tener encuadre distinto.

### 2. Cada SVG debe ser exportado desde un artboard limpio

Requisitos:

- usar `Use Artboards`
- no dejar elementos importantes fuera del canvas
- evitar linked files rotos
- embeber la imagen base si es necesario
- revisar que el `viewBox` corresponda al artboard
- exportar sin cambiar escala entre capas

### 3. Verificar links rotos

Después de exportar:

```bash
grep -R "ENTREGA_20ABRIL_26\|03_Waupasa Twi - limpio\|image href\|xlink:href" mapas-svg/03-waupasa-twi
```

Si aparece una ruta vieja/inexistente, el SVG puede cargar sin mapa base.

---

## Cómo diagnosticar problemas de mapa

### Si el mapa no aparece

Revisar consola por 404 de imagen dentro del SVG. Abrir directo:

```txt
http://localhost:8000/mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
```

Si directo falla, el problema es del SVG/export, no del renderer.

### Si desktop/tablet no calzan con Illustrator

Revisar:

- `viewBox`
- artboard activo
- si hay elementos fuera del artboard
- si el SVG tiene transforms en grupo raíz
- si el mapa base está enlazado o embebido
- si se exportó con `Use Artboards`

No corregir desalineación con `transform: scale()` o `translate()` en CSS salvo diagnóstico temporal.

### Si mobile tiene espacio lateral feo

El espacio probablemente forma parte del artboard/viewBox. Corregir en Illustrator, no con CSS.

---

## Sistema de diseño

Tokens generados desde Figma:

```bash
cd design-system/tokens
python3 figma-to-sd.py
npm run build
```

Verificar:

```bash
grep -R "concesion-pais" build/tokens.css
grep -R "mapa-" build/tokens.css
```

Tokens importantes:

```css
--concesion-pais-china
--concesion-pais-canada
--concesion-pais-colombia
--concesion-pais-nacional
--concesion-tipo-reserva
--mapa-tierra-exterior
--mapa-territorio-borde
```

No hardcodear nuevos colores si ya existen tokens.

---

## Territorios actuales

| # | Territorio | Layout | Estado |
|---|---|---|---|
| 01 | Rama y Kriol | A | Data base iniciada |
| 02 | Creole de Bluefields | B | Data base iniciada |
| 03 | Waupasa Twi | A | Piloto funcional con SVG responsive |
| 04 | Wangki Twi-Tasba Raya | C | Data base iniciada |
| 05 | Wangki Li Aubra Tasbaya | C | Pendiente |
| 07 | Tuahka | A | Pendiente |
| 06, 08–15 | — | — | Pendientes |

---

## Qué NO hacer

- No volver a depender de `ai2html` como arquitectura principal.
- No separar raster + overlay SVG en Waupasa Twi si el SVG completo ya funciona.
- No corregir exports malos con hacks CSS permanentes.
- No modificar tokens generados directamente en `build/tokens.css`.
- No hardcodear contenido editorial en HTML si pertenece a `data-territorios.js`.
- No crear 15 HTML diferentes con estructuras distintas.
- No convertir esto en dashboard.
- No usar `localStorage`.

---

## Estado actual de consola

Mensajes como estos no bloquean:

```txt
SES Removing unpermitted intrinsics
favicon.ico 404
```

Pueden venir de extensiones, navegador o falta de favicon.

Priorizar errores reales de rutas internas, especialmente 404 dentro de `mapas-svg/` o imágenes referenciadas dentro de SVG.

---

## Próximo paso recomendado

Cerrar Waupasa Twi como checkpoint estable:

1. Revisar desktop/tablet/mobile directo en navegador.
2. Revisar la página completa `/atlas/03-waupasa-twi/`.
3. Decidir si la leyenda cartográfica queda en SVG o HTML.
4. Limpiar assets duplicados si ya no se usan.
5. Commit + tag estable.
6. Replicar pipeline a 01, 02 y 04.

Nombre sugerido de tag:

```bash
git tag waupasa-svg-responsive-stable-v1
git push origin waupasa-svg-responsive-stable-v1
```
