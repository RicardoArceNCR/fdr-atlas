/**
 * data-areas-protegidas.js — Atlas Parte II
 * Datos de las 18 áreas protegidas con concesiones mineras.
 * Fuente: "Contenido Atlas Áreas Protegidas" (FDR, nov 2026).
 *
 * Este archivo es independiente de js/data-territorios.js (Parte I, cerrada).
 * No importar nada de la Parte I para no acoplar las dos ediciones.
 *
 * Campos nuevos respecto a la Parte I:
 *   categoria              — categoría de manejo (kicker de la ficha)
 *   seccion                — agrupación regional del índice
 *   ubicacion              — departamento / región autónoma
 *   stats.porcentaje       — % de la superficie del área concesionada
 *   ficha                  — creación, instrumento legal, reserva de biosfera, RAMSAR
 *   ecosistemas            — ecosistemas en riesgo (chips)
 *   impactos               — impactos señalados (chips)
 *   territorios_relacionados — enlaces a fichas de la Parte I (solo los que el texto de FDR nombra)
 *
 * Países válidos: 'china' | 'colombia' | 'reino-unido' | 'canada' | 'nacional' | 'reserva' | 'sin-nombre'
 *
 * ⚠️ Pendientes de FDR: nombre y empresa de cada concesión (solo Bosawás
 * tiene nombre de lote, tomado del SVG), texto de Cerro Cumaica, y qué
 * territorios titulados de la Parte I corresponden a cada área.
 */

const IMPACTOS_BASE = [
  'Cambio de uso de suelo y deforestación',
  'Contaminación del suelo y fuentes hídricas',
  'Pérdida del hábitat de la fauna y la biodiversidad',
];

const SECCIONES = {
  sur: 'Reserva de Biosfera Río San Juan y Caribe Sur',
  bosawas: 'Región de Bosawás',
  norte: 'Caribe Norte',
  macizos: 'Macizos del norte: Matagalpa y Estelí',
  centro: 'Centro',
};

const COMUNES = {
  layout: 'B',
  tema: 'verde',
  banner: '../../img/banners/banner-ap.webp',  // banner propio de la Parte II (fuente: img/temp/banner.jpeg)
  // Fondo claro de la columna derecha (quitar esta línea vuelve al verde oscuro)
  fondo_info: '../../img/fondos/fondo-info-claro.webp',
  logo: '../../img/Logo-fdr.webp',
  logo_alt: 'Fundación del Río',
  escala: '—',
  assets: {},
  concesiones: [],
};

function assetsDe(id, archivo) {
  const bp = {
    raster: `../../mapas-raster/${id}/desktop-${archivo}.webp`,
    svg: `../../mapas-svg/${id}/desktop-${archivo}.svg`,
    width: 927,
    height: 980,
  };
  return { desktop: { ...bp }, tablet: { ...bp }, mobile: { ...bp } };
}

const REL_RAMA_KRIOL = { id: '01-rama-kriol', nombre: 'Rama y Kriol' };
const REL_CREOLE = { id: '02-creole-bluefields', nombre: 'Negro Creole de Bluefields' };

