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

## Decisión arquitectónica actual (Mayo 2026)

La arquitectura confirmada para todos los mapas es:

```txt
raster base (webp) por breakpoint
+
SVG overlay (concesiones + labels + símbolos) por breakpoint
+
panel editorial HTML/CSS/JS
+
data estructurada por territorio
+
tokens de diseño
```

El raster y el SVG overlay se apilan con CSS (`position: absolute`) dentro de `.mapa-stack`. El `aspect-ratio` del stack se inyecta dinámicamente desde `render-diptico.js` según las dimensiones del breakpoint activo.

### Pipeline de producción de mapas

```txt
QGIS (fuente de verdad espacial)
→ PDF / captura de pantalla
→ webp por breakpoint (raster base)
→ Illustrator (redibuja concesiones sobre la captura)
→ exporta solo vectores como SVG overlay
→ HTML carga raster + SVG por separado
```

**Illustrator controla:** concesiones, labels, norte, escala, leyenda, símbolos, composición editorial.

**El raster controla:** relieve, ríos, borde del territorio, hillshade, textura.

**El SVG overlay NO debe contener** el raster de fondo embebido. Solo vectores.

---

## Archivos clave

```txt
css/diptico.css
js/data-territorios.js
js/render-diptico.js
templates/diptico-base.html
mapas-raster/03-waupasa-twi/*.webp
mapas-svg/03-waupasa-twi/*.svg
design-system/tokens/build/tokens.css
```

---

## Template activo

`templates/diptico-base.html` usa arquitectura de stack:

```html
<div class="mapa-editorial">
  <div class="mapa-stack">
    <img id="mapa-raster" class="mapa-raster" alt="Mapa base del territorio" />
    <object id="mapa-editorial-obj" class="mapa-overlay" type="image/svg+xml"></object>
  </div>
</div>
```

El `aspect-ratio` del `.mapa-stack` se inyecta por JS, no está hardcodeado en CSS.

---

## Render actual

`render-diptico.js` hace lo siguiente:

1. Lee `document.body.dataset.territorio`.
2. Busca ese ID en `data-territorios.js`.
3. Carga `templates/diptico-base.html`.
4. Renderiza header, mapa, stats, concesiones, fuente e insets.
5. Al cargar el mapa, inyecta `aspect-ratio` en `.mapa-stack` según `assets.width` y `assets.height` del breakpoint activo.
6. Cambia raster y SVG overlay en resize entre breakpoints.

Breakpoints:

```js
if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";
```

---

## Data para Waupasa Twi

En `data-territorios.js`, cada breakpoint incluye ruta de raster, SVG y dimensiones:

```js
assets: {
  desktop: {
    raster: "../../mapas-raster/03-waupasa-twi/desktop-03-Waupasa-Twi.webp",
    svg:    "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg",
    width:  927,
    height: 980,
  },
  tablet: {
    raster: "../../mapas-raster/03-waupasa-twi/tablet-03-Waupasa-Twi.webp",
    svg:    "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg",
    width:  780,
    height: 1306,
  },
  mobile: {
    raster: "../../mapas-raster/03-waupasa-twi/mobile-03-Waupasa-Twi.webp",
    svg:    "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg",
    width:  504,
    height: 634,
  },
},
```

Las dimensiones `width`/`height` deben coincidir exactamente con el tamaño del webp y el `viewBox` del SVG.

---

## CSS relevante

```css
.mapa-stack {
  position: relative;
  width: 100%;
  aspect-ratio: 927 / 980; /* fallback desktop — JS lo sobreescribe */
}

.mapa-raster,
.mapa-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.mapa-raster  { object-fit: fill; }
.mapa-overlay { pointer-events: none; }
```

---

## Dimensiones de assets — Waupasa Twi

| Breakpoint | Raster (webp) | SVG viewBox | Artboard Illustrator |
|---|---|---|---|
| Desktop | 927 × 980 px | 0 0 927 980 | 927 × 980 px |
| Tablet  | 780 × 1306 px | 0 0 780 1306 | 780 × 1306 px |
| Mobile  | 504 × 634 px | 0 0 504 634 | 504 × 634 px |

Regla crítica: **las tres dimensiones deben ser idénticas**. Si cambiás el artboard en Illustrator, actualizá el webp y los valores `width`/`height` en `data-territorios.js`.

---

## Pipeline correcto de Illustrator

### 1. Un artboard por breakpoint

```txt
desktop  — 927 × 980 px
tablet   — 780 × 1306 px
mobile   — 504 × 634 px
```

### 2. Exportar SVG overlay limpio

- `Use Artboards` activado
- Sin imagen embebida en el SVG (el raster va separado)
- `viewBox` coherente con el artboard
- Sin elementos importantes fuera del artboard

Verificar que el SVG no tiene imagen embebida:

```bash
grep -i "image\|xlink:href\|href" mapas-svg/03-waupasa-twi/*.svg
```

Debe retornar vacío (o solo referencias a defs internos, no a archivos externos).

### 3. Exportar raster (webp)

Captura del PDF de QGIS recortada y exportada exactamente al tamaño del artboard correspondiente.

---

## Sistema de diseño

Tokens generados desde Figma:

```bash
cd design-system/tokens
python3 figma-to-sd.py
npm run build
```

No editar `build/tokens.css` directamente.

---

## Territorios

| # | Territorio | Layout | Estado |
|---|---|---|---|
| 03 | Waupasa Twi | A | ✅ Piloto funcional — raster + SVG overlay responsive |
| 01 | Rama y Kriol | A | ⏳ Data base iniciada, pendiente assets |
| 02 | Creole de Bluefields | B | ⏳ Data base iniciada, pendiente assets |
| 04 | Wangki Twi-Tasba Raya | C | ⏳ Data base iniciada, pendiente assets |
| 05 | Wangki Li Aubra Tasbaya | C | ⏳ Pendiente |
| 07 | Tuahka | A | ⏳ Pendiente |
| 06, 08–15 | — | — | ⏳ Pendientes |

---

## Qué NO hacer

- No embeber el raster de fondo dentro del SVG overlay.
- No hardcodear `aspect-ratio` en CSS por territorio — el renderer lo inyecta.
- No corregir desalineación raster/SVG con `transform: scale()` o `translate()` en CSS.
- No modificar `build/tokens.css` directamente.
- No hardcodear contenido editorial en HTML si pertenece a `data-territorios.js`.
- No crear 15 HTML diferentes con estructuras distintas.
- No usar `ai2html` como arquitectura principal.
- No usar `localStorage`.

---

## Próximo paso

1. Commit + tag estable de Waupasa Twi.
2. Replicar pipeline a 01, 02 y 04:
   - Exportar raster (webp × 3 breakpoints)
   - Exportar SVG overlay (× 3 breakpoints)
   - Agregar `assets` con `width`/`height` en `data-territorios.js`
   - Verificar alineación en navegador
3. Completar datos editoriales pendientes (`⚠️` en data-territorios.js).