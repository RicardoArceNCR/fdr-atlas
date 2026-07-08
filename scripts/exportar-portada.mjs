#!/usr/bin/env node
/**
 * exportar-portada.mjs
 *
 * Genera el PDF de la portada + índice (atlas/index-2.html) con el mismo
 * criterio que scripts/exportar-pdfs.mjs (Playwright + Chromium, viewport
 * fijo 1450×940, media "screen", export.css inyectado). Se deja como
 * script aparte para no tocar exportar-pdfs.mjs.
 *
 * Uso:
 *   1. npm install && npx playwright install chromium   (si no lo hiciste ya)
 *   2. python3 -m http.server 8000   (en otra terminal, desde la raíz del proyecto)
 *   3. node scripts/exportar-portada.mjs
 *
 * Salida: PDFs/00-portada-indice.pdf
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const EXPORT_CSS = fs.readFileSync(path.join(__dirname, 'export.css'), 'utf8');

const BASE_URL = 'http://localhost:8000';
const OUT_DIR = path.join(ROOT, 'PDFs');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const url = `${BASE_URL}/atlas/index-2.html`;
const pdfPath = path.join(OUT_DIR, '00-portada-indice.pdf');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1450, height: 940 },
  locale: 'es-ES',
});

const page = await context.newPage();
process.stdout.write(`📄 portada-indice ... `);

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  // Mismo tratamiento que las páginas de territorio, aunque esta página
  // no tenga nav ni toggles que ocultar — mantiene el mismo patrón.
  await page.addStyleTag({ content: EXPORT_CSS });
  await page.evaluate(() => document.body.classList.add('exportando'));
  await page.waitForTimeout(300);

  // Forzar media screen — mismo motivo que en exportar-pdfs.mjs.
  await page.emulateMedia({ media: 'screen' });

  await page.pdf({
    path: pdfPath,
    width: '1450px',
    height: '940px',
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`✅ ${path.relative(ROOT, pdfPath)}`);
} catch (err) {
  console.log(`❌ ${err.message}`);
  process.exitCode = 1;
} finally {
  await page.close();
  await context.close();
  await browser.close();
}
