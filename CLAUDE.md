# CLAUDE.md — Atlas de Minería en Territorios Indígenas

Contexto completo del proyecto para Claude. Leer antes de cualquier tarea.

---

## Qué es este proyecto

Un atlas web interactivo que documenta concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido por **Fundación del Río (FDR)**. El producto final es un conjunto de 15 dípticos web publicables en sitios de terceros vía `<iframe>` y descargables como PDF.

El atlas es un **producto editorial cartográfico**, no una app de dashboard ni una galería de imágenes. Cada díptico combina:

- Panel izquierdo: sistema cartográfico híbrido.
- Panel derecho: narrativa, datos de concesiones, estadísticas, leyenda complementaria y fuentes.

---

## Enfoque actual confirmado

La arquitectura cartográfica actual es:

```txt
Mapa base raster
+
Overlays SVG de concesiones/áreas
+
Patrones definidos con tokens
+
Panel derecho en HTML/CSS/JS
```

Este enfoque reemplaza la idea anterior de depender de `ai2html` como sistema principal.

---

## Qué debe vivir en cada capa

### Raster base

El raster base puede ser `.png`, `.jpg` o preferiblemente `.webp`. Debe contener la cartografía base:

- relieve
- ríos
- límites territoriales base
- grilla
- labels base cuando convenga
- norte y escala si se decide integrarlos como parte de la composición cartográfica

No es necesario vectorizar relieve, ríos o grilla para esta fase.

### SVG overlay

El SVG debe contener elementos que necesitan edición, control visual o conexión con datos:

- concesiones mineras
- reserva minera
- highlights
- símbolos narrativos
- overlays editoriales

Idealmente cada elemento SVG debe tener `id`, `class` y/o `data-*`.

Ejemplo:

```svg
<path
  id="concesion-caribe"
  class="concesion-svg pais-colombia"
  data-concesion="Caribe"
  data-pais="colombia"
  d="..." />
```

### HTML/CSS/JS

El panel derecho y la estructura editorial deben vivir en código:

- título
- región
- pueblos
- estadísticas
- descripción editorial
- lista de concesiones
- badges por país
- leyenda complementaria
- fuentes
- interacciones futuras

---

## Estado actual del sistema (Mayo 2026)

### Design system — funcional

- Pipeline: Figma Variables → `figma-to-sd.py` → Style Dictionary → `tokens.css` / `tokens.js`.
- Colecciones en Figma: `numbers`, `primitivos`, `semanticos`, `componentes`, `atlas`.
- La colección `atlas` ya está integrada al pipeline.
- Output principal: `design-system/tokens/build/tokens.css`.
- Tipografía: Sora (display), Source Serif 4 (body), JetBrains Mono (mono).

### Tokens relevantes para el atlas

```css
--mapa-agua-rio: var(--color-brand-blue-300);
--mapa-agua-mar: var(--color-brand-blue-900);
--mapa-tierra-exterior: var(--color-neutral-100);
--mapa-territorio-borde: var(--color-neutral-900);
--mapa-label-poblado: var(--typography-size-2xs);
--mapa-label-ciudad: var(--typography-size-sm);
--mapa-container-padding-y: 32;
--mapa-container-padding-x: 24;
```

### Tokens de concesión

```css
--concesion-pais-china:    #b91c1c;
--concesion-pais-canada:   #b45309;
--concesion-pais-colombia: #6d28d9;
--concesion-pais-nacional: #0f5fa6;
--concesion-tipo-reserva:  #4b5563;

--concesion-patron-china:    45;
--concesion-patron-colombia: 35;
--concesion-patron-canada:   25;
--concesion-patron-nacional: 10;
```

El color y patrón identifican el **país de origen del capital**, no la empresa individual.

---

## Estado de archivos

Estructura actual esperada:

```txt
web/
├── atlas/
│   ├── index.html
│   ├── 01-rama-kriol/index.html
│   ├── 02-creole-bluefields/index.html
│   ├── 03-waupasa-twi/index.html
│   └── 04-wangki-twi-tasba-raya/index.html
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
│   ├── 01-Territorio Rama y Kriol - limpio.png
│   ├── 02_Territorio Creole de Bluefields - limpio.png
│   ├── 03_Waupasa Twi - limpio.png
│   └── 03_Waupasa Twi.jpeg
│
├── mapas-svg/
│   └── 03-waupasa-twi/
│       └── concesiones.svg
│
└── design-system/tokens/
    ├── source/raw/
    ├── source/
    ├── build/tokens.css
    ├── build/tokens.js
    ├── figma-to-sd.py
    └── style-dictionary.config.js
```

