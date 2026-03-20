export type EstadoUE = 'vigente' | 'proceso' | 'planificada' | 'revision';
export type EstadoES = 'directa' | 'transpuesta' | 'parcial' | 'pendiente' | 'propuesta';
export type TipoNorma = 'Reglamento' | 'Directiva' | 'Propuesta';
export type ActorType = 'plataformas' | 'fabricantes' | 'proveedores' | 'administraciones' | 'pymes' | 'financieras' | 'telecoms' | 'medios';

export interface Norma {
  nombre: string;
  tipo: TipoNorma;
  estadoES: EstadoES;
  transposicionES: string;
  plazo: string;
}

export interface ObligacionActor {
  actor: ActorType;
  intensidad: 'alta' | 'media' | 'baja' | 'nula';
  obligaciones: string[];
}

export interface DependenciaArea {
  areaId: number;
  tipo: 'complementariedad' | 'dependencia' | 'conflicto';
  descripcion: string;
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
  // Pedagogical content
  sintesisEjecutiva: string;
  impactoResumen: string;
  estadoUEDetalle: string;
  transposicionDetalle: string;
  obligacionesActores: ObligacionActor[];
  dependencias: DependenciaArea[];
  hitosProximos: string[];
}

export const actorLabels: Record<ActorType, string> = {
  plataformas: 'Plataformas digitales',
  fabricantes: 'Fabricantes / Hardware',
  proveedores: 'Proveedores TIC',
  administraciones: 'Administraciones públicas',
  pymes: 'Pymes y startups',
  financieras: 'Entidades financieras',
  telecoms: 'Operadores telecom',
  medios: 'Medios de comunicación',
};

