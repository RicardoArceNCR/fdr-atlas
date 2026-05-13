# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido por **Fundación del Río**. Documenta concesiones mineras otorgadas en territorios indígenas y afrodescendientes de Nicaragua.

## Estado del proyecto

| Componente | Estado |
|---|---|
| Design system (tokens.css) | ✅ Funcional |
| Colección `atlas` en Figma | ✅ Creada (9 tokens) |
| Tokens `mapa/*` en CSS | ✅ Llegan al build |
| Tokens `concesion/*` en CSS | ✅ funcionales en build/tokens.css |
| Mapas limpios disponibles | ✅ 3 de 15 (01, 02, 03) |
| Díptico HTML base | 🔲 Por construir |
| Página índice del atlas | 🔲 Por construir |

---

## Estructura del repositorio

```
web/
├── design-system/tokens/
│   ├── source/
│   │   ├── raw/               ← JSON exportados de Figma (no editar a mano)
│   │   │   ├── primitivos.json
│   │   │   ├── semanticos.json
│   │   │   ├── componentes.json
│   │   │   ├── numbers.json
│   │   │   └── atlas.json
│   │   ├── primitivos.json    ← procesados por figma-to-sd.py
│   │   ├── semanticos.json
│   │   ├── componentes.json
│   │   ├── numbers.json
│   │   └── atlas.json         ← pendiente de agregar al pipeline
│   ├── build/
│   │   └── tokens.css         ← output final, no editar
│   ├── figma-to-sd.py
│   ├── style-dictionary.config.js
│   └── package.json
├── mapas/
│   ├── 01-rama-kriol/
│   ├── 02-creole-bluefields/
│   └── 03-waupasa-twi/
└── atlas/
    └── index.html
```

---

## Setup

```bash
cd design-system/tokens
npm install
```

### Actualizar tokens desde Figma

1. Exportar variables desde Figma (plugin Variables → Export JSON)
2. Guardar en `source/raw/{coleccion}.json`
3. Correr el script de transformación:

```bash
python3 figma-to-sd.py
```

4. Buildear con Style Dictionary:

```bash
npm run build
```

El output es `build/tokens.css`. Importarlo en cualquier página del proyecto:

```html
<link rel="stylesheet" href="/design-system/tokens/build/tokens.css">
```

---


## Sistema de concesiones

El color y patrón identifican el **país de origen del capital**, no la empresa. Esto hace el sistema escalable: 12 concesiones en Tuahka con 4 empresas colombianas comparten un solo token.

| País | Token | Color | Patrón |
|---|---|---|---|
| China | `--concesion-pais-china` | `#b91c1c` | diagonal 45° |
| Canadá | `--concesion-pais-canada` | `#b45309` | crosshatch |
| Colombia | `--concesion-pais-colombia` | `#6d28d9` | dots |
| Nacional | `--concesion-pais-nacional` | `#0f5fa6` | líneas verticales |
| Reserva | `--concesion-tipo-reserva` | `#4b5563` | fill sólido 25% |

Opacidad estándar sobre el mapa: **0.35**.

---

## Mapas disponibles

Los mapas "limpios" son PNG sin leyenda ni panel inferior — solo cartografía con relieve, hidrografía y límites territoriales. La leyenda se construye en HTML encima de la imagen.

| # | Territorio | Concesiones | Layout |
|---|---|---|---|
| 01 | Rama y Kriol | 3 | A — complejo |
| 02 | Creole de Bluefields | 1 | B — focal |
| 03 | Waupasa Twi | 9 | A — complejo |
| 04 | Wangki Twi-Tasba Raya | 2 | C — fragmentado |
| 05 | Wangki Li Aubra Tasbaya | 2 | C — fragmentado |
| 07 | Tuahka | 12+ | A — ultra complejo |

---

## Publicación

Cada díptico es una página HTML autocontenida embebible:

```html
<!-- En cualquier sitio web tercero -->
<iframe
  src="https://fundaciondelrio.org/atlas/01-rama-kriol/"
  width="100%"
  height="600"
  frameborder="0">
</iframe>
```

Para PDF: `@media print` en el HTML del díptico. El navegador genera el PDF con el mismo layout.

---

## Decisiones de diseño

- **No un PDF primario**: el HTML es el master, el PDF es derivado vía `@media print`
- **No ai2html todavía**: los PNG limpios son el punto de partida. Cuando lleguen los archivos QGIS originales, el mapa se reemplaza por SVG sin tocar el layout
- **Leyenda en HTML, no en el mapa**: permite edición sin reexportar la cartografía
- **Un componente base, no 15 archivos**: `data-territorio` attributes sobreescriben el contenido por territorio

---

## Créditos y fuentes

Cartografía: La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI Standard/Shaded Relief. Proyección UTM Datum NAD 27 Zona 16 N. Abril 2026.
