# Atlas FDR — Dípticos Cartográficos

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río (FDR).

El proyecto convierte mapas técnicos de concesiones en un **producto editorial cartográfico interactivo**, embebible, responsive y exportable a PDF.

---

## Estado actual — Junio 2026

**Rama activa:** `feat/waupasa-twi-editorial`

### Territorios con mapa web completo

| # | Territorio | Assets | Hover | Datos |
|---|---|---|---|---|
| 01 | Rama y Kriol | ✅ raster + SVG | ✅ 3 concesiones | ⬜ empresa/ha pendientes |
| 02 | Creole de Bluefields | ✅ raster + SVG | ✅ 1 concesión | ⬜ empresa/ha pendientes |
| 03 | Waupasa Twi | ✅ raster + SVG (3 breakpoints) | ✅ 8 concesiones | ⬜ empresa/ha pendientes |
| 04 | Wangki Twi-Tasba Raya | ✅ raster JPEG (stopgap) | ❌ sin SVG interactivo | ⬜ pendiente |
| 06 | Twi Yahbra (Diez comunidades) | ✅ raster + SVG | ⬜ anatomía hover pendiente en Illustrator | ✅ datos completos |

### Territorios registrados en data-territorios.js, sin assets todavía

05, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18 — carpetas `atlas/NN/` creadas,
mapa no renderiza hasta que existan raster + SVG.

### Bugs confirmados y documentados (Jun 2026)

- ✅ `opacity` vs `fill-opacity` en `area-hover-target` → ver CLAUDE.md
- ✅ `area-hover-target` con `stroke` propio tapa animación → fix global en `diptico.css`
- ✅ `area-hover-target` anidado dentro de `area-main-hover` rompe hover → ver CLAUDE.md
- ✅ `layout: 'pendiente'` colapsa el mapa a 38×40px → usar siempre A/B/C/D
- ✅ Faltar `tema`/`banner`/`logo` en `data-territorios.js` → panel derecho sin color/imagen
- ✅ viewBox incorrecto (772.6) por Export As con Crop to Content → usar Save As
- ✅ webp renombrado sin re-exportar → verificar md5sum antes de subir
- ✅ Carpeta `atlas/NN/` inexistente → 404 aunque el JS esté perfecto

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
<body data-territorio="06-twi-ahbra-10-comunidades">
  <script type="module" src="../../js/render-diptico.js"></script>
</body>
```

El renderer carga el template, los assets y la data. No hay HTML distinto por territorio.
**Sin la carpeta `atlas/NN-territorio/` con su `index.html` → 404.** El servidor es
Python estático (`python3 -m http.server 8000`), no hay router.

---

## Producto final — 18 dípticos

| # | Territorio oficial (Contenido_Atlas.md) | Cluster | id en proyecto |
|---|---|---|---|
| 01 | Rama y Kriol | C — dual | `01-rama-kriol` |
| 02 | Negro Creole de Bluefields | B — minimalista | `02-creole-bluefields` |
| 03 | Twi Waupasa | A — presión extrema ← **maestro activo** | `03-waupasa-twi` |
| 04 | Wangki Twi-Tasba Raya | C — dual | `04-wangki-twi-tasba-raya` |
| 05 | Wangki Li Aubra Tasbaya | C — dual | `05-wangki-li` |
| 06 | Twi Yahbra (Diez comunidades) | B — minimalista | `06-twi-ahbra-10-comunidades` |
| 07 | Tuahka Takaln Balna | A — presión extrema | `07-tuahka` |
| 08 | Tasba Pri Matriz Indígena | A — presión extrema | `08-tasba-pri` |
| 09 | Prinzu Awala | A — presión extrema | `09-prinzu-awala` |
| 10 | Mayangna Sauni Bas "Sikilta" | C — dual | `10-mayangna-sauni-bas` |
| 11 | Mayangna Sauni As | A — presión extrema | `11-mayangna-sauni-as` |
| 12 | Mayangna Sauni Arungka "Matunbak" | D — fragmentación extrema | `12-mayangna-arungka-matungbak` |
| 13 | Mayangna Awas Tingni Mayangnina Sauni Umani (AMASAU) | D — fragmentación extrema | `13-amasau` |
| 14 | Chorotega - Norte | B — minimalista | `14-chorotega-norte` |
| 15 | Matagalpa | B — minimalista | `15-matagalpa` |
| 16 | Prinzu Auhya Un | B — minimalista | `16-prinzu-auhya-un` |
| 17 | Muy Muy | B — minimalista | `17-muy-muy` |
| 18 | Sébaco | B — minimalista | `18-sebaco` |

⚠️ El README original decía 16 territorios. El Contenido_Atlas.md oficial de FDR
lista 18. Los ids de 17 y 18 son tentativos — confirmar con FDR antes de publicar.

---

## Orden de mapas maestros

No construir los 18 mapas al mismo tiempo. Primero consolidar los cuatro maestros:

| Rol | Mapa | Estado |
|---|---|---|
| Multipaís denso | Waupasa Twi (03) | ✅ completo |
| Minimalista | Twi Yahbra (06) | ⬜ hover pendiente en Illustrator |
| Dual | Wangki Li Aubra Tasbaya (05) | ⬜ pendiente |
| Complejo/fragmentado | Tuahka (07) | ⬜ pendiente |

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

⚠️ Pendiente de resolver: si HEMCO (aparece en 07, 11, 12) es `colombia` o `nacional`.
El CSV (`PAIS_CAPITAL`) dice Nicaragua, pero el Contenido_Atlas.md dice "empresa colombiana".
No cambiar hasta confirmar con FDR.

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
  [shape] id="area-hover-target"        ← hit area, fill ≠ none, fill-opacity 0
                                           ← NUNCA dentro de area-main-hover
</g>
```

