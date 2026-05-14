# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido para **Fundación del Río (FDR)**. Documenta concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua mediante dípticos web embebibles.

El proyecto no es una galería de mapas ni un dashboard. Es un sistema editorial cartográfico: mapa a la izquierda, narrativa y datos a la derecha.

---

## Estado actual

| Componente | Estado |
|---|---|
| Design system FDR / tokens | ✅ Funcional |
| Pipeline Figma → Style Dictionary | ✅ Funcional |
| `tokens.css` / `tokens.js` | ✅ Generados |
| CSS base de díptico | ✅ Funcional |
| Template HTML reutilizable | ✅ Funcional |
| Renderer JS por territorio | ✅ Funcional |
| Data estructurada de territorios | ✅ Iniciada |
| 03 Waupasa Twi | ✅ Primer mapa funcional |
| SVG responsive por breakpoint | ✅ Confirmado para Waupasa Twi |
| PDF / print final | ⏳ Pendiente |
| Índice general del atlas | ⏳ Pendiente |
| Resto de mapas | ⏳ Pendientes de producción final |

---

## Decisión técnica principal

La arquitectura actual usa **SVG completo por breakpoint** para el mapa.

Para cada territorio complejo, especialmente Waupasa Twi, se recomienda exportar:

```txt
mapas-svg/{territorio}/desktop-{Nombre}.svg
mapas-svg/{territorio}/tablet-{Nombre}.svg
mapas-svg/{territorio}/mobile-{Nombre}.svg
```

Cada SVG debe ser **autocontenido** e incluir:

- mapa base / raster embebido o correctamente enlazado
- concesiones
- reserva minera
- labels cartográficos necesarios
- norte
- escala
- leyenda cartográfica si forma parte del mapa

Esto reemplaza el enfoque anterior de:

```txt
raster base separado + SVG overlay separado
```

Ese enfoque era posible, pero generaba riesgo de desalineación entre imagen y SVG en desktop/tablet/mobile.

---

## Estructura actual esperada

```txt
atlas/
├── index.html
├── 01-rama-kriol/
│   └── index.html
├── 02-creole-bluefields/
│   └── index.html
├── 03-waupasa-twi/
│   └── index.html
└── 04-wangki-twi-tasba-raya/
    └── index.html

css/
└── diptico.css

js/
├── data-territorios.js
└── render-diptico.js

templates/
└── diptico-base.html

mapas-svg/
└── 03-waupasa-twi/
    ├── desktop-03-Waupasa-Twi.svg
    ├── tablet-03-Waupasa-Twi.svg
    └── mobile-03-Waupasa-Twi.svg

mapas-raster/
└── 03-waupasa-twi/
    ├── desktop-03-Waupasa-Twi.png
    ├── desktop-03-Waupasa-Twi.webp
    ├── tablet-03-Waupasa-Twi.png
    ├── tablet-03-Waupasa-Twi.webp
    ├── mobile-03-Waupasa-Twi.png
    └── mobile-03-Waupasa-Twi.webp

design-system/
└── tokens/
    ├── source/raw/
    ├── source/
    ├── build/
    │   ├── tokens.css
    │   └── tokens.js
    ├── figma-to-sd.py
    ├── style-dictionary.config.js
    └── package.json
```

Nota: `mapas-raster/` puede conservarse como respaldo/export auxiliar, pero para Waupasa Twi el render web activo usa los SVG completos.

---

## Funcionamiento del renderer

El HTML de cada territorio carga el renderer JS. El archivo `render-diptico.js`:

1. Lee el `data-territorio` del `<body>`.
2. Busca el territorio en `data-territorios.js`.
3. Inserta `templates/diptico-base.html`.
4. Renderiza header, mapa, estadísticas, concesiones, fuente e insets.
5. Cambia el SVG según breakpoint.

Breakpoints actuales:

```js
if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";
```

Para Waupasa Twi, los assets activos son:

```js
assets: {
  desktop: { svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg" },
  tablet:  { svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg" },
  mobile:  { svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg" },
}
```

---

## Layout del díptico

El layout base está en `css/diptico.css`.

Layouts disponibles:

| Layout | Uso |
|---|---|
| A | Mapa complejo, múltiples concesiones |
| B | Mapa focal, una concesión principal |
| C | Mapa fragmentado, insets o varios zooms |

Desktop:

