import {
  getTerritorio,
  getBadgeClass,
  getLabelPais,
} from "./data-territorios.js";

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

    const panel = document.querySelector(".diptico__concesiones--mapa");
    if (panel) {
      if (current === "mobile") {
        panel.classList.add("is-collapsed");
      } else {
        panel.classList.remove("is-collapsed");
      }
    }

    const id = document.body.dataset.territorio;
    const territorio = getTerritorio(id);

    if (territorio) {
      renderMapa(territorio);
    }
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

  if (regionEl) regionEl.textContent = t.region || "";
  if (tituloEl) tituloEl.textContent = t.nombre || "Territorio desconocido";
  if (pueblosEl)
    pueblosEl.textContent = Array.isArray(t.pueblos)
      ? t.pueblos.join(" · ")
      : "";
  if (descEl) {
    if (t.descripcion && t.descripcion !== "—") {
      descEl.innerHTML = `<p>${t.descripcion}</p>`;
    } else {
      descEl.style.display = "none";
    }
  }
}

function getMapAssets(t) {
  const bp = getBreakpoint();
  return (t.assets && t.assets[bp]) || {};
}

async function renderMapa(t) {
  const assets = getMapAssets(t);

  const stack = document.querySelector(".mapa-stack");
  if (stack && assets.width && assets.height) {
    stack.style.aspectRatio = `${assets.width} / ${assets.height}`;
  }

  const raster = document.getElementById("mapa-raster");
  if (raster && assets.raster) {
    raster.src = assets.raster;
  }

  const svgContainer = document.getElementById("mapa-svg-inline");
  if (svgContainer && assets.svg) {
    try {
      const res = await fetch(assets.svg);
      if (!res.ok) throw new Error(`SVG no encontrado: ${assets.svg}`);
      const svgText = await res.text();

      const svgBase = assets.svg.substring(0, assets.svg.lastIndexOf('/') + 1);
      const svgResolved = svgText.replace(
        /(href|xlink:href)="((?!data:|http|\/)[^"]+)"/g,
        (match, attr, path) => `${attr}="${svgBase}${path}"`
      );

      svgContainer.innerHTML = svgResolved;

      const obj = document.getElementById("mapa-editorial-obj");
      if (obj) obj.style.display = "none";

      if (t.concesiones) {
        initInteractividad(t.concesiones);
      }
    } catch (err) {
      console.warn("No se pudo cargar SVG inline:", err);
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

  if (
    !t.concesiones ||
    !Array.isArray(t.concesiones) ||
    t.concesiones.length === 0
  ) {
    if (leyendaContainer) leyendaContainer.style.display = "none";
  } else if (leyendaLista) {
    leyendaLista.innerHTML = "";
    const paises = [
      ...new Set(t.concesiones.map((c) => c.pais).filter(Boolean)),
    ];
    paises.forEach((pais) => {
      const div = document.createElement("div");
      div.className = "leyenda-item";

      const patron = document.createElement("div");
      patron.className = `leyenda-item__patron patron-${pais}`;

      const nombre = document.createElement("span");
      nombre.textContent =
        pais === "reserva" ? "Reserva Minera" : `Capital ${getLabelPais(pais)}`;

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

  if (haTerritorio)
    haTerritorio.textContent = t.stats.hectareas_territorio || "—";
  if (concesiones)
    concesiones.textContent =
      t.stats.concesiones !== undefined ? t.stats.concesiones : "—";
  if (haConcesiones)
    haConcesiones.textContent = t.stats.hectareas_concesiones || "—";
}

function renderConcesiones(t) {
  const lista = document.getElementById("concesiones-lista");
  const seccion = document.querySelector(".diptico__concesiones");

  if (
    !t.concesiones ||
    !Array.isArray(t.concesiones) ||
    t.concesiones.length === 0
  ) {
    if (seccion) seccion.style.display = "none";
    return;
  }

  if (lista) {
    lista.innerHTML = "";
    t.concesiones.forEach((c) => {
      const card = document.createElement("div");
      card.className = "concesion-card";
      if (c.svg_id) card.dataset.svgId = c.svg_id;

      const patron = document.createElement("div");
      patron.className = `concesion-card__patron patron-${c.pais}`;

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
  if (!f) return;

  if (!t.fuente) {
    f.style.display = "none";
    return;
  }

  let partes = [t.fuente];
  if (t.proyeccion) partes.push(`Proyección ${t.proyeccion}`);
  if (t.datum) partes.push(`Datum ${t.datum}`);
  if (t.zona) partes.push(`Zona ${t.zona}`);

  f.innerHTML = `<strong>Fuentes y datos cartográficos:</strong> ${partes.join(" · ")}`;
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

  if (getBreakpoint() === "mobile") {
    panel.classList.add("is-collapsed");
  }

  btn.addEventListener("click", () => {
    panel.classList.toggle("is-collapsed");
  });
}

document.addEventListener("DOMContentLoaded", init);

/* ─── Interactividad SVG ↔ Panel ──────────────────────────────────────────── */

function initInteractividad(concesiones) {
  initTooltipPoblados();

  // ── Mapa dinámico: pais (en datos) → ID del grupo pais-* en el SVG ──────
  // Se construye desde los datos del territorio, no hardcodeado.
  // Cubre todos los países del sistema incluyendo los que el SVG
  // puede nombrar de forma distinta (nacional → pais-nicaragua, reserva → reserva).
  const paisAsvgPaisId = {
    china:    'pais-china',
    canada:   'pais-canada',
    nacional: 'pais-nicaragua',
    colombia: 'pais-colombia',
    reserva:  'pais-reserva',  // usar este cuando el layer se llame pais-reserva
                                // si aún se llama "reserva", el fallback lo resuelve
  };

  // ── Mapa inverso: svg_id de concesión → ID del grupo pais-* en el SVG ───
  // Generado dinámicamente desde los datos. Funciona para cualquier territorio.
  const svgIdAPaisEl = {};
  concesiones.forEach((c) => {
    if (!c.svg_id || !c.pais) return;
    const paisSvgId = paisAsvgPaisId[c.pais];
    if (!paisSvgId) return;
    // Intentar encontrar el elemento en el DOM (puede variar por territorio)
    const el = document.getElementById(paisSvgId)
            || document.getElementById('reserva'); // fallback para reserva sin prefijo
    if (el) svgIdAPaisEl[c.svg_id] = el;
  });

  initHoverPaises(concesiones, paisAsvgPaisId);

  concesiones.forEach((c) => {
    if (!c.svg_id) return;

    const svgGroup = document.getElementById(c.svg_id);
    const svgEl = svgGroup?.querySelector('[id*="area-hover-target"], [data-role="hover-target"]') || svgGroup;
    const card = document.querySelector(`.concesion-card[data-svg-id="${c.svg_id}"]`);
    const paisEl = svgIdAPaisEl[c.svg_id] || null;

    if (!svgGroup || !svgEl || !card) return;

    svgEl.addEventListener("mouseenter", () => activar(svgGroup, card, paisEl));
    svgEl.addEventListener("mouseleave", () => desactivar(svgGroup, card, paisEl));
    card.addEventListener("mouseenter", () => activar(svgGroup, card, paisEl));
    card.addEventListener("mouseleave", () => desactivar(svgGroup, card, paisEl));
  });
}

/* ─── activar / desactivar ────────────────────────────────────────────────── */

function activar(svgEl, card, paisEl) {
  svgEl.classList.add("concesion--activa");
  card.classList.add("concesion-card--activa");
  // Activar animación de borde en la bandera del país correspondiente
  if (paisEl) paisEl.classList.add("pais--activo");
}

function desactivar(svgEl, card, paisEl) {
  svgEl.classList.remove("concesion--activa");
  card.classList.remove("concesion-card--activa");
  // Solo quitar pais--activo si no hay otro hover de país activo encima
  if (paisEl && !paisEl.matches(':hover')) {
    paisEl.classList.remove("pais--activo");
  }
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
    { id: "poblado-el-lanchon",      nombre: "El Lanchón" },
    { id: "poblado-sukapin",         nombre: "Sukat Pin" },
    { id: "poblado-cuarenta-y-tres", nombre: "Cuarenta y Tres" },
    { id: "poblado-mani-watla",      nombre: "Mani Wátla" },
    { id: "poblado-kligna",          nombre: "Kligna" },
    { id: "poblado-lapan",           nombre: "Lapan" },
    { id: "poblado-yulu",            nombre: "Yulú" },
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
      tooltip.style.top  = `${e.clientY - rect.top  - 10}px`;
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("mapa-tooltip--visible");
    });
  });
}

/* ─── Hover por país (bandera → concesiones en el mapa) ──────────────────── */

function initHoverPaises(concesiones, paisAsvgPaisId) {
  // Agrupar svg_ids por país desde los datos
  const porPais = {};
  concesiones.forEach((c) => {
    if (!c.svg_id || !c.pais) return;
    if (!porPais[c.pais]) porPais[c.pais] = [];
    porPais[c.pais].push(c.svg_id);
  });

  const idsTodos = concesiones.filter(c => c.svg_id).map(c => c.svg_id);

  // Para cada país que tenga concesiones, conectar el grupo pais-* en el SVG
  Object.entries(paisAsvgPaisId).forEach(([pais, svgPaisId]) => {
    // Intentar con el ID estándar, con fallback para reserva sin prefijo
    const paisEl = document.getElementById(svgPaisId)
                || (pais === 'reserva' ? document.getElementById('reserva') : null);
    if (!paisEl) return;

    const idsActivos = porPais[pais] || [];
    if (idsActivos.length === 0) return; // No hay concesiones de este país en este mapa

    paisEl.style.cursor = 'pointer';

    paisEl.addEventListener('mouseenter', () => {
      activarPais(idsActivos, idsTodos);
      // pais-btn--activo: drop-shadow existente
      // pais--activo: trigger de la animación de borde (nuevo)
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
    const el = document.getElementById(id);
    if (!el) return;
    if (idsActivos.includes(id)) {
      el.classList.add('concesion--activa');
      el.classList.remove('concesion--atenuada');
    } else {
      el.classList.add('concesion--atenuada');
      el.classList.remove('concesion--activa');
    }
  });
}

function desactivarPais(idsTodos) {
  idsTodos.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('concesion--activa', 'concesion--atenuada');
  });
}