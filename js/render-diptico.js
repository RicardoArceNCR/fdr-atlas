import {
  getTerritorio,
  getBadgeClass,
  getLabelPais,
} from "./data-territorios.js";

const SVG_CACHE = {};

function getBreakpoint() {
  const width = window.innerWidth;
  if (width <= 767) return "mobile";
  if (width <= 977) return "tablet";
  return "desktop";
}

let lastBreakpoint = null;

window.addEventListener("resize", () => {
  const current = getBreakpoint();
  if (current !== lastBreakpoint) {
    lastBreakpoint = current;

    // Cancelar tour activo antes de recargar el mapa
    if (_tourActivo) {
      const idsTodos = Array.from(
        document.querySelectorAll('.concesion-card[data-svg-id]')
      ).map(c => c.dataset.svgId);
      const btn = document.getElementById('btn-tour-narrativo');
      if (btn) detenerTour(idsTodos, btn);
    }

    const id = document.body.dataset.territorio;
    const territorio = getTerritorio(id);
    if (territorio) renderMapa(territorio);
  }
});

async function init() {
  const id = document.body.dataset.territorio;
  if (!id) return;

  const territorio = getTerritorio(id);
  if (!territorio) {
    console.error(`Territorio no encontrado: ${id}`);
    return;
  }

  lastBreakpoint = getBreakpoint();

  try {
    const res = await fetch("../../templates/diptico-base.html");
    if (!res.ok) throw new Error("Error cargando el template");
    const html = await res.text();

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.prepend(container.firstElementChild);

    const diptico = document.getElementById("diptico-container");
    if (diptico) {
      diptico.dataset.layout = territorio.layout || "A";
      if (territorio.tema) diptico.classList.add(`diptico--tema-${territorio.tema}`);
    }

    renderHeader(territorio);
    renderMapa(territorio);
    renderStats(territorio);
    renderConcesiones(territorio);
    renderFuente(territorio);
    renderInsets(territorio);
    initToggleConcesiones();
  } catch (err) {
    console.error(err);
  }
}

function renderHeader(t) {
  const regionEl = document.getElementById("region-text");
  const tituloEl = document.getElementById("titulo-text");
  const pueblosEl = document.getElementById("pueblos-text");
  const descEl = document.getElementById("descripcion-text");
  const headerEl = document.getElementById("diptico-header");
  const logoEl = document.getElementById("header-logo");

  if (regionEl) regionEl.textContent = t.region || "";
  if (tituloEl) tituloEl.textContent = t.nombre || "Territorio desconocido";
  if (pueblosEl) pueblosEl.textContent = Array.isArray(t.pueblos) ? t.pueblos.join(" · ") : "";

  if (descEl) {
    if (t.descripcion && t.descripcion !== "—") {
      descEl.innerHTML = `<p>${t.descripcion}</p>`;
    } else {
      descEl.style.display = "none";
    }
  }

  if (headerEl && t.banner) {
    headerEl.style.backgroundImage = `url('${t.banner}')`;
    headerEl.style.backgroundSize = "cover";
    headerEl.style.backgroundPosition = "center";
    headerEl.classList.add("diptico__header--con-banner");
  }

  if (logoEl && t.logo) {
    logoEl.src = t.logo;
    logoEl.alt = t.logo_alt || "";
  }
}

function getMapAssets(t) {
  const bp = getBreakpoint();
  return (t.assets && t.assets[bp]) || {};
}

