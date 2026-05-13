# CLAUDE.md — Atlas de Minería en Territorios Indígenas

Contexto completo del proyecto para Claude. Leer antes de cualquier tarea.

---

## Qué es este proyecto

Un atlas web interactivo que documenta concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido por **Fundación del Río (FDR)**. El producto final es un conjunto de 15 dípticos web (mapa izquierda, información editorial derecha) publicables en sitios de terceros vía `<iframe>` y descargables como PDF.

El atlas es un **producto editorial cartográfico**, no solo un conjunto de mapas. Cada díptico combina:
- Panel izquierdo: imagen cartográfica del territorio (PNG por ahora, SVG/ai2html cuando lleguen los archivos QGIS)
- Panel derecho: narrativa, datos de concesiones, leyenda interactiva, fuentes

---

## Estado actual del sistema (Mayo 2026)

### Design system — COMPLETO y funcional
- Pipeline: Figma Variables → `figma-to-sd.py` → Style Dictionary → `tokens.css`
- Colecciones en Figma: `numbers` (23), `primitivos` (154), `semanticos` (97), `componentes` (93), `atlas` (9)
- Build output: `design-system/tokens/build/tokens.css`
- Tipografía: Sora (display), Source Serif 4 (body), JetBrains Mono (mono)

### Tokens relevantes para el atlas (ya en tokens.css)

```css
/* Mapa — elementos cartográficos base (en semanticos, sí llegaron al CSS) */
--mapa-agua-rio: var(--color-brand-blue-300);     /* #64c2cc */
--mapa-agua-mar: var(--color-brand-blue-900);     /* #072f3d */
--mapa-tierra-exterior: var(--color-neutral-100); /* #eeeae3 */
--mapa-territorio-borde: var(--color-neutral-900);/* #1f2521 */
--mapa-label-poblado: var(--typography-size-2xs); /* 10px */
--mapa-label-ciudad: var(--typography-size-sm);   /* 14px */
--mapa-container-padding-y: 32;
--mapa-container-padding-x: 24;
```

### Tokens de atlas — PROBLEMA CONOCIDO
Los tokens de `concesion/*` están en Figma (colección `atlas`, 9 variables) y en `source/raw/atlas.json`, pero **NO llegaron al CSS final** porque `figma-to-sd.py` no incluye `atlas` en su lista `COLLECTIONS`.

Valores reales de los tokens (para usar como fallback hasta resolver el build):
```css
--concesion-pais-china:    #b91c1c;  /* diagonal 45° */
--concesion-pais-canada:   #b45309;  /* crosshatch 25° */
--concesion-pais-colombia: #6d28d9;  /* dots r=1.5px */
--concesion-pais-nacional: #0f5fa6;  /* vertical lines */
--concesion-tipo-reserva:  #4b5563;  /* solid fill 25% */

--concesion-patron-china:    45;  /* ángulo diagonal SVG */
--concesion-patron-colombia: 35;
--concesion-patron-canada:   25;
--concesion-patron-nacional: 10;
```

### Archivos de mapa disponibles
- `mapas/01-Territorio_Rama_y_Kriol_-_limpio.png` — Layout A (complejo, 3 concesiones)
- `mapas/02_Territorio_Creole_de_Bluefields_-_limpio.png` — Layout B (focal, 1 concesión)
- `mapas/03_Waupasa_Twi_-_limpio.png` — Layout A (complejo, 9 concesiones)
- Mapas 04–15: pendientes en versión limpia (sin panel inferior)

Los mapas "limpios" son PNG sin leyenda ni panel inferior — solo la cartografía. La leyenda se reconstruye en HTML.

---

## Arquitectura del producto

### Estructura de archivos objetivo
```
web/
├── design-system/tokens/
│   ├── source/raw/
│   │   ├── primitivos.json
│   │   ├── semanticos.json
│   │   ├── componentes.json
│   │   ├── numbers.json
│   │   └── atlas.json          ← nueva colección, pendiente de registrar en figma-to-sd.py
│   ├── build/
│   │   └── tokens.css
│   ├── figma-to-sd.py
│   └── style-dictionary.config.js
├── mapas/
│   ├── rama-kriol/
│   │   ├── mapa-limpio.png
│   │   └── diptico.html
│   ├── creole-bluefields/
│   └── ...
├── atlas/
│   ├── index.html              ← índice de los 15 territorios
│   └── diptico-base.html       ← componente base reutilizable
└── IMG/
```

