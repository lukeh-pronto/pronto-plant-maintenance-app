export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
];

export interface Translations {
  // Header
  onlineStatus: string;
  settings: string;
  
  // Search
  searchPlaceholder: string;
  
  // Sync
  lastSynced: string;
  sortBy: string;
  sortByName: string;
  sortById: string;
  sortByBranch: string;
  
  // Equipment
  equipment: string;
  status: string;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  
  // Actions
  scanQR: string;
  viewDetails: string;
  bookmark: string;
  removeBookmark: string;
  
  // Status
  operational: string;
  maintenance: string;
  offline: string;
  
  // Common
  loading: string;
  error: string;
  retry: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  back: string;
  done: string;
  
  // Task Details Screen
  preStartCheck: string;
  taskHistory: string;
  plantItem: string;
  costCentre: string;
  branch: string;
  parentPlant1: string;
  parentPlant2: string;
  registrationDetails: string;
  approvalBody: string;
  approvalNo: string;
  expiryDate: string;
  
  // Pre-start Checklist Screen
  preStartCheckTitle: string;
  itemsCompleted: string;
  continue: string;
  pleaseCompleteAll: string;
  addComments: string;
  camera: string;
  photos: string;
  raiseWorkRequest: string;
  raisingWorkRequest: string;
  workRequestRaised: string;
  offlineRequestAdded: string;
  
  // Alert Dialogs
  incompleteWorkRequest: string;
  incompleteWorkRequestMessage: string;
  goBack: string;
  proceed: string;
  incompleteDefectDetails: string;
  incompleteDefectDetailsMessage: string;
  
  // Checklist Items
  fluidLevels: string;
  tireCondition: string;
  lightsIndicators: string;
  brakeSystem: string;
  
  // Task Details
  truckDailySafetyCheck: string;
  type: string;
  workRequest: string;
  assignedTo: string;
  completedBy: string;
}

