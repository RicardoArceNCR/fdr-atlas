# Atlas — Parte II · Áreas protegidas

Segunda parte del atlas de FDR: concesiones mineras dentro de áreas protegidas
de Nicaragua. Vive en el mismo proyecto que la Parte I, pero **no comparte
archivos editables con ella**. La Parte I (`atlas/`) está cerrada y no se toca.

Última actualización: 20 nov 2026.

---

## Cómo verlo en local

```bash
cd ~/fdr-atlas
python3 -m http.server 8000
```

| Qué | URL |
|---|---|
| Portada de entrada (elige Parte I o II) | http://localhost:8000/ |
| Parte II — portada e índice | http://localhost:8000/areas-protegidas/ |
| Parte II — Bosawás (primer mapa) | http://localhost:8000/areas-protegidas/ap-05-bosawas/ |
| Parte I — sin cambios | http://localhost:8000/atlas/ |

Si un cambio no aparece: **Cmd + Shift + R**.

---

## Estructura

```txt
index.html                       ← portada de entrada (nueva) → atlas/ y areas-protegidas/
atlas/                           ← PARTE I — cerrada, no editar
areas-protegidas/
  index.html                     ← portada + índice de la Parte II (índice generado desde los datos)
  ap-NN-nombre/index.html        ← una página por área (18)
js/ap/
  data-areas-protegidas.js       ← TODOS los datos de la Parte II
  render-ap.js                   ← copia derivada de js/render-diptico.js
templates/diptico-ap.html        ← plantilla con 4 indicadores + ficha
css/ap.css                       ← se carga después de css/diptico.css; solo agrega
mapas-svg/ap-NN-nombre/desktop-ap-NN-Nombre.svg
mapas-raster/ap-NN-nombre/desktop-ap-NN-Nombre.webp (+ .png fuente)
```

**Regla:** nada de la Parte II edita `js/render-diptico.js`, `js/data-territorios.js`,
`templates/diptico-base.html` ni `css/diptico.css`. La Parte II los *lee* (diptico.css)
o tiene su propia copia (render, template). Si hace falta un ajuste visual, va en `css/ap.css`.

Prefijo `ap-` en todos los ids y carpetas para no chocar con los números de la Parte I
(`02-creole-bluefields` ≠ `ap-02-cerro-silva`).

---

## Qué tiene de nuevo respecto a la Parte I

| Elemento | Dónde |
|---|---|
| Categoría de manejo arriba del nombre (Reserva Natural, Humedal…) | `categoria` |
| 4.º indicador: **% de superficie concesionada** con barra | `stats.porcentaje` |
| Ficha legal: creación, ley/decreto, Reserva de Biosfera, RAMSAR | `ficha` |
| Ecosistemas en riesgo e impactos como etiquetas, **en el panel del mapa** ("En esta área", encima de Detalle de concesiones; ya no en la columna derecha) | `ecosistemas`, `impactos`, `.ap-riesgos` en `css/ap.css` |
| Los 4 datos en grilla 2×2 absoluta arriba a la derecha del banner (el banner no cambia de alto); etiquetas cortas en escritorio, largas en móvil y para lectores; degradado negro desde abajo | `.diptico__header--ap` y `.stat__label-corta` en `css/ap.css`, `initStatsEnBanner()` en render-ap.js |
| Columna derecha en fondo claro con ramas (`img/fondos/fondo-info-claro.webp`, fuente `img/temp/mpas-reservas-2.png`); quitar `fondo_info` de COMUNES vuelve al verde oscuro | `fondo_info` en COMUNES, `.diptico--info-claro` en `css/ap.css` |
| Poblados como triángulos (se construyen desde el círculo del SVG: el círculo queda inscrito) | `poblados_a_triangulos()` y `TRIANGULO_POBLADO.escala` en render-ap.js |
| Ficha legal en una fila de 3 (flex; un 4.º dato pasa abajo) | `.ficha__datos` en `css/ap.css` |
| Banner propio de la Parte II | `COMUNES.banner` → `img/banners/banner-ap.webp` |
| Brillo de los ríos en bucle: 3 vetas con ritmo y respiración propios | `aplicarBrilloRios()` en render-ap.js, `#rios-brillo` en `css/ap.css` |
| Enlaces "Ver también en la Parte I" | `territorios_relacionados` |
| País nuevo **Reino Unido** (color, patrón, badge) | `paises`, `css/ap.css`, `ESCALAS_PAIS` en render-ap.js |
| Índice agrupado por región y totales de portada calculados | `seccion`, `getTotales()` |
| Numeración propia (05 / 18) aunque solo haya un mapa listo | `numero` |
| Sombra en los ríos y brillo animado que los recorre (ver sección abajo) | `SOMBRA_RIOS`, `BRILLO_RIOS` en `js/ap/render-ap.js`; `#rios-brillo` en `css/ap.css` |

---

