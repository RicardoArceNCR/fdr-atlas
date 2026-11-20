#!/usr/bin/env bash
# Revisión rápida de un SVG de la Parte II antes de previsualizarlo.
# Uso:  bash scripts/ap/revisar-svg.sh mapas-svg/ap-05-bosawas/desktop-ap-05-Bosawas.svg
# No revisa el calce con el fondo: eso se ve en el navegador.

f="$1"
[ -f "$f" ] || { echo "No encuentro: $f"; exit 1; }
err=0
ok()  { echo "  ✓ $1"; }
mal() { echo "  ✗ $1"; err=1; }

echo "Revisando $f"
grep -q 'viewBox="0 0 927 980"' "$f" && ok "lienzo 927 × 980" || mal "viewBox distinto de 0 0 927 980 (¿Export con Crop to Content?)"
[ "$(grep -c '<image' "$f")" -eq 0 ] && ok "sin imágenes incrustadas" || mal "trae <image>: borra la capa de referencia del fondo"
grep -q 'FUNDACI' "$f" && mal "trae el texto FUNDACIÓN DEL RÍO: bórralo (la página pone el logo)" || ok "sin texto de FDR"
grep -q 'id="territorio-borde"' "$f" && ok "territorio-borde" || mal "falta la capa territorio-borde"
grep -q 'id="territorio-borde" d="M589.1,115\|id="territorio-borde" class="[^"]*" d="M589.1,115' "$f" && mal "territorio-borde es la línea ANTIGUA (no calza)"
grep -q 'id="rios"' "$f" && ok "rios (lleva sombra automática)" || mal "falta la capa rios"
grep -q 'id="concesiones"' "$f" && ok "concesiones" || mal "falta la capa concesiones"
# Los border-{pais} de las banderas pueden ser grupos; los de concesiones no.
grep -o '<g id="border-[a-z0-9-]*"' "$f" | grep -v 'border-\(reserva\|colombia\|nicaragua\|canada\|china\|reino-unido\)"' | grep -q . \
  && mal "algún border-… de concesión es un grupo: desagrupa para que el id quede en el trazado"
for id in $(grep -o 'id="border-[a-z0-9-]*"' "$f" | sed 's/id="border-//;s/"//' | grep -v '^\(reserva\|colombia\|nicaragua\|canada\|china\|reino-unido\)$'); do
  grep -q "id=\"$id\"" "$f" && ok "concesión $id" || mal "border-$id sin grupo $id"
done
echo "Fuentes usadas:"; grep -o 'font-family: [^;]*' "$f" | sort -u | sed 's/^/    /'
[ $err -eq 0 ] && echo "Listo para previsualizar." || echo "Corrige lo marcado con ✗."
exit $err
