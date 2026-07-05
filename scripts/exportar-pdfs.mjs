#!/usr/bin/env node
/**
 * exportar-pdfs.mjs
 *
 * Genera PDF vectorial (texto editable + SVG editable + raster embebido)
 * de cada territorio del Atlas usando Playwright + Chromium.
 *
 * Uso:
 *   node scripts/exportar-pdfs.mjs                  # Exporta los 18 territorios
 *   node scripts/exportar-pdfs.mjs 01-rama-kriol     # Solo uno
 *   node scripts/exportar-pdfs.mjs 01-rama-kriol 03-waupasa-twi  # Varios
 *
 * Requisitos:
 *   1. npm install && npx playwright install chromium
 *   2. python3 -m http.server 8000  (en otra terminal, desde la raíz del proyecto)
 *   3. node scripts/exportar-pdfs.mjs
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Cargar datos ────────────────────────────────────────────────────────────
const DATA_FILE = path.join(ROOT, 'js', 'data-territorios.js');
const { TERRITORIOS } = await import(`file://${DATA_FILE}`);

// ── Leer CSS de export ──────────────────────────────────────────────────────
const EXPORT_CSS = fs.readFileSync(path.join(__dirname, 'export.css'), 'utf8');

// ── Configuración ───────────────────────────────────────────────────────────
const BASE_URL = 'http://localhost:8000';
const OUT_DIR = path.join(ROOT, 'PDFs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Mismo filtro que initNavegacion() en render-diptico.js — solo territorios con SVG real
const conAssets = TERRITORIOS.filter(
  t => t.assets?.desktop?.svg && t.assets.desktop.svg !== ''
);

const args = process.argv.slice(2);
const aExportar = args.length > 0
  ? conAssets.filter(t => args.includes(t.id))
  : conAssets;

if (aExportar.length === 0) {
  console.error('No se encontraron territorios para exportar.');
  if (args.length > 0) {
    console.error(`IDs solicitados: ${args.join(', ')}`);
    console.error(`IDs disponibles: ${conAssets.map(t => t.id).join(', ')}`);
  }
  process.exit(1);
}

// ── Lanzar browser ──────────────────────────────────────────────────────────
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1450, height: 940 },
  locale: 'es-ES',
});

// Suprimir tour auto-play antes de que render-diptico.js evalúe el sessionStorage
await context.addInitScript(() => {
  const id = document.body?.dataset?.territorio;
  if (id) sessionStorage.setItem(`tour-visto-${id}`, '1');
});

// ── Exportar ────────────────────────────────────────────────────────────────
let ok = 0;
let fail = 0;

for (const t of aExportar) {
  const url = `${BASE_URL}/atlas/${t.id}/index.html`;
  process.stdout.write(`📄 ${t.id} — ${t.nombre} ... `);

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#mapa-svg-inline svg', { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);

    // Inyectar CSS de export + marcar body
    await page.addStyleTag({ content: EXPORT_CSS });
    await page.evaluate(() => document.body.classList.add('exportando'));

    // Esperar a que los estilos se apliquen
    await page.waitForTimeout(300);

    // Forzar media screen — sin esto Chromium usa @media print y aplica
    // tamaños de fuente reducidos (12px), height: 100vh, etc. desde diptico.css
    await page.emulateMedia({ media: 'screen' });

    const pdfPath = path.join(OUT_DIR, `${t.id}.pdf`);
    await page.pdf({
      path: pdfPath,
      width: '1450px',
      height: '940px',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    console.log(`✅ ${t.id}.pdf`);
    ok++;
  } catch (err) {
    console.log(`❌ ${err.message}`);
    fail++;
  } finally {
    await page.close();
  }
}

await context.close();
await browser.close();

console.log(`\nHecho: ${ok} OK, ${fail} fallos — ${path.relative(ROOT, OUT_DIR)}/`);
process.exit(fail > 0 ? 1 : 0);