### Tres layouts de díptico
- **Layout A — Complejo**: mapa grande, leyenda extensa, múltiples concesiones. Ejemplo: Rama y Kriol, Waupasa Twi, Tuahka
- **Layout B — Focal**: una concesión principal, zoom editorial. Ejemplo: Creole de Bluefields
- **Layout C — Fragmentado**: múltiples inset maps, zooms relacionados. Ejemplo: Wangki Twi-Tasba Raya, Wangki Li

### Proporciones del díptico
- Desktop: 55% mapa / 45% info (`grid-template-columns: 55fr 45fr`)
- Tablet (≤768px): stack vertical, mapa arriba
- Mobile: título → resumen → mapa → concesiones → leyenda → fuente

---

## Sistema de concesiones

### Lógica de identificación
El color y patrón identifican el **país de origen del capital**, no la empresa individual. Esto hace el sistema escalable a 15 mapas con decenas de empresas.

| País     | Color     | Patrón SVG        | CSS var                      |
|----------|-----------|-------------------|------------------------------|
| China    | #b91c1c   | diagonal 45°      | `--concesion-pais-china`     |
| Canadá   | #b45309   | crosshatch 25°    | `--concesion-pais-canada`    |
| Colombia | #6d28d9   | dots r=1.5px      | `--concesion-pais-colombia`  |
| Nacional | #0f5fa6   | vertical 10°      | `--concesion-pais-nacional`  |
| Reserva  | #4b5563   | solid fill 25%    | `--concesion-tipo-reserva`   |

Opacidad estándar de concesiones sobre el mapa: **0.35** — nunca tapar el relieve.

### Patrones SVG (definición reutilizable)
```svg
<!-- China: diagonal -->
<pattern id="pat-china" width="8" height="8" patternUnits="userSpaceOnUse">
  <line x1="0" y1="8" x2="8" y2="0" stroke="#b91c1c" stroke-width="1.5"/>
</pattern>

<!-- Canadá: crosshatch -->
<pattern id="pat-canada" width="8" height="8" patternUnits="userSpaceOnUse">
  <line x1="0" y1="8" x2="8" y2="0" stroke="#b45309" stroke-width="1.2"/>
  <line x1="0" y1="0" x2="8" y2="8" stroke="#b45309" stroke-width="1.2"/>
</pattern>

<!-- Colombia: dots -->
<pattern id="pat-colombia" width="8" height="8" patternUnits="userSpaceOnUse">
  <circle cx="4" cy="4" r="1.5" fill="#6d28d9"/>
</pattern>

<!-- Nacional: vertical -->
<pattern id="pat-nacional" width="8" height="8" patternUnits="userSpaceOnUse">
  <line x1="4" y1="0" x2="4" y2="8" stroke="#0f5fa6" stroke-width="1.2"/>
</pattern>
```

---

## Territorios del atlas (15 total)

| # | Territorio | Layout | Concesiones | Estado mapa limpio |
|---|-----------|--------|-------------|-------------------|
| 01 | Rama y Kriol | A | 3 (El Castillo, La Guinea, Victoria) | ✓ PNG listo |
| 02 | Creole de Bluefields | B | 1 (Victoria) | ✓ PNG listo |
| 03 | Waupasa Twi | A | 9 (Caribe, Columbus I, El Encanto I/II, Yulu Awaskira, Puerto Cabezas, Vanessa, Walpa Tara, Reserva) | ✓ PNG listo |
| 04 | Wangki Twi-Tasba Raya | C | 2 (El Encanto II, Waspan) | pendiente |
| 05 | Wangki Li Aubra Tasbaya | C | 2 (Waspan, Matusalén) | pendiente |
| 07 | Tuahka | A+ | 12+ (Rosita D, San Leonardo, El Salto, Begonia, HEMCO x4, Marsella, Nueva América, Rosita H-2) | pendiente |
| 06, 08–15 | Pendientes | — | — | pendientes |

Nota: la concesión **Waspan** aparece en territorios 04 y 05 — decisión editorial pendiente sobre cómo manejarlo.

---

## Lo que NO debe hacerse

- No crear tokens fuera de Figma para el sistema base (primitivos, semanticos, componentes)
- No hardcodear colores de concesión en HTML — siempre usar CSS vars
- No meter layout editorial dentro de Illustrator/QGIS — solo cartografía
- No crear 15 HTML diferentes desde cero — usar el componente base + data attributes
- No usar el mismo panel inferior rígido para todos los mapas — la leyenda escala según número de concesiones
- No usar `localStorage` en los artifacts del atlas

---

## Próximo paso inmediato

Registrar `atlas` en `COLLECTIONS` dentro de `figma-to-sd.py` y correr el build para que `--concesion-*` lleguen a `tokens.css`. Luego construir el primer díptico HTML con Rama y Kriol.
