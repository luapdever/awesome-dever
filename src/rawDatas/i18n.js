/* ============================================================
   i18n — FR / EN pour tout l'OS.
   - L(en, fr) : marque une valeur traduisible dans les données.
   - tx(value, lang) : résout une valeur (traduite ou brute).
   - STR : chaînes d'interface (chrome, apps système, labels).
   ============================================================ */
export const LANGS = ["en", "fr"];

export const L = (en, fr) => ({ __i18n: true, en, fr });

export const tx = (v, lang) => {
  if (v && typeof v === "object" && v.__i18n) return v[lang] ?? v.en;
  return v;
};

// Résout un tableau éventuellement composé de valeurs traduisibles.
export const txArr = (arr, lang) => (Array.isArray(arr) ? arr.map((x) => tx(x, lang)) : arr);

// Libellés d'affichage des statuts (la clé technique reste en anglais pour le style).
export const STATUS_LABEL = {
  en: { Live: "Live", Demo: "Demo", Training: "Training", Enterprise: "Enterprise", Government: "Government", Confidential: "Confidential" },
  fr: { Live: "En ligne", Demo: "Démo", Training: "Formation", Enterprise: "Entreprise", Government: "Public", Confidential: "Confidentiel" },
};

// Libellés des catégories de compétences.
export const SKILL_CAT = {
  Languages: L("Languages", "Langages"),
  Frontend: L("Frontend", "Frontend"),
  Backend: L("Backend", "Backend"),
  Mobile: L("Mobile", "Mobile"),
  "CMS & Web": L("CMS & Web", "CMS & Web"),
  Databases: L("Databases", "Bases de données"),
  "DevOps & Cloud": L("DevOps & Cloud", "DevOps & Cloud"),
  "Tooling & Design": L("Tooling & Design", "Outils & Design"),
};

