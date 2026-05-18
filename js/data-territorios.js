/**
 * data-territorios.js
 * Datos estructurados de los 15 territorios del atlas.
 * Centraliza toda la información editorial — el HTML solo renderiza.
 *
 * Estado de los datos:
 *   ✅ = verificado con fuentes primarias (La Gaceta, FDR)
 *   ⚠️ = placeholder, pendiente de verificación con equipo FDR
 *
 * Países de capital válidos: 'china' | 'canada' | 'colombia' | 'nacional' | 'reserva'
 * Coinciden con los tokens CSS --concesion-pais-* y --concesion-tipo-*
 */

const TERRITORIOS = [

  /* ── 01 ── Rama y Kriol ────────────────────────────────────────────────── */
  {
    id: '01-rama-kriol',
    numero: '01',
    nombre: 'Rama y Kriol',
    archivo_mapa_base: '../../img/01-Territorio Rama y Kriol - limpio.png',
    layout: 'A',
    pueblos: ['Pueblo Rama', 'Comunidad Kriol'],
    region: 'Región Autónoma de la Costa Caribe Sur (RACCS)',
    descripcion: 'El territorio Rama y Kriol abarca la zona costera sur del Caribe nicaragüense. Tres concesiones mineras se superponen a este territorio, afectando áreas de importancia ecológica y cultural para el pueblo Rama y las comunidades Kriol.', // ⚠️ pendiente revisión
    escala: '—',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    stats: {
      hectareas_territorio: '404,000', // ⚠️ pendiente
      concesiones: 3,
      hectareas_concesiones: '—', // ⚠️ pendiente
    },
    concesiones: [
      {
        nombre: 'El Castillo',
        empresa: '—',       // ⚠️ pendiente
        pais: 'china',
        hectareas: '—',     // ⚠️ pendiente
        año: '—',           // ⚠️ pendiente
        estado: '—',        // ⚠️ activa / solicitud / suspendida
        gaceta: '—',        // ⚠️ número de La Gaceta
      },
      {
        nombre: 'La Guinea',
        empresa: '—',
        pais: 'china',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
      {
        nombre: 'Victoria',
        empresa: '—',
        pais: 'china',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
    ],
    fuente: 'Fuentes y datos cartográficos: Proyección UTM Datum NAD 27 Zona 16 N Fuente: La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI . Standard-Shaded Relief. Abril 2026',
  },

  /* ── 02 ── Creole de Bluefields ────────────────────────────────────────── */
  {
    id: '02-creole-bluefields',
    numero: '02',
    nombre: 'Creole de Bluefields',
    archivo_mapa_base: '../../img/02_Territorio Creole de Bluefields - limpio.png',
    layout: 'B',
    pueblos: ['Comunidad Creole'],
    region: 'Región Autónoma de la Costa Caribe Sur (RACCS)',
    descripcion: 'El territorio Creole de Bluefields tiene una única concesión minera activa que afecta la zona costera sur del territorio. La concesión Victoria representa una amenaza directa para los medios de vida pesqueros y la identidad cultural de la comunidad.', // ⚠️ pendiente
    escala: '—',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    elementos_especiales: {
      recuadros_detalle: [
        {
          id: "detalle_concesion",
          titulo: "Detalle — Concesión Victoria",
          escala: "—"
        }
      ]
    },
    stats: {
      hectareas_territorio: '—', // ⚠️ pendiente
      concesiones: 1,
      hectareas_concesiones: '—',
    },
    concesiones: [
      {
        nombre: 'Victoria',
        empresa: '—',
        pais: 'china',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
    ],
    fuente: 'Fuentes y datos cartográficos: Proyección UTM Datum NAD 27 Zona 16 N Fuente: La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI . Standard-Shaded Relief. Abril 2026',
  },

  /* ── 03 ── Waupasa Twi ─────────────────────────────────────────────────── */
  {
    id: '03-waupasa-twi',
    numero: '03',
    nombre: 'Waupasa Twi',
    assets: {
      desktop: {
        raster: "../../mapas-raster/03-waupasa-twi/desktop-03-Waupasa-Twi.webp",
        svg: "../../mapas-svg/03-waupasa-twi/desktop-03-Waupasa-Twi.svg",
        width: 927,
        height: 980,
      },
      tablet: {
        raster: "../../mapas-raster/03-waupasa-twi/tablet-03-Waupasa-Twi.webp",
        svg: "../../mapas-svg/03-waupasa-twi/tablet-03-Waupasa-Twi.svg",
        width: 780,
        height: 1306,
      },
      mobile: {
        raster: "../../mapas-raster/03-waupasa-twi/mobile-03-Waupasa-Twi.webp",
        svg: "../../mapas-svg/03-waupasa-twi/mobile-03-Waupasa-Twi.svg",
        width: 504,
        height: 634,
      },
    },
    layout: 'A',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/banners/logo-indio-maiz.webp',
    logo_alt: 'Indio Maíz Reserva Biológica',
    logo_fuente: '../../img/Logo-del-sitio-768x768.png',
    logo_fuente_alt: 'Fundación del Río',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: 'El territorio Waupasa Twi es el caso de mayor presión territorial del atlas. Nueve concesiones de capital de cuatro países distintos se superponen al territorio, cubriendo gran parte de su extensión y generando conflictos documentados con las comunidades miskitu.', // ⚠️ pendiente
    escala: '—',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    stats: {
      hectareas_territorio: '—', // ⚠️ pendiente
      concesiones: 9,
      hectareas_concesiones: '—',
    },
    concesiones: [
      { nombre: 'Caribe',        svg_id: 'caribe',        empresa: '—', pais: 'china',    patron_img: '../../img/patrones/china-sm.webp',    hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Columbus I',    svg_id: 'columbus',      empresa: '—', pais: 'china',    patron_img: '../../img/patrones/china-2xsm.webp',  hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto I',  svg_id: 'el-encanto-i',  empresa: '—', pais: 'china',    patron_img: '../../img/patrones/china-xl.webp',    hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: '—', pais: 'china',    patron_img: '../../img/patrones/china-md.webp',    hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Yulu Awaskira', svg_id: 'yulu-awaskira', empresa: '—', pais: 'china',    patron_img: '../../img/patrones/china-lg.webp',    hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Puerto Cabezas',svg_id: 'puerto-cabezas',empresa: '—', pais: 'nacional', patron_img: '../../img/patrones/nicaragua-sm.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Vanessa',       svg_id: 'vanessa',       empresa: '—', pais: 'nacional', patron_img: '../../img/patrones/nicaragua-2xsm.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara',    svg_id: 'walpa-tara',    empresa: '—', pais: 'canada',   patron_img: '../../img/patrones/canada-xl.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera',svg_id: 'reserva-minera',empresa: '—', pais: 'reserva',  patron_img: '../../img/patrones/reserva-sm.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'Fuentes y datos cartográficos: Proyección UTM Datum NAD 27 Zona 16 N Fuente: La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI . Standard-Shaded Relief. Abril 2026',
  },

  /* ── 04 ── Wangki Twi-Tasba Raya ───────────────────────────────────────── */
  {
    id: '04-wangki-twi-tasba-raya',
    numero: '04',
    nombre: 'Wangki Twi-Tasba Raya',
    archivo_mapa_base: '../../img/04_Wangki Twi-Tasba Raya.jpeg', // ⚠️ PNG pendiente
    layout: 'C',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: '—', // ⚠️ pendiente
    escala: 'Varias',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    elementos_especiales: {
      recuadros_detalle: [
        {
          id: "detalle_norte",
          titulo: "Detalle norte — Waspan",
          escala: "1:116,000"
        },
        {
          id: "detalle_sur",
          titulo: "Detalle sur",
          escala: "1:70,000"
        }
      ]
    },
    stats: {
      hectareas_territorio: '—',
      concesiones: 2,
      hectareas_concesiones: '—',
    },
    concesiones: [
      { nombre: 'El Encanto II', empresa: '—', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Waspan', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ también en 05
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 05 ── Wangki Li Aubra Tasbaya ─────────────────────────────────────── */
  {
    id: '05-wangki-li',
    numero: '05',
    nombre: 'Wangki Li Aubra Tasbaya',
    archivo_mapa_base: '../../mapas/05-wangki-li/mapa-limpio.png', // ⚠️ PNG pendiente
    layout: 'C',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: '—', // ⚠️ pendiente
    escala: '—',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    stats: {
      hectareas_territorio: '—',
      concesiones: 2,
      hectareas_concesiones: '—',
    },
    concesiones: [
      { nombre: 'Waspan', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ también en 04
      { nombre: 'Matusalén', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ confirmar país
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 07 ── Tuahka ──────────────────────────────────────────────────────── */
  {
    id: '07-tuahka',
    numero: '07',
    nombre: 'Tuahka',
    archivo_mapa_base: '../../mapas/07-tuahka/mapa-limpio.png', // ⚠️ PNG pendiente
    layout: 'A',
    pueblos: ['Pueblo Mayangna Tuahka'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: '—', // ⚠️ pendiente
    escala: '—',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    elementos_cartograficos: {
      poblados: true,
      rios: true,
      ubicacion_referencia: true
    },
    stats: {
      hectareas_territorio: '—',
      concesiones: 12, // ⚠️ confirmar número exacto
      hectareas_concesiones: '—',
    },
    concesiones: [
      { nombre: 'Rosita D', empresa: '—', pais: 'china', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'San Leonardo', empresa: '—', pais: 'china', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Salto', empresa: '—', pais: 'china', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Begonia', empresa: '—', pais: 'canada', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - RB II', empresa: 'HEMCO', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Rosita V', empresa: 'HEMCO', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Rosita IV', empresa: 'HEMCO', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Rosita VI', empresa: 'HEMCO', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Marsella', empresa: '—', pais: 'canada', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Nueva América H-I', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Rosita H-2', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Shaded Relief · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 06 y 08–15 ── Pendientes ──────────────────────────────────────────── */
  // Agregar aquí cuando se tengan los datos y PNG limpios

];

/**
 * Obtener territorio por id
 * @param {string} id — ejemplo: '01-rama-kriol'
 */
function getTerritorio(id) {
  return TERRITORIOS.find(t => t.id === id) || null;
}

/**
 * Obtener clase CSS del badge según país de capital
 * @param {string} pais
 */
function getBadgeClass(pais) {
  const clases = {
    china: 'badge-china',
    canada: 'badge-canada',
    colombia: 'badge-colombia',
    nacional: 'badge-nacional',
    reserva: 'badge-reserva',
  };
  return clases[pais] || 'badge-reserva';
}

/**
 * Obtener etiqueta legible del país
 * @param {string} pais
 */
function getLabelPais(pais) {
  const labels = {
    china: 'China',
    canada: 'Canadá',
    colombia: 'Colombia',
    nacional: 'Nicaragua',
    reserva: 'Reserva',
  };
  return labels[pais] || pais;
}

export { TERRITORIOS, getTerritorio, getBadgeClass, getLabelPais };