Ver CLAUDE.md para diagnóstico detallado de cada regla.

---

## Archivos clave

```txt
atlas/NN-territorio/index.html     ← UN html por territorio, copiar y editar data-territorio
templates/diptico-base.html        ← template compartido
css/diptico.css                    ← estilos del sistema (incluye bordes)
js/render-diptico.js               ← renderer + interactividad
js/data-territorios.js             ← datos de los 18 territorios
mapas-raster/NN-territorio/        ← webp por breakpoint
mapas-svg/NN-territorio/           ← SVG por breakpoint
design-system/tokens/build/tokens.css
CLAUDE.md                          ← decisiones técnicas y diagnóstico
```

---

## Comandos útiles

```bash
# Levantar servidor local
python3 -m http.server 8000

# Crear carpeta de territorio nuevo (copiar desde 06 como plantilla)
mkdir -p atlas/NN-territorio
cp atlas/06-twi-ahbra-10-comunidades/index.html atlas/NN-territorio/index.html
# Luego editar data-territorio="NN-territorio" y <title> en ese index.html

# Crear todas las carpetas pendientes de una vez
for id in 05-wangki-li 07-tuahka 08-tasba-pri 09-prinzu-awala \
           10-mayangna-sauni-bas 11-mayangna-sauni-as \
           12-mayangna-arungka-matungbak 13-amasau \
           14-chorotega-norte 15-matagalpa 16-prinzu-auhya-un \
           17-muy-muy 18-sebaco; do
  mkdir -p atlas/$id
  cp atlas/06-twi-ahbra-10-comunidades/index.html atlas/$id/index.html
  sed -i '' "s/06-twi-ahbra-10-comunidades/$id/" atlas/$id/index.html
done

# Verificar que cada index.html tiene el data-territorio correcto
grep "data-territorio" atlas/*/index.html

# Auditar todos los IDs del SVG
grep -o 'id="[^"]*"' mapas-svg/NN-territorio/desktop-NN.svg | sort | uniq

# Auditar border-* (verificar nombres explícitos, no border1/border2)
grep -o 'id="border[^"]*"' mapas-svg/NN-territorio/desktop-NN.svg | sort

# Verificar viewBox del SVG (debe ser 927 980, no 772.6)
grep -o '<svg[^>]*>' mapas-svg/NN-territorio/desktop-NN.svg

# Verificar que el raster es distinto al anterior
md5sum mapas-raster/NN-territorio/desktop-NN.webp mapas-raster/NN-anterior/desktop-NN-anterior.webp

# Verificar que area-hover-target NO esté dentro de area-main-hover
grep -n "area-hover-target" mapas-svg/NN-territorio/desktop-NN.svg
```

---

## Checkpoint Git

```bash
git add \
  CLAUDE.md \
  README.md \
  css/diptico.css \
  js/render-diptico.js \
  js/data-territorios.js \
  templates/diptico-base.html \
  atlas/06-twi-ahbra-10-comunidades/index.html \
  mapas-svg/06-twi-ahbra-10-comunidades/ \
  mapas-raster/06-twi-ahbra-10-comunidades/

git commit -m "feat(06-twi-yahbra): mapa estático online — hover pendiente en Illustrator"
git push origin feat/waupasa-twi-editorial
```
