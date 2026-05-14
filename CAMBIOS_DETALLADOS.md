# Cambios detallados: Antes → Después

---

## 1. HTML Template

### ANTES
```html
<div class="mapa-editorial">
  <object id="mapa-editorial-obj" data="" type="image/svg+xml"></object>
</div>
```

**Problema:** SVG debía contener la imagen raster → arquitectura enredada.

### DESPUÉS
```html
<div class="mapa-editorial">
  <div class="mapa-stack">
    <img
      id="mapa-raster"
      class="mapa-raster"
      alt="Mapa base del territorio"
    />
    <object
      id="mapa-editorial-obj"
      class="mapa-overlay"
      type="image/svg+xml"
    ></object>
  </div>
</div>
```

**Beneficio:** Imagen y overlay separados, cada uno cargado independientemente.

---

## 2. CSS Styles

### ANTES
```css
.mapa-editorial {
  width: min(100%, 920px);
  margin-inline: auto;
}

.mapa-editorial svg,
.mapa-editorial object {
  width: 100%;
  height: auto;
  display: block;
}
```

**Problema:** Sin control de aspect-ratio, posicionamiento impredecible en responsive.

### DESPUÉS
```css
.mapa-editorial {
  width: min(100%, 920px);
  margin-inline: auto;
}

.mapa-stack {
  position: relative;
  width: 100%;
  aspect-ratio: 927 / 980;
}

.mapa-raster,
.mapa-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.mapa-raster {
  object-fit: contain;
}

.mapa-overlay {
  pointer-events: none;
}

.mapa-editorial svg,
.mapa-editorial object {
  width: 100%;
  height: auto;
  display: block;
}
```

**Beneficios:**
- ✅ Aspect-ratio fijo (927/980) mantiene proporción
- ✅ `position: absolute` + `inset: 0` = overlay perfecto alineado
- ✅ `object-fit: contain` = raster escala sin distorsión
- ✅ `pointer-events: none` = SVG no bloquea interacción

---

## 3. Data Territorios

### ANTES
```js
{
  id: '03-waupasa-twi',
  numero: '03',
  nombre: 'Waupasa Twi',
  assets: {
    desktop: { svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg" },
    tablet:  { svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg" },
    mobile:  { svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg" },
  },
  layout: 'A',
  // ...
}
```

**Problema:** Solo SVG, raster faltaba. Imposible cargar image separada.

### DESPUÉS
```js
{
  id: '03-waupasa-twi',
  numero: '03',
  nombre: 'Waupasa Twi',
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
  },
  layout: 'A',
  // ...
}
```

**Beneficios:**
- ✅ Cada breakpoint tiene raster + svg específico
- ✅ Rutas explícitas facilitan debugging
- ✅ Fácil replicar a otros territorios (copy-paste)

---

## 4. Render JavaScript

### ANTES
```js
function renderMapa(t) {
  const assets = getMapAssets(t);
  const obj = document.getElementById("mapa-editorial-obj");
  if (obj && assets.svg) {
    obj.setAttribute("data", assets.svg);
  }
  renderLeyenda(t);
}
```

**Problema:** Solo carga SVG. Raster nunca se asignaba.

### DESPUÉS
```js
function renderMapa(t) {
  const assets = getMapAssets(t);
  const raster = document.getElementById("mapa-raster");
  const obj = document.getElementById("mapa-editorial-obj");

  if (raster && assets.raster) {
    raster.src = assets.raster;
  }

  if (obj && assets.svg) {
    obj.setAttribute("data", assets.svg);
  }
  renderLeyenda(t);
}
```

**Beneficios:**
- ✅ Carga raster en `<img>` element
- ✅ Carga SVG en `<object>` element
- ✅ Defensive checks: si falta un asset, no explota
- ✅ Responsive automático: `getBreakpoint()` ya maneja cambios

---

## Flujo de datos ahora

```
HTML (diptico-base.html)
  ↓
render-diptico.js init()
  ↓
getTerritorio() → data-territorios.js
  ↓
getMapAssets(territorio, breakpoint)
  ↓
renderMapa()
  ├─ raster.src = assets.raster
  └─ obj.setAttribute("data", assets.svg)
  ↓
HTML renderizado con ambas imágenes
```

---

## Testing checklist

### ✅ Visual

- [ ] Desktop: raster + overlay perfectamente alineados
- [ ] Tablet: escala sin distorsión
- [ ] Mobile: apila correctamente
- [ ] Ningún 404 en consola
- [ ] SVG labels legibles
- [ ] Concesiones colores correctos

### ✅ Técnico

- [ ] Abrir DevTools → Elements
- [ ] Verificar `<img id="mapa-raster">` tiene `src` asignado
- [ ] Verificar `<object id="mapa-editorial-obj">` tiene `data` asignado
- [ ] Network tab: 0 errores de ruta
- [ ] SVG carga sin warnings

### ✅ Responsive

- [ ] Redimensionar a 1400px: desktop
- [ ] Redimensionar a 1024px: tablet
- [ ] Redimensionar a 375px: mobile
- [ ] Verificar que breakpoint cambia correctamente

---

## Rollout seguro para otros territorios

Para territorio 01, 02, 04, 05… repite este patrón:

1. **En Illustrator:**
   ```
   Desktop artboard → export desktop-NN-Nombre.svg
   Tablet artboard → export tablet-NN-Nombre.svg
   Mobile artboard → export mobile-NN-Nombre.svg
   
   IMPORTANTE: Ninguno debe tener <image> embebida
   ```

2. **Extraer raster:**
   ```
   Desktop composition → copy → export desktop-NN-Nombre.webp
   Tablet composition → copy → export tablet-NN-Nombre.webp
   Mobile composition → copy → export mobile-NN-Nombre.webp
   ```

3. **En data-territorios.js:**
   ```js
   {
     id: 'NN-nombre-slug',
     assets: {
       desktop: {
         raster: "../../mapas-raster/NN-nombre/desktop-NN-Nombre.webp",
         svg: "../../mapas-svg/NN-nombre/desktop-NN-Nombre.svg"
       },
       // ... tablet, mobile
     },
     // ...
   }
   ```

4. **Test:**
   ```
   http://localhost:8000/atlas/NN-nombre/
   ```

---

## Qué NO cambió

- ✅ `getBreakpoint()` sigue igual
- ✅ Resize listener sigue igual
- ✅ `renderHeader()`, `renderStats()`, etc. siguen igual
- ✅ Leyenda, insets, todo lo demás sigue igual
- ✅ Estructura HTML editorial (lado derecho) sin cambios

**Cambio mínimo, máximo impacto.**
