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
  document.getElementById('region-text').textContent = t.region;
  document.getElementById('titulo-text').textContent = t.nombre;
  document.getElementById('pueblos-text').textContent = t.pueblos.join(' · ');
  document.getElementById('descripcion-text').innerHTML = `<p>${t.descripcion}</p>`;
}

function renderMapa(t) {
  const img = document.getElementById('mapa-img');
  img.src = t.archivo_mapa;
  img.alt = `Mapa de ${t.nombre}`;

  if (t.escala && t.escala !== '—') {
    document.getElementById('escala-text').textContent = `Escala ${t.escala}`;
  } else {
    document.getElementById('escala-text').style.display = 'none';
  }

  const leyendaLista = document.getElementById('leyenda-lista');
  leyendaLista.innerHTML = '';

  const paises = [...new Set(t.concesiones.map(c => c.pais))];
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

function renderStats(t) {
  document.getElementById('stat-ha-territorio').textContent = t.stats.hectareas_territorio;
  document.getElementById('stat-concesiones').textContent = t.stats.concesiones;
  document.getElementById('stat-ha-concesiones').textContent = t.stats.hectareas_concesiones;
}

function renderConcesiones(t) {
  const lista = document.getElementById('concesiones-lista');
  lista.innerHTML = '';

  t.concesiones.forEach(c => {
    const card = document.createElement('div');
    card.className = 'concesion-card';

    const patron = document.createElement('div');
    patron.className = `concesion-card__patron patron-${c.pais}`;

    const info = document.createElement('div');
    info.innerHTML = `
      <div class="concesion-card__nombre">${c.nombre}</div>
      <div class="concesion-card__empresa">${c.empresa !== '—' ? c.empresa : 'Empresa sin identificar'}</div>
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

function renderFuente(t) {
  const f = document.getElementById('fuente-text');

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
