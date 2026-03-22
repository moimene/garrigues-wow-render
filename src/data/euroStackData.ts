/**
 * EuroStack & Digital Building Blocks — Datos para la capa de infraestructura soberana
 *
 * Fuentes:
 * - EuroStack Report (Bertelsmann Stiftung, 2025)
 * - Digital Building Blocks Programme (Comisión Europea / CEF + Programa Europa Digital)
 *
 * AVISO EDITORIAL: EuroStack es una propuesta estratégica de la Fundación Bertelsmann,
 * no un acto jurídico vinculante de la Unión Europea. Los Building Blocks son instrumentos
 * técnicos operativos del programa Europa Digital de la Comisión.
 */

export type BBEstado = 'operativo' | 'pilotaje' | 'desarrollo' | 'sin-equivalente';

export interface BuildingBlock {
  id: string;
  nombre: string;
  descripcionCorta: string;
  descripcionLarga: string;
  bloqueIds: number[]; // B1-B12 vinculados
  estado: BBEstado;
  url?: string;
  casosReutilizacion?: number;
  funcionEnDSM: string;
}

export type SovereigntyLevel =
  | 'bb-operativo'
  | 'bb-pilotaje'
  | 'parcial'
  | 'sin-equivalente';

export interface SovereigntyMapping {
  bloqueId: number;
  nivel: SovereigntyLevel;
  buildingBlocks: string[];
  nota: string;
}

export interface EuroStackPrincipio {
  id: string;
  titulo: string;
  descripcion: string;
  ordinal: string;
}

// ─── Building Blocks ────────────────────────────────────────────

export const buildingBlocks: BuildingBlock[] = [
  {
    id: 'eid',
    nombre: 'eID / EUDI Wallet',
    descripcionCorta: 'Identificación electrónica y cartera de identidad digital europea.',
    descripcionLarga: 'Proporciona la arquitectura técnica de referencia, los estándares de interoperabilidad y las especificaciones que los Estados miembros reutilizan para desplegar carteras de identidad digital conforme al Reglamento 2024/1183 (eIDAS revisado). Los actos de ejecución adoptados en noviembre de 2024 (Reglamentos 2024/2979 y 2024/2982) establecen las especificaciones de los protocolos de interfaz.',
    bloqueIds: [7],
    estado: 'pilotaje',
    url: 'https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eID',
    casosReutilizacion: 45,
    funcionEnDSM: 'Vehículo técnico soberano para cumplir las obligaciones de identificación electrónica y cartera digital del Reglamento eIDAS revisado.',
  },
  {
    id: 'esignature',
    nombre: 'eSignature',
    descripcionCorta: 'Creación y validación de firmas y sellos electrónicos cualificados.',
    descripcionLarga: 'Especificaciones técnicas para la generación, validación y preservación de firmas electrónicas cualificadas. Los actos de ejecución del eIDAS revisado exigen que las carteras permitan generar firmas electrónicas cualificadas de forma gratuita para personas físicas.',
    bloqueIds: [7],
    estado: 'operativo',
    url: 'https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eSignature',
    casosReutilizacion: 80,
    funcionEnDSM: 'Instrumento técnico para servicios de confianza cualificados exigidos por el marco eIDAS.',
  },
  {
    id: 'edelivery',
    nombre: 'eDelivery',
    descripcionCorta: 'Intercambio seguro e interoperable de documentos y evidencias.',
    descripcionLarga: 'Solución de entrega segura, interoperable y neutral en cuanto a proveedores para intercambios entre administraciones, empresas y ciudadanos. Ya desplegada en la red PEPPOL para facturación electrónica y en el OOTS para el intercambio transfronterizo de evidencias.',
    bloqueIds: [8, 13],
    estado: 'operativo',
    url: 'https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eDelivery',
    casosReutilizacion: 120,
    funcionEnDSM: 'Infraestructura de comunicación segura que ejecuta obligaciones de intercambio del EECC y del Reglamento de Ventanilla Digital Única.',
  },
  {
    id: 'oots',
    nombre: 'OOTS (Once-Only Technical System)',
    descripcionCorta: 'Primer espacio de datos transfronterizo del sector público de la UE.',
    descripcionLarga: 'Sistema técnico que permite a los ciudadanos y empresas presentar datos una sola vez ante las administraciones públicas europeas, reutilizando eID para autenticación y eDelivery para el intercambio seguro de evidencias. Constituye el primer espacio de datos transfronterizo del sector público de la Unión.',
    bloqueIds: [13],
    estado: 'pilotaje',
    url: 'https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/Once+Only+Technical+System',
    casosReutilizacion: 25,
    funcionEnDSM: 'Ejecuta el sistema técnico del Reglamento de Ventanilla Digital Única y anticipa la arquitectura de los espacios de datos europeos.',
  },
];

// ─── Mapeo de soberanía por bloque ──────────────────────────────