async function renderMapa(t) {
  const assets = getMapAssets(t);
  const svgContainer = document.getElementById("mapa-svg-inline");

  // Fallback visible si faltan assets — mensaje en el contenedor del mapa
  if (!t.assets || Object.keys(t.assets).length === 0) {
    if (svgContainer) {
      svgContainer.innerHTML = '<div style="padding:2rem;text-align:center;color:#888;font-family:sans-serif;font-size:14px">⚠️ Mapa en preparación</div>';
    }
    return;
  }

  const stack = document.querySelector(".mapa-stack");
  if (stack && assets.width && assets.height) {
    stack.style.aspectRatio = `${assets.width} / ${assets.height}`;
  }

  const raster = document.getElementById("mapa-raster");
  if (raster && assets.raster) raster.src = assets.raster;

  if (svgContainer && assets.svg) {
    try {
      if (!SVG_CACHE[assets.svg]) {
        const res = await fetch(assets.svg);
        if (!res.ok) throw new Error(`SVG no encontrado: ${assets.svg}`);
        SVG_CACHE[assets.svg] = await res.text();
      }
      const svgText = SVG_CACHE[assets.svg];

      const svgBase = assets.svg.substring(0, assets.svg.lastIndexOf('/') + 1);
      const svgResolved = svgText.replace(
        /(href|xlink:href)="((?!data:|http|\/)[^"]+)"/g,
        (match, attr, path) => `${attr}="${svgBase}${path}"`
      );

      svgContainer.innerHTML = svgResolved;

      const obj = document.getElementById("mapa-editorial-obj");
      if (obj) obj.style.display = "none";

      if (t.concesiones) initInteractividad(t.concesiones);
    } catch (err) {
      console.warn("No se pudo cargar SVG inline:", err);
      svgContainer.innerHTML = `<div style="padding:2rem;text-align:center;color:#c55;font-family:sans-serif;font-size:14px">⚠️ Error al cargar el mapa: ${err.message}</div>`;
    }
  }

  renderLeyenda(t);
}

function renderLeyenda(t) {
  const escalaEl = document.getElementById("escala-text");
  if (escalaEl) {
    if (t.escala && t.escala !== "—") {
      escalaEl.textContent = `Escala ${t.escala}`;
    } else {
      escalaEl.style.display = "none";
    }
  }

  const leyendaLista = document.getElementById("leyenda-lista");
  const leyendaContainer = document.querySelector(".diptico__leyenda-mapa");

  if (!t.concesiones || !Array.isArray(t.concesiones) || t.concesiones.length === 0) {
    if (leyendaContainer) leyendaContainer.style.display = "none";
  } else if (leyendaLista) {
    leyendaLista.innerHTML = "";
    const paises = [...new Set(t.concesiones.map(c => c.pais).filter(Boolean))];
    paises.forEach((pais) => {
      const div = document.createElement("div");
      div.className = "leyenda-item";

      const patron = document.createElement("div");
      patron.className = `leyenda-item__patron patron-${pais}`;

      const nombre = document.createElement("span");
      nombre.textContent = pais === "reserva" ? "Reserva Minera" : `Capital ${getLabelPais(pais)}`;

      div.appendChild(patron);
      div.appendChild(nombre);
      leyendaLista.appendChild(div);
    });
  }
}

function renderStats(t) {
  const container = document.querySelector(".diptico__stats");
  if (!t.stats) {
    if (container) container.style.display = "none";
    return;
  }

  const haTerritorio = document.getElementById("stat-ha-territorio");
  const concesiones = document.getElementById("stat-concesiones");
  const haConcesiones = document.getElementById("stat-ha-concesiones");

  if (haTerritorio) haTerritorio.textContent = t.stats.hectareas_territorio || "—";
  if (concesiones) concesiones.textContent = t.stats.concesiones !== undefined ? t.stats.concesiones : "—";
  if (haConcesiones) haConcesiones.textContent = t.stats.hectareas_concesiones || "—";
}

function renderConcesiones(t) {
  const lista = document.getElementById("concesiones-lista");
  const seccion = document.querySelector(".diptico__concesiones");

  if (!t.concesiones || !Array.isArray(t.concesiones) || t.concesiones.length === 0) {
    if (seccion) seccion.style.display = "none";
    return;
  }

  if (lista) {
    lista.innerHTML = "";
    t.concesiones.forEach((c) => {
      const card = document.createElement("div");
      card.className = "concesion-card";
      if (c.svg_id) card.dataset.svgId = c.svg_id;
      if (c.pais) card.dataset.pais = c.pais;

      const patron = document.createElement("div");
      if (c.patron_img) {
        patron.className = "concesion-card__patron";
        const img = document.createElement("img");
        img.src = c.patron_img;
        img.alt = "";
        img.className = "concesion-card__patron-img";
        patron.appendChild(img);
      } else {
        patron.className = `concesion-card__patron patron-${c.pais}`;
      }

      const info = document.createElement("div");
      info.innerHTML = `
        <div class="concesion-card__nombre">${c.nombre || "Sin nombre"}</div>
        <div class="concesion-card__empresa">${c.empresa && c.empresa !== "—" ? c.empresa : "Empresa sin identificar"}</div>
      `;

      const badge = document.createElement("div");
      badge.className = `concesion-card__badge ${getBadgeClass(c.pais)}`;
      badge.textContent = getLabelPais(c.pais);

      card.appendChild(patron);
      card.appendChild(info);
      card.appendChild(badge);
      lista.appendChild(card);
    });
  }
}

