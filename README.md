# Atlas FDR — Dípticos Cartográficos

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río (FDR).

## Estado actual

**Checkpoint recomendado:** `waupasa-before-page-change-v1`

El piloto activo es:

- Territorio: `03-waupasa-twi`
- Rama de trabajo: `feat/waupasa-twi-editorial`
- Arquitectura: raster base + SVG inline overlay + panel editorial HTML/CSS/JS
- Mapa piloto: Waupasa Twi funcional con SVG exportado desde Illustrator y cargado inline
- Fix reciente: `.mapa-svg-inline` ahora se posiciona correctamente sobre el raster con `position:absolute`, `inset:0`, `width/height:100%` y `z-index:2`

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

## Archivos clave

```txt
atlas/03-waupasa-twi/index.html
templates/diptico-base.html
css/diptico.css
js/render-diptico.js
js/data-territorios.js
mapas-raster/03-waupasa-twi/*.webp
mapas-svg/03-waupasa-twi/*.svg
design-system/tokens/build/tokens.css
```

## CSS crítico del SVG inline

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

Este bloque es obligatorio para que el SVG inline se apile correctamente sobre el raster.

## Pipeline de producción de mapas

```txt
QGIS / fuente cartográfica
→ raster base webp por breakpoint
→ Illustrator
→ SVG overlay limpio por breakpoint
→ navegador carga raster + SVG inline
```

## Reglas para exportar SVG desde Illustrator

Usar:

```txt
File → Export → Export As…
Format: SVG
Use Artboards: ON
```

No usar Asset Export para el SVG maestro, porque puede exportar solo un grupo/layer.

Opciones recomendadas:

```txt
Object IDs: Layer Names
Responsive: OFF
Minify: OFF
Preserve Illustrator Editing Capabilities: OFF
```

El SVG no debe contener `<image>`, base64, `xlink:href` hacia raster, `mask`, `filter` ni `foreignObject`.

Validación rápida:

```bash
grep -i "image\|xlink:href\|href" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
```

Si no devuelve nada, el SVG no tiene raster embebido.

## Breakpoints del mapa Waupasa Twi

| Breakpoint | Raster/SVG | Dimensiones |
|---|---:|---:|
| Desktop | `desktop-03-Waupasa-Twi` | 927 × 980 |
| Tablet | `tablet-03-Waupasa-Twi` | 780 × 1306 |
| Mobile | `mobile-03-Waupasa-Twi` | 504 × 634 |

Las dimensiones del raster, el viewBox del SVG y los valores en `data-territorios.js` deben coincidir.

## Comandos útiles

Levantar sitio local desde la raíz:

```bash
python3 -m http.server 8000
```

Abrir:

```txt
http://localhost:8000/atlas/03-waupasa-twi/
```

Verificar SVG cargado en consola:

```js
document.querySelector('#mapa-svg-inline svg')
document.querySelector('#mapa-svg-inline').getBoundingClientRect()
document.querySelector('#mapa-svg-inline svg').getBoundingClientRect()
```

Verificar IDs:

```bash
grep -o 'id="[^"]*"' mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg | sort | uniq
```

## Guardado estable recomendado

Antes de cambiar de página o pasar a otro territorio:

```bash
git status

# README.md aparece borrado: restaurarlo antes de commitear
git restore README.md

# Agregar solo lo importante del checkpoint
git add css/diptico.css \
  mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg \
  project_wp_tree.txt

git commit -m "fix(waupasa): stabilize inline svg overlay before page change"

git tag waupasa-before-page-change-v1

git push origin feat/waupasa-twi-editorial
git push origin waupasa-before-page-change-v1
```

Si se decide conservar nuevos archivos de auditoría:

```bash
git add svg-audit-batch.py audit-details/
```

Si no se desean versionar todavía:

```bash
rm -rf audit-details svg-audit-batch.py mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi-rasterize.svg
```

## Estado de tags previos

Referencias existentes:

```txt
waupasa-editorial-stable-pre-ui-v1
waupasa-hybrid-stable-v1
waupasa-responsive-svg-stable-v1
```

Nuevo checkpoint recomendado:

```txt
waupasa-before-page-change-v1
```

## Próximo paso

Después de guardar este checkpoint:

1. Confirmar que desktop, tablet y mobile cargan el SVG correcto.
2. Revisar hover por país.
3. Validar que los IDs de SVG coinciden con `data-territorios.js`.
4. Replicar pipeline al siguiente territorio.