export const bloques: Bloque[] = [
  {
    id: 1, nombre: 'Investigación e Innovación Digitales',
    descripcion: 'IA, cloud, computación cuántica, HPC, programas de I+D (Horizonte Europa, Europa Digital)',
    color: '#004438', vigentes: 4, enProceso: 3, planificadas: 2, enRevision: 0, reglamentos: 4, directivas: 0,
    sintesisEjecutiva: 'Este bloque agrupa las normas que regulan la investigación, desarrollo y despliegue de tecnologías digitales clave como la inteligencia artificial, la computación cuántica y la nube. El AI Act establece por primera vez un marco armonizado para la IA basado en riesgo. Los programas Horizonte Europa y Europa Digital canalizan la financiación de la UE.',
    impactoResumen: 'Las organizaciones que desarrollen o desplieguen sistemas de IA deben clasificarlos por nivel de riesgo y cumplir obligaciones proporcionales. Los proveedores de IA de alto riesgo deben registrar sus sistemas, realizar evaluaciones de conformidad y mantener documentación técnica.',
    estadoUEDetalle: 'El AI Act entró en vigor en agosto 2024 con aplicación escalonada hasta 2027. Horizonte Europa y Europa Digital están en plena ejecución. Se esperan propuestas sobre Cloud & AI Development Act y Quantum Act durante 2026.',
    transposicionDetalle: 'Los reglamentos vigentes son de aplicación directa. La AESIA ha sido designada como autoridad de supervisión del AI Act. El CDTI gestiona Horizonte Europa y la SEDIA coordina Europa Digital. Las propuestas pendientes no requieren aún transposición.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Clasificar sistemas IA por riesgo', 'Evaluación de conformidad para IA alto riesgo', 'Documentación técnica y registro en base de datos UE'] },
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Transparencia en uso de IA generativa', 'Etiquetado de contenido generado por IA', 'Supervisión humana de decisiones automatizadas'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Acceder a sandboxes regulatorios', 'Obligaciones simplificadas (Digital Omnibus)', 'Participar en EDIHs para capacitación'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Designar autoridades de supervisión', 'Facilitar acceso a entornos de prueba', 'Coordinar participación en programas UE'] },
    ],
    dependencias: [
      { areaId: 4, tipo: 'complementariedad', descripcion: 'El Data Act y el Data Governance Act proporcionan el marco de datos que alimenta los modelos de IA.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'El Cyber Resilience Act afecta a productos con IA embebida.' },
      { areaId: 2, tipo: 'dependencia', descripcion: 'El Chips Act garantiza la capacidad de hardware necesaria para computación de IA.' },
    ],
    hitosProximos: ['AI Act: aplicación plena agosto 2027', 'Cloud & AI Development Act: propuesta esperada Q1 2026', 'Digital Omnibus on AI: trílogos primavera 2026'],
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
    sintesisEjecutiva: 'Bloque centrado en asegurar la autonomía estratégica de la UE en tecnologías críticas. El Chips Act busca duplicar la cuota europea en semiconductores al 20% para 2030. El Critical Raw Materials Act asegura el suministro de minerales estratégicos.',
    impactoResumen: 'Los fabricantes de semiconductores y empresas de la cadena de suministro tecnológico deben cumplir requisitos de monitorización de cadenas de valor. Las pymes se benefician de programas de apoyo y financiación.',
    estadoUEDetalle: 'Los tres reglamentos principales están vigentes y en aplicación directa. Se espera la propuesta del European Innovation Act durante 2026.',
    transposicionDetalle: 'Los reglamentos son de aplicación directa. España participa activamente a través del PERTE Chip, y ha sido identificada como fuente clave de litio en el marco del Critical Raw Materials Act.',
    obligacionesActores: [
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Monitorizar cadena de suministro de semiconductores', 'Reportar alertas tempranas de escasez', 'Cumplir requisitos de producción limpia'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Acceder a financiación PERTE Chip', 'Certificar origen de materias primas críticas', 'Participar en clusters industriales'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Facilitar permisos para nuevas plantas', 'Coordinar inventario nacional de materias primas', 'Participar en IPCEI de microelectrónica'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'dependencia', descripcion: 'Los programas de I+D dependen de la disponibilidad de semiconductores avanzados.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'La infraestructura de conectividad requiere componentes de la cadena de suministro regulada aquí.' },
    ],
    hitosProximos: ['Chips Act: evaluación Q1 2026', 'European Innovation Act: propuesta esperada 2026'],
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
    sintesisEjecutiva: 'Marco normativo para redes de telecomunicaciones, espectro radioeléctrico y despliegue de infraestructuras. El EECC armoniza la regulación de comunicaciones electrónicas. El Gigabit Infrastructure Act simplifica el despliegue de redes de alta capacidad.',
    impactoResumen: 'Los operadores de telecomunicaciones deben cumplir obligaciones de acceso, cobertura y calidad de servicio. El roaming gratuito se extiende hasta 2032. Se anticipan cambios significativos con el Digital Networks Act.',
    estadoUEDetalle: 'El EECC, el Reglamento BEREC, Roaming y Gigabit Infrastructure Act están vigentes. El Digital Networks Act, sucesor parcial del EECC, está en fase de propuesta prevista para Q1 2026.',
    transposicionDetalle: 'El EECC fue transpuesto por la Ley 11/2022 General de Telecomunicaciones. La CNMC actúa como autoridad reguladora nacional. Los reglamentos restantes son de aplicación directa.',
    obligacionesActores: [
      { actor: 'telecoms', intensidad: 'alta', obligaciones: ['Cumplir obligaciones de acceso y cobertura', 'Reportar a BEREC vía CNMC', 'Permitir despliegue de infraestructura compartida'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Facilitar permisos de despliegue de redes', 'Gestionar espectro radioeléctrico', 'Aplicar la Ley 11/2022'] },
      { actor: 'pymes', intensidad: 'baja', obligaciones: ['Beneficiarse de obligaciones de acceso mayorista', 'Acceder a redes compartidas'] },
    ],
    dependencias: [
      { areaId: 2, tipo: 'dependencia', descripcion: 'La industria de semiconductores proporciona componentes esenciales para redes 5G/6G.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'NIS2 impone requisitos de ciberseguridad a operadores de telecomunicaciones.' },
    ],
    hitosProximos: ['Digital Networks Act: propuesta Q1 2026', 'Roaming: extendido hasta 2032'],
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
    sintesisEjecutiva: 'El bloque más denso del DSM. Abarca desde la protección de datos personales (RGPD) hasta la gobernanza de datos industriales (Data Governance Act) y el acceso a datos generados por dispositivos (Data Act). La UE busca equilibrar protección de derechos y flujo de datos como motor económico.',
    impactoResumen: 'Todas las organizaciones que traten datos personales deben cumplir el RGPD. Los fabricantes de dispositivos conectados deben facilitar acceso a los datos generados (Data Act). Las administraciones deben compartir datos de alto valor en formato abierto.',
    estadoUEDetalle: 'Siete normas vigentes conforman un marco maduro. El Data Act se aplica plenamente desde septiembre 2025. El Digital Omnibus propone simplificar interacciones entre RGPD, Data Act y ePrivacy.',
    transposicionDetalle: 'El RGPD se complementa con la LOPDGDD (LO 3/2018), con la AEPD como autoridad de control. La Open Data Directive fue transpuesta por RDL 24/2021. Los reglamentos restantes son de aplicación directa.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Cumplir RGPD en tratamiento masivo de datos', 'Facilitar portabilidad de datos (Data Act)', 'Interoperabilidad de datos entre servicios cloud'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Permitir acceso a datos generados por IoT', 'Diseñar productos con acceso a datos por defecto', 'No imponer cláusulas contractuales abusivas'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Publicar datos de alto valor en formato abierto', 'Implementar Interoperable Europe Act', 'Designar puntos de contacto para gobernanza de datos'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir RGPD con enfoque proporcional', 'Beneficiarse de espacios de datos sectoriales', 'Acceder a datos compartidos vía DGA'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'complementariedad', descripcion: 'Los datos son el insumo fundamental para el desarrollo de IA y computación cuántica.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'La protección de datos y la ciberseguridad comparten requisitos de seguridad de la información.' },
      { areaId: 12, tipo: 'dependencia', descripcion: 'Los datos financieros regulados por FIDA (Open Finance) se cruzan con el marco de gobernanza de datos.' },
    ],
    hitosProximos: ['Data Act: aplicación plena desde sept. 2025', 'EHDS: aplicación escalonada 2025-2029', 'Digital Omnibus (datos): trílogos primavera 2026'],
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
    sintesisEjecutiva: 'Regula la protección de derechos de autor en el entorno digital, incluyendo el derecho afín de editores de prensa, licencias de contenido online y el principio de país de origen para retransmisiones. La Community Design Directive modernizará la protección de diseños industriales.',
    impactoResumen: 'Las plataformas que alojan contenido generado por usuarios deben implementar mecanismos de licenciamiento y filtrado. Los editores de prensa tienen un nuevo derecho afín sobre sus publicaciones. Los fabricantes deberán adaptar su protección de diseños.',
    estadoUEDetalle: 'Tres directivas vigentes ya transpuestas. La Community Design Directive está pendiente de transposición. La licencia obligatoria de patentes está en tramitación.',
    transposicionDetalle: 'Las tres directivas principales fueron transpuestas por RDL 24/2021, que modifica el TRLPI. La Community Design Directive requerirá modificar la Ley 20/2003 de Diseño Industrial.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Implementar mecanismos de licenciamiento', 'Filtrado de contenidos protegidos', 'Cumplir con derecho afín de editores'] },
      { actor: 'medios', intensidad: 'media', obligaciones: ['Ejercer derecho afín de editores de prensa', 'Gestionar licencias de retransmisión online', 'Negociar con plataformas por uso de contenidos'] },
      { actor: 'fabricantes', intensidad: 'baja', obligaciones: ['Adaptar protección de diseños industriales', 'Registrar diseños conforme a nueva Directiva'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA establece obligaciones de moderación que interactúan con los derechos de autor.' },
      { areaId: 11, tipo: 'complementariedad', descripcion: 'La regulación audiovisual se cruza con derechos de retransmisión y cuotas de contenido.' },
    ],
    hitosProximos: ['Community Design Directive: transposición prevista 2027', 'Licencia obligatoria de patentes: en tramitación'],
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
    sintesisEjecutiva: 'Marco integral de ciberseguridad que abarca desde infraestructuras críticas (NIS2) hasta la resiliencia operativa del sector financiero (DORA) y la seguridad de productos conectados (Cyber Resilience Act). ENISA coordina la respuesta a incidentes a nivel UE.',
    impactoResumen: 'Las entidades esenciales e importantes deben implementar medidas de ciberseguridad proporcionales al riesgo. Los fabricantes de productos con elementos digitales deben garantizar la seguridad durante todo el ciclo de vida. Las entidades financieras deben cumplir DORA.',
    estadoUEDetalle: 'NIS2 debería estar transpuesta desde octubre 2024, pero varios Estados miembros, incluida España, han incumplido el plazo. DORA se aplica desde enero 2025. El Cyber Resilience Act se aplicará de forma escalonada.',
    transposicionDetalle: 'NIS2 tiene el plazo de transposición vencido. El anteproyecto fue aprobado en enero 2025 y está en tramitación parlamentaria. Los reglamentos (DORA, Cybersecurity Act, CRA, Cyber Solidarity Act) son de aplicación directa.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Gestionar riesgos de ciberseguridad (NIS2)', 'Notificar incidentes significativos', 'Garantizar seguridad de productos digitales (CRA)'] },
      { actor: 'financieras', intensidad: 'alta', obligaciones: ['Cumplir DORA: resiliencia operativa', 'Pruebas de penetración avanzadas', 'Gestión de riesgos de terceros TIC'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Seguridad por diseño en productos conectados', 'Actualizaciones de seguridad durante ciclo de vida', 'Evaluación de conformidad CE'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Transponer NIS2 (plazo vencido)', 'Designar autoridades competentes', 'Establecer CSIRT nacionales'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'complementariedad', descripcion: 'La IA requiere garantías de ciberseguridad; el CRA afecta a productos con IA embebida.' },
      { areaId: 12, tipo: 'dependencia', descripcion: 'DORA es la lex specialis de NIS2 para el sector financiero.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'Los operadores de telecomunicaciones son entidades esenciales bajo NIS2.' },
    ],
    hitosProximos: ['NIS2: transposición en España (plazo vencido, tramitación activa)', 'CRA: aplicación escalonada 2025-2027', 'Digital Omnibus (ciber): trílogos primavera 2026'],
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
    sintesisEjecutiva: 'Instrumentos para la cooperación judicial y policial en el entorno digital. El paquete e-Evidence permite obtener pruebas electrónicas transfronterizas. La Directiva PNR regula el uso de datos de pasajeros para prevención del terrorismo.',
    impactoResumen: 'Los proveedores de servicios digitales deberán designar representantes legales en la UE y atender órdenes de entrega de pruebas electrónicas en plazos reducidos. Las aerolíneas deben transmitir datos PNR.',
    estadoUEDetalle: 'La Directiva PNR y el Reglamento Europol están plenamente operativos. El paquete e-Evidence entrará en aplicación en agosto 2026. La Directiva sobre violencia contra mujeres incluye aspectos de ciberviolencia.',
    transposicionDetalle: 'La Directiva PNR fue transpuesta por LO 1/2020. Las directivas de e-Evidence y violencia contra mujeres están pendientes de transposición con plazos en 2026 y 2027 respectivamente.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Designar representante legal en la UE', 'Atender órdenes de e-Evidence en plazos cortos', 'Preservar datos conforme a órdenes judiciales'] },
      { actor: 'plataformas', intensidad: 'media', obligaciones: ['Cooperar con autoridades en investigaciones', 'Retirar contenido de ciberviolencia', 'Transmitir datos conforme a órdenes europeas'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Transponer directivas pendientes', 'Establecer puntos de contacto para e-Evidence', 'Coordinar con Europol y Eurojust'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA y la cooperación judicial comparten obligaciones de moderación y retirada de contenidos.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'Las órdenes de e-Evidence interactúan con las garantías del RGPD.' },
    ],
    hitosProximos: ['e-Evidence: aplicación agosto 2026', 'Dir. e-Evidence representante: transposición 18.08.2026', 'Dir. Violencia contra mujeres: transposición 14.06.2027'],
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
    sintesisEjecutiva: 'Marco para la responsabilidad de las plataformas digitales. El DSA establece obligaciones de diligencia debida para intermediarios online, con requisitos especiales para plataformas muy grandes (VLOPs). El Digital Fairness Act abordará dark patterns y diseño adictivo.',
    impactoResumen: 'Las plataformas online deben implementar mecanismos de notificación y actuación, transparencia en publicidad y sistemas de reclamación. Las VLOPs tienen obligaciones reforzadas de evaluación de riesgos sistémicos.',
    estadoUEDetalle: 'El DSA se aplica plenamente desde febrero 2024. El Reglamento de contenidos terroristas desde junio 2022. El Political Advertising Regulation desde octubre 2025. El Digital Fairness Act está en fase de preparación.',
    transposicionDetalle: 'Los tres reglamentos vigentes son de aplicación directa. La CNMC ha sido designada como Coordinador de Servicios Digitales para el DSA. La Audiencia Nacional gestiona las órdenes de contenidos terroristas.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Mecanismos de notificación y actuación (DSA)', 'Transparencia en publicidad online', 'Evaluación de riesgos sistémicos (VLOPs)', 'Retirar contenido terrorista en 1 hora'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir obligaciones básicas del DSA', 'Designar punto de contacto', 'Publicar condiciones generales claras'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Supervisar cumplimiento del DSA', 'Emitir órdenes de actuación', 'Coordinar con Comisión Europea'] },
    ],
    dependencias: [
      { areaId: 9, tipo: 'complementariedad', descripcion: 'El DSA y las normas de protección del consumidor comparten objetivos de transparencia en marketplaces.' },
      { areaId: 10, tipo: 'complementariedad', descripcion: 'El DMA y el DSA son complementarios: uno regula la competencia y otro la responsabilidad de contenidos.' },
      { areaId: 5, tipo: 'complementariedad', descripcion: 'La moderación de contenidos interactúa con los derechos de autor y la libertad de expresión.' },
    ],
    hitosProximos: ['DSA: supervisión activa de VLOPs por Comisión', 'Digital Fairness Act: propuesta Q4 2026'],
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
    sintesisEjecutiva: 'Protección integral del consumidor en el entorno digital. Abarca desde garantías para contenidos digitales hasta responsabilidad por productos defectuosos, incluyendo software e IA. La Right to Repair Directive refuerza el derecho a reparación.',
    impactoResumen: 'Los vendedores online deben garantizar transparencia en precios y condiciones. Los fabricantes de productos con elementos digitales deben ofrecer actualizaciones de seguridad. La responsabilidad por producto se extiende a software e IA.',
    estadoUEDetalle: 'Siete normas vigentes conforman un marco robusto de protección del consumidor. Dos directivas clave (Product Liability y Right to Repair) están pendientes de transposición con plazos en 2026.',
    transposicionDetalle: 'Las directivas de contenidos digitales, ventas y Omnibus fueron transpuestas por RDL 7/2021. La Product Liability Directive y la Right to Repair Directive deben ser transpuestas antes de diciembre y julio 2026 respectivamente.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Transparencia en marketplaces online', 'Informar sobre parámetros de clasificación', 'No discriminar por nacionalidad (Geo-blocking)'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Garantía legal de contenidos digitales', 'Proporcionar piezas de repuesto (Right to Repair)', 'Responsabilidad extendida a software e IA'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir garantías de contenidos digitales', 'Informar sobre compatibilidad y funcionalidad', 'Adaptarse a nueva responsabilidad por producto'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA refuerza las obligaciones de transparencia de los marketplaces online.' },
      { areaId: 1, tipo: 'dependencia', descripcion: 'La responsabilidad por producto se extiende a sistemas de IA, requiriendo coordinación con el AI Act.' },
    ],
    hitosProximos: ['Right to Repair: transposición 31.07.2026', 'Product Liability: transposición 09.12.2026', 'Digital Fairness Act (consumo): propuesta pendiente'],
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
    sintesisEjecutiva: 'Regula la competencia en mercados digitales. El DMA impone obligaciones ex ante a los gatekeepers (grandes plataformas). La Platform Work Directive regula las condiciones laborales en la economía de plataformas. El Reg. de Subvenciones Foráneas protege el mercado interior.',
    impactoResumen: 'Los gatekeepers designados deben cumplir obligaciones de interoperabilidad, acceso a datos y no auto-preferencia. Los trabajadores de plataformas se beneficiarán de la presunción de laboralidad. Las empresas con subvenciones foráneas deben notificar operaciones.',
    estadoUEDetalle: 'El DMA está plenamente operativo con varios procedimientos abiertos contra gatekeepers. La Platform Work Directive debe ser transpuesta antes de diciembre 2026. La EU Inc. está en fase de propuesta.',
    transposicionDetalle: 'El DMA y los reglamentos son de aplicación directa. La Platform Work Directive tiene transposición parcial a través de la Ley Rider (RDL 9/2021), pero la Directiva UE es más amplia y requerirá ampliación normativa.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Cumplir obligaciones DMA si designados gatekeepers', 'Interoperabilidad de servicios de mensajería', 'No auto-preferencia en resultados de búsqueda', 'Reclasificar trabajadores (Platform Work Dir.)'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Beneficiarse de acceso justo a plataformas', 'Notificar subvenciones foráneas en licitaciones', 'Considerar la forma societaria EU Inc.'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Aplicar DMA vía CNMC/EDCN', 'Transponer Platform Work Directive', 'Controlar subvenciones foráneas en licitaciones'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'DMA y DSA son el binomio regulatorio para plataformas: competencia + responsabilidad.' },
      { areaId: 9, tipo: 'complementariedad', descripcion: 'Las obligaciones de transparencia del DMA refuerzan la protección del consumidor.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'Las obligaciones de portabilidad de datos del DMA se coordinan con el Data Act.' },
    ],
    hitosProximos: ['Platform Work Directive: transposición 02.12.2026', 'EU Inc.: acuerdo finales 2026', 'DMA: procedimientos abiertos contra gatekeepers'],
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
    sintesisEjecutiva: 'Regula el sector audiovisual y la libertad de medios de comunicación. La Directiva AVMS establece cuotas de contenido europeo en plataformas VOD. El EMFA protege la independencia editorial y la pluralidad mediática.',
    impactoResumen: 'Las plataformas de vídeo bajo demanda deben ofrecer al menos un 30% de contenido europeo. Los medios de comunicación tienen nuevas garantías de independencia editorial. Se espera una revisión de la Directiva AVMS para adaptarla a plataformas y deepfakes.',
    estadoUEDetalle: 'La Directiva AVMS revisada y el EMFA están vigentes. La Copyright Directive tiene impacto directo en medios. La revisión de la AVMS se anticipa para Q3 2026.',
    transposicionDetalle: 'La Directiva AVMS fue transpuesta por la Ley 13/2022 (LGCA), con la CNMC como autoridad audiovisual. El EMFA es de aplicación directa desde agosto 2025. La Copyright Directive fue transpuesta por RDL 24/2021.',
    obligacionesActores: [
      { actor: 'medios', intensidad: 'alta', obligaciones: ['Cumplir cuota 30% obra europea en VOD', 'Beneficiarse de garantías EMFA', 'Gestionar derechos afines de editores'] },
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Catalogar y promover contenido europeo', 'Cumplir reglas de publicidad audiovisual', 'Proteger menores en contenido audiovisual'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Supervisar cumplimiento LGCA', 'Participar en EBMS (EMFA)', 'Proteger pluralismo mediático'] },
    ],
    dependencias: [
      { areaId: 5, tipo: 'complementariedad', descripcion: 'Los derechos de autor y la regulación audiovisual comparten obligaciones sobre contenido online.' },
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA y la AVMS regulan aspectos complementarios de las plataformas de vídeo.' },
    ],
    hitosProximos: ['Revisión Directiva AVMS: propuesta Q3 2026', 'EMFA: supervisión activa'],
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
    sintesisEjecutiva: 'Marco regulatorio para la digitalización de servicios financieros. MiCA establece el primer marco armonizado para criptoactivos. DORA refuerza la resiliencia operativa digital del sector financiero. Se preparan PSD3 y el marco del euro digital.',
    impactoResumen: 'Las entidades financieras deben cumplir DORA para resiliencia operativa. Los proveedores de servicios de criptoactivos deben obtener autorización conforme a MiCA. La 6ª Directiva AML reforzará la prevención del blanqueo.',
    estadoUEDetalle: 'MiCA y DORA están en plena aplicación. PSD2 está vigente pero será reemplazada por PSD3/PSR. La 6ª Directiva AML y el nuevo Reglamento AML imponen plazos hasta 2027. El euro digital y FIDA están en tramitación.',
    transposicionDetalle: 'PSD2 fue transpuesta por RDL 19/2018. La 6ª Directiva AML deberá ser transpuesta antes del 10.07.2027, modificando la Ley 10/2010. Los reglamentos (MiCA, DORA, AML) son de aplicación directa.',
    obligacionesActores: [
      { actor: 'financieras', intensidad: 'alta', obligaciones: ['Cumplir DORA: pruebas de resiliencia', 'Autorización MiCA para criptoactivos', 'Reforzar prevención blanqueo (6ª Dir. AML)', 'Preparar PSD3/PSR'] },
      { actor: 'plataformas', intensidad: 'media', obligaciones: ['Licencia MiCA para exchanges cripto', 'Cumplir requisitos AML en operaciones cripto', 'Interoperabilidad bajo FIDA (Open Finance)'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Supervisar MiCA (CNMV)', 'Transponer 6ª Dir. AML', 'Coordinar BdE/CNMV para DORA', 'Establecer registro titularidad real centralizado'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Obtener autorización MiCA si prestan servicios cripto', 'Cumplir requisitos AML simplificados', 'Acceder a Open Finance (FIDA)'] },
    ],
    dependencias: [
      { areaId: 6, tipo: 'dependencia', descripcion: 'DORA es lex specialis de NIS2 para el sector financiero.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'FIDA (Open Finance) se cruza con el marco de gobernanza de datos.' },
      { areaId: 10, tipo: 'complementariedad', descripcion: 'El Crowdfunding Regulation vincula fintech con regulación de competencia.' },
    ],
    hitosProximos: ['6ª Dir. AML: transposición 10.07.2027', 'PSD3/PSR: en tramitación', 'Euro Digital: en tramitación'],
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
  efectoJuridico?: string;
  proximoPaso?: string;
  incertidumbre?: boolean;
}