function renderFuente(t) {
  const f = document.getElementById("fuente-text");
  const logoFuente = document.getElementById("fuente-logo");

  if (logoFuente && t.logo_fuente) {
    logoFuente.src = t.logo_fuente;
    logoFuente.alt = t.logo_fuente_alt || "";
  }

  if (!f) return;
  if (!t.fuente) { f.style.display = "none"; return; }

  const tecnica = [t.proyeccion, t.datum && `Datum ${t.datum}`, t.zona && `Zona ${t.zona}`]
    .filter(Boolean).join(" · ");

  f.innerHTML = `<strong>Fuentes:</strong> ${t.fuente}${tecnica ? ` · ${tecnica}` : ""}`;
}

function renderInsets(t) {
  const container = document.getElementById("insets-container");
  if (!container) return;
  container.innerHTML = "";

  if (t.elementos_especiales && t.elementos_especiales.recuadros_detalle) {
    t.elementos_especiales.recuadros_detalle.forEach((inset) => {
      const el = document.createElement("div");
      el.className = "inset-detalle";
      if (inset.id) el.id = inset.id;
      el.innerHTML = `
        <div class="inset-detalle__titulo">${inset.titulo}</div>
        <div class="inset-detalle__escala">Escala ${inset.escala}</div>
      `;
      container.appendChild(el);
    });
  }
}

function initToggleConcesiones() {
  const panel = document.querySelector(".diptico__concesiones--mapa");
  const btn = document.querySelector(".diptico__toggle-concesiones");
  if (!panel || !btn) return;
  btn.addEventListener("click", () => panel.classList.toggle("is-collapsed"));
}

document.addEventListener("DOMContentLoaded", init);

/* ─── Interactividad SVG ↔ Panel ──────────────────────────────────────────── */

// Mapa canónico pais → ID del grupo SVG de bandera/leyenda
const PAIS_SVG_ID = {
  china: 'pais-china',
  canada: 'pais-canada',
  colombia: 'pais-colombia',
  nacional: 'pais-nicaragua',
  reserva: 'pais-reserva',
};

function getPaisEl(pais) {
  const id = PAIS_SVG_ID[pais];
  if (!id) return null;
  return document.getElementById(id)
    || (pais === 'reserva' ? document.getElementById('reserva') : null);
}

/**
 * Atenúa visualmente (vía clase CSS) la bandera de cualquier país que
 * no tenga concesiones en el territorio actual. Sin esto, las 5 banderas
 * de la leyenda siempre se ven igual de "presentes" sin importar cuántos
 * países realmente aparecen en el mapa — engañoso en territorios mono o
 * bipaís (Rama y Kriol, Creole de Bluefields, Wangki Li, etc.).
 */
function marcarPaisesSinConcesiones(concesiones) {
  const paisesPresentes = new Set(
    concesiones.filter(c => c.svg_id && c.pais).map(c => c.pais)
  );
  Object.keys(PAIS_SVG_ID).forEach((pais) => {
    const paisEl = getPaisEl(pais);
    if (!paisEl) return;
    paisEl.classList.toggle('pais-btn--sin-concesiones', !paisesPresentes.has(pais));
  });
}


/* ─── Sistema de colores dinámico por país ────────────────────────────────────
 *
 * Cada país tiene una escala de colores. El color se asigna automáticamente
 * según el orden de la concesión dentro del grupo del mismo país.
 * Se puede sobreescribir con color_override por concesión en data-territorios.js.
 *
 * Reemplaza todos los bloques hardcodeados de animación en diptico.css.
 * Nunca más tocar diptico.css para agregar una concesión nueva.
 * ─────────────────────────────────────────────────────────────────────────── */

