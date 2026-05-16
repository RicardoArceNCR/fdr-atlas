# Atlas FDR — Dípticos Cartográficos

Atlas web editorial sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua, producido para Fundación del Río (FDR).

El proyecto busca convertir mapas técnicos de concesiones en un **producto editorial cartográfico interactivo**, embebible, responsive y exportable a PDF.

---

## Estado actual

**Rama activa:** `feat/waupasa-twi-editorial`

**Checkpoint recomendado:** `waupasa-before-page-change-v1`

**Mapa piloto:** `03-waupasa-twi`

El piloto Waupasa Twi funciona como **mapa maestro del sistema**:

- raster base por breakpoint
- SVG overlay inline por breakpoint
- panel editorial HTML/CSS/JS
- datos estructurados en `data-territorios.js`
- interactividad SVG ↔ tarjetas
- hover por país
- base responsive desktop/tablet/mobile
- base para impresión PDF

---

## Arquitectura confirmada

```txt
QGIS / fuente cartográfica
→ raster base webp por breakpoint
→ Illustrator
→ SVG overlay limpio por breakpoint
→ navegador carga raster + SVG inline
→ panel editorial renderizado desde data
→ interacción SVG/cards/países
→ print CSS para PDF
```

Arquitectura técnica:

```txt
raster base webp por breakpoint
+
SVG overlay inline por breakpoint
+
panel editorial HTML/CSS/JS
+
data estructurada por territorio
+
tokens de diseño
+
sistema editorial cartográfico por país/patrón
```

---

## Producto final

El atlas contempla **16 dípticos web editoriales**:

1. Rama y Kriol
2. Creole de Bluefields
3. Waupasa Twi
4. Wangki Twi-Tasba Raya
5. Wangki Li Aubra Tasbaya
6. Twi Ahbra 10 comunidades
7. Tuahka
8. Tasba Pri Matriz Indígena
9. Prinzu Awala
10. Mayangna Sauni Bas
11. Mayangna Sauni As
12. Masauni Arumatun
13. Amasau
14. Chorotega II
15. Matagalpa
16. Prinzu Auhya Uh

---

## Sistema editorial cartográfico

El atlas no debe resolverse como 16 mapas independientes. Debe funcionar como un sistema visual común.

Decisión principal:

```txt
PAÍS = identidad visual principal
CONCESIÓN = variación secundaria
```

Esto significa que los colores y patrones deben responder primero al país de capital o tipo de concesión:

- China
- Canadá
- Colombia
- Nicaragua / Nacional
- Reserva minera

Y luego cada concesión recibe una variación dentro de esa familia.

---

## Familias visuales por país

### China

Debe sentirse dominante, expansiva y densa.

Uso recomendado:

```txt
rojos
naranjas
amarillos cálidos
diagonales densas
círculos
cross-hatch
puntos compactos
```

### Canadá

Debe sentirse corporativo, frío, técnico y modular.

Uso recomendado:

```txt
azules fríos
azules intensos
violetas controlados
grid técnico
doble línea
hachurado fino
```

### Colombia

Debe sentirse extractivo-industrial, selvático, modular y corporativo.

Uso recomendado:

```txt
verdes petróleo
turquesas
verde oscuro
retícula modular
patrones escalonados
líneas segmentadas
```

### Nicaragua / Nacional

Debe sentirse institucional, administrativo y estatal.

Uso recomendado:

```txt
azules institucionales
gris petróleo
líneas verticales
trama ligera
relleno parcial
```

### Reserva minera

Debe sentirse como restricción, bloque legal o zona congelada.

Uso recomendado:

```txt
gris
café
marrón
sólido
hachurado grueso
```

---

## Clusters de mapas

Para producir el atlas de forma consistente, los mapas se agrupan por comportamiento visual.

### Cluster A — Presión extrema multipaís

```txt
03_Waupasa Twi
07_Tuahka
08_Tasba Pri Matriz Indígena
09_Prinzu Awala
11_Mayangna Sauni As
```

Uso:

```txt
alta densidad
varios países
superposición compleja
ruido controlado
```

### Cluster B — Minimalistas / concesión única o mínima

```txt
02_Creole de Bluefields
06_Twi Ahbra 10 comunidades
14_Chorotega II
15_Matagalpa
16_Prinzu Auhya Uh
```

Uso:

```txt
espacio negativo
concesión protagonista
dramatismo editorial
poca saturación
```

### Cluster C — Duales / equilibrio medio

```txt
01_Rama y Kriol
04_Wangki Twi-Tasba Raya
05_Wangki Li Aubra Tasbaya
10_Mayangna Sauni Bas
```

Uso:

```txt
2 a 4 concesiones
comparación clara
aire visual
jerarquía limpia
```