export const cronologia: TimelineEvent[] = [
  { fecha: '19.11.2025', titulo: 'Digital Omnibus Package', descripcion: 'Dos propuestas de Reglamento que modifican RGPD, Data Act, NIS2, ePrivacy y AI Act. Ahorro previsto: 6.000M€ hasta 2029.', estado: 'proceso', bloques: [1, 4, 6], efectoJuridico: 'Simplifica obligaciones de reporte para pymes y reduce duplicidades entre normas existentes.', proximoPaso: 'Trílogos previstos para primavera 2026.' },
  { fecha: '18.03.2026', titulo: 'EU Inc. (28th Regime)', descripcion: 'Nueva forma societaria UE, constitución en 48h, <100€, sin capital mínimo, digital por defecto.', estado: 'proceso', bloques: [1, 10], efectoJuridico: 'Crea una forma jurídica UE paralela a las nacionales, sin necesidad de transposición.', proximoPaso: 'Acuerdo político previsto para finales de 2026.' },
  { fecha: 'Q1 2026', titulo: 'Cloud and AI Development Act', descripcion: 'Triplicar capacidad centros de datos UE, soberanía cloud, interoperabilidad.', estado: 'planificada', bloques: [1, 2, 4], efectoJuridico: 'Establecerá obligaciones para proveedores cloud y requisitos de soberanía de datos.', proximoPaso: 'Propuesta formal esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'European Innovation Act', descripcion: 'Eliminar barreras regulatorias a innovación, colaboración industria-academia.', estado: 'planificada', bloques: [1, 2, 10], efectoJuridico: 'Introducirá sandboxes regulatorios obligatorios y simplificaciones para startups.', proximoPaso: 'Propuesta formal esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'Digital Networks Act (DNA)', descripcion: 'Sucesor del EECC: permisos, 6G, espectro, open RAN europeas.', estado: 'planificada', bloques: [3], efectoJuridico: 'Reemplazará parcialmente el EECC con un marco actualizado para redes 5G/6G.', proximoPaso: 'Propuesta esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'Chips Act Evaluation', descripcion: 'Evaluación de implementación del Reglamento de Semiconductores.', estado: 'revision', bloques: [1, 2], efectoJuridico: 'Puede dar lugar a ajustes regulatorios basados en resultados de implementación.', proximoPaso: 'Informe de evaluación esperado Q1 2026.' },
  { fecha: 'Q2 2026', titulo: 'Quantum Act', descripcion: 'Marco de financiación para tecnologías cuánticas, cadena de suministro.', estado: 'planificada', bloques: [1, 2], efectoJuridico: 'Creará un marco de gobernanza y financiación para computación cuántica europea.', proximoPaso: 'Propuesta esperada Q2 2026.', incertidumbre: true },
  { fecha: '31.07.2026', titulo: 'Plazo transposición Right to Repair Dir.', descripcion: 'España debe transponer Dir. 2024/1799 sobre derecho a reparación.', estado: 'vigente', bloques: [9], efectoJuridico: 'Obligaciones exigibles a fabricantes: piezas de repuesto, información de reparación, prioridad de reparación sobre sustitución.', proximoPaso: 'España debe aprobar norma de transposición antes de esta fecha.' },
  { fecha: '18.08.2026', titulo: 'Plazo transposición Dir. e-Evidence', descripcion: 'Obliga a proveedores a designar representante legal.', estado: 'vigente', bloques: [7], efectoJuridico: 'Los proveedores de servicios digitales sin sede en la UE deben designar un representante legal.', proximoPaso: 'Entrada en vigor del Reglamento e-Evidence.' },
  { fecha: 'Q3 2026', titulo: 'Revisión Directiva AVMS', descripcion: 'Adaptación a plataformas, algoritmos de recomendación, deepfakes.', estado: 'revision', bloques: [11], efectoJuridico: 'Actualizará las obligaciones de plataformas de vídeo e incluirá regulación de contenido generado por IA.', proximoPaso: 'Propuesta de revisión esperada Q3 2026.', incertidumbre: true },
  { fecha: 'Q4 2026', titulo: 'Digital Fairness Act', descripcion: 'Dark patterns, diseño adictivo, profiling menores, dynamic pricing.', estado: 'planificada', bloques: [8, 9], efectoJuridico: 'Prohibirá prácticas de diseño manipulador y reforzará la protección de menores en el entorno digital.', proximoPaso: 'Propuesta esperada Q4 2026.', incertidumbre: true },
  { fecha: '02.12.2026', titulo: 'Plazo transposición Platform Work Directive', descripcion: 'Regulación trabajo en plataformas digitales. Ley Rider parcial.', estado: 'vigente', bloques: [10], efectoJuridico: 'Presunción de laboralidad para trabajadores de plataformas. España ya tiene la Ley Rider pero debe ampliarla.', proximoPaso: 'Completar la transposición ampliando el RDL 9/2021.' },
  { fecha: '09.12.2026', titulo: 'Plazo transposición Product Liability Directive', descripcion: 'Modificará TRLGDCU para incluir software e IA.', estado: 'vigente', bloques: [9], efectoJuridico: 'Extiende la responsabilidad civil objetiva a fabricantes de software y sistemas de IA defectuosos.', proximoPaso: 'España debe modificar el TRLGDCU.' },
  { fecha: '14.06.2027', titulo: 'Plazo transposición Dir. Violencia contra Mujeres', descripcion: 'Incluye ciberviolencia. Deberá modificar CP y Ley 1/2004.', estado: 'vigente', bloques: [7], efectoJuridico: 'Tipifica delitos de ciberviolencia: acoso online, difusión de imágenes íntimas, incitación al odio.', proximoPaso: 'Modificación del Código Penal y la Ley 1/2004.' },
  { fecha: '10.07.2027', titulo: 'Plazo transposición 6ª Directiva AML', descripcion: 'Modificará Ley 10/2010. Registros de titularidad real centralizados.', estado: 'vigente', bloques: [12], efectoJuridico: 'Refuerza la prevención del blanqueo con registros centralizados y diligencia debida reforzada para cripto.', proximoPaso: 'Modificación de la Ley 10/2010 y registro de titularidad real.' },
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
