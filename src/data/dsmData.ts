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
    sintesisEjecutiva: 'El Reglamento (UE) 2024/1689 (AI Act) establece el primer marco jurídico horizontal basado en riesgos para el desarrollo, la comercialización y el uso de sistemas de inteligencia artificial en la Unión. No regula la IA en abstracto: clasifica sistemas según su nivel de riesgo —inaceptable, alto, limitado o mínimo— y aplica requisitos proporcionales a cada categoría. Su lógica en el DSM es garantizar que la IA en Europa sea confiable, segura y compatible con derechos fundamentales, sin bloquear la innovación. Los programas Horizonte Europa y Europa Digital canalizan la financiación de I+D.',
    explicacionMedia: 'La regulación de IA clasifica sistemas por riesgo y establece requisitos estrictos para los de alto riesgo, prohibiciones absolutas para prácticas inaceptables y obligaciones de transparencia para ciertos usos. Incluye un régimen específico para modelos de propósito general (GPAI), diferenciando entre modelos con y sin riesgo sistémico. Proveedores y desplegadores asumen responsabilidades diferenciadas. Su lógica dentro del DSM es armonizar condiciones para el despliegue confiable de IA en todos los sectores, mientras los programas de financiación (Horizonte Europa, Europa Digital, EuroHPC) sostienen la capacidad tecnológica del continente.',
    explicacionCompleta: 'El alcance comprende requisitos para sistemas de alto riesgo en gestión de datos, documentación técnica, gobernanza, trazabilidad, ciberseguridad y supervisión humana, además de disposiciones sobre modelos de propósito general en cuanto a transparencia y gestión de riesgos sistémicos. Los proveedores de GPAI deben cumplir obligaciones de transparencia y, si el modelo presenta riesgo sistémico, realizar evaluaciones de adversarial testing y notificar incidentes. Quedan fuera algoritmos sin componente de IA según definiciones legales. La arquitectura normativa se centra en el Reglamento de IA con aplicación escalonada, complementado por propuestas en materia de responsabilidad civil y de productos. Guías técnicas, estándares armonizados (CEN/CENELEC) y el Código de Buenas Prácticas para GPAI están en desarrollo por la Oficina de IA.',
    impactoResumen: 'Los proveedores de sistemas de alto riesgo deben realizar evaluaciones de conformidad, mantener documentación técnica, registrar sus sistemas en la base de datos UE e implementar sistemas de gestión de riesgos y calidad de datos. Los desplegadores deben llevar registros de uso, informar a los afectados y notificar incidentes graves. Las prohibiciones son absolutas y no admiten justificación por interés legítimo.',
    estadoUEDetalle: 'El AI Act entró en vigor el 1 de agosto de 2024, con aplicación escalonada. Las prohibiciones de prácticas de IA inaceptables son aplicables desde el 2 de febrero de 2025. Las obligaciones para proveedores de modelos de propósito general (GPAI) son aplicables desde el 2 de agosto de 2025. Los requisitos para sistemas de alto riesgo en el Anexo III son aplicables desde el 2 de agosto de 2026; los del Anexo I (productos regulados) desde el 2 de agosto de 2027. Horizonte Europa y Europa Digital en plena ejecución.',
    transposicionDetalle: 'Los reglamentos son de aplicación directa. La Agencia Española de Supervisión de Inteligencia Artificial (AESIA), con sede en A Coruña, ha sido creada como organismo supervisor. La coordinación con la AEPD es esencial para sistemas de alto riesgo que traten datos personales. El proceso de designación de notified bodies para evaluación de conformidad está en curso. El CDTI gestiona Horizonte Europa y la SEDIA coordina Europa Digital.',
    alcance: 'Requisitos para sistemas de IA de alto riesgo, disposiciones sobre modelos de propósito general, prohibiciones específicas, programas de financiación de I+D digital, computación de alto rendimiento y cuántica.',
    conceptosClave: ['Clasificación por riesgo', 'Proveedor y usuario de IA', 'Evaluación de conformidad', 'Modelos de propósito general', 'Prohibiciones específicas', 'Sandbox regulatorio', 'Alto riesgo', 'Supervisión humana'],
    arquitecturaNormativaUE: 'El Reglamento de IA es el eje central, con aplicación escalonada. Se complementa con propuestas en materia de responsabilidad civil y de productos. Guías técnicas, estándares armonizados (CEN/CENELEC) y actos de ejecución precisarán metodologías y plantillas. Los programas Horizonte Europa y Europa Digital canalizan la financiación.',
    clavesInterpretacion: [
      'La clasificación como sistema de alto riesgo es una determinación jurídica y técnica que depende del sector de uso y del impacto potencial, no solo de la sofisticación del sistema.',
      'Un mismo modelo puede ser de alto riesgo en un contexto y no serlo en otro.',
      'Las prohibiciones son absolutas y no admiten justificación por interés legítimo: la identificación biométrica en tiempo real en espacios públicos con fines policiales tiene un régimen excepcional muy restringido.',
      'Los modelos de propósito general tienen obligaciones propias diferenciadas; los de riesgo sistémico requieren adversarial testing.',
      'La distinción entre proveedor y desplegador de IA determina el régimen de obligaciones aplicable.',
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
    sintesisEjecutiva: 'Este bloque asegura la autonomía estratégica de la UE en tecnologías críticas. El Chips Act (Reglamento 2023/1781/UE) busca duplicar la cuota europea en semiconductores al 20% para 2030 mediante monitorización de cadenas de suministro, mecanismos de alerta temprana y financiación coordinada (IPCEI). El Critical Raw Materials Act (Reglamento 2024/1252/UE) garantiza el suministro de minerales estratégicos con objetivos cuantitativos de extracción, procesamiento y reciclaje. El Net-Zero Industry Act crea condiciones para fabricar tecnologías limpias en Europa. La lógica en el DSM es asegurar la base material y técnica sobre la que operan todos los demás bloques regulatorios.',
    explicacionMedia: 'La política industrial digital combina instrumentos de gobernanza industrial con herramientas de financiación y estandarización. El Chips Act establece un marco de monitorización continua de cadenas de suministro, con obligaciones de información para operadores y mecanismos de crisis ante escasez. El Critical Raw Materials Act identifica materias primas estratégicas y críticas con objetivos vinculantes para 2030: al menos el 10% de extracción, 40% de procesamiento y 25% de reciclaje dentro de la UE. Los IPCEI (Proyectos Importantes de Interés Común Europeo) canalizan financiación con condicionalidades regulatorias específicas.',
    explicacionCompleta: 'El alcance incluye la cadena de suministro de semiconductores desde el diseño hasta la fabricación y ensamblaje, la identificación y aseguramiento de materias primas críticas y estratégicas, la promoción de industrias limpias y la estandarización TIC. Los tres reglamentos son de aplicación directa y establecen mecanismos de monitorización, alertas tempranas y financiación coordinada. La gobernanza se articula mediante comités (European Semiconductor Board, Critical Raw Materials Board) y redes de autoridades nacionales con la Comisión. La estandarización se canaliza a través de los organismos europeos de normalización (CEN, CENELEC, ETSI). Los PERTE nacionales ejecutan los IPCEI a nivel de Estado miembro.',
    impactoResumen: 'Los fabricantes de semiconductores y empresas de la cadena de suministro tecnológico deben cumplir requisitos de monitorización y reportar alertas tempranas de escasez. Los extractores y procesadores de materias primas deben cumplir objetivos cuantitativos. Las pymes se benefician de programas de apoyo y financiación. España es una fuente clave de litio en el marco del Critical Raw Materials Act.',
    estadoUEDetalle: 'Los tres reglamentos principales están vigentes y en aplicación directa. El Chips Act será objeto de evaluación en Q1 2026, lo que puede dar lugar a ajustes regulatorios basados en los resultados de implementación. Se espera la propuesta del European Innovation Act durante 2026. Los comités de gobernanza (Semiconductor Board, Raw Materials Board) están operativos.',
    transposicionDetalle: 'Los reglamentos son de aplicación directa y no requieren transposición. España participa activamente a través del PERTE Chip y ha sido identificada como fuente clave de litio en la UE. El PNIEC integra los objetivos del Net-Zero Industry Act. España participa en IPCEI Microelectrónica 2. La coordinación entre el Ministerio de Industria y las comunidades autónomas es relevante para la tramitación de permisos de extracción y fabricación.',
    alcance: 'Cadena de suministro de semiconductores, materias primas críticas y estratégicas, industrias limpias y tecnologías cero neto, estandarización TIC e innovación industrial.',
    conceptosClave: ['Autonomía estratégica', 'IPCEI (Proyectos Importantes de Interés Común Europeo)', 'Cadena de suministro crítica', 'Alerta temprana de escasez', 'Materias primas estratégicas', 'Estandarización', 'Tecnologías cero neto', 'Semiconductor Board'],
    arquitecturaNormativaUE: 'Tres reglamentos vigentes de aplicación directa que establecen marcos de gobernanza, monitorización y financiación coordinada. Los comités europeos (Semiconductor Board, Raw Materials Board) coordinan la gobernanza. La estandarización se articula a través de CEN, CENELEC y ETSI.',
    clavesInterpretacion: [
      'La monitorización de cadenas de suministro es una obligación continua, no un ejercicio puntual; incluye mecanismos de alerta temprana y respuesta ante crisis.',
      'Los IPCEI y los PERTE son instrumentos de financiación con condicionalidades regulatorias: no son subvenciones incondicionales.',
      'La designación de materias primas estratégicas puede evolucionar con la geopolítica y con avances tecnológicos en materiales alternativos.',
      'Los objetivos cuantitativos del Critical Raw Materials Act (10%/40%/25%) son vinculantes para 2030, no indicativos.',
    ],
    alertasRigor: [
      'El Chips Act será evaluado en Q1 2026 y puede dar lugar a ajustes regulatorios.',
      'La disponibilidad efectiva de materias primas depende de factores geopolíticos y de tramitación de permisos de extracción que escapan al ámbito regulatorio.',
    ],
    recursosReferencia: [
      'Chips Act (Reglamento 2023/1781/UE) — EUR-Lex',
      'Critical Raw Materials Act (Reglamento 2024/1252/UE) — EUR-Lex',
      'Net-Zero Industry Act — EUR-Lex',
      'PERTE Chip — Gobierno de España',
    ],
    funcionNormativa: 'Habilitante e industrial — asegura la base material y técnica del ecosistema digital europeo.',
    obligacionesActores: [
      { actor: 'fabricantes', intensidad: 'alta', obligaciones: ['Monitorizar cadena de suministro de semiconductores', 'Reportar alertas tempranas de escasez al Semiconductor Board', 'Cumplir requisitos de producción limpia', 'Informar sobre uso de materias primas críticas'] },
      { actor: 'pymes', intensidad: 'media', obligaciones: ['Acceder a financiación PERTE Chip e IPCEI', 'Certificar origen de materias primas críticas', 'Participar en clusters industriales y EDIHs'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Facilitar permisos para nuevas plantas de fabricación', 'Coordinar inventario nacional de materias primas', 'Participar en IPCEI de microelectrónica', 'Tramitar permisos de extracción con plazos acotados'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'dependencia', descripcion: 'Los programas de I+D y la IA dependen de la disponibilidad de semiconductores avanzados.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'La infraestructura de conectividad requiere componentes de la cadena de suministro regulada aquí.' },
    ],
    hitosProximos: ['Chips Act: evaluación Q1 2026', 'European Innovation Act: propuesta esperada 2026', 'Critical Raw Materials Act: objetivos 2030'],
    normas: [
      { nombre: 'Chips Act (Reg. 2023/1781/UE)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. PERTE Chip aprobado. España participa en IPCEI Microelectrónica 2.', plazo: 'Evaluación Q1 2026' },
      { nombre: 'Critical Raw Materials Act (Reg. 2024/1252/UE)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. España identificada como fuente clave de litio. Objetivos cuantitativos para 2030.', plazo: '—' },
      { nombre: 'Net-Zero Industry Act', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Integrado con PNIEC español.', plazo: '—' },
      { nombre: 'European Innovation Act', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta formal.', plazo: '—' },
    ]
  },
  {
    id: 3, nombre: 'Conectividad y Comunicaciones Electrónicas',
    subtitulo: 'Redes, espectro, neutralidad de red, itinerancia y derechos de los usuarios',
    descripcion: 'Telecomunicaciones, 5G/6G, espectro, roaming, neutralidad de red, banda ancha',
    color: '#6dc1b0', vigentes: 4, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 1,
    sintesisEjecutiva: 'El Código Europeo de Comunicaciones Electrónicas (Directiva 2018/1972/UE) armoniza el marco regulatorio de redes y servicios de comunicaciones electrónicas, incluidas las redes de nueva generación. Su lógica en el DSM es asegurar conectividad de calidad, competencia efectiva y cobertura universal como infraestructura sobre la que opera todo el ecosistema digital. Se complementa con el Reglamento de acceso a internet abierto (neutralidad de red) y con el marco de itinerancia.',
    explicacionMedia: 'El Código armoniza categorías de servicios —incluyendo las comunicaciones interpersonales independientes de numeración (OTT como WhatsApp o Teams), incorporadas en 2018—, regímenes de autorización, derechos de los usuarios y el papel de autoridades nacionales y del organismo de reguladores (BEREC). Se complementa con normas de itinerancia y el reglamento autónomo de acceso a internet abierto (neutralidad de red). Su lógica en el DSM es asegurar conectividad de calidad, competencia efectiva e innovación en redes.',
    explicacionCompleta: 'El alcance incluye operadores de redes públicas, proveedores de servicios de comunicaciones electrónicas y los servicios de comunicaciones interpersonales independientes de numeración (OTT), que el Código incorporó en 2018 con un régimen específico más ligero que los operadores tradicionales. Incluye obligaciones de transparencia, calidad, continuidad y reglas de espectro. Excluye contenidos audiovisuales y servicios de plataforma. La arquitectura normativa se basa en el Código transpuesto, el reglamento de itinerancia, el Reglamento de acceso a internet abierto como norma autónoma de neutralidad de red, y las directrices de BEREC.',
    impactoResumen: 'Los operadores de telecomunicaciones deben cumplir obligaciones de acceso, cobertura y calidad de servicio. Los servicios OTT de mensajería y videollamada tienen obligaciones específicas de seguridad y derechos de usuarios. La neutralidad de red protege contenidos legales y no permite discriminación de tráfico salvo excepciones tasadas.',
    estadoUEDetalle: 'La Directiva está transpuesta. El Reglamento de itinerancia (UE) 2022/612 prorrogó el régimen hasta 2032. El Reglamento de acceso a internet abierto está vigente. La BEREC emite directrices que orientan la interpretación y aplicación nacional. El marco es estable, con revisiones periódicas de análisis de mercado. El Digital Networks Act está en fase de propuesta.',
    transposicionDetalle: 'La Ley 11/2022, de 28 de junio, General de Telecomunicaciones transpone el Código y moderniza el régimen nacional. La CNMC ejerce la regulación sectorial, analiza mercados y supervisa. Retos actuales incluyen el despliegue de redes de muy alta capacidad en zonas rurales, la compartición de infraestructuras y la supervisión del cumplimiento de neutralidad de red por operadores. Los reglamentos restantes son de aplicación directa.',
    alcance: 'Operadores de redes, proveedores de servicios de comunicaciones electrónicas, comunicaciones interpersonales, espectro radioeléctrico, obligaciones de transparencia, calidad, continuidad e itinerancia.',
    conceptosClave: ['Autoridad nacional reguladora', 'Análisis de mercado', 'Obligaciones simétricas y asimétricas', 'Neutralidad de red', 'Servicio universal', 'Itinerancia', 'Espectro radioeléctrico'],
    arquitecturaNormativaUE: 'Código de comunicaciones electrónicas vigente y transpuesto, reglamento de itinerancia, reglamento BEREC y directrices del organismo de reguladores. Marco estable con revisiones periódicas.',
    clavesInterpretacion: [
      'Los servicios de comunicaciones interpersonales independientes de numeración —aplicaciones OTT de mensajería y videollamada— quedaron sujetos desde 2018 a obligaciones específicas de seguridad y derechos de usuarios, aunque con un régimen más ligero que los operadores tradicionales.',
      'La neutralidad de red protege contenidos legales y no permite discriminación basada en origen, destino o tipo de tráfico, salvo excepciones tasadas.',
      'Las obligaciones de acceso varían según la posición de mercado del operador, determinada por análisis periódicos de la CNMC.',
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
    sintesisEjecutiva: 'Este bloque integra la protección de datos personales y la economía del dato como pilares complementarios del DSM. El RGPD (Reglamento 2016/679) no es una norma sectorial: se aplica a cualquier responsable o encargado que trate datos de personas físicas identificables. La economía del dato se apoya en tres instrumentos con lógicas distintas: el Data Governance Act (intermediación y altruismo), el Data Act (acceso a datos de productos y conmutación en la nube) y la Directiva de Datos Abiertos (reutilización de datos públicos). La Directiva ePrivacy de 2002/58/CE sigue vigente; la propuesta de Reglamento ePrivacy lleva más de siete años bloqueada en el Consejo.',
    explicacionMedia: 'El RGPD no prohíbe el tratamiento de datos; regula sus condiciones bajo principios de licitud, minimización, exactitud, limitación de plazos, seguridad e integridad. El consentimiento no es la única ni la principal base de licitud: existen seis bases diferenciadas. La economía del dato crea confianza y remueve barreras para que los datos fluyan, respetando propiedad intelectual, secretos empresariales y protección de datos personales. El eje común es un estándar de garantías que habilite circulación de servicios e innovación responsable.',
    explicacionCompleta: 'El alcance comprende tratamiento de datos personales, transferencia internacional (incluido el Marco de Privacidad UE-EE.UU. de 2023, cuya estabilidad no está garantizada), seguridad, notificación de brechas y evaluación de impacto. La privacidad en comunicaciones electrónicas sigue regida por la Directiva ePrivacy de 2002, modificada en 2009; la propuesta de Reglamento que debía sustituirla no ha sido adoptada. En economía del dato, el DGA crea marcos de confianza para intermediación neutral y altruismo; el Data Act regula acceso a datos de productos conectados y conmutación en la nube; la Directiva de Datos Abiertos facilita reutilización de datos públicos con conjuntos de alto valor. Son instrumentos con lógicas distintas que no deben confundirse.',
    impactoResumen: 'Los responsables del tratamiento deben identificar una base de licitud válida para cada finalidad, mantener registro de actividades, aplicar medidas de seguridad proporcionales y notificar brechas en 72 horas. Los fabricantes de dispositivos conectados deben facilitar acceso a los datos generados (Data Act). Las administraciones deben compartir datos de alto valor en formato abierto. El acceso a datos de productos no es ilimitado: deben salvaguardarse secretos y seguridad.',
    estadoUEDetalle: 'El RGPD es vigente y de aplicación directa desde el 25 de mayo de 2018. La Directiva ePrivacy de 2002/58/CE sigue vigente; la propuesta de Reglamento ePrivacy lleva más de siete años bloqueada en el Consejo. El DGA es vigente desde septiembre de 2023. El Data Act es vigente desde enero de 2024 con obligaciones plenamente exigibles desde septiembre de 2025. La Directiva de Datos Abiertos está transpuesta. El Digital Omnibus propone simplificaciones aún no aprobadas.',
    transposicionDetalle: 'España implementa el RGPD a través de la LOPDGDD (LO 3/2018), que fija la edad de consentimiento en catorce años, desarrolla derechos digitales en el entorno laboral y regula el tratamiento por administraciones públicas. La AEPD actúa como autoridad de control y ha emitido guías sectoriales de referencia. Singularidades españolas relevantes incluyen el tratamiento de datos en el ámbito laboral, la videovigilancia y la protección de datos en el sector sanitario. Las transferencias internacionales a EE.UU. operan bajo el Marco de Privacidad UE-EE.UU. de 2023, con estabilidad no garantizada. La Open Data Directive fue transpuesta (RD 1024/2021). El portal datos.gob.es actúa como catálogo nacional.',
    alcance: 'Tratamiento de datos personales, transferencia internacional, privacidad en comunicaciones, gobernanza de datos industriales, intermediación neutral, altruismo de datos, acceso a datos de productos conectados, portabilidad, conmutación en la nube y reutilización de datos públicos de alto valor.',
    conceptosClave: ['Minimización', 'Bases jurídicas de tratamiento', 'Responsabilidad proactiva', 'Seudonimización', 'Intermediación neutral', 'Conmutación sin obstáculos', 'Conjuntos de alto valor', 'Acceso B2B y B2C a datos de productos', 'Privacidad por diseño y por defecto'],
    arquitecturaNormativaUE: 'El RGPD es el eje horizontal plenamente vigente, complementado por la directiva de cooperación policial y el marco de ePrivacy en revisión. El Data Governance Act y el Data Act crean la infraestructura de gobernanza e intercambio de datos. Actos de ejecución, guías del Comité Europeo de Protección de Datos y códigos de conducta orientan la práctica.',
    clavesInterpretacion: [
      'El consentimiento no es la única ni la principal base de licitud; elegirla cuando otra es más apropiada crea problemas de cumplimiento.',
      'La seudonimización no elimina el carácter personal de los datos. La anonimización efectiva exige irreversibilidad práctica, no solo técnica.',
      'La Directiva ePrivacy sigue vigente; no debe confundirse con el Reglamento ePrivacy propuesto, que no ha sido adoptado.',
      'El Data Act no crea un derecho de propiedad sobre los datos: crea derechos de acceso y portabilidad para usuarios de productos conectados.',
      'El DGA no obliga a compartir datos: crea estructuras de confianza para quien quiera compartirlos de forma organizada.',
      'La conmutación entre proveedores de nube no es instantánea: el Data Act establece plazos y condiciones para reducir barreras de forma progresiva.',
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
    sintesisEjecutiva: 'La Directiva (UE) 2019/790 de derechos de autor en el mercado único digital moderniza el marco de propiedad intelectual para el entorno en línea, equilibrando los intereses de titulares de derechos, usuarios y plataformas. Sus dos ejes son: excepciones armonizadas y obligatorias para minería de textos y datos, educación, conservación del patrimonio y noticias; y un régimen específico para servicios de intercambio de contenidos en línea (art. 17).',
    explicacionMedia: 'La excepción de minería de textos y datos del artículo 4 permite su uso para cualquier finalidad, incluida la investigación y el desarrollo comercial, salvo que los titulares se hayan reservado expresamente ese derecho mediante opt-out. Esta excepción es central para la IA generativa. El régimen del artículo 17 desplaza el debate de la exención de responsabilidad a la responsabilidad compartida condicionada a esfuerzos de licencia. La portabilidad de contenidos permite acceder a servicios abonados en desplazamientos temporales.',
    explicacionCompleta: 'El alcance cubre uso de obras por plataformas, licencias y mecanismos de retirada, excepciones obligatorias (minería de textos y datos, ilustración educativa, conservación del patrimonio), el derecho afín de editores de prensa y acceso transfronterizo a contenidos. La excepción de minería del artículo 4 permite uso para cualquier finalidad salvo opt-out expreso del titular, lo que es especialmente relevante para IA generativa. El régimen del art. 17 no convierte a las plataformas en responsables automáticos: les exige esfuerzos de licencia y medidas proporcionales con garantías para usuarios. El TJUE ha validado el régimen con condiciones para proteger usos legítimos.',
    impactoResumen: 'Las plataformas de intercambio de contenidos deben realizar esfuerzos de licencia y aplicar medidas proporcionales (art. 17). Los editores de prensa tienen un nuevo derecho afín negociable. La minería de textos y datos con opt-out por parte del titular es un mecanismo que deben implementar activamente quienes no quieran que sus obras sean usadas para entrenamiento de IA.',
    estadoUEDetalle: 'La Directiva está transpuesta en todos los Estados miembros y plenamente vigente. La excepción de minería de datos del artículo 4 está siendo objeto de análisis e interpretación práctica en el contexto de IA generativa. La Community Design Directive está pendiente de transposición.',
    transposicionDetalle: 'El Real Decreto-ley 24/2021 transpuso la Directiva 2019/790 y la Directiva 2019/789. La SGAE y otras entidades de gestión colectiva operan en el marco revisado. La interacción entre el art. 17 y la libertad de expresión fue objeto de análisis por el TJUE, que validó el régimen con condiciones. La Community Design Directive requerirá modificar la Ley 20/2003.',
    alcance: 'Uso de obras por plataformas, licencias y mecanismos de retirada, excepciones para minería de textos y datos, derecho afín de editores de prensa, portabilidad transfronteriza de contenidos y diseño industrial.',
    conceptosClave: ['Comunicación pública', 'Carga de contenidos', 'Acuerdos de licencia', 'Portabilidad de contenidos', 'Excepciones de minería de textos y datos', 'Derecho afín de editores'],
    arquitecturaNormativaUE: 'Directiva de derechos de autor en el mercado único digital (2019), directiva de retransmisiones en línea y distribución por cable, y reglamento de portabilidad transfronteriza de contenidos.',
    clavesInterpretacion: [
      'El régimen del art. 17 no convierte a las plataformas en responsables automáticos: les exige esfuerzos de licencia y medidas proporcionales con garantías para usos legítimos.',
      'La minería de textos y datos con opt-out (art. 4) permite uso para cualquier finalidad salvo reserva expresa del titular; los titulares que no implementen opt-out activamente no pueden impedir el uso para entrenamiento de IA.',
      'El derecho afín de editores es un derecho negociable, no una tasa automática.',
      'La excepción de minería del art. 3 (investigación científica sin fines comerciales) no requiere opt-out y es de aplicación obligatoria.',
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
    sintesisEjecutiva: 'La arquitectura de ciberseguridad europea combina tres instrumentos complementarios de distinto alcance. La Directiva NIS2 (2022/2555/UE) eleva la línea base de seguridad para entidades esenciales e importantes en sectores críticos. El Reglamento de Resiliencia Cibernética (CRA, 2024/2847/UE) introduce requisitos de seguridad por diseño para productos con elementos digitales. La Directiva de Resiliencia de Entidades Críticas (CER) aborda la resiliencia física y operativa de infraestructuras críticas. DORA, tratado en el bloque de servicios financieros, es la lex specialis para el sector financiero.',
    explicacionMedia: 'NIS2 amplía significativamente el alcance respecto a NIS1: incorpora sectores nuevos y elimina el margen de apreciación nacional sobre qué entidades son esenciales. Distingue entre entidades esenciales e importantes con obligaciones diferenciadas. El CRA se aplica a productos, no a servicios. La gestión de riesgos de la cadena de suministro es una obligación sustantiva, no un objetivo de buenas prácticas. La lógica del DSM es elevar de forma armonizada la línea base de seguridad, reforzando confianza y continuidad.',
    explicacionCompleta: 'El alcance incluye obligaciones de gobernanza de riesgos, controles técnicos y organizativos, notificación de incidentes con plazos precisos (alerta temprana 24 horas, notificación inicial 72 horas, informe final un mes), gestión de la cadena de suministro como obligación sustantiva, requisitos de seguridad por diseño para productos con elementos digitales (CRA) y certificación. Los fabricantes deben garantizar seguridad por diseño, gestionar vulnerabilidades durante el ciclo de vida esperado y ofrecer actualizaciones de seguridad de forma gratuita durante al menos cinco años. ENISA impulsa esquemas de certificación y coordinación.',
    impactoResumen: 'Las entidades esenciales e importantes deben implantar medidas de gestión de riesgos de ciberseguridad, incluyendo la cadena de suministro, y notificar incidentes significativos en plazos de 24 horas (alerta temprana), 72 horas (notificación inicial) y un mes (informe final). Los fabricantes de productos con elementos digitales deben garantizar seguridad por diseño y actualizaciones gratuitas durante al menos cinco años.',
    estadoUEDetalle: 'NIS2 debía transponerse antes del 17 de octubre de 2024; varios Estados miembros, incluida España, han incumplido el plazo. El CRA es vigente desde diciembre de 2024, con periodos transitorios escalonados hasta 2027 para distintos tipos de productos. La Directiva CER fue transpuesta con plazo de octubre de 2024. DORA se aplica desde enero 2025.',
    transposicionDetalle: 'El Real Decreto-ley 7/2022 incorporó parcialmente aspectos de ciberseguridad; la transposición completa de NIS2 ha requerido normativa adicional, con el anteproyecto aprobado en enero 2025 en tramitación parlamentaria. El CCN-CERT atiende al sector público y el INCIBE-CERT al sector privado y ciudadanos. El DSN coordina la respuesta a incidentes de ámbito nacional. La designación de autoridades sectoriales competentes bajo NIS2 y la implantación del registro de entidades esenciales e importantes son procesos en curso.',
    alcance: 'Gobernanza de riesgos, controles técnicos y organizativos, notificación de incidentes, gestión de cadena de suministro, requisitos de seguridad para hardware y software, certificación, cooperación operativa y resiliencia de entidades críticas.',
    conceptosClave: ['Operador esencial e importante', 'Evaluación de conformidad', 'Vulnerabilidades explotables', 'Seguridad desde el diseño', 'Cadena de suministro', 'Notificación de incidentes', 'Resiliencia operativa digital (DORA)', 'Certificación de ciberseguridad'],
    arquitecturaNormativaUE: 'NIS2 (directiva con transposición en marcha), Directiva de Resiliencia de Entidades Críticas, CRA (reglamento con periodos transitorios), DORA (reglamento vigente para sector financiero), Cybersecurity Act (certificación) y Cyber Solidarity Act. ENISA coordina.',
    clavesInterpretacion: [
      'NIS2 amplía significativamente el alcance respecto a NIS1: incorpora sectores nuevos y elimina el margen de apreciación nacional sobre qué entidades son esenciales.',
      'La gestión de riesgos de la cadena de suministro es una obligación sustantiva, no un objetivo de buenas prácticas.',
      'El CRA se aplica a productos, no a servicios: los servicios digitales tienen su marco en NIS2 y en el DSA.',
      'Los informes de incidentes tienen umbrales y tiempos precisos: 24h alerta temprana, 72h notificación inicial, 1 mes informe final.',
      'DORA es lex specialis de NIS2 para el sector financiero: las entidades financieras no quedan exentas de NIS2, pero DORA especializa el régimen.',
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
    subtitulo: 'Marco común de identificación electrónica, carteras EUDI y servicios de confianza cualificados',
    descripcion: 'eIDAS 2, Reglamento (UE) 2024/1183, cartera EUDI, firma electrónica cualificada, servicios de confianza, Ley 6/2020',
    color: '#1e3a5f', vigentes: 3, enProceso: 0, planificadas: 0, enRevision: 0, reglamentos: 2, directivas: 0,
    sintesisEjecutiva: 'Este bloque articula la arquitectura de confianza digital en la UE. El Reglamento (UE) 2024/1183 (eIDAS 2) reconfigura el marco de identificación electrónica y amplía el régimen de servicios de confianza para cimentar transacciones seguras entre ciudadanos, empresas y administraciones. Su pieza central es la Cartera Europea de Identidad Digital (EUDI), interoperable y bajo control del usuario, que habilita identificación, presentación de atributos y firma o sello electrónicos cualificados. En España, la Ley 6/2020 complementa eIDAS y otorga efectos probatorios reforzados a los servicios cualificados; la LEC 326.4 establece presunción y traslada la carga de la prueba a quien impugna.',
    explicacionMedia: 'El Reglamento (UE) 2024/1183 obliga a ofrecer una cartera EUDI interoperable y segura bajo control del usuario, y amplía los servicios de confianza. Las administraciones deberán aceptar la cartera para sus servicios en línea y ciertos proveedores privados y plataformas de muy gran tamaño deberán facilitar su uso para autenticación a demanda del usuario en plazos reglados. España complementa el marco con la Ley 6/2020 y la presunción probatoria del art. 326.4 LEC; los despliegues técnicos avanzan con pilotos y adaptación de infraestructuras nacionales.',
    explicacionCompleta: 'El sistema de confianza digital integra identificación electrónica notificada, carteras EUDI y servicios de confianza. eIDAS 2 está en vigor; los actos de ejecución de noviembre de 2024 activan plazos de 24 meses para disponibilizar al menos una cartera por Estado y de 36 meses para la aceptación obligatoria por partes privadas sujetas a autenticación reforzada y por plataformas de muy gran tamaño a petición del usuario. La cartera EUDI permite identificación, presentación selectiva de atributos y creación de firmas cualificadas gratuitas para uso no profesional, con código abierto en componentes esenciales, certificación y seguridad por diseño. Se añaden servicios cualificados de archivo electrónico, libros mayores electrónicos y declaraciones cualificadas de atributos; se exige cotejo electrónico de atributos públicos prioritarios. España, mediante la Ley 6/2020, fija vigencia y revocación de certificados, obligaciones de prestadores, supervisión, listas de confianza y un régimen sancionador, y consolida la inversión de la carga de la prueba para documentos sustentados en servicios cualificados (LEC 326.4). La coordinación con RGPD, DSA y DMA es estrecha.',
    impactoResumen: 'Los Estados miembros deben proporcionar al menos una cartera EUDI en 24 meses desde los actos de ejecución. Las administraciones deberán aceptarla para el acceso a servicios en línea. Partes privadas sujetas a autenticación reforzada y plataformas de muy gran tamaño deberán facilitar su uso en 36 meses. En España, la Ley 6/2020 y el art. 326.4 LEC consolidan la fuerza probatoria de los servicios cualificados.',
    estadoUEDetalle: 'El Reglamento (UE) 2024/1183 (eIDAS 2) está en vigor desde el 20 de mayo de 2024. Los actos de ejecución clave se adoptaron el 21 de noviembre de 2024. Cada Estado miembro deberá ofrecer al menos una cartera EUDI en los 24 meses siguientes a dichos actos, lo que sitúa la disponibilidad obligatoria antes de finalizar 2026. La aceptación por determinadas partes privadas sujetas a autenticación reforzada y por plataformas en línea de muy gran tamaño será exigible, a petición del usuario, a más tardar 36 meses tras los actos de ejecución, hacia finales de 2027. La implantación técnica y la certificación se escalonan con hitos adicionales en 2025.',
    transposicionDetalle: 'España aplica directamente eIDAS y ha completado el encaje nacional mediante la Ley 6/2020, que regula aspectos no armonizados: vigencia y revocación de certificados, identidad y atributos en certificados cualificados, obligaciones y responsabilidad de prestadores, supervisión y régimen sancionador. La Ley 6/2020 modificó la LEC para introducir el art. 326.4: si se emplea un servicio cualificado, se presume la corrección del servicio y la característica cuestionada del documento; quien impugna asume la carga probatoria. La infraestructura nacional (DNIe, Cl@ve, @firma) se está alineando con EUDI, con participación activa en pilotos como DC4EU y adaptación progresiva a especificaciones y esquemas de certificación. El Ministerio competente supervisa y mantiene la lista de prestadores cualificados.',
    alcance: 'Sistemas de identificación electrónica notificados, carteras EUDI, y servicios de confianza cualificados y no cualificados: firma y sello electrónicos, sellos de tiempo, entrega electrónica certificada, autenticación de sitios web, validación y conservación de firmas/sellos, archivo electrónico, libros mayores electrónicos y declaraciones electrónicas de atributos. Quedan fuera los instrumentos de cooperación judicial/penal (e-Evidence, PNR, Europol), que no forman parte del sistema de confianza digital.',
    conceptosClave: ['Cartera EUDI', 'Prestador cualificado de confianza', 'Niveles de garantía', 'Atributos verificados', 'Firma electrónica cualificada', 'Art. 326.4 LEC', 'Minimización y no vinculación', 'Seguridad por diseño'],
    arquitecturaNormativaUE: 'El eje es el Reglamento eIDAS de 2014, modificado por el Reglamento (UE) 2024/1183 que establece el marco de la identidad digital europea y amplía el catálogo de servicios de confianza. Los actos de ejecución adoptados en noviembre de 2024 precisan especificaciones técnicas y procedimientos para carteras, certificación, validación y atributos. El marco se coordina con RGPD, con el DSA para la aceptación por plataformas de muy gran tamaño y con el DMA para asegurar acceso e interoperabilidad con funcionalidades de sistema operativo y hardware.',
    clavesInterpretacion: [
      'La cartera EUDI es voluntaria para el usuario; la aceptación puede ser obligatoria para administraciones y, bajo condiciones, para ciertos servicios privados y plataformas, pero siempre a petición del usuario y con estricta minimización de datos.',
      'No debe confundirse aplicación directa del Reglamento con implementación técnica: la exigibilidad jurídica coexiste con fases de certificación y adaptación.',
      'En España, la Ley 6/2020 no transpone el Reglamento, lo complementa; eIDAS 2 es aplicable directamente.',
      'La ventaja probatoria de los servicios cualificados alcanza a todo servicio cualificado, no solo a la firma, mediante la presunción del art. 326.4 LEC.',
      'Materias de cooperación penal (e-Evidence, PNR, Europol) no pertenecen a este bloque y deben tratarse en su área específica.',
    ],
    alertasRigor: [
      'Los estándares técnicos y esquemas de certificación de la cartera EUDI están en desarrollo; su disponibilidad condicionará la implementación efectiva más allá de la exigibilidad jurídica.',
      'La obligatoriedad de aceptación de carteras tiene fases diferenciadas: 24 meses para administraciones y 36 meses para partes privadas sujetas a autenticación reforzada y plataformas de muy gran tamaño, siempre a petición del usuario.',
    ],
    recursosReferencia: [
      'Reglamento (UE) 2024/1183 (eIDAS 2) — EUR-Lex',
      'Actos de ejecución de 21 de noviembre de 2024 — EUR-Lex',
      'Ley 6/2020 y art. 326.4 LEC — BOE',
      'Cl@ve, DNIe y @firma — Gobierno de España',
      'Pilotos DC4EU y cartera EUDI — Comisión Europea',
    ],
    funcionNormativa: 'Habilitante e infraestructural — arquitectura de confianza para transacciones seguras',
    buildingBlocks: ['eID / EUDI Wallet', 'eSignature'],
    obligacionesActores: [
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Proporcionar al menos una cartera EUDI conforme al marco técnico y de certificación', 'Aceptar carteras EUDI para acceso a servicios en línea que requieran identificación', 'Asegurar cotejo electrónico de atributos públicos prioritarios en 24 meses', 'Designar puntos de contacto y gobernanza EUDI'] },
      { actor: 'proveedores', intensidad: 'alta', obligaciones: ['Certificar conformidad de carteras y publicar componentes de código abierto esenciales', 'Garantizar seguridad por diseño y control exclusivo del usuario', 'Ofrecer firmas cualificadas gratuitas para uso no profesional', 'Cumplir requisitos reforzados de seguridad, evaluación de conformidad y responsabilidad'] },
      { actor: 'plataformas', intensidad: 'media', obligaciones: ['Facilitar el uso de EUDI para autenticación a solicitud del usuario (plataformas de muy gran tamaño)', 'Registrarse como partes usuarias cuando proceda', 'Aceptar carteras EUDI en sectores sujetos a autenticación reforzada en plazo de 36 meses'] },
      { actor: 'financieras', intensidad: 'media', obligaciones: ['Aceptar EUDI como medio de autenticación compatible con autenticación reforzada', 'Cumplir garantías económicas y obligaciones de conservación e información (Ley 6/2020 en España)'] },
    ],
    dependencias: [
      { areaId: 1, tipo: 'complementariedad', descripcion: 'La cartera EUDI y las declaraciones de atributos operan bajo el RGPD, con control granular del usuario y principios de minimización y no vinculación.' },
      { areaId: 2, tipo: 'complementariedad', descripcion: 'Las plataformas de muy gran tamaño (DSA) deben aceptar EUDI para autenticación a demanda del usuario.' },
      { areaId: 3, tipo: 'complementariedad', descripcion: 'eIDAS 2 prevé acceso e interoperabilidad con características de sistema operativo y hardware por parte de proveedores de carteras, coherente con el DMA.' },
      { areaId: 12, tipo: 'complementariedad', descripcion: 'EUDI y declaraciones de atributos se integran en ventanillas únicas y procedimientos transfronterizos del sector público digital.' },
      { areaId: 9, tipo: 'complementariedad', descripcion: 'La aceptación de EUDI como medio de autenticación encaja con exigencias de autenticación reforzada en servicios financieros y pagos.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'Los esquemas de certificación de ciberseguridad sustentan la certificación de carteras y componentes críticos.' },
    ],
    hitosProximos: [
      'Noviembre 2026: disponibilidad obligatoria de al menos una cartera EUDI por Estado miembro (24 meses desde actos de ejecución)',
      'Noviembre 2027: aceptación obligatoria por partes privadas sujetas a autenticación reforzada y plataformas de muy gran tamaño (36 meses)',
      '2025: adopción de actos de ejecución adicionales para verificación de identidad, validación de firmas y servicios de archivo',
      'En curso: alineación de DNIe, Cl@ve y @firma con especificaciones EUDI y pilotos DC4EU',
    ],
    normas: [
      { nombre: 'Reglamento eIDAS (910/2014)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Marco base de identificación electrónica y servicios de confianza, complementado en España por la Ley 6/2020.', plazo: 'Vigente' },
      { nombre: 'Reglamento (UE) 2024/1183 (eIDAS 2)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 20.05.2024. Introduce la cartera EUDI y amplía servicios de confianza. Actos de ejecución adoptados 21.11.2024.', plazo: 'Nov 2026 (cartera)' },
      { nombre: 'Ley 6/2020 (complemento nacional)', tipo: 'Reglamento', estadoES: 'transpuesta', transposicionES: 'Complemento nacional de eIDAS. Regula certificados, prestadores, supervisión, régimen sancionador y efectos probatorios (art. 326.4 LEC).', plazo: 'Vigente' },
    ]
  },
  {
    id: 8, nombre: 'Servicios Digitales y Confianza en Plataformas',
    subtitulo: 'Diligencia debida, transparencia, gestión de riesgos sistémicos y moderación responsable',
    descripcion: 'DSA, moderación de contenidos, contenidos terroristas, dark patterns, Digital Fairness Act',
    color: '#c2410c', vigentes: 3, enProceso: 0, planificadas: 1, enRevision: 0, reglamentos: 3, directivas: 0,
    sintesisEjecutiva: 'El Reglamento (UE) 2022/2065 (DSA) establece un marco horizontal de responsabilidades para los intermediarios digitales en la Unión. Su objeto no es regular los contenidos como tal, sino definir las condiciones bajo las cuales los intermediarios quedan exentos de responsabilidad por contenidos de terceros y las obligaciones de diligencia que deben cumplir para mantener esa exención. El DSA no es un régimen de censura: es un régimen de diligencia verificable.',
    explicacionMedia: 'El DSA establece un régimen escalonado por tamaño y función del proveedor: intermediarios en general desde febrero de 2024; plataformas de muy gran tamaño (VLOP) y motores de búsqueda de muy gran tamaño (VLOSE) desde agosto de 2023 con obligaciones reforzadas de evaluación de riesgos sistémicos, auditorías independientes e informes de transparencia. La lógica en el DSM es garantizar un mercado de servicios digitales responsable, predecible y supervisado a escala europea, sin sustituir la libertad de expresión.',
    explicacionCompleta: 'El alcance incluye servicios de intermediación, alojamiento y plataformas en línea, obligaciones de diligencia, transparencia publicitaria, mecanismos de denuncia y recurso, y requisitos reforzados para VLOP y VLOSE. La exención de responsabilidad por contenidos de terceros no opera si el intermediario tiene conocimiento efectivo de ilicitud y no actúa con diligencia. Las VLOP y VLOSE añaden evaluación y mitigación de riesgos sistémicos, auditorías independientes anuales, repositorios de anuncios y acceso a datos para investigadores acreditados. El principio de país de origen tiene excepciones importantes para servicios a consumidores.',
    impactoResumen: 'Las plataformas online deben implementar mecanismos de notificación y actuación, transparencia en publicidad y sistemas de reclamación. Las VLOP tienen obligaciones reforzadas de evaluación de riesgos sistémicos, auditorías independientes e informes de transparencia. La exención de responsabilidad no cubre la falta de diligencia debida. La publicidad basada en datos sensibles tiene restricciones específicas y está prohibida para menores.',
    estadoUEDetalle: 'El DSA se aplica plenamente desde febrero 2024 para todos los intermediarios. Las obligaciones para VLOP y VLOSE son aplicables desde agosto 2023. Los actos de ejecución sobre metodología de auditoría, acceso a datos para investigadores y sistemas de recomendación están en desarrollo o consolidación. El Reglamento de contenidos terroristas se aplica desde junio 2022.',
    transposicionDetalle: 'Los reglamentos vigentes son de aplicación directa. La Secretaría de Estado de Digitalización e Inteligencia Artificial ejerce funciones de Coordinador de Servicios Digitales para el DSA. La coexistencia con organismos sectoriales (CNMC, AEPD) requiere coordinación. La Audiencia Nacional gestiona las órdenes de contenidos terroristas. Los canales de notificación para usuarios y empresas están operativos aunque con margen de mejora en visibilidad.',
    alcance: 'Servicios de intermediación, alojamiento y plataformas en línea, diligencia debida, transparencia publicitaria, mecanismos de denuncia, riesgos sistémicos, contenidos terroristas y publicidad política.',
    conceptosClave: ['Exención de responsabilidad condicionada', 'Principio de país de origen', 'Riesgos sistémicos', 'Trazabilidad de comerciantes', 'Publicidad basada en perfiles', 'Diligencia debida digital', 'Coordinador de servicios digitales'],
    arquitecturaNormativaUE: 'Reglamento de servicios digitales (DSA) como núcleo horizontal, complementado por normativa de retirada de contenidos terroristas y reglamento de publicidad política. Guías y códigos de buenas prácticas completan la práctica institucional.',
    clavesInterpretacion: [
      'La exención de responsabilidad por contenidos de terceros no opera si el intermediario tiene conocimiento efectivo de ilicitud y no actúa con diligencia.',
      'La moderación de contenidos no es una obligación general del DSA: la obligación es tener mecanismos eficaces de notificación y retirada. No debe confundirse moderación con censura ni exención con impunidad.',
      'La publicidad basada en perfiles tiene restricciones específicas y prohibiciones para menores; la publicidad basada en datos sensibles está prohibida.',
      'El principio de país de origen —que el proveedor se rige por el derecho de su Estado miembro de establecimiento— tiene excepciones importantes para servicios a consumidores.',
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
    buildingBlocks: ['eDelivery'],
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
    sintesisEjecutiva: 'El marco de consumo digital combina la Directiva de contratos de suministro de contenidos y servicios digitales (2019/770/UE) y la Directiva de contratos de compraventa de bienes con elementos digitales (2019/771/UE), junto con la Directiva Omnibus (2019/2161/UE). La novedad central es que las actualizaciones de software son parte de la conformidad del producto o servicio: el proveedor debe garantizarlas durante el periodo razonable que el consumidor pueda esperar.',
    explicacionMedia: 'Las directivas de 2019 establecen dos regímenes de conformidad distintos: uno para contenidos y servicios digitales (incluidos los prestados a cambio de datos personales) y otro para bienes con elementos digitales. La Directiva Omnibus moderniza la aplicación de normas de consumo en entornos en línea. La Product Liability Directive extiende expresamente la responsabilidad a software e IA. Su lógica en el DSM es dar seguridad jurídica y equilibrio entre innovación comercial y derechos del consumidor digital.',
    explicacionCompleta: 'El alcance incluye contratos para contenidos y servicios digitales (Directiva 2019/770/UE), garantías en bienes con elementos digitales (Directiva 2019/771/UE), información precontractual, desistimiento, prácticas desleales y transparencia en marketplaces. Los servicios digitales prestados a cambio de datos personales —no de precio monetario— están cubiertos por la Directiva 2019/770/UE: la gratuidad aparente no excluye la protección del consumidor. La conformidad exige actualizaciones de seguridad durante el periodo de uso esperado, incluso después del fin del plazo de garantía formal. La responsabilidad por producto se extiende a software e IA. La Directiva de acción representativa (2020/1828/UE) completa el marco con un mecanismo armonizado transfronterizo.',
    impactoResumen: 'Los proveedores deben garantizar actualizaciones de seguridad como parte de la conformidad, no como cortesía. Los fabricantes de productos con elementos digitales responden de la conformidad incluyendo actualizaciones. La responsabilidad por producto se extiende expresamente a software e IA. La Right to Repair Directive refuerza el derecho a reparación con obligación de piezas de repuesto.',
    estadoUEDetalle: 'Las directivas de contenidos digitales, ventas de bienes y Omnibus están transpuestas y vigentes. La Product Liability Directive y la Right to Repair Directive están pendientes de transposición con plazos en 2026. El General Product Safety Regulation se aplica desde diciembre 2024.',
    transposicionDetalle: 'El Real Decreto Legislativo 1/2007, texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU), fue modificado mediante RDL 7/2021 para incorporar las directivas de 2019. Las autoridades de consumo de las comunidades autónomas tienen competencias de supervisión e inspección. La interacción entre normativa estatal y autonómica puede generar divergencias interpretativas. La Product Liability Directive y la Right to Repair Directive requerirán modificar el TRLGDCU.',
    alcance: 'Contratos de contenidos y servicios digitales, garantías de bienes con elementos digitales, conformidad, actualización, prácticas comerciales desleales, transparencia en marketplaces, responsabilidad civil por producto defectuoso (incluyendo software e IA) y derecho a reparación.',
    conceptosClave: ['Conformidad digital', 'Actualizaciones de seguridad', 'Remedios', 'Reseñas verificadas', 'Personalización de precios', 'Responsabilidad objetiva', 'Derecho a reparación', 'Geo-blocking'],
    arquitecturaNormativaUE: 'Directivas de contenidos digitales, ventas de bienes y Omnibus como base transpuesta. Product Liability Directive y Right to Repair Directive pendientes. Reglamento de Geo-blocking y General Product Safety Regulation en aplicación directa. Cooperación reforzada entre autoridades de consumo.',
    clavesInterpretacion: [
      'Los servicios digitales prestados a cambio de datos personales —no de precio monetario— están cubiertos por la Directiva 2019/770/UE: la gratuidad aparente no excluye la protección del consumidor.',
      'La conformidad de los bienes con elementos digitales exige actualizaciones de seguridad durante el periodo de uso esperado, incluso después del fin del plazo de garantía formal.',
      'La responsabilidad por producto se extiende expresamente a software e IA: el concepto de "producto" evoluciona con la Product Liability Directive.',
      'El derecho a reparación no elimina la garantía legal, sino que la complementa; la prioridad de reparación sobre sustitución es una novedad relevante.',
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
    sintesisEjecutiva: 'El Reglamento (UE) 2022/1925 (DMA) establece un régimen ex ante de obligaciones y prohibiciones para las plataformas digitales de mayor escala designadas como "gatekeepers". Su lógica es distinta al derecho de la competencia: no evalúa conductas caso por caso ni exige demostrar un efecto anticompetitivo; impone directamente comportamientos prohibidos y obligaciones de hacer para garantizar la contestabilidad y equidad de los mercados digitales.',
    explicacionMedia: 'El DMA opera ex ante con obligaciones predefinidas para gatekeepers designados, mientras el derecho de la competencia actúa ex post caso por caso. La Comisión ha designado como gatekeepers a Alphabet, Amazon, Apple, ByteDance, Meta y Microsoft para sus servicios de plataforma central respectivos. Las obligaciones abarcan interoperabilidad, no auto-preferencia, datos combinados y acceso a tiendas de aplicaciones. La CNMC actúa como autoridad nacional coordinada.',
    explicacionCompleta: 'El alcance cubre servicios de plataforma central prestados por empresas que alcanzan umbrales cualitativos y cuantitativos de designación como gatekeeper. Las obligaciones incluyen no auto-preferencia, apertura de ecosistemas, interoperabilidad de mensajería (con requisitos técnicos y de seguridad que condicionan su alcance práctico) y transparencia comercial. No incluye la valoración caso por caso de conductas anticompetitivas, que permanece en el derecho de la competencia. Los mecanismos de investigación de mercado permiten ampliar designaciones o actualizar obligaciones. Investigaciones de incumplimiento están en curso para varios operadores.',
    impactoResumen: 'Los gatekeepers designados deben cumplir obligaciones de interoperabilidad, acceso a datos y no auto-preferencia. Las pymes y desarrolladores son beneficiarios directos. Un operador puede ser dominante en sentido del derecho de la competencia sin ser gatekeeper del DMA, y viceversa en casos límite. La interoperabilidad de mensajería tiene límites técnicos y de seguridad.',
    estadoUEDetalle: 'El DMA es vigente y de aplicación directa. Seis empresas han sido designadas como gatekeepers. Las obligaciones de cumplimiento son exigibles. Investigaciones de incumplimiento están en curso. Los mecanismos de investigación de mercado permiten ampliar designaciones. La Platform Work Directive debe ser transpuesta antes de diciembre 2026.',
    transposicionDetalle: 'El DMA es de aplicación directa y la Comisión ejerce supervisión exclusiva sobre gatekeepers. La CNMC actúa como autoridad nacional de competencia coordinada, puede iniciar investigaciones sobre conductas no cubiertas por el DMA y remitir información a la Comisión. La Platform Work Directive tiene transposición parcial a través de la Ley Rider (RDL 9/2021), pero la Directiva UE es más amplia y requerirá ampliación normativa antes de diciembre 2026.',
    alcance: 'Servicios de plataforma central de gatekeepers, obligaciones ex ante de interoperabilidad y no auto-preferencia, condiciones laborales en plataformas, subvenciones foráneas en el mercado interior y crowdfunding.',
    conceptosClave: ['Gatekeeper', 'Servicios de plataforma central', 'Remedios ex ante', 'Contestabilidad', 'Auto-preferencia', 'Interoperabilidad de mensajería', 'Presunción de laboralidad'],
    arquitecturaNormativaUE: 'Reglamento de mercados digitales (DMA) vigente, complementado por directrices, formularios y actos de ejecución. Reglamento de Subvenciones Foráneas. Platform Work Directive pendiente de transposición. La Comisión centraliza la supervisión de gatekeepers.',
    clavesInterpretacion: [
      'El DMA no prohíbe ser grande o dominante: prohíbe conductas específicas a quienes alcancen los umbrales de gatekeeper.',
      'Un operador puede ser dominante en sentido del derecho de la competencia sin ser gatekeeper del DMA, y viceversa en casos límite. Los dos regímenes son complementarios, no sustitutivos.',
      'La interoperabilidad de mensajería tiene requisitos técnicos y de seguridad que condicionan su alcance práctico.',
      'La designación como gatekeeper depende de umbrales cuantitativos y cualitativos y puede ampliarse mediante investigaciones de mercado.',
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
    sintesisEjecutiva: 'Este bloque regula el sector audiovisual y protege la libertad e independencia de los medios de comunicación en el entorno digital. La Directiva de Servicios de Comunicación Audiovisual (AVMS, Directiva 2018/1808/UE) establece cuotas de contenido europeo en plataformas VOD, regula la publicidad audiovisual y protege a menores. El European Media Freedom Act (EMFA, Reglamento 2024/1083/UE) garantiza la independencia editorial y el pluralismo mediático frente a interferencias políticas y comerciales.',
    explicacionMedia: 'El sector audiovisual europeo combina regulación de contenidos, protección de menores, cuotas de obra europea y garantías de pluralismo. La Directiva AVMS se aplica a servicios lineales, a demanda y a plataformas de intercambio de vídeos, con obligaciones diferenciadas por tipo de servicio. El EMFA refuerza la independencia editorial frente a interferencias, crea un Consejo Europeo de Servicios de Medios de Comunicación (EBMS) y establece garantías para periodistas. La revisión prevista de la AVMS abordará contenidos generados por IA, deepfakes y algoritmos de recomendación.',
    explicacionCompleta: 'El alcance incluye servicios de comunicación audiovisual lineales y a demanda, plataformas de intercambio de vídeos (que comparten obligaciones con el DSA), publicidad audiovisual, protección de menores, pluralismo mediático e independencia editorial. La Directiva AVMS impone una cuota mínima del 30% de obras europeas en los catálogos de plataformas de vídeo bajo demanda, con prominencia en la oferta. El EMFA es un reglamento de aplicación directa que crea el EBMS como órgano consultivo y de coordinación, y establece garantías específicas para periodistas, incluyendo protección de fuentes. La interacción con el DSA es relevante: las plataformas de intercambio de vídeos están sujetas tanto a la AVMS como al DSA en aspectos complementarios. La Copyright Directive tiene impacto directo en medios a través del derecho afín de editores de prensa (art. 15).',
    impactoResumen: 'Las plataformas de vídeo bajo demanda deben ofrecer al menos un 30% de contenido europeo en su catálogo, con prominencia. Los medios de comunicación tienen garantías de independencia editorial bajo el EMFA. Los Estados miembros deben garantizar pluralismo e independencia de sus autoridades reguladoras audiovisuales. La protección de menores en plataformas de vídeo es una obligación verificable, no una mera recomendación.',
    estadoUEDetalle: 'La Directiva AVMS revisada en 2018 está transpuesta y vigente. El EMFA es vigente y de aplicación directa, con obligaciones que se aplican progresivamente desde agosto de 2025. El EBMS está en fase de constitución y operación inicial. La revisión de la AVMS se anticipa para Q3 2026, con el objetivo de adaptar el marco a plataformas, algoritmos de recomendación, deepfakes y contenidos generados por IA.',
    transposicionDetalle: 'La Directiva AVMS fue transpuesta por la Ley 13/2022, General de Comunicación Audiovisual (LGCA). La CNMC ejerce como autoridad reguladora audiovisual independiente, integrando las funciones que antes ejercía el inexistente CEMA. El EMFA es de aplicación directa; la CNMC participará en el EBMS. La Copyright Directive fue transpuesta por RDL 24/2021, incluyendo el derecho afín de editores de prensa. La coordinación con el DSA es necesaria para plataformas de intercambio de vídeos, que están sujetas a ambos marcos.',
    alcance: 'Servicios audiovisuales lineales y a demanda, plataformas de intercambio de vídeos, publicidad audiovisual, protección de menores, pluralismo mediático, independencia editorial, garantías para periodistas y derechos afines de editores.',
    conceptosClave: ['Cuota de obra europea', 'Independencia editorial', 'Pluralismo mediático', 'Plataforma de intercambio de vídeos', 'Protección de menores', 'Algoritmos de recomendación', 'EBMS (Consejo Europeo de Servicios de Medios)', 'Derecho afín de editores'],
    arquitecturaNormativaUE: 'Directiva AVMS revisada en 2018 y transpuesta, EMFA (reglamento de aplicación directa desde 2025), Copyright Directive en aspectos de medios. El EBMS coordina a nivel europeo. Revisión de la AVMS en preparación para abordar IA generativa y deepfakes.',
    clavesInterpretacion: [
      'La cuota del 30% se aplica al catálogo disponible, no a la producción; las plataformas deben además dar prominencia a las obras europeas.',
      'El EMFA protege la independencia editorial pero no impide la regulación de contenidos ilegales ni las obligaciones del DSA.',
      'La protección de menores en plataformas de vídeo es una obligación verificable con mecanismos de control, no una mera recomendación.',
      'Las plataformas de intercambio de vídeos están sujetas tanto a la AVMS como al DSA: las obligaciones son complementarias, no sustitutivas.',
    ],
    alertasRigor: [
      'La revisión de la AVMS está en fase preparatoria; los contenidos generados por IA plantean desafíos que el marco actual no contempla plenamente.',
      'El EMFA y el EBMS están en fase de despliegue operativo; su efectividad dependerá de la cooperación entre autoridades nacionales.',
      'La frontera entre contenido audiovisual (AVMS) y contenido de plataforma (DSA) no siempre es nítida y genera zonas grises.',
    ],
    recursosReferencia: [
      'Directiva AVMS (Directiva 2018/1808/UE) — EUR-Lex',
      'European Media Freedom Act (Reglamento 2024/1083/UE) — EUR-Lex',
      'Ley 13/2022 General de Comunicación Audiovisual — BOE',
      'CNMC — Informes audiovisuales y función reguladora',
    ],
    funcionNormativa: 'Sectorial y de garantía — protege pluralismo, independencia editorial y diversidad cultural en el ecosistema digital.',
    obligacionesActores: [
      { actor: 'medios', intensidad: 'alta', obligaciones: ['Cumplir cuota 30% obra europea en catálogo VOD', 'Beneficiarse de garantías de independencia editorial del EMFA', 'Gestionar derechos afines de editores de prensa (art. 15 Copyright Dir.)'] },
      { actor: 'plataformas', intensidad: 'alta', obligaciones: ['Catalogar y promover contenido europeo con prominencia', 'Cumplir reglas de publicidad audiovisual y limitaciones horarias', 'Proteger menores en contenido audiovisual con mecanismos verificables', 'Cumplir obligaciones AVMS y DSA complementariamente'] },
      { actor: 'administraciones', intensidad: 'media', obligaciones: ['Supervisar cumplimiento LGCA a través de CNMC', 'Participar en EBMS bajo el EMFA', 'Proteger pluralismo mediático e independencia de la autoridad reguladora'] },
    ],
    dependencias: [
      { areaId: 5, tipo: 'complementariedad', descripcion: 'Los derechos de autor y la regulación audiovisual comparten obligaciones sobre contenido online y derecho afín de editores.' },
      { areaId: 8, tipo: 'complementariedad', descripcion: 'El DSA y la AVMS regulan aspectos complementarios de las plataformas de vídeo; ambos marcos coexisten.' },
    ],
    hitosProximos: ['EMFA: aplicación progresiva desde agosto 2025', 'EBMS: constitución y operación', 'Revisión Directiva AVMS: propuesta Q3 2026'],
    normas: [
      { nombre: 'Directiva AVMS (Dir. 2018/1808/UE)', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por Ley 13/2022, LGCA. CNMC como autoridad audiovisual. Cuota 30% obra europea en VOD.', plazo: 'Cumplido' },
      { nombre: 'European Media Freedom Act (Reg. 2024/1083/UE)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa progresiva desde agosto 2025. CNMC en EBMS.', plazo: 'Agosto 2025' },
      { nombre: 'Copyright Directive (impacto medios)', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta por RDL 24/2021. Art. 15 derecho afín editores de prensa.', plazo: 'Cumplido' },
      { nombre: 'Revisión Directiva AVMS', tipo: 'Propuesta', estadoES: 'propuesta', transposicionES: 'Pendiente de propuesta de revisión. Prevista Q3 2026. Abordará deepfakes, IA y algoritmos.', plazo: '—' },
    ]
  },
  {
    id: 12, nombre: 'Servicios Financieros Digitales y Criptoactivos',
    subtitulo: 'Pagos, open banking, criptoactivos, resiliencia operativa y prevención del blanqueo',
    descripcion: 'PSD2/PSD3, MiCA, DORA, euro digital, crowdfunding, prevención blanqueo',
    color: '#0369a1', vigentes: 5, enProceso: 3, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 2,
    sintesisEjecutiva: 'Los servicios financieros digitales en el DSM se articulan en torno a tres regímenes con lógicas distintas. El Reglamento DORA (2022/2554/UE) impone requisitos de resiliencia operativa digital a entidades financieras reguladas. El Reglamento MiCA (2023/1114/UE) establece el primer marco regulatorio integral para los criptoactivos. La revisión de los servicios de pago (PSD3 y PSR) actualiza el marco de pagos minoristas con enfoque hacia el reglamento de aplicación directa. La 6ª Directiva AML refuerza la prevención del blanqueo.',
    explicacionMedia: 'DORA impone requisitos de gestión de riesgos TIC, pruebas, notificación de incidentes y supervisión de terceros proveedores críticos a entidades financieras. MiCA crea un marco regulatorio completo para criptoactivos, distinguiendo entre categorías con obligaciones diferenciadas: stablecoins respaldadas por activos, e-money tokens y otros criptoactivos. PSD3/PSR actualiza el marco de pagos. Los tres regímenes tienen lógicas y ámbitos distintos que no deben confundirse.',
    explicacionCompleta: 'El alcance incluye resiliencia operativa digital (gestión de riesgos TIC, pruebas de penetración, notificación de incidentes, supervisión de terceros TIC críticos), autorización y supervisión de emisores de criptoactivos y proveedores de servicios de criptoactivos, servicios de pago (autenticación reforzada, open banking, pagos instantáneos) y prevención del blanqueo (diligencia debida reforzada para cripto, registros centralizados de titularidad real). DORA no sustituye NIS2 en el sector financiero: lo especializa. Las entidades financieras sujetas a DORA no quedan exentas de NIS2, pero DORA es lex specialis. MiCA no regula todos los criptoactivos: los valores tokenizados siguen bajo MiFID II y los NFT únicos pueden quedar fuera del ámbito.',
    impactoResumen: 'Las entidades financieras deben cumplir DORA con pruebas de penetración, gestión de terceros TIC críticos y notificación de incidentes. Los proveedores de servicios de criptoactivos deben obtener autorización conforme a MiCA. Open banking no equivale a acceso sin restricciones: requiere consentimiento y finalidad. La gestión de proveedores TIC críticos merece tratamiento diferenciado bajo DORA.',
    estadoUEDetalle: 'DORA es vigente y plenamente aplicable desde el 17 de enero de 2025. MiCA está vigente con aplicación escalonada: el régimen para stablecoins y e-money tokens fue aplicable desde junio de 2024; el régimen completo, desde diciembre de 2024. PSD3 y PSR están en proceso legislativo avanzado, con adopción esperada en 2025-2026. La 6ª Directiva AML y el nuevo Reglamento AML imponen plazos hasta 2027.',
    transposicionDetalle: 'El Banco de España, la CNMV y la DGSFP son las autoridades competentes bajo DORA en sus respectivos ámbitos supervisados. MiCA designa a la CNMV como autoridad competente para la autorización y supervisión de emisores de criptoactivos y proveedores de servicios de criptoactivos. PSD2 fue transpuesta por RDL 19/2018 y sigue vigente hasta la derogación por PSD3/PSR. La 6ª Directiva AML deberá ser transpuesta antes del 10.07.2027, modificando la Ley 10/2010. SEPBLAC actúa como UIF.',
    alcance: 'Proveedores de servicios de pago, autenticación reforzada, open banking, pagos instantáneos, criptoactivos, resiliencia operativa TIC del sector financiero, prevención del blanqueo, euro digital y open finance (FIDA).',
    conceptosClave: ['Autenticación reforzada del cliente', 'Iniciación de pagos', 'Open banking', 'Externalización crítica', 'Pruebas de resiliencia', 'Criptoactivo', 'Stablecoin', 'Diligencia debida reforzada', 'Titularidad real'],
    arquitecturaNormativaUE: 'PSD2 vigente con revisión en curso (PSD3/PSR). MiCA para criptoactivos. DORA para resiliencia operativa. 6ª Directiva AML y Reglamento AML para prevención del blanqueo. Propuestas del euro digital y FIDA (open finance) en tramitación.',
    clavesInterpretacion: [
      'DORA no sustituye NIS2 en el sector financiero: lo especializa. Las entidades financieras sujetas a DORA no quedan exentas de NIS2, pero DORA es lex specialis.',
      'MiCA no regula todos los criptoactivos: los valores tokenizados siguen bajo MiFID II y los NFT únicos pueden quedar fuera del ámbito, dependiendo de sus características.',
      'Open banking no equivale a acceso sin restricciones: requiere consentimiento del usuario, finalidad específica y cumplimiento de autenticación reforzada.',
      'La gestión de proveedores TIC críticos es una obligación diferenciada bajo DORA que va más allá de la externalización ordinaria.',
      'PSD3/PSR están en tramitación; PSD2 sigue siendo la norma vigente hasta su derogación efectiva.',
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
  {
    id: 13, nombre: 'Sector Público Digital e Interoperabilidad',
    subtitulo: 'Ventanilla única, principio de una sola vez, interoperabilidad europea y datos abiertos de alto valor',
    descripcion: 'SDGR, OOTS, Interoperable Europe Act, datos abiertos, ENI/ENS, administración digital',
    color: '#475569', vigentes: 4, enProceso: 0, planificadas: 0, enRevision: 0, reglamentos: 3, directivas: 1,
    sintesisEjecutiva: 'El sector público digital en el DSM se apoya en tres pilares complementarios. El Reglamento de Puerta de Acceso Única Digital (SDGR, Reglamento 2018/1724/UE) garantiza el acceso en línea a información, procedimientos y servicios de asistencia en todos los Estados miembros. El Reglamento de Interoperabilidad Europea (IEA, Reglamento 2024/903/UE) establece la gobernanza, los principios y los componentes interoperables reutilizables para que los sistemas públicos cooperen transfronterizamente. El principio "una sola vez" —los ciudadanos y empresas no deben presentar la misma información más de una vez a las administraciones— se implementa técnicamente a través del OOTS.',
    explicacionMedia: 'El SDGR obliga a los Estados miembros a ofrecer procedimientos en línea y acceso a información sobre derechos y obligaciones a través de un portal europeo (Your Europe). El OOTS —Once-Only Technical System— es el primer espacio de datos transfronterizo del sector público de la Unión: permite a las administraciones intercambiar evidencias y documentos sin que el ciudadano o empresa los presente repetidamente. El Reglamento de Interoperabilidad Europea establece la gobernanza compartida y los elementos comunes (semánticos, técnicos, organizativos) sobre los que estos sistemas se despliegan. La Directiva de Datos Abiertos facilita la reutilización de información del sector público con énfasis en conjuntos de alto valor.',
    explicacionCompleta: 'El alcance incluye obligaciones de información y procedimientos en línea (SDGR), cooperación transfronteriza mediante intercambio automatizado de evidencias (OOTS), especificaciones comunes para interoperabilidad y gobernanza compartida (IEA), y reutilización de documentos del sector público con categorías de alto valor (Directiva de Datos Abiertos). El OOTS reutiliza los Building Blocks eID (para autenticación) y eDelivery (para intercambio seguro), constituyendo la arquitectura de referencia para espacios de datos públicos europeos. La interoperabilidad no es solo tecnología: es gobernanza semántica, legal y organizativa, como distingue expresamente el Marco Europeo de Interoperabilidad (EIF). El principio "una sola vez" no elimina el consentimiento del usuario para el intercambio de datos: los sistemas deben implementar mecanismos de control y transparencia conformes al RGPD.',
    impactoResumen: 'Las administraciones públicas deben ofrecer procedimientos en línea, conectar sus portales al OOTS para intercambio de evidencias y cumplir principios de interoperabilidad. Los ciudadanos y empresas se benefician de no presentar la misma información más de una vez. Los conjuntos de datos de alto valor deben publicarse en formato abierto y legible por máquinas.',
    estadoUEDetalle: 'El SDGR es vigente; el portal Your Europe está operativo y el OOTS ha comenzado su despliegue con procedimientos prioritarios. El Reglamento de Interoperabilidad Europea fue adoptado en 2024 y está en implementación, con la Junta de Interoperabilidad Europa operativa. La Directiva de Datos Abiertos está transpuesta. Los actos de ejecución que designan categorías de conjuntos de alto valor están adoptados.',
    transposicionDetalle: 'España cuenta con uno de los marcos de interoperabilidad más desarrollados de la Unión, con el Esquema Nacional de Interoperabilidad (ENI, RD 4/2010 actualizado) y el Esquema Nacional de Seguridad (ENS, RD 311/2022) como marcos técnicos de referencia. La Secretaría General de Administración Digital (SGAD) coordina la implementación del OOTS y la adaptación de portales y procedimientos. La coordinación con las comunidades autónomas es determinante para la coherencia y calidad de la implementación, con retos significativos en homogeneidad entre administraciones. El portal datos.gob.es actúa como catálogo nacional de datos abiertos. España figura junto con Estonia y los Países Bajos como frontrunner en implementación del Marco Europeo de Interoperabilidad.',
    alcance: 'Procedimientos en línea, ventanilla digital única, intercambio transfronterizo de evidencias (OOTS), interoperabilidad de sistemas públicos (semántica, técnica, organizativa, de gobernanza), reutilización de datos del sector público y conjuntos de datos de alto valor.',
    conceptosClave: ['Ventanilla única digital', 'Principio de una sola vez', 'OOTS (Once-Only Technical System)', 'Marco Europeo de Interoperabilidad (EIF)', 'Conjuntos de datos de alto valor', 'Interoperabilidad semántica', 'ENI/ENS', 'SGAD'],
    arquitecturaNormativaUE: 'El SDGR establece el portal Your Europe y el OOTS. El Reglamento de Interoperabilidad Europea (IEA) define la gobernanza, los principios y la Junta de Interoperabilidad. La Directiva de Datos Abiertos facilita la reutilización con actos de ejecución para conjuntos de alto valor. Los Building Blocks eID y eDelivery son la infraestructura técnica del OOTS.',
    clavesInterpretacion: [
      'Interoperabilidad no es solo tecnología: es gobernanza semántica, legal y organizativa. El ENI distingue expresamente entre interoperabilidad técnica, semántica, organizativa y de gobernanza.',
      'El principio "una sola vez" no elimina el consentimiento del usuario para el intercambio de datos: los sistemas deben implementar mecanismos de control y transparencia conformes al RGPD.',
      'Los compromisos de calidad de servicio importan tanto como la existencia de portales: la accesibilidad, usabilidad e idioma son requisitos del SDGR.',
      'El OOTS es un espacio de datos público transfronterizo, no un sistema de acceso irrestricto a información personal.',
    ],
    alertasRigor: [
      'El despliegue del OOTS depende de la madurez técnica y organizativa de cada Estado miembro; la implementación es desigual.',
      'La coordinación entre administración general y comunidades autónomas en España es determinante y presenta retos de homogeneidad.',
    ],
    recursosReferencia: [
      'Reglamento de Puerta de Acceso Única Digital (SDGR, 2018/1724/UE) — EUR-Lex',
      'Reglamento de Interoperabilidad Europea (IEA, 2024/903/UE) — EUR-Lex',
      'Directiva de Datos Abiertos — EUR-Lex',
      'Portal Your Europe — Comisión Europea',
      'SGAD — Secretaría General de Administración Digital',
      'ENI / ENS — Portal de administración electrónica (PAe)',
    ],
    funcionNormativa: 'Infraestructural y de gobernanza — reduce cargas administrativas, habilita servicios paneuropeos y potencia la reutilización de datos públicos.',
    buildingBlocks: ['OOTS', 'eDelivery', 'eID / EUDI Wallet'],
    obligacionesActores: [
      { actor: 'administraciones', intensidad: 'alta', obligaciones: ['Ofrecer procedimientos en línea conforme al SDGR', 'Conectar portales nacionales al OOTS', 'Cumplir principios de interoperabilidad del IEA', 'Publicar conjuntos de datos de alto valor en formato abierto', 'Coordinar implementación con comunidades autónomas'] },
      { actor: 'proveedores', intensidad: 'media', obligaciones: ['Desarrollar soluciones interoperables conforme al EIF', 'Adaptar sistemas a especificaciones OOTS y Building Blocks', 'Garantizar accesibilidad y usabilidad de los portales'] },
      { actor: 'pymes', intensidad: 'baja', obligaciones: ['Beneficiarse del principio de una sola vez para trámites transfronterizos', 'Reutilizar datos abiertos de alto valor para innovación'] },
    ],
    dependencias: [
      { areaId: 7, tipo: 'dependencia', descripcion: 'El OOTS reutiliza eID/EUDI Wallet para autenticación transfronteriza y eDelivery para intercambio seguro.' },
      { areaId: 4, tipo: 'complementariedad', descripcion: 'Los datos abiertos de alto valor se coordinan con el marco de gobernanza de datos (DGA) y el Data Act.' },
      { areaId: 6, tipo: 'complementariedad', descripcion: 'El ENS y NIS2 aseguran la seguridad de los sistemas de administración electrónica.' },
    ],
    hitosProximos: ['OOTS: despliegue con procedimientos prioritarios', 'IEA: implementación de gobernanza y componentes interoperables', 'Conjuntos de alto valor: publicación en formato abierto'],
    normas: [
      { nombre: 'Reglamento Ventanilla Digital Única (SDGR)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Portal Your Europe operativo. OOTS en despliegue con SGAD coordinando.', plazo: 'En vigor' },
      { nombre: 'Interoperable Europe Act (IEA)', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa desde 2024. Junta de Interoperabilidad operativa. ENI como marco nacional alineado.', plazo: 'En vigor' },
      { nombre: 'Directiva de Datos Abiertos', tipo: 'Directiva', estadoES: 'transpuesta', transposicionES: 'Transpuesta. Portal datos.gob.es como catálogo nacional. Conjuntos de alto valor en publicación.', plazo: 'Cumplido' },
      { nombre: 'Reglamento conjuntos de alto valor', tipo: 'Reglamento', estadoES: 'directa', transposicionES: 'Aplicación directa. Categorías de alto valor adoptadas por actos de ejecución.', plazo: 'En vigor' },
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
  tipoHito?: 'normativo' | 'tecnico';
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
  { fecha: '18.08.2026', titulo: 'Plazo transposición Dir. e-Evidence', descripcion: 'Obliga a proveedores a designar representante legal para la obtención transfronteriza de pruebas electrónicas.', estado: 'vigente', bloques: [8], efectoJuridico: 'Los proveedores de servicios digitales sin sede en la UE deben designar un representante legal.', proximoPaso: 'Entrada en vigor del Reglamento e-Evidence.' },
  { fecha: 'Q3 2026', titulo: 'Revisión Directiva AVMS', descripcion: 'Adaptación a plataformas, algoritmos de recomendación, deepfakes.', estado: 'revision', bloques: [11], efectoJuridico: 'Actualizará las obligaciones de plataformas de vídeo e incluirá regulación de contenido generado por IA. No suspende las obligaciones vigentes mientras dure la revisión.', proximoPaso: 'Propuesta de revisión esperada Q3 2026.', incertidumbre: true },
  { fecha: 'Q4 2026', titulo: 'Digital Fairness Act', descripcion: 'Dark patterns, diseño adictivo, profiling menores, dynamic pricing.', estado: 'planificada', bloques: [8, 9], efectoJuridico: 'Prohibirá prácticas de diseño manipulador y reforzará la protección de menores en el entorno digital.', proximoPaso: 'Propuesta esperada Q4 2026.', incertidumbre: true },
  { fecha: '02.12.2026', titulo: 'Plazo transposición Platform Work Directive', descripcion: 'Regulación trabajo en plataformas digitales. Ley Rider parcial.', estado: 'vigente', bloques: [10], efectoJuridico: 'Presunción de laboralidad para trabajadores de plataformas. España ya tiene la Ley Rider pero debe ampliarla.', proximoPaso: 'Completar la transposición ampliando el RDL 9/2021.' },
  { fecha: '09.12.2026', titulo: 'Plazo transposición Product Liability Directive', descripcion: 'Modificará TRLGDCU para incluir software e IA.', estado: 'vigente', bloques: [9], efectoJuridico: 'Extiende la responsabilidad civil objetiva a fabricantes de software y sistemas de IA defectuosos.', proximoPaso: 'España debe modificar el TRLGDCU.' },
  { fecha: '14.06.2027', titulo: 'Plazo transposición Dir. Violencia contra Mujeres', descripcion: 'Incluye ciberviolencia. Deberá modificar CP y Ley 1/2004.', estado: 'vigente', bloques: [8], efectoJuridico: 'Tipifica delitos de ciberviolencia: acoso online, difusión de imágenes íntimas, incitación al odio.', proximoPaso: 'Modificación del Código Penal y la Ley 1/2004.' },
  { fecha: '10.07.2027', titulo: 'Plazo transposición 6ª Directiva AML', descripcion: 'Modificará Ley 10/2010. Registros de titularidad real centralizados.', estado: 'vigente', bloques: [12], efectoJuridico: 'Refuerza la prevención del blanqueo con registros centralizados y diligencia debida reforzada para cripto.', proximoPaso: 'Modificación de la Ley 10/2010 y registro de titularidad real.' },
  // Technical milestones — EuroStack / Building Blocks
  { fecha: 'Q2 2026', titulo: 'EUDI Wallet: pilotos a gran escala', descripcion: 'Los pilotos de cartera de identidad digital europea alcanzan fase de despliegue a gran escala en varios Estados miembros, incluida España.', estado: 'proceso', bloques: [7], efectoJuridico: 'Los actos de ejecución (Reglamentos 2024/2979 y 2024/2982) definen las especificaciones técnicas. Los pilotos no crean obligaciones adicionales, pero anticipan la infraestructura de cumplimiento.', proximoPaso: 'Evaluación de resultados y ajuste de especificaciones técnicas.', tipoHito: 'tecnico' },
  { fecha: 'Q3 2026', titulo: 'OOTS: conexión de portales nacionales', descripcion: 'El Once-Only Technical System conecta los portales nacionales de procedimientos al sistema transfronterizo de intercambio de evidencias.', estado: 'proceso', bloques: [7, 8], efectoJuridico: 'Ejecuta el Reglamento de Ventanilla Digital Única. Los ciudadanos y empresas podrán presentar datos una sola vez ante administraciones europeas.', proximoPaso: 'Despliegue progresivo en Estados miembros con mayor madurez de interoperabilidad.', tipoHito: 'tecnico' },
  { fecha: '2027', titulo: 'EUDI Wallet: obligatoriedad de aceptación', descripcion: 'Los servicios públicos y determinados servicios privados deberán aceptar la cartera de identidad digital europea como medio de identificación.', estado: 'planificada', bloques: [7], efectoJuridico: 'Creará obligaciones de aceptación para administraciones y, progresivamente, para ciertos sectores privados regulados.', proximoPaso: 'Adopción de actos de ejecución que precisen los servicios obligados y los plazos.', incertidumbre: true, tipoHito: 'tecnico' },
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