## Orden y numeración (decidido)

Sigue el orden del documento de contenido de FDR, agrupado por región:

| Sección | Áreas |
|---|---|
| Reserva de Biosfera Río San Juan y Caribe Sur | 01 Indio Maíz · 02 Cerro Silva · 03 Humedales de Bluefields · 04 Río San Juan |
| Región de Bosawás | **05 Bosawás** · 06 Bana Cruz · 07 Cola Blanca · 08 Pis Pis · 09 Saslaya |
| Caribe Norte | 10 Yulu |
| Macizos del norte: Matagalpa y Estelí | 11 Yucul · 12 Guabule · 13 Cerro Frío–La Cumplida · 14 Apante · 15 Yasika · 16 Arenal · 17 Quiabuc–Las Brisas |
| Centro | 18 Cumaica–Cerro Alegre |

---

## Sombra de los ríos

No se dibuja en Illustrator: `render-ap.js` copia el grupo `#rios` del SVG, lo pinta
de un azul más oscuro y lo coloca **debajo** del original, desplazado. Funciona en
todos los mapas de la Parte II que tengan una capa `rios`. Se ajusta en
`SOMBRA_RIOS` (`js/ap/render-ap.js`):

| Valor | Actual | Efecto |
|---|---|---|
| `color` | `#0b3a5c` | color de la sombra (el río es `#1f78b4`) |
| `dx`, `dy` | `0.9`, `1.1` | desplazamiento a la derecha y hacia abajo |
| `opacidad` | `0.4` | más alto = sombra más marcada |
| `ancho_extra` | `0` | grosor extra respecto al río |

Se usa una copia y no `filter: drop-shadow` para que también salga en el PDF
vectorial y se vea igual en todos los navegadores.

### Brillo que recorre los ríos

Un destello claro avanza por los ríos en loop infinito. Capas, de abajo arriba:
`#rios-sombra` → `#rios` (Illustrator) → `#rios-brillo`.

Los ríos de QGIS vienen partidos en ~760 tramos diminutos con sentidos mezclados.
Al cargar, `render-ap.js` une los tramos que se tocan en cadenas continuas (corta en
las bifurcaciones) y dibuja un trazado nuevo por cadena. En Bosawás quedan 74
cadenas que cubren ~80 % del largo de los ríos. Se prepara cuando el navegador está
libre (~0.2 s, una sola vez) para no retrasar el mapa.

| Qué ajustar | Dónde | Actual |
|---|---|---|
| Color, grosor, opacidad del destello | `#rios-brillo` en `css/ap.css` | `#e6f8ff`, 1.8 px, 0.9 |
| Largo del destello y del hueco | `stroke-dasharray` | `18 182` |
| Velocidad | `animation` (más segundos = más lento) | `5s` |
| Unir tramos / largo mínimo | `BRILLO_RIOS` en `render-ap.js` | `1.5`, `25` |

Si se cambia el `stroke-dasharray`, el `stroke-dashoffset` final de
`@keyframes ap-brillo-rio` debe ser la suma negativa (hoy `-200`) o el loop salta.

Rendimiento: se anima una sola propiedad (`stroke-dashoffset`) en un solo grupo, sin
filtros; se pausa fuera de pantalla; no corre con "reducir movimiento" ni al
imprimir. En la prueba se mantuvo a 60 fps, igual que sin brillo.
El sentido del destello en cada río es arbitrario: el SVG no guarda hacia dónde
corre el agua.

---

## Agregar el mapa de un área (checklist)

1. **Illustrator** — capas con estos nombres (Object IDs: Layer Names):
   ```
   territorio-borde                 ← trazo del límite, TRAZO normal (no Expand)
   concesiones
     {pais}                         ← china / colombia / reino-unido…
       {svg_id}                     ← ej. la-diabla-cerro-kum
         area-main
         area-main-hover
         border-{svg_id}            ← TRAZADO directo, no grupo
         area-hover-target          ← TRAZADO directo, encima de todo
   rios · paises · referencia · poblados
   ```
2. **Antes de exportar**, borrar del .ai:
   - la capa de referencia con el PNG de fondo (si no, sale dentro del SVG como `<image>`);
   - el texto "FUNDACIÓN DEL RÍO" del SVG. El logo de FDR va **dentro del fondo PNG**;
     la plantilla de la Parte II ya no pone el logo flotante (se quitó el 20 nov).
3. **Comprobar el calce** con el fondo: PNG en una capa bloqueada, X 0 · Y 0 · 927 × 980,
   opacidad 50 %. El límite tiene que caer sobre el borde del relieve.
4. `File → Save As → SVG` (no Export As). Verificar: `viewBox="0 0 927 980"`.
5. Copiar:
   - SVG → `mapas-svg/ap-NN-nombre/desktop-ap-NN-Nombre.svg`
   - PNG → `mapas-raster/ap-NN-nombre/desktop-ap-NN-Nombre.png` y convertir a `.webp`
