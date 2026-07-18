/* ============================================================
   Blog — articles tirés de mes publications (nettoyées, éditées).
   Source unique consommée par /blog (index) et /blog/[slug].
   BILINGUE : chaque champ traduisible passe par L(fr, en) et se
   résout via tr(value, lang). Le contenu original est en français.
   ============================================================ */

// Valeur bilingue + résolveur.
export const L = (fr, en) => ({ fr, en });
export const tr = (v, lang) =>
  v && typeof v === "object" && v.fr !== undefined ? (lang === "en" ? v.en : v.fr) : v;

export const CATEGORIES = ["Tous", "Projet", "Dev", "IA", "Carrière", "Voyage"];

export const blogPosts = [
  {
    slug: "ce-portfolio-nouvelle-generation",
    date: "2026-07-17",
    category: "Projet",
    tags: ["PaulBrain OS", "Next.js", "GSAP", "IA", "UX proactive"],
    title: L("Ce portfolio, et tout ce qu'il contient", "This portfolio, and everything inside it"),
    excerpt: L(
      "Pas une page : une expérience. Plusieurs façons de me découvrir — une landing animée, un OS dans le navigateur, un assistant IA, un livre, un terminal, un CV interactif. Visite guidée.",
      "Not a page: an experience. Several ways to get to know me — an animated landing, an in-browser OS, an AI assistant, a book, a terminal, an interactive résumé. Guided tour."
    ),
    cover: "/blog/portfolio-showcase-os.jpg",
    images: [
      "/blog/portfolio-showcase-os.jpg",
      "/blog/portfolio-showcase-home.jpg",
      "/blog/portfolio-showcase-book.jpg",
      "/blog/portfolio-showcase-cv.jpg",
    ],
    content: [
      L(
        "Mon portfolio n'est pas une page — c'est une expérience. J'ai voulu qu'on puisse me découvrir de plusieurs façons, selon l'envie du moment. Voici ce qu'il contient, et par où commencer.",
        "My portfolio isn't a page — it's an experience. I wanted people to get to know me in several ways, depending on their mood. Here's what's inside, and where to start."
      ),
      L(
        "La page d'accueil, d'abord : une landing animée façon awwwards (GSAP/ScrollTrigger) — préchargeur, scroll horizontal épinglé, typographie cinétique. C'est la porte d'entrée classique, celle qu'on parcourt en scrollant.",
        "The homepage first: an awwwards-style animated landing (GSAP/ScrollTrigger) — preloader, pinned horizontal scroll, kinetic typography. The classic entrance, the one you browse by scrolling."
      ),
      L(
        "PaulBot, ensuite : un assistant IA intégré, branché sur un LLM en streaming, qui répond à tes questions sur mon parcours, mes compétences et mes projets — et peut même t'emmener directement sur la bonne page.",
        "Then PaulBot: a built-in AI assistant, wired to a streaming LLM, that answers your questions about my background, skills and projects — and can even take you straight to the right page."
      ),
      L(
        "PaulBrain OS, la version immersive : un système d'exploitation dans le navigateur, avec bureau, fenêtres, dock, dossiers d'apps, sons d'interface synthétisés (Web Audio) — et un mode terminal pour les plus curieux, où l'on tape des commandes.",
        "PaulBrain OS, the immersive version: an operating system in the browser — desktop, windows, dock, app folders, synthesized UI sounds (Web Audio) — plus a terminal mode for the curious, where you type commands."
      ),
      L(
        "Le livre : ma biographie racontée comme un vrai livre — pages qui se tournent avec le son, tomes et chapitres, export PDF. Pour celles et ceux qui préfèrent lire une histoire du début à la fin.",
        "The book: my biography told like a real book — pages that turn with sound, parts and chapters, PDF export. For those who'd rather read a story from start to finish."
      ),
      L(
        "Le CV : interactif, bilingue, avec quatre profils (Full-Stack, Frontend, Backend, DevOps) et un export PDF en un clic. Et enfin ce blog, où je partage des billets tech, de la culture dev et quelques carnets de voyage.",
        "The résumé: interactive, bilingual, with four profiles (Full-Stack, Frontend, Backend, DevOps) and one-click PDF export. And finally this blog, where I share tech notes, dev culture and a few travel journals."
      ),
      L(
        "Sous le capot : Next.js, React et GSAP côté front, un backend NestJS pour l'assistant IA, Docker et CI/CD pour livrer. Le tout bilingue (FR/EN), accessible et optimisé pour le référencement.",
        "Under the hood: Next.js, React and GSAP on the front, a NestJS backend for the AI assistant, Docker and CI/CD to ship. All bilingual (FR/EN), accessible and SEO-optimized."
      ),
      L(
        "Un détail qui me tient à cœur : un guidage proactif, 100 % côté client (zéro requête serveur, zéro donnée qui part ailleurs). Si le site sent que tu tournes en rond — temps de lecture, scroll, pages parcourues — il te propose discrètement la page ou le parcours qui pourrait t'intéresser.",
        "One detail I care about: proactive guidance, 100% client-side (zero server request, zero data leaving your browser). If the site senses you're going in circles — reading time, scroll, pages visited — it gently suggests the page or path that might interest you."
      ),
      L("Alors, par quoi tu commences ? 👇", "So, where do you start? 👇"),
    ],
    ctas: [
      { label: L("Explorer PaulBrain OS", "Explore PaulBrain OS"), href: "/paulfolio", desc: L("Le portfolio en mode système d'exploitation", "The portfolio as an operating system") },
      { label: L("Lire le livre", "Read the book"), href: "/book", desc: L("Ma biographie, page à page", "My biography, page by page") },
      { label: L("Voir le CV interactif", "See the interactive résumé"), href: "/cv", desc: L("Bilingue, 4 profils, export PDF", "Bilingual, 4 profiles, PDF export") },
      { label: L("En savoir plus sur moi", "Learn more about me"), href: "/about-me", desc: L("Le parcours en détail", "The journey in detail") },
      { label: L("Le code sur GitHub", "The code on GitHub"), href: "https://github.com/luapdever", desc: L("Mes dépôts", "My repositories"), external: true },
      { label: L("Me contacter sur LinkedIn", "Reach me on LinkedIn"), href: "https://www.linkedin.com/in/paul-zannou-b253a2205", desc: L("Discutons d'un projet", "Let's talk about a project"), external: true },
    ],
  },
  {
    slug: "124-etages-burj-khalifa",
    date: "2025-07-20",
    category: "Voyage",
    tags: ["Dubaï", "Burj Khalifa", "Ambition"],
    title: L("124 étages gravis, et le sommet encore loin", "124 floors climbed, and the summit still far"),
    excerpt: L(
      "Au 124e étage du Burj Khalifa, t-shirt corporate sur le dos, à scruter les étages interdits d'accès — une jolie métaphore de la vie professionnelle.",
      "On the 124th floor of the Burj Khalifa, corporate t-shirt on, staring at the off-limits floors above — a neat metaphor for professional life."
    ),
    cover: "/blog/124-etages-burj-khalifa-1.jpg",
    images: ["/blog/124-etages-burj-khalifa-1.jpg", "/blog/124-etages-burj-khalifa-2.jpg", "/blog/124-etages-burj-khalifa-3.jpg"],
    content: [
      L(
        "Moi en t-shirt de la boîte, au 124e étage du Burj Khalifa, en train de scruter les étages supérieurs — interdits d'accès, évidemment. Enfin, autorisés… mais pas à n'importe qui 😅.",
        "Me in the company t-shirt, on the 124th floor of the Burj Khalifa, staring at the floors above — off-limits, of course. Well, allowed… but not to just anyone 😅."
      ),
      L(
        "« 124 étages gravis… mais le sommet est encore loin. Mon niveau de vie actuel ? C'est comme avoir une vue à couper le souffle, tout en sachant que le luxe — les toilettes en or, la machine à café qui fait vraiment des cappuccinos — est 39 étages plus haut. »",
        "“124 floors climbed… but the summit is still far. My current standard of living? It's like having a breathtaking view, while knowing that the luxury — the gold toilets, the coffee machine that actually makes cappuccinos — is 39 floors higher.”"
      ),
      L(
        "La vie professionnelle, c'est escalader un gratte-ciel avec son t-shirt corporate comme bouclier. Je lève les yeux vers les étages inaccessibles comme on regarde sa prochaine promotion : je te vois… mais t'es encore qu'une case sur l'organigramme.",
        "Professional life is climbing a skyscraper with your corporate t-shirt as a shield. I look up at the unreachable floors the way you look at your next promotion: I see you… but you're still just a box on the org chart."
      ),
      L(
        "Le chemin restant ? Plus long que la file d'attente au carrefour Toyota un vendredi à 19h. Si quelqu'un a un raccourci magique… j'offre le café. (Enfin, celui de chez Diallo. Mon budget est en révision jusqu'à la fin du mois.)",
        "The road ahead? Longer than the traffic jam at the Toyota junction on a Friday at 7pm. If anyone has a magic shortcut… coffee's on me. (Well, the one from Diallo's. My budget is under review until the end of the month.)"
      ),
    ],
  },
  {
    slug: "artiste-ou-developpeur",
    date: "2025-03-28",
    category: "Carrière",
    tags: ["Musique", "Développement", "Parcours"],
    title: L("Artiste ou développeur ? Les deux — il faut bien manger ET rêver", "Artist or developer? Both — you've got to eat AND dream"),
    excerpt: L(
      "La musique m'a sauvé la vie ; la programmation m'a sauvé de la famine. Petite mise au point sur cette double vie qu'on me prête.",
      "Music saved my life; programming saved me from starvation. A quick word about this double life people assume I lead."
    ),
    cover: "/blog/artiste-ou-developpeur-1.jpg",
    images: ["/blog/artiste-ou-developpeur-1.jpg"],
    content: [
      L(
        "« Artiste ou développeur ? » 🎤💻 — « Paul est développeur. » — « Non, il est artiste ! » — « Non… mais, oh, je fais les deux ! »",
        "“Artist or developer?” 🎤💻 — “Paul is a developer.” — “No, he's an artist!” — “No… but, oh, I do both!”"
      ),
      L(
        "La musique m'a sauvé la vie. Littéralement. Sans elle, j'aurais sombré dans le chagrin, comme un bateau sans moteur perdu en pleine mer.",
        "Music saved my life. Literally. Without it, I'd have sunk into grief, like a boat with no engine lost at sea."
      ),
      L(
        "Mais soyons honnêtes : c'est la programmation qui m'a sauvé de la famine. Quand mes chansons n'arrivaient même pas à traverser mon quartier, mon code, lui, traversait les frontières.",
        "But let's be honest: it's programming that saved me from starvation. When my songs couldn't even cross my neighbourhood, my code was crossing borders."
      ),
      L(
        "Moralité : j'écris des lignes de code le jour pour manger, et des lignes de texte la nuit pour vibrer. Si un jour je deviens riche, ce sera grâce à la musique… mais en attendant, c'est la programmation qui paye mon Internet pour uploader mes sons — ou écrire ce billet.",
        "Moral of the story: I write lines of code by day to eat, and lines of lyrics by night to feel alive. If I ever get rich, it'll be thanks to music… but for now, programming pays for the Internet I use to upload my tracks — or write this post."
      ),
      L("Alors, développeur ou artiste ? La réponse est simple : il faut bien manger ET rêver. 🚀", "So, developer or artist? The answer is simple: you've got to eat AND dream. 🚀"),
    ],
  },
  {
    slug: "ton-profil-ton-habit",
    date: "2024-08-11",
    category: "Carrière",
    tags: ["Personal branding", "LinkedIn", "GitHub"],
    title: L("Sur internet, ton profil, c'est ton habit", "Online, your profile is your outfit"),
    excerpt: L(
      "Tu peux être le meilleur codeur du pays : si ton profil ressemble à un SMS écrit en vitesse, on te zappe plus vite qu'une connexion lente.",
      "You can be the best coder in the country: if your profile looks like a rushed text message, people skip you faster than a slow connection."
    ),
    cover: "/blog/ton-profil-ton-habit-1.jpg",
    images: ["/blog/ton-profil-ton-habit-1.jpg", "/blog/ton-profil-ton-habit-2.jpg", "/blog/ton-profil-ton-habit-3.jpg"],
    content: [
      L(
        "Sur internet, c'est un peu comme au village : même si tu mets une soutane, on te jugera si tu portes des sandales trouées ! 😂",
        "Online, it's a bit like in the village: even in a cassock, people will judge you if you're wearing worn-out sandals! 😂"
      ),
      L(
        "Sur le web, ton profil, c'est ton habit. Tu peux avoir les meilleures compétences du monde, mais si ta photo de profil date de l'époque où Nokia était à la mode, ou si ton résumé ressemble à un SMS écrit en vitesse, on risque de te zapper plus vite qu'une connexion lente.",
        "On the web, your profile is your outfit. You can have the best skills in the world, but if your profile picture dates back to when Nokia was cool, or your résumé looks like a rushed text, people will skip you faster than a slow connection."
      ),
      L(
        "Imagine un développeur qui va en entretien avec un pantalon déchiré et un t-shirt délavé : même s'il est le meilleur codeur du pays, le recruteur regardera d'abord son « habit ». En ligne, c'est pareil. Prends soin de ton profil, mets tout à jour, montre tes meilleurs attributs.",
        "Picture a developer walking into an interview in torn trousers and a faded t-shirt: even if he's the best coder in the country, the recruiter looks at the “outfit” first. Online, it's the same. Take care of your profile, keep everything up to date, show your best attributes."
      ),
      L(
        "Alors, la prochaine fois que tu mets à jour ton LinkedIn ou ton GitHub, souviens-toi : c'est comme choisir la tenue parfaite pour un grand événement. Fais bonne impression — parce que, surtout en ligne, l'habit fait bien le moine.",
        "So next time you update your LinkedIn or GitHub, remember: it's like picking the perfect outfit for a big event. Make a good impression — because, especially online, clothes really do make the person."
      ),
    ],
  },
  {
    slug: "projets-innovants-et-chatgpt",
    date: "2024-07-29",
    category: "IA",
    tags: ["ChatGPT", "OpenAI", "Confidentialité", "Innovation"],
    title: L("Parler de ses projets innovants à ChatGPT : quels risques ?", "Sharing your innovative projects with ChatGPT: what are the risks?"),
    excerpt: L(
      "De plus en plus d'entreprises brainstorment leurs idées avec des IA comme ChatGPT. Mais partager ses projets les plus innovants avec ces outils, est-ce vraiment sans risque ?",
      "More and more companies brainstorm their ideas with AIs like ChatGPT. But is sharing your most innovative projects with these tools really risk-free?"
    ),
    cover: "/blog/projets-innovants-et-chatgpt-1.jpg",
    images: ["/blog/projets-innovants-et-chatgpt-1.jpg"],
    content: [
      L(
        "Aujourd'hui, de nombreuses entreprises et innovateurs utilisent des IA comme ChatGPT pour obtenir des idées, des conseils et de l'inspiration. Mais une question importante se pose : partager nos projets innovants avec ces IA comporte-t-il des risques ?",
        "Today, many companies and innovators use AIs like ChatGPT to get ideas, advice and inspiration. But an important question arises: does sharing our innovative projects with these AIs carry risks?"
      ),
      L(
        "Le potentiel est réel. ChatGPT est un outil puissant : il aide à développer des idées, à résoudre des problèmes complexes, à proposer des pistes d'innovation, et à traiter une quantité massive d'informations en un clin d'œil.",
        "The potential is real. ChatGPT is a powerful tool: it helps develop ideas, solve complex problems, suggest paths for innovation, and process a massive amount of information in the blink of an eye."
      ),
      L(
        "Mais il y a une inquiétude grandissante quant à la confidentialité des idées partagées. OpenAI pourrait-il, un jour, s'inspirer de ces idées ? Rien de tangible à ce jour, mais mieux vaut rester prudent et comprendre les politiques d'utilisation des données.",
        "But there's growing concern about the confidentiality of the ideas we share. Could OpenAI, one day, draw on those ideas? Nothing tangible so far, but it's wiser to stay cautious and understand the data-use policies."
      ),
      L(
        "Quelques précautions simples : évite de partager des détails trop précis ou sensibles ; utilise l'IA pour des conseils généraux plutôt que pour ta stratégie exacte ; et lis les politiques de confidentialité pour savoir comment tes données sont traitées.",
        "A few simple precautions: avoid sharing overly precise or sensitive details; use the AI for general advice rather than your exact strategy; and read the privacy policies to know how your data is handled."
      ),
      L(
        "En fin de compte, ChatGPT est un outil incroyable — mais comme tout outil puissant, il s'utilise avec discernement.",
        "In the end, ChatGPT is an incredible tool — but like any powerful tool, it should be used with discernment."
      ),
    ],
  },
  {
    slug: "developpeurs-beninois-et-cafe",
    date: "2024-07-28",
    category: "Dev",
    tags: ["Culture dev", "Humour", "Café"],
    title: L("Pourquoi les développeurs béninois aiment tant le café", "Why Beninese developers love coffee so much"),
    excerpt: L(
      "Sans leur dose de caféine, leur code devient plus buggé qu'un projet en fin de semestre. Petite ode au carburant secret du dev.",
      "Without their caffeine fix, their code gets buggier than an end-of-semester project. A little ode to the dev's secret fuel."
    ),
    cover: "/blog/developpeurs-beninois-et-cafe-1.jpg",
    images: ["/blog/developpeurs-beninois-et-cafe-1.jpg"],
    content: [
      L(
        "Pourquoi les développeurs béninois aiment-ils tellement le café ? Parce que sans leur dose de caféine, leur code devient plus buggé qu'un projet en fin de semestre ! 😂",
        "Why do Beninese developers love coffee so much? Because without their caffeine fix, their code gets buggier than an end-of-semester project! 😂"
      ),
      L(
        "Imaginez notre ami développeur au boulot. Sans café : « Oh là là, je ne vois même pas les erreurs dans mon code. C'est comme essayer de lire du fon écrit en minuscule ! »",
        "Picture our developer friend at work. No coffee: “Oh dear, I can't even see the errors in my code. It's like trying to read Fon written in tiny letters!”"
      ),
      L(
        "Premier café : « Ah, ça y est, je me sens mieux. Mon cerveau démarre enfin, comme un vieux moteur de taxi qui a besoin d'un bon coup de clé. » Deuxième café : « Maintenant, je suis prêt à débugger tout ce qui bouge. Les bugs peuvent venir, je suis un guerrier. »",
        "First coffee: “Ah, there we go, I feel better. My brain finally starts, like an old taxi engine that needs a good crank.” Second coffee: “Now I'm ready to debug anything that moves. Bring on the bugs, I'm a warrior.”"
      ),
      L(
        "Sans café, leur code est aussi chaotique qu'un marché en pleine journée. Avec du café, ils deviennent des machines à coder. Alors la prochaine fois que vous voyez un dev avec sa tasse : ce n'est pas juste une boisson, c'est une potion magique pour coder sans stress. ☕",
        "Without coffee, their code is as chaotic as a market at midday. With coffee, they become coding machines. So next time you see a dev with a mug: it's not just a drink, it's a magic potion for stress-free coding. ☕"
      ),
    ],
  },
  {
    slug: "developpeur-critique-d-albums",
    date: "2024-06-23",
    category: "Dev",
    tags: ["Culture dev", "Musique", "Humour"],
    title: L("Le développeur, meilleur critique d'albums (il connaît les plantages)", "The developer, the best album critic (he knows crashes)"),
    excerpt: L(
      "Parce qu'il sait exactement ce que ça fait quand quelque chose plante. Diagnostic musical, avec ou sans « stack trace ».",
      "Because he knows exactly what it feels like when something crashes. A musical diagnosis, with or without a stack trace."
    ),
    cover: "/blog/developpeur-critique-d-albums-1.jpg",
    images: ["/blog/developpeur-critique-d-albums-1.jpg"],
    content: [
      L(
        "Pourquoi les développeurs sont-ils les meilleurs critiques d'albums ? Parce qu'ils comprennent vraiment ce que signifie un « plantage » ! 🎶💾",
        "Why are developers the best album critics? Because they truly understand what a “crash” means! 🎶💾"
      ),
      L(
        "Imaginez un développeur écoutant un nouvel album. Première piste : « Ah, ça commence bien, un bon rythme… » Deuxième : « Hmm, transition intéressante, mais ça passe. » Troisième : « Attends… c'est quoi ce bruit ? On dirait un bug sonore ! » Quatrième : « Oh non, l'album a carrément crashé. Échec critique ! »",
        "Picture a developer listening to a new album. Track one: “Ah, good start, nice beat…” Track two: “Hmm, interesting transition, but it works.” Track three: “Wait… what's that noise? Sounds like an audio bug!” Track four: “Oh no, the album straight-up crashed. Critical failure!”"
      ),
      L(
        "Les développeurs savent apprécier une belle mélodie, mais ils repèrent aussi les « bugs » musicaux : un solo mal accordé, une ligne de basse incohérente, des paroles qui ne compilent pas. Et comme avec leur code, ils n'ont pas peur de dire que quelque chose ne fonctionne pas.",
        "Developers can appreciate a beautiful melody, but they also spot the musical “bugs”: an out-of-tune solo, an inconsistent bassline, lyrics that just won't compile. And like with their code, they're not afraid to say when something doesn't work."
      ),
      L(
        "La dernière fois, j'ai réécouté mon propre album et je me suis dit : « Merde, avec ça je serais un gros bug musical. » Je vais quand même reprendre la musique, no stress 😎.",
        "The other day, I replayed my own album and thought: “Damn, with this I'd be one big musical bug.” I'm getting back into music anyway, no stress 😎."
      ),
    ],
  },
  {
    slug: "pourquoi-les-developpeurs-ont-froid",
    date: "2024-05-25",
    category: "Dev",
    tags: ["Culture dev", "Humour"],
    title: L("Pourquoi les développeurs ont toujours froid", "Why developers are always cold"),
    excerpt: L(
      "Parce qu'ils passent la journée devant les fenêtres. Non, pas celles du bureau — celles du navigateur.",
      "Because they spend all day in front of windows. No, not the office ones — the browser windows."
    ),
    cover: "/blog/pourquoi-les-developpeurs-ont-froid-1.jpg",
    images: ["/blog/pourquoi-les-developpeurs-ont-froid-1.jpg"],
    content: [
      L(
        "« Pourquoi les développeurs ont-ils toujours froid ? Parce qu'ils passent toute la journée devant les fenêtres ! » ❄️😂",
        "“Why are developers always cold? Because they spend all day in front of windows!” ❄️😂"
      ),
      L(
        "Vous pensez sûrement au cliché du développeur enfermé dans son bureau, les yeux rivés sur l'écran… mais buvez de l'eau : ce sont en réalité les « fenêtres » de son navigateur qu'il regarde avec tant d'attention. Yes, browser windows.",
        "You're probably picturing the cliché of the developer locked in his office, eyes glued to the screen… but drink some water: it's actually the browser “windows” he's staring at so intently. Yes, browser windows."
      ),
      L(
        "Entre les lignes de code et les bugs à traquer, on oublie facilement que le soleil brille toujours quelque part dehors. Alors la prochaine fois que vous croisez un développeur grelottant, offrez-lui un café bien chaud — ou une paire de lunettes anti-reflets. ☕👓",
        "Between the lines of code and the bugs to hunt, it's easy to forget the sun is still shining somewhere outside. So next time you meet a shivering developer, offer them a hot coffee — or a pair of anti-glare glasses. ☕👓"
      ),
      L(
        "Blague à part : j'ai vraiment pris froid cette nuit-là, parce que j'avais laissé mes fenêtres ouvertes 😂.",
        "Jokes aside: I really did catch a cold that night, because I'd left my windows open 😂."
      ),
    ],
  },
  {
    slug: "femmes-developpeuses-fonctions-js",
    date: "2024-03-08",
    category: "Dev",
    tags: ["Culture dev", "JavaScript", "Journée de la femme"],
    title: L("Les femmes développeuses sont comme des fonctions JavaScript", "Women developers are like JavaScript functions"),
    excerpt: L(
      "Réutilisables, modulables, indispensables — et capables de transformer le chaos en ordre en une seule ligne de code.",
      "Reusable, modular, indispensable — and able to turn chaos into order in a single line of code."
    ),
    cover: "/blog/femmes-developpeuses-fonctions-js-1.jpg",
    images: ["/blog/femmes-developpeuses-fonctions-js-1.jpg"],
    content: [
      L("Pourquoi les femmes développeuses sont-elles comme des fonctions JavaScript ?", "Why are women developers like JavaScript functions?"),
      L(
        "Parce qu'elles savent résoudre des problèmes complexes en un clin d'œil et transformer le chaos en ordre avec une seule ligne de code. Et comme une fonction bien écrite, elles sont réutilisables, modulables et indispensables dans n'importe quel projet.",
        "Because they solve complex problems in a blink and turn chaos into order with a single line of code. And like a well-written function, they're reusable, modular and indispensable in any project."
      ),
      L(
        "Joyeuse Journée internationale de la femme à toutes les femmes — et à toutes les développeuses qui jonglent avec les variables de la vie avec grâce et efficacité. 💫",
        "Happy International Women's Day to all women — and to every woman developer who juggles life's variables with grace and efficiency. 💫"
      ),
    ],
  },
  {
    slug: "portfolio-comme-un-os-3-systeme-fenetres",
    date: "2022-12-17",
    category: "Projet",
    tags: ["React", "Custom hooks", "CSS", "Devlog"],
    title: L("Portfolio comme un OS #3 — le système de fenêtres", "Portfolio as an OS #3 — the window system"),
    excerpt: L(
      "Les petites fenêtres qui s'ouvrent quand on clique sur une icône : état des fenêtres ouvertes, z-index du premier plan, et un hook React maison pour tout orchestrer.",
      "The little windows that open when you click an icon: state of open windows, foreground z-index, and a home-made React hook to orchestrate it all."
    ),
    cover: "/blog/portfolio-comme-un-os-3-systeme-fenetres-1.jpg",
    images: ["/blog/portfolio-comme-un-os-3-systeme-fenetres-1.jpg", "/blog/portfolio-comme-un-os-3-systeme-fenetres-2.jpg", "/blog/portfolio-comme-un-os-3-systeme-fenetres-3.jpg"],
    content: [
      L(
        "Aujourd'hui, on parle du système de fenêtres — ces petites fenêtres qui s'ouvrent quand tu cliques sur une icône du bureau.",
        "Today we're talking about the window system — those little windows that open when you click a desktop icon."
      ),
      L(
        "Chaque icône écoute un événement de clic qui appelle une fonction d'ouverture, basée sur l'attribut « contenu » stocké dans la structure de données de l'icône. Pour toutes les fenêtres à ouvrir, j'ai défini sur la vue un état : une liste d'objets { identifiant de l'icône, window (les attributs de l'icône cliquée) }. Au clic, on insère ces attributs dans la liste, et un composant se charge d'afficher les fenêtres ouvertes — avec un bon coup de CSS.",
        "Each icon listens for a click event that calls an open function, based on the “content” attribute stored in the icon's data structure. For every window to open, I defined a state on the view: a list of objects { icon id, window (the clicked icon's attributes) }. On click, those attributes are pushed into the list, and a component renders the open windows — with a good dose of CSS."
      ),
      L(
        "Comme une fenêtre subit beaucoup d'actions (ouverture, fermeture, déplacement, redimensionnement…), j'ai créé un hook personnalisé en React — un truc que je te conseille vivement. Un autre état retient l'identifiant de la fenêtre au premier plan, pour lui donner le plus grand z-index et faire passer son contenu devant les autres.",
        "Since a window goes through many actions (open, close, move, resize…), I built a custom React hook — something I highly recommend. Another piece of state remembers the id of the foreground window, to give it the highest z-index and bring its content in front of the others."
      ),
      L(
        "Plusieurs autres fonctionnalités vivent dans ce hook. Voilà pour le système de fenêtres — le prochain billet parlera de la barre des tâches. Je reste ouvert à tout commentaire et apport. ✊🏾",
        "Several other features live inside that hook. That's it for the window system — the next post will cover the taskbar. I'm open to any comment or input. ✊🏾"
      ),
    ],
  },
  {
    slug: "portfolio-comme-un-os-2-icones-bureau",
    date: "2022-12-04",
    category: "Projet",
    tags: ["JSON", "React", "CSS", "Devlog"],
    title: L("Portfolio comme un OS #2 — les icônes du bureau", "Portfolio as an OS #2 — the desktop icons"),
    excerpt: L(
      "Chaque icône du bureau ouvre une fenêtre : site intégré, terminal, contact, App Store… Tout part d'un simple tableau d'objets JSON.",
      "Each desktop icon opens a window: embedded site, terminal, contact, App Store… It all starts from a simple array of JSON objects."
    ),
    cover: "/blog/portfolio-comme-un-os-2-icones-bureau-1.jpg",
    images: ["/blog/portfolio-comme-un-os-2-icones-bureau-1.jpg", "/blog/portfolio-comme-un-os-2-icones-bureau-2.jpg", "/blog/portfolio-comme-un-os-2-icones-bureau-3.jpg"],
    content: [
      L(
        "Mon site personnel se présente comme un embryon de système d'exploitation avec lequel on interagit. Chaque icône du bureau ouvre une fenêtre : un site web intégré (iframe), le terminal, le programme de contact, mon App Store…",
        "My personal site presents itself as an embryo of an operating system you can interact with. Each desktop icon opens a window: an embedded website (iframe), the terminal, the contact program, my App Store…"
      ),
      L(
        "J'ai créé une liste de données structurées sous forme de tableau d'objets JSON. Les propriétés : un ID, la source de l'image de l'icône, le titre du programme, la couleur de fond de l'icône, un attribut disant si c'est un site intégré ou un programme interne, l'URL à intégrer le cas échéant, le contenu de la fenêtre et ses propriétés (je te l'avais dit, c'est comme un OS 😁).",
        "I created a list of structured data as an array of JSON objects. The properties: an ID, the icon's image source, the program title, the icon's background color, an attribute saying whether it's an embedded site or an internal program, the URL to embed if so, the window's content and its properties (told you, it's like an OS 😁)."
      ),
      L(
        "Ça fait beaucoup de propriétés juste pour afficher des icônes — concentrons-nous sur l'ID, l'image, le titre et la couleur de fond. C'est à partir de ce tableau que j'affiche les icônes du bureau, une liste que je peux compléter à tout moment dans un seul fichier. Et derrière, encore un peu de coloriage CSS pour la disposition.",
        "That's a lot of properties just to display icons — let's focus on the ID, image, title and background color. It's from this array that I render the desktop icons, a list I can extend at any time in a single file. And behind it, a little more CSS coloring for the layout."
      ),
      L(
        "Voilà pour le système des icônes de bureau. Le prochain billet parlera des propriétés restantes et de leur rôle dans le système de fenêtres. ✌🏾",
        "That's it for the desktop icon system. The next post will cover the remaining properties and their role in the window system. ✌🏾"
      ),
    ],
  },
  {
    slug: "portfolio-comme-un-os-1-generalite",
    date: "2022-11-26",
    category: "Projet",
    tags: ["Portfolio", "IHM", "Devlog"],
    title: L("Portfolio comme un OS #1 — la genèse", "Portfolio as an OS #1 — the genesis"),
    excerpt: L(
      "Et si un portfolio ressemblait à un système d'exploitation ? Clic, double-clic, clic droit, molette… Présentation de la toute première version.",
      "What if a portfolio looked like an operating system? Click, double-click, right-click, scroll… A look at the very first version."
    ),
    cover: "/blog/portfolio-comme-un-os-1-generalite-1.jpg",
    images: ["/blog/portfolio-comme-un-os-1-generalite-1.jpg", "/blog/portfolio-comme-un-os-1-generalite-2.jpg", "/blog/portfolio-comme-un-os-1-generalite-3.jpg"],
    content: [
      L(
        "Aujourd'hui, je me demandais quoi partager, et je me suis dit : pourquoi ne pas présenter mon portfolio dans son entièreté ? Déployé il y a quelques semaines, « Dever » me présente en quelques mots et montre mes compétences et réalisations sous la forme d'un écran de tablette avec lequel on interagit (IHM — interface homme-machine).",
        "Today I was wondering what to share, and thought: why not present my portfolio in full? Deployed a few weeks ago, “Dever” introduces me in a few words and shows my skills and work as a tablet-like screen you interact with (HMI — human-machine interface)."
      ),
      L(
        "Tu n'as qu'à cliquer, double-cliquer, faire un clic droit ou rouler la molette pour ouvrir une fenêtre, voir un menu contextuel, lire le contenu d'un site intégré (iframe). Pour les amateurs de shell, un clic sur l'icône du terminal — épinglé à la barre des tâches — permet de saisir des commandes pré-configurées (assez basiques 😁) pour voir des infos à mon sujet.",
        "Just click, double-click, right-click or scroll to open a window, see a context menu, read the content of an embedded site (iframe). For shell lovers, a click on the terminal icon — pinned to the taskbar — lets you type pre-configured commands (pretty basic 😁) to see info about me."
      ),
      L(
        "Voilà à quoi ressemble mon site personnel. La meilleure expérience reste sur un grand écran. Je te réserve une série de billets pour t'expliquer, point par point, comment j'ai procédé — et te partager quelques idées au passage. 🌚",
        "That's what my personal site looks like. The best experience is still on a big screen. I've got a series of posts lined up to explain, step by step, how I went about it — and share a few ideas along the way. 🌚"
      ),
      L(
        "Note de 2026 : cette première version « OS » a beaucoup grandi depuis. Elle est l'ancêtre direct de PaulBrain OS que tu peux explorer aujourd'hui.",
        "2026 note: this first “OS” version has grown a lot since. It's the direct ancestor of the PaulBrain OS you can explore today."
      ),
    ],
  },
  {
    slug: "python-exercice-traduction-entreprise",
    date: "2022-11-11",
    category: "Dev",
    tags: ["Python", "i18n", "PHP", "Script"],
    title: L("Python : un petit exercice de traduction en entreprise", "Python: a small translation exercise at work"),
    excerpt: L(
      "Deux fichiers de langue, 3000 lignes chacun, des textes non traduits. Un script Python (tuples, sets, dictionnaires) pour trouver ce qui manque.",
      "Two language files, 3000 lines each, untranslated strings. A Python script (tuples, sets, dictionaries) to find what's missing."
    ),
    cover: "/blog/python-exercice-traduction-entreprise-1.jpg",
    images: ["/blog/python-exercice-traduction-entreprise-1.jpg", "/blog/python-exercice-traduction-entreprise-2.jpg"],
    content: [
      L(
        "Il n'y a pas longtemps, j'ai débuté la programmation en Python. Je me demandais bien d'où venait ce fantasme des développeurs pour ce langage 🐍 — sûrement un venin de naissance 😁. En réalité, ce que Python offre, c'est une expérience développeur (DX) unique, dont j'ai eu un avant-goût.",
        "Not long ago, I started programming in Python. I really wondered where developers' obsession with this language came from 🐍 — probably a venom you're born with 😁. In reality, what Python offers is a unique developer experience (DX), which I got a taste of."
      ),
      L(
        "En entreprise, on avait un problème : des textes non traduits en français. Il existe deux fichiers de langue contenant tous les textes d'une application, structurés en tableaux associatifs PHP — au moins 3000 lignes chacun.",
        "At work, we had a problem: strings not translated into French. There are two language files holding all of an app's strings, structured as PHP associative arrays — at least 3000 lines each."
      ),
      L(
        "J'ai écrit un script qui lit le contenu de chaque fichier, le restructure sous forme de tuples, sets et dictionnaires en Python. Ensuite je fais la différence entre les deux tuples (anglais et français) pour obtenir la liste des clés présentes côté anglais mais absentes côté français. Je stocke cette liste dans un nouveau fichier, « notTranslated.php », prêt à être traduit via une API — soit 381 lignes restantes.",
        "I wrote a script that reads each file's content and restructures it into tuples, sets and dictionaries in Python. Then I diff the two tuples (English and French) to get the list of keys present on the English side but missing on the French side. I store that list in a new file, “notTranslated.php”, ready to be translated via an API — 381 remaining lines."
      ),
      L(
        "Cet exercice m'a appris à lire dans les fichiers et à manipuler les séquences (chaînes, sets, tuples, listes) et les dictionnaires en Python. Un petit exercice plutôt fun. 🙌🏾",
        "This exercise taught me to read from files and manipulate sequences (strings, sets, tuples, lists) and dictionaries in Python. A rather fun little exercise. 🙌🏾"
      ),
    ],
  },
  {
    slug: "threejs-camera-et-sa-cible",
    date: "2022-11-06",
    category: "Dev",
    tags: ["Three.js", "3D", "WebGL"],
    title: L("Three.js : la caméra et sa cible", "Three.js: the camera and its target"),
    excerpt: L(
      "Une semaine bloqué sur un concept évident : plutôt que de bouger la caméra, on bouge sa cible. Retour sur un déclic pour tout débutant en 3D.",
      "A week stuck on an obvious concept: rather than moving the camera, you move its target. A lightbulb moment for any 3D beginner."
    ),
    cover: "/blog/threejs-camera-et-sa-cible-1.jpg",
    images: ["/blog/threejs-camera-et-sa-cible-1.jpg", "/blog/threejs-camera-et-sa-cible-2.jpg", "/blog/threejs-camera-et-sa-cible-3.jpg"],
    content: [
      L(
        "J'ai passé une semaine bloqué sur un concept tellement évident que j'ai mis du temps à le comprendre : la caméra et sa cible.",
        "I spent a week stuck on a concept so obvious it took me a while to grasp: the camera and its target."
      ),
      L(
        "Que ce soit dans la vie ou dans une réalité virtuelle, une caméra a toujours une cible ; pendant un temps donné, elle bouge et tourne autour d'elle. Un changement brusque et non transitionné de cette cible donne une expérience désagréable — sauf si c'est scénarisé.",
        "Whether in real life or in a virtual reality, a camera always has a target; over time, it moves and rotates around it. An abrupt, un-transitioned change of that target gives an unpleasant experience — unless it's scripted."
      ),
      L(
        "La solution évidente : pourquoi bouger la caméra si elle suit une cible ? Il est plus intéressant de bouger la cible. Mais dans une scène, tout objet ne peut pas changer de position. Je me suis alors demandé : quelle est la cible initiale de ma caméra ? Le centre du monde ? Un rayon de soleil ? 🌚",
        "The obvious solution: why move the camera if it follows a target? It's more interesting to move the target. But in a scene, not every object can change position. So I asked myself: what is my camera's initial target? The center of the world? A sunbeam? 🌚"
      ),
      L(
        "En fouillant les propriétés de ma caméra, j'ai découvert que la cible était en fait un vecteur invisible positionné au centre de la scène — t(0, 0, 0) par défaut. Une cible que je peux déplacer à volonté, avec de bonnes transitions. J'en parle parce que tout débutant en 3D ou en Three.js peut tomber sur ce genre de blocage.",
        "Digging into my camera's properties, I discovered the target was actually an invisible vector positioned at the center of the scene — t(0, 0, 0) by default. A target I can move at will, with smooth transitions. I mention it because any 3D or Three.js beginner can hit this kind of wall."
      ),
    ],
  },
  {
    slug: "creative-coding-le-web-devient-art",
    date: "2022-10-29",
    category: "Dev",
    tags: ["Creative coding", "Web", "Art"],
    title: L("Creative coding : quand le développement web devient un art", "Creative coding: when web development becomes an art"),
    excerpt: L(
      "Il n'existe pas de limite à l'imagination. Les créatifs codeurs bousculent le développement web avec des créations toujours plus originales.",
      "There's no limit to imagination. Creative coders are shaking up web development with ever more original creations."
    ),
    cover: "/blog/creative-coding-le-web-devient-art-1.jpg",
    images: ["/blog/creative-coding-le-web-devient-art-1.jpg", "/blog/creative-coding-le-web-devient-art-2.jpg", "/blog/creative-coding-le-web-devient-art-3.jpg"],
    content: [
      L(
        "Il n'existe pas de limite à l'imagination. Cet état de fait impacte énormément chaque aspect de nos vies — et le développement web ne fait pas exception, surtout avec l'arrivée des créatifs codeurs.",
        "There's no limit to imagination. That fact hugely impacts every aspect of our lives — and web development is no exception, especially with the arrival of creative coders."
      ),
      L(
        "Ces derniers bousculent le monde du développement avec des créations toujours plus originales les unes que les autres : sites qui réagissent au mouvement, typographies qui vivent, univers 3D dans le navigateur.",
        "They shake up the world of development with creations each more original than the last: sites that react to motion, typography that comes alive, 3D worlds in the browser."
      ),
      L(
        "C'est quoi, le codage créatif ? Comment devenir un créatif codeur ? En deux mots : c'est utiliser le code comme un pinceau, là où l'objectif n'est pas seulement de « faire fonctionner », mais de faire ressentir. C'est cette frontière entre l'ingénierie et l'art qui m'anime — et qu'on retrouve un peu partout dans ce portfolio.",
        "What is creative coding? How do you become a creative coder? In two words: it's using code like a brush, where the goal isn't just to “make it work”, but to make people feel. It's that border between engineering and art that drives me — and that you'll find all over this portfolio."
      ),
    ],
  },
];

// Durée de lecture estimée (≈ 200 mots/min), calculée sur le FR.
export function readingMinutes(post) {
  const words = post.content.map((c) => (c && c.fr !== undefined ? c.fr : c)).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const getPost = (slug) => blogPosts.find((p) => p.slug === slug);
