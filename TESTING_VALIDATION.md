# Testing & Validation Guide

Guía rápida para verificar que la arquitectura raster+svg funciona correctamente.

---

## Pre-requisitos

- ✅ Servidor local corriendo: `http://localhost:8000/`
- ✅ Chrome/Firefox con DevTools abierto
- ✅ Territorio 03 (Waupasa Twi) desplegado

---

## Test 1: Visual en Desktop

**URL:** `http://localhost:8000/atlas/03-waupasa-twi/`  
**Viewport:** 1400px+ (o maximizado)

### Pasos

1. Abrir DevTools (F12)
2. Ir a pestaña **Elements**
3. Expandir `<div class="mapa-stack">`
4. Verificar que existen:
   ```html
   <img id="mapa-raster" class="mapa-raster" src="...webp"/>
   <object id="mapa-editorial-obj" class="mapa-overlay" data="...svg"/>
   ```
5. Ir a pestaña **Network**
6. Filtrar por `.webp` y `.svg`
7. Ambos archivos deben mostrar estado **200** (OK)

### Verificación visual

- [ ] Raster visible (hillshade + agua)
- [ ] SVG overlay alineado perfectamente
- [ ] Labels legibles
- [ ] Concesiones con colores: 🟩 Colombia, 🟪 Canada, 🟥 China, 🟫 Nacional, 🟨 Reserva
- [ ] Sin distorsión o offset entre capas

### Resultado esperado

```
✅ Raster: 927x980px
✅ SVG: alineado 100%
✅ Overlay nítido, etiquetas legibles
✅ Network: 0 errores 404
```

---

## Test 2: Responsive Tablet

**URL:** Misma URL  
**Viewport:** 1024px (Chrome DevTools)

### Pasos

1. Abrir DevTools
2. Clic en icono de device (responsive mode)
3. Seleccionar/personalizar a **1024px**
4. Recargar página

### Verificación visual

- [ ] Mapa escala sin distorsión
- [ ] Aspect ratio se mantiene (no se alarga)
- [ ] SVG sigue alineado con raster
- [ ] Layout cambia: 2 columnas comprimidas
- [ ] Info panel ajusta ancho
- [ ] Labels siguen legibles

### Resultado esperado

```
✅ Aspect ratio: 927/980 mantenido
✅ Mapa contiene en viewport
✅ Ambas columnas visibles (o scroll)
✅ Sin espacios raros
```

---

## Test 3: Responsive Mobile

**URL:** Misma URL  
**Viewport:** 375px (iPhone 12)

### Pasos

1. DevTools: Responsive mode
2. Seleccionar **iPhone 12** (375px)
3. Recargar página
4. Scroll down

### Verificación visual

- [ ] Mapa en viewport completo
- [ ] Info panel debajo del mapa
- [ ] Sin horizontal scroll
- [ ] Labels legibles (si font-size se ajusta)
- [ ] Touch-friendly (bordes con padding)

### Resultado esperado

```
✅ Stack apila: mapa arriba, info abajo
✅ 100% del ancho (sin overflow)
✅ Mapa respeta aspect-ratio
✅ Scroll vertical fluido
```

---

## Test 4: Consola JavaScript

### Pasos

1. DevTools → Pestaña **Console**
2. Buscar cualquiera de estos errores:

```
❌ GET http://localhost:8000/mapas-svg/... 404
❌ GET http://localhost:8000/mapas-raster/... 404
❌ TypeError: raster.src is not defined
❌ TypeError: obj.setAttribute is not defined
```

3. Si retorna algo, revisar el error.

### Resultado esperado

```
✅ Console limpia (sin errores rojo)
✅ Solo warnings amarillos de extensiones/favicons
```

---

## Test 5: Network Performance

### Pasos

1. DevTools → **Network**
2. Recargar página (Ctrl+R)
3. Filtrar por `.webp` y `.svg`
4. Anotar tamaños

### Verificación

| Archivo | Tamaño esperado | Status |
|---------|-----------------|--------|
| `desktop-03-Waupasa-Twi.webp` | < 500KB | 200 ✅ |
| `desktop-03-Waupasa-Twi.svg` | < 100KB | 200 ✅ |
| `tablet-03-Waupasa-Twi.webp` | < 400KB | 200 ✅ |
| `tablet-03-Waupasa-Twi.svg` | < 100KB | 200 ✅ |
| `mobile-03-Waupasa-Twi.webp` | < 300KB | 200 ✅ |
| `mobile-03-Waupasa-Twi.svg` | < 100KB | 200 ✅ |

**Si SVG > 200KB:** revisar que no tenga `<image>` embebida.

---

## Test 6: Breakpoint Switching

### Pasos

1. Abrir en **Desktop** (1400px)
2. Verificar que carga `desktop-03-Waupasa-Twi.{webp,svg}`
3. Redimensionar a **1024px** (tablet)
4. Verificar que cambia a `tablet-03-Waupasa-Twi.{webp,svg}`
5. Redimensionar a **375px** (mobile)
6. Verificar que cambia a `mobile-03-Waupasa-Twi.{webp,svg}`
7. Volver a **1400px**
8. Verificar que vuelve a `desktop-...`