export const sovereigntyMap: SovereigntyMapping[] = [
  { bloqueId: 1, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'La protección de datos se apoya en marcos normativos, no en infraestructura técnica específica del programa de Building Blocks. La supervisión depende de autoridades nacionales.' },
  { bloqueId: 2, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'Los servicios digitales se regulan por obligaciones de diligencia, sin Building Block técnico asociado. La supervisión depende de autoridades nacionales de servicios digitales.' },
  { bloqueId: 3, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'La competencia en plataformas se gestiona mediante supervisión ex ante de la Comisión. No existe un Building Block técnico equivalente.' },
  { bloqueId: 4, nivel: 'parcial', buildingBlocks: ['oots'], nota: 'El OOTS anticipa la arquitectura de espacios de datos. La Ley de Datos y la Ley de Gobernanza buscan generalizar este modelo, pero los espacios sectoriales están en desarrollo.' },
  { bloqueId: 5, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'El Reglamento de IA no tiene Building Block asociado, aunque la propuesta EuroStack plantea IA soberana como componente futuro del ecosistema europeo.' },
  { bloqueId: 6, nivel: 'parcial', buildingBlocks: [], nota: 'La ciberseguridad es principio de diseño transversal de todos los Building Blocks, coherente con NIS2 y el Reglamento de Resiliencia Cibernética, pero no tiene un BB propio.' },
  { bloqueId: 7, nivel: 'bb-pilotaje', buildingBlocks: ['eid', 'esignature'], nota: 'El bloque con mayor correspondencia directa. eID/EUDI Wallet y eSignature son los vehículos técnicos de referencia del Reglamento eIDAS revisado.' },
  { bloqueId: 8, nivel: 'bb-operativo', buildingBlocks: ['edelivery'], nota: 'eDelivery está plenamente operativo y desplegado en redes como PEPPOL. Proporciona comunicación segura e interoperable para el marco de comunicaciones electrónicas.' },
  { bloqueId: 9, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'Los pagos y la resiliencia financiera dependen de infraestructuras sectoriales (TARGET, SEPA). El euro digital podría constituir un Building Block futuro según EuroStack.' },
  { bloqueId: 10, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'La protección de consumidores digitales se articula mediante normas y cooperación entre autoridades, sin infraestructura técnica soberana específica.' },
  { bloqueId: 11, nivel: 'sin-equivalente', buildingBlocks: [], nota: 'La propiedad intelectual digital se gestiona mediante marcos normativos y entidades de gestión, sin Building Block técnico asociado.' },
  { bloqueId: 12, nivel: 'bb-pilotaje', buildingBlocks: ['oots', 'edelivery'], nota: 'El OOTS y eDelivery conforman la infraestructura técnica del sector público digital. España figura como frontrunner en implementación del Marco Europeo de Interoperabilidad.' },
];

// ─── Principios EuroStack ───────────────────────────────────────

export const euroStackPrincipios: EuroStackPrincipio[] = [
  { id: 'soberania', titulo: 'Soberanía tecnológica', descripcion: 'Reducir la dependencia estructural del 80 % de infraestructura y tecnologías digitales importadas, desarrollando alternativas europeas en capas críticas.', ordinal: '01' },
  { id: 'interoperabilidad', titulo: 'Interoperabilidad por diseño', descripcion: 'Los componentes deben ser compatibles entre sí y con estándares abiertos, evitando bloqueos de proveedor y facilitando la reutilización transfronteriza.', ordinal: '02' },
  { id: 'apertura', titulo: 'Código abierto y estándares abiertos', descripcion: 'Priorizar soluciones de código abierto y estándares públicos que permitan auditoría, adaptación y contribución por parte de cualquier actor europeo.', ordinal: '03' },
  { id: 'seguridad', titulo: 'Seguridad y privacidad por defecto', descripcion: 'Toda infraestructura soberana debe incorporar seguridad por diseño, coherente con NIS2, el Reglamento de Resiliencia Cibernética y el RGPD.', ordinal: '04' },
  { id: 'escalabilidad', titulo: 'Escalabilidad paneuropea', descripcion: 'Las soluciones deben funcionar a escala de mercado único, no como proyectos piloto aislados. Los Building Blocks acumulan más de 300 reutilizaciones documentadas.', ordinal: '05' },
  { id: 'sostenibilidad', titulo: 'Sostenibilidad y eficiencia', descripcion: 'Evitar duplicidades entre Estados miembros mediante componentes reutilizables que reducen costes y aceleran el despliegue de servicios digitales.', ordinal: '06' },
  { id: 'gobernanza', titulo: 'Gobernanza compartida', descripcion: 'La infraestructura soberana exige mecanismos de gobernanza que equilibren coordinación europea y autonomía nacional en la implementación.', ordinal: '07' },
  { id: 'confianza', titulo: 'Confianza institucional', descripcion: 'Los ciudadanos y las empresas deben confiar en que la infraestructura digital pública es segura, transparente y está bajo jurisdicción europea.', ordinal: '08' },
];

// ─── Helpers ────────────────────────────────────────────────────

export const sovereigntyLevelConfig: Record<SovereigntyLevel, { label: string; color: string; bg: string }> = {
  'bb-operativo':    { label: 'BB operativo',            color: 'var(--status-vigente)',     bg: 'rgba(0,154,119,0.12)' },
  'bb-pilotaje':     { label: 'BB en pilotaje',          color: 'var(--status-proceso)',     bg: 'rgba(245,158,11,0.10)' },
  'parcial':         { label: 'Infraestructura parcial',  color: 'var(--status-planificada)', bg: 'rgba(100,116,139,0.08)' },
  'sin-equivalente': { label: 'Sin equivalente soberano', color: 'var(--status-pendiente)',   bg: 'rgba(220,38,38,0.06)' },
};

export const getBBsForBloque = (bloqueId: number): BuildingBlock[] =>
  buildingBlocks.filter(bb => bb.bloqueIds.includes(bloqueId));

export const getSovereigntyForBloque = (bloqueId: number): SovereigntyMapping | undefined =>
  sovereigntyMap.find(s => s.bloqueId === bloqueId);
