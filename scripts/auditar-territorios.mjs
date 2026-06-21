#!/usr/bin/env node
/**
 * auditar-territorios.mjs
 *
 * Verifica que cada territorio en data-territorios.js tenga lo necesario
 * para que su mapa se renderice e interactúe.
 *
 * Uso:
 *   node scripts/auditar-territorios.mjs
 *
 * Corre desde la raíz del proyecto (la carpeta con js/, mapas-svg/, etc.)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'js', 'data-territorios.js');

async function cargarTerritorios() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ No encontré ${DATA_FILE}`);
    console.error(`   Corre este script desde la raíz del proyecto.`);
    process.exit(1);
  }
  const mod = await import(`file://${DATA_FILE}`);
  return mod.TERRITORIOS;
}

function resolverPath(relPath) {
  if (!relPath) return null;
  const limpio = relPath.replace(/^(\.\.\/)+/, '');
  return path.join(ROOT, limpio);
}

function existeArchivo(relPath) {
  if (!relPath) return false;
  return fs.existsSync(resolverPath(relPath));
}

function idsEnSvg(svgRelPath) {
  const full = resolverPath(svgRelPath);
  if (!full || !fs.existsSync(full)) return null;
  const contenido = fs.readFileSync(full, 'utf8');
  return new Set([...contenido.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
}

function auditarTerritorio(t) {
  const problemas = [];
  const avisos = [];

  // ── Sin assets (en preparación) ────────────────────────────────────────
  if (!t.assets || Object.keys(t.assets).length === 0) {
    avisos.push(`Sin bloque assets — territorio pendiente, mapa no se renderiza`);
    return { problemas, avisos };
  }

  // ── Sin breakpoints ────────────────────────────────────────────────────
  const bps = ['desktop', 'tablet', 'mobile'];
  const tieneBp = bps.some(bp => t.assets[bp]);
  if (!tieneBp) {
    problemas.push(`Ningún breakpoint definido en assets — el mapa nunca se va a mostrar`);
    return { problemas, avisos };
  }

  bps.forEach(bp => {
    const a = t.assets[bp];
    if (!a) { avisos.push(`Falta assets.${bp} — se usará el aspect-ratio por defecto`); return; }

    // Raster
    if (!a.raster) {
      problemas.push(`assets.${bp}.raster no está definido`);
    } else if (!existeArchivo(a.raster)) {
      problemas.push(`assets.${bp}.raster NO existe en disco: ${a.raster}`);
    } else if (!a.raster.includes(t.id)) {
      avisos.push(`assets.${bp}.raster no contiene "${t.id}" en el path — ¿será de otro territorio?`);
    }

    // SVG (opcional — territorios en stopgap pueden no tenerlo)
    if (a.svg) {
      if (!existeArchivo(a.svg)) {
        problemas.push(`assets.${bp}.svg NO existe en disco: ${a.svg}`);
      } else if (!a.svg.includes(t.id)) {
        avisos.push(`assets.${bp}.svg no contiene "${t.id}" en el path`);
      }
    }

    // width/height
    if (!a.width || !a.height) {
      avisos.push(`assets.${bp} sin width/height — el aspect-ratio no se va a fijar`);
    }
  });

  // ── Validar concesiones contra IDs reales del SVG desktop ──────────────
  const svgDesktop = t.assets.desktop?.svg;
  const tieneSvg = svgDesktop && existeArchivo(svgDesktop);

  if (tieneSvg) {
    const ids = idsEnSvg(svgDesktop);

    (t.concesiones || []).forEach(c => {
      if (!c.svg_id) {
        problemas.push(`Concesión "${c.nombre}" sin svg_id — el hover nunca se va a activar`);
        return;
      }
      if (!ids.has(c.svg_id)) {
        problemas.push(`svg_id "${c.svg_id}" (${c.nombre}) no existe como id="…" dentro del SVG`);
      }
      if (!ids.has(`border-${c.svg_id}`)) {
        problemas.push(`Falta id="border-${c.svg_id}" dentro del SVG — la animación de borde no va a correr`);
      }
    });

    const tieneHoverTarget = [...ids].some(id => id.includes('area-hover-target'));
    if ((t.concesiones || []).some(c => c.svg_id) && !tieneHoverTarget) {
      avisos.push(`Ningún id contiene "area-hover-target" en el SVG — el hover puede no funcionar`);
    }
  } else if ((t.concesiones || []).some(c => c.svg_id)) {
    // Hay concesiones con svg_id pero no hay SVG — probablemente stopgap
    avisos.push(`Hay concesiones con svg_id pero no hay SVG (stopgap raster-only) — ignorando validación de IDs SVG`);
  }

  return { problemas, avisos };
}

async function main() {
  const territorios = await cargarTerritorios();
  let totalProblemas = 0;
  let totalAvisos = 0;

  territorios.forEach(t => {
    const { problemas, avisos } = auditarTerritorio(t);
    const estado = problemas.length ? '❌' : avisos.length ? '⚠️' : '✅';
    console.log(`\n${estado} ${t.id} — ${t.nombre}`);
    problemas.forEach(p => { console.log(`   ❌ ${p}`); totalProblemas++; });
    avisos.forEach(a => { console.log(`   ⚠️  ${a}`); totalAvisos++; });
  });

  console.log(`\n${'─'.repeat(60)}`);
  if (totalProblemas) {
    console.log(`❌ ${totalProblemas} problema(s) bloqueante(s), ${totalAvisos} aviso(s) — revisa los ❌ arriba.`);
  } else {
    console.log(`✅ Sin problemas bloqueantes. ${totalAvisos} aviso(s) menor(es). ${territorios.length} territorios auditados.`);
  }
  process.exit(totalProblemas ? 1 : 0);
}

main();
