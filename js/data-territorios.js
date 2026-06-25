/**
 * data-territorios.js
 * Datos estructurados de los 15 territorios del atlas.
 * Centraliza toda la información editorial — el HTML solo renderiza.
 *
 * Estado de los datos:
 *   ✅ = verificado con fuentes primarias (La Gaceta, FDR)
 *   ⚠️ = placeholder, pendiente de verificación con equipo FDR
 *
 * Países de capital válidos: 'china' | 'canada' | 'colombia' | 'nacional' | 'reserva' | 'sin-nombre'
 * Coinciden con los tokens CSS --concesion-pais-* y --concesion-tipo-*
 */

const TERRITORIOS = [

  /* ── 01 ── Rama y Kriol ────────────────────────────────────────────────── */
  /*
   * AUDIT SVG — 01-Territorio_Rama_y_Kriol.svg (Jun 2026)
   *
   * Grupos con ID propio:
   *   ✅ victoria       → border-victoria + area-hover-target ← OK
   *   ⚠️ el-castillo   → sin grupo propio aún (geometría sin ID)
   *   ⚠️ la-guinea     → sin grupo propio aún (geometría sin ID)
   *
   * Poblados con ID: poblado-el-lanchon, poblado-sukapin, poblado-cuarenta-y-tres,
   *   poblado-mani-watla, poblado-kligna, poblado-lapan, poblado-yulu
   *   (cada uno tiene variantes: -1, -2 para clusters — el tooltip usa el primero)
   *
   * Pendiente en Illustrator:
   *   → Crear grupos <g id="el-castillo"> y <g id="la-guinea"> con
   *     area-main, area-main-hover, border-el-castillo / border-la-guinea
   *     y area-hover-target (fill ≠ none, opacity 0)
   */
  {
    id: '01-rama-kriol',
    numero: '01',
    nombre: 'Rama y Kriol',
    assets: {
      desktop: {
        raster: '../../mapas-raster/01-rama-kriol/desktop-01-Rama-Kriol.webp',
        svg: '../../mapas-svg/01-rama-kriol/desktop-01-Rama-Kriol.svg',
        width: 927,
        height: 980,
      },
      // ⚠️ tablet y mobile pendientes — usar desktop como fallback por ahora
      tablet: {
        raster: '../../mapas-raster/01-rama-kriol/desktop-01-Rama-Kriol.webp',
        svg: '../../mapas-svg/01-rama-kriol/desktop-01-Rama-Kriol.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/01-rama-kriol/desktop-01-Rama-Kriol.webp',
        svg: '../../mapas-svg/01-rama-kriol/desktop-01-Rama-Kriol.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'A',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    pueblos: ['Pueblo Rama', 'Comunidad Kriol'],
    region: 'Región Autónoma de la Costa Caribe Sur (RACCS)',
    descripcion: 'Se ubica en el sureste de Nicaragua, entre la Región Autónoma de la Costa Caribe Sur y el departamento de Río San Juan. Comprende 9 comunidades: 7 de la etnia Rama y 3 comunidades afrodescendientes Kriol. Cuenta con una población estimada de 1,936 habitantes.',
    proyeccion: 'UTM',
    datum: 'NAD 27',
    zona: '16 N',
    stats: {
      hectareas_territorio: '406,849.30',
      concesiones: 3,
      hectareas_concesiones: '53,865.96',
    },
    concesiones: [
      {
        nombre: 'Victoria',
        svg_id: 'victoria',          // ✅ grupo existe en SVG
        empresa: '—',                 // ⚠️ pendiente
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
      {
        nombre: 'El Castillo',
        svg_id: 'el-castillo',       // ⚠️ pendiente — agregar grupo en Illustrator
        empresa: '—',
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
      {
        nombre: 'La Guinea',
        svg_id: 'la-guinea',         // ⚠️ pendiente — agregar grupo en Illustrator
        empresa: '—',
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
    ],
    fuente: 'La Gaceta, Fundación del Río, URACCAN, OpenStreetMap contributors, ESRI Standard-Shaded Relief. Abril 2026',
  },

  /* ── 02 ── Creole de Bluefields ────────────────────────────────────────── */
  {
    id: '02-creole-bluefields',
    numero: '02',
    nombre: 'Negro Creole de Bluefields',
    assets: {
      desktop: {
        raster: '../../mapas-raster/02-creole-bluefields/desktop-02-Creole-Bluefields.webp',
        svg: '../../mapas-svg/02-creole-bluefields/desktop-02-Creole-Bluefields.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/02-creole-bluefields/desktop-02-Creole-Bluefields.webp',
        svg: '../../mapas-svg/02-creole-bluefields/desktop-02-Creole-Bluefields.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/02-creole-bluefields/desktop-02-Creole-Bluefields.webp',
        svg: '../../mapas-svg/02-creole-bluefields/desktop-02-Creole-Bluefields.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    pueblos: ['Comunidad Creole'],
    region: 'Región Autónoma de la Costa Caribe Sur (RACCS)',
    descripcion: 'Se ubica en el sur de Nicaragua, en la Región Autónoma de la Costa Caribe Sur. Comprende 4 comunidades, todas afrodescendientes Creole. Cuenta con una población estimada de 21,868 habitantes. El Estado de Nicaragua solo ha titulado el 7% del territorio que corresponde por derecho a la comunidad afrodescendiente.',
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
      hectareas_territorio: '94,050.09',
      concesiones: 1,
      hectareas_concesiones: '128.64',
    },
    concesiones: [
      {
        nombre: 'Victoria',
        svg_id: 'victoria',
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
    nombre: 'Twi Waupasa', // nombre anterior en el proyecto: 'Waupasa Twi'
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
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 14 comunidades, todas indígenas de la etnia Miskitu. Cuenta con una población estimada de 1,547 familias que representan aproximadamente 7,500 a 9,000 habitantes.',
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
      hectareas_territorio: '128,699.8',
      concesiones: 8, // ⚠️ array `concesiones` tiene 9 items — falta depurar antes de que el número sea consistente
      hectareas_concesiones: '55,154.07',
    },
    concesiones: [
      { nombre: 'Caribe', svg_id: 'caribe', empresa: '—', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Columbus I', svg_id: 'columbus', empresa: '—', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto I', svg_id: 'el-encanto-i', empresa: '—', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: '—', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Yulu Awaskira', svg_id: 'yulu-awaskira', empresa: '—', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Puerto Cabezas', svg_id: 'puerto-cabezas', empresa: '—', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Vanessa', svg_id: 'vanessa', empresa: '—', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara', svg_id: 'walpa-tara', empresa: '—', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    fuente: '',
  },

  /* ── 04 ── Wangki Twi-Tasba Raya ───────────────────────────────────────── */
  /*
   * ⚠️ Stopgap: raster JPEG existente, sin SVG interactivo (pendiente Illustrator).
   * El mapa se ve como imagen estática, sin hover ni tour.
   * Reemplazar con assets.svg cuando Illustrator exporte el SVG con grupos id, border-*, area-hover-target.
   */
  {
    id: '04-wangki-twi-tasba-raya',
    numero: '04',
    nombre: 'Wangki Twi-Tasba Raya',
    assets: {
      desktop: {
        raster: '../../img/04_Wangki Twi-Tasba Raya.jpeg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../img/04_Wangki Twi-Tasba Raya.jpeg',
        width: 780,
        height: 1306,
      },
      mobile: {
        raster: '../../img/04_Wangki Twi-Tasba Raya.jpeg',
        width: 504,
        height: 634,
      },
    },
    layout: 'C',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Está conformado por 21 comunidades indígenas de la etnia Miskitu. Cuenta con una población estimada de 18,114 habitantes.',
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
      hectareas_territorio: '162,181.60',
      concesiones: 2,
      hectareas_concesiones: '489.40',
    },
    concesiones: [
      { nombre: 'El Encanto II', empresa: '—', pais: 'colombia', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Waspan', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ también en 05
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 05 ── Wangki Li Aubra Tasbaya ─────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '05-wangki-li',
    numero: '05',
    nombre: 'Wangki Li Aubra Tasbaya',
    assets: {
      desktop: {
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li-Aubra-Tasbaya.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'C',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 18 comunidades indígenas de la etnia Miskitu. Cuenta con una población estimada de 7,991 habitantes.',
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
      hectareas_territorio: '88,434.78',
      concesiones: 2,
      hectareas_concesiones: '13,083.22',
    },
    concesiones: [
      { nombre: 'Waspan', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ también en 04
      { nombre: 'Matusalén', empresa: '—', pais: 'nacional', hectareas: '—', año: '—', estado: '—', gaceta: '—' }, // ⚠️ confirmar país
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 07 ── Tuahka Takaln Balna ──────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '07-tuahka',
    numero: '07',
    nombre: 'Tuahka Takaln Balna', // nombre anterior en el proyecto: 'Tuahka'
    assets: {
      desktop: {
        raster: '../../mapas-raster/07-tuahka/desktop-07-Tuahka.webp',
        svg: '../../mapas-svg/07-tuahka/desktop-07-Tuahka.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/07-tuahka/desktop-07-Tuahka.webp',
        svg: '../../mapas-svg/07-tuahka/desktop-07-Tuahka.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/07-tuahka/desktop-07-Tuahka.webp',
        svg: '../../mapas-svg/07-tuahka/desktop-07-Tuahka.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'A',
    pueblos: ['Pueblo Mayangna Tuahka'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 14 comunidades indígenas de la etnia Mayangna. Cuenta con una población estimada de 8,716 habitantes.',
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
      hectareas_territorio: '54,556.36',
      concesiones: 13, // ⚠️ array `concesiones` tiene 12 items — falta 1 concesión
      hectareas_concesiones: '48,362.78',
    },
    concesiones: [
      // ── Lista completa según PDF Tuahka (Abril 2026) ────────────────────────
      // ⏳ = aún sin grupo en SVG. Al crearlo con el svg_id exacto, se activa solo.
      // IDs sin-nombre deben ser sin-nombre-1, sin-nombre-2, sin-nombre-3...
      // Si Illustrator auto-nombra sin-nombre-21, renombrarlo a sin-nombre-3 en el panel.
      { nombre: 'Rosita D', svg_id: 'rosita-d', pais: 'china', empresa: 'Empresa sin identificar', hectareas: '—' },
      { nombre: 'San Leonardo', svg_id: 'san-leonardo', pais: 'china', empresa: 'Thomas Metal', hectareas: '1711.6' },
      { nombre: 'El Salto', svg_id: 'el-salto', pais: 'china', empresa: 'Empresa sin identificar', hectareas: '—' },
      { nombre: 'Begonia', svg_id: 'begonia', pais: 'canada', empresa: 'Empresa sin identificar', hectareas: '—' }, // ⏳
      { nombre: 'Marsella', svg_id: 'marsella', pais: 'canada', empresa: 'Empresa sin identificar', hectareas: '—' },
      { nombre: 'HEMCO - RB II', svg_id: 'hemco-rb-ii', pais: 'colombia', empresa: 'HEMCO', hectareas: '—' },
      { nombre: 'HEMCO - Rosita V', svg_id: 'hemco-rosita-v', pais: 'colombia', empresa: 'HEMCO', hectareas: '—' },
      { nombre: 'HEMCO - Rosita IV', svg_id: 'hemco-rosita-iv', pais: 'colombia', empresa: 'HEMCO', hectareas: '—' }, // ⏳
      { nombre: 'HEMCO - Rosita VI', svg_id: 'hemco-rosita-vi', pais: 'colombia', empresa: 'HEMCO', hectareas: '—' }, // ⏳
      { nombre: 'Nueva América H-I', svg_id: 'nueva-america-h-i', pais: 'nacional', empresa: 'Empresa sin identificar', hectareas: '—' }, // ⏳
      { nombre: 'Rosita H-2', svg_id: 'rosita-h-2', pais: 'nacional', empresa: 'Empresa sin identificar', hectareas: '—' },
      { nombre: 'Sin nombre', svg_id: 'sin-nombre-1', pais: 'sin-nombre', empresa: '—', hectareas: '—' },
      { nombre: 'Sin nombre', svg_id: 'sin-nombre-2', pais: 'sin-nombre', empresa: '—', hectareas: '—' },
      { nombre: 'Sin nombre', svg_id: 'sin-nombre-3', pais: 'sin-nombre', empresa: '—', hectareas: '—' }, // SVG tiene sin-nombre-21 → renombrar a sin-nombre-3
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Shaded Relief · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 06 ── Twi Yahbra (Diez comunidades) ───────────────────────────────── */
  /*
   * ⚠️ Solo desktop por ahora — tablet y mobile usan el mismo raster/SVG como fallback.
   * Reemplazar con assets específicos cuando existan.
   */
  {
    id: '06-twi-ahbra-10-comunidades',
    numero: '06',
    nombre: 'Twi Yahbra (Diez comunidades)', // nombre anterior en el proyecto: 'Twi Ahbra 10 comunidades'
    assets: {
      desktop: {
        raster: '../../mapas-raster/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.webp',
        svg: '../../mapas-svg/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.webp',
        svg: '../../mapas-svg/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.webp',
        svg: '../../mapas-svg/06-twi-ahbra-10-comunidades/desktop-06-Twi-Ahbra-10-Comunidades.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 21 comunidades, todas indígenas de la etnia Miskitu. Cuenta con una población estimada de 9,736 habitantes.',
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
      hectareas_territorio: '159,138.58',
      concesiones: 1,
      hectareas_concesiones: '15,786.81',
    },
    concesiones: [
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: 'Zhong Fu Development', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '15786.8', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 08 ── Tasba Pri Matriz Indígena ───────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '08-tasba-pri',
    numero: '08',
    nombre: 'Tasba Pri Matriz Indígena',
    assets: {
      desktop: {
        raster: '../../mapas-raster/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.webp',
        svg: '../../mapas-svg/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.webp',
        svg: '../../mapas-svg/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.webp',
        svg: '../../mapas-svg/08-tasba-pri/desktop-08-Tasba-Pri-Matriz-Indigena.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'A',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 29 comunidades, todas indígenas de la etnia Miskitu. Cuenta con una población estimada de 8,484 habitantes.',
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
      hectareas_territorio: '79,897.71',
      concesiones: 7,
      hectareas_concesiones: '66,930.69',
    },
    concesiones: [
      { nombre: 'Camelia', svg_id: 'camelia', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '248.0', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Columbus I', svg_id: 'columbus-i', empresa: 'Zhong Fu Devolopment SA', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '13567.3', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Bongo de Hidalgo', svg_id: 'el-bongo-de-hidalgo', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '11467.9', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto I', svg_id: 'el-encanto-i', empresa: 'Zhong Fu Development', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '11423.9', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: 'Zhong Fu Development', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '8451.4', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara', svg_id: 'walpa-tara', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '13124.6', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 09 ── Prinzu Awala ────────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '09-prinzu-awala',
    numero: '09',
    nombre: 'Prinzu Awala',
    assets: {
      desktop: {
        raster: '../../mapas-raster/09-prinzu-awala/desktop-09-Prinzu-Awala.webp',
        svg: '../../mapas-svg/09-prinzu-awala/desktop-09-Prinzu-Awala.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/09-prinzu-awala/desktop-09-Prinzu-Awala.webp',
        svg: '../../mapas-svg/09-prinzu-awala/desktop-09-Prinzu-Awala.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/09-prinzu-awala/desktop-09-Prinzu-Awala.webp',
        svg: '../../mapas-svg/09-prinzu-awala/desktop-09-Prinzu-Awala.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'A',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 19 comunidades indígenas de la etnia Miskitu. Cuenta con una población estimada de 5,372 habitantes.',
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
      hectareas_territorio: '414,955.40',
      concesiones: 8,
      hectareas_concesiones: '164,206.94',
    },
    concesiones: [
      { nombre: 'Atlas', svg_id: 'atlas', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '8515.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Begonia', svg_id: 'begonia', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '47156.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Casiopea', svg_id: 'casiopea', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '26684.8', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Centauro', svg_id: 'centauro', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '2394.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Minerva', svg_id: 'minerva', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '2159.5', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Pegaso', svg_id: 'pegaso', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '12334.6', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Polaris', svg_id: 'polaris', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '16575.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'San Leonardo', svg_id: 'san-leonardo', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '1711.6', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 10 ── Mayangna Sauni Bas "Sikilta" ────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '10-mayangna-sauni-bas',
    numero: '10',
    nombre: 'Mayangna Sauni Bas "Sikilta"', // nombre anterior en el proyecto: 'Mayangna Sauni Bas'
    assets: {
      desktop: {
        raster: '../../mapas-raster/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.webp',
        svg: '../../mapas-svg/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.webp',
        svg: '../../mapas-svg/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.webp',
        svg: '../../mapas-svg/10-mayangna-sauni-bas/desktop-10-Mayangna-Sauni-Bas.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'C',
    pueblos: ['Pueblo Mayangna'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'El territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 1 comunidad de la etnia Mayangna. Cuenta con una población estimada de 870 habitantes.',
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
      hectareas_territorio: '43,241.16',
      concesiones: 4,
      hectareas_concesiones: '4,220.30',
    },
    concesiones: [
      { nombre: 'ASA', svg_id: 'asa', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '374.9', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Deseo', svg_id: 'el-deseo', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '2242.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Hormiguero', svg_id: 'el-hormiguero', empresa: 'Brother Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '1502.0', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Veracruz', svg_id: 'veracruz', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '7.0', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 11 ── Mayangna Sauni As ───────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '11-mayangna-sauni-as',
    numero: '11',
    nombre: 'Mayangna Sauni As',
    assets: {
      desktop: {
        raster: '../../mapas-raster/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.webp',
        svg: '../../mapas-svg/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.webp',
        svg: '../../mapas-svg/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.webp',
        svg: '../../mapas-svg/11-mayangna-sauni-as/desktop-11-Mayangna-Sauni-As.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'A',
    pueblos: ['Pueblo Mayangna'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, entre la Región Autónoma de la Costa Caribe Norte y el departamento de Jinotega. Comprende 16 comunidades, todas indígenas de la etnia Mayangna. Cuenta con una población estimada de 10,000 habitantes.',
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
      hectareas_territorio: '163,810',
      concesiones: 7,
      hectareas_concesiones: '13,609.22',
    },
    concesiones: [
      { nombre: 'Bonanza H-I', svg_id: 'bonanza-h-i', empresa: 'HEMCO Nicaragua, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '1.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HB - V', svg_id: 'hb-v', empresa: 'HEMCO Nicaragua, S. A. (HEMCONIC)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '894.0', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Bonanza IV', svg_id: 'hemco-bonanza-iv', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '460.7', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Bonanza V', svg_id: 'hemco-bonanza-v', empresa: 'HEMCO Nicaragua, S. A. (HEMCONIC)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '1327.8', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Kukalaya', svg_id: 'kukalaya', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '84.7', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Matusalén', empresa: 'GLOBAL GROUP, SOCIEDAD ANONIMA', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '4192.4', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Waspan', svg_id: 'waspan', empresa: 'Zhong Fu Development', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '6648.5', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 12 ── Mayangna Sauni Arungka "Matunbak" ──────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '12-mayangna-arungka-matungbak',
    numero: '12',
    nombre: 'Mayangna Sauni Arungka "Matunbak"', // nombre anterior en el proyecto: 'Masauni Arumatun'
    assets: {
      desktop: {
        raster: '../../mapas-raster/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.webp',
        svg: '../../mapas-svg/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.webp',
        svg: '../../mapas-svg/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.webp',
        svg: '../../mapas-svg/12-mayangna-arungka-matungbak/desktop-12-Mayangna-Arungka-Matungbak.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'D',
    pueblos: ['Pueblo Mayangna'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el noreste de Nicaragua, entre la Región Autónoma de la Costa Caribe Norte. Comprende 8 comunidades, todas indígenas de la etnia Mayangna. Cuenta con una población estimada de 4,743 habitantes.',
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
      hectareas_territorio: '48,723.14',
      concesiones: 11, // ⚠️ array `concesiones` tiene 10 items — falta 1 concesión
      hectareas_concesiones: '31,085.23',
    },
    concesiones: [
      { nombre: 'Bonanza H-I', svg_id: 'bonanza-h-i', empresa: 'HEMCO Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '1614.7', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Salto', svg_id: 'el-salto', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '727.4', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Bonanza II', svg_id: 'hemco-bonanza-ii', empresa: 'HEMCO Nicaragua, S. A. (HEMCONIC)', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '1399.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Bonanza IV', svg_id: 'hemco-bonanza-iv', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '4934.5', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - RB I', svg_id: 'hemco-rb-i', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '7554.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - RB II', svg_id: 'hemco-rb-ii', empresa: 'HEMCO Nicaragua, S. A. (HEMCONIC)', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '2211.8', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Rosita I', svg_id: 'hemco-rosita-i', empresa: 'Desarrollo Minero de Nicaragua, S. A. (DESMINIC)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '602.7', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO II', svg_id: 'hemco-ii', empresa: 'HEMCO Nicaragua, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Rosita V', svg_id: 'hemco-rosita-v', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '357.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Kukalaya', svg_id: 'kukalaya', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '5386.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Rosita H-2', svg_id: 'rosita-h-2', empresa: 'Desarrollo Minero de Nicaragua, S. A. (DESMINIC)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '993.1', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 13 ── AMASAU ──────────────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '13-amasau',
    numero: '13',
    nombre: 'Mayangna Awas Tingni Mayangnina Sauni Umani (AMASAU)',
    assets: {
      desktop: {
        raster: '../../mapas-raster/13-amasau/desktop-13-Amasau.webp',
        svg: '../../mapas-svg/13-amasau/desktop-13-Amasau.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/13-amasau/desktop-13-Amasau.webp',
        svg: '../../mapas-svg/13-amasau/desktop-13-Amasau.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/13-amasau/desktop-13-Amasau.webp',
        svg: '../../mapas-svg/13-amasau/desktop-13-Amasau.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'D',
    pueblos: ['Pueblo Mayangna'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 8 comunidades, todas indígenas de la etnia Mayangna. Cuenta con una población estimada de 1,164 habitantes.',
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
      hectareas_territorio: '73,394',
      concesiones: 1,
      hectareas_concesiones: '3,280.22',
    },
    concesiones: [
      { nombre: 'Waspan', svg_id: 'waspan', empresa: 'Zhong Fu Development', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '3280.2', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 14 ── Chorotega - Norte ───────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '14-chorotega-norte',
    numero: '14',
    nombre: 'Chorotega - Norte', // nombre anterior en el proyecto: 'Chorotega II'
    assets: {
      desktop: {
        raster: '../../mapas-raster/14-chorotega-norte/desktop-14-Chorotega-Norte.webp',
        svg: '../../mapas-svg/14-chorotega-norte/desktop-14-Chorotega-Norte.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/14-chorotega-norte/desktop-14-Chorotega-Norte.webp',
        svg: '../../mapas-svg/14-chorotega-norte/desktop-14-Chorotega-Norte.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/14-chorotega-norte/desktop-14-Chorotega-Norte.webp',
        svg: '../../mapas-svg/14-chorotega-norte/desktop-14-Chorotega-Norte.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Chorotega'],
    region: 'Departamentos de Madriz y Nueva Segovia',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el norte de Nicaragua, entre los departamentos de Madriz y Nueva Segovia. Comprende 5 comunidades (Telpaneca, Mozonte, Totogalpa, San Lucas y San José de Cusmapa), todas comunidades indígenas de la etnia Chorotega. El pueblo Chorotega a nivel nacional cuenta con una población de 46,002 personas.',
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
      hectareas_territorio: '138,080.53',
      concesiones: 10,
      hectareas_concesiones: '77,849.68',
    },
    concesiones: [
      { nombre: 'Yalagüina', svg_id: 'yalagueina', empresa: 'Brother Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Yalagüina II', svg_id: 'yalagueina-ii', empresa: 'Brother Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'La Perla', svg_id: 'la-perla', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Limay', svg_id: 'limay', empresa: 'Little Stone Mine', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 1', svg_id: 'segovia-mining-1', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 3', svg_id: 'segovia-mining-3', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 6', svg_id: 'segovia-mining-6', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - SID', svg_id: 'hemco-sid', empresa: 'Minera San Cristóbal, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 15 ── Matagalpa ───────────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '15-matagalpa',
    numero: '15',
    nombre: 'Matagalpa',
    assets: {
      desktop: {
        raster: '../../mapas-raster/15-matagalpa/desktop-15-Matagalpa.webp',
        svg: '../../mapas-svg/15-matagalpa/desktop-15-Matagalpa.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/15-matagalpa/desktop-15-Matagalpa.webp',
        svg: '../../mapas-svg/15-matagalpa/desktop-15-Matagalpa.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/15-matagalpa/desktop-15-Matagalpa.webp',
        svg: '../../mapas-svg/15-matagalpa/desktop-15-Matagalpa.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Matagalpa'],
    region: 'Departamento de Matagalpa',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el centro de Nicaragua, en el departamento de Matagalpa. Comprende 75 comunidades, todas indígenas de la etnia Matagalpa. La población indígena Matagalpa tiene una población estimada de 15,240 personas.',
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
      hectareas_territorio: '153,899.60',
      concesiones: 4,
      hectareas_concesiones: '77,026.50',
    },
    concesiones: [
      { nombre: 'Aurora', svg_id: 'aurora', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'La Perla', svg_id: 'la-perla', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'La Reyna II', svg_id: 'la-reyna-ii', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Santa Emilia', svg_id: 'santa-emilia', empresa: 'Thomas Metal', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 16 ── Prinzu Auhya Un ──────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '16-prinzu-auhya-un',
    numero: '16',
    nombre: 'Prinzu Auhya Un', // nombre anterior en el proyecto: 'Prinzu Auhya Uh'
    assets: {
      desktop: {
        raster: '../../mapas-raster/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.webp',
        svg: '../../mapas-svg/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.webp',
        svg: '../../mapas-svg/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.webp',
        svg: '../../mapas-svg/16-prinzu-auhya-un/desktop-16-Prinzu-Auhya-Un.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Miskitu'],
    region: 'Región Autónoma de la Costa Caribe Norte (RACCN)',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el noreste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte. Comprende 16 comunidades indígenas de la etnia Miskitu. Cuenta con una población estimada de 1,401 familias que son aproximadamente entre 7,000 y 9,000 habitantes.',
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
      hectareas_territorio: '378,058.74',
      concesiones: 3,
      hectareas_concesiones: '52,156.71',
    },
    concesiones: [],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 17 ── Muy Muy ──────────────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '17-muy-muy',
    numero: '17',
    nombre: 'Muy Muy',
    assets: {
      desktop: {
        raster: '../../mapas-raster/17-muy-muy/desktop-17-Muy-Muy.webp',
        svg: '../../mapas-svg/17-muy-muy/desktop-17-Muy-Muy.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/17-muy-muy/desktop-17-Muy-Muy.webp',
        svg: '../../mapas-svg/17-muy-muy/desktop-17-Muy-Muy.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/17-muy-muy/desktop-17-Muy-Muy.webp',
        svg: '../../mapas-svg/17-muy-muy/desktop-17-Muy-Muy.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Matagalpa'],
    region: 'Departamento de Matagalpa',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Se ubica en el centro de Nicaragua, en el departamento de Matagalpa. Comprende 4 comunidades: Muy Muy, Matiguás, San Ramón y Uluse, todas indígenas de la etnia Matagalpa. Cuenta con una población estimada de 12,000 habitantes.',
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
      hectareas_territorio: '53,587.22',
      concesiones: 2,
      hectareas_concesiones: '4,081.76',
    },
    concesiones: [],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

  /* ── 18 ── Sébaco ──────────────────────────────────────────────────────── */
  /*
   * ⚠️ Pendiente: sin raster ni SVG todavía. assets vacío intencionalmente —
   * el mapa no se renderiza. Agregar assets.desktop.raster cuando exista el
   * PNG/webp, y assets.desktop.svg cuando Illustrator exporte el SVG real.
   */
  {
    id: '18-sebaco',
    numero: '18',
    nombre: 'Sébaco',
    assets: {
      desktop: {
        raster: '../../mapas-raster/18-sebaco/desktop-18-Sebaco.webp',
        svg: '../../mapas-svg/18-sebaco/desktop-18-Sebaco.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/18-sebaco/desktop-18-Sebaco.webp',
        svg: '../../mapas-svg/18-sebaco/desktop-18-Sebaco.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/18-sebaco/desktop-18-Sebaco.webp',
        svg: '../../mapas-svg/18-sebaco/desktop-18-Sebaco.svg',
        width: 927,
        height: 980,
      },
    },
    layout: 'B',
    pueblos: ['Pueblo Matagalpa'],
    region: 'Departamentos de Matagalpa y Estelí',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
    descripcion: 'Este territorio se ubica en el centro de Nicaragua, entre el departamento de Matagalpa y Estelí. Comprende 3 comunidades, todas indígenas de la etnia Matagalpa. Cuenta con una población estimada de 8,000 habitantes.',
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
      hectareas_territorio: '25,152.54',
      concesiones: 1,
      hectareas_concesiones: '256.60',
    },
    concesiones: [],
    fuente: 'La Gaceta · Fundación del Río · URACCAN · OpenStreetMap · ESRI Standard · Proyección UTM Datum NAD 27 Zona 16 N · Abril 2026',
  },

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
    'sin-nombre': 'badge-sin-nombre',
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
    'sin-nombre': 'Sin identificar',
  };
  return labels[pais] || pais;
}

export { TERRITORIOS, getTerritorio, getBadgeClass, getLabelPais };