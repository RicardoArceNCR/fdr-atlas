# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido por **Fundación del Río**. Documenta concesiones mineras otorgadas en territorios indígenas y afrodescendientes de Nicaragua.

El proyecto no es solo una galería de mapas: es un sistema editorial cartográfico compuesto por **dípticos web embebibles**, con mapa a la izquierda e información narrativa a la derecha.

---

## Estado del proyecto

| Componente | Estado |
|---|---|
| Design system (`tokens.css`) | ✅ Funcional |
| Colección `atlas` en Figma | ✅ Creada y activa |
| Tokens `mapa/*` en CSS | ✅ Llegan al build |
| Tokens `concesion/*` en CSS | ✅ Funcionales en `build/tokens.css` |
| Pipeline Figma → Style Dictionary | ✅ Funcional |
| Díptico HTML base | ✅ Iniciado |
| Renderer JS por territorio | ✅ Iniciado |
| Primeros 4 territorios HTML | ✅ Iniciados |
| Sistema híbrido raster + SVG | ✅ En desarrollo con Waupasa Twi |
| Página índice del atlas | ⏳ Pendiente |
| PDF responsive/print | ⏳ Pendiente |

---

## Enfoque técnico actual

El atlas usa una arquitectura híbrida:

```txt
Mapa base raster
+
Overlays SVG de concesiones/áreas
+
Patrones definidos con tokens
+
Panel derecho en HTML/CSS/JS
```

### Qué vive en raster

El mapa base puede mantenerse como imagen (`.png`, `.jpg` o preferiblemente `.webp`) e incluir:

- relieve
- ríos
- grilla
- límites territoriales base
- nombres de poblados si conviene mantenerlos en la cartografía
- escala y norte si se decide tratarlos como parte del mapa editorial

### Qué vive en SVG

Los elementos editoriales que deben poder editarse, estilizarse o conectarse con datos viven como SVG:

- concesiones mineras
- reserva minera
- highlights
- símbolos editoriales específicos
- overlays narrativos

### Qué vive en HTML

El panel derecho y la estructura editorial viven en HTML/CSS/JS:

- título
- región
- pueblos
- estadísticas
- descripción editorial
- lista de concesiones
- badges por país
- fuentes
- leyenda complementaria

---

## Decisión sobre ai2html

`ai2html` **no es el sistema central del atlas**.

El sistema principal será:

```txt
Illustrator / QGIS → mapa base raster + overlays SVG
Código → layout, datos, tokens, responsive y panel editorial
```

`ai2html` puede mantenerse solo como herramienta experimental o puntual para:

- prototipos rápidos desde Illustrator
- pruebas de labels posicionados
- exportaciones editoriales cerradas que no necesiten datos dinámicos
- casos excepcionales donde convenga exportar una composición completa como HTML estático

No debe usarse para generar el producto completo ni reemplazar el renderer propio del atlas.

---

## Estructura recomendada del repositorio

```txt
web/
├── atlas/
│   ├── index.html
│   ├── 01-rama-kriol/
│   │   └── index.html
│   ├── 02-creole-bluefields/
│   │   └── index.html
│   ├── 03-waupasa-twi/
│   │   └── index.html
│   └── 04-wangki-twi-tasba-raya/
│       └── index.html
│
├── css/
│   └── diptico.css
│
├── js/
│   ├── data-territorios.js
│   └── render-diptico.js
│
├── templates/
│   └── diptico-base.html
│
├── img/
│   ├── 03_Waupasa Twi - limpio.png
│   └── 03_Waupasa Twi.jpeg
│
├── mapas-svg/
│   └── 03-waupasa-twi/
│       ├── desktop-concesiones.svg
│       ├── tablet-concesiones.svg
│       └── mobile-concesiones.svg
│
├── mapas-raster/
│   └── 03-waupasa-twi/
│       ├── desktop-base.webp
│       ├── tablet-base.webp
│       └── mobile-base.webp
│
└── design-system/
    └── tokens/
        ├── source/raw/
        │   ├── primitivos.json
        │   ├── semanticos.json
        │   ├── componentes.json
        │   ├── numbers.json
        │   └── atlas.json
        ├── source/
        ├── build/
        │   ├── tokens.css
        │   └── tokens.js
        ├── figma-to-sd.py
        ├── style-dictionary.config.js
        └── package.json
```

---

## Setup

```bash
cd design-system/tokens
npm install
```

### Actualizar tokens desde Figma

1. Exportar variables desde Figma.
2. Guardar los JSON en `design-system/tokens/source/raw/`.
3. Transformar los JSON:

```bash
python3 figma-to-sd.py
```

4. Construir tokens:

```bash
npm run build
```

5. Verificar salida:

```bash
grep -R "concesion-pais" build/tokens.css
grep -R "mapa-" build/tokens.css
```

El output principal es:

```txt
design-system/tokens/build/tokens.css
design-system/tokens/build/tokens.js
```

