/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { useLandingLang } from "../src/context/landingLang";
import styles from "../styles/specific/book/book.module.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-book" });

const T = (fr, en) => ({ fr, en });
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/* --------- Son de page qui se tourne (fichier audio réel) --------- */
let pageAudio = null;
function playPageTurn() {
  try {
    if (typeof Audio === "undefined") return; // SSR / audio indisponible
    if (!pageAudio) {
      pageAudio = new Audio("/songs/flipping-book-page.mp3");
      pageAudio.preload = "auto";
      pageAudio.volume = 0.55;
    }
    pageAudio.currentTime = 0; // rejoue depuis le début à chaque tour
    const p = pageAudio.play();
    if (p && p.catch) p.catch(() => {}); // ignore les blocages autoplay
  } catch { /* audio indisponible */ }
}

/* ============================ CONTENU DU LIVRE ============================ */
const LEAVES = [
  // ---- Couverture premium (typographique) ----
  { kind: "cover" },

  // ---- Page de titre & édition ----
  { kind: "edition" },

  // ---- Avant-propos ----
  {
    kind: "foreword",
    kicker: T("Avant-propos", "Foreword"),
    title: T("Au lecteur", "To the Reader"),
    paras: [
      T("Ce livre n'a pas la prétention d'un traité. C'est le récit sincère de mon chemin — celui d'un ingénieur qui a cru, très tôt, qu'une idée ne vaut que si l'on ose la bâtir.", "This book makes no claim to be a treatise. It is the sincere account of my path — that of an engineer who believed, very early, that an idea is worth only as much as one dares to build it."),
      T("Vous y trouverez trois tomes : mon parcours, mes réalisations et leurs leçons, puis un cabinet de lecture — car on ne bâtit bien qu'en se nourrissant des pages des autres. Qu'un débutant y trouve de quoi commencer, et un pair de quoi échanger : ce sera déjà beaucoup.", "You will find three parts here: my journey, my works and their lessons, then a reading room — for one builds well only by feeding on the pages of others. If a beginner finds a place to start, and a peer something to discuss, that will already be much."),
    ],
    sign: T("P. M. Zannou — Cotonou", "P. M. Zannou — Cotonou"),
  },

  // ---- Sommaire ----
  { kind: "toc" },

  // ==================== TOME I ====================
  { kind: "part", id: "tome1", roman: T("Tome Premier", "Part One"), title: T("Le Parcours", "The Journey"), epigraph: T("« On n'apprend jamais mieux qu'en construisant pour de vrai. »", "“Nothing teaches better than building for real.”") },

  { kind: "chapter", chap: 1, kicker: T("2019 · Les commencements", "2019 · The Beginnings"), title: T("Apprendre, sans filet", "Learning Without a Net"), img: "/history/01-benevolat.jpeg", caption: T("Les débuts — bénévolat, 2019.", "The beginnings — volunteering, 2019."), paras: [
    T("Tout commence sans budget, sans titre, sans certitude — mais avec une soif d'apprendre qui me tient lieu de capital. Bénévole, je mets la main à tout ce qui se présente, convaincu qu'on n'apprend jamais mieux qu'en bâtissant pour de vrai.", "It all begins with no budget, no title, no certainty — but with a thirst to learn that serves me as capital. As a volunteer, I turn my hand to whatever comes, convinced that nothing teaches better than building for real."),
  ] },
  { kind: "chapter", kicker: T("2019 · Les commencements — suite", "2019 · The Beginnings — cont."), paras: [
    T("Le tout premier appel vient d'un ami, Jafette, qui me demande un coup de main sur un site touchant à la cryptomonnaie. Je m'y jette avec joie : j'y apprends le C, le C++, le Java, le PHP — et surtout, on me sollicite. Dans ma bande du quartier, j'étais le seul à coder ; ce jour-là, je me sens utile, presque important.", "The very first call comes from a friend, Jafette, who asks me to lend a hand on a site touching on cryptocurrency. I throw myself into it with joy: I learn C, C++, Java, PHP — and above all, I am asked. In my neighbourhood crew I was the only one who coded; that day, I feel useful, almost important."),
    T("De ces mois modestes, je retiens une leçon qui ne me quittera plus : la compétence ne se décrète pas, elle se gagne — ligne après ligne, café après café.", "From those humble months I draw a lesson that never leaves me: skill is not decreed, it is earned — line by line, coffee by coffee."),
  ] },

  { kind: "chapter", chap: 2, kicker: T("2020 · L'apprentissage", "2020 · The Apprenticeship"), title: T("La rencontre du réel", "Meeting Reality"), img: "/history/02-stage.jpg", caption: T("Le stage, 2020.", "The internship, 2020."), paras: [
    T("Vient le temps du stage, et avec lui la rencontre avec le réel. J'y découvre que « ça marche sur ma machine » n'a jamais convaincu personne, et que le code n'a de valeur que livré, éprouvé, partagé.", "Then comes the internship, and with it a meeting with reality. I discover that “it works on my machine” has never convinced anyone, and that code has worth only once shipped, tested, shared."),
    T("J'apprends la rigueur des environnements, la discipline des versions, l'humilité du débogage. L'artisan, peu à peu, cède la place à l'ingénieur.", "I learn the rigour of environments, the discipline of versions, the humility of debugging. The craftsman in me slowly gives way to the engineer."),
  ] },

  { kind: "chapter", chap: 3, kicker: T("2021 · Le premier engagement", "2021 · The First Commitment"), title: T("La première pierre", "The First Stone"), img: "/history/03-premier-contrat.jpg", caption: T("Premier contrat, 2021.", "First contract, 2021."), paras: [
    T("Le premier contrat arrive, syndrome de l'imposteur en prime. Chez Octogone Trading, je consolide mes bases — PHP, Vue.js et Nuxt.js — et je fais mes tout premiers pas en Node.js, sans encore rien y maîtriser. Qu'importe : je comprends déjà qu'un pixel bien placé vaut parfois mille explications.", "The first contract arrives, impostor syndrome included. At Octogone Trading, I consolidate my foundations — PHP, Vue.js and Nuxt.js — and take my very first, unsteady steps in Node.js, mastering nothing yet. No matter: I already learn that a well-placed pixel is sometimes worth a thousand explanations."),
  ] },
  { kind: "chapter", kicker: T("2021 · Le premier engagement — suite", "2021 · The First Commitment — cont."), paras: [
    T("Mon tout premier contrat ne pesait que cent mille francs, et pourtant il m'a bouleversé. Je me sentais important ; je me voyais déjà « le futur Dangoté », promis à un empire. Le rêve n'aura tenu que quatre mois — mais il m'aura appris à rêver grand, puis à me remettre au travail pour de vrai.", "My very first contract was worth a mere hundred thousand francs, and yet it moved me deeply. I felt important; I already saw myself as “the future Dangote,” bound for an empire. The dream lasted only four months — but it taught me to dream big, then to get back to work for real."),
    T("Je n'en ai pas encore conscience, mais je viens de poser la première pierre d'une carrière qui mêlera, sans relâche, exigence technique et souci de l'utilisateur.", "I don't yet know it, but I have just laid the first stone of a career that will relentlessly blend technical rigour with care for the user."),
  ] },

  { kind: "chapter", chap: 4, kicker: T("2022 · L'exigence", "2022 · The Standard"), title: T("Le changement d'échelle", "A Change of Scale"), img: "/history/04-concentration.jpeg", caption: T("Concentration, 2022.", "Focus, 2022."), paras: [
    T("Chez KAMGOKO Technologies, l'échelle change. Au fil des projets menés pour MTN, Moov, Celtiis, Orabank et d'autres, j'acquiers un large éventail de compétences : sites corporate, applications Selfcare consultées par des milliers d'abonnés, intégrations exigeantes.", "At KAMGOKO Technologies, the scale changes. Through projects for MTN, Moov, Celtiis, Orabank and others, I acquire a broad range of skills: corporate sites, Selfcare apps used by thousands of subscribers, demanding integrations."),
    T("Concentration maximale, production sous tension : j'apprends que la fiabilité n'est pas une option, mais une promesse tenue à chaque déploiement.", "Full focus, production under pressure: I learn that reliability is not an option but a promise kept with every deployment."),
  ] },

  { kind: "chapter", chap: 5, kicker: T("2023 · La maturité", "2023 · Coming of Age"), title: T("Qu'on lui confie le critique", "Entrusted With the Critical"), img: "/history/05-second-contrat.jpeg", caption: T("Deuxième contrat, 2023.", "Second contract, 2023."), paras: [
    T("Je m'affirme comme ingénieur. Pour France Assist, j'architecture Emilia Cross — un site de rencontre où la relation se noue en visio, sécurisé de bout en bout : streaming vidéo, vérification KYC, paiements et reversements (payouts), contrôle d'accès (RBAC). Rien n'est laissé au hasard.", "I come into my own as an engineer. For France Assist I architect Emilia Cross — a dating site where connections are made over live video, secured end to end: video streaming, KYC verification, payments and payouts, access control (RBAC). Nothing is left to chance."),
    T("En parallèle, une institution publique me confie un chantier sensible, couvert par la confidentialité. La preuve, s'il en fallait, qu'on me confie désormais l'essentiel.", "In parallel, a public institution entrusts me with a sensitive, confidential project. Proof, if any were needed, that I am now handed what matters most."),
  ] },

  { kind: "chapter", chap: 6, kicker: T("2024 · Les alliances", "2024 · Alliances"), title: T("Loin du clavier", "Far From the Keyboard"), img: "/history/06.jpeg", caption: T("L'équipe, 2024.", "The team, 2024."), paras: [
    T("Aucune œuvre solide ne se bâtit seul. Je l'ai compris : le meilleur code se pense souvent loin du clavier, entouré des bonnes personnes. Designers, développeurs, chefs de projet — j'apprends à faire équipe autant qu'à faire système.", "No solid work is built alone. I have understood it: the best code is often thought up far from the keyboard, surrounded by the right people. Designers, developers, project leads — I learn to build teams as much as systems."),
    T("De ces collaborations naît une conviction : la technique n'a de sens que mise au service d'un dessein commun.", "From these collaborations a conviction is born: technology only makes sense in the service of a shared purpose."),
  ] },

  { kind: "chapter", chap: 7, kicker: T("2025 · Le tournant", "2025 · The Turning Point"), title: T("Le temps de la synthèse", "The Time of Synthesis"), img: "/history/07-enjoy-trip.jpeg", caption: T("La récompense, 2025.", "The reward, 2025."), paras: [
    T("Vient enfin le temps de la synthèse. J'embrasse l'intelligence artificielle et je conçois PaulBot, un assistant capable de raconter mon parcours — celui-là même qui, peut-être, vous a accueilli. Mon portfolio devient une œuvre à part entière, entre système d'exploitation et récit.", "At last comes the time of synthesis. I embrace artificial intelligence and build PaulBot, an assistant able to tell my story — the very one that, perhaps, welcomed you. My portfolio becomes a work in its own right, between operating system and narrative."),
    T("On ne vit pas que de commits : je m'accorde le repos du bâtisseur, avant de repartir. Car une promesse, chez moi, en appelle toujours une autre.", "One does not live on commits alone: I grant myself the builder's rest, before setting off again. For with me, one promise always calls forth another."),
  ] },

  { kind: "chapter", chap: 8, kicker: T("Aujourd'hui", "Today"), title: T("Fidèle à la promesse", "Faithful to the Promise"), paras: [
    T("Aujourd'hui, je suis ingénieur logiciel full-stack : web, mobile, temps réel, intelligence artificielle et DevOps. Cinq années d'expérience, une vingtaine de projets, trois pays. Mais les chiffres disent peu de l'essentiel : la constance.", "Today, I am a full-stack software engineer: web, mobile, real-time, artificial intelligence and DevOps. Five years of experience, some twenty projects, three countries. Yet numbers say little of what matters most: constancy."),
    T("J'ai aussi appris à renoncer. La musique, cette passion qui me faisait vibrer, ne payait ni mes factures ni mes courses ; je l'ai mise de côté pour survivre. Ce n'est pas un adieu, seulement une parenthèse : j'y reviendrai, sous une forme ou une autre.", "I have also learned to let go. Music, that passion which made me vibrate, paid neither my bills nor my groceries; I set it aside to survive. It is not a farewell, only a pause: I will return to it, in one form or another."),
    T("Je demeure fidèle à ma promesse première — bâtir ce que les idées promettent — et ouvert à celles et ceux qui ont, eux aussi, quelque chose à construire.", "I remain faithful to my first promise — to build what ideas promise — and open to those who, too, have something to build."),
  ] },

  // ==================== TOME II ====================
  { kind: "part", id: "tome2", roman: T("Tome Deuxième", "Part Two"), title: T("Réalisations & Leçons", "Works & Lessons"), epigraph: T("« Un projet se juge au problème qu'il résout. »", "“A project is judged by the problem it solves.”") },

  { kind: "projects", kicker: T("Réalisations", "Selected Works"), title: T("Des problèmes, des réponses", "Problems, and Answers"), intro: T("Quelques chantiers marquants — des problèmes concrets et leur réponse. Plusieurs (MTN, Moov, Celtiis, Orabank…) ont été menés en tant que développeur au sein de KAMGOKO, en équipe.", "A few notable projects — concrete problems and their answers. Several (MTN, Moov, Celtiis, Orabank…) were delivered as a developer within KAMGOKO, as a team."), projects: [
    { name: "Emilia Cross", client: "France Assist", href: "https://emiliacross.com/", problem: T("Un site de rencontre où la relation se noue en visio en direct — sécurisé, monétisé et scalable.", "A dating site where connections are made over live video — secure, monetized and scalable."), solution: T("Architecture NestJS multi-services + serveur WebSocket dédié, streaming vidéo, KYC, paiements & reversements (payouts), crédits, RBAC & 2FA, supervision.", "Multi-service NestJS + dedicated WebSocket server, video streaming, KYC, payments & payouts, credits, RBAC & 2FA, monitoring.") },
    { name: "MyMTN Selfcare", client: "MTN Bénin · via KAMGOKO", href: "https://my.mtn.bj/", problem: T("Des milliers d'abonnés doivent gérer forfaits et compte sans passer par le support.", "Thousands of subscribers need to manage plans and account without going through support."), solution: T("Application SPA Vue.js/Nuxt, intégration d'APIs REST, gestion d'état avancée et optimisation du rendu.", "Vue.js/Nuxt SPA, REST API integration, advanced state management and rendering optimization.") },
  ] },

  { kind: "projects", kicker: T("Réalisations — suite", "Selected Works — cont."), title: T("… et quelques autres", "… and a few more"), projects: [
    { name: T("Sites corporate MTN", "MTN corporate sites"), client: "MTN · via KAMGOKO", href: "https://www.mtn.bj/", problem: T("Offrir une présence corporate multilingue, rapide et bien référencée pour deux opérateurs.", "Deliver a fast, well-ranked, multilingual corporate presence for two operators."), solution: T("Thèmes & plugins WordPress sur mesure, contenu multilingue, optimisation performances et SEO.", "Custom WordPress themes & plugins, multilingual content, performance and SEO optimization.") },
    { name: T("PaulBot & le portfolio", "PaulBot & the portfolio"), client: T("Projet personnel", "Personal project"), href: "https://luap-dever.netlify.app", problem: T("Prouver des compétences autrement qu'avec une liste — et laisser le visiteur interroger le profil.", "Prove skills otherwise than with a list — and let the visitor question the profile."), solution: T("Portfolio « OS dans le navigateur » (GSAP) + assistant IA en streaming (NestJS, LLM/SSE), captcha open-source, export PDF.", "In-browser “OS” portfolio (GSAP) + streaming AI assistant (NestJS, LLM/SSE), open-source captcha, PDF export.") },
  ], ndaNote: T("D'autres missions — pour Celtiis, Orabank et une institution publique (CCIB) — restent couvertes par la confidentialité.", "Other engagements — for Celtiis, Orabank and a public institution (CCIB) — remain under confidentiality.") },

  { kind: "lessons", kicker: T("Leçons", "Lessons"), title: T("Ce que j'aurais aimé qu'on me dise", "What I Wish I'd Been Told"), intro: T("À qui débute, huit convictions gagnées sur le terrain — bien plus utiles qu'une liste de technologies.", "For anyone starting out, eight convictions earned in the field — far more useful than a list of technologies."), items: [
    { h: T("Livrer vaut mieux que peaufiner sans fin", "Shipping beats endless polishing"), t: T("Un code parfait jamais livré ne vaut rien. Fais fonctionner, puis améliore.", "Perfect code never shipped is worth nothing. Make it work, then improve it.") },
    { h: T("Lis la documentation d'abord", "Read the docs first"), t: T("La plupart des réponses y sont déjà. Chercher soi-même forge l'autonomie.", "Most answers are already there. Searching yourself forges autonomy.") },
    { h: T("La fiabilité est une promesse", "Reliability is a promise"), t: T("Chaque déploiement est un engagement envers l'utilisateur. Teste, surveille, préviens.", "Every deploy is a commitment to the user. Test, monitor, anticipate.") },
    { h: T("Apprends à déboguer avec méthode", "Learn to debug methodically"), t: T("Reproduis, isole, formule une hypothèse, vérifie. Le hasard n'est pas une stratégie.", "Reproduce, isolate, hypothesize, verify. Chance is not a strategy.") },
  ] },

  { kind: "lessons", kicker: T("Leçons — suite", "Lessons — cont."), title: T("… et encore quatre", "… and four more"), items: [
    { h: T("Le code se lit plus qu'il ne s'écrit", "Code is read more than written"), t: T("Nomme clairement, garde simple. Ton futur toi te remerciera.", "Name clearly, keep it simple. Your future self will thank you.") },
    { h: T("La sécurité dès la première ligne", "Security from the first line"), t: T("RBAC, validation, secrets hors du code : ça ne se rajoute pas à la fin.", "RBAC, validation, secrets out of the code: it is not bolted on at the end.") },
    { h: T("Sache expliquer sans jargon", "Explain without jargon"), t: T("Si tu ne peux l'expliquer simplement, tu ne l'as pas encore compris.", "If you can't explain it simply, you don't understand it yet.") },
    { h: T("Entoure-toi, partage", "Surround yourself, share"), t: T("Le meilleur code naît souvent d'une conversation. Personne ne bâtit seul.", "The best code is often born of a conversation. Nobody builds alone.") },
  ] },

  // ==================== TOME III ====================
  { kind: "part", id: "tome3", roman: T("Tome Troisième", "Part Three"), title: T("Le Cabinet de Lecture", "The Reading Room"), epigraph: T("« Un bâtisseur se nourrit aussi des pages qu'il n'a pas écrites. »", "“A builder feeds too on pages he did not write.”") },

  { kind: "shelf", kicker: T("Mes lectures", "My Shelf"), title: T("Ce qui me nourrit", "What Feeds Me"), intro: T("Je suis lecteur avant d'être codeur. Quelques ouvrages qui m'accompagnent — techniques ou non.", "I am a reader before I am a coder. A few works that accompany me — technical or not."), books: [
    { title: "L'IA consciente n'est plus une utopie", author: "Jérôme Béranger", why: T("« Il est encore temps de s'y préparer » — l'éthique et l'avenir de l'IA.", "“There is still time to prepare” — the ethics and future of AI.") },
    { title: "UX Design et ergonomie des interfaces (7ᵉ éd.)", author: "Jean-François Nogier", why: T("Concevoir des interfaces vraiment au service de l'utilisateur.", "Designing interfaces that truly serve the user.") },
    { title: "Vue.js — Applications web modernes", author: "Yoann Gauchard", why: T("Le framework progressif, exploré en profondeur.", "The progressive framework, explored in depth.") },
  ] },

  // ---- Colophon / contact ----
  {
    kind: "colophon",
    kicker: T("Colophon", "Colophon"),
    title: T("La prochaine page vous appartient", "The Next Page Is Yours"),
    paras: [
      T("Une idée à concrétiser ? Une histoire à écrire ensemble ? Ce livre n'attend qu'une suite. Écrivez-moi.", "An idea to bring to life? A story to write together? This book only awaits a sequel. Write to me."),
    ],
    links: [
      { label: "pzannou511@gmail.com", href: "mailto:pzannou511@gmail.com" },
      { label: "GitHub", href: "https://github.com/luapdever" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/paul-zannou-b253a2205" },
      { label: T("Le blog", "The blog"), href: "https://luap-dever.netlify.app/blog" },
    ],
  },
];

/* ============================ RENDU D'UNE FEUILLE ============================ */
function Leaf({ c, lang, tr, jumpTo, toc }) {
  const K = c.kicker && <span className={styles.kicker}>{tr(c.kicker)}</span>;

  if (c.kind === "cover") {
    return (
      <div className={`${styles.chap} ${styles.cover}`}>
        <span className={styles.publisher}>{lang === "fr" ? "Éditions PaulBrain" : "PaulBrain Editions"}</span>
        <div className={styles.coverRule} />
        <span className={styles.coverKicker}>{lang === "fr" ? "Récit · Réalisations · Réflexions" : "Story · Works · Reflections"}</span>
        <h1 className={styles.coverTitle}>{lang === "fr" ? "Ce que les idées promettent" : "What Ideas Promise"}</h1>
        <div className={styles.monogram}>P<span>Z</span></div>
        <p className={styles.coverAuthor}>Paul Mèdédji Zannou</p>
        <div className={styles.coverRule} />
        <span className={styles.coverEd}>{lang === "fr" ? "Première édition · 2026" : "First edition · 2026"}</span>
      </div>
    );
  }

  if (c.kind === "edition") {
    return (
      <div className={`${styles.chap} ${styles.edition}`}>
        <img className={styles.authorPhoto} src="/cv/photo.jpg" alt={lang === "fr" ? "Portrait de l'auteur" : "Author portrait"} />
        <span className={styles.kicker}>{lang === "fr" ? "L'auteur" : "The Author"}</span>
        <h2 className={styles.chapTitle}>Paul Mèdédji Zannou</h2>
        <p className={styles.authorBlurb}>{lang === "fr"
          ? "Ingénieur logiciel full-stack, alias Luap Dever, basé à Cotonou (Bénin). Je bâtis des applications web, mobiles et temps réel — et je crois qu'une idée ne vaut que bâtie."
          : "Full-stack software engineer, aka Luap Dever, based in Cotonou (Benin). I build web, mobile and real-time applications — and I believe an idea is only worth as much as it is built."}</p>
        <div className={styles.edLines}>
          <p>« {lang === "fr" ? "Ce que les idées promettent" : "What Ideas Promise"} » — {lang === "fr" ? "première édition" : "first edition"}.</p>
          <p>{lang === "fr" ? "Composé en Cormorant Garamond." : "Set in Cormorant Garamond."}</p>
          <p>© 2026 Paul Mèdédji Zannou. {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}</p>
          <p>{lang === "fr" ? "Publié depuis Cotonou, Bénin." : "Published from Cotonou, Benin."}</p>
        </div>
      </div>
    );
  }

  if (c.kind === "foreword") {
    return (
      <div className={styles.chap}>
        {K}
        <h2 className={styles.chapTitle}>{tr(c.title)}</h2>
        {c.paras.map((p, i) => <p key={i} className={styles.chapText}>{tr(p)}</p>)}
        {c.sign && <p className={styles.sign}>{tr(c.sign)}</p>}
      </div>
    );
  }

  if (c.kind === "toc") {
    return (
      <div className={styles.chap}>
        <span className={styles.kicker}>{lang === "fr" ? "Sommaire" : "Contents"}</span>
        <h2 className={styles.chapTitle}>{lang === "fr" ? "Table des matières" : "Table of Contents"}</h2>
        <ul className={styles.toc}>
          {toc.map((e) => (
            <li key={e.target} className={e.level === 0 ? styles.tocTome : styles.tocSub}>
              <button className={styles.tocItem} onClick={() => jumpTo(e.target)}>
                {e.level === 0 && e.roman && <span className={styles.tocRoman}>{tr(e.roman)}</span>}
                <span className={styles.tocLabel}>{tr(e.label)}</span>
                <span className={styles.tocPage}>{e.target + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (c.kind === "part") {
    return (
      <div className={`${styles.chap} ${styles.part}`}>
        <span className={styles.partRoman}>{tr(c.roman)}</span>
        <div className={styles.coverRule} />
        <h2 className={styles.partTitle}>{tr(c.title)}</h2>
        {c.epigraph && <p className={styles.epigraph}>{tr(c.epigraph)}</p>}
      </div>
    );
  }

  if (c.kind === "projects") {
    return (
      <div className={`${styles.chap} ${styles.dense}`}>
        {K}
        <h2 className={styles.chapTitle}>{tr(c.title)}</h2>
        {c.intro && <p className={styles.chapText}>{tr(c.intro)}</p>}
        {c.projects.map((p, i) => (
          <div key={i} className={styles.proj}>
            <h3 className={styles.projName}>{tr(p.name)} <span>· {tr(p.client)}</span></h3>
            <p className={styles.projLine}><b>{lang === "fr" ? "Problème" : "Problem"} — </b>{tr(p.problem)}</p>
            <p className={styles.projLine}><b>{lang === "fr" ? "Réponse" : "Answer"} — </b>{tr(p.solution)}</p>
            <a className={styles.projLink} href={p.href} target="_blank" rel="noopener noreferrer">{p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗</a>
          </div>
        ))}
        {c.ndaNote && <p className={styles.ndaNote}>{tr(c.ndaNote)}</p>}
      </div>
    );
  }

  if (c.kind === "lessons") {
    return (
      <div className={`${styles.chap} ${styles.dense}`}>
        {K}
        <h2 className={styles.chapTitle}>{tr(c.title)}</h2>
        {c.intro && <p className={styles.chapText}>{tr(c.intro)}</p>}
        <ol className={styles.lessons}>
          {c.items.map((it, i) => (
            <li key={i}><b>{tr(it.h)}.</b> {tr(it.t)}</li>
          ))}
        </ol>
      </div>
    );
  }

  if (c.kind === "shelf") {
    return (
      <div className={styles.chap}>
        {K}
        <h2 className={styles.chapTitle}>{tr(c.title)}</h2>
        {c.intro && <p className={styles.chapText}>{tr(c.intro)}</p>}
        <ul className={styles.shelf}>
          {c.books.map((b, i) => (
            <li key={i} className={styles.bookItem}>
              <span className={styles.bookSpine} aria-hidden="true" />
              <div>
                <span className={styles.bookTitle}>{b.title}</span>
                <span className={styles.bookAuthor}> — {b.author}</span>
                <p className={styles.bookWhy}>{tr(b.why)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (c.kind === "colophon") {
    return (
      <div className={`${styles.chap} ${styles.colophon}`}>
        {K}
        <h2 className={styles.chapTitle}>{tr(c.title)}</h2>
        {c.paras.map((p, i) => <p key={i} className={styles.chapText}>{tr(p)}</p>)}
        <div className={styles.links}>
          {c.links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {typeof l.label === "string" ? l.label : tr(l.label)}
            </a>
          ))}
        </div>
        <p className={styles.finis}>{lang === "fr" ? "— fin —" : "— the end —"}</p>
      </div>
    );
  }

  // chapter (par défaut)
  return (
    <div className={styles.chap}>
      {c.chap != null && <span className={styles.chapNo}>{lang === "fr" ? "Chapitre" : "Chapter"} {ROMAN[c.chap]}</span>}
      {K}
      {c.title && <h2 className={styles.chapTitle}>{tr(c.title)}</h2>}
      {c.img && (
        <figure className={styles.figure}>
          <img className={styles.chapImg} src={c.img} alt="" />
          {c.caption && <figcaption className={styles.caption}>{tr(c.caption)}</figcaption>}
        </figure>
      )}
      {c.paras && c.paras.map((p, i) => <p key={i} className={styles.chapText}>{tr(p)}</p>)}
    </div>
  );
}

const ORIGIN = "https://luap-dever.netlify.app";
const labelOf = (l) => {
  if (l.kind === "cover") return T("Couverture", "Cover");
  if (l.kind === "edition") return T("L'auteur", "The Author");
  if (l.kind === "toc") return T("Sommaire", "Contents");
  if (l.kind === "chapter") return l.kicker || l.title;
  return l.title || l.kicker;
};

function Book() {
  const { lang } = useLandingLang();
  const tr = (v) => (v && v.fr !== undefined ? (lang === "en" ? v.en : v.fr) : v);
  const N = LEAVES.length;
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(null); // { from, to, dir } pendant l'animation
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const touch = useRef(null);
  const busy = useRef(false);

  // Table des matières hiérarchisée : Tomes (niveau 0) + sections (niveau 1).
  const toc = LEAVES.map((l, i) => ({ l, i }))
    .filter(({ l }) => ["foreword", "part", "projects", "lessons", "shelf"].includes(l.kind))
    .map(({ l, i }) => ({ target: i, label: l.title, roman: l.roman, level: l.kind === "part" ? 0 : 1 }));
  // Navigation complète (barre latérale / menu) : chaque feuille.
  const navList = LEAVES.map((l, i) => ({ target: i, label: labelOf(l), level: l.kind === "part" ? 0 : 1 }));

  const turn = (d, to) => {
    if (busy.current) return;
    const next = to != null ? to : Math.min(Math.max(page + d, 0), N - 1);
    if (next === page) return;
    busy.current = true;
    if (!muted) playPageTurn();
    setTurning({ from: page, to: next, dir: next > page ? "next" : "prev" });
  };
  const endTurn = (t) => { setPage(t.to); setTurning(null); busy.current = false; };
  const jumpTo = (i) => turn(0, i);

  // Restaure la page lue (persistée) après le montage — pas de mismatch SSR.
  useEffect(() => {
    try { const s = parseInt(localStorage.getItem("book_page"), 10); if (s > 0 && s < N) setPage(s); } catch {}
  }, [N]);
  // Mémorise la page courante à chaque changement.
  useEffect(() => { try { localStorage.setItem("book_page", String(page)); } catch {} }, [page]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowRight") turn(1); else if (e.key === "ArrowLeft") turn(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [muted]);

  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) turn(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const ui = {
    exportPdf: lang === "fr" ? "Exporter en PDF" : "Export to PDF",
    of: lang === "fr" ? "sur" : "of",
    sound: lang === "fr" ? "Son des pages" : "Page sound",
    chapters: lang === "fr" ? "Chapitres" : "Chapters",
    menu: lang === "fr" ? "Ouvrir les chapitres" : "Open chapters",
    home: lang === "fr" ? "Retour au portfolio" : "Back to the portfolio",
  };
  const pct = N > 1 ? Math.round(((turning ? turning.to : page) / (N - 1)) * 100) : 0;
  // Deux couches : la page « dessous » (statique) et la page « qui tourne » (au-dessus).
  const bottomIndex = turning ? (turning.dir === "next" ? turning.to : turning.from) : page;
  const turningIndex = turning ? (turning.dir === "next" ? turning.from : turning.to) : null;
  const folioNum = (turning ? turning.to : page) + 1;

  const title = lang === "fr"
    ? "Paul Mèdédji Zannou — Biographie · « Ce que les idées promettent »"
    : "Paul Mèdédji Zannou — Biography · “What Ideas Promise”";
  const desc = lang === "fr"
    ? "La biographie de Paul Mèdédji Zannou (Luap Dever), ingénieur logiciel full-stack : parcours, réalisations et réflexions, racontés comme un livre."
    : "The biography of Paul Mèdédji Zannou (Luap Dever), full-stack software engineer: journey, works and reflections, told as a book.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: lang === "fr" ? "Ce que les idées promettent" : "What Ideas Promise",
    inLanguage: lang,
    url: `${ORIGIN}/book`,
    author: { "@type": "Person", name: "Paul Mèdédji Zannou" },
    about: {
      "@type": "Person",
      name: "Paul Mèdédji Zannou",
      alternateName: "Luap Dever",
      jobTitle: lang === "fr" ? "Ingénieur logiciel full-stack" : "Full-stack software engineer",
      url: ORIGIN,
      sameAs: ["https://github.com/luapdever", "https://www.linkedin.com/in/paul-zannou-b253a2205"],
    },
  };

  return (
    <div className={`${serif.variable} ${styles.root}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`${ORIGIN}/book`} />
        <meta property="og:type" content="book" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={`${ORIGIN}/book`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      {/* Menu hamburger (mobile) */}
      <button className={styles.hamburger} onClick={() => setMenuOpen((o) => !o)} aria-label={ui.menu} aria-expanded={menuOpen}>☰</button>
      {menuOpen && <div className={styles.scrim} onClick={() => setMenuOpen(false)} />}

      {/* Barre latérale — navigation chapitre par chapitre */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHead}>{ui.chapters}</div>
        <ul className={styles.navList}>
          {navList.map((e) => (
            <li key={e.target} className={e.level === 0 ? styles.navTome : styles.navSub}>
              <button
                className={`${styles.navItem} ${e.target === page ? styles.navItemOn : ""}`}
                onClick={() => { jumpTo(e.target); setMenuOpen(false); }}
              >{tr(e.label)}</button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.topbar}>
        <Link href="/" className={styles.iconBtn} title={ui.home} aria-label={ui.home}>
          <img src="/icons/ph/house-fill__f2e9da.svg" alt="" width={18} height={18} />
        </Link>
        <button className={styles.iconBtn} onClick={() => setMuted((m) => !m)} title={ui.sound} aria-label={ui.sound}>{muted ? "🔇" : "🔊"}</button>
        <button className={styles.exportBtn} onClick={() => window.print()}>{ui.exportPdf}</button>
      </div>

      <div className={styles.reader} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className={styles.book}>
          <div className={styles.spine} aria-hidden="true" />
          <div className={styles.pageArea}>
            {/* Page du dessous (statique) — révélée par le tourné */}
            <div key={"b" + bottomIndex} className={styles.leaf}>
              <Leaf c={LEAVES[bottomIndex]} lang={lang} tr={tr} jumpTo={jumpTo} toc={toc} />
              <span className={styles.folio}>{folioNum} {ui.of} {N}</span>
            </div>
            {/* Page qui tourne (au-dessus, pivote à 180° comme dans un vrai livre) */}
            {turning && (
              <div
                key={"t" + turningIndex + turning.dir}
                className={`${styles.leaf} ${styles.flip} ${turning.dir === "next" ? styles.flipAway : styles.flipIn}`}
                onAnimationEnd={(e) => { if (e.target === e.currentTarget) endTurn(turning); }}
              >
                <Leaf c={LEAVES[turningIndex]} lang={lang} tr={tr} jumpTo={jumpTo} toc={toc} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => turn(-1)} disabled={page === 0} aria-label="←">‹</button>
          <div className={styles.progress}><div className={styles.progressFill} style={{ width: `${pct}%` }} /></div>
          <button className={styles.navBtn} onClick={() => turn(1)} disabled={page === N - 1} aria-label="→">›</button>
        </div>
      </div>

      {/* Document imprimable (PDF) */}
      <div className={styles.printDoc} aria-hidden="true">
        {LEAVES.map((c, i) => (
          <div key={i} className={styles.printPage}>
            <Leaf c={c} lang={lang} tr={tr} jumpTo={() => {}} toc={toc} />
          </div>
        ))}
      </div>
    </div>
  );
}

Book.hideChrome = true;
export default Book;
