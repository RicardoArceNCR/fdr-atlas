# CLAUDE.md — Atlas FDR

Contexto operativo para asistentes IA y desarrollo del Atlas FDR.

Leer antes de modificar:

* SVG
* CSS
* renderer
* templates
* exports Illustrator/QGIS
* assets cartográficos

---

# Qué es este proyecto

Atlas editorial cartográfico sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua.

Cliente:

* Fundación del Río (FDR)

Producto:

* 15 dípticos editoriales
* responsive
* embebibles vía iframe
* exportables a PDF

NO es:

* GIS app
* dashboard
* visor cartográfico complejo

Es:

* producto editorial cartográfico híbrido

---

# Arquitectura oficial (Mayo 2026)

RASTER separado
+
SVG overlay separado
+
HTML editorial

---

# Arquitectura híbrida

## Raster base

Contiene:

* relieve
* agua
* hillshade
* textura

NO:

* concesiones
* labels
* overlays

---

## SVG overlay

Contiene:

* concesiones
* labels
* símbolos
* overlays
* borde territorio

NO:

* image embeds
* raster

Verificación obligatoria:

grep -i "image\|xlink:href" mapas-svg/**/*.svg

Debe retornar vacío.

---

# CSS crítico

.mapa-stack {
position: relative;
width: 100%;
aspect-ratio: 927 / 980;
}

.mapa-raster,
.mapa-overlay {
position: absolute;
inset: 0;
width: 100%;
height: 100%;
}

.mapa-raster {
object-fit: contain;
}

.mapa-overlay {
pointer-events: none;
}

---

# Breakpoints oficiales

if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";

---

# Pipeline correcto

GPKG / GIS source
→ QGIS (fuente de verdad espacial)
→ GeoJSON limpio
→ Illustrator (refinamiento editorial)
→ SVG overlay limpio
→ HTML/CSS

**QGIS controla:**
* geometría real
* concesiones
* límites territoriales
* ríos
* poblados
* reservas

**Illustrator controla:**
* composición editorial
* labels
* patrones
* símbolos
* refinamiento visual

NO dibujar geometría manualmente en Illustrator.

---

# Export GIS correcto

CRS:
EPSG:4326

Coordinate precision:
6

RFC7946:
YES

---

# Organización de capas

Separar SIEMPRE:

* territorio
* concesiones
* ríos
* poblados
* reservas

NO exportar todo junto.

---

# Renderer

render-diptico.js:

1. detecta breakpoint
2. carga raster
3. carga SVG
4. renderiza narrativa
5. renderiza stats
6. renderiza concesiones

NO duplicar lógica por territorio.

Toda variabilidad vive en:
data-territorios.js

---

# Responsive

Desktop:

* split editorial

Tablet:

* layout comprimido

Mobile:

* stack vertical

NO corregir exports rotos con:

* scale()
* translate()
* hacks CSS

Corregir desde:
Illustrator/QGIS.

---

# Illustrator workflow

Cada territorio debe tener:

MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE

---

# Regla crítica de geometría

Illustrator NO debe utilizarse para:

❌ redibujar concesiones
❌ alterar límites espaciales
❌ crear geometrías inventadas

Illustrator SÍ debe utilizarse para:

✅ labels
✅ composición
✅ patrones editoriales
✅ refinamiento responsive
✅ limpieza visual del overlay SVG

Toda geometría debe originarse desde QGIS.

---

# Design system

Pipeline:

Figma
→ figma-to-sd.py
→ Style Dictionary
→ tokens.css

NO editar:

* build/tokens.css

Editar:

* source/
* Figma variables

---

# Testing obligatorio

Antes de commit:

* Desktop OK
* Tablet OK
* Mobile OK
* PDF OK
* Overlay alineado
* Console limpia
* Sin 404
* SVG sin image embeds

---

# Qué NO hacer

❌ No volver a ai2html como arquitectura principal
❌ No meter raster dentro del SVG
❌ No usar Leaflet como arquitectura principal editorial
❌ No crear templates distintos por territorio
❌ No hardcodear narrativa en HTML
❌ No corregir exports malos con hacks permanentes

---

# Estado actual

| Territorio               | Estado             |
| ------------------------ | ------------------ |
| 03 Waupasa Twi           | ✅ Piloto validado |
| 01 Rama y Kriol          | ⏳ Migración        |
| 02 Creole de Bluefields  | ⏳ Migración        |
| 04 Wangki Twi-Tasba Raya | ⏳ Migración        |
| 05–15                    | ⏳ Pendiente        |

---

# Próximo paso recomendado

1. Cerrar Waupasa Twi estable
2. Commit estable
3. Tag estable
4. Migrar 01
5. Migrar 02
6. Migrar 04
7. Rollout completo
