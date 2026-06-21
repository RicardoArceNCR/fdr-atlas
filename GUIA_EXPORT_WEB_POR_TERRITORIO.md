# GUÍA: Export Illustrator/Photoshop → Mapa web interactivo

Checklist pre-vuelo antes de dar por terminado un territorio nuevo (SVG +
raster) y subirlo. Escrita después de destrabar 01 y 02 — cada punto acá
es un bug real que pasó, no una precaución teórica.

---

## ⚠️ Dos exportadores de SVG distintos en Illustrator — no son lo mismo

| Ruta | Tiene "Crop to Content" | Usar para |
|---|---|---|
| `File → Export → Export As → SVG` | Sí — si queda marcado, recorta el viewBox al contenido visible, no al artboard | Evitar para el SVG final si no estás seguro del estado de esa casilla |
| `File → Save As → SVG` (Cmd+Shift+S) | No existe esa opción — siempre exporta el artboard completo | ✅ Preferido para el SVG final |

`Object IDs: Layer Names` y `Responsive` ✅ marcados — son los que hacen que
los nombres de capa se vuelvan `id="..."` y que el SVG escale al 100% del
contenedor en vez de quedarse en tamaño fijo.

**Verificación de una línea después de cada export:**
```bash
grep -o '<svg[^>]*>' desktop-XX-Nombre.svg
```
El `viewBox` debe coincidir con el `width`/`height` que vas a poner en
`data-territorios.js` (normalmente `927 980`). Si sale un alto muy distinto
(ej. `772.6` en vez de `980`), el export se recortó — repetir con Save As.

---

## Estructura de grupos/IDs requerida por concesión

Clonar el patrón de `victoria` (el primero que se hizo bien), un grupo por
lote dentro del territorio:

```
<g id="{svg_id}">          ← exacto, sin sufijo, único en el archivo
    area-main               ← Illustrator puede numerarlo, no importa
    area-main-hover          ← idem — el CSS ya lee data-name como respaldo
    border-{svg_id}          ← exacto, sin sufijo — el CSS lo busca por id literal
    area-hover-target        ← exacto, SIN el nombre del lote — la búsqueda
                                ya está acotada al grupo padre
</g>
```

`{svg_id}` tiene que ser idéntico, carácter por carácter, al campo `svg_id`
de ese lote en `data-territorios.js`. Sin acentos, sin espacios.

---

## Photoshop — antes de Flatten Image, no después

El bug más caro que encontramos: capas que quedan **visibles** sin querer y
se hornean en el export final. PNG/WebP no tienen capas — lo que ves al
hacer Flatten es lo único que queda guardado, no hay forma de "deshacer"
después.

Antes de cada Flatten, revisar con el ojo 👁️ de cada capa:

- [ ] ¿Hay capturas de pantalla (`Screenshot...PM`) visibles por encima del
      Asset real? Verificar — son fáciles de dejar puestas como referencia
      y olvidar apagar.
- [ ] ¿Las capas de textura/grano globales (las que tengan Smart Filters →
      Curves, normalmente arriba de todo el stack) están visibles? Si el
      territorio no lleva esa textura, apagarlas — afectan TODO el canvas
      sin importar qué grupo de territorio esté activo.
- [ ] ¿Solo está visible el grupo del territorio que estás exportando (y no
      el de otro territorio dentro del mismo PSD)?

**Solo entonces:** Flatten Image → Export PNG → convertir a webp.

**Verificación de una línea para confirmar que SÍ exportaste algo nuevo**
(no el mismo archivo de la vez anterior, renombrado):
```bash
md5sum nuevo.webp viejo.webp   # tienen que ser distintos
```

---

## Nombres de archivo y carpetas

```
mapas-svg/{id}/desktop-{numero}-{Nombre-Capitalizado}.svg
mapas-raster/{id}/desktop-{numero}-{Nombre-Capitalizado}.webp
```

- `{id}` = el campo `id` del territorio en `data-territorios.js`
  (ej. `02-creole-bluefields`) — no inventar, copiar tal cual.
- `{Nombre-Capitalizado}` — mismo nombre para el `.svg` y el `.webp` del
  mismo territorio (un typo o una palabra de enlace incluida en uno y no
  en el otro ya causó un bug real). Estilo recomendado: sin palabras de
  enlace (`Rama-Kriol`, no `Rama-y-Kriol`) para que sea más corto de
  escribir a mano.

---

## `data-territorios.js` — wiring final

- [ ] `assets.desktop/tablet/mobile.raster` y `.svg` — paths exactos a los
      archivos reales (no archivo_mapa_base, ese campo ya no se lee).
- [ ] `width`/`height` reales del artboard (no copiados de otro territorio).
- [ ] `svg_id` en cada objeto de `concesiones` — sin esto el hover no se
      activa aunque el SVG esté perfecto.
- [ ] Si duplicaste el `.ai` de otro territorio: buscar texto residual del
      título viejo antes de exportar el SVG final:
      ```bash
      grep -in "nombre del territorio anterior" archivo.svg
      ```

**Correr antes de probar en el navegador:**
```bash
node scripts/auditar-territorios.mjs
```

---

## Bugs reales encontrados (01 y 02) — referencia rápida

| Síntoma | Causa real | Territorio |
|---|---|---|
| Mapa no aparece, contenedor vacío | Sin bloque `assets` en data-territorios.js (campo legacy `archivo_mapa_base` ya no se lee) | 02 |
| Hover no se activa | Faltaba `svg_id` en la concesión | 02 |
| 404 al cargar el webp | Nombre de archivo no coincidía exactamente (typo "Blufields", inconsistencia con/sin "de") | 02 |
| SVG y raster no coinciden visualmente | webp re-subido era el mismo archivo de antes (mismo MD5) — nunca se re-exportó de verdad | 02 |
| Raster con grano/textura y triángulo gris fantasma | Capas de textura global (Smart Filters/Curves) y/o screenshots visibles al hacer Flatten | 01, 02 |
| SVG "se mueve", no coincide con el raster aunque ambos midan 927×980 nominalmente | viewBox real del SVG distinto al declarado (`772.6` en vez de `980`) — exportado con Crop to Content activo | 01 |
| Banner muestra el nombre del territorio equivocado | Texto residual del `.ai` duplicado, no se editó antes de exportar | 02 |

---

## Resumen — orden de export para un territorio nuevo

1. QGIS → exportar geometría limpia (Crop to Content **off**, es el export
   "de materia prima", no el final).
2. Illustrator → armar grupos/IDs por concesión sobre esa geometría.
3. Illustrator → `File → Save As → SVG` (no Export As) → verificar viewBox.
4. Photoshop → revisar capas visibles (textura global, screenshots
   sueltas) → Flatten → exportar PNG → convertir a webp.
5. Nombrar ambos archivos igual, en sus carpetas `{id}/`.
6. `data-territorios.js` → `assets` completo + `svg_id` por concesión.
7. `node scripts/auditar-territorios.mjs` → 0 errores antes de abrir el navegador.
