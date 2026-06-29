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
   *   ✅ el-castillo   → border-el-castillo + area-hover-target ← verificado Jun 2026
   *   ✅ la-guinea     → border-la-guinea + area-hover-target ← verificado Jun 2026
   *
   * Poblados con ID: poblado-el-lanchon, poblado-sukapin, poblado-cuarenta-y-tres,
   *   poblado-mani-watla, poblado-kligna, poblado-lapan, poblado-yulu
   *   (cada uno tiene variantes: -1, -2 para clusters — el tooltip usa el primero)
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
        color_override: '#d7620e',
        empresa: 'Nicaragua XinXin Linze Minería Group, S. A.',
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
      {
        nombre: 'El Castillo',
        svg_id: 'el-castillo',
        color_override: '#f47317',
        empresa: 'Thomas Metal, S. A.',
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
      {
        nombre: 'La Guinea',
        svg_id: 'la-guinea',
        color_override: '#f98838',
        empresa: 'Thomas Metal, S. A.',
        pais: 'china',
        patron_img: '../../img/patrones/patron-china.webp',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
    ],
    concesion_minera: 'Se han otorgado 3 lotes de concesiones mineras a 2 empresas mineras chinas que cubren el 13.2% de su territorio. Dichas concesiones mineras afectan de forma directa 9 quebradas y 16 ríos, para un total de 213.08 kilómetros de longitud de la red hídrica superficial.',
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
        color_override: '#d7620e',
        empresa: 'Nicaragua XinXin Linze Minería Group, S. A.',
        pais: 'china',
        hectareas: '—',
        año: '—',
        estado: '—',
        gaceta: '—',
      },
    ],
    concesion_minera: 'Se ha otorgado 1 lote de concesión minera a 1 empresa minera china que cubre el 0.13% de su territorio. Si se considerara todo el territorio reclamado existirían al menos 6 lotes de concesiones mineras adicionales, en manos de 3 empresas chinas y 1 empresa nicaragüense.',
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
      concesiones: 8,
      hectareas_concesiones: '55,154.07',
    },
    concesiones: [
      // Columbus I eliminado — no pertenece a este territorio (verificado FDR Jun 2026)
      { nombre: 'Caribe', svg_id: 'caribe', color_override: '#d7620e', empresa: 'Nicaragua XinXin Linze Minería Group, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto I', svg_id: 'el-encanto-i', color_override: '#e56d55', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', color_override: '#ea8e3b', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Yulu Awaskira', svg_id: 'yulu-awaskira', color_override: '#f4a13d', empresa: 'Nicaragua XinXin Linze Minería Group, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Puerto Cabezas', svg_id: 'puerto-cabezas', color_override: '#d7620e', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara', svg_id: 'walpa-tara', color_override: '#739b50', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Vanessa', svg_id: 'vanessa', color_override: '#263fa8', empresa: 'Osymar, Compañía limitada', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', color_override: '#394150', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 8 lotes de concesiones mineras: 5 lotes a empresas mineras chinas, 1 lote a una empresa de origen canadiense, 1 lote a una empresa nicaragüense y 1 lote de Área de Reserva Minera, que en total cubren el 42.86% de su territorio. Dichas concesiones mineras afectan de forma directa 8 quebradas y 9 ríos, para un total de 125.83 kilómetros de longitud de la red hídrica superficial.',
    fuente: '',
  },

  /* ── 04 ── Wangki Twi-Tasba Raya ───────────────────────────────────────── */
  {
    id: '04-wangki-twi-tasba-raya',
    numero: '04',
    nombre: 'Wangki Twi-Tasba Raya',
    assets: {
      desktop: {
        raster: '../../mapas-raster/04-wangki-twi-tasba-raya/desktop-04-wangki-twi-tasba-raya.webp',
        svg: '../../mapas-svg/04-wangki-twi-tasba-raya/desktop-04-Wangki-Twi-Tasba-Raya.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/04-wangki-twi-tasba-raya/desktop-04-wangki-twi-tasba-raya.webp',
        svg: '../../mapas-svg/04-wangki-twi-tasba-raya/desktop-04-Wangki-Twi-Tasba-Raya.svg',
        width: 780,
        height: 1306,
      },
      mobile: {
        raster: '../../mapas-raster/04-wangki-twi-tasba-raya/desktop-04-wangki-twi-tasba-raya.webp',
        svg: '../../mapas-svg/04-wangki-twi-tasba-raya/desktop-04-Wangki-Twi-Tasba-Raya.svg',
        width: 504,
        height: 634,
      },
    },
    layout: 'C',
    tema: 'verde',
    banner: '../../img/banners/banner-03.webp',
    logo: '../../img/Logo-fdr.webp',
    logo_alt: 'Fundación del Río',
    logo_fuente: '',
    logo_fuente_alt: '',
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
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Waspán', svg_id: 'waspan', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 2 lotes de concesión minera a 1 empresa china, que en conjunto abarcan el 0.30% del territorio. Estas concesiones afectan directamente a 3 ríos, para un total de 7 kilómetros de longitud de la red hídrica superficial.',
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
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li.svg',
        width: 927,
        height: 980,
      },
      tablet: {
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li.svg',
        width: 927,
        height: 980,
      },
      mobile: {
        raster: '../../mapas-raster/05-wangki-li/desktop-05-Wangki-Li.webp',
        svg: '../../mapas-svg/05-wangki-li/desktop-05-Wangki-Li.svg',
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
      { nombre: 'Waspán', svg_id: 'waspan', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
      { nombre: 'Matusalén', svg_id: 'matusalen', empresa: 'Global Group, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', año: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 2 lotes de concesiones mineras: 1 a una empresa minera china y el otro a una empresa minera nicaragüense, que en total cubren el 14.79% de su territorio. Dichas concesiones afectan de forma directa 1 quebrada y 3 ríos, para un total de 12.61 kilómetros de longitud de la red hídrica superficial.',
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
    layout: 'E',
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
      // ── Lista completa verificada contra SVG (Jun 2026) ────────────────────
      // ⏳ = sin grupo en SVG — datos listos, hover activo cuando Illustrator cree el grupo
      // ⚠️ pais de concesiones HEMCO: pendiente confirmación FDR (colombia vs nacional)
      { nombre: 'Rosita D', svg_id: 'rosita-d', pais: 'china', empresa: 'Santa Rita Mining Company, S. A.', hectareas: '—' },
      { nombre: 'San Leonardo', svg_id: 'san-leonardo', pais: 'china', empresa: 'Thomas Metal, S. A.', hectareas: '1711.6' },
      { nombre: 'El Salto', svg_id: 'el-salto', pais: 'china', empresa: 'Thomas Metal, S. A.', hectareas: '—' },
      { nombre: 'Begonia', svg_id: 'begonia', pais: 'canada', empresa: 'Calibre Mining Nicaragua, S. A.', hectareas: '—' }, // ⏳ sin grupo SVG
      { nombre: 'Casiopea', svg_id: 'casiopea', pais: 'canada', empresa: 'Calibre Mining Nicaragua, S. A.', hectareas: '—' }, // ⏳ sin grupo SVG
      { nombre: 'Marsella', svg_id: 'marsella', pais: 'canada', empresa: 'Calibre Mining Nicaragua, S. A.', hectareas: '—' },
      { nombre: 'Minerva', svg_id: 'minerva', pais: 'canada', empresa: 'Calibre Mining Nicaragua, S. A.', hectareas: '—' }, // ⏳ sin grupo SVG
      { nombre: 'HEMCO - RB II', svg_id: 'hemco-rb-ii', pais: 'colombia', empresa: 'HEMCO - Nicaragua, S. A.', hectareas: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Rosita IV', svg_id: 'hemco-rosita-iv', pais: 'colombia', empresa: 'HEMCO - Nicaragua, S. A.', hectareas: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Rosita V', svg_id: 'hemco-rosita-v', pais: 'colombia', empresa: 'HEMCO - Nicaragua, S. A.', hectareas: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Rosita VI', svg_id: 'hemco-rosita-vi', pais: 'colombia', empresa: 'HEMCO - Nicaragua, S. A.', hectareas: '—' }, // ⏳ sin grupo SVG · ⚠️ pais pendiente FDR
      { nombre: 'Nueva América H-I', svg_id: 'nueva-america-hi', pais: 'nacional', empresa: 'Desarrollo Minero de Nicaragua, S. A. (Desminic)', hectareas: '—' },
      { nombre: 'Rosita H-2', svg_id: 'rosita-h-2', pais: 'nacional', empresa: 'Desarrollo Minero de Nicaragua, S. A. (Desminic)', hectareas: '—' },
    ],
    concesion_minera: 'Se han otorgado 13 lotes de concesiones mineras: 6 lotes a una empresa minera canadiense, 4 lotes a una empresa colombiana y 3 lotes a una empresa china, que en total cubren el 88.64% de su territorio. Estas concesiones mineras afectan de forma directa 1 quebrada y 12 ríos, para un total de 142.94 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', color_override: '#ea8e3b', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '15786.8', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se ha otorgado 1 lote de concesión minera a 1 empresa china que cubre el 9.92% de su territorio. Dicha concesión minera afecta de forma directa 1 quebrada y 3 ríos, para un total de 20.88 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'Columbus I', svg_id: 'columbus-i', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '13567.3', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Bongo de Hidalgo', svg_id: 'el-bongo-de-hidalgo', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '11467.9', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto I', svg_id: 'el-encanto-i', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '11423.9', color_override: '#e56d55', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Encanto II', svg_id: 'el-encanto-ii', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '8451.4', color_override: '#ea8e3b', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara', svg_id: 'walpa-tara', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '13124.6', color_override: '#739b50', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', color_override: '#394150', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 7 lotes de concesiones mineras: 4 lotes a dos empresas mineras chinas, 2 a una empresa minera canadiense y 1 lote de Área de Reserva Minera, que en total cubren el 83.77% de su territorio. Dichas concesiones mineras afectan de forma directa 7 quebradas y 11 ríos, para un total de 188.99 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'Atlas', svg_id: 'atlas', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '8515.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Begonia', svg_id: 'begonia', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '47156.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Casiopea', svg_id: 'casiopea', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '26684.8', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Centauro', svg_id: 'centauro', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '2394.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Minerva', svg_id: 'minerva', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '2159.5', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Pegaso', svg_id: 'pegaso', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '12334.6', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Polaris', svg_id: 'polaris', empresa: 'Santa Rita Mining Company, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '16575.2', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'San Leonardo', svg_id: 'san-leonardo', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '1711.6', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 8 lotes de concesiones mineras: 7 lotes a una empresa minera canadiense y 1 lote a una empresa minera china, que en total cubren el 39.57% de su territorio. Dichas concesiones mineras afectan de forma directa 4 quebradas y 22 ríos, para un total de 431.83 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'El Deseo', svg_id: 'el-deseo', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '2242.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'El Hormiguero', svg_id: 'el-hormiguero', empresa: 'Brother Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '1502.0', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Veracruz', svg_id: 'veracruz', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '7.0', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 4 lotes de concesiones mineras, 2 de estos lotes a una empresa canadiense y 2 lotes a dos empresas chinas, que en total cubren el 9.76% de su territorio. Dichas concesiones mineras afectan de forma directa 2 ríos, para un total de 5.77 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'Bonanza H-I', svg_id: 'bonanza-h-i', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '1.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HB - V', svg_id: 'hb-v', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '894.0', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Bonanza IV', svg_id: 'hemco-bonanza-iv', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '460.7', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Bonanza V', svg_id: 'hemco-bonanza-v', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '1327.8', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'Kukalaya', svg_id: 'kukalaya', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '84.7', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Matusalén', svg_id: 'matusalén', empresa: 'Global Group, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '4192.4', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Waspán', svg_id: 'waspan', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '6648.5', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 7 lotes de concesiones mineras: 4 lotes a una empresa colombiana, 2 lotes a dos empresas chinas y 1 lote a una empresa nicaragüense, que en total cubren el 8.31% de su territorio. Dichas concesiones mineras afectan de forma directa a 1 quebrada y 5 ríos, para un total de 17.74 kilómetros de longitud de la red hídrica superficial.',
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
      concesiones: 11,
      hectareas_concesiones: '31,085.23',
    },
    concesiones: [
      // ⚠️ pais de concesiones HEMCO: pendiente confirmación FDR (colombia vs nacional)
      // ⚠️ HEMCO - Rosita I y HEMCO II: conflicto de empresa entre JS y documento FDR — no cambiar sin FDR
      // rosita-h-2: sin grupo SVG — hover pendiente Illustrator
      { nombre: 'Bonanza H-I', svg_id: 'bonanza-h-i', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '1614.7', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'El Salto', svg_id: 'el-salto', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '727.4', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'HEMCO - Bonanza II', svg_id: 'hemco-bonanza-ii', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '1399.2', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Bonanza IV', svg_id: 'hemco-bonanza-iv', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '4934.5', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - RB I', svg_id: 'hemco-rb-i', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '7554.2', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - RB II', svg_id: 'hemco-rb-ii', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '2211.8', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO - Rosita I', svg_id: 'hemco-rosita-i', empresa: 'Desarrollo Minero de Nicaragua, S. A. (Desminic)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '602.7', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ empresa en conflicto con FDR
      { nombre: 'HEMCO - Rosita V', svg_id: 'hemco-rosita-v', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'colombia', patron_img: '../../img/patrones/patron-colombia.webp', hectareas: '357.1', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ pais pendiente FDR
      { nombre: 'HEMCO II', svg_id: 'hemco-ii', empresa: 'HEMCO - Nicaragua, S. A.', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' }, // ⚠️ empresa en conflicto con FDR
      { nombre: 'Kukalaya', svg_id: 'kukalaya', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '5386.1', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Rosita H-2', svg_id: 'rosita-h-2', empresa: 'Desarrollo Minero de Nicaragua, S. A. (Desminic)', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '993.1', ano: '—', estado: '—', gaceta: '—' }, // ⏳ sin grupo SVG
    ],
    concesion_minera: 'Dentro de este territorio se han otorgado 11 lotes de concesiones mineras: 7 lotes a una empresa colombiana, 2 lotes a una empresa canadiense y 2 lotes a una empresa china, que en total cubren el 63.79% de su territorio. Dichas concesiones mineras afectan de forma directa a 8 quebradas y 12 ríos, para un total de 109.10 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'Waspán', svg_id: 'waspan', empresa: 'Zhong Fu Development, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '3280.2', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Dentro de este territorio se ha otorgado 1 lote de concesión minera a 1 empresa china, que en total cubre el 4.46% de su territorio. Esta concesión afecta de forma directa a 2 ríos, para un total de 6.92 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'Yalagüina', svg_id: 'yalaguina', empresa: 'Brother Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Yalagüina II', svg_id: 'yalaguina-ii', empresa: 'Brother Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Limay', svg_id: 'limay', empresa: 'Little Stone Mine', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 1', svg_id: 'segovia-mining-1', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 3', svg_id: 'segovia-minig-3', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Segovia Mining 6', svg_id: 'segovia-mining-6', empresa: 'Global Group, Sociedad Anónima', pais: 'nacional', patron_img: '../../img/patrones/patron-nicaragua.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Reserva Minera', svg_id: 'reserva-minera', empresa: '—', pais: 'reserva', patron_img: '../../img/patrones/patron-reserva-minera.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Dentro de este territorio se han otorgado 10 lotes de concesiones mineras: 4 lotes de Áreas de Reserva Minera, 3 lotes a dos empresas mineras chinas y 3 lotes a una empresa minera nicaragüense, que en total cubren el 56.37% de su territorio. Dichas concesiones mineras afectan de forma directa a 10 quebradas y 19 ríos, para un total de 190.00 kilómetros de longitud de la red hídrica superficial.',
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
      { nombre: 'La Perla', svg_id: 'la-perla', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'La Reyna II', svg_id: 'la-reyna-ii', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Santa Emilia', svg_id: 'santa-emilia', empresa: 'Thomas Metal, S. A.', pais: 'china', patron_img: '../../img/patrones/patron-china.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Dentro de este territorio se han otorgado 4 lotes de concesiones mineras: 3 lotes a una empresa minera china y 1 lote a una empresa minera canadiense, que en total cubren el 50.05% de su territorio. Dichas concesiones mineras afectan de forma directa a 24 quebradas y 30 ríos, para un total de 289.18 kilómetros de longitud de la red hídrica superficial.',
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
    concesiones: [
      { nombre: 'Camelia', svg_id: 'camelia', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Minerva', svg_id: 'minerva', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
      { nombre: 'Walpa Tara', svg_id: 'walpa-tara', empresa: 'Calibre Mining Nicaragua, S. A.', pais: 'canada', patron_img: '../../img/patrones/patron-canada.webp', hectareas: '—', ano: '—', estado: '—', gaceta: '—' },
    ],
    concesion_minera: 'Se han otorgado 3 lotes de concesiones mineras a una empresa minera canadiense, que en total cubren el 13.79% de su territorio. Dichas concesiones mineras afectan de forma directa 4 quebradas y 8 ríos, para un total de 112.62 kilómetros de longitud de la red hídrica superficial.',
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
    concesion_minera: 'Se han otorgado 2 lotes de concesiones mineras: 1 lote a una empresa minera china y 1 lote a una empresa nicaragüense, que en total cubren el 7.61% de su territorio. Dichas concesiones mineras afectarían de forma directa a 2 quebradas y 5 ríos, para un total de 19.75 kilómetros de longitud de la red hídrica superficial.',
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
    concesion_minera: 'Se ha otorgado 1 lote de concesión minera a una empresa nicaragüense, el cual cubre el 1.02% de su territorio. Dichas concesiones mineras afectan de forma directa 1 río, para un total de 0.14 kilómetros de longitud de la red hídrica superficial.',
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