# CLAUDE.md — Atlas FDR

Contexto operativo para Claude y asistentes IA del editor.

Leer antes de modificar:
- SVG
- CSS
- templates
- renderer
- Illustrator exports
- assets cartográficos

---

# Qué es este proyecto

Atlas editorial cartográfico sobre concesiones mineras en territorios indígenas y afrodescendientes de Nicaragua.

Cliente:
- Fundación del Río (FDR)

Producto:
- 15 dípticos web
- embebibles vía iframe
- exportables a PDF
- responsive
- HTML/CSS/JS estático

NO es:
- dashboard
- GIS app
- visor GIS
- mapa interactivo complejo

Es:
- producto editorial cartográfico

---

# Arquitectura FINAL (Mayo 2026)

✅ IMPLEMENTADA:

```txt
RASTER separado
+
SVG overlay separado
+
HTML editorial
```

---

# CSS crítico

```css
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
```

---

# Breakpoints oficiales

```js
if (width <= 767) return "mobile";
if (width <= 1199) return "tablet";
return "desktop";
```

---

# Pipeline Illustrator correcto

## Desktop / tablet / mobile

Cada breakpoint debe tener:

```txt
MAPA_MASTER_DESKTOP
MAPA_MASTER_TABLET
MAPA_MASTER_MOBILE
```

---

# SVG export

Antes de exportar:
- eliminar raster
- exportar SOLO overlays

El SVG debe contener:

✅ labels  
✅ overlays  
✅ concesiones  
✅ símbolos  
✅ líneas  

NO:

❌ <image>
❌ xlink:href

Verificar SIEMPRE:

```bash
grep -i "image\|xlink:href" mapas-svg/**/*.svg
```

Debe retornar vacío.

---

# Archivos críticos

```txt
css/diptico.css
js/render-diptico.js
js/data-territorios.js
templates/diptico-base.html
design-system/tokens/build/tokens.css
```

---

# Renderer

`render-diptico.js`:

1. Lee `data-territorio`
2. Busca territorio
3. Inserta template
4. Renderiza contenido
5. Cambia assets según breakpoint

NO duplicar lógica por territorio.

Toda variabilidad debe vivir en:

```txt
data-territorios.js
```

---

# Responsive

Desktop:
- layout split editorial

Tablet:
- layout comprimido

Mobile:
- stack vertical

NO corregir Illustrator roto con:
- scale()
- translate()
- hacks responsive

Corregir SIEMPRE desde Illustrator/artboard/export.

---

# Sistema de diseño

Tokens generados desde Figma:

```bash
cd design-system/tokens

python3 figma-to-sd.py
npm run build
```

NO editar:
- build/tokens.css

Editar:
- source/
- figma variables

---

# Testing obligatorio

Antes de commit:

- Desktop OK
- Tablet OK
- Mobile OK
- PDF OK
- SVG sin `<image>`
- Console sin 404
- Overlay alineado
- Network OK

---

# Qué NO hacer

❌ No volver a ai2html como arquitectura principal  
❌ No meter raster dentro del SVG  
❌ No crear 15 templates distintos  
❌ No hardcodear narrativa en HTML  
❌ No usar hacks CSS para corregir exports malos  
❌ No editar build/tokens.css manualmente  

---

# Estado actual

| Territorio | Estado |
|---|---|
| 03 Waupasa Twi | ✅ Piloto funcional |
| 01 Rama y Kriol | ⏳ Migración |
| 02 Creole de Bluefields | ⏳ Migración |
| 04 Wangki Twi-Tasba Raya | ⏳ Migración |
| 05–15 | ⏳ Pendiente |

---

# Próximo paso recomendado

1. Test final Waupasa Twi
2. Commit estable
3. Tag estable
4. Migrar 01
5. Migrar 02
6. Migrar 04
7. Rollout resto atlas