### Automatizar (console)

```js
// Abrir console y copiar:
const observer = new MutationObserver(() => {
  const raster = document.getElementById('mapa-raster');
  const obj = document.getElementById('mapa-editorial-obj');
  console.log(`Raster: ${raster?.src?.split('/').pop()}`);
  console.log(`SVG: ${obj?.getAttribute('data')?.split('/').pop()}`);
});
observer.observe(document.body, { attributes: true, subtree: true });
// Redimensiona navegador, verifica cambios en console
```

### Resultado esperado

```
✅ Desktop → tablet: archivos cambian
✅ Tablet → mobile: archivos cambian
✅ Mobile → desktop: vuelve a original
✅ Sin lag/flicker
```

---

## Test 7: Data Attributes

### Pasos

1. DevTools → **Elements**
2. Seleccionar `<div id="diptico-container">`
3. Expandir
4. Buscar atributo `data-layout="A"`
5. Verificar que es correcto para Waupasa Twi

### Resultado esperado

```html
<div class="diptico" id="diptico-container" data-layout="A">
  <!-- layout A = 55fr 45fr columnas -->
</div>
```

---

## Test 8: SVG Inline (opcional)

Para verificar que SVG no tiene `<image>` embebida:

### Pasos

1. Abrir URL del SVG directo:  
   `http://localhost:8000/mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg`
2. DevTools → **Elements**
3. Ctrl+F buscar: `<image`
4. Resultado esperado: **no encontrado**

### En terminal (más rápido)

```bash
grep -i "image\|xlink:href" mapas-svg/03-waupasa-twi/*.svg
# Resultado esperado: vacío (sin matches)
```

---

## Test 9: Print/PDF

### Pasos

1. Navegador: Ctrl+P (Print)
2. Destino: **Save as PDF**
3. Opciones:
   - Margins: Minimal
   - Background graphics: ON
4. Guardar
5. Abrir PDF

### Verificación

- [ ] Mapa legible en PDF
- [ ] Raster + SVG rendered correctamente
- [ ] Sin artefactos o cortes
- [ ] Color print OK
- [ ] Text legible

### Resultado esperado

```
✅ PDF muestra mapa completo
✅ Sin distorsión
✅ Colores conservados
✅ Texto seleccionable (si es SVG text)
```

---

## Test 10: Borrar Cache y Recargar

### Pasos

1. DevTools → **Application** (Chrome) o **Storage** (Firefox)
2. **Clear site data**
3. Recargar página (Ctrl+Shift+R hard reload)
4. Repetir Test 1 (visual desktop)

### Resultado esperado

```
✅ Mapa carga sin cache
✅ Raster + SVG se cargan fresh
✅ Sin errores 304 o stale cache
```

---

## Checklist Final

Completar antes de hacer commit:

- [ ] Desktop visual OK
- [ ] Tablet responsive OK
- [ ] Mobile responsive OK
- [ ] Console sin errores
- [ ] Network sin 404s
- [ ] Breakpoint switching funciona
- [ ] SVG sin `<image>` embebida
- [ ] PDF print funciona
- [ ] Cache cleared & hard reload OK

---

## Si algo falla

### Raster 404

**Síntoma:** Imagen no carga  
**Causa probable:**
- [ ] Ruta mala en `data-territorios.js`
- [ ] Archivo no existe en `mapas-raster/`
- [ ] Nombre mismatch (mayúsculas, guiones)

**Solución:**
```bash
# Verificar archivos existen
ls -la mapas-raster/03-waupasa-twi/

# Verificar ruta en data
grep -A 5 "03-waupasa-twi" js/data-territorios.js | grep raster
```

### SVG 404

**Síntoma:** Overlay no carga  
**Causa probable:** Misma que raster

**Solución:** Mismo debugging que raster

### Mapa desalineado

**Síntoma:** Raster y SVG no calzan  
**Causa probable:**
- [ ] `aspect-ratio` no es 927/980
- [ ] SVG tiene `viewBox` distinto
- [ ] Raster está escalado (no `object-fit: contain`)

**Solución:**
```css
/* Verificar en DevTools */
.mapa-stack {
  aspect-ratio: 927 / 980;  /* Este número es clave */
}
.mapa-raster {
  object-fit: contain;       /* No distorsionar */
}
```

### SVG tiene `<image>` embebida

**Síntoma:** SVG pesa mucho, contiene imagen  
**Solución:**
```bash
# Verificar
grep "image" mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg

# Si retorna algo, ir a Illustrator:
# 1. Abrir artboard
# 2. Delete imagen
# 3. Exportar SVG de nuevo
# 4. Verificar: grep "image" ... → vacío
```

---

## Notas finales

- Tests 1–7 son **obligatorios** antes de cada deploy
- Tests 8–9 son **recomendados** para PDF
- Test 10 es **preventivo** para cache issues
- Tiempo total: ~10 minutos por territorio

**Si todos los tests pasan, está listo para producción.**
