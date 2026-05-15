# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido para **Fundación del Río (FDR)**. Documenta concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua mediante dípticos web embebibles.

El proyecto no es un dashboard ni una galería de mapas. Es un sistema editorial cartográfico: mapa a la izquierda, narrativa y datos a la derecha.

---

## Estado actual

| Componente | Estado |
|---|---|
| Design system FDR / tokens | ✅ Funcional |
| Pipeline Figma → Style Dictionary | ✅ Funcional |
| CSS base de díptico | ✅ Funcional |
| Template HTML reutilizable | ✅ Funcional |
| Renderer JS con aspect-ratio dinámico | ✅ Funcional |
| Data estructurada de territorios | ✅ Iniciada |
| Arquitectura raster + SVG overlay | ✅ Confirmada |
| 03 Waupasa Twi | ✅ Piloto funcional — desktop / tablet / mobile |
| PDF / print final | ⏳ Pendiente |
| Índice general del atlas | ⏳ Pendiente |
| Resto de mapas | ⏳ Pendientes de producción |

---

## Arquitectura

Cada díptico carga dos assets por breakpoint:

```txt
raster base (webp)     — relieve, ríos, borde territorial
SVG overlay (vectores) — concesiones, labels, norte, escala, leyenda
```

Se apilan mediante CSS (`position: absolute`) dentro de `.mapa-stack`. El `aspect-ratio` del stack se inyecta dinámicamente desde JS según las dimensiones del breakpoint activo, garantizando alineación perfecta entre raster y overlay.

### Pipeline de producción

```txt
QGIS → PDF → captura → webp (raster base)
                     ↓
              Illustrator (redibuja concesiones sobre la captura)
                     ↓
              SVG overlay limpio (solo vectores)
                     ↓
              HTML carga raster + SVG por separado
```

---

## Dimensiones de assets — Waupasa Twi

| Breakpoint | Tamaño | viewBox SVG |
|---|---|---|
| Desktop | 927 × 980 px | 0 0 927 980 |
| Tablet  | 780 × 1306 px | 0 0 780 1306 |
| Mobile  | 504 × 634 px | 0 0 504 634 |

Las dimensiones del webp, el viewBox del SVG y los valores `width`/`height` en `data-territorios.js` deben coincidir exactamente.

---

## Estructura del proyecto

```txt
atlas/
├── index.html
├── 01-rama-kriol/index.html
├── 02-creole-bluefields/index.html
├── 03-waupasa-twi/index.html
└── 04-wangki-twi-tasba-raya/index.html

css/
└── diptico.css

js/
├── data-territorios.js
└── render-diptico.js

templates/
└── diptico-base.html

mapas-raster/
└── 03-waupasa-twi/
    ├── desktop-03-Waupasa-Twi.webp
    ├── tablet-03-Waupasa-Twi.webp
    └── mobile-03-Waupasa-Twi.webp

mapas-svg/
└── 03-waupasa-twi/
    ├── desktop-03-Waupasa-Twi.svg
    ├── tablet-03-Waupasa-Twi.svg
    └── mobile-03-Waupasa-Twi.svg

design-system/
└── tokens/
    ├── source/
    ├── build/tokens.css
    ├── figma-to-sd.py
    └── package.json
```

---

## Territorios

| # | Territorio | Layout | Concesiones | Estado |
|---|---|---:|---:|---|
| 03 | Waupasa Twi | A | 9 | ✅ Piloto funcional |
| 01 | Rama y Kriol | A | 3 | ⏳ Data iniciada |
| 02 | Creole de Bluefields | B | 1 | ⏳ Data iniciada |
| 04 | Wangki Twi-Tasba Raya | C | 2 | ⏳ Data iniciada |
| 05 | Wangki Li Aubra Tasbaya | C | 2 | ⏳ Pendiente |
| 07 | Tuahka | A | 12+ | ⏳ Pendiente |
| 06, 08–15 | — | — | — | ⏳ Pendientes |

---

## Embed

```html
<iframe
  src="https://fundaciondelrio.org/atlas/03-waupasa-twi/"
  width="100%"
  height="700"
  frameborder="0">
</iframe>
```

---

## Qué NO hacer

- No embeber el raster dentro del SVG overlay.
- No hardcodear `aspect-ratio` por territorio en CSS.
- No corregir desalineación con `transform: scale()` o hacks CSS.
- No modificar `build/tokens.css` directamente.
- No hardcodear contenido editorial en HTML.
- No crear templates distintos por territorio.