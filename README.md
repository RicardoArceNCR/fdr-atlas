# Atlas de Concesiones Mineras en Territorios Indígenas

Producto editorial cartográfico web producido para **Fundación del Río (FDR)**.

El atlas documenta concesiones mineras sobre territorios indígenas y afrodescendientes de Nicaragua mediante dípticos web editoriales, responsivos y exportables a PDF.

---

# Estado actual

| Componente | Estado |
|---|---|
| Design system FDR | ✅ |
| Tokens Figma → Style Dictionary | ✅ |
| Renderer JS dinámico | ✅ |
| Template único reusable | ✅ |
| Arquitectura raster + SVG overlay | ✅ |
| Responsive desktop/tablet/mobile | ✅ |
| Waupasa Twi (03) | ✅ Piloto funcional |
| Export PDF / print | ⏳ Refinamiento |
| Territorios 01, 02, 04 | ⏳ Migración |
| Territorios 05–15 | ⏳ Producción |

---

# Arquitectura final

El atlas utiliza:

```txt
RASTER BASE (WEBP)
  ├─ relieve
  ├─ agua
  ├─ hillshade
  └─ fondo territorial

SVG OVERLAY (PURO)
  ├─ concesiones
  ├─ labels
  ├─ símbolos
  ├─ overlays
  └─ leyenda opcional

HTML EDITORIAL
  ├─ narrativa
  ├─ estadísticas
  ├─ detalle concesiones
  └─ fuentes
```

---

# Decisión técnica clave

✅ SVG y raster separados.

NO:

```txt
SVG con <image> embebida
```

SÍ:

```txt
HTML
 ├─ <img> raster
 └─ <object> SVG overlay
```

Esto permite:

- responsive estable
- exports PDF más limpios
- SVG ligeros
- updates rápidos desde Illustrator
- mantenimiento escalable para 15 mapas

---

# Estructura del proyecto

```txt
atlas/
├── index.html
├── 01-rama-kriol/
├── 02-creole-bluefields/
├── 03-waupasa-twi/
├── 04-wangki-twi-tasba-raya/
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
├── mapas-raster/
│   └── 03-waupasa-twi/
│
├── mapas-svg/
│   └── 03-waupasa-twi/
│
└── design-system/
    └── tokens/
```

---

# Arquitectura responsive

Cada territorio puede tener assets específicos por breakpoint:

```txt
desktop
tablet
mobile
```

Ejemplo:

```js
assets: {
  desktop: {
    raster: "../../mapas-raster/03-waupasa-twi/desktop-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg"
  },

  tablet: {
    raster: "../../mapas-raster/03-waupasa-twi/tablet-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg"
  },

  mobile: {
    raster: "../../mapas-raster/03-waupasa-twi/mobile-03-Waupasa-Twi.webp",
    svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg"
  }
}
```

---

# Cómo funciona el renderer

`render-diptico.js`:

1. Lee `data-territorio` del body
2. Busca el territorio en `data-territorios.js`
3. Inserta `templates/diptico-base.html`
4. Renderiza:
   - header
   - mapa
   - narrativa
   - stats
   - concesiones
   - fuente
5. Cambia assets según breakpoint

Breakpoints:

```js
if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";
```

---

# Pipeline correcto de Illustrator

## 1. Crear composición por breakpoint

```txt
MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE
```

---

## 2. Exportar raster

Exportar:

```txt
desktop-NN-Nombre.webp
tablet-NN-Nombre.webp
mobile-NN-Nombre.webp
```

Contenido:

✅ relieve  
✅ agua  
✅ fondo  
✅ hillshade  

NO:

❌ labels  
❌ concesiones  
❌ overlays  

---

## 3. Exportar SVG limpio

Eliminar raster antes de exportar.

El SVG debe contener SOLO:

✅ labels  
✅ concesiones  
✅ símbolos  
✅ overlays  
✅ líneas  

NO:

❌ <image>
❌ raster embebido

Verificar:

```bash
grep -i "image\|xlink:href" mapas-svg/**/*.svg
```

Resultado esperado:

```txt
vacío
```

---

# Servidor local

```bash
python3 -m http.server 8000
```

Abrir:

```txt
http://localhost:8000/atlas/03-waupasa-twi/
```

---

# Design system

Tokens generados desde Figma:

```bash
cd design-system/tokens

python3 figma-to-sd.py

npm run build
```

---

# Qué NO hacer

❌ No usar ai2html como arquitectura principal  
❌ No meter raster dentro del SVG  
❌ No crear HTML distinto por territorio  
❌ No hardcodear narrativa en HTML  
❌ No corregir Illustrator roto con hacks CSS permanentes  

---

# Próximo paso

1. Cerrar Waupasa Twi estable
2. Migrar 01, 02, 04
3. Crear índice general del atlas
4. Refinar export PDF
5. Rollout a los 15 territorios