const AREAS_PROTEGIDAS = [
  /* ── 01 ── Indio Maíz ─────────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-01-indio-maiz',
    numero: '01',
    nombre: 'Indio Maíz',
    categoria: 'Reserva Biológica',
    seccion: 'sur',
    ubicacion: 'Río San Juan · Región Autónoma de la Costa Caribe Sur',
    pueblos: ['Rama', 'Kriol'],
    stats: { hectareas_area: '263,980', concesiones: 2, hectareas_concesiones: '55,916.99', porcentaje: '21.18' },
    ficha: { creacion: '1990', instrumento: 'Límites actualizados por Decreto 66-99 (1999)', biosfera: 'Río San Juan · zona núcleo', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de bajura', 'Humedales continentales'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Biológica Indio Maíz se ubica en el sureste de Nicaragua, entre el departamento de Río San Juan y la Región Autónoma de la Costa Caribe Sur, fue creada en el año 1990, pero en el año 1999 se actualizaron los límites mediante el decreto 66-99, posee la categoría de manejo de mayor restricción a la actividad humana y solamente se permite la presencia de las comunidades indígenas y afrodescendientes Rama y Kriol, dicha área protegida forma parte de la zona núcleo de la Reserva de Biosfera Río San Juan.',
    concesion_minera: 'Dentro del área protegida se han otorgado 2 lotes de concesiones mineras a una empresas mineras chinas que cubren el 21,18 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosque tropical húmedo de bajura y humedales continentales, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [REL_RAMA_KRIOL],
  },

  /* ── 02 ── Cerro Silva ────────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-02-cerro-silva',
    numero: '02',
    nombre: 'Cerro Silva',
    categoria: 'Reserva Natural',
    seccion: 'sur',
    ubicacion: 'Región Autónoma de la Costa Caribe Sur',
    pueblos: ['Rama', 'Kriol'],
    stats: { hectareas_area: '339,400', concesiones: 1, hectareas_concesiones: '33,863.37', porcentaje: '9.98' },
    ficha: { creacion: '1992', instrumento: 'Límites actualizados por Decreto 66-99 (1999)', biosfera: 'Río San Juan · zona núcleo', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura', 'Humedales', 'Sistemas costeros'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Cerro Silva se ubica en el sureste de Nicaragua, en la Región Autónoma de la Costa Caribe Sur, fue creada en el año 1992, pero en el año 1999 se actualizaron los límites mediante el decreto 66-99. El área protegida forma parte de la zona núcleo de la Reserva de Biosfera Río San Juan y dentro de ella viven comunidades indígenas y afrodescendientes Rama y Kriol.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren el 9,98% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosque tropical húmedo de altura, humedales y sistemas costeros, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [REL_RAMA_KRIOL],
  },

  /* ── 03 ── Sistema de Humedales de la Bahía de Bluefields ─────────────── */
  {
    ...COMUNES,
    id: 'ap-03-humedales-bluefields',
    numero: '03',
    nombre: 'Sistema de Humedales de la Bahía de Bluefields',
    categoria: 'Humedal',
    seccion: 'sur',
    ubicacion: 'Región Autónoma de la Costa Caribe Sur',
    pueblos: ['Rama', 'Kriol', 'Creole'],
    stats: { hectareas_area: '86,500.58', concesiones: 1, hectareas_concesiones: '8,582.71', porcentaje: '9.92' },
    ficha: { creacion: null, instrumento: null, biosfera: null, ramsar: 'Sitio RAMSAR desde 2001' },
    ecosistemas: ['Bosques pantanosos', 'Sistemas marino-costeros (manglares)'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local'],
    // ⚠️ FDR: el texto dice "suroeste"; la bahía de Bluefields está en el sureste.
    descripcion: 'El Sistema de Humedales de la Bahía de Bluefields se ubica en el suroeste de Nicaragua en la Región Autónoma de la Costa Caribe Sur, además comprende parcialmente parte de la Reserva Natural Cerro Silva; el humedal fue declarado como sitio RAMSAR de importancia internacional en el año 2001. En esta área habitan comunidades indígenas y afrodescendientes Rama, Kriol y Creoles.',
    concesion_minera: 'Dentro del área protegida se han otorgado 1 lote de concesión minera a 1 empresa británica que cubren el 9,92% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques pantanosos y sistemas marino-costeros (manglares), sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad y afectaciones al turismo local.',
    paises: ['reino-unido'],
    territorios_relacionados: [REL_RAMA_KRIOL, REL_CREOLE],
  },

  /* ── 04 ── Río San Juan ───────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-04-rio-san-juan',
    numero: '04',
    nombre: 'Río San Juan',
    categoria: 'Refugio de Vida Silvestre',
    seccion: 'sur',
    ubicacion: 'Río San Juan',
    pueblos: ['Rama', 'Kriol'],
    stats: { hectareas_area: '43,518.30', concesiones: 1, hectareas_concesiones: '4,820.59', porcentaje: '11.08' },
    ficha: { creacion: '1990', instrumento: 'Límites actualizados por Decreto 66-99 (1999)', biosfera: 'Río San Juan · zona de amortiguamiento', ramsar: 'Sitio RAMSAR desde 2001' },
    ecosistemas: ['Bosques de galería', 'Sistemas marino-costeros (manglares y yolillales)'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'El Refugio de Vida Silvestre Rio San Juan se ubica en el sureste de Nicaragua, en el departamento de Río San Juan, fue creada en el año 1990, pero en el año 1999 se actualizaron los límites mediante el decreto 66-99. El área protegida forma parte de la zona de amortiguamiento de la Reserva de Biosfera Río San Juan, dentro de ella viven comunidades indígenas y afrodescendientes Rama y Kriol, y en 2001 fue declarado como sitio RAMSAR reconocido como un humedal de importancia internacional.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren el 11,08 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques de galería y sistemas marino-costeros (manglares y yolillales), sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y afectaciones al turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [REL_RAMA_KRIOL],
  },

  /* ── 05 ── Bosawás ─ primer mapa con assets ───────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-05-bosawas',
    numero: '05',
    nombre: 'Bosawás',
    categoria: 'Reserva Natural',
    seccion: 'bosawas',
    ubicacion: 'Jinotega · Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Mayangna', 'Miskitu'],
    assets: assetsDe('ap-05-bosawas', 'ap-05-Bosawas'),
    stats: { hectareas_area: '680,618', concesiones: 1, hectareas_concesiones: '5,296.58', porcentaje: '0.78' },
    ficha: { creacion: '1991', instrumento: 'Límites actualizados por Ley 407 (2001)', biosfera: 'Bosawás · zona núcleo (desde 1997)', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura y bajura', 'Bosques de nebliselva'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Bosawas se ubica en el noroeste de Nicaragua, entre los departamentos de Jinotega y la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991, pero en el año 2001 se actualizaron los límites mediante la ley 407. El área protegida desde 1997 forma parte de la zona núcleo de la Reserva de Biosfera de Bosawas y dentro de ella viven pueblos indígenas Mayangnas y Miskitu de seis territorios titulados.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren el 0,78 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de altura y bajura y bosques de nebliselva, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    concesiones: [
      // Nombre tomado del SVG. ⚠️ FDR: empresa y hectáreas del lote completo.
      { nombre: 'La Diabla – Cerro Kum', svg_id: 'la-diabla-cerro-kum', empresa: '—', pais: 'china', hectareas: '5,296.58 dentro del área' },
    ],
    territorios_relacionados: [],
  },

  /* ── 06 ── Cerro Bana Cruz ────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-06-bana-cruz',
    numero: '06',
    nombre: 'Cerro Bana Cruz',
    categoria: 'Reserva Natural',
    seccion: 'bosawas',
    ubicacion: 'Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Mayangna'],
    stats: { hectareas_area: '27,047.70', concesiones: 1, hectareas_concesiones: '15,758.56', porcentaje: '58.26' },
    ficha: { creacion: '1991', instrumento: 'Límites actualizados por Ley 407 (2001)', biosfera: 'Bosawás · zona núcleo (desde 1997)', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de bajura y altura'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Cerro Bana Cruz se ubica en el noroeste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991, pero en el año 2001 se actualizaron los límites mediante la ley 407. El área protegida desde 1997 forma parte de la zona núcleo de la Reserva de Biosfera de Bosawas y dentro de ella viven comunidades indígenas Mayangnas de dos territorios titulados.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren el 58,26% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de bajura y altura, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 07 ── Cerro Cola Blanca ──────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-07-cola-blanca',
    numero: '07',
    nombre: 'Cerro Cola Blanca',
    categoria: 'Reserva Natural',
    seccion: 'bosawas',
    ubicacion: 'Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Mayangna'],
    stats: { hectareas_area: '10,540', concesiones: 1, hectareas_concesiones: '5,485.14', porcentaje: '52.04' },
    ficha: { creacion: '1991', instrumento: 'Límites actualizados por Ley 407 (2001)', biosfera: 'Bosawás · zona núcleo (desde 1997)', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de bajura'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Cerro Cola Blanca se ubica en el noroeste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991, pero en el año 2001 se actualizaron los límites mediante la ley 407. El área protegida desde 1997 forma parte de la zona núcleo de la Reserva de Biosfera de Bosawas y dentro de ella viven comunidades indígenas Mayangnas de dos territorios titulados.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren el 52,04 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de bajura, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 08 ── Pis Pis ────────────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-08-pis-pis',
    numero: '08',
    nombre: 'Pis Pis',
    categoria: 'Reserva Natural',
    seccion: 'bosawas',
    ubicacion: 'Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Mayangna'],
    stats: { hectareas_area: '4,385.80', concesiones: 1, hectareas_concesiones: '523.46', porcentaje: '11.94' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: 'Dentro de Bosawás, no reconocida en la Ley 407', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura y bajura'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Pis Pis se ubica en el noroeste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991 mediante el decreto 42-91, pese a que el área se ubica dentro de los límites de la Reserva de Biosfera de Bosawas no se reconoció como parte de ella en la ley 407 de 2001. Dentro de ella viven indígenas Mayangnas de un territorio titulado.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresa minera colombiana que cubren el 11,94 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de altura y bajura, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['colombia'],
    territorios_relacionados: [],
  },

  /* ── 09 ── Cerro Saslaya ──────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-09-saslaya',
    numero: '09',
    nombre: 'Cerro Saslaya',
    categoria: 'Reserva Natural',
    seccion: 'bosawas',
    ubicacion: 'Jinotega · Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Mayangna'],
    stats: { hectareas_area: '63,286.80', concesiones: 1, hectareas_concesiones: '0.98', porcentaje: '0.002' },
    ficha: { creacion: '1991', instrumento: 'Límites actualizados por Ley 407 (2001)', biosfera: 'Bosawás · zona núcleo (desde 1997)', ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura', 'Bosques nubosos'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Cerro Saslaya se ubica en el noroeste de Nicaragua, entre el departamento de Jinotega y la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991, pero en el año 2001 se actualizaron los límites mediante la ley 407. El área protegida desde 1997 forma parte de la zona núcleo de la Reserva de Biosfera de Bosawas y dentro de ella se encuentra un territorio Mayangna titulado.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren 0.002% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de altura y bosques nubosos, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 10 ── Yulu ───────────────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-10-yulu',
    numero: '10',
    nombre: 'Yulu',
    categoria: 'Reserva Natural',
    seccion: 'norte',
    ubicacion: 'Región Autónoma de la Costa Caribe Norte',
    pueblos: ['Miskitu'],
    stats: { hectareas_area: '4,413.20', concesiones: 1, hectareas_concesiones: '2,940.76', porcentaje: '66.64' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosques de pinos'],
    impactos: IMPACTOS_BASE,
    descripcion: 'La Reserva Natural Yulu se ubica en el noroeste de Nicaragua, en la Región Autónoma de la Costa Caribe Norte, fue creada en el año 1991 mediante el decreto 42-91, dentro de esta área se encuentran indígenas Miskitu de un territorio titulado.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresa minera china que cubren el 66,64% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques de pinos, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 11 ── Yucul ──────────────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-11-yucul',
    numero: '11',
    nombre: 'Yucul',
    categoria: 'Reserva de Recursos Genéticos',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '5,584.50', concesiones: 2, hectareas_concesiones: '5,584.50', porcentaje: '100' },
    ficha: { creacion: '1990', instrumento: 'Decreto 526', biosfera: null, ramsar: null },
    ecosistemas: ['Bosques de pinos y robles', 'Bosques de nebliselva'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva de Recursos Genéticos Cerro Yucul se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1990 mediante el decreto 526. Es la única reserva genética del país, importante por la conservación de dos especies de pino <em>Pinus oocarpa</em> y <em>Pinus tecunumanii</em>. Dicha reserva forma parte de las zonas montañosas de matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se han otorgado 2 lotes de concesiones mineras a 1 empresa minera chinas que cubren el 100% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques de pinos y robles y bosques de nebliselva, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 12 ── Cerro Guabule ──────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-12-guabule',
    numero: '12',
    nombre: 'Cerro Guabule',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '6,408.80', concesiones: 1, hectareas_concesiones: '4,558.96', porcentaje: '71.14' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosques de pinos', 'Bosques de nebliselva'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva Natural Cerro Guabule se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1991 mediante el decreto 42-91. Dicha reserva forma parte de las zonas montañosas de Matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresa minera china que cubren el 71,14% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques de pinos y bosques de nebliselva, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 13 ── Fila Cerro Frío – La Cumplida ──────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-13-cerro-frio-la-cumplida',
    numero: '13',
    nombre: 'Fila Cerro Frío – La Cumplida',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '5,146.90', concesiones: 1, hectareas_concesiones: '2,679.02', porcentaje: '52.05' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura', 'Bosques de nebliselva'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva Natural Fila Cerro Frío - La Cumplida se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1991 mediante el decreto 42-91. Dicha reserva forma parte de las zonas montañosas de Matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresa minera china que cubren el 52,05 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de altura y bosques de nebliselva, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 14 ── Cerro Apante ───────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-14-apante',
    numero: '14',
    nombre: 'Cerro Apante',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '1,962.30', concesiones: 1, hectareas_concesiones: '1,858.87', porcentaje: '94.73' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosque tropical húmedo de altura', 'Bosques de nebliselva'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva Natural Cerro Apante se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1991 mediante el decreto 42-91. Dicha reserva forma parte de las zonas montañosas de Matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresa minera china que cubren el 94,73 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques tropical húmedo de altura y bosques de nebliselva, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 15 ── Salto Río Yasika ───────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-15-yasika',
    numero: '15',
    nombre: 'Salto Río Yasika',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '410.70', concesiones: 1, hectareas_concesiones: '410.70', porcentaje: '100' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosque riberino', 'Río Yasika'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva Natural Salto Río Yasika se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1991 mediante el decreto 42-91. Dicha reserva forma parte de las zonas montañosas de Matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren 100 % de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques riberino y el río Yasika, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 16 ── Cerro Arenal ───────────────────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-16-arenal',
    numero: '16',
    nombre: 'Cerro Arenal',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Matagalpa',
    pueblos: [],
    stats: { hectareas_area: '1,415.20', concesiones: 1, hectareas_concesiones: '242.08', porcentaje: '17.11' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosques nubosos', 'Sistemas agroforestales'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local e internacional'],
    descripcion: 'La Reserva Natural Cerro El Arenal se ubica en el norte de Nicaragua, en el departamento de Matagalpa, fue creada en el año 1991 mediante el decreto 42-91. Dicha reserva forma parte de las zonas montañosas de Matagalpa con alta producción de café, turismo rural y recursos hídricos.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesiones mineras a 1 empresas mineras chinas que cubren 17,11 % de su superficie. Dicha concesión afecta las fincas, Las Brisas, San Luis, San Antonio y Verona; vecinas a la finca Selva Negra, sitio de referencia nacional e internacional. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques nubosos y sistemas agroforestales, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local e internacional.',
    paises: ['china'],
    territorios_relacionados: [],
  },

  /* ── 17 ── Cerro Quiabuc – Las Brisas ─────────────────────────────────── */
  {
    ...COMUNES,
    id: 'ap-17-quiabuc-las-brisas',
    numero: '17',
    nombre: 'Cerro Quiabuc – Las Brisas',
    categoria: 'Reserva Natural',
    seccion: 'macizos',
    ubicacion: 'Estelí',
    pueblos: [],
    stats: { hectareas_area: '14,627.50', concesiones: 1, hectareas_concesiones: '5,906.42', porcentaje: '40.38' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: ['Bosques de pino y robles', 'Bosques nubosos'],
    impactos: [...IMPACTOS_BASE, 'Afectaciones al turismo local'],
    descripcion: 'La Reserva Natural Cerro Quiabuc - Las Brisas se ubica en el norte de Nicaragua, en el departamento de Estelí, fue creada en el año 1991 mediante el decreto 42-91. Esta área protegida alberga los picos gemelos más altos del departamento, el Cerro La Fila y el cerro Las Brisas ambos con 1,603.8 msnm.',
    concesion_minera: 'Dentro del área protegida se han otorgado 1 lote de concesión minera a 1 empresa británica que cubren el 40,38% de su superficie. La actividad minera en esta área protegida pone en riesgos sus principales ecosistemas de bosques de pino y robles, y bosques nubosos, sus principales impactos serían el cambio de uso de suelo y deforestación, contaminación del suelo y fuentes hídricas, pérdida del hábitat de la fauna y la biodiversidad, y el turismo local.',
    paises: ['reino-unido'],
    territorios_relacionados: [],
  },

  /* ── 18 ── Cerro Cumaica – Cerro Alegre ─ texto pendiente ─────────────── */
  {
    ...COMUNES,
    id: 'ap-18-cumaica-cerro-alegre',
    numero: '18',
    nombre: 'Cerro Cumaica – Cerro Alegre',
    categoria: 'Reserva Natural',
    seccion: 'centro',
    ubicacion: 'Boaco',
    pueblos: [],
    stats: { hectareas_area: '13,463.23', concesiones: 1, hectareas_concesiones: '204.73', porcentaje: '1.52' },
    ficha: { creacion: '1991', instrumento: 'Decreto 42-91', biosfera: null, ramsar: null },
    ecosistemas: [],
    impactos: ['Afecta 9 quebradas y 16 ríos', '213.08 km de red hídrica superficial'],
    // ⚠️ FDR: descripción incompleta en el documento fuente.
    descripcion: 'La Reserva Natural Cerro Cumaica - Cerro Alegre se ubica en el centro de Nicaragua, entre el departamento de Boaco, fue creada en el año 1991 mediante el decreto 42-91.',
    concesion_minera: 'Dentro del área protegida se ha otorgado 1 lote de concesión minera a 1 empresa minera chinas que cubren 1,52 % de su superficie. Dichas concesiones mineras afectan de forma directa 9 quebradas y 16 ríos, para un total de 213.08 kilómetros de longitud de la red hídrica superficial.',
    paises: ['china'],
    territorios_relacionados: [],
  },
];

function getArea(id) {
  return AREAS_PROTEGIDAS.find(a => a.id === id) || null;
}

function getBadgeClass(pais) {
  const clases = {
    china: 'badge-china',
    canada: 'badge-canada',
    colombia: 'badge-colombia',
    'reino-unido': 'badge-reino-unido',
    nacional: 'badge-nacional',
    reserva: 'badge-reserva',
    'sin-nombre': 'badge-sin-nombre',
  };
  return clases[pais] || 'badge-reserva';
}

function getLabelPais(pais) {
  const labels = {
    china: 'China',
    canada: 'Canadá',
    colombia: 'Colombia',
    'reino-unido': 'Reino Unido',
    nacional: 'Nicaragua',
    reserva: 'Reserva',
    'sin-nombre': 'Sin identificar',
  };
  return labels[pais] || pais;
}

/** Totales de portada — calculados, no escritos a mano. */
function getTotales() {
  const num = s => parseFloat(String(s).replace(/,/g, '')) || 0;
  const paises = new Set(AREAS_PROTEGIDAS.flatMap(a => a.paises || []));
  return {
    areas: AREAS_PROTEGIDAS.length,
    lotes: AREAS_PROTEGIDAS.reduce((s, a) => s + (a.stats?.concesiones || 0), 0),
    hectareas: AREAS_PROTEGIDAS.reduce((s, a) => s + num(a.stats?.hectareas_concesiones), 0),
    paises: paises.size,
  };
}

export { AREAS_PROTEGIDAS, SECCIONES, getArea, getBadgeClass, getLabelPais, getTotales };
