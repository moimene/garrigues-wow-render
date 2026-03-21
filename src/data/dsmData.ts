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
  subtitulo: string;
  descripcion: string;
  color: string;
  vigentes: number;
  enProceso: number;
  planificadas: number;
  enRevision: number;
  reglamentos: number;
  directivas: number;
  normas: Norma[];
  // Three-level pedagogical content
  sintesisEjecutiva: string;
  explicacionMedia: string;
  explicacionCompleta: string;
  impactoResumen: string;
  estadoUEDetalle: string;
  transposicionDetalle: string;
  obligacionesActores: ObligacionActor[];
  dependencias: DependenciaArea[];
  hitosProximos: string[];
  // New enriched fields from legal report
  alcance: string;
  conceptosClave: string[];
  arquitecturaNormativaUE: string;
  clavesInterpretacion: string[];
  alertasRigor: string[];
  recursosReferencia: string[];
  funcionNormativa: string;
  // EuroStack / Building Blocks
  buildingBlocks?: string[];
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
    subtitulo: 'Inteligencia artificial, computación cuántica, nube y programas de I+D europeos',
    descripcion: 'IA, cloud, computación cuántica, HPC, programas de I+D (Horizonte Europa, Europa Digital)',
    color: '#004438', vigentes: 4, enProceso: 3, planificadas: 2, enRevision: 0, reglamentos: 4, directivas: 0,
    sintesisEjecutiva: 'Este bloque agrupa las normas que regulan la investigación, desarrollo y despliegue de tecnologías digitales clave como la inteligencia artificial, la computación cuántica y la nube. El AI Act establece por primera vez un marco armonizado para la IA basado en riesgo. Los programas Horizonte Europa y Europa Digital canalizan la financiación de la UE.',
    explicacionMedia: 'La regulación de IA clasifica sistemas por riesgo y establece requisitos estrictos para los de alto riesgo, prohibiciones limitadas y obligaciones de transparencia para ciertos usos. Incluye además responsabilidades de proveedores y usuarios, y prevé gobernanza y supervisión coordinadas a escala europea. Su lógica dentro del DSM es armonizar condiciones para el despliegue confiable de IA en todos los sectores, al tiempo que los programas de financiación (Horizonte Europa, Europa Digital, EuroHPC) sostienen la capacidad tecnológica del continente.',
    explicacionCompleta: 'El alcance comprende requisitos para sistemas de alto riesgo en gestión de datos, documentación técnica, gobernanza, trazabilidad, ciberseguridad y supervisión humana, además de disposiciones sobre modelos de propósito general en cuanto a transparencia y gestión de riesgos sistémicos. Quedan fuera algoritmos sin componente de IA según definiciones legales y usos no cubiertos por los anexos, aunque normas sectoriales pueden aplicar. La arquitectura normativa se centra en el Reglamento de IA adoptado recientemente, con aplicación escalonada, y en propuestas o revisiones en materia de responsabilidad civil y de productos que complementan el régimen. Guías técnicas, estándares armonizados y actos de ejecución precisarán metodologías y plantillas.',
    impactoResumen: 'Las organizaciones que desarrollen o desplieguen sistemas de IA deben clasificarlos por nivel de riesgo y cumplir obligaciones proporcionales. Los proveedores de IA de alto riesgo deben registrar sus sistemas, realizar evaluaciones de conformidad y mantener documentación técnica. La documentación es un elemento de cumplimiento sustantivo, no un mero trámite administrativo.',
    estadoUEDetalle: 'El AI Act entró en vigor en agosto 2024 con aplicación escalonada hasta 2027: prohibiciones desde febrero 2025, obligaciones de transparencia desde agosto 2025, requisitos de alto riesgo con periodos de adaptación. Horizonte Europa y Europa Digital están en plena ejecución. Se esperan propuestas sobre Cloud & AI Development Act y Quantum Act durante 2026. Desarrollos reglamentarios y de normalización están en curso.',
    transposicionDetalle: 'Los reglamentos vigentes son de aplicación directa. La AESIA ha sido designada como autoridad de supervisión del AI Act, con coordinación con la AEPD y autoridades de ciberseguridad. El CDTI gestiona Horizonte Europa y la SEDIA coordina Europa Digital. La capacidad técnica y los nodos de supervisión se están definiendo en el marco de la gobernanza digital nacional. La implementación conlleva inventarios de sistemas, evaluación de riesgos, rediseño de flujos de datos y formación.',
    alcance: 'Requisitos para sistemas de IA de alto riesgo, disposiciones sobre modelos de propósito general, prohibiciones específicas, programas de financiación de I+D digital, computación de alto rendimiento y cuántica.',
    conceptosClave: ['Clasificación por riesgo', 'Proveedor y usuario de IA', 'Evaluación de conformidad', 'Modelos de propósito general', 'Prohibiciones específicas', 'Sandbox regulatorio', 'Alto riesgo', 'Supervisión humana'],
    arquitecturaNormativaUE: 'El Reglamento de IA es el eje central, con aplicación escalonada. Se complementa con propuestas en materia de responsabilidad civil y de productos. Guías técnicas, estándares armonizados (CEN/CENELEC) y actos de ejecución precisarán metodologías y plantillas. Los programas Horizonte Europa y Europa Digital canalizan la financiación.',
    clavesInterpretacion: [
      'La clasificación por riesgo es jurídica y técnica, no meramente conceptual.',
      'La documentación técnica es un elemento de cumplimiento sustantivo, no un mero trámite.',
      'Los modelos de propósito general tienen obligaciones propias diferenciadas de los sistemas de alto riesgo.',
      'Los sandboxes regulatorios no eximen de responsabilidad, pero facilitan el cumplimiento.',
      'La distinción entre proveedor y usuario de IA determina el régimen de obligaciones aplicable.',
    ],
    alertasRigor: [
      'La aplicación escalonada del AI Act implica que no todas las obligaciones son exigibles simultáneamente.',
      'Los estándares armonizados están en desarrollo; su ausencia puede crear incertidumbre temporal sobre métodos de conformidad.',
      'La clasificación de alto riesgo depende de los anexos, que pueden ser actualizados por actos delegados.',
    ],
    recursosReferencia: [
      'Reglamento (UE) 2024/1689 (AI Act) — EUR-Lex',
      'Horizonte Europa — Portal de la Comisión',
      'Programa Europa Digital — Portal de la Comisión',
      'AI Act Explorer — herramienta interactiva artículo por artículo',
      'AESIA — Agencia Española de Supervisión de IA',
    ],
    funcionNormativa: 'Habilitante y de cumplimiento — armoniza condiciones para el despliegue confiable de IA y canaliza financiación para I+D digital.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Clasificar sistemas IA por riesgo', 'Evaluación de conformidad para IA alto riesgo', 'Documentación técnica y registro en base de datos UE', 'Transparencia y gestión de riesgos en modelos de propósito general'] },
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Transparencia en uso de IA generativa', 'Etiquetado de contenido generado por IA', 'Supervisión humana de decisiones automatizadas'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Acceder a sandboxes regulatorios', 'Obligaciones simplificadas (Digital Omnibus)', 'Participar en EDIHs para capacitación'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Designar autoridades de supervisión (AESIA)', 'Facilitar acceso a entornos de prueba', 'Coordinar participación en programas UE'] },
    ],
    dependencias: [
      { areaId: 4, tipo: 'complementariedad', descripcion: 'Los datos son el insumo fundamental para IA: el Data Act y el Data Governance Act proporcionan el marco de acceso y gobernanza.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'La ciberseguridad es requisito intrínseco de los sistemas de IA; el CRA afecta a productos con IA embebida.' },
      { areaId: 2, tipo: 'dependencia', descripcion: 'El Chips Act garantiza la capacidad de hardware necesaria para computación de IA y cuántica.' },
      { areaId: 9, tipo: 'dependencia', descripcion: 'La responsabilidad por producto se extiende a sistemas de IA, requiriendo coordinación con el marco de IA.' },
    ],
    hitosProximos: ['AI Act: aplicación plena agosto 2027', 'Cloud & AI Development Act: propuesta esperada Q1 2026', 'Digital Omnibus on AI: trílogos primavera 2026', 'Estándares armonizados CEN/CENELEC: en desarrollo'],
    normas: [
      { nombre: 'AI Act (Reg. 2024/1689)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde agosto 2025. AESIA designada como autoridad nacional de supervisión. Prohibiciones aplicables desde febrero 2025.', plazo: 'Plena agosto 2027' },
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
    subtitulo: 'Autonomía estratégica en semiconductores, materias primas críticas y estándares TIC',
    descripcion: 'Semiconductores, materias primas críticas, pymes digitales, startups, estándares TIC',
    color: '#007362', vigentes: 3, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 0,
    sintesisEjecutiva: 'Bloque centrado en asegurar la autonomía estratégica de la UE en tecnologías críticas. El Chips Act busca duplicar la cuota europea en semiconductores al 20% para 2030. El Critical Raw Materials Act asegura el suministro de minerales estratégicos.',
    explicacionMedia: 'La política industrial digital de la UE busca reducir dependencias en cadenas de suministro críticas y reforzar la competitividad. El bloque combina instrumentos de gobernanza industrial con herramientas de financiación y estandarización. Su lógica en el DSM es asegurar la base material y técnica sobre la que se despliegan todos los demás bloques regulatorios.',
    explicacionCompleta: 'El alcance incluye la cadena de suministro de semiconductores, desde el diseño hasta la fabricación y ensamblaje, la identificación y aseguramiento de materias primas críticas y estratégicas, la promoción de industrias limpias y la estandarización TIC. Los instrumentos son reglamentos de aplicación directa que establecen mecanismos de monitorización, alertas tempranas y financiación coordinada (IPCEI). La gobernanza se articula mediante comités y redes de autoridades nacionales con la Comisión.',
    impactoResumen: 'Los fabricantes de semiconductores y empresas de la cadena de suministro tecnológico deben cumplir requisitos de monitorización de cadenas de valor. Las pymes se benefician de programas de apoyo y financiación. España es una fuente clave de litio en el marco del Critical Raw Materials Act.',
    estadoUEDetalle: 'Los tres reglamentos principales están vigentes y en aplicación directa. Se espera la propuesta del European Innovation Act durante 2026. El Chips Act será evaluado en Q1 2026.',
    transposicionDetalle: 'Los reglamentos son de aplicación directa. España participa activamente a través del PERTE Chip y ha sido identificada como fuente clave de litio. El PNIEC integra los objetivos del Net-Zero Industry Act.',
    alcance: 'Cadena de suministro de semiconductores, materias primas críticas y estratégicas, industrias limpias y tecnologías cero neto, estandarización TIC e innovación industrial.',
    conceptosClave: ['Autonomía estratégica', 'IPCEI (Proyectos Importantes de Interés Común Europeo)', 'Cadena de suministro crítica', 'Alerta temprana de escasez', 'Materias primas estratégicas', 'Estandarización', 'Tecnologías cero neto'],
    arquitecturaNormativaUE: 'Tres reglamentos vigentes de aplicación directa que establecen marcos de gobernanza, monitorización y financiación coordinada. La estandarización se articula a través de organismos europeos de normalización.',
    clavesInterpretacion: [
      'La monitorización de cadenas de suministro es una obligación continua, no un ejercicio puntual.',
      'Los IPCEI y los PERTE son instrumentos de financiación con condicionalidades regulatorias.',
      'La designación de materias primas estratégicas puede evolucionar con la geopolítica.',
    ],
    alertasRigor: [
      'El Chips Act será evaluado en Q1 2026 y puede dar lugar a ajustes regulatorios.',
      'La disponibilidad efectiva de materias primas depende de factores geopolíticos no regulables.',
    ],
    recursosReferencia: [
      'Chips Act — EUR-Lex',
      'Critical Raw Materials Act — EUR-Lex',
      'Net-Zero Industry Act — EUR-Lex',
      'PERTE Chip — Gobierno de España',
    ],
    funcionNormativa: 'Habilitante e industrial — asegura la base material y técnica del ecosistema digital europeo.',
    obligacionesActores: [
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Monitorizar cadena de suministro de semiconductores', 'Reportar alertas tempranas de escasez', 'Cumplir requisitos de producción limpia'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Acceder a financiación PERTE Chip', 'Certificar origen de materias primas críticas', 'Participar en clusters industriales'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Facilitar permisos para nuevas plantas', 'Coordinar inventario nacional de materias primas', 'Participar en IPCEI de microelectrónica'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'dependencia', descripcion: 'Los programas de I+D y la IA dependen de la disponibilidad de semiconductores avanzados.' },
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
    subtitulo: 'Redes, espectro, neutralidad de red, itinerancia y derechos de los usuarios',
    descripcion: 'Telecomunicaciones, 5G/6G, espectro, roaming, neutralidad de red, banda ancha',
    color: '#6dc1b0', vigentes: 4, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 1,
    sintesisEjecutiva: 'Marco normativo para redes de telecomunicaciones, espectro radioeléctrico y despliegue de infraestructuras. El Código Europeo de Comunicaciones armoniza la regulación, mientras el Gigabit Infrastructure Act simplifica el despliegue de redes de alta capacidad.',
    explicacionMedia: 'El código europeo de comunicaciones armoniza categorías de servicios, regímenes de autorización, derechos de los usuarios y el papel de autoridades nacionales y del organismo de reguladores (BEREC). Se complementa con normas de itinerancia y acceso a internet abierto. Su lógica en el DSM es asegurar conectividad de calidad, competencia efectiva e innovación en redes como infraestructura sobre la que opera el mercado digital.',
    explicacionCompleta: 'El alcance incluye operadores de redes y proveedores de servicios, incluidas comunicaciones interpersonales independientes de numeración, obligaciones de transparencia, calidad y continuidad, y reglas de espectro. Excluye contenidos audiovisuales y servicios de plataforma, tratados en otros bloques. La arquitectura normativa se basa en el código de comunicaciones electrónicas vigente y transpuesto, el reglamento de itinerancia y las directrices del organismo de reguladores. El estado regulatorio es estable y plenamente vigente, con revisiones periódicas de mercados y ajustes técnicos.',
    impactoResumen: 'Los operadores de telecomunicaciones deben cumplir obligaciones de acceso, cobertura y calidad de servicio. El roaming gratuito se extiende hasta 2032. Se anticipan cambios significativos con el Digital Networks Act, sucesor parcial del EECC.',
    estadoUEDetalle: 'El EECC, el Reglamento BEREC, Roaming y Gigabit Infrastructure Act están vigentes. El Digital Networks Act, sucesor parcial del EECC, está en fase de propuesta prevista para Q1 2026.',
    transposicionDetalle: 'El EECC fue transpuesto por la Ley 11/2022 General de Telecomunicaciones. La CNMC actúa como autoridad reguladora nacional. Los reglamentos restantes son de aplicación directa. Persisten retos en despliegues, compartición y cobertura.',
    alcance: 'Operadores de redes, proveedores de servicios de comunicaciones electrónicas, comunicaciones interpersonales, espectro radioeléctrico, obligaciones de transparencia, calidad, continuidad e itinerancia.',
    conceptosClave: ['Autoridad nacional reguladora', 'Análisis de mercado', 'Obligaciones simétricas y asimétricas', 'Neutralidad de red', 'Servicio universal', 'Itinerancia', 'Espectro radioeléctrico'],
    arquitecturaNormativaUE: 'Código de comunicaciones electrónicas vigente y transpuesto, reglamento de itinerancia, reglamento BEREC y directrices del organismo de reguladores. Marco estable con revisiones periódicas.',
    clavesInterpretacion: [
      'La neutralidad de red protege contenidos legales sin impedir la gestión razonable del tráfico.',
      'Las obligaciones de acceso varían por posición de mercado del operador.',
      'Las comunicaciones interpersonales independientes de numeración (OTT) tienen obligaciones específicas de seguridad.',
    ],
    alertasRigor: [
      'El Digital Networks Act puede alterar significativamente el marco actual; su evolución requiere seguimiento.',
      'La compartición de infraestructuras tiene implicaciones de competencia que deben evaluarse caso por caso.',
    ],
    recursosReferencia: [
      'Código Europeo de Comunicaciones Electrónicas — EUR-Lex',
      'Ley 11/2022 General de Telecomunicaciones',
      'CNMC — Informes de mercados de telecomunicaciones',
      'BEREC — Directrices y opiniones',
    ],
    funcionNormativa: 'Infraestructural — asegura conectividad, competencia e innovación en la base de redes del mercado digital.',
    obligacionesActores: [
      { actor: 'telecoms', intensidad: 'alta', obligaciones: ['Cumplir obligaciones de acceso y cobertura', 'Reportar a BEREC vía CNMC', 'Permitir despliegue de infraestructura compartida', 'Garantizar transparencia, calidad y continuidad'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Facilitar permisos de despliegue de redes', 'Gestionar espectro radioeléctrico', 'Aplicar la Ley 11/2022'] },
      { actor: 'pymes', intensidad: 'baja', obligaciones: ['Beneficiarse de obligaciones de acceso mayorista', 'Acceder a redes compartidas'] },
    ],
    dependencias: [
      { areaId: 2, tipo: 'dependencia', descripcion: 'La industria de semiconductores proporciona componentes esenciales para redes 5G/6G.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'NIS2 impone requisitos de ciberseguridad a operadores de telecomunicaciones como entidades esenciales.' },
      { areaId: 7, tipo: 'complementariedad', descripcion: 'La identidad digital europea requiere conectividad fiable para la verificación de carteras electrónicas.' },
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
    id: 4, nombre: 'Datos, Privacidad y Economía del Dato',
    subtitulo: 'Protección de datos personales, gobernanza de datos industriales y acceso a datos de productos',
    descripcion: 'RGPD, libre flujo de datos, open data, Data Act, Data Governance Act, ePrivacy',
    color: '#2563eb', vigentes: 7, enProceso: 2, planificadas: 0, enRevision: 0, reglamentos: 6, directivas: 1,
    sintesisEjecutiva: 'El bloque más denso del DSM. La protección de datos personales vertebra derechos fundamentales y obligaciones para cualquier actor que trate información identificable. El RGPD fija principios, derechos y bases de licitud, mientras que la economía del dato se apoya en marcos que habilitan intermediación neutral, altruismo de datos, acceso a datos de productos conectados y reutilización de datos públicos de alto valor.',
    explicacionMedia: 'Este bloque importa porque interactúa con todos los demás: rige la economía del dato, define límites para inteligencia artificial y condiciona la supervisión en plataformas y telecomunicaciones. Su lógica dentro del DSM es asegurar un estándar común de garantías que habilite la circulación de servicios y la innovación responsable, crear confianza, remover barreras y evitar bloqueos de proveedor en la nube, mientras se respetan la protección de datos y secretos empresariales.',
    explicacionCompleta: 'El alcance comprende tratamiento de datos personales por responsables y encargados, transferencia internacional, seguridad y notificación de brechas, evaluación de impacto y privacidad en comunicaciones electrónicas. Incluye además gobernanza de datos con obligaciones para intermediarios y registros de altruismo, acceso a datos generados por el uso de productos y portabilidad reforzada, interoperabilidad y conmutación entre servicios en la nube, y reutilización de datos del sector público, incluidos conjuntos de alto valor. Quedan fuera los datos no personales salvo cuando se entrelazan con identificables.',
    impactoResumen: 'Todas las organizaciones que traten datos personales deben cumplir el RGPD. Los fabricantes de dispositivos conectados deben facilitar acceso a los datos generados (Data Act). Las administraciones deben compartir datos de alto valor en formato abierto. El acceso a datos de productos no es un cheque en blanco: la protección de secretos y seguridad debe figurar explícitamente.',
    estadoUEDetalle: 'Siete normas vigentes conforman un marco maduro. El Data Act se aplica plenamente desde septiembre 2025. El Digital Omnibus propone simplificar interacciones entre RGPD, Data Act y ePrivacy. La revisión de ePrivacy en formato de reglamento sigue en proceso y bloqueada en el Consejo.',
    transposicionDetalle: 'El RGPD se complementa con la LOPDGDD (LO 3/2018), con la AEPD como autoridad de control. Las singularidades españolas incluyen criterios interpretativos en ámbitos como videovigilancia, relaciones laborales o administración pública. La Open Data Directive fue transpuesta por RDL 24/2021. La autoridad competente para registros de gobernanza de datos y supervisión debe estar designada o en proceso. Los reglamentos restantes son de aplicación directa.',
    alcance: 'Tratamiento de datos personales, transferencia internacional, privacidad en comunicaciones, gobernanza de datos industriales, intermediación neutral, altruismo de datos, acceso a datos de productos conectados, portabilidad, conmutación en la nube y reutilización de datos públicos de alto valor.',
    conceptosClave: ['Minimización', 'Bases jurídicas de tratamiento', 'Responsabilidad proactiva', 'Seudonimización', 'Intermediación neutral', 'Conmutación sin obstáculos', 'Conjuntos de alto valor', 'Acceso B2B y B2C a datos de productos', 'Privacidad por diseño y por defecto'],
    arquitecturaNormativaUE: 'El RGPD es el eje horizontal plenamente vigente, complementado por la directiva de cooperación policial y el marco de ePrivacy en revisión. El Data Governance Act y el Data Act crean la infraestructura de gobernanza e intercambio de datos. Actos de ejecución, guías del Comité Europeo de Protección de Datos y códigos de conducta orientan la práctica.',
    clavesInterpretacion: [
      'La base de licitud no es un mero trámite: su elección condiciona todo el régimen aplicable.',
      'La anonimización efectiva es exigente y requiere irreversibilidad práctica.',
      'La seudonimización no elimina el carácter personal de los datos.',
      'Los datos mixtos personales y no personales requieren cautela especial.',
      'El acceso a datos de productos no es ilimitado; deben salvaguardarse secretos y seguridad.',
      'El consentimiento no es la única base posible ni siempre la más adecuada.',
    ],
    alertasRigor: [
      'La revisión de ePrivacy está bloqueada en el Consejo desde 2017; la directiva vigente sigue siendo aplicable.',
      'El Digital Omnibus propone simplificaciones que aún no están aprobadas.',
      'Los datos mixtos (personales y no personales) requieren aplicación simultánea de ambos marcos.',
    ],
    recursosReferencia: [
      'RGPD — EUR-Lex (texto consolidado)',
      'Data Act — EUR-Lex',
      'Data Governance Act — EUR-Lex',
      'LOPDGDD (LO 3/2018) — BOE',
      'AEPD — Guías y dictámenes',
      'Comité Europeo de Protección de Datos — Directrices',
    ],
    funcionNormativa: 'Horizontal y habilitante — condiciona el diseño de servicios, el intercambio de datos y la confianza en todo el ecosistema digital.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Cumplir RGPD en tratamiento masivo de datos', 'Facilitar portabilidad de datos (Data Act)', 'Interoperabilidad de datos entre servicios cloud', 'Privacidad por diseño y por defecto'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Permitir acceso a datos generados por IoT', 'Diseñar productos con acceso a datos por defecto', 'No imponer cláusulas contractuales abusivas sobre datos'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Publicar datos de alto valor en formato abierto', 'Implementar Interoperable Europe Act', 'Designar puntos de contacto para gobernanza de datos', 'Asegurar licitudes específicas y transparencia reforzada'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir RGPD con enfoque proporcional', 'Beneficiarse de espacios de datos sectoriales', 'Acceder a datos compartidos vía DGA'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'complementariedad', descripcion: 'Los datos son el insumo fundamental para el desarrollo de IA y computación cuántica.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'La protección de datos y la ciberseguridad comparten requisitos de seguridad de la información y notificación de brechas.' },
      { areaId: 12, tipo: 'dependencia', descripcion: 'Los datos financieros regulados por FIDA (Open Finance) se cruzan con el marco de gobernanza de datos.' },
      { areaId: 8, tipo: 'complementariedad', descripcion: 'La moderación de contenidos en plataformas requiere tratamientos de datos personales sujetos al RGPD.' },
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
      { nombre: 'Reglamento ePrivacy', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Bloqueado en Consejo desde 2017. La directiva vigente sigue siendo aplicable.', plazo: '—' },
      { nombre: 'Digital Omnibus Regulation (datos)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Modifica RGPD, Data Act, ePrivacy. Deroga DGA, Open Data Dir.', plazo: 'Trílogos primavera 2026' },
    ]
  },
  {
    id: 5, nombre: 'Propiedad Intelectual y Contenidos Digitales',
    subtitulo: 'Derechos de autor, licencias, responsabilidad de plataformas y portabilidad de contenidos',
    descripcion: 'Derechos de autor, licencias digitales, snippet tax, retransmisiones online',
    color: '#7c3aed', vigentes: 3, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 0, directivas: 3,
    sintesisEjecutiva: 'Armoniza derechos de autor y derechos afines en el entorno digital y regula la portabilidad transfronteriza de contenidos. La directiva sobre derechos de autor actualiza excepciones, responsabilidad de plataformas por contenidos protegidos y derechos de editores de prensa.',
    explicacionMedia: 'La directiva de derechos de autor en el mercado único digital actualiza excepciones, responsabilidad de plataformas por contenidos protegidos y derechos de editores de prensa. La portabilidad de contenidos permite acceder a servicios abonados en desplazamientos temporales. Su lógica en el DSM es adaptar la propiedad intelectual al entorno en línea sin fragmentar el mercado.',
    explicacionCompleta: 'El alcance cubre uso de obras por plataformas, licencias y mecanismos de retirada, excepciones para minería de textos y datos, negociación con editores y acceso transfronterizo a contenidos. No incluye geo-bloqueo en general, que se trata en consumo y mercado interior con sus excepciones. La arquitectura normativa se apoya en la directiva de derechos de autor de 2019 y en la directiva de retransmisiones en línea y distribución por cable, con un reglamento de portabilidad en vigor.',
    impactoResumen: 'Las plataformas que alojan contenido generado por usuarios deben implementar mecanismos de licenciamiento y filtrado. Los editores de prensa tienen un nuevo derecho afín sobre sus publicaciones. La responsabilidad de plataformas está condicionada a esfuerzos de licencia y diligencia, no a imputación automática.',
    estadoUEDetalle: 'Tres directivas vigentes ya transpuestas. La Community Design Directive está pendiente de transposición. La licencia obligatoria de patentes está en tramitación.',
    transposicionDetalle: 'Las tres directivas principales fueron transpuestas por RDL 24/2021, que modifica el TRLPI. La Community Design Directive requerirá modificar la Ley 20/2003 de Diseño Industrial. Las entidades de gestión españolas desempeñan roles definidos en la negociación.',
    alcance: 'Uso de obras por plataformas, licencias y mecanismos de retirada, excepciones para minería de textos y datos, derecho afín de editores de prensa, portabilidad transfronteriza de contenidos y diseño industrial.',
    conceptosClave: ['Comunicación pública', 'Carga de contenidos', 'Acuerdos de licencia', 'Portabilidad de contenidos', 'Excepciones de minería de textos y datos', 'Derecho afín de editores'],
    arquitecturaNormativaUE: 'Directiva de derechos de autor en el mercado único digital (2019), directiva de retransmisiones en línea y distribución por cable, y reglamento de portabilidad transfronteriza de contenidos.',
    clavesInterpretacion: [
      'La responsabilidad de plataformas está condicionada a esfuerzos de licencia y medidas específicas, no a imputación automática.',
      'La minería de textos y datos tiene excepciones específicas que distinguen entre investigación y uso comercial.',
      'El derecho afín de editores es un derecho negociable, no una tasa automática.',
    ],
    alertasRigor: [
      'La interpretación jurisprudencial de las excepciones de minería evoluciona rápidamente, especialmente en el contexto de IA generativa.',
      'La Community Design Directive tiene plazos de transposición que no deben confundirse con los de derechos de autor.',
    ],
    recursosReferencia: [
      'Directiva (UE) 2019/790 sobre derechos de autor — EUR-Lex',
      'TRLPI (modificado por RDL 24/2021) — BOE',
      'Directiva de retransmisiones en línea — EUR-Lex',
    ],
    funcionNormativa: 'Sectorial y de equilibrio — adapta la propiedad intelectual al entorno digital protegiendo creadores sin fragmentar el mercado.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Implementar mecanismos de licenciamiento', 'Filtrado de contenidos protegidos con diligencia verificable', 'Cumplir con derecho afín de editores'] },
      { actor: 'medios', intensidad: 'media', obligaciones: ['Ejercer derecho afín de editores de prensa', 'Gestionar licencias de retransmisión online', 'Negociar con plataformas por uso de contenidos'] },
      { actor: 'fabricantes', intensidad: 'baja', obligaciones: ['Adaptar protección de diseños industriales', 'Registrar diseños conforme a nueva Directiva'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'La moderación de contenidos (DSA) interactúa con los derechos de autor y la libertad de expresión.' },
      { areaId: 11, tipo: 'complementariedad', descripcion: 'La regulación audiovisual se cruza con derechos de retransmisión y cuotas de contenido.' },
      { areaId: 1, tipo: 'complementariedad', descripcion: 'La IA generativa plantea desafíos específicos sobre minería de textos y datos y derechos de autor.' },
    ],
    hitosProximos: ['Community Design Directive: transposición prevista 2027', 'Licencia obligatoria de patentes: en tramitación'],
    normas: [
      { nombre: 'Dir. Derechos de Autor DSM', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021 que modifica TRLPI. Entidades de gestión activas.', plazo: 'Cumplido' },
      { nombre: 'Dir. Retransmisiones Online', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021. Principio de país de origen.', plazo: 'Cumplido' },
      { nombre: 'Community Design Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Deberá modificar Ley 20/2003.', plazo: 'Previsto 2027' },
      { nombre: 'Compulsory licensing of patents', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación legislativa.', plazo: '—' },
    ]
  },
  {
    id: 6, nombre: 'Ciberseguridad y Resiliencia Digital',
    subtitulo: 'Gestión de riesgos, notificación de incidentes, seguridad de productos y resiliencia financiera',
    descripcion: 'NIS2, Cybersecurity Act, DORA, ENISA, certificación, respuesta a incidentes',
    color: '#dc2626', vigentes: 5, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 4, directivas: 1,
    sintesisEjecutiva: 'Marco integral de ciberseguridad que articula obligaciones de gestión de riesgos y notificación de incidentes para sectores esenciales y relevantes, requisitos de seguridad para productos con elementos digitales y resiliencia operativa del sector financiero. Su impacto es transversal en toda la economía.',
    explicacionMedia: 'La ciberseguridad europea combina un marco de seguridad de redes y sistemas (NIS2), una directiva de resiliencia de entidades críticas y un reglamento de resiliencia cibernética para productos (CRA). Se complementa con certificación, cooperación operativa y medidas de solidaridad. La lógica del DSM es elevar de forma armonizada la línea base de seguridad, reforzando confianza y continuidad.',
    explicacionCompleta: 'El alcance incluye obligaciones de gobernanza de riesgos, controles técnicos y organizativos, notificación de incidentes, gestión de la cadena de suministro, requisitos de seguridad para hardware y software, y certificación. Quedan fuera obligaciones sectoriales específicas que se abordan en sus marcos propios, aunque existan remisiones. La Agencia Europea de Ciberseguridad (ENISA) impulsa esquemas de certificación y coordinación. DORA es la lex specialis de NIS2 para el sector financiero.',
    impactoResumen: 'Las entidades esenciales e importantes deben implementar medidas de ciberseguridad proporcionales al riesgo. Los fabricantes de productos con elementos digitales deben garantizar la seguridad durante todo el ciclo de vida, incluyendo actualizaciones. Las entidades financieras deben cumplir DORA con pruebas de penetración y gestión de terceros.',
    estadoUEDetalle: 'NIS2 debería estar transpuesta desde octubre 2024, pero varios Estados miembros, incluida España, han incumplido el plazo. DORA se aplica desde enero 2025. El Cyber Resilience Act se aplicará de forma escalonada con ventanas largas de aplicación de requisitos de producto.',
    transposicionDetalle: 'NIS2 tiene el plazo de transposición vencido. El anteproyecto fue aprobado en enero 2025 y está en tramitación parlamentaria. Los reglamentos (DORA, Cybersecurity Act, CRA, Cyber Solidarity Act) son de aplicación directa. La transposición involucra a autoridades sectoriales y organismos especializados (CCN-CERT, INCIBE), con designación de puntos de contacto únicos y guías técnicas en elaboración.',
    alcance: 'Gobernanza de riesgos, controles técnicos y organizativos, notificación de incidentes, gestión de cadena de suministro, requisitos de seguridad para hardware y software, certificación, cooperación operativa y resiliencia de entidades críticas.',
    conceptosClave: ['Operador esencial e importante', 'Evaluación de conformidad', 'Vulnerabilidades explotables', 'Seguridad desde el diseño', 'Cadena de suministro', 'Notificación de incidentes', 'Resiliencia operativa digital (DORA)', 'Certificación de ciberseguridad'],
    arquitecturaNormativaUE: 'NIS2 (directiva con transposición en marcha), Directiva de Resiliencia de Entidades Críticas, CRA (reglamento con periodos transitorios), DORA (reglamento vigente para sector financiero), Cybersecurity Act (certificación) y Cyber Solidarity Act. ENISA coordina.',
    clavesInterpretacion: [
      'Seguridad no es solo TI: incluye gobernanza, formación y continuidad de negocio.',
      'La cadena de suministro y el soporte posventa son elementos críticos de cumplimiento.',
      'Los informes de incidentes tienen umbrales y tiempos precisos que varían por marco.',
      'DORA es lex specialis de NIS2 para el sector financiero: no se duplican, se complementan.',
    ],
    alertasRigor: [
      'NIS2 tiene el plazo de transposición vencido en España; las obligaciones están definidas pero la implementación normativa interna está pendiente.',
      'El CRA tiene ventanas largas de aplicación: no todas las obligaciones son exigibles simultáneamente.',
      'La certificación de ciberseguridad no es obligatoria para todos los productos, sino para categorías específicas.',
    ],
    recursosReferencia: [
      'NIS2 Directive — EUR-Lex',
      'Cyber Resilience Act — EUR-Lex',
      'DORA — EUR-Lex',
      'ENISA — Esquemas de certificación y guías',
      'CCN-CERT — Guías técnicas nacionales',
      'INCIBE — Recursos de ciberseguridad',
    ],
    funcionNormativa: 'Transversal y de cumplimiento — eleva la línea base de seguridad en toda la economía digital.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Gestionar riesgos de ciberseguridad (NIS2)', 'Notificar incidentes significativos en plazos precisos', 'Garantizar seguridad de productos digitales (CRA)'] },
      { actor: 'financieras', intensidad: 'alta', obligaciones: ['Cumplir DORA: resiliencia operativa', 'Pruebas de penetración avanzadas', 'Gestión de riesgos de terceros TIC críticos'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Seguridad por diseño en productos conectados', 'Actualizaciones de seguridad durante ciclo de vida', 'Evaluación de conformidad CE'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Transponer NIS2 (plazo vencido)', 'Designar autoridades competentes y puntos de contacto', 'Establecer y coordinar CSIRT nacionales'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'complementariedad', descripcion: 'La IA requiere garantías de ciberseguridad; el CRA afecta a productos con IA embebida.' },
      { areaId: 12, tipo: 'dependencia', descripcion: 'DORA es la lex specialis de NIS2 para el sector financiero.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'Los operadores de telecomunicaciones son entidades esenciales bajo NIS2.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'La ciberseguridad y la protección de datos comparten obligaciones de notificación de brechas.' },
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
    id: 7, nombre: 'Identidad Digital y Servicios de Confianza',
    subtitulo: 'Identificación electrónica, firma, cartera europea de identidad y servicios cualificados',
    descripcion: 'eIDAS 2, cartera de identidad digital UE, firma electrónica, servicios de confianza',
    color: '#1e3a5f', vigentes: 5, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 2, directivas: 3,
    sintesisEjecutiva: 'Marco común para la identificación y firma electrónicas y para la cartera europea de identidad digital. La identidad digital europea armoniza niveles de garantía, reconoce mutuamente esquemas nacionales y despliega una cartera electrónica interoperable que permitirá acreditar atributos y firmar.',
    explicacionMedia: 'Los servicios de confianza —sellos, certificados, entrega electrónica— completan el ecosistema. La revisión de eIDAS introduce la cartera digital europea como instrumento clave para transacciones seguras, identificación transfronteriza y prestación de servicios públicos y privados. Su lógica dentro del DSM es facilitar operaciones transfronterizas seguras y reducir fricciones administrativas y comerciales.',
    explicacionCompleta: 'El alcance cubre esquemas de identificación electrónica notificados, servicios de confianza cualificados y no cualificados, la cartera digital europea y los marcos de certificación y auditoría. No incluye credenciales puramente privadas no integradas en el esquema europeo. La arquitectura normativa se fundamenta en la revisión de eIDAS adoptada recientemente, con actos de ejecución y estándares técnicos que definirán carteras, interfaces y seguridad. Los pilotajes a gran escala están en curso.',
    impactoResumen: 'Los proveedores de servicios digitales deberán designar representantes legales en la UE y atender órdenes de entrega de pruebas electrónicas en plazos reducidos. Administraciones y proveedores deberán aceptar y verificar carteras europeas. Los prestadores de confianza mantendrán requisitos de seguridad y auditoría.',
    estadoUEDetalle: 'eIDAS 2 está adoptado con periodos de implementación técnica y organizativa. Los pilotajes de carteras de identidad están en curso. El paquete e-Evidence entrará en aplicación en agosto 2026. La Directiva sobre violencia contra mujeres incluye aspectos de ciberviolencia.',
    transposicionDetalle: 'En España, la infraestructura de identificación y firma está consolidada (DNIe, @firma, Cl@ve). Se está alineando con la cartera europea. Las autoridades supervisan prestadores de servicios de confianza. La Directiva PNR fue transpuesta por LO 1/2020. Las directivas de e-Evidence y violencia contra mujeres están pendientes de transposición.',
    alcance: 'Esquemas de identificación electrónica, servicios de confianza cualificados y no cualificados, cartera digital europea, certificación, auditoría, cooperación judicial y policial en el entorno digital, pruebas electrónicas transfronterizas.',
    conceptosClave: ['Niveles de garantía', 'Prestador cualificado de confianza', 'Cartera de identidad digital', 'Atributos verificados', 'Firma electrónica cualificada', 'e-Evidence', 'Principio de país de origen'],
    arquitecturaNormativaUE: 'Revisión de eIDAS (eIDAS 2) como eje, con actos de ejecución y estándares técnicos. Paquete e-Evidence (reglamento + directiva). Directiva PNR y Reglamento Europol para cooperación policial.',
    clavesInterpretacion: [
      'No se debe confundir niveles de garantía con experiencia de usuario.',
      'La cartera no sustituye todos los sistemas existentes de inmediato.',
      'Los servicios de confianza cualificados tienen presunción legal que los no cualificados carecen.',
      'Las órdenes de e-Evidence interactúan con las garantías del RGPD.',
    ],
    alertasRigor: [
      'Los estándares técnicos de la cartera están en desarrollo; su disponibilidad condicionará la implementación.',
      'La obligatoriedad de aceptación de carteras tiene fases diferenciadas por tipo de servicio.',
    ],
    recursosReferencia: [
      'eIDAS 2 — EUR-Lex',
      'Paquete e-Evidence — EUR-Lex',
      'Cl@ve y DNIe — Gobierno de España',
      'Pilotos de cartera de identidad europea — Comisión Europea',
    ],
    funcionNormativa: 'Habilitante y organizativa — facilita transacciones seguras y reduce fricciones administrativas y comerciales transfronterizas.',
    obligacionesActores: [
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Designar representante legal en la UE', 'Atender órdenes de e-Evidence en plazos cortos', 'Preservar datos conforme a órdenes judiciales', 'Aceptar y verificar carteras de identidad'] },
      { actor: 'plataformas', intensidad: 'media', obligaciones: ['Cooperar con autoridades en investigaciones', 'Integrar verificación de identidad digital europea', 'Transmitir datos conforme a órdenes europeas'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Adaptar plataformas públicas para aceptar carteras', 'Transponer directivas pendientes (e-Evidence, ciberviolencia)', 'Coordinar con Europol y Eurojust', 'Establecer puntos de contacto para e-Evidence'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'La verificación de identidad refuerza la trazabilidad de comerciantes exigida por el DSA.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'Las órdenes de e-Evidence y la identificación interactúan con las garantías del RGPD.' },
      { areaId: 12, tipo: 'complementariedad', descripcion: 'La identidad digital europea es infraestructura para pagos y servicios financieros seguros.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'La conectividad fiable es necesaria para la verificación de carteras electrónicas.' },
    ],
    hitosProximos: ['e-Evidence: aplicación agosto 2026', 'Dir. e-Evidence representante: transposición 18.08.2026', 'Dir. Violencia contra mujeres: transposición 14.06.2027', 'Pilotos de cartera de identidad: en curso'],
    normas: [
      { nombre: 'Directiva PNR', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por LO 1/2020. Unidad de Información sobre Pasajeros (UIP).', plazo: 'Cumplido' },
      { nombre: 'Reglamento e-Evidence', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde agosto 2026.', plazo: 'Agosto 2026' },
      { nombre: 'Dir. e-Evidence (representante)', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Obliga a designar representante legal.', plazo: '18.08.2026' },
      { nombre: 'Reglamento Europol', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Policía Nacional y Guardia Civil como puntos de contacto.', plazo: '—' },
      { nombre: 'Dir. Violencia contra Mujeres', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Incluye ciberviolencia. Deberá modificar CP y Ley 1/2004.', plazo: '14.06.2027' },
    ]
  },
  {
    id: 8, nombre: 'Servicios Digitales y Confianza en Plataformas',
    subtitulo: 'Diligencia debida, transparencia, gestión de riesgos sistémicos y moderación responsable',
    descripcion: 'DSA, moderación de contenidos, contenidos terroristas, dark patterns, Digital Fairness Act',
    color: '#c2410c', vigentes: 3, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 0,
    sintesisEjecutiva: 'Marco horizontal de responsabilidades de intermediarios, obligaciones de transparencia en publicidad, procesos de reporte y retirada de contenidos, y evaluación y mitigación de riesgos para plataformas de gran tamaño. El DSA fija estándares comunes de confianza y seguridad digital que repercuten en usuarios y empresas.',
    explicacionMedia: 'La regulación de servicios digitales establece un régimen escalonado por tamaño de intermediario: desde obligaciones básicas de transparencia hasta evaluaciones de riesgos sistémicos para plataformas y motores de búsqueda de gran escala (VLOPs/VLOSEs). La lógica en el DSM es asegurar un mercado de servicios digitales responsable, predecible y supervisado a escala europea, sin sustituir la libertad de expresión ni la competencia.',
    explicacionCompleta: 'El alcance incluye servicios de intermediación, alojamiento y plataformas en línea, obligaciones de diligencia, transparencia publicitaria, mecanismos de denuncia y recurso, y requisitos reforzados para plataformas y motores de búsqueda designados por su escala. Quedan fuera las obligaciones sectoriales de medios audiovisuales y las reglas de competencia de gatekeepers. La supervisión se articula a través de coordinadores nacionales de servicios digitales y la Comisión Europea para VLOPs.',
    impactoResumen: 'Las plataformas online deben implementar mecanismos de notificación y actuación, transparencia en publicidad y sistemas de reclamación. Las VLOPs tienen obligaciones reforzadas de evaluación de riesgos sistémicos, auditorías independientes e informes de transparencia. La exención de responsabilidad no cubre la falta de diligencia debida.',
    estadoUEDetalle: 'El DSA se aplica plenamente desde febrero 2024. El Reglamento de contenidos terroristas desde junio 2022. El Political Advertising Regulation desde octubre 2025. El Digital Fairness Act está en fase de preparación.',
    transposicionDetalle: 'Los tres reglamentos vigentes son de aplicación directa. La CNMC ha sido designada como Coordinador de Servicios Digitales para el DSA. La Audiencia Nacional gestiona las órdenes de contenidos terroristas. Persisten áreas de ajuste en la coordinación interinstitucional y en la claridad de canales para usuarios.',
    alcance: 'Servicios de intermediación, alojamiento y plataformas en línea, diligencia debida, transparencia publicitaria, mecanismos de denuncia, riesgos sistémicos, contenidos terroristas y publicidad política.',
    conceptosClave: ['Exención de responsabilidad condicionada', 'Principio de país de origen', 'Riesgos sistémicos', 'Trazabilidad de comerciantes', 'Publicidad basada en perfiles', 'Diligencia debida digital', 'Coordinador de servicios digitales'],
    arquitecturaNormativaUE: 'Reglamento de servicios digitales (DSA) como núcleo horizontal, complementado por normativa de retirada de contenidos terroristas y reglamento de publicidad política. Guías y códigos de buenas prácticas completan la práctica institucional.',
    clavesInterpretacion: [
      'La exención de responsabilidad no cubre incumplimientos de obligaciones de diligencia debida.',
      'La publicidad basada en perfiles tiene restricciones específicas y prohibiciones para menores.',
      'No debe confundirse moderación con censura ni exención con impunidad.',
      'La diligencia debida es verificable y sujeta a supervisión y auditoría.',
    ],
    alertasRigor: [
      'La supervisión de VLOPs está centralizada en la Comisión, no en las autoridades nacionales.',
      'El Digital Fairness Act aún no es una propuesta formal: los dark patterns se abordan con las herramientas existentes.',
      'Las auditorías independientes de VLOPs son un instrumento nuevo cuya metodología evoluciona.',
    ],
    recursosReferencia: [
      'Digital Services Act — EUR-Lex',
      'Reglamento de contenidos terroristas — EUR-Lex',
      'Political Advertising Regulation — EUR-Lex',
      'CNMC — Coordinador de Servicios Digitales',
    ],
    funcionNormativa: 'Horizontal y de supervisión — fija estándares de confianza y seguridad en el ecosistema de intermediarios digitales.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Mecanismos de notificación y actuación (DSA)', 'Transparencia en publicidad online', 'Evaluación de riesgos sistémicos (VLOPs)', 'Retirar contenido terrorista en 1 hora', 'Auditorías independientes para VLOPs'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir obligaciones básicas del DSA', 'Designar punto de contacto', 'Publicar condiciones generales claras'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Supervisar cumplimiento del DSA vía CNMC', 'Emitir órdenes de actuación', 'Coordinar con Comisión Europea'] },
    ],
    dependencias: [
      { areaId: 9, tipo: 'complementariedad', descripcion: 'El DSA y las normas de protección del consumidor comparten objetivos de transparencia en marketplaces.' },
      { areaId: 10, tipo: 'complementariedad', descripcion: 'El DMA y el DSA son complementarios: uno regula la competencia y otro la responsabilidad de contenidos.' },
      { areaId: 5, tipo: 'complementariedad', descripcion: 'La moderación de contenidos interactúa con los derechos de autor y la libertad de expresión.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'La moderación y la publicidad implican tratamientos de datos personales sujetos al RGPD.' },
    ],
    hitosProximos: ['DSA: supervisión activa de VLOPs por Comisión', 'Digital Fairness Act: propuesta Q4 2026', 'Auditorías independientes de VLOPs: en curso'],
    normas: [
      { nombre: 'Digital Services Act (DSA)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde febrero 2024. CNMC como Coordinador de Servicios Digitales.', plazo: 'En vigor' },
      { nombre: 'Reg. Contenidos Terroristas', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde junio 2022. Audiencia Nacional como autoridad.', plazo: '—' },
      { nombre: 'Political Advertising Regulation', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde octubre 2025. JEC como autoridad supervisora.', plazo: 'Octubre 2025' },
      { nombre: 'Digital Fairness Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente. Dark patterns, diseño adictivo, profiling menores.', plazo: '—' },
    ]
  },
  {
    id: 9, nombre: 'Consumidores Digitales y Responsabilidad por Producto',
    subtitulo: 'Garantías, transparencia, reparación, responsabilidad civil y protección en el entorno digital',
    descripcion: 'Geo-blocking, IVA e-commerce, garantías digitales, contenidos y servicios digitales, responsabilidad por producto',
    color: '#b45309', vigentes: 7, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 2, directivas: 5,
    sintesisEjecutiva: 'Protección integral del consumidor en el entorno digital. Abarca desde garantías para contenidos digitales y bienes con elementos digitales hasta responsabilidad por productos defectuosos, incluyendo software e IA. La coordinación en cooperación de protección de consumidores facilita la aplicación transfronteriza.',
    explicacionMedia: 'Las directivas sobre contenidos y servicios digitales, ventas de bienes y modernización de normas de consumo actualizan garantías, remedios y transparencia, incluidas reseñas, descuentos y personalización de precios. Su lógica en el DSM es dar seguridad jurídica y equilibrio entre innovación comercial y derechos del consumidor digital.',
    explicacionCompleta: 'El alcance incluye contratos para contenidos y servicios digitales, garantías en bienes con elementos digitales, información precontractual, desistimiento, prácticas desleales y requisitos de transparencia en mercados en línea. No cubre la responsabilidad de intermediarios, que pertenece al bloque de servicios digitales. La responsabilidad por producto se extiende expresamente a software e IA a través de la nueva Product Liability Directive.',
    impactoResumen: 'Los vendedores online deben garantizar transparencia en precios y condiciones. Los fabricantes de productos con elementos digitales deben ofrecer actualizaciones de seguridad como parte de la conformidad. La responsabilidad por producto se extiende a software e IA. La Right to Repair Directive refuerza el derecho a reparación con obligación de piezas de repuesto.',
    estadoUEDetalle: 'Siete normas vigentes conforman un marco robusto de protección del consumidor. Dos directivas clave (Product Liability y Right to Repair) están pendientes de transposición con plazos en 2026.',
    transposicionDetalle: 'Las directivas de contenidos digitales, ventas y Omnibus fueron transpuestas por RDL 7/2021. La Product Liability Directive y la Right to Repair Directive deben ser transpuestas antes de diciembre y julio 2026 respectivamente, requiriendo modificar el TRLGDCU. Pueden aparecer singularidades en la interacción con normativa autonómica de consumo.',
    alcance: 'Contratos de contenidos y servicios digitales, garantías de bienes con elementos digitales, conformidad, actualización, prácticas comerciales desleales, transparencia en marketplaces, responsabilidad civil por producto defectuoso (incluyendo software e IA) y derecho a reparación.',
    conceptosClave: ['Conformidad digital', 'Actualizaciones de seguridad', 'Remedios', 'Reseñas verificadas', 'Personalización de precios', 'Responsabilidad objetiva', 'Derecho a reparación', 'Geo-blocking'],
    arquitecturaNormativaUE: 'Directivas de contenidos digitales, ventas de bienes y Omnibus como base transpuesta. Product Liability Directive y Right to Repair Directive pendientes. Reglamento de Geo-blocking y General Product Safety Regulation en aplicación directa. Cooperación reforzada entre autoridades de consumo.',
    clavesInterpretacion: [
      'Los contenidos y servicios digitales exigen actualizaciones de seguridad como parte de la conformidad, no como cortesía.',
      'La publicidad personalizada tiene límites legales específicos, especialmente con menores.',
      'La responsabilidad por producto se extiende a software e IA: el concepto de "producto" evoluciona.',
      'El derecho a reparación no elimina la garantía legal, sino que la complementa.',
    ],
    alertasRigor: [
      'La Product Liability Directive y la Right to Repair tienen plazos de transposición en 2026 que España debe cumplir.',
      'La interacción con normativa autonómica de consumo puede generar particularidades de aplicación.',
    ],
    recursosReferencia: [
      'Directiva de contenidos digitales — EUR-Lex',
      'Product Liability Directive — EUR-Lex',
      'Right to Repair Directive — EUR-Lex',
      'RDL 7/2021 — BOE',
      'AECOSAN — Guías de consumo',
    ],
    funcionNormativa: 'Protección y equilibrio — garantiza seguridad jurídica y confianza del consumidor en el comercio electrónico.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Transparencia en marketplaces online', 'Informar sobre parámetros de clasificación', 'No discriminar por nacionalidad (Geo-blocking)', 'Verificar reseñas cuando se publiquen'] },
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Garantía legal de contenidos digitales con actualizaciones', 'Proporcionar piezas de repuesto (Right to Repair)', 'Responsabilidad extendida a software e IA'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Cumplir garantías de contenidos digitales', 'Informar sobre compatibilidad y funcionalidad', 'Adaptarse a nueva responsabilidad por producto'] },
    ],
    dependencias: [
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA refuerza las obligaciones de transparencia de los marketplaces online.' },
      { areaId: 1, tipo: 'dependencia', descripcion: 'La responsabilidad por producto se extiende a sistemas de IA, requiriendo coordinación con el AI Act.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'La personalización de precios y reseñas implican tratamientos de datos personales.' },
    ],
    hitosProximos: ['Right to Repair: transposición 31.07.2026', 'Product Liability: transposición 09.12.2026', 'Digital Fairness Act (consumo): propuesta pendiente'],
    normas: [
      { nombre: 'Reg. Geo-Blocking', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. AECOSAN como punto de contacto.', plazo: '—' },
      { nombre: 'Dir. Contenidos Digitales', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Garantía legal de 2 años. Actualizaciones de seguridad exigibles.', plazo: 'Cumplido' },
      { nombre: 'Dir. Ventas Bienes con Elementos Digitales', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Garantía extendida a 3 años.', plazo: 'Cumplido' },
      { nombre: 'Dir. Omnibus Consumo', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 7/2021. Transparencia en marketplaces online.', plazo: 'Cumplido' },
      { nombre: 'General Product Safety Reg.', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde diciembre 2024. AECOSAN como autoridad.', plazo: 'En vigor' },
      { nombre: 'Product Liability Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Extiende responsabilidad a software e IA. Modificará TRLGDCU.', plazo: '09.12.2026' },
      { nombre: 'Right to Repair Directive', tipo: 'Directiva', estadoES: 'pendiente', transposicionES: 'Pendiente. Deberá modificar TRLGDCU. Piezas de repuesto y prioridad de reparación.', plazo: '31.07.2026' },
      { nombre: 'Digital Fairness Act (consumo)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta. Abordará dark patterns y diseño adictivo.', plazo: '—' },
    ]
  },
  {
    id: 10, nombre: 'Mercados Digitales y Competencia en Plataformas',
    subtitulo: 'Obligaciones ex ante para guardianes de acceso, contestabilidad e interoperabilidad',
    descripcion: 'DMA, gatekeepers, antimonopolio digital, subvenciones foráneas, trabajo en plataformas',
    color: '#0f766e', vigentes: 4, enProceso: 1, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 1,
    sintesisEjecutiva: 'Impone obligaciones ex ante a grandes plataformas designadas como guardianes de acceso, con el fin de preservar la competencia y la contestabilidad. El DMA corrige fallos estructurales que el derecho de la competencia no aborda con rapidez suficiente. La Platform Work Directive regula las condiciones laborales en la economía de plataformas.',
    explicacionMedia: 'La regulación de mercados digitales impone obligaciones y prohibiciones a gatekeepers en ámbitos como interoperabilidad, auto-preferencia, datos combinados y acceso a tiendas de aplicaciones. Su relevancia dentro del DSM radica en equilibrar el poder de plataformas sistémicas y habilitar oportunidades para pymes y desarrolladores. El régimen no sustituye al derecho de la competencia, sino que lo complementa.',
    explicacionCompleta: 'El alcance cubre servicios de plataforma central prestados por empresas que alcanzan umbrales cualitativos y cuantitativos, y se extiende a obligaciones de no auto-preferencia, apertura de ecosistemas, interoperabilidad de mensajería en ciertos supuestos y transparencia comercial. No incluye la valoración caso por caso de conductas anticompetitivas, que permanece en el ámbito del derecho de la competencia. El Reglamento de Subvenciones Foráneas protege el mercado interior de distorsiones.',
    impactoResumen: 'Los gatekeepers designados deben cumplir obligaciones de interoperabilidad, acceso a datos y no auto-preferencia. Los trabajadores de plataformas se beneficiarán de la presunción de laboralidad. La interoperabilidad tiene límites técnicos y de seguridad que deben respetarse.',
    estadoUEDetalle: 'El DMA está plenamente operativo con varios procedimientos abiertos contra gatekeepers. La Platform Work Directive debe ser transpuesta antes de diciembre 2026. La EU Inc. está en fase de propuesta.',
    transposicionDetalle: 'El DMA y los reglamentos son de aplicación directa. La coordinación entre la CNMC y la Comisión Europea (EDCN) es relevante. La Platform Work Directive tiene transposición parcial a través de la Ley Rider (RDL 9/2021), pero la Directiva UE es más amplia y requerirá ampliación normativa.',
    alcance: 'Servicios de plataforma central de gatekeepers, obligaciones ex ante de interoperabilidad y no auto-preferencia, condiciones laborales en plataformas, subvenciones foráneas en el mercado interior y crowdfunding.',
    conceptosClave: ['Gatekeeper', 'Servicios de plataforma central', 'Remedios ex ante', 'Contestabilidad', 'Auto-preferencia', 'Interoperabilidad de mensajería', 'Presunción de laboralidad'],
    arquitecturaNormativaUE: 'Reglamento de mercados digitales (DMA) vigente, complementado por directrices, formularios y actos de ejecución. Reglamento de Subvenciones Foráneas. Platform Work Directive pendiente de transposición. La Comisión centraliza la supervisión de gatekeepers.',
    clavesInterpretacion: [
      'El régimen DMA no sustituye al derecho de la competencia; son complementarios.',
      'La interoperabilidad tiene límites técnicos y de seguridad que deben evaluarse.',
      'La designación como gatekeeper depende de umbrales cuantitativos y cualitativos.',
      'La presunción de laboralidad de la Platform Work Directive es refutable, no absoluta.',
    ],
    alertasRigor: [
      'Los procedimientos de enforcement del DMA están en fases iniciales; la jurisprudencia es incipiente.',
      'La Ley Rider española cubre parcialmente la Platform Work Directive, pero deja aspectos por completar.',
    ],
    recursosReferencia: [
      'Digital Markets Act — EUR-Lex',
      'Platform Work Directive — EUR-Lex',
      'Reglamento de Subvenciones Foráneas — EUR-Lex',
      'Linklaters — DMA Hub',
      'CNMC — Informes de competencia digital',
    ],
    funcionNormativa: 'Regulación de competencia ex ante — corrige fallos estructurales y preserva contestabilidad en mercados digitales.',
    obligacionesActores: [
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Cumplir obligaciones DMA si designados gatekeepers', 'Interoperabilidad de servicios de mensajería', 'No auto-preferencia en resultados de búsqueda', 'Reclasificar trabajadores conforme a Platform Work Dir.'] },
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
      { nombre: 'Platform Work Directive', tipo: 'Directiva', estadoES: 'parcial', transposicionES: 'Transposición parcial por Ley Rider (RDL 9/2021). La Directiva UE es más amplia: requiere completar.', plazo: '02.12.2026' },
      { nombre: 'EU Inc. (28th Regime)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Propuesta 18.03.2026. Forma societaria UE opcional.', plazo: 'Acuerdo finales 2026' },
      { nombre: 'Crowdfunding Regulation', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. CNMV como autoridad competente.', plazo: '—' },
    ]
  },
  {
    id: 11, nombre: 'Medios de Comunicación y Contenido Audiovisual',
    subtitulo: 'Libertad de medios, pluralismo, cuotas de contenido europeo y regulación de plataformas de vídeo',
    descripcion: 'AVMS Directive, Media Freedom Act, cuota europea, regulación de plataformas de vídeo',
    color: '#9333ea', vigentes: 3, enProceso: 0, planificadas: 0, enRevision: 1, reglamentos: 1, directivas: 2,
    sintesisEjecutiva: 'Regula el sector audiovisual y protege la libertad e independencia de los medios de comunicación. La Directiva AVMS establece cuotas de contenido europeo en plataformas VOD y protección de menores. El EMFA garantiza independencia editorial y pluralidad mediática.',
    explicacionMedia: 'El sector audiovisual europeo combina regulación de contenidos, protección de menores, cuotas de obra europea y garantías de pluralismo. El EMFA refuerza la independencia editorial frente a interferencias políticas y comerciales. La revisión de la Directiva AVMS se anticipa para adaptarla a plataformas, algoritmos de recomendación y deepfakes.',
    explicacionCompleta: 'El alcance incluye servicios de comunicación audiovisual lineales y a demanda, plataformas de intercambio de vídeos, publicidad audiovisual, protección de menores y pluralismo mediático. La regulación se adapta progresivamente a las plataformas y sus algoritmos de recomendación. La revisión prevista abordará contenidos generados por IA y deepfakes.',
    impactoResumen: 'Las plataformas de vídeo bajo demanda deben ofrecer al menos un 30% de contenido europeo. Los medios de comunicación tienen nuevas garantías de independencia editorial. Se espera una revisión de la Directiva AVMS para adaptarla a plataformas y deepfakes.',
    estadoUEDetalle: 'La Directiva AVMS revisada y el EMFA están vigentes. La Copyright Directive tiene impacto directo en medios. La revisión de la AVMS se anticipa para Q3 2026.',
    transposicionDetalle: 'La Directiva AVMS fue transpuesta por la Ley 13/2022 (LGCA), con la CNMC como autoridad audiovisual. El EMFA es de aplicación directa desde agosto 2025. La Copyright Directive fue transpuesta por RDL 24/2021.',
    alcance: 'Servicios audiovisuales lineales y a demanda, plataformas de intercambio de vídeos, publicidad audiovisual, protección de menores, pluralismo mediático, independencia editorial y derechos afines de editores.',
    conceptosClave: ['Cuota de obra europea', 'Independencia editorial', 'Pluralismo mediático', 'Plataforma de intercambio de vídeos', 'Protección de menores', 'Algoritmos de recomendación'],
    arquitecturaNormativaUE: 'Directiva AVMS revisada y transpuesta, EMFA (reglamento de aplicación directa), Copyright Directive para aspectos de medios. Revisión de AVMS en preparación.',
    clavesInterpretacion: [
      'La cuota del 30% se aplica al catálogo, no a la producción.',
      'El EMFA protege la independencia editorial pero no impide la regulación de contenidos ilegales.',
      'La protección de menores en plataformas de vídeo es una obligación verificable, no una mera recomendación.',
    ],
    alertasRigor: [
      'La revisión de la AVMS está en fase preparatoria; los contenidos generados por IA plantean desafíos aún no legislados.',
      'El EMFA tiene mecanismos de supervisión a través del Board europeo que están en fase de despliegue.',
    ],
    recursosReferencia: [
      'Directiva AVMS (revisada) — EUR-Lex',
      'European Media Freedom Act — EUR-Lex',
      'Ley 13/2022 General de Comunicación Audiovisual — BOE',
      'CNMC — Informes audiovisuales',
    ],
    funcionNormativa: 'Sectorial y de garantía — protege pluralismo, independencia editorial y diversidad cultural en el ecosistema digital.',
    obligacionesActores: [
      { actor: 'medios', intensidad: 'alta', obligaciones: ['Cumplir cuota 30% obra europea en VOD', 'Beneficiarse de garantías EMFA', 'Gestionar derechos afines de editores'] },
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Catalogar y promover contenido europeo', 'Cumplir reglas de publicidad audiovisual', 'Proteger menores en contenido audiovisual'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Supervisar cumplimiento LGCA vía CNMC', 'Participar en EBMS (EMFA)', 'Proteger pluralismo mediático'] },
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
      { nombre: 'Revisión Directiva AVMS', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta de revisión. Prevista Q3 2026. Abordará deepfakes y algoritmos.', plazo: '—' },
    ]
  },
  {
    id: 12, nombre: 'Servicios Financieros Digitales y Criptoactivos',
    subtitulo: 'Pagos, open banking, criptoactivos, resiliencia operativa y prevención del blanqueo',
    descripcion: 'PSD2/PSD3, MiCA, DORA, euro digital, crowdfunding, prevención blanqueo',
    color: '#0369a1', vigentes: 5, enProceso: 3, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 2,
    sintesisEjecutiva: 'Marco regulatorio para la digitalización de servicios financieros. MiCA establece el primer marco armonizado para criptoactivos. DORA refuerza la resiliencia operativa digital del sector financiero. La regulación de pagos armoniza la apertura de cuentas a terceros y la seguridad de transacciones, con revisión hacia PSD3/PSR.',
    explicacionMedia: 'La regulación de servicios de pago armoniza el open banking y la seguridad de transacciones. La resiliencia operativa digital (DORA) introduce requisitos de gestión de riesgos TIC, pruebas, notificación de incidentes y supervisión de proveedores críticos. MiCA crea el primer marco armonizado para criptoactivos. Su lógica en el DSM es impulsar innovación segura y resiliente en el núcleo financiero.',
    explicacionCompleta: 'El alcance incluye proveedores de servicios de pago, autenticación reforzada, acceso a datos de cuentas con consentimiento, transferencia instantánea en euros, marcos de gobernanza y pruebas de resiliencia TIC, autorización de proveedores de servicios de criptoactivos y prevención del blanqueo. Quedan fuera productos de inversión y seguros que tienen marcos propios, aunque la resiliencia es transversal. La 6ª Directiva AML y el nuevo Reglamento AML refuerzan la prevención con registros centralizados y diligencia debida para cripto.',
    impactoResumen: 'Las entidades financieras deben cumplir DORA para resiliencia operativa, incluyendo pruebas y gestión de terceros TIC críticos. Los proveedores de servicios de criptoactivos deben obtener autorización conforme a MiCA. Open banking no equivale a acceso sin restricciones. La 6ª Directiva AML reforzará la prevención del blanqueo con registros centralizados.',
    estadoUEDetalle: 'MiCA y DORA están en plena aplicación. PSD2 está vigente pero será reemplazada por PSD3/PSR. La 6ª Directiva AML y el nuevo Reglamento AML imponen plazos hasta 2027. El euro digital y FIDA están en tramitación.',
    transposicionDetalle: 'PSD2 fue transpuesta por RDL 19/2018. La aplicación directa de DORA y MiCA se coordina con autoridades financieras (BdE, CNMV, DGSFP). La 6ª Directiva AML deberá ser transpuesta antes del 10.07.2027, modificando la Ley 10/2010. SEPBLAC actúa como UIF. Persisten particularidades en la adopción de pagos instantáneos.',
    alcance: 'Proveedores de servicios de pago, autenticación reforzada, open banking, pagos instantáneos, criptoactivos, resiliencia operativa TIC del sector financiero, prevención del blanqueo, euro digital y open finance (FIDA).',
    conceptosClave: ['Autenticación reforzada del cliente', 'Iniciación de pagos', 'Open banking', 'Externalización crítica', 'Pruebas de resiliencia', 'Criptoactivo', 'Stablecoin', 'Diligencia debida reforzada', 'Titularidad real'],
    arquitecturaNormativaUE: 'PSD2 vigente con revisión en curso (PSD3/PSR). MiCA para criptoactivos. DORA para resiliencia operativa. 6ª Directiva AML y Reglamento AML para prevención del blanqueo. Propuestas del euro digital y FIDA (open finance) en tramitación.',
    clavesInterpretacion: [
      'Open banking no equivale a acceso sin restricciones: requiere consentimiento y finalidad.',
      'La resiliencia operativa (DORA) exige pruebas y gestión de terceros, no solo controles internos.',
      'MiCA distingue entre categorías de criptoactivos con obligaciones diferenciadas.',
      'La gestión de proveedores TIC críticos merece tratamiento diferenciado bajo DORA.',
    ],
    alertasRigor: [
      'PSD3/PSR están en tramitación; PSD2 sigue siendo la norma vigente hasta su derogación.',
      'El euro digital y FIDA son propuestas sin efectos jurídicos actuales.',
      'La 6ª Directiva AML tiene un plazo de transposición en 2027 que España debe planificar.',
    ],
    recursosReferencia: [
      'MiCA — EUR-Lex',
      'DORA — EUR-Lex',
      'PSD2 / RDL 19/2018 — BOE',
      '6ª Directiva AML — EUR-Lex',
      'BdE — Informes de supervisión',
      'CNMV — Autorización MiCA',
    ],
    funcionNormativa: 'Sectorial y de supervisión — armoniza innovación financiera digital con estabilidad, seguridad y prevención del blanqueo.',
    obligacionesActores: [
      { actor: 'financieras', intensidad: 'alta', obligaciones: ['Cumplir DORA: pruebas de resiliencia y gestión de terceros TIC', 'Autorización MiCA para criptoactivos', 'Reforzar prevención blanqueo (6ª Dir. AML)', 'Preparar PSD3/PSR'] },
      { actor: 'plataformas', intensidad: 'media', obligaciones: ['Licencia MiCA para exchanges cripto', 'Cumplir requisitos AML en operaciones cripto', 'Interoperabilidad bajo FIDA (Open Finance)'] },
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Supervisar MiCA (CNMV)', 'Transponer 6ª Dir. AML antes 10.07.2027', 'Coordinar BdE/CNMV para DORA', 'Establecer registro titularidad real centralizado'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Obtener autorización MiCA si prestan servicios cripto', 'Cumplir requisitos AML proporcionados', 'Acceder a Open Finance (FIDA)'] },
    ],
    dependencias: [
      { areaId: 6, tipo: 'dependencia', descripcion: 'DORA es lex specialis de NIS2 para el sector financiero.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'FIDA (Open Finance) se cruza con el marco de gobernanza de datos.' },
      { areaId: 10, tipo: 'complementariedad', descripcion: 'El Crowdfunding Regulation vincula fintech con regulación de competencia.' },
      { areaId: 7, tipo: 'complementariedad', descripcion: 'La identidad digital europea es infraestructura para pagos y servicios financieros seguros.' },
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
      { nombre: 'FIDA (Open Finance)', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'En tramitación. Acceso a datos financieros con consentimiento.', plazo: '—' },
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
  { fecha: '19.11.2025', titulo: 'Digital Omnibus Package', descripcion: 'Dos propuestas de Reglamento que modifican RGPD, Data Act, NIS2, ePrivacy y AI Act. Ahorro previsto: 6.000M€ hasta 2029.', estado: 'proceso', bloques: [1, 4, 6], efectoJuridico: 'Simplifica obligaciones de reporte para pymes y reduce duplicidades entre normas existentes. No crea derechos ni obligaciones nuevas hasta su aprobación.', proximoPaso: 'Trílogos previstos para primavera 2026.' },
  { fecha: '18.03.2026', titulo: 'EU Inc. (28th Regime)', descripcion: 'Nueva forma societaria UE, constitución en 48h, <100€, sin capital mínimo, digital por defecto.', estado: 'proceso', bloques: [1, 10], efectoJuridico: 'Crea una forma jurídica UE paralela a las nacionales, sin necesidad de transposición.', proximoPaso: 'Acuerdo político previsto para finales de 2026.' },
  { fecha: 'Q1 2026', titulo: 'Cloud and AI Development Act', descripcion: 'Triplicar capacidad centros de datos UE, soberanía cloud, interoperabilidad.', estado: 'planificada', bloques: [1, 2, 4], efectoJuridico: 'Establecerá obligaciones para proveedores cloud y requisitos de soberanía de datos.', proximoPaso: 'Propuesta formal esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'European Innovation Act', descripcion: 'Eliminar barreras regulatorias a innovación, colaboración industria-academia.', estado: 'planificada', bloques: [1, 2, 10], efectoJuridico: 'Introducirá sandboxes regulatorios obligatorios y simplificaciones para startups.', proximoPaso: 'Propuesta formal esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'Digital Networks Act (DNA)', descripcion: 'Sucesor del EECC: permisos, 6G, espectro, open RAN europeas.', estado: 'planificada', bloques: [3], efectoJuridico: 'Reemplazará parcialmente el EECC con un marco actualizado para redes 5G/6G.', proximoPaso: 'Propuesta esperada Q1 2026.', incertidumbre: true },
  { fecha: 'Q1 2026', titulo: 'Chips Act Evaluation', descripcion: 'Evaluación de implementación del Reglamento de Semiconductores.', estado: 'revision', bloques: [1, 2], efectoJuridico: 'Puede dar lugar a ajustes regulatorios basados en resultados de implementación. No suspende las obligaciones vigentes.', proximoPaso: 'Informe de evaluación esperado Q1 2026.' },
  { fecha: 'Q2 2026', titulo: 'Quantum Act', descripcion: 'Marco de financiación para tecnologías cuánticas, cadena de suministro.', estado: 'planificada', bloques: [1, 2], efectoJuridico: 'Creará un marco de gobernanza y financiación para computación cuántica europea.', proximoPaso: 'Propuesta esperada Q2 2026.', incertidumbre: true },
  { fecha: '31.07.2026', titulo: 'Plazo transposición Right to Repair Dir.', descripcion: 'España debe transponer Dir. 2024/1799 sobre derecho a reparación.', estado: 'vigente', bloques: [9], efectoJuridico: 'Obligaciones exigibles a fabricantes: piezas de repuesto, información de reparación, prioridad de reparación sobre sustitución.', proximoPaso: 'España debe aprobar norma de transposición antes de esta fecha.' },
  { fecha: '18.08.2026', titulo: 'Plazo transposición Dir. e-Evidence', descripcion: 'Obliga a proveedores a designar representante legal.', estado: 'vigente', bloques: [7], efectoJuridico: 'Los proveedores de servicios digitales sin sede en la UE deben designar un representante legal.', proximoPaso: 'Entrada en vigor del Reglamento e-Evidence.' },
  { fecha: 'Q3 2026', titulo: 'Revisión Directiva AVMS', descripcion: 'Adaptación a plataformas, algoritmos de recomendación, deepfakes.', estado: 'revision', bloques: [11], efectoJuridico: 'Actualizará las obligaciones de plataformas de vídeo e incluirá regulación de contenido generado por IA. No suspende las obligaciones vigentes mientras dure la revisión.', proximoPaso: 'Propuesta de revisión esperada Q3 2026.', incertidumbre: true },
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

/** Glossary entries for tooltips and educational purposes */
export interface GlosarioEntry {
  termino: string;
  definicion: string;
}

export const glosario: GlosarioEntry[] = [
  { termino: 'Aplicación directa', definicion: 'Exigibilidad de un reglamento de la Unión sin norma interna adicional, aunque pueda requerir medidas organizativas o designaciones nacionales.' },
  { termino: 'Transposición', definicion: 'Incorporación de una directiva al ordenamiento interno mediante ley o reglamento nacional, respetando objetivos y plazos europeos.' },
  { termino: 'Implementación práctica', definicion: 'Despliegue operativo de las obligaciones: desarrollo reglamentario, guías, procedimientos internos y designación de autoridades.' },
  { termino: 'Supervisión', definicion: 'Actividad de control, inspección y sanción por autoridades competentes para garantizar el cumplimiento.' },
  { termino: 'Soft law', definicion: 'Guías, recomendaciones y códigos de conducta sin fuerza obligatoria directa, aunque influyentes interpretativamente.' },
  { termino: 'Normas horizontales', definicion: 'Normas que se aplican a múltiples sectores o agentes del ecosistema digital, como protección de datos o ciberseguridad.' },
  { termino: 'Normas sectoriales', definicion: 'Normas aplicables a ámbitos económicos concretos, por ejemplo comunicaciones electrónicas o servicios financieros.' },
  { termino: 'Gobernanza de ecosistema', definicion: 'Marcos organizativos y de coordinación entre instituciones y agentes que aseguran coherencia regulatoria.' },
  { termino: 'Obligación de resultado', definicion: 'Obligación de alcanzar un fin concreto, verificable y exigible.' },
  { termino: 'Obligación de medios', definicion: 'Obligación centrada en desplegar diligencias adecuadas, sin garantizar un resultado específico.' },
  { termino: 'Actos de ejecución', definicion: 'Normas de la Comisión que concretan detalles técnicos de una legislación de base.' },
  { termino: 'Actos delegados', definicion: 'Normas que permiten a la Comisión modificar elementos no esenciales de una norma con autorización previa del legislador.' },
  { termino: 'Entrada en vigor', definicion: 'Momento a partir del cual una norma forma parte del ordenamiento.' },
  { termino: 'Aplicación efectiva', definicion: 'Fecha desde la que las obligaciones resultan exigibles.' },
  { termino: 'Vacatio legis', definicion: 'Periodo entre la publicación y la aplicación efectiva de una norma.' },
  { termino: 'Alto riesgo (IA)', definicion: 'Categoría legal de sistemas de IA con impacto significativo en derechos o seguridad que deben cumplir requisitos reforzados.' },
  { termino: 'Servicios esenciales', definicion: 'Actividades críticas cuya interrupción afectaría a la sociedad o la economía, sujetas a marcos como NIS2.' },
  { termino: 'Interoperabilidad', definicion: 'Capacidad de sistemas y organizaciones para trabajar conjuntamente mediante normas comunes.' },
  { termino: 'Densidad regulatoria', definicion: 'Concentración de obligaciones o hitos normativos en un periodo que condiciona la carga de cumplimiento.' },
  { termino: 'Diligencia debida digital', definicion: 'Procesos internos de gestión de riesgos, trazabilidad y documentación exigidos por varias normas transversales.' },
  { termino: 'Conmutación en la nube', definicion: 'Derecho a cambiar de proveedor cloud sin barreras técnicas ni contractuales indebidas.' },
  { termino: 'Identidad digital europea', definicion: 'Conjunto de medios y carteras electrónicas armonizadas en la Unión para la identificación y firma.' },
];