export const STR = {
  en: {
    menuFile: "File", menuView: "View", menuHelp: "Help", langLabel: "Language",
    bootTagline: "The mind of Paul M. ZANNOU, booted as a system.",
    bootStatus: "Booting neural modules…",
    bootCredit: "by",
    allApps: "All apps",
    searchPlaceholder: "Search apps…  (↑ ↓ ← → to navigate, Enter to open)",
    noApps: "No apps found",
    ctxOpen: "Open", ctxOpenTab: "Open in new tab", ctxCopy: "Copy link", ctxProps: "Properties",
    // Welcome
    wKicker: "Welcome to",
    wGreeting: "Hi, I'm",
    wRole: "Full-Stack Software Engineer · Web · Mobile · Real-Time",
    wIntro:
      "This is my mind, booted as an operating system. Double-click any icon to explore — or jump straight in below. Confidential and enterprise work lives in Enterprise, and same-company apps are tucked into folders, just like on a phone.",
    wViewBlog: "View my blog",
    // Skills
    skTitle: "Skills", skSub: "What runs on this machine — technical stack & signature concepts", skConcepts: "Signature concepts",
    // Career
    caTitle: "Career", caSub: "System uptime — 5+ years of professional experience", caNow: "Now",
    // Enterprise / Vault
    enTitle: "Enterprise Work", enSub: "Private & enterprise projects — not publicly browsable",
    enNote: "These applications are confidential or restricted under enterprise agreements. Descriptions are shared with permission.",
    enConfidential: "Confidential", enHiddenSub: "Details are hidden under a non-disclosure agreement.",
    // AppDetail
    adOpen: "Open live app in a new tab",
    adCsp: "For security reasons this app blocks embedding — open it in a new tab for the full, interactive experience.",
    adHighlights: "Highlights",
    lblRole: "Role", lblClient: "Client", lblTeam: "Team", lblYear: "Year",
    lblStack: "Stack", lblMadeWith: "Made with", lblCollab: "Collaborators",
    lblCreated: "Created at", lblAdded: "Added at", lblOther: "Other info",
    propsInfo: "Details of the selected app.",
    openNewTab: "Open in new tab",
    // Menus
    miApps: "All applications", miCV: "Résumé (CV)", miTerminal: "Terminal", miContact: "Contact me",
    miWallpaper: "Change wallpaper", miFullscreen: "Toggle fullscreen", miShowApps: "Show all apps",
    miAbout: "About", miShortcuts: "Keyboard shortcuts", miGithub: "GitHub",
    shortcutsMsg: "↑/↓ recall history in Terminal · arrows navigate the launcher · double-click (or tap) to open · right-click for options.",
    volume: "Volume", mute: "Mute",
    days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    today: "Today",
    // Welcome (extra details)
    wAvailable: "Available for freelance & collaborations",
    wStats: [{ n: "5+", l: "Years exp." }, { n: "20+", l: "Projects" }, { n: "6+", l: "Companies" }, { n: "2", l: "Languages" }],
    wDoTitle: "What I build",
    wDo: [
      "Web & mobile apps — Vue.js, React/Next.js, Flutter",
      "Distributed & real-time backends — NestJS, Node.js, WebSocket",
      "Payments, KYC, RBAC/SSO & multilingual WordPress",
      "Containerized DevOps — Docker, CI/CD, monitoring",
    ],
    wExplore: "Jump in",
    // Contact
    cTitle: "Get in touch",
    cSub: "Have a project or an opportunity? Let's talk.",
    cReach: "Or reach me directly",
    cName: "Full name", cEmail: "Email", cMsg: "Message",
    cNamePh: "Your name", cEmailPh: "you@email.com", cMsgPh: "Tell me about your project…",
    cSend: "Send message", cSending: "Sending…", cSentBadge: "Message sent — thanks!",
    // App Store
    asSub: "Mobile apps crafted with Flutter & Dart",
    asGet: "Get", asSoon: "Coming soon", asDownloads: "downloads", asBy: "by",
  },
  fr: {
    menuFile: "Fichier", menuView: "Affichage", menuHelp: "Aide", langLabel: "Langue",
    bootTagline: "L'esprit de Paul M. ZANNOU, démarré comme un système.",
    bootStatus: "Démarrage des modules neuronaux…",
    bootCredit: "par",
    allApps: "Applications",
    searchPlaceholder: "Rechercher une app…  (↑ ↓ ← → pour naviguer, Entrée pour ouvrir)",
    noApps: "Aucune application trouvée",
    ctxOpen: "Ouvrir", ctxOpenTab: "Ouvrir dans un nouvel onglet", ctxCopy: "Copier le lien", ctxProps: "Propriétés",
    wKicker: "Bienvenue sur",
    wGreeting: "Salut, moi c'est",
    wRole: "Ingénieur logiciel full-stack · Web · Mobile · Temps réel",
    wIntro:
      "Ceci est mon esprit, démarré comme un système d'exploitation. Double-cliquez sur une icône pour explorer — ou lancez-vous ci-dessous. Les projets confidentiels et d'entreprise sont dans Entreprise, et les apps d'une même société sont rangées dans des dossiers, comme sur un téléphone.",
    wViewBlog: "Voir mon blog",
    skTitle: "Compétences", skSub: "Ce qui tourne sur cette machine — stack technique & concepts signatures", skConcepts: "Concepts clés",
    caTitle: "Parcours", caSub: "Uptime du système — plus de 5 ans d'expérience", caNow: "Actuel",
    enTitle: "Projets d'entreprise", enSub: "Projets privés & entreprise — non consultables publiquement",
    enNote: "Ces applications sont confidentielles ou restreintes sous accord d'entreprise. Les descriptions sont partagées avec autorisation.",
    enConfidential: "Confidentiel", enHiddenSub: "Détails masqués sous accord de non-divulgation.",
    adOpen: "Ouvrir l'application dans un nouvel onglet",
    adCsp: "Pour des raisons de sécurité, cette app bloque l'intégration — ouvrez-la dans un nouvel onglet pour l'expérience complète.",
    adHighlights: "Points clés",
    lblRole: "Rôle", lblClient: "Client", lblTeam: "Équipe", lblYear: "Année",
    lblStack: "Stack", lblMadeWith: "Réalisé avec", lblCollab: "Collaborateurs",
    lblCreated: "Créé le", lblAdded: "Ajouté le", lblOther: "Autres infos",
    propsInfo: "Détails de l'application sélectionnée.",
    openNewTab: "Ouvrir dans un nouvel onglet",
    miApps: "Toutes les applications", miCV: "Mon CV", miTerminal: "Terminal", miContact: "Me contacter",
    miWallpaper: "Changer de fond d'écran", miFullscreen: "Plein écran", miShowApps: "Afficher les applis",
    miAbout: "À propos de", miShortcuts: "Raccourcis clavier", miGithub: "GitHub",
    shortcutsMsg: "↑/↓ rappellent l'historique du Terminal · les flèches naviguent dans le lanceur · double-clic (ou tap) pour ouvrir · clic droit pour les options.",
    volume: "Volume", mute: "Muet",
    days: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
    today: "Aujourd'hui",
    wAvailable: "Disponible pour freelance & collaborations",
    wStats: [{ n: "5+", l: "Ans d'exp." }, { n: "20+", l: "Projets" }, { n: "6+", l: "Entreprises" }, { n: "2", l: "Langues" }],
    wDoTitle: "Ce que je construis",
    wDo: [
      "Apps web & mobiles — Vue.js, React/Next.js, Flutter",
      "Backends distribués & temps réel — NestJS, Node.js, WebSocket",
      "Paiements, KYC, RBAC/SSO & WordPress multilingue",
      "DevOps conteneurisé — Docker, CI/CD, supervision",
    ],
    wExplore: "Explorer",
    cTitle: "Contactez-moi",
    cSub: "Un projet ou une opportunité ? Parlons-en.",
    cReach: "Ou joignez-moi directement",
    cName: "Nom complet", cEmail: "E-mail", cMsg: "Message",
    cNamePh: "Votre nom", cEmailPh: "vous@email.com", cMsgPh: "Parlez-moi de votre projet…",
    cSend: "Envoyer le message", cSending: "Envoi…", cSentBadge: "Message envoyé — merci !",
    asSub: "Applications mobiles conçues avec Flutter & Dart",
    asGet: "Obtenir", asSoon: "Bientôt", asDownloads: "téléch.", asBy: "par",
  },
};