---

## Sistema de concesiones

El color y patrón identifican el **país de origen del capital**, no la empresa individual. Esto hace el sistema escalable a 15 mapas con decenas de concesiones.

| País | Token | Color | Patrón sugerido |
|---|---|---|---|
| China | `--concesion-pais-china` | `#b91c1c` | diagonal 45° |
| Canadá | `--concesion-pais-canada` | `#b45309` | crosshatch |
| Colombia | `--concesion-pais-colombia` | `#6d28d9` | dots |
| Nacional | `--concesion-pais-nacional` | `#0f5fa6` | líneas verticales |
| Reserva | `--concesion-tipo-reserva` | `#4b5563` | fill sólido / semitransparente |

Opacidad recomendada sobre mapa: **0.35** para no tapar relieve, ríos ni etiquetas.

---

## Flujo cartográfico recomendado

### 1. Preparar mapa base raster

Por ahora se puede usar el mapa con relieve y ríos como imagen base. No es necesario vectorizar todo.

Para exportar una base desde Illustrator:

1. Abrir el archivo `.ai` del breakpoint correspondiente.
2. Dejar visibles las capas del mapa base:
   - relieve
   - ríos
   - territorio base
   - grilla
   - labels base si aplica
   - escala/norte si se decide incluirlos en la imagen
3. Ocultar las capas de concesiones, reserva y overlays narrativos.
4. Exportar como imagen, idealmente `.webp` o `.png`.

Ejemplo de salida:

```txt
mapas-raster/03-waupasa-twi/desktop-base.webp
```

### 2. Preparar SVG de concesiones

1. En Illustrator, dejar visibles solo las capas de concesiones, reserva y overlays editoriales.
2. Ocultar el raster base, relieve, ríos, grilla y elementos que ya van en la imagen.
3. Exportar como SVG.
4. Limpiar nombres de capas/IDs.

Ejemplo:

```txt
mapas-svg/03-waupasa-twi/desktop-concesiones.svg
```

### 3. Integrar en HTML

El HTML debe componer:

```txt
<picture> para mapa base raster responsive
+
contenedor SVG encima
+
panel editorial derecho
```

---

## Responsive editorial

Los breakpoints **no deben tratarse como simple resize**.

Cada viewport puede tener una composición propia:

| Versión | Uso |
|---|---|
| Desktop | Mapa completo, mayor densidad de labels y concesiones |
| Tablet | Composición intermedia, menos ruido, labels ajustados |
| Mobile | Versión focal, menos labels, zoom narrativo y mejor legibilidad |

Archivos sugeridos por territorio:

```txt
03-waupasa-twi/
├── desktop-base.webp
├── tablet-base.webp
├── mobile-base.webp
├── desktop-concesiones.svg
├── tablet-concesiones.svg
└── mobile-concesiones.svg
```

---

## Mapas disponibles

| # | Territorio | Concesiones | Layout | Estado |
|---|---|---:|---|---|
| 01 | Rama y Kriol | 3 | A — complejo | Imagen base disponible |
| 02 | Creole de Bluefields | 1 | B — focal | Imagen base disponible |
| 03 | Waupasa Twi | 9 | A — complejo | Imagen base + overlay SVG en desarrollo |
| 04 | Wangki Twi-Tasba Raya | 2 | C — fragmentado | Imagen fuente disponible |
| 05 | Wangki Li Aubra Tasbaya | 2 | C — fragmentado | Pendiente |
| 07 | Tuahka | 12+ | A — ultra complejo | Pendiente |

---

## Publicación

Cada díptico es una página HTML autocontenida embebible:

```html
<iframe
  src="https://fundaciondelrio.org/atlas/03-waupasa-twi/"
  width="100%"
  height="700"
  frameborder="0">
</iframe>
```

Para PDF, el HTML debe usar `@media print`. El PDF será una derivación del HTML, no el producto primario.

---

## Decisiones de diseño

- El HTML es el master editorial.
- El mapa base raster es válido y puede mantenerse como parte del sistema.
- Las concesiones deben vivir como SVG cuando se necesite control visual, hover, conexión con cards o estilos por token.
- La leyenda principal debe vivir en HTML/CSS cuando sea posible.
- Los colores deben venir de tokens, no de valores hardcodeados.
- ai2html queda como herramienta secundaria, no como arquitectura principal.
- Se permite una composición distinta por breakpoint.

---

## Próximo hito

Validar el modelo híbrido con **03 Waupasa Twi**:

```txt
03_Waupasa Twi - limpio.png
+
desktop-concesiones.svg
+
panel derecho HTML
+
tokens de concesión
```

Cuando Waupasa funcione, escalar el patrón a Rama y Kriol, Creole de Bluefields y Wangki Twi-Tasba Raya.

---

## Créditos y fuentes

Cartografía: La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI Standard/Shaded Relief. Proyección UTM Datum NAD 27 Zona 16 N. Abril 2026.