---

## Cómo exportar desde Illustrator

### Exportar mapa base raster

Para exportar una base como `desktop-base.webp` o `.png`:

1. Abrir el archivo `.ai` del breakpoint correspondiente.
2. Dejar visibles las capas base:
   - relieve
   - ríos
   - territorio base
   - grilla
   - labels base
   - escala/norte si aplica
3. Ocultar las capas de concesiones, reservas y overlays editoriales.
4. Exportar la mesa de trabajo como imagen.
5. Guardar en una ruta tipo:

```txt
mapas-raster/03-waupasa-twi/desktop-base.webp
```

Nota: “ocultar” significa apagar el ícono del ojo en el panel de Layers de Illustrator para que esa capa no salga en la exportación.

### Exportar SVG de concesiones

1. En el mismo `.ai`, ocultar el raster base y las capas que ya van en la imagen.
2. Dejar visibles solo concesiones, reserva minera y overlays editoriales.
3. Exportar como SVG.
4. Guardar en:

```txt
mapas-svg/03-waupasa-twi/desktop-concesiones.svg
```

---

## Responsive editorial

No tratar responsive como simple reducción de tamaño.

Cada breakpoint puede tener una composición distinta:

| Versión | Enfoque |
|---|---|
| Desktop | Mapa completo, mayor densidad, panel derecho al lado |
| Tablet | Composición intermedia, menos ruido, labels ajustados |
| Mobile | Zoom narrativo, menos labels, lectura vertical |

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

## Sobre ai2html

`ai2html` no debe usarse como sistema central del atlas.

Puede conservarse como herramienta secundaria para:

- prototipos rápidos desde Illustrator
- pruebas de posicionamiento de labels
- exportaciones editoriales cerradas
- casos donde se necesite un HTML estático puntual

No debe reemplazar:

- `diptico-base.html`
- `render-diptico.js`
- `data-territorios.js`
- `tokens.css`
- el modelo raster + SVG overlay

Si aparece un archivo `ai2html-output`, tratarlo como experimento o referencia, no como fuente de verdad.

---

## Tres layouts de díptico

- **Layout A — Complejo**: mapa grande, múltiples concesiones. Ejemplos: Rama y Kriol, Waupasa Twi, Tuahka.
- **Layout B — Focal**: una concesión principal, zoom editorial. Ejemplo: Creole de Bluefields.
- **Layout C — Fragmentado**: múltiples inset maps o zooms. Ejemplos: Wangki Twi-Tasba Raya, Wangki Li.

---

## Territorios del atlas

| # | Territorio | Layout | Concesiones | Estado |
|---|---|---|---:|---|
| 01 | Rama y Kriol | A | 3 | Imagen base disponible |
| 02 | Creole de Bluefields | B | 1 | Imagen base disponible |
| 03 | Waupasa Twi | A | 9 | Imagen base + overlay SVG en desarrollo |
| 04 | Wangki Twi-Tasba Raya | C | 2 | Imagen fuente disponible |
| 05 | Wangki Li Aubra Tasbaya | C | 2 | Pendiente |
| 07 | Tuahka | A+ | 12+ | Pendiente |
| 06, 08–15 | Pendientes | — | — | Pendiente |

Nota: la concesión **Waspan** aparece en territorios 04 y 05. Decisión editorial pendiente sobre cómo manejarla.

---

## Lo que NO debe hacerse

- No depender de ai2html como arquitectura principal.
- No reconstruir relieve, ríos y grilla como SVG si ya funcionan bien como raster.
- No crear 15 HTML diferentes desde cero.
- No hardcodear colores de concesiones en HTML.
- No crear tokens base fuera de Figma.
- No mezclar layout editorial completo dentro de Illustrator.
- No convertir el atlas en una app tipo dashboard; debe mantener carácter editorial.
- No usar `localStorage`.

---

## Próximo paso inmediato

Validar el modelo híbrido con **03 Waupasa Twi**:

```txt
03_Waupasa Twi - limpio.png
+
mapas-svg/03-waupasa-twi/concesiones.svg
+
diptico-base.html
+
render-diptico.js
+
tokens.css
```

Objetivo: que el SVG de concesiones calce encima del raster base y que la lista del panel derecho use la misma semántica de concesiones.
