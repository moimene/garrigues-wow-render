export type EstadoUE = 'vigente' | 'proceso' | 'planificada' | 'revision';
export type EstadoES = 'directa' | 'transpuesta' | 'parcial' | 'pendiente' | 'propuesta';
export type TipoNorma = 'Reglamento' | 'Directiva' | 'Propuesta';

export interface Norma {
  nombre: string;
  tipo: TipoNorma;
  estadoES: EstadoES;
  transposicionES: string;
  plazo: string;
}

export interface Bloque {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
  vigentes: number;
  enProceso: number;
  planificadas: number;
  enRevision: number;
  reglamentos: number;
  directivas: number;
  normas: Norma[];
}

export const bloques: Bloque[] = [
  {
    id: 1, nombre: 'Investigación e Innovación Digitales',
    descripcion: 'IA, cloud, computación cuántica, HPC, programas de I+D (Horizonte Europa, Europa Digital)',
    color: '#004438', vigentes: 4, enProceso: 3, planificadas: 2, enRevision: 0, reglamentos: 4, directivas: 0,
    normas: [
      { nombre: 'AI Act (Reg. 2024/1689)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde agosto 2025. AESIA designada como autoridad nacional de supervisión.', plazo: 'Plena agosto 2027' },
      { nombre: 'Horizonte Europa', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. CDTI como punto de contacto nacional.', plazo: '—' },
      { nombre: 'Programa Europa Digital', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. SEDIA coordina participación nacional. EDIHs españoles designados.', plazo: '—' },
      { nombre: 'EuroHPC Joint Undertaking', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. BSC-CNS (Barcelona) acoge MareNostrum5.', plazo: '—' },
      { nombre: 'EU Inc. (28th Regime)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Propuesta publicada 18.03.2026. Forma jurídica UE opcional.', plazo: 'Acuerdo finales 2026' },
      { nombre: 'Cloud and AI Development Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta formal.', plazo: '—' },
      { nombre: 'Quantum Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta formal.', plazo: '—' },
      { nombre: 'Digital Omnibus on AI', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Modifica AI Act: simplifica obligaciones para pymes.', plazo: 'Trílogos primavera 2026' },
      { nombre: 'EU Space Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Propuesta COM(2025) 335. Seguridad, resiliencia y sostenibilidad espacial.', plazo: 'Aplicación: 01.01.2030' },
    ]
  },
  {
    id: 2, nombre: 'Política Industrial y Competitividad Digital',
    descripcion: 'Semiconductores, materias primas críticas, pymes digitales, startups, estándares TIC',
    color: '#007362', vigentes: 3, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 0,
    normas: [
      { nombre: 'Chips Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. PERTE Chip aprobado. España participa en IPCEI Microelectrónica 2.', plazo: 'Evaluación Q1 2026' },
      { nombre: 'Critical Raw Materials Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. España identificada como fuente clave de litio en la UE.', plazo: '—' },
      { nombre: 'Net-Zero Industry Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Integrado con PNIEC español.', plazo: '—' },
      { nombre: 'European Innovation Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta formal.', plazo: '—' },
    ]
  },
  {
    id: 3, nombre: 'Conectividad y Comunicaciones Electrónicas',
    descripcion: 'Telecomunicaciones, 5G/6G, espectro, roaming, neutralidad de red, banda ancha',
    color: '#6dc1b0', vigentes: 4, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 1,
    normas: [
      { nombre: 'Código Europeo de Comunicaciones (EECC)', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por Ley 11/2022 General de Telecomunicaciones. CNMC como autoridad reguladora.', plazo: 'Cumplido' },
      { nombre: 'Reglamento BEREC', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. CNMC participa en BEREC.', plazo: '—' },
      { nombre: 'Roaming', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Roam Like at Home extendido hasta 2032.', plazo: '—' },
      { nombre: 'Gigabit Infrastructure Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 2025. Simplifica despliegue de redes.', plazo: '—' },
      { nombre: 'Digital Networks Act (DNA)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente. Sucesor parcial del EECC.', plazo: 'Propuesta Q1 2026' },
    ]
  },
  {
    id: 4, nombre: 'Datos y Privacidad',
    descripcion: 'RGPD, libre flujo de datos, open data, Data Act, Data Governance Act, ePrivacy',
    color: '#2563eb', vigentes: 7, enProceso: 2, planificadas: 0, enRevision: 0, reglamentos: 6, directivas: 1,
    normas: [
      { nombre: 'RGPD', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Complementado por LOPDGDD (LO 3/2018). AEPD como autoridad de control.', plazo: '—' },
      { nombre: 'Libre Flujo Datos No Personales', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Punto de contacto: Sec. Estado Digitalización.', plazo: '—' },
      { nombre: 'Open Data Directive', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021. Portal datos.gob.es.', plazo: 'Cumplido' },
      { nombre: 'Data Governance Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde septiembre 2023.', plazo: '—' },
      { nombre: 'Data Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 12 septiembre 2025.', plazo: 'Sept. 2025' },
      { nombre: 'European Health Data Space', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa escalonada (2025-2029).', plazo: '2025-2029' },
      { nombre: 'Interoperable Europe Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 12 abril 2024.', plazo: '—' },
      { nombre: 'Reglamento ePrivacy', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Bloqueado en Consejo desde 2017.', plazo: '—' },
      { nombre: 'Digital Omnibus Regulation (datos)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Modifica RGPD, Data Act, ePrivacy. Deroga DGA, Open Data Dir.', plazo: 'Trílogos primavera 2026' },
    ]
  },
  {
    id: 5, nombre: 'Propiedad Intelectual en el Entorno Digital',
    descripcion: 'Derechos de autor, licencias digitales, snippet tax, retransmisiones online',
    color: '#7c3aed', vigentes: 3, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 0, directivas: 3,
    normas: [
      { nombre: 'Dir. Derechos de Autor DSM', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021 que modifica TRLPI.', plazo: 'Cumplido' },
      { nombre: 'Dir. Retransmisiones Online', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021. Principio de país de origen.', plazo: 'Cumplido' },
      { nombre: 'Community Design Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Deberá modificar Ley 20/2003.', plazo: 'Previsto 2027' },
      { nombre: 'Compulsory licensing of patents', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación legislativa.', plazo: '—' },
    ]
  },
  {
    id: 6, nombre: 'Ciberseguridad y Resiliencia Digital',
    descripcion: 'NIS2, Cybersecurity Act, DORA, ENISA, certificación, respuesta a incidentes',
    color: '#dc2626', vigentes: 5, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 4, directivas: 1,
    normas: [
      { nombre: 'Cybersecurity Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. CCN-CERT y ENISA colaboran en certificación.', plazo: '—' },
      { nombre: 'NIS 2 Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Plazo vencido (17.10.2024). Anteproyecto aprobado enero 2025. En tramitación parlamentaria.', plazo: 'Vencido 17.10.2024' },
      { nombre: 'DORA', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 17 enero 2025. BdE, CNMV y DGSFP como supervisores.', plazo: 'En vigor enero 2025' },
      { nombre: 'Cyber Resilience Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa escalonada. Productos con elementos digitales.', plazo: '2025-2027' },
      { nombre: 'Cyber Solidarity Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. INCIBE participa como hub nacional.', plazo: '—' },
      { nombre: 'Digital Omnibus Regulation (ciber)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Modifica NIS2: simplifica obligaciones.', plazo: 'Trílogos primavera 2026' },
    ]
  },
  {
    id: 7, nombre: 'Aplicación de la Ley y Seguridad Digital',
    descripcion: 'PNR, pruebas electrónicas (e-Evidence), cooperación policial, Europol, Eurojust',
    color: '#1e3a5f', vigentes: 5, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 2, directivas: 3,
    normas: [
      { nombre: 'Directiva PNR', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por LO 1/2020. Unidad de Información sobre Pasajeros (UIP).', plazo: 'Cumplido' },
      { nombre: 'Reglamento e-Evidence', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde agosto 2026.', plazo: 'Agosto 2026' },
      { nombre: 'Dir. e-Evidence (representante)', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Obliga a designar representante legal.', plazo: '18.08.2026' },
      { nombre: 'Reglamento Europol', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Policía Nacional y Guardia Civil como puntos de contacto.', plazo: '—' },
      { nombre: 'Dir. Violencia contra Mujeres', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Incluye ciberviolencia. Deberá modificar CP y Ley 1/2004.', plazo: '14.06.2027' },
    ]
  },
  {
    id: 8, nombre: 'Confianza y Seguridad en Línea (Plataformas)',
    descripcion: 'DSA, moderación de contenidos, contenidos terroristas, dark patterns, Digital Fairness Act',
    color: '#c2410c', vigentes: 3, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 0,
    normas: [
      { nombre: 'Digital Services Act (DSA)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde febrero 2024. CNMC como Coordinador de Servicios Digitales.', plazo: 'En vigor' },
      { nombre: 'Reg. Contenidos Terroristas', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde junio 2022. Audiencia Nacional como autoridad.', plazo: '—' },
      { nombre: 'Political Advertising Regulation', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde octubre 2025. JEC como autoridad supervisora.', plazo: 'Octubre 2025' },
      { nombre: 'Digital Fairness Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente. Dark patterns, diseño adictivo, profiling menores.', plazo: '—' },
    ]
  },
  {
    id: 9, nombre: 'Comercio Electrónico y Protección del Consumidor',
    descripcion: 'Geo-blocking, IVA e-commerce, garantías digitales, contenidos y servicios digitales, responsabilidad por producto',
    color: '#b45309', vigentes: 7, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 2, directivas: 5,
    normas: [
      { nombre: 'Reg. Geo-Blocking', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. AECOSAN como punto de contacto.', plazo: '—' },
      { nombre: 'Dir. Contenidos Digitales', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Garantía legal de 2 años.', plazo: 'Cumplido' },
      { nombre: 'Dir. Ventas Bienes con Elementos Digitales', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Garantía extendida a 3 años.', plazo: 'Cumplido' },
      { nombre: 'Dir. Omnibus Consumo', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Transparencia en marketplaces online.', plazo: 'Cumplido' },
      { nombre: 'General Product Safety Reg.', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde diciembre 2024. AECOSAN como autoridad.', plazo: 'En vigor' },
      { nombre: 'Product Liability Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Extiende responsabilidad a software e IA.', plazo: '09.12.2026' },
      { nombre: 'Right to Repair Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Deberá modificar TRLGDCU.', plazo: '31.07.2026' },
      { nombre: 'Digital Fairness Act (consumo)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta.', plazo: '—' },
    ]
  },
  {
    id: 10, nombre: 'Competencia y Mercado Único Digital',
    descripcion: 'DMA, gatekeepers, antimonopolio digital, subvenciones foráneas, trabajo en plataformas',
    color: '#0f766e', vigentes: 4, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 1,
    normas: [
      { nombre: 'Digital Markets Act (DMA)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde mayo 2023. CNMC vía EDCN.', plazo: '—' },
      { nombre: 'Reg. Subvenciones Foráneas', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde julio 2023.', plazo: '—' },
      { nombre: 'Platform Work Directive', tipo: 'Directiva', estadoES: 'parcial', transposicionES: 'Transposición parcial por Ley Rider (RDL 9/2021). La Directiva UE es más amplia.', plazo: '02.12.2026' },
      { nombre: 'EU Inc. (28th Regime)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Propuesta 18.03.2026. Forma societaria UE opcional.', plazo: 'Acuerdo finales 2026' },
      { nombre: 'Crowdfunding Regulation', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. CNMV como autoridad competente.', plazo: '—' },
    ]
  },
  {
    id: 11, nombre: 'Medios de Comunicación y Contenido Audiovisual',
    descripcion: 'AVMS Directive, Media Freedom Act, cuota europea, regulación de plataformas de vídeo',
    color: '#9333ea', vigentes: 3, enProceso: 0, planificadas: 0, enRevision: 1, reglamentos: 1, directivas: 2,
    normas: [
      { nombre: 'Directiva AVMS (revisada)', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por Ley 13/2022, LGCA. CNMC como autoridad audiovisual. Cuota 30% obra europea en VOD.', plazo: 'Cumplido' },
      { nombre: 'European Media Freedom Act (EMFA)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde agosto 2025. CNMC en EBMS.', plazo: 'Agosto 2025' },
      { nombre: 'Copyright Directive (impacto medios)', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021. Art. 15 derecho afín editores de prensa.', plazo: 'Cumplido' },
      { nombre: 'Revisión Directiva AVMS', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta de revisión. Prevista Q3 2026.', plazo: '—' },
    ]
  },
  {
    id: 12, nombre: 'Servicios Financieros Digitales y Criptoactivos',
    descripcion: 'PSD2/PSD3, MiCA, DORA, euro digital, crowdfunding, prevención blanqueo',
    color: '#0369a1', vigentes: 5, enProceso: 3, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 2,
    normas: [
      { nombre: 'PSD2', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 19/2018. BdE como supervisor.', plazo: 'Cumplido' },
      { nombre: 'MiCA (Criptoactivos)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa escalonada. CNMV como autoridad.', plazo: 'Plena aplicación' },
      { nombre: 'DORA', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde enero 2025. BdE, CNMV y DGSFP.', plazo: 'En vigor enero 2025' },
      { nombre: 'AML/6ª Directiva AML', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Deberá modificar Ley 10/2010. SEPBLAC como UIF.', plazo: '10.07.2027' },
      { nombre: 'Reg. AML (anti-blanqueo)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa escalonada. Supervisión cripto-exchanges.', plazo: '2025-2027' },
      { nombre: 'PSD3 / PSR', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación. Derogará PSD2/RDL 19/2018.', plazo: '—' },
      { nombre: 'Euro Digital', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación. BdE y BCE coordinarán.', plazo: '—' },
      { nombre: 'FIDA (Open Finance)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación.', plazo: '—' },
    ]
  },
];

export interface TimelineEvent {
  fecha: string;
  titulo: string;
  descripcion: string;
  estado: EstadoUE;
  bloques: number[];
}

export const cronologia: TimelineEvent[] = [
  { fecha: '19.11.2025', titulo: 'Digital Omnibus Package', descripcion: 'Dos propuestas de Reglamento que modifican RGPD, Data Act, NIS2, ePrivacy y AI Act. Ahorro previsto: 6.000M€ hasta 2029.', estado: 'proceso', bloques: [1, 4, 6] },
  { fecha: '18.03.2026', titulo: 'EU Inc. (28th Regime)', descripcion: 'Nueva forma societaria UE, constitución en 48h, <100€, sin capital mínimo, digital por defecto.', estado: 'proceso', bloques: [1, 10] },
  { fecha: 'Q1 2026', titulo: 'Cloud and AI Development Act', descripcion: 'Triplicar capacidad centros de datos UE, soberanía cloud, interoperabilidad.', estado: 'planificada', bloques: [1, 2, 4] },
  { fecha: 'Q1 2026', titulo: 'European Innovation Act', descripcion: 'Eliminar barreras regulatorias a innovación, colaboración industria-academia.', estado: 'planificada', bloques: [1, 2, 10] },
  { fecha: 'Q1 2026', titulo: 'Digital Networks Act (DNA)', descripcion: 'Sucesor del EECC: permisos, 6G, espectro, open RAN europeas.', estado: 'planificada', bloques: [3] },
  { fecha: 'Q1 2026', titulo: 'Chips Act Evaluation', descripcion: 'Evaluación de implementación del Reglamento de Semiconductores.', estado: 'revision', bloques: [1, 2] },
  { fecha: 'Q2 2026', titulo: 'Quantum Act', descripcion: 'Marco de financiación para tecnologías cuánticas, cadena de suministro.', estado: 'planificada', bloques: [1, 2] },
  { fecha: '31.07.2026', titulo: 'Plazo transposición Right to Repair Dir.', descripcion: 'España debe transponer Dir. 2024/1799 sobre derecho a reparación.', estado: 'vigente', bloques: [9] },
  { fecha: '18.08.2026', titulo: 'Plazo transposición Dir. e-Evidence', descripcion: 'Obliga a proveedores a designar representante legal.', estado: 'vigente', bloques: [7] },
  { fecha: 'Q3 2026', titulo: 'Revisión Directiva AVMS', descripcion: 'Adaptación a plataformas, algoritmos de recomendación, deepfakes.', estado: 'revision', bloques: [11] },
  { fecha: 'Q4 2026', titulo: 'Digital Fairness Act', descripcion: 'Dark patterns, diseño adictivo, profiling menores, dynamic pricing.', estado: 'planificada', bloques: [8, 9] },
  { fecha: '02.12.2026', titulo: 'Plazo transposición Platform Work Directive', descripcion: 'Regulación trabajo en plataformas digitales. Ley Rider parcial.', estado: 'vigente', bloques: [10] },
  { fecha: '09.12.2026', titulo: 'Plazo transposición Product Liability Directive', descripcion: 'Modificará TRLGDCU para incluir software e IA.', estado: 'vigente', bloques: [9] },
  { fecha: '14.06.2027', titulo: 'Plazo transposición Dir. Violencia contra Mujeres', descripcion: 'Incluye ciberviolencia. Deberá modificar CP y Ley 1/2004.', estado: 'vigente', bloques: [7] },
  { fecha: '10.07.2027', titulo: 'Plazo transposición 6ª Directiva AML', descripcion: 'Modificará Ley 10/2010. Registros de titularidad real centralizados.', estado: 'vigente', bloques: [12] },
];

export interface Recurso {
  nombre: string;
  descripcion: string;
  categoria: 'despachos' | 'thinktanks' | 'instituciones' | 'herramientas';
}

export const recursos: Recurso[] = [
  { nombre: 'Bird & Bird – Data Act Tracker', descripcion: 'Estado de implementación del Data Act por Estado miembro', categoria: 'despachos' },
  { nombre: 'Bird & Bird – DSA Tracker', descripcion: 'Implementación del DSA y Coordinadores Digitales por país', categoria: 'despachos' },
  { nombre: 'DLA Piper – DSA Tracker', descripcion: 'Seguimiento nacional del DSA con expertos por jurisdicción', categoria: 'despachos' },
  { nombre: 'Linklaters – DMA Hub', descripcion: 'Hub integral sobre alcance, obligaciones y litigación del DMA', categoria: 'despachos' },
  { nombre: 'White & Case – AI Watch', descripcion: 'Seguimiento global de regulación de IA con cobertura UE', categoria: 'despachos' },
  { nombre: 'CEPS – Dataset EU Legal Instruments', descripcion: '4.ª edición (julio 2025): dataset completo legislación digital UE', categoria: 'thinktanks' },
  { nombre: 'Bruegel – Dataset EU Legislation', descripcion: 'Legislación clave, propuestas pendientes e iniciativas', categoria: 'thinktanks' },
  { nombre: 'OECD – Digital Regulatory Frameworks', descripcion: 'Herramienta para comparar gobernanza regulatoria entre países', categoria: 'thinktanks' },
  { nombre: 'Digital Watch Observatory', descripcion: 'Monitoreo en tiempo real de gobernanza digital UE', categoria: 'thinktanks' },
  { nombre: 'EUR-Lex – Mercado Único Digital', descripcion: 'Base de datos legislativa oficial de la UE', categoria: 'instituciones' },
  { nombre: 'Comisión Europea – Portal Digital', descripcion: 'Hub oficial con actualizaciones y guías de implementación', categoria: 'instituciones' },
  { nombre: 'Parlamento Europeo – Legislative Train', descripcion: 'Progreso legislativo de propuestas digitales', categoria: 'instituciones' },
  { nombre: 'Portal Digital Markets Act', descripcion: 'Portal oficial DMA: gatekeepers designados, enforcement', categoria: 'instituciones' },
  { nombre: 'Snellman – EU Digital Compliance', descripcion: 'Plataforma interactiva sobre regulación digital UE', categoria: 'herramientas' },
  { nombre: 'MediaLaws – EU Digital Law Tracker', descripcion: 'Observatorio interactivo de desarrollos legislativos', categoria: 'herramientas' },
  { nombre: 'AI Act Explorer', descripcion: 'Herramienta interactiva artículo por artículo del AI Act', categoria: 'herramientas' },
  { nombre: 'EY – European Digital Map', descripcion: 'Análisis del panorama regulatorio con guía por país', categoria: 'herramientas' },
];