export const translations: Record<string, Translations> = {
  en: {
    onlineStatus: 'Online',
    settings: 'Settings',
    searchPlaceholder: 'Search...',
    lastSynced: 'Last synced',
    sortBy: 'Sort by:',
    sortByName: 'Name',
    sortById: 'ID',
    sortByBranch: 'Branch',
    equipment: 'Equipment',
    status: 'Status',
    location: 'Location',
    lastMaintenance: 'Last Maintenance',
    nextMaintenance: 'Next Maintenance',
    scanQR: 'Scan QR Code',
    viewDetails: 'View Details',
    bookmark: 'Bookmark',
    removeBookmark: 'Remove from Bookmarks',
    operational: 'Operational',
    maintenance: 'Maintenance',
    offline: 'Offline',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    done: 'Done',
    
    // Task Details Screen
    preStartCheck: 'Pre-start check',
    taskHistory: 'Task History',
    plantItem: 'Plant Item',
    costCentre: 'Cost Centre',
    branch: 'Branch',
    parentPlant1: 'Parent Plant #1',
    parentPlant2: 'Parent Plant #2',
    registrationDetails: 'Registration Details',
    approvalBody: 'Approval Body',
    approvalNo: 'Approval No.',
    expiryDate: 'Expiry Date',
    
    // Pre-start Checklist Screen
    preStartCheckTitle: 'Pre-start check',
    itemsCompleted: 'items completed',
    continue: 'Continue',
    pleaseCompleteAll: 'Please complete all checklist items',
    addComments: 'Add Comments (Optional)',
    camera: 'Camera',
    photos: 'Photos',
    raiseWorkRequest: 'Raise Work Request',
    raisingWorkRequest: 'Raising Work Request...',
    workRequestRaised: 'Work Request Raised',
    offlineRequestAdded: 'Offline: Request Added to Queue',
    
    // Alert Dialogs
    incompleteWorkRequest: 'Incomplete Work Request',
    incompleteWorkRequestMessage: 'You have not added any comments or photos for this work request. Do you want to proceed anyway?',
    goBack: 'Go Back',
    proceed: 'Proceed',
    incompleteDefectDetails: 'Incomplete Defect Details',
    incompleteDefectDetailsMessage: 'Some defects don\'t have comments or photos. Do you want to proceed anyway?',
    
    // Checklist Items
    fluidLevels: 'Fluid levels',
    tireCondition: 'Tire condition and pressure',
    lightsIndicators: 'Lights and indicators',
    brakeSystem: 'Brake system',
    
    // Task Details
    truckDailySafetyCheck: 'Truck Daily Safety Check',
    type: 'Type',
    workRequest: 'Work Request',
    assignedTo: 'Assigned to',
    completedBy: 'Completed by',
  },
  es: {
    onlineStatus: 'En línea',
    settings: 'Configuración',
    searchPlaceholder: 'Buscar...',
    lastSynced: 'Última sincronización',
    sortBy: 'Ordenar por:',
    sortByName: 'Nombre',
    sortById: 'ID',
    sortByBranch: 'Sucursal',
    equipment: 'Equipo',
    status: 'Estado',
    location: 'Ubicación',
    lastMaintenance: 'Último Mantenimiento',
    nextMaintenance: 'Próximo Mantenimiento',
    scanQR: 'Escanear Código QR',
    viewDetails: 'Ver Detalles',
    bookmark: 'Marcador',
    removeBookmark: 'Quitar de Marcadores',
    operational: 'Operativo',
    maintenance: 'Mantenimiento',
    offline: 'Desconectado',
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    back: 'Atrás',
    done: 'Hecho',
    
    // Task Details Screen
    preStartCheck: 'Verificación previa',
    taskHistory: 'Historial de Tareas',
    plantItem: 'Artículo de Planta',
    costCentre: 'Centro de Costo',
    branch: 'Sucursal',
    parentPlant1: 'Planta Padre #1',
    parentPlant2: 'Planta Padre #2',
    registrationDetails: 'Detalles de Registro',
    approvalBody: 'Organismo de Aprobación',
    approvalNo: 'No. de Aprobación',
    expiryDate: 'Fecha de Vencimiento',
    
    // Pre-start Checklist Screen
    preStartCheckTitle: 'Verificación previa',
    itemsCompleted: 'elementos completados',
    continue: 'Continuar',
    pleaseCompleteAll: 'Por favor complete todos los elementos de la lista',
    addComments: 'Agregar Comentarios (Opcional)',
    camera: 'Cámara',
    photos: 'Fotos',
    raiseWorkRequest: 'Crear Solicitud de Trabajo',
    raisingWorkRequest: 'Creando Solicitud de Trabajo...',
    workRequestRaised: 'Solicitud de Trabajo Creada',
    offlineRequestAdded: 'Sin conexión: Solicitud Agregada a la Cola',
    
    // Alert Dialogs
    incompleteWorkRequest: 'Solicitud de Trabajo Incompleta',
    incompleteWorkRequestMessage: 'No has agregado comentarios o fotos para esta solicitud de trabajo. ¿Quieres proceder de todos modos?',
    goBack: 'Regresar',
    proceed: 'Proceder',
    incompleteDefectDetails: 'Detalles de Defecto Incompletos',
    incompleteDefectDetailsMessage: 'Algunos defectos no tienen comentarios o fotos. ¿Quieres proceder de todos modos?',
    
    // Checklist Items
    fluidLevels: 'Niveles de fluidos',
    tireCondition: 'Condición y presión de neumáticos',
    lightsIndicators: 'Luces e indicadores',
    brakeSystem: 'Sistema de frenos',
    
    // Task Details
    truckDailySafetyCheck: 'Verificación Diaria de Seguridad del Camión',
    type: 'Tipo',
    workRequest: 'Solicitud de Trabajo',
    assignedTo: 'Asignado a',
    completedBy: 'Completado por',
  },
  fr: {
    onlineStatus: 'En ligne',
    settings: 'Paramètres',
    searchPlaceholder: 'Rechercher...',
    lastSynced: 'Dernière synchronisation',
    sortBy: 'Trier par:',
    sortByName: 'Nom',
    sortById: 'ID',
    sortByBranch: 'Branche',
    equipment: 'Équipement',
    status: 'Statut',
    location: 'Emplacement',
    lastMaintenance: 'Dernière Maintenance',
    nextMaintenance: 'Prochaine Maintenance',
    scanQR: 'Scanner le Code QR',
    viewDetails: 'Voir les Détails',
    bookmark: 'Signet',
    removeBookmark: 'Retirer des Signets',
    operational: 'Opérationnel',
    maintenance: 'Maintenance',
    offline: 'Hors ligne',
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    back: 'Retour',
    done: 'Terminé',
    
    // Task Details Screen
    preStartCheck: 'Vérification pré-démarrage',
    taskHistory: 'Historique des Tâches',
    plantItem: 'Article d\'Usine',
    costCentre: 'Centre de Coût',
    branch: 'Branche',
    parentPlant1: 'Usine Parent #1',
    parentPlant2: 'Usine Parent #2',
    registrationDetails: 'Détails d\'Enregistrement',
    approvalBody: 'Organisme d\'Approbation',
    approvalNo: 'No. d\'Approbation',
    expiryDate: 'Date d\'Expiration',
    
    // Pre-start Checklist Screen
    preStartCheckTitle: 'Vérification pré-démarrage',
    itemsCompleted: 'éléments terminés',
    continue: 'Continuer',
    pleaseCompleteAll: 'Veuillez compléter tous les éléments de la liste',
    addComments: 'Ajouter des Commentaires (Optionnel)',
    camera: 'Caméra',
    photos: 'Photos',
    raiseWorkRequest: 'Créer une Demande de Travail',
    raisingWorkRequest: 'Création de la Demande de Travail...',
    workRequestRaised: 'Demande de Travail Créée',
    offlineRequestAdded: 'Hors ligne: Demande Ajoutée à la File',
    
    // Alert Dialogs
    incompleteWorkRequest: 'Demande de Travail Incomplète',
    incompleteWorkRequestMessage: 'Vous n\'avez pas ajouté de commentaires ou de photos pour cette demande de travail. Voulez-vous continuer quand même?',
    goBack: 'Retour',
    proceed: 'Continuer',
    incompleteDefectDetails: 'Détails de Défaut Incomplets',
    incompleteDefectDetailsMessage: 'Certains défauts n\'ont pas de commentaires ou de photos. Voulez-vous continuer quand même?',
    
    // Checklist Items
    fluidLevels: 'Niveaux de fluides',
    tireCondition: 'État et pression des pneus',
    lightsIndicators: 'Lumières et indicateurs',
    brakeSystem: 'Système de freinage',
    
    // Task Details
    truckDailySafetyCheck: 'Vérification Quotidienne de Sécurité du Camion',
    type: 'Type',
    workRequest: 'Demande de Travail',
    assignedTo: 'Assigné à',
    completedBy: 'Complété par',
  },
  pt: {
    onlineStatus: 'Online',
    settings: 'Configurações',
    searchPlaceholder: 'Pesquisar...',
    lastSynced: 'Última sincronização',
    sortBy: 'Ordenar por:',
    sortByName: 'Nome',
    sortById: 'ID',
    sortByBranch: 'Filial',
    equipment: 'Equipamento',
    status: 'Status',
    location: 'Localização',
    lastMaintenance: 'Última Manutenção',
    nextMaintenance: 'Próxima Manutenção',
    scanQR: 'Escanear Código QR',
    viewDetails: 'Ver Detalhes',
    bookmark: 'Marcador',
    removeBookmark: 'Remover dos Marcadores',
    operational: 'Operacional',
    maintenance: 'Manutenção',
    offline: 'Offline',
    loading: 'Carregando...',
    error: 'Erro',
    retry: 'Tentar Novamente',
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    back: 'Voltar',
    done: 'Concluído',
    
    // Task Details Screen
    preStartCheck: 'Verificação pré-partida',
    taskHistory: 'Histórico de Tarefas',
    plantItem: 'Item da Planta',
    costCentre: 'Centro de Custo',
    branch: 'Filial',
    parentPlant1: 'Planta Pai #1',
    parentPlant2: 'Planta Pai #2',
    registrationDetails: 'Detalhes de Registro',
    approvalBody: 'Órgão de Aprovação',
    approvalNo: 'No. de Aprovação',
    expiryDate: 'Data de Vencimento',
    
    // Pre-start Checklist Screen
    preStartCheckTitle: 'Verificação pré-partida',
    itemsCompleted: 'itens concluídos',
    continue: 'Continuar',
    pleaseCompleteAll: 'Por favor complete todos os itens da lista',
    addComments: 'Adicionar Comentários (Opcional)',
    camera: 'Câmera',
    photos: 'Fotos',
    raiseWorkRequest: 'Criar Solicitação de Trabalho',
    raisingWorkRequest: 'Criando Solicitação de Trabalho...',
    workRequestRaised: 'Solicitação de Trabalho Criada',
    offlineRequestAdded: 'Offline: Solicitação Adicionada à Fila',
    
    // Alert Dialogs
    incompleteWorkRequest: 'Solicitação de Trabalho Incompleta',
    incompleteWorkRequestMessage: 'Você não adicionou comentários ou fotos para esta solicitação de trabalho. Deseja prosseguir mesmo assim?',
    goBack: 'Voltar',
    proceed: 'Prosseguir',
    incompleteDefectDetails: 'Detalhes de Defeito Incompletos',
    incompleteDefectDetailsMessage: 'Alguns defeitos não têm comentários ou fotos. Deseja prosseguir mesmo assim?',
    
    // Checklist Items
    fluidLevels: 'Níveis de fluidos',
    tireCondition: 'Condição e pressão dos pneus',
    lightsIndicators: 'Luzes e indicadores',
    brakeSystem: 'Sistema de freios',
    
    // Task Details
    truckDailySafetyCheck: 'Verificação Diária de Segurança do Caminhão',
    type: 'Tipo',
    workRequest: 'Solicitação de Trabalho',
    assignedTo: 'Atribuído a',
    completedBy: 'Completado por',
  },
  id: {
    onlineStatus: 'Online',
    settings: 'Pengaturan',
    searchPlaceholder: 'Cari...',
    lastSynced: 'Terakhir disinkronkan',
    sortBy: 'Urutkan berdasarkan:',
    sortByName: 'Nama',
    sortById: 'ID',
    sortByBranch: 'Cabang',
    equipment: 'Peralatan',
    status: 'Status',
    location: 'Lokasi',
    lastMaintenance: 'Pemeliharaan Terakhir',
    nextMaintenance: 'Pemeliharaan Berikutnya',
    scanQR: 'Pindai Kode QR',
    viewDetails: 'Lihat Detail',
    bookmark: 'Bookmark',
    removeBookmark: 'Hapus dari Bookmark',
    operational: 'Operasional',
    maintenance: 'Pemeliharaan',
    offline: 'Offline',
    loading: 'Memuat...',
    error: 'Kesalahan',
    retry: 'Coba Lagi',
    cancel: 'Batal',
    save: 'Simpan',
    delete: 'Hapus',
    edit: 'Edit',
    back: 'Kembali',
    done: 'Selesai',
    
    // Task Details Screen
    preStartCheck: 'Pemeriksaan pra-mulai',
    taskHistory: 'Riwayat Tugas',
    plantItem: 'Item Pabrik',
    costCentre: 'Pusat Biaya',
    branch: 'Cabang',
    parentPlant1: 'Pabrik Induk #1',
    parentPlant2: 'Pabrik Induk #2',
    registrationDetails: 'Detail Registrasi',
    approvalBody: 'Badan Persetujuan',
    approvalNo: 'No. Persetujuan',
    expiryDate: 'Tanggal Kedaluwarsa',
    
    // Pre-start Checklist Screen
    preStartCheckTitle: 'Pemeriksaan pra-mulai',
    itemsCompleted: 'item selesai',
    continue: 'Lanjutkan',
    pleaseCompleteAll: 'Silakan lengkapi semua item daftar periksa',
    addComments: 'Tambahkan Komentar (Opsional)',
    camera: 'Kamera',
    photos: 'Foto',
    raiseWorkRequest: 'Buat Permintaan Kerja',
    raisingWorkRequest: 'Membuat Permintaan Kerja...',
    workRequestRaised: 'Permintaan Kerja Dibuat',
    offlineRequestAdded: 'Offline: Permintaan Ditambahkan ke Antrian',
    
    // Alert Dialogs
    incompleteWorkRequest: 'Permintaan Kerja Tidak Lengkap',
    incompleteWorkRequestMessage: 'Anda belum menambahkan komentar atau foto untuk permintaan kerja ini. Apakah Anda ingin melanjutkan?',
    goBack: 'Kembali',
    proceed: 'Lanjutkan',
    incompleteDefectDetails: 'Detail Cacat Tidak Lengkap',
    incompleteDefectDetailsMessage: 'Beberapa cacat tidak memiliki komentar atau foto. Apakah Anda ingin melanjutkan?',
    
    // Checklist Items
    fluidLevels: 'Tingkat cairan',
    tireCondition: 'Kondisi dan tekanan ban',
    lightsIndicators: 'Lampu dan indikator',
    brakeSystem: 'Sistem rem',
    
    // Task Details
    truckDailySafetyCheck: 'Pemeriksaan Keselamatan Harian Truk',
    type: 'Jenis',
    workRequest: 'Permintaan Kerja',
    assignedTo: 'Ditugaskan kepada',
    completedBy: 'Diselesaikan oleh',
  },
};