const ESCALAS_PAIS = {
  china: ['#7a1a08', '#a82510', '#dd3519', '#f47317', '#f98838', '#fbb96a'],
  canada: ['#0d3d0d', '#1c621c', '#287a28', '#3d9e3d', '#6dbf6d', '#a8dfa8'],
  colombia: ['#2e0f6b', '#4a1d9e', '#5b21b6', '#7c3fd4', '#a472e8', '#ccb0f5'],
  nacional: ['#0f2347', '#193966', '#263fa8', '#3a5cc7', '#6b8de0', '#a4b8f0'],
  reserva: ['#1a1a1a', '#2e2e2e', '#394150', '#555f6e', '#8a949f', '#c0c7ce'],
};

const DASH_PAIS = {
  china: { array: '10 5', duration: '1.6s' },
  canada: { array: '12 6', duration: '2.4s' },
  colombia: { array: '8 6', duration: '2.0s' },
  nacional: { array: '8 8', duration: '2.8s' },
  reserva: { array: '4 12', duration: '4.0s' },
};

function inyectarCSSConcesiones(concesiones) {
  // Eliminar inyección anterior si existe (para re-renders por breakpoint)
  const anterior = document.getElementById('atlas-concesiones-css');
  if (anterior) anterior.remove();

  const contadores = {};
  const rules = [];

  concesiones
    .filter(c => c.svg_id && c.pais)
    .forEach(c => {
      const escala = ESCALAS_PAIS[c.pais] || ESCALAS_PAIS.reserva;
      const dash = DASH_PAIS[c.pais] || DASH_PAIS.reserva;

      // Índice dentro del grupo del mismo país
      contadores[c.pais] = contadores[c.pais] ?? 0;
      const color = c.color_override || escala[contadores[c.pais] % escala.length];
      contadores[c.pais]++;

      // Bloque A — animación del trazo punteado en el border
      rules.push(`
#${c.svg_id}.concesion--activa #border-${c.svg_id} {
  opacity: 1;
  stroke: ${color};
  stroke-dasharray: ${dash.array};
  stroke-dashoffset: 0;
  animation: dash-concesion ${dash.duration} linear infinite;
}`);

      // Bloque B — color del border en hover (stroke-opacity ya lo maneja diptico.css)
      rules.push(`
#mapa-svg-inline #${c.svg_id}.concesion--activa [id^="border-"] {
  stroke: ${color} !important;
}`);
    });

  const style = document.createElement('style');
  style.id = 'atlas-concesiones-css';
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
}

function initInteractividad(concesiones) {
  inyectarCSSConcesiones(concesiones);
  initTooltipPoblados();
  initHoverPaises(concesiones);
  initAnimacionNarrativa(concesiones);
  marcarPaisesSinConcesiones(concesiones);

  const todosLosIds = concesiones.filter(c => c.svg_id).map(c => c.svg_id);

  // Índice svg_id → pais para activar bandera desde hover de concesión
  const svgIdAPais = {};
  concesiones.forEach(c => { if (c.svg_id && c.pais) svgIdAPais[c.svg_id] = c.pais; });

  concesiones.forEach((c) => {
    if (!c.svg_id) return;

    const svgGroup = document.getElementById(c.svg_id);
    const card = document.querySelector(`.concesion-card[data-svg-id="${c.svg_id}"]`);

    // columbus: rect pequeño sin hit-area separado — usar el grupo raíz directamente.
    // Resto: buscar area-hover-target interno, fallback al grupo.
    const svgEl = (c.svg_id === 'columbus')
      ? svgGroup
      : (svgGroup?.querySelector('[id*="area-hover-target"], [data-role="hover-target"]') || svgGroup);

    if (!svgGroup || !svgEl || !card) return;

    svgEl.addEventListener("mouseenter", () => activar(svgGroup, card, todosLosIds, svgIdAPais));
    svgEl.addEventListener("mouseleave", () => desactivar(svgGroup, card, todosLosIds, svgIdAPais));
    card.addEventListener("mouseenter", () => activar(svgGroup, card, todosLosIds, svgIdAPais));
    card.addEventListener("mouseleave", () => desactivar(svgGroup, card, todosLosIds, svgIdAPais));
  });
}

function activar(svgEl, card, todosLosIds = [], svgIdAPais = {}) {
  svgEl.classList.add("concesion--activa");
  card.classList.add("concesion-card--activa");

  // Atenuar el resto de concesiones
  todosLosIds.forEach((id) => {
    if (id === svgEl.id) return;
    const otro = document.getElementById(id);
    if (otro) {
      otro.classList.add("concesion--atenuada");
      otro.classList.remove("concesion--activa");
    }
  });

  // Activar bandera del país correspondiente
  const pais = svgIdAPais[svgEl.id];
  const paisEl = getPaisEl(pais);
  paisEl?.classList.add('pais-btn--activo', 'pais--activo');
}