6. En `js/ap/data-areas-protegidas.js`, en esa área:
   ```js
   assets: assetsDe('ap-NN-nombre', 'ap-NN-Nombre'),
   concesiones: [
     { nombre: '…', svg_id: '…', empresa: '…', pais: 'china', hectareas: '…' },
   ],
   ```
   El `svg_id` debe ser idéntico al nombre del grupo en Illustrator.
7. Abrir la página en local y pasar el mouse por la tarjeta de la concesión:
   el borde del lote debe animarse en el color del país.

### Flujo rápido para iterar un mapa que ya existe

1. En Illustrator, **Save As → SVG directo a su carpeta final**, reemplazando
   (`mapas-svg/ap-NN-nombre/desktop-ap-NN-Nombre.svg`). Nada de pasar por `img/temp`.
2. Revisar en la terminal (con el servidor andando en otra pestaña):
   ```bash
   bash scripts/ap/revisar-svg.sh mapas-svg/ap-05-bosawas/desktop-ap-05-Bosawas.svg
   ```
   Revisa lienzo, imagen incrustada, texto de FDR, línea antigua, capas y
   bordes agrupados; lista las fuentes usadas.
3. **Cmd + Shift + R** en el navegador.

El fondo igual: guardar el PNG en `mapas-raster/ap-NN-nombre/` y convertirlo a webp
(`cwebp -q 82 archivo.png -o archivo.webp`, o desde Photoshop).

Los archivos de la Parte II no están en git: antes de una prueba arriesgada,
hacer commit para poder volver atrás. El `.ai` sigue siendo la fuente.

---

## Lo que aprendimos con Bosawás

| Síntoma | Causa | Solución |
|---|---|---|
| El límite no calzaba con el relieve (20–40 px) | La línea del límite venía de **otro polígono** que el usado para recortar el relieve y los ríos (99.6 % de los ríos caían dentro del relieve, 15 % fuera de la línea). No era deformación del fondo: ningún escalado/perspectiva lo corregía. | Se rehízo el límite a partir del borde del fondo (`img/temp/territorio-borde-desde-fondo.svg`) y se pegó con Paste in Place. |
| Pico en la punta norte | Trazado abierto (30 px entre puntas) | Object → Path → Join (⌘J) |
| Mapa borroso con bloques | El PNG de referencia salió en el SVG como `<image>` y la ruta no existía | Borrar la capa de referencia antes de exportar |
| Logo encimado | Texto "FUNDACIÓN DEL RÍO" en el SVG + logo flotante de la página + logo en el fondo | El logo queda solo en el fondo PNG: se borró el texto del SVG y el `<img id="header-logo">` de `templates/diptico-ap.html` |
| Borde de la concesión sin color del país | `border-…` era un grupo con un trazado de color propio | Desagrupar: el id va en el trazado |
| Límite de grosor desigual | Expand convierte el trazo en forma rellena | No usar Expand; trazo normal de 3.3 px |

**Versión instalada (20 nov):** SVG de las 18:44 y fondo de las 18:43, que ya trae el logo de FDR (el fondo trae un halo
rojo fijo alrededor de la concesión; el SVG, una flecha curva en el mapa de ubicación). Límite como trazo
normal de 3.3 px, cerrado. Calce con el fondo: mediana 1 px, 90 % de los puntos a
menos de 3 px.

**Fuentes del SVG:** este mapa usa Poppins y Anton (además de Helvetica). Se cargan
desde Google Fonts en `css/ap.css` para que se vean igual en equipos que no las
tienen instaladas. Si un mapa nuevo usa otra fuente, agregarla en ese `@import`.

**Ojo al reexportar:** si `territorio-borde` empieza con `M589.1,115`, volvió la
línea antigua, que no calza.

---

## Pendientes

**De FDR**
- Nombre y empresa de cada concesión (solo Bosawás tiene nombre de lote, tomado del SVG).
- Qué territorios de la Parte I corresponden a cada área (por ahora solo los que nombra el texto: Rama y Kriol, Creole de Bluefields).
- Texto de presentación de la Parte II (el actual es borrador, marcado en la página).
- Descripción completa e imagen de Cerro Cumaica – Cerro Alegre.
- Correcciones al documento fuente: "suroeste" → sureste (Humedales de Bluefields); concordancias ("1 empresas mineras chinas"); "Bosawas" sin tilde.

**De diseño**
- Imagen de portada propia de la Parte II (hoy usa la de la Parte I).
- Bandera / leyenda de Reino Unido en los SVG de Humedales de Bluefields (03) y Quiabuc (17).
- Mapas de las 17 áreas restantes.

**De publicación**
- Los archivos de la Parte II no están en git todavía.
- Si el enlace público (y el QR) apuntan a `atlas/`, la portada de entrada no se ve hasta apuntar a la raíz.
