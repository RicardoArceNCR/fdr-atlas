# Actualización de animaciones de bordes en `css/diptico.css`

## Qué se corrigió

Se actualizó el bloque de animaciones de bordes en `css/diptico.css` para sincronizarlo con los IDs actuales del SVG `desktop-03-Waupasa-Twi.svg`.

### Cambios principales

- Se corrigió el mapeo de IDs de `border` para las concesiones actuales.
- Se actualizó el estado base de opacidad para incluir todos los bordes `#border0`..`#border9` presentes en el SVG.
- Se reasignaron los selectores de concesión a los grupos correctos:
  - `#border` → `#el-encanto-i`
  - `#border1` → `#columbus`
  - `#border2` → `#el-encanto-ii`
  - `#border3` → `#caribe`
  - `#border4` → `#caribe`
  - `#border5` → `#yulu-awaskira`
  - `#border6` → `#reserva-minera`
  - `#border7` → `#walpa-tara`
  - `#border8` → `#vanessa`
  - `#border9` → `#puerto-cabezas`

## Notas relevantes

- El archivo `css/diptico.css` tenía reglas heredadas de un SVG anterior donde los IDs de los bordes eran diferentes.
- Solo `el-encanto-i` y `walpa-tara` estaban funcionando correctamente con el SVG actual antes de los ajustes.
- Se mantuvo el bloque de animación y los estilos de `stroke-dasharray`/`animation` para cada concesión.

## Comando de auditoría recomendado

Para verificar los IDs de borde en el SVG actual:

```bash
grep -o 'id="border[^\"]*"' mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg | sort
```

Este archivo resume los cambios hechos y la nueva correspondencia entre concesiones y bordes del SVG actual.