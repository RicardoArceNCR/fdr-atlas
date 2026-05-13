import { getTerritorio, getBadgeClass, getLabelPais } from './data-territorios.js';

async function init() {
  const id = document.body.dataset.territorio;
  if (!id) return;

  const territorio = getTerritorio(id);
  if (!territorio) {
    console.error(`Territorio no encontrado: ${id}`);
    return;
  }

  try {
    const res = await fetch('../../templates/diptico-base.html');
    if (!res.ok) throw new Error('Error cargando el template');
    const html = await res.text();

    // Insertamos el template antes del script
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.prepend(container.firstElementChild);

    // Asignamos el layout
    const diptico = document.getElementById('diptico-container');
    if (diptico) {
      diptico.dataset.layout = territorio.layout || 'A';
    }

    renderHeader(territorio);
    renderMapa(territorio);
    renderStats(territorio);
    renderConcesiones(territorio);
    renderFuente(territorio);
    renderInsets(territorio);

  } catch (err) {
    console.error(err);
  }
}

function renderHeader(t) {
  const regionEl = document.getElementById('region-text');
  const tituloEl = document.getElementById('titulo-text');
  const pueblosEl = document.getElementById('pueblos-text');
  const descEl = document.getElementById('descripcion-text');

  if (regionEl) regionEl.textContent = t.region || '';
  if (tituloEl) tituloEl.textContent = t.nombre || 'Territorio desconocido';
  if (pueblosEl) pueblosEl.textContent = Array.isArray(t.pueblos) ? t.pueblos.join(' · ') : '';
  if (descEl) {
    if (t.descripcion && t.descripcion !== '—') {
      descEl.innerHTML = `<p>${t.descripcion}</p>`;
    } else {
      descEl.style.display = 'none';
    }
  }
}

function renderMapa(t) {
  const img = document.getElementById('mapa-img');
  if (img) {
    if (t.archivo_mapa) {
      img.src = t.archivo_mapa;
      img.alt = `Mapa de ${t.nombre || 'Territorio'}`;
    } else {
      img.style.display = 'none';
    }
  }

  const escalaEl = document.getElementById('escala-text');
  if (escalaEl) {
    if (t.escala && t.escala !== '—') {
      escalaEl.textContent = `Escala ${t.escala}`;
    } else {
      escalaEl.style.display = 'none';
    }
  }

  const leyendaLista = document.getElementById('leyenda-lista');
  const leyendaContainer = document.querySelector('.diptico__leyenda-mapa');

  if (!t.concesiones || !Array.isArray(t.concesiones) || t.concesiones.length === 0) {
    if (leyendaContainer) leyendaContainer.style.display = 'none';
  } else if (leyendaLista) {
    leyendaLista.innerHTML = '';
    const paises = [...new Set(t.concesiones.map(c => c.pais).filter(Boolean))];
    paises.forEach(pais => {
      const div = document.createElement('div');
      div.className = 'leyenda-item';

      const patron = document.createElement('div');
      patron.className = `leyenda-item__patron patron-${pais}`;

      const nombre = document.createElement('span');
      nombre.textContent = pais === 'reserva' ? 'Reserva Minera' : `Capital ${getLabelPais(pais)}`;

      div.appendChild(patron);
      div.appendChild(nombre);
      leyendaLista.appendChild(div);
    });
  }
}

function renderStats(t) {
  const container = document.querySelector('.diptico__stats');
  if (!t.stats) {
    if (container) container.style.display = 'none';
    return;
  }

  const haTerritorio = document.getElementById('stat-ha-territorio');
  const concesiones = document.getElementById('stat-concesiones');
  const haConcesiones = document.getElementById('stat-ha-concesiones');

  if (haTerritorio) haTerritorio.textContent = t.stats.hectareas_territorio || '—';
  if (concesiones) concesiones.textContent = t.stats.concesiones !== undefined ? t.stats.concesiones : '—';
  if (haConcesiones) haConcesiones.textContent = t.stats.hectareas_concesiones || '—';
}

function renderConcesiones(t) {
  const lista = document.getElementById('concesiones-lista');
  const seccion = document.querySelector('.diptico__concesiones');

  if (!t.concesiones || !Array.isArray(t.concesiones) || t.concesiones.length === 0) {
    if (seccion) seccion.style.display = 'none';
    return;
  }

  if (lista) {
    lista.innerHTML = '';
    t.concesiones.forEach(c => {
      const card = document.createElement('div');
      card.className = 'concesion-card';

      const patron = document.createElement('div');
      patron.className = `concesion-card__patron patron-${c.pais}`;

      const info = document.createElement('div');
      info.innerHTML = `
        <div class="concesion-card__nombre">${c.nombre || 'Sin nombre'}</div>
        <div class="concesion-card__empresa">${c.empresa && c.empresa !== '—' ? c.empresa : 'Empresa sin identificar'}</div>
      `;

      const badge = document.createElement('div');
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
  const f = document.getElementById('fuente-text');
  if (!f) return;

  if (!t.fuente) {
    f.style.display = 'none';
    return;
  }

  let partes = [t.fuente];
  if (t.proyeccion) partes.push(`Proyección ${t.proyeccion}`);
  if (t.datum) partes.push(`Datum ${t.datum}`);
  if (t.zona) partes.push(`Zona ${t.zona}`);

  f.innerHTML = `<strong>Fuentes y datos cartográficos:</strong> ${partes.join(' · ')}`;
}

function renderInsets(t) {
  const container = document.getElementById('insets-container');
  if (!container) return;
  container.innerHTML = '';

  if (t.elementos_especiales && t.elementos_especiales.recuadros_detalle) {
    t.elementos_especiales.recuadros_detalle.forEach(inset => {
      const el = document.createElement('div');
      el.className = 'inset-detalle';
      if (inset.id) el.id = inset.id;
      el.innerHTML = `
        <div class="inset-detalle__titulo">${inset.titulo}</div>
        <div class="inset-detalle__escala">Escala ${inset.escala}</div>
      `;
      container.appendChild(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
