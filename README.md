# Atlas FDR — Dípticos Cartográficos

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río (FDR).

---

## Estado actual — Junio 2026

**Rama activa:** `feat/waupasa-twi-editorial`

### Territorios con mapa web

| # | Territorio | Raster | SVG | Hover | Concesiones | Layout |
|---|---|---|---|---|---|---|
| 01 | Rama y Kriol | ✅ | ✅ | ✅ 3 | ⬜ empresa/ha pendientes | A |
| 02 | Negro Creole de Bluefields | ✅ | ✅ | ✅ 1 | ⬜ empresa/ha pendientes | B |
| 03 | Twi Waupasa | ✅ | ✅ (3 breakpoints) | ✅ 9 | ⬜ empresa/ha pendientes | A |
| 04 | Wangki Twi-Tasba Raya | ✅ | ✅ | ✅ 2 | ⬜ empresa/ha pendientes | C |
| 05 | Wangki Li Aubra Tasbaya | ✅ | ✅ | ✅ 2 | ⬜ empresa/ha pendientes | C |
| 06 | Twi Yahbra (Diez comunidades) | ✅ | ✅ | ⬜ hover pendiente Illustrator | ✅ datos completos | B |
| 07 | Tuahka Takaln Balna | ✅ | ✅ | ✅ 11 | ⬜ empresa/ha pendientes | E |
| 08 | Tasba Pri Matriz Indígena | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | A |
| 09 | Prinzu Awala | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | A |
| 10 | Mayangna Sauni Bas "Sikilta" | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | C |
| 11 | Mayangna Sauni As | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | A |
| 12 | Mayangna Sauni Arungka "Matunbak" | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | D |
| 13 | Mayangna Awas Tingni (AMASAU) | ✅ | ✅ | ⬜ pendiente auditar | ⬜ pendiente | D |

### Territorios sin assets en disco

14–18 — carpetas `atlas/NN/` y `data-territorios.js` completos, mapas no renderizan hasta que existan raster + SVG.

| # | Territorio | id en proyecto |
|---|---|---|
| 14 | Chorotega - Norte | `14-chorotega-norte` |
| 15 | Matagalpa | `15-matagalpa` |
| 16 | Prinzu Auhya Un | `16-prinzu-auhya-un` |
| 17 | Muy Muy | `17-muy-muy` |
| 18 | Sébaco | `18-sebaco` |

> ⚠️ El raster del 05 (Wangki Li) en disco se llama `desktop-05-wangki-li.webp` — el `data-territorios.js` apunta a `desktop-05-Wangki-Li.webp`. Verificar capitalización o renombrar.

### Bugs confirmados y documentados (Jun 2026)

- ✅ `opacity` vs `fill-opacity` en `area-hover-target` → CLAUDE.md
- ✅ `area-hover-target` con `stroke` propio tapa animación → fix global en `diptico.css`
- ✅ `area-hover-target` dentro de `area-main-hover` → CLAUDE.md
- ✅ **Orden de capas en Illustrator** — `area-hover-target` debe estar encima de `area-main-hover` → CLAUDE.md
- ✅ `layout: 'pendiente'` colapsa mapa a 38×40px → usar A/B/C/D/E
- ✅ Falta `tema`/`banner`/`logo` → panel derecho sin color/imagen
- ✅ viewBox incorrecto por Export As → usar Save As
- ✅ webp renombrado sin re-exportar → verificar md5sum
- ✅ Carpeta `atlas/NN/` inexistente → 404
- ✅ Tour no arranca con 1 sola concesión → corregido en `render-diptico.js:548`

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
<body data-territorio="07-tuahka">
  <script type="module" src="../../js/render-diptico.js"></script>
