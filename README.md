# Atlas FDR — Dípticos Cartográficos

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río (FDR).

El proyecto convierte mapas técnicos de concesiones en un **producto editorial cartográfico interactivo**, embebible, responsive y exportable a PDF.

---

## Estado actual — Junio 2026

**Rama activa:** `feat/waupasa-twi-editorial`

**Mapa piloto:** `03-waupasa-twi` (Waupasa Twi)

### Waupasa Twi — mapa maestro del sistema

- ✅ Raster base por breakpoint (desktop / tablet / mobile)
- ✅ SVG overlay inline por breakpoint
- ✅ Panel editorial renderizado desde `data-territorios.js`
- ✅ Hover concesión ↔ card (bidireccional)
- ✅ Hover bandera de país → activa grupo de concesiones
- ✅ Animación stroke punteado por concesión al hover
- ✅ Drop-shadow coloreado por país al hover
- ✅ Tooltip de poblados
- ✅ Responsive desktop/tablet/mobile
- ✅ Base print/PDF
- ✅ Bordes grises en reposo (`#4c4c4c` 33%) — vía `diptico.css`, sin tocar el SVG
- ✅ `border-*` nombrados explícitamente en Illustrator — IDs estables entre exports
- ⬜ Datos placeholder pendientes de verificación con FDR
- ⬜ Hover target de `columbus` pendiente (fill:none en Illustrator — ver CLAUDE.md)

---

## Arquitectura

```txt
QGIS / fuente cartográfica
  → raster base webp por breakpoint
  → Illustrator
  → SVG overlay limpio por breakpoint  ← NO modificar el SVG a mano
  → navegador: raster + SVG inline
  → panel editorial HTML/CSS/JS
  → interacción SVG ↔ cards ↔ países
  → print CSS para PDF
```

Cada territorio se define con un solo `index.html`:

```html
<body data-territorio="03-waupasa-twi">
  <script type="module" src="../../js/render-diptico.js"></script>
</body>
```

El renderer carga el template, los assets y la data. No hay HTML distinto por territorio.

---

## Producto final — 16 dípticos

| # | Territorio | Cluster |
|---|---|---|
| 01 | Rama y Kriol | C — dual |
| 02 | Creole de Bluefields | B — minimalista |
| 03 | Waupasa Twi | A — presión extrema ← **maestro activo** |
| 04 | Wangki Twi-Tasba Raya | C — dual |
| 05 | Wangki Li Aubra Tasbaya | C — dual |
| 06 | Twi Ahbra 10 comunidades | B — minimalista |
| 07 | Tuahka | A — presión extrema |
| 08 | Tasba Pri Matriz Indígena | A — presión extrema |
| 09 | Prinzu Awala | A — presión extrema |
| 10 | Mayangna Sauni Bas | C — dual |
| 11 | Mayangna Sauni As | A — presión extrema |
| 12 | Masauni Arumatun | D — fragmentación extrema |
| 13 | Amasau | D — fragmentación extrema |
| 14 | Chorotega II | B — minimalista |
| 15 | Matagalpa | B — minimalista |
| 16 | Prinzu Auhya Uh | B — minimalista |

---

## Orden de mapas maestros

No construir los 16 mapas al mismo tiempo. Primero consolidar los cuatro maestros:

| Rol | Mapa | Estado |
|---|---|---|
| Multipaís denso | Waupasa Twi | ✅ completo |
| Minimalista | Creole de Bluefields | Siguiente |
| Dual | Wangki Li Aubra Tasbaya | Pendiente |
| Complejo/fragmentado | Tuahka | Pendiente |

---

## Sistema visual — país como identidad

```txt
PAÍS = identidad visual principal
CONCESIÓN = variación secundaria
```

