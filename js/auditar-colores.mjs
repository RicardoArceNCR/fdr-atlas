/**
 * auditar-colores.mjs
 * 
 * Audita todos los SVGs contra data-territorios.js y simula la asignación
 * de colores que hará pisarColorPatron() en el browser.
 *
 * Uso:
 *   node auditar-colores.mjs [ruta-a-svg-dir]
 *
 * Ejemplo desde la raíz del proyecto:
 *   node auditar-colores.mjs ./mapas-svg
 *
 * Sin argumentos, intenta encontrar los SVGs relativos a la ubicación del script.
 *
 * Reporta:
 *   ✅ ID en data-territorios Y en SVG → color asignado
 *   ❌ ID en data-territorios pero NO en SVG → huérfano (Illustrator pendiente)
 *   ⚠️  ID en SVG pero NO en data-territorios → sin datos, no recibirá color
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Paletas (deben coincidir exactamente con render-diptico.js) ─────────────
const ESCALAS_PAIS = {
  china: ['#7a1a08', '#a82510', '#c4300f', '#dd3519', '#f05a2a', '#f47317', '#f98838', '#fbb96a'],
  canada: ['#0d3d0d', '#1c621c', '#236e23', '#287a28', '#3d9e3d', '#5ab85a', '#6dbf6d', '#a8dfa8'],
  colombia: ['#052e2c', '#084f4b', '#0a6560', '#0f766e', '#129e93', '#16c2b5', '#4dd8ce', '#9eecea'],
  nacional: ['#0a1a38', '#0f2347', '#193966', '#20458a', '#263fa8', '#3a5cc7', '#6b8de0', '#a4b8f0'],
  reserva: ['#111418', '#1a1a1a', '#2e2e2e', '#394150', '#4a5568', '#555f6e', '#8a949f', '#c0c7ce'],
  'sin-nombre': ['#4b5563', '#6b7280', '#9ca3af', '#d1d5db'],
};

// ── Colores de card por país (de diptico.css) ────────────────────────────────
const CARD_COLOR = {
  china: '#dd3519',
  canada: '#739b50',
  colombia: '#0f766e',
  nacional: '#263fa8',
  reserva: '#394150',
  'sin-nombre': '#6b7280',
};

// ── Leer data-territorios.js ─────────────────────────────────────────────────
// Necesitamos parsearlo sin ES module import (tiene export al final)
const dataPath = resolve(__dirname, 'data-territorios.js');
if (!existsSync(dataPath)) {
  console.error(`❌ No se encontró data-territorios.js en: ${dataPath}`);
  console.error('   Coloca auditar-colores.mjs en la misma carpeta que data-territorios.js');
  process.exit(1);
}

let territoriosRaw = readFileSync(dataPath, 'utf-8');
// Remover el export al final para poder evaluar
territoriosRaw = territoriosRaw.replace(/export\s*\{[^}]*\}[\s;]*$/, '');
const fn = new Function(territoriosRaw + '\n return TERRITORIOS;');
const TERRITORIOS = fn();

// ── Buscar SVG dir ───────────────────────────────────────────────────────────
const svgBaseDir = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(__dirname, '../../mapas-svg');

const SVG_EXISTS = existsSync(svgBaseDir);

// ── Extraer IDs de concesión de un SVG ──────────────────────────────────────
const NON_CONCESSION = new Set([
  'Layer_1', 'Layer_2', 'Layer_3', 'conseciones', 'concesiones',
  'rios', 'rios1', 'paises', 'poblados', 'inset',
  'referencia', 'mapa-03', 'mapa-nicaragua', 'poblados1', 'areas',
  'territorio-borde', 'reserva-minera1',
]);

// Prefijos de grupos estructurales — nunca son concesiones
const NON_CONCESSION_PREFIXES = [
  'area-', 'pais-', 'bandera', 'border-', 'label',
  'poblado', 'titulo-', 'mapa-', 'MAPA_',
  // IDs generados por Illustrator (alfanuméricos cortos sin guión)
];

// Regex para IDs generados por Illustrator: 6 chars alfanuméricos sin guión
const ILLUSTRATOR_GENERATED = /^[a-zA-Z0-9]{5,8}$/;

function isStructural(id) {
  if (NON_CONCESSION.has(id)) return true;
  if (ILLUSTRATOR_GENERATED.test(id)) return true;  // lhAU0U, zs8KWV, etc.
  if (id.includes('_x3C_') || id.includes('_x5F_')) return true; // XML-encoded names
  for (const prefix of NON_CONCESSION_PREFIXES) {
    if (id.startsWith(prefix)) return true;
  }
  // Grupos de países: china, canada, nicaragua, colombia, reserva
  if (['china', 'canada', 'nicaragua', 'colombia', 'reserva', 'nacional'].includes(id)) return true;
  return false;
}

function getSvgConcessionIds(svgPath) {
  if (!existsSync(svgPath)) return null;
  const svg = readFileSync(svgPath, 'utf-8');
  const ids = [...svg.matchAll(/<g id="([^"]+)"/g)].map(m => m[1]);
  return ids.filter(id => !isStructural(id));
}

// ── Simular asignación de colores ────────────────────────────────────────────
function calcularColores(concesiones) {
  const contadores = {};
  return concesiones
    .filter(c => c.svg_id && c.pais)
    .map(c => {
      const escala = ESCALAS_PAIS[c.pais] || ESCALAS_PAIS.reserva;
      contadores[c.pais] = contadores[c.pais] ?? 0;
      const color = c.color_override || escala[contadores[c.pais] % escala.length];
      contadores[c.pais]++;
      return { ...c, color_calculado: color };
    });
}

// ── Colores ANSI ─────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m',
  green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', gray: '\x1b[90m', magenta: '\x1b[35m',
  blue: '\x1b[34m',
};

function colorSwatch(hex) {
  // Map hex to nearest ANSI 256 color for terminal swatch (approximate)
  return `${C.gray}${hex}${C.reset}`;
}

// ── Reporte principal ─────────────────────────────────────────────────────────
let totalOk = 0, totalHuerfanos = 0, totalSinDatos = 0;

console.log(`\n${C.bold}═══════════════════════════════════════════════════════════════${C.reset}`);
console.log(`${C.bold}  AUDITORÍA DE COLORES — Atlas FDR Web${C.reset}`);
console.log(`${C.bold}  SVG dir: ${SVG_EXISTS ? svgBaseDir : '(no encontrado — solo auditando data-territorios)'}${C.reset}`);
console.log(`${C.bold}═══════════════════════════════════════════════════════════════${C.reset}\n`);

for (const t of TERRITORIOS) {
  if (!t.concesiones || t.concesiones.length === 0) continue;

  // Buscar SVG del territorio
  const svgDir = join(svgBaseDir, t.id);
  const svgFile = join(svgDir, `desktop-${t.numero}-${t.nombre.replace(/\s+/g, '-')}.svg`);

  // Intentar variantes de nombre de archivo
  let svgIds = null;
  if (SVG_EXISTS) {
    // Buscar cualquier desktop-*.svg en el directorio del territorio
    const tDir = join(svgBaseDir, t.id);
    if (existsSync(tDir)) {
      const files = readdirSync(tDir).filter(f => f.startsWith('desktop-') && f.endsWith('.svg'));
      if (files.length > 0) {
        svgIds = getSvgConcessionIds(join(tDir, files[0]));
      }
    }
  }

  const conColores = calcularColores(t.concesiones);
  const dataIds = new Set(t.concesiones.filter(c => c.svg_id).map(c => c.svg_id));
  const svgIdSet = svgIds ? new Set(svgIds) : null;

  let hayProblemas = false;
  const problemas = [];

  for (const c of conColores) {
    if (svgIdSet && !svgIdSet.has(c.svg_id)) {
      problemas.push({ tipo: 'huerfano', c });
      totalHuerfanos++;
      hayProblemas = true;
    } else {
      totalOk++;
    }
  }

  if (svgIdSet) {
    for (const sid of svgIdSet) {
      if (!dataIds.has(sid)) {
        problemas.push({ tipo: 'sin-datos', svg_id: sid });
        totalSinDatos++;
        hayProblemas = true;
      }
    }
  }

  // Header del territorio
  const statusIcon = hayProblemas ? `${C.yellow}⚠️ ` : `${C.green}✅ `;
  console.log(`${statusIcon}${C.bold}${t.numero} — ${t.nombre}${C.reset}  ${C.gray}(${t.id})${C.reset}`);

  // Tabla de concesiones con colores
  for (const c of conColores) {
    const enSvg = svgIdSet ? svgIdSet.has(c.svg_id) : null;
    const icono = enSvg === null ? '◌' : enSvg ? '●' : '✗';
    const iconoColor = enSvg === null ? C.gray : enSvg ? C.green : C.red;
    const cardColor = CARD_COLOR[c.pais] || '#888';

    console.log(
      `  ${iconoColor}${icono}${C.reset} ` +
      `${(c.nombre || c.svg_id).padEnd(24)}` +
      `${C.gray}${(c.pais || '').padEnd(12)}${C.reset}` +
      `SVG: ${C.cyan}${c.color_calculado}${C.reset}  ` +
      `Card: ${C.magenta}${cardColor}${C.reset}` +
      (c.color_override ? `  ${C.yellow}[override]${C.reset}` : '') +
      (enSvg === false ? `  ${C.red}← ID no existe en SVG${C.reset}` : '')
    );
  }

  // Concesiones en SVG sin datos
  const sinDatos = problemas.filter(p => p.tipo === 'sin-datos');
  if (sinDatos.length > 0) {
    console.log(`  ${C.yellow}── En SVG pero sin entrada en data-territorios:${C.reset}`);
    for (const p of sinDatos) {
      console.log(`  ${C.yellow}⚠${C.reset}  ${p.svg_id.padEnd(24)}${C.gray}← agregar a data-territorios.js${C.reset}`);
    }
  }

  console.log();
}

// ── Resumen ──────────────────────────────────────────────────────────────────
console.log(`${C.bold}═══════════════════════════════════════════════════════════════${C.reset}`);
console.log(`${C.bold}  RESUMEN${C.reset}`);
console.log(`  ${C.green}✅ Concesiones OK:              ${totalOk}${C.reset}`);
console.log(`  ${C.red}✗  IDs huérfanos (data sin SVG): ${totalHuerfanos}${C.reset}`);
console.log(`  ${C.yellow}⚠️  IDs en SVG sin datos:        ${totalSinDatos}${C.reset}`);
console.log(`${C.bold}═══════════════════════════════════════════════════════════════${C.reset}\n`);

if (totalHuerfanos > 0) {
  console.log(`${C.red}Acción requerida: los IDs marcados con ✗ deben crearse en Illustrator.${C.reset}`);
}
if (totalSinDatos > 0) {
  console.log(`${C.yellow}Acción requerida: los IDs marcados con ⚠️ deben agregarse a data-territorios.js con su país correcto.${C.reset}`);
}