</body>
```

El servidor es Python estático (`python3 -m http.server 8000`) — sin la
carpeta `atlas/NN-territorio/index.html`, 404.

---

## Sistema de colores — dinámico desde Jun 2026

Los colores de animación de concesiones ya **no** están hardcodeados en
`diptico.css`. Se inyectan automáticamente desde `render-diptico.js` via
`inyectarCSSConcesiones()`, usando escalas de color por país (`ESCALAS_PAIS`)
y asignación por posición dentro del grupo del mismo país.

Para sobreescribir un color específico: `color_override: '#hex'` en la
concesión dentro de `data-territorios.js`. Los territorios 01, 02 y 03 ya
tienen `color_override` en todas sus concesiones para preservar los colores
originales.

**Para agregar una concesión nueva: solo agregar `svg_id` en `data-territorios.js`.
No tocar `diptico.css`.**

La card activa muestra un **borde cromático** con el tono exacto de la escala
del país — inyectado por el Bloque C de `inyectarCSSConcesiones()`. Sin fondo
sólido, solo el borde cambia de color.

---

## Layouts disponibles

| Layout | Columnas concesiones | Uso típico |
|---|---|---|
| A | 3 (grid base) | territorios con pocas concesiones |
| B | 3 (grid base) | minimalista — 1-3 concesiones |
| C | 3 (grid base) | dual — 2 concesiones con insets |
| D | 6 columnas | fragmentación media — 6-10 concesiones |
| E | 7 columnas | fragmentación extrema — 11-13 concesiones |

Todos los layouts se colapsan a 1 columna en mobile. El layout E fue añadido
en Jun 2026 para Tuahka (07) con 11 concesiones. Los layouts D y E comparten
el mismo sistema tipográfico de cards (fuente 10px nombre, 9px empresa).

---

## Producto final — 18 dípticos

| # | Territorio oficial | Cluster | id en proyecto |
|---|---|---|---|
| 01 | Rama y Kriol | C — dual | `01-rama-kriol` |
| 02 | Negro Creole de Bluefields | B — minimalista | `02-creole-bluefields` |
| 03 | Twi Waupasa | A — presión extrema ← **maestro activo** | `03-waupasa-twi` |
| 04 | Wangki Twi-Tasba Raya | C — dual | `04-wangki-twi-tasba-raya` |
| 05 | Wangki Li Aubra Tasbaya | C — dual | `05-wangki-li` |
| 06 | Twi Yahbra (Diez comunidades) | B — minimalista | `06-twi-ahbra-10-comunidades` |
| 07 | Tuahka Takaln Balna | E — fragmentación extrema | `07-tuahka` |
| 08 | Tasba Pri Matriz Indígena | A — presión extrema | `08-tasba-pri` |
| 09 | Prinzu Awala | A — presión extrema | `09-prinzu-awala` |
| 10 | Mayangna Sauni Bas "Sikilta" | C — dual | `10-mayangna-sauni-bas` |
| 11 | Mayangna Sauni As | A — presión extrema | `11-mayangna-sauni-as` |
| 12 | Mayangna Sauni Arungka "Matunbak" | D — fragmentación extrema | `12-mayangna-arungka-matungbak` |
| 13 | Mayangna Awas Tingni (AMASAU) | D — fragmentación extrema | `13-amasau` |
| 14 | Chorotega - Norte | B — minimalista | `14-chorotega-norte` |
| 15 | Matagalpa | B — minimalista | `15-matagalpa` |
| 16 | Prinzu Auhya Un | B — minimalista | `16-prinzu-auhya-un` |
| 17 | Muy Muy | B — minimalista | `17-muy-muy` |
| 18 | Sébaco | B — minimalista | `18-sebaco` |

---

## Orden de mapas maestros

| Rol | Mapa | Estado |
|---|---|---|
| Multipaís denso | Waupasa Twi (03) | ✅ completo |
| Minimalista | Twi Yahbra (06) | ⬜ hover pendiente en Illustrator |
| Dual | Wangki Li Aubra Tasbaya (05) | ✅ online |
| Complejo/fragmentado | Tuahka (07) | ✅ 11 concesiones online |

---

## Sistema visual — país como identidad

| País | Escala de colores (oscuro → claro) | Patrones |
|---|---|---|
| China | `#7a1a08` → `#fbb96a` | diagonales densas, cross-hatch |
| Canadá | `#0d3d0d` → `#a8dfa8` | grid técnico, hachurado fino |
| Colombia | `#2e0f6b` → `#ccb0f5` | retícula modular, escalonado |
| Nicaragua | `#0f2347` → `#a4b8f0` | líneas verticales, trama ligera |
| Reserva | `#1a1a1a` → `#c0c7ce` | sólido, hachurado grueso |

⚠️ Pendiente de resolver: si HEMCO (07, 11, 12) es `colombia` o `nacional`.
No cambiar hasta confirmar con FDR.

---

## Archivos clave

```txt
css/diptico.css                    ← layout, bordes base, layouts D y E, botón ojo
js/render-diptico.js               ← renderer + interactividad + ESCALAS_PAIS + Bloque C
js/data-territorios.js             ← datos + svg_id + color_override + concesion_minera
templates/diptico-base.html        ← template compartido
atlas/NN-territorio/index.html     ← un HTML por territorio
mapas-raster/NN-territorio/        ← webp por breakpoint
mapas-svg/NN-territorio/           ← SVG por breakpoint
CLAUDE.md                          ← decisiones técnicas y diagnóstico
```

---

## Comandos útiles

```bash
# Levantar servidor
python3 -m http.server 8000

# Crear carpeta de territorio nuevo
mkdir -p atlas/NN-territorio
cp atlas/06-twi-ahbra-10-comunidades/index.html atlas/NN-territorio/index.html
# Editar data-territorio="NN-territorio" y <title>

# Auditar SVG
grep -o 'id="[^"]*"' mapas-svg/NN-territorio/desktop-NN.svg | sort | uniq
grep -o 'id="border[^"]*"' mapas-svg/NN-territorio/desktop-NN.svg | sort
grep -o '<svg[^>]*>' mapas-svg/NN-territorio/desktop-NN.svg
grep -n "area-hover-target" mapas-svg/NN-territorio/desktop-NN.svg

# Verificar raster distinto al anterior
md5sum mapas-raster/NN-territorio/desktop-NN.webp mapas-raster/NN-anterior/desktop.webp

# Verificar data-territorio en todos los index.html
grep "data-territorio" atlas/*/index.html
```

---

## Checkpoint Git

```bash
git add \
  CLAUDE.md README.md \
  css/diptico.css \
  js/render-diptico.js \
  js/data-territorios.js \
  atlas/07-tuahka/ \
  mapas-svg/07-tuahka/ \
  mapas-raster/07-tuahka/

git commit -m "feat(06-2026): concesion_minera todos los territorios, layout E, borde cromático cards"
git push origin feat/waupasa-twi-editorial
```