| País | Paleta | Patrones |
|---|---|---|
| China | rojos, naranjas | diagonales densas, círculos, cross-hatch |
| Canadá | verdes | grid técnico, doble línea, hachurado fino |
| Colombia | verdes petróleo, turquesas | retícula modular, escalonado |
| Nicaragua | azules institucionales | líneas verticales, trama ligera |
| Reserva | gris, café | sólido, hachurado grueso |

---

## Estructura SVG por concesión

Cada concesión debe seguir esta estructura en Illustrator:

```
<g id="nombre-concesion">               ← ID que usa el JS
  <g id="area-main">                    ← patrón reposo con clipPath
  </g>
  <g id="area-main-hover">              ← patrón hover con clipPath
  </g>
  [shape] id="border-nombre-concesion"  ← contorno, nombre explícito ⬅ CRÍTICO
  [shape] id="area-hover-target">       ← hit area opacidad:0
</g>
```

**Regla crítica — hover target:** el shape debe tener `fill` de cualquier color
(nunca `fill:none`) con opacidad `0`. `fill:none` destruye el hit area en CSS.
El modelo correcto es `walpa-tara`. Ver `vanessa` como contraejemplo resuelto.

**Regla crítica — border IDs:** nombrar siempre como `border-nombre-concesion`
(ej. `border-vanessa`, `border-walpa-tara`). Illustrator puede numerar
automáticamente (`border`, `border1`, `border2`...) si no se fuerza el nombre
en el panel de capas. IDs automáticos se rompen entre exports.

---

## Bordes grises en reposo — decisión de arquitectura

Los bordes de las concesiones se ven en `#4c4c4c` al 33% en reposo y
recuperan su color al hacer hover. **Este CSS vive en `diptico.css`, no en
el SVG.** Razón: Illustrator regenera el `<style>` del SVG en cada export,
borrando cualquier edición manual. `diptico.css` persiste siempre.

El SVG exportado desde Illustrator se usa tal cual, sin post-procesado.
No existe ni debe existir un layer `borde-base` en Illustrator — los
`border-*` que ya están en cada grupo de concesión son suficientes.

Para un nuevo territorio: pegar el bloque de bordes de `diptico.css` y
agregar las reglas de color de hover con los nuevos IDs. Ver sección
correspondiente en `CLAUDE.md`.

---

## Archivos clave

```txt
atlas/03-waupasa-twi/index.html    ← único HTML por territorio
templates/diptico-base.html        ← template compartido
css/diptico.css                    ← estilos del sistema (incluye bordes)
js/render-diptico.js               ← renderer + interactividad
js/data-territorios.js             ← datos de todos los territorios
mapas-raster/03-waupasa-twi/       ← webp por breakpoint
mapas-svg/03-waupasa-twi/          ← SVG por breakpoint
design-system/tokens/build/tokens.css
ATLAS_PATTERN_SYSTEM.md
CLAUDE.md                          ← decisiones técnicas y diagnóstico
```

---

## Comandos útiles

```bash
# Levantar servidor local
python3 -m http.server 8000
# Abrir: http://localhost:8000/atlas/03-waupasa-twi/

# Auditar todos los IDs del SVG
grep -o 'id="[^"]*"' mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg | sort | uniq

# Auditar border-* (verificar que tengan nombres explícitos, no border1/border2)
grep -o 'id="border[^"]*"' mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg | sort

# Verificar que el SVG no tenga imágenes embebidas
grep -i "image\|xlink:href\|href" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg

# Verificar que no exista borde-base (no debe existir)
grep "borde-base" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
```

---

## Checkpoint Git

```bash
git add \
  CLAUDE.md \
  README.md \
  ATLAS_PATTERN_SYSTEM.md \
  css/diptico.css \
  js/render-diptico.js \
  js/data-territorios.js \
  templates/diptico-base.html \
  atlas/03-waupasa-twi/index.html \
  mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg \
  mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg

git commit -m "feat(waupasa): borders via CSS — no manual SVG edits required"

git tag waupasa-borders-css-v2

git push origin feat/waupasa-twi-editorial
git push origin waupasa-borders-css-v2
```
