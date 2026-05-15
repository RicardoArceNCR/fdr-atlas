# CLAUDE.md — Atlas FDR / Dípticos Cartográficos

Contexto operativo para IA de editor. Leer antes de modificar CSS, JS, SVG, assets o documentación.

## Qué es este proyecto

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río.

El producto final son 15 dípticos web:

- embebibles vía iframe
- convertibles a PDF mediante print CSS
- construidos con HTML/CSS/JS estático
- alimentados por data estructurada
- apoyados por tokens de diseño
- con mapas raster + SVG overlay inline

No es dashboard. No es app GIS completa. Es un producto editorial cartográfico.

## Estado actual — Mayo 2026

Rama activa:

```txt
feat/waupasa-twi-editorial
```

Checkpoint sugerido:

```txt
waupasa-before-page-change-v1
```

Tags previos:

```txt
waupasa-editorial-stable-pre-ui-v1
waupasa-hybrid-stable-v1
waupasa-responsive-svg-stable-v1
```

## Arquitectura confirmada

```txt
raster base webp por breakpoint
+
SVG overlay inline por breakpoint
+
panel editorial HTML/CSS/JS
+
data estructurada por territorio
+
tokens de diseño
```

El SVG se inserta inline con JavaScript dentro de:

```html
<div id="mapa-svg-inline" class="mapa-svg-inline"></div>
```

Esto reemplaza la estrategia anterior con `<object>`.

## Archivos críticos

```txt
css/diptico.css
js/render-diptico.js
js/data-territorios.js
templates/diptico-base.html
atlas/03-waupasa-twi/index.html
mapas-raster/03-waupasa-twi/*.webp
mapas-svg/03-waupasa-twi/*.svg
project_wp_tree.txt
```

## CSS obligatorio para SVG inline

Debe existir en `css/diptico.css`:

```css
.mapa-svg-inline {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.mapa-svg-inline svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
```

Este bloque evita que el SVG exista en el DOM pero no se vea o quede debajo del raster.

## Render actual

`render-diptico.js` debe:

1. Leer `document.body.dataset.territorio`.
2. Cargar `templates/diptico-base.html`.
3. Renderizar contenido editorial.
4. Calcular breakpoint activo.
5. Cargar raster webp.
6. Fetch del SVG correspondiente.
7. Insertar SVG inline dentro de `#mapa-svg-inline`.
8. Inicializar interactividad después de insertar el SVG.
9. Re-renderizar mapa si cambia el breakpoint.

Breakpoints:

```js
if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";
```

## Assets Waupasa Twi

En `data-territorios.js`:

```js
assets: {
  desktop: {
    raster: "../../mapas-raster/03-waupasa-twi/desktop-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg",
    width: 927,
    height: 980,
  },
  tablet: {
    raster: "../../mapas-raster/03-waupasa-twi/tablet-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg",
    width: 780,
    height: 1306,
  },
  mobile: {
    raster: "../../mapas-raster/03-waupasa-twi/mobile-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg",
    width: 504,
    height: 634,
  },
}
```

## Reglas críticas del SVG

El SVG overlay debe contener solo vectores.

No debe contener:

```txt
<image>
base64
xlink:href a imagen raster
href a imagen raster
mask
filter
foreignObject
```

Validar con:

```bash
grep -i "image\|xlink:href\|href" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
```

Si no devuelve nada, está limpio.

## IDs esperados en Waupasa Twi

Países:

```txt
pais-china
pais-canada
pais-nicaragua
```

Concesiones:

```txt
caribe
columbus
el-encanto-i
el-encanto-ii
yulu-awaskira
puerto-cabezas
vanessa
walpa-tara
reserva-minera
```

Otros:

```txt
poblados
norte
```

## Export correcto desde Illustrator

Usar:

```txt
File → Export → Export As…
Format: SVG
Use Artboards: ON
```

No usar Asset Export para el SVG maestro.

Opciones recomendadas:

```txt
Object IDs: Layer Names
Responsive: OFF
Minify: OFF
Preserve Illustrator Editing Capabilities: OFF
```

Si el SVG raíz sale como:

```html
<svg id="pais-nicaragua">
```

entonces se exportó mal: probablemente se exportó un asset o grupo, no el artboard completo.

El SVG correcto debe tener raíz sin ID específico de país:

```html
<svg ... viewBox="0 0 927 980">
```

## Qué NO hacer

- No editar SVG a mano como solución permanente.
- No usar `<object>` para la versión interactiva.
- No embeber raster dentro del SVG.
- No arreglar alineación con `transform: scale()` o `translate()` en CSS.
- No hardcodear dimensiones por CSS si ya vienen de `data-territorios.js`.
- No editar `design-system/tokens/build/tokens.css` directamente.
- No crear HTML distintos por territorio.
- No usar Asset Export para el SVG maestro final.
- No borrar `README.md` accidentalmente.

## Debug rápido en navegador

Con DevTools abierto:

```js
document.querySelector('#mapa-svg-inline svg')
document.querySelector('#mapa-svg-inline').getBoundingClientRect()
document.querySelector('#mapa-svg-inline svg').getBoundingClientRect()
document.getElementById('caribe')
document.getElementById('pais-china')
```

Si el SVG existe y tiene dimensiones, pero no se ve, revisar:

- cache
- ruta real en Network
- z-index
- fill/stroke del SVG
- si el raster está encima
- si el SVG cargado es viejo

## Manejo de archivos de auditoría

Archivos como estos pueden ser útiles durante diagnóstico:

```txt
svg-audit-batch.py
audit-details/
AUDIT_REPORT.json
AUDIT_REPORT.txt
```

Pero no son parte obligatoria del producto final. Versionarlos solo si se decide mantener un sistema formal de QA para los 15 mapas.

## Comando recomendado de checkpoint

```bash
git status

git restore README.md

git add css/diptico.css \
  js/render-diptico.js \
  js/data-territorios.js \
  templates/diptico-base.html \
  project_wp_tree.txt \
  mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg

git commit -m "fix(waupasa): stabilize inline svg overlay before page change"

git tag waupasa-before-page-change-v1

git push origin feat/waupasa-twi-editorial
git push origin waupasa-before-page-change-v1
```

## Próximo trabajo

Después de este checkpoint:

1. Validar desktop/tablet/mobile.
2. Cerrar hover por país.
3. Definir si auditoría SVG se queda en repo.
4. Replicar metodología al siguiente mapa.