### Cluster D — Fragmentación extrema

```txt
12_Masauni Arumatun
13_Amasau
```

Uso:

```txt
muchísimas concesiones
riesgo alto de sopa GIS
opacidad baja
agrupación fuerte por país
leyendas compactas
```

---

## Mapas maestros recomendados

Antes de producir los 16 mapas, se deben cerrar 4 mapas maestros:

| Rol | Mapa |
|---|---|
| Maestro multipaís denso | Waupasa Twi |
| Maestro minimalista | Creole de Bluefields |
| Maestro dual | Wangki Li Aubra Tasbaya |
| Maestro complejo/fragmentado | Tuahka |

Si estos cuatro funcionan, el resto del atlas puede replicar sistema, layout, patrones, responsive e interacción con mucho menos riesgo.

---

## Archivos clave

```txt
atlas/03-waupasa-twi/index.html
templates/diptico-base.html
css/diptico.css
js/render-diptico.js
js/data-territorios.js
mapas-raster/03-waupasa-twi/*.webp
mapas-svg/03-waupasa-twi/*.svg
design-system/tokens/source/*.json
design-system/tokens/build/tokens.css
ATLAS_PATTERN_SYSTEM.md
CLAUDE.md
project_wp_tree.txt
```

---

## CSS crítico del SVG inline

```css
.mapa-svg-inline {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.mapa-svg-inline svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
```

Este bloque es obligatorio para que el SVG inline se apile correctamente sobre el raster.

---

## Breakpoints del mapa Waupasa Twi

| Breakpoint | Raster/SVG | Dimensiones |
|---|---:|---:|
| Desktop | `desktop-03-Waupasa-Twi` | 927 × 980 |
| Tablet | `tablet-03-Waupasa-Twi` | 780 × 1306 |
| Mobile | `mobile-03-Waupasa-Twi` | 504 × 634 |

Las dimensiones del raster, el viewBox del SVG y los valores en `data-territorios.js` deben coincidir.

---

## Reglas para exportar SVG desde Illustrator

Usar:

```txt
File → Export → Export As…
Format: SVG
Use Artboards: ON
```

No usar Asset Export para el SVG maestro, porque puede exportar solo un grupo/layer.

Opciones recomendadas:

```txt
Object IDs: Layer Names
Responsive: OFF
Minify: OFF
Preserve Illustrator Editing Capabilities: OFF
```

El SVG no debe contener:

```txt
<image>
base64
xlink:href
href a raster
mask
filter
foreignObject
```

Validación rápida:

```bash
grep -i "image\|xlink:href\|href" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg
```

Si no devuelve nada, el SVG no tiene raster embebido.

---

## Pipeline quirúrgico por mapa

Cada mapa debe pasar por:

```txt
1. Auditoría GIS/editorial
2. Clasificación de cluster
3. Definición de sistema visual
4. Composición editorial
5. Raster base webp por breakpoint
6. SVG overlay limpio por breakpoint
7. Normalización de IDs y clases
8. Integración en data-territorios.js
9. Validación desktop/tablet/mobile
10. Interacción SVG ↔ panel
11. Validación print/PDF
12. Checkpoint Git
```

---

## Comandos útiles

Levantar sitio local desde la raíz:

```bash
python3 -m http.server 8000
```

Abrir:

```txt
http://localhost:8000/atlas/03-waupasa-twi/
```

Verificar SVG cargado:

```js
document.querySelector('#mapa-svg-inline svg')
document.querySelector('#mapa-svg-inline').getBoundingClientRect()
document.querySelector('#mapa-svg-inline svg').getBoundingClientRect()
```

Verificar IDs:

```bash
grep -o 'id="[^"]*"' mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg | sort | uniq
```

---

## Guardado estable recomendado

```bash
git status

git add CLAUDE.md   README.md   ATLAS_PATTERN_SYSTEM.md   css/diptico.css   js/render-diptico.js   js/data-territorios.js   templates/diptico-base.html   project_wp_tree.txt   mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg   mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg   mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg

git commit -m "docs(atlas): define editorial cartographic pattern system"

git tag atlas-pattern-system-v1

git push origin feat/waupasa-twi-editorial
git push origin atlas-pattern-system-v1
```

---

## Próximo paso

1. Consolidar Waupasa Twi como mapa maestro del sistema.
2. Crear o ajustar tokens de países, patrones y estados.
3. Normalizar SVG para usar clases reutilizables.
4. Implementar badges con bandera + país.
5. Validar hover por país, concesión y tarjeta.
6. Crear maestro minimalista con Creole de Bluefields.
7. Crear maestro dual con Wangki Li.
8. Crear maestro complejo con Tuahka.