```css
.diptico[data-layout="A"] {
  grid-template-columns: 55fr 45fr;
}
```

Tablet:

```css
@media (min-width: 768px) and (max-width: 1199px) {
  .diptico[data-layout="A"] {
    grid-template-columns: 58fr 42fr;
  }
}
```

Mobile:

```css
@media (max-width: 767px) {
  .diptico {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}
```

---

## Flujo correcto de Illustrator → Web

Para evitar desfases entre lo que se ve en Illustrator y lo que aparece en web:

### 1. Un archivo o artboard por breakpoint

```txt
desktop.ai / desktop artboard
tablet.ai / tablet artboard
mobile.ai / mobile artboard
```

Cada breakpoint puede tener composición distinta. No debe ser solo reducción automática.

### 2. Un grupo maestro por composición

Recomendado:

```txt
MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE
```

Dentro:

```txt
BASE_MAPA
CONCESIONES
RESERVA_MINERA
LABELS_LUGARES
LABELS_POBLADOS
NORTE
ESCALA
LEYENDA_MAPA
```

### 3. Exportar SVG completo

El SVG debe exportarse con:

- `Use Artboards` activado
- imagen base embebida o link funcional
- `viewBox` coherente con el artboard
- sin elementos importantes fuera del artboard
- sin rutas rotas hacia carpetas viejas

Validar con:

```bash
grep -R "ENTREGA_20ABRIL_26\|03_Waupasa Twi - limpio\|image href\|xlink:href" mapas-svg/03-waupasa-twi
```

Si el SVG referencia una imagen externa inexistente, el mapa base no cargará.

---

## Design system y tokens

El sistema usa tokens generados desde Figma mediante Style Dictionary.

Comandos:

```bash
cd design-system/tokens
python3 figma-to-sd.py
npm run build
```

Verificación:

```bash
grep -R "concesion-pais" build/tokens.css
grep -R "mapa-" build/tokens.css
```

Tokens relevantes:

```css
--concesion-pais-china: #b91c1c;
--concesion-pais-canada: #b45309;
--concesion-pais-colombia: #6d28d9;
--concesion-pais-nacional: #0f5fa6;
--concesion-tipo-reserva: #4b5563;

--mapa-tierra-exterior: var(--color-neutral-100);
--mapa-territorio-borde: var(--color-neutral-900);
--mapa-label-poblado: var(--typography-size-2xs);
--mapa-label-ciudad: var(--typography-size-sm);
```

---

## Territorios cargados en data

| # | Territorio | Layout | Concesiones | Estado |
|---|---|---|---:|---|
| 01 | Rama y Kriol | A | 3 | Datos base iniciados |
| 02 | Creole de Bluefields | B | 1 | Datos base iniciados |
| 03 | Waupasa Twi | A | 9 | Primer mapa funcional con SVG responsive |
| 04 | Wangki Twi-Tasba Raya | C | 2 | Datos base iniciados |
| 05 | Wangki Li Aubra Tasbaya | C | 2 | Pendiente |
| 07 | Tuahka | A | 12+ | Pendiente |
| 06, 08–15 | Pendientes | — | — | Pendientes |

---

## Problemas conocidos / notas

- `SES Removing unpermitted intrinsics` suele venir de extensiones del navegador o DevTools, no del proyecto.
- `favicon.ico 404` no bloquea el atlas; se puede resolver agregando favicon después.
- Si el mapa base desaparece dentro de un SVG, revisar links embebidos desde Illustrator.
- Si un SVG se ve descentrado, abrir el SVG directo en navegador y revisar `viewBox`, artboard y elementos fuera de canvas.
- La leyenda HTML puede duplicarse si la leyenda ya viene incluida dentro del SVG. Decidir por mapa si se conserva o se oculta.

---

## Próximo hito

Cerrar `03-waupasa-twi` como mapa estable:

1. Confirmar visualmente desktop, tablet y mobile.
2. Limpiar duplicados no usados.
3. Decidir si la leyenda vive dentro del SVG o en HTML.
4. Guardar commit y tag estable.
5. Replicar el pipeline a los demás mapas.

---

## Publicación

Cada territorio está pensado para embeberse vía iframe:

```html
<iframe
  src="https://fundaciondelrio.org/atlas/03-waupasa-twi/"
  width="100%"
  height="700"
  frameborder="0">
</iframe>
```

La exportación PDF debe salir del HTML con `@media print`; no debe ser el producto primario.