function desactivar(svgEl, card, todosLosIds = [], svgIdAPais = {}) {
  svgEl.classList.remove("concesion--activa");
  card.classList.remove("concesion-card--activa");

  todosLosIds.forEach((id) => {
    const otro = document.getElementById(id);
    if (otro) otro.classList.remove("concesion--atenuada", "concesion--activa");
  });

  // Desactivar bandera
  const pais = svgIdAPais[svgEl.id];
  const paisEl = getPaisEl(pais);
  paisEl?.classList.remove('pais-btn--activo', 'pais--activo');
}

/* ─── Tooltip de poblados ─────────────────────────────────────────────────── */

function initTooltipPoblados() {
  let tooltip = document.getElementById("mapa-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "mapa-tooltip";
    tooltip.className = "mapa-tooltip";
    document.querySelector(".diptico__mapa")?.appendChild(tooltip);
  }

  const poblados = [
    { id: "poblado-el-lanchon", nombre: "El Lanchón" },
    { id: "poblado-sukapin", nombre: "Sukat Pin" },
    { id: "poblado-cuarenta-y-tres", nombre: "Cuarenta y Tres" },
    { id: "poblado-mani-watla", nombre: "Mani Wátla" },
    { id: "poblado-kligna", nombre: "Kligna" },
    { id: "poblado-lapan", nombre: "Lapan" },
    { id: "poblado-yulu", nombre: "Yulú" },
  ];

  const mapaEl = document.querySelector(".diptico__mapa");

  poblados.forEach(({ id, nombre }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.style.cursor = "pointer";

    el.addEventListener("mouseenter", () => {
      tooltip.textContent = nombre;
      tooltip.classList.add("mapa-tooltip--visible");
    });

    el.addEventListener("mousemove", (e) => {
      const rect = mapaEl.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left + 14}px`;
      tooltip.style.top = `${e.clientY - rect.top - 10}px`;
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("mapa-tooltip--visible");
    });
  });
}

/* ─── Hover por país (bandera → concesiones) ──────────────────────────────── */

function initHoverPaises(concesiones) {
  const porPais = {};
  concesiones.forEach((c) => {
    if (!c.svg_id || !c.pais) return;
    if (!porPais[c.pais]) porPais[c.pais] = [];
    porPais[c.pais].push(c.svg_id);
  });

  const idsTodos = concesiones.filter(c => c.svg_id).map(c => c.svg_id);

  Object.entries(porPais).forEach(([pais, idsActivos]) => {
    const paisEl = getPaisEl(pais);
    if (!paisEl) return;

    paisEl.style.cursor = 'pointer';

    paisEl.addEventListener('mouseenter', () => {
      activarPais(idsActivos, idsTodos);
      paisEl.classList.add('pais-btn--activo', 'pais--activo');
    });

    paisEl.addEventListener('mouseleave', () => {
      desactivarPais(idsTodos);
      paisEl.classList.remove('pais-btn--activo', 'pais--activo');
    });
  });
}

function activarPais(idsActivos, idsTodos) {
  idsTodos.forEach((id) => {
    const svgEl = document.getElementById(id);
    const card = document.querySelector(`.concesion-card[data-svg-id="${id}"]`);

    if (idsActivos.includes(id)) {
      svgEl?.classList.add('concesion--activa');
      svgEl?.classList.remove('concesion--atenuada');
      card?.classList.add('concesion-card--activa');
      card?.classList.remove('concesion-card--atenuada');
    } else {
      svgEl?.classList.add('concesion--atenuada');
      svgEl?.classList.remove('concesion--activa');
      card?.classList.add('concesion-card--atenuada');
      card?.classList.remove('concesion-card--activa');
    }
  });
}

function desactivarPais(idsTodos) {
  idsTodos.forEach((id) => {
    const svgEl = document.getElementById(id);
    const card = document.querySelector(`.concesion-card[data-svg-id="${id}"]`);

    svgEl?.classList.remove('concesion--activa', 'concesion--atenuada');
    card?.classList.remove('concesion-card--activa', 'concesion-card--atenuada');
  });
}

/* ─── Animación narrativa por país ────────────────────────────────────────────
 *
 * Secuencia opt-in: China → Canadá → Nicaragua → Reserva (→ Colombia si existe)
 * Se lanza desde un botón inyectado debajo del panel de concesiones.
 * Reutiliza completamente activarPais / desactivarPais / getPaisEl existentes.
 * Sin nuevo CSS. Sin nueva infraestructura.
 *
 * API pública: initAnimacionNarrativa(concesiones)
 * ─────────────────────────────────────────────────────────────────────────── */

// Orden narrativo canónico — países con más concesiones primero
const ORDEN_NARRATIVO = ['china', 'canada', 'colombia', 'nacional', 'reserva'];

// Duración de cada paso en ms
const DURACION_PASO = 2800; // ms por paso de entrada
const DURACION_SALIDA = 180;  // ms entre cada concesión al revertir

// Estado interno del tour
let _tourTimers = [];
let _tourActivo = false;

function initAnimacionNarrativa(concesiones) {
  // Calcular qué países hay en este mapa (en orden narrativo)
  const paisesPresentes = ORDEN_NARRATIVO.filter(p =>
    concesiones.some(c => c.pais === p && c.svg_id)
  );
  const idsConSvg = concesiones.filter(c => c.svg_id);
  // El tour tiene sentido si hay algo que recorrer paso a paso: 2+ países,
  // o 1 país con 2+ concesiones (caso monopaís, ej. Rama y Kriol).
  if (paisesPresentes.length < 1) return;
  if (paisesPresentes.length < 1 || idsConSvg.length < 1) return;

  const idsTodos = concesiones.filter(c => c.svg_id).map(c => c.svg_id);

  // Agrupar svg_ids por país
  const porPais = {};
  concesiones.forEach(c => {
    if (!c.svg_id || !c.pais) return;
    if (!porPais[c.pais]) porPais[c.pais] = [];
    porPais[c.pais].push(c.svg_id);
  });

  // Inyectar el botón debajo del panel de concesiones
  const panel = document.querySelector('.diptico__concesiones--mapa');
  if (!panel) return;

  // Evitar duplicados en resize — reusar el botón si ya existe
  const btnExistente = document.getElementById('btn-tour-narrativo');
  if (btnExistente) btnExistente.remove();

  const btn = document.createElement('button');
  btn.id = 'btn-tour-narrativo';
  btn.type = 'button';
  btn.className = 'btn-tour-narrativo';
  btn.setAttribute('aria-label', 'Recorrer concesiones por país');
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <polygon points="3,1 13,7 3,13" fill="currentColor"/>
    </svg>
    <span>Recorrer por país</span>
  `;
  // Insertar el botón inline junto al título "Detalle de concesiones"
  const toggleBtn = panel.querySelector('.diptico__toggle-concesiones');
  if (toggleBtn) {
    toggleBtn.appendChild(btn);
  } else {
    panel.appendChild(btn);
  }

  btn.addEventListener('click', () => {
    if (_tourActivo) {
      detenerTour(idsTodos, btn);
    } else {
      lanzarTour(paisesPresentes, porPais, idsTodos, btn);
    }
  });

  // Cancelar tour si el usuario interactúa con cualquier elemento del mapa
  const mapaEl = document.querySelector('.diptico__mapa');
  if (mapaEl) {
    mapaEl.addEventListener('mousemove', () => {
      if (_tourActivo) {
        detenerTour(idsTodos, btn);
        sessionStorage.setItem(`tour-visto-${document.body.dataset.territorio}`, '1');
      }
    }, { passive: true });
  }

  // Autoplay — solo la primera vez en la sesión
  const SESSION_KEY = `tour-visto-${document.body.dataset.territorio}`;
  const yaVisto = sessionStorage.getItem(SESSION_KEY);

  if (!yaVisto) {
    setTimeout(() => {
      if (!_tourActivo) {
        lanzarTour(paisesPresentes, porPais, idsTodos, btn);
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    }, 1500);
  }
}

function encenderPais(idsActivos) {
  // Enciende concesiones de un país sin atenuar las demás
  idsActivos.forEach(id => {
    const svgEl = document.getElementById(id);
    const card = document.querySelector(`.concesion-card[data-svg-id="${id}"]`);
    svgEl?.classList.add('concesion--activa');
    svgEl?.classList.remove('concesion--atenuada');
    card?.classList.add('concesion-card--activa');
    card?.classList.remove('concesion-card--atenuada');
  });
}

function lanzarTour(pasos, porPais, idsTodos, btn) {
  _tourActivo = true;
  btn.querySelector('span').textContent = 'Detener';
  btn.classList.add('btn-tour-narrativo--activo');

  // Ocultar todas las capas SVG al inicio — aparecerán de una en una
  idsTodos.forEach(id => {
    const svgEl = document.getElementById(id);
    if (svgEl) svgEl.style.opacity = '0';
  });

  pasos.forEach((pais, i) => {
    const t1 = setTimeout(() => {
      // Aparecer cada concesión del país escalonada cada 300ms
      porPais[pais].forEach((id, j) => {
        setTimeout(() => {
          const svgEl = document.getElementById(id);
          if (svgEl) svgEl.style.opacity = '';   // vuelve al CSS normal
          encenderPais([id]);
        }, j * 300);
      });
      const paisEl = getPaisEl(pais);
      paisEl?.classList.add('pais-btn--activo', 'pais--activo');
    }, i * DURACION_PASO);

    _tourTimers.push(t1);
  });

  // Finalizar — revertir en orden inverso, más rápido
  const tFin = setTimeout(() => {
    // Construir lista plana de todas las concesiones en el orden en que aparecieron
    const ordenAparicion = pasos.flatMap(pais => porPais[pais]);
    const ordenInverso = [...ordenAparicion].reverse();

    // Apagar banderas todas de golpe
    pasos.forEach(pais => {
      getPaisEl(pais)?.classList.remove('pais-btn--activo', 'pais--activo');
    });

    // Apagar capas SVG y cards una por una en orden inverso
    // Primero desaparece el fill/patrón, luego el border como "eco"
    ordenInverso.forEach((id, i) => {
      const tSalida = setTimeout(() => {
        // 1. Quitar clase activa — desaparece el fill y la card
        const svgEl = document.getElementById(id);
        svgEl?.classList.remove('concesion--activa');
        svgEl?.style && (svgEl.style.opacity = '0');
        const card = document.querySelector(`.concesion-card[data-svg-id="${id}"]`);
        card?.classList.remove('concesion-card--activa');

        // 2. Border se apaga 350ms después — efecto de eco
        const tBorder = setTimeout(() => {
          const borderEl = document.getElementById(`border-${id}`);
          if (borderEl) {
            borderEl.style.opacity = '0';
            borderEl.style.transition = 'opacity 300ms ease';
          }
        }, 350);
        _tourTimers.push(tBorder);
      }, i * DURACION_SALIDA);
      _tourTimers.push(tSalida);
    });

    // Reset final — limpiar opacity inline de grupos y borders
    const tReset = setTimeout(() => {
      idsTodos.forEach(id => {
        const svgEl = document.getElementById(id);
        if (svgEl) svgEl.style.opacity = '';
        const borderEl = document.getElementById(`border-${id}`);
        if (borderEl) {
          borderEl.style.opacity = '';
          borderEl.style.transition = '';
        }
      });
      desactivarPais(idsTodos);
      _tourActivo = false;
      btn.querySelector('span').textContent = 'Recorrer por país';
      btn.classList.remove('btn-tour-narrativo--activo');
    }, ordenInverso.length * DURACION_SALIDA + 200);
    _tourTimers.push(tReset);

  }, pasos.length * DURACION_PASO + 600);

  _tourTimers.push(tFin);
}

function detenerTour(idsTodos, btn) {
  _tourTimers.forEach(clearTimeout);
  _tourTimers = [];
  _tourActivo = false;

  // Limpiar opacity inline de grupos y borders
  idsTodos.forEach(id => {
    const svgEl = document.getElementById(id);
    if (svgEl) svgEl.style.opacity = '';
    const borderEl = document.getElementById(`border-${id}`);
    if (borderEl) {
      borderEl.style.opacity = '';
      borderEl.style.transition = '';
    }
  });
  desactivarPais(idsTodos);
  Object.values(PAIS_SVG_ID).forEach(id => {
    document.getElementById(id)?.classList.remove('pais-btn--activo', 'pais--activo');
  });

  btn.querySelector('span').textContent = 'Recorrer por país';
  btn.classList.remove('btn-tour-narrativo--activo');
}