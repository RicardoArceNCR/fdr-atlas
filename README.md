# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido para Fundación del Río (FDR).

El atlas documenta concesiones mineras sobre territorios indígenas y afrodescendientes de Nicaragua mediante dípticos editoriales responsivos, exportables a PDF y embebibles vía iframe.

---

# Estado actual

| Componente                        | Estado             |
| --------------------------------- | ------------------ |
| Design system FDR                 | ✅                  |
| Tokens Figma → Style Dictionary   | ✅                  |
| Arquitectura híbrida raster + SVG | ✅                  |
| Renderer dinámico                 | ✅                  |
| Template reusable                 | ✅                  |
| Responsive desktop/tablet/mobile  | ✅                  |
| Waupasa Twi (03)                  | ✅ Piloto validado |
| PDF export                        | ⏳ Refinamiento     |
| Migración territorios restantes   | ⏳ En progreso      |

---

# Arquitectura oficial

El atlas utiliza una arquitectura híbrida:

RASTER BASE

* relieve
* agua
* hillshade
* textura editorial

SVG OVERLAY

* concesiones
* labels
* símbolos
* overlays
* borde territorial

HTML EDITORIAL

* narrativa
* estadísticas
* leyenda
* fuentes

---

# Fuente de verdad espacial

Desde Mayo 2026:

**QGIS es la fuente oficial de verdad espacial del proyecto.**

Eso significa:

* las geometrías NO deben dibujarse manualmente
* las concesiones provienen del GIS original
* los límites territoriales provienen del GIS original
* los overlays SVG deben derivarse de datos GIS reales

Illustrator ya NO es la fuente de geometría.
Illustrator es una herramienta de refinamiento editorial.

Esto permite:

* consistencia entre los 15 mapas
* mantenimiento escalable
* actualizaciones futuras
* precisión espacial
* responsive más estable

---

# Decisión técnica principal

NO:

* SVG con raster embebido
* ai2html como arquitectura principal

SÍ:

* raster separado
* SVG overlay separado
* HTML editorial reusable

Esto permite:

* responsive estable
* PDF limpio
* mantenimiento escalable
* overlays ligeros
* actualizaciones rápidas

---

# Estructura del proyecto

atlas/
├── index.html
├── css/
├── js/
├── templates/
├── data/
│   ├── geojson/
│   └── qgis-styles/
├── mapas-raster/
├── mapas-svg/
└── design-system/

---

# Pipeline correcto

GPKG / GIS source
→ QGIS (fuente de verdad espacial)
→ GeoJSON limpio
→ Illustrator (refinamiento editorial)
→ SVG overlay limpio
→ HTML/CSS/JS

**QGIS controla:**
* geometría
* concesiones
* territorio
* ríos
* poblados
* precisión espacial

**Illustrator controla:**
* labels
* jerarquía visual
* patrones
* composición editorial
* refinamiento responsive

**HTML/CSS controla:**
* layout
* narrativa
* responsive
* export PDF

---

# Export GIS

Configuración recomendada:

CRS:
EPSG:4326

Coordinate precision:
6

RFC7946:
YES

---

# Pipeline Illustrator

Cada territorio debe tener:

MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE

---

# SVG correcto

Debe contener:

* concesiones
* labels
* símbolos
* overlays

NO:

* raster
* image embeds

Verificación:

grep -i "image\|xlink:href" mapas-svg/**/*.svg

Debe retornar vacío.

---

# Renderer

render-diptico.js:

1. detecta breakpoint
2. cambia raster
3. cambia SVG
4. renderiza narrativa
5. renderiza stats y concesiones

Toda variabilidad vive en:
data-territorios.js

---

# Qué NO hacer

❌ No volver a ai2html como arquitectura principal
❌ No embeder raster dentro del SVG
❌ No crear 15 templates distintos
❌ No corregir exports malos con hacks CSS permanentes
❌ No editar build/tokens.css manualmente

---

# Próximo paso

1. Cerrar Waupasa Twi estable
2. Migrar 01 Rama y Kriol
3. Migrar 02 Creole de Bluefields
4. Migrar 04 Wangki Twi-Tasba Raya
5. Rollout completo
