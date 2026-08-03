import { L } from "../data";

/* Questions réellement posées à PaulBot par les visiteurs. Elles servent deux
   fois : bloc visible sur /about-me, et schéma FAQPage (Google exige que le
   contenu balisé soit visible — d'où la source unique).

   Aucune réponse ne doit dépasser ce que dit le profil canonique : ces textes
   sont lus par des recruteurs ET indexés. */
export const faqItems = [
  {
    q: L("Is Paul available for a mission?", "Paul est-il disponible pour une mission ?"),
    a: L(
      "He studies freelance and full-time opportunities, remote or based in Cotonou, Benin. The fastest way to know is to write to hi@paulzannou.com — or to paste your job posting into PaulBot, which returns a structured fit analysis.",
      "Il étudie les opportunités en freelance comme en poste, à distance ou depuis Cotonou (Bénin). Le plus rapide est d'écrire à hi@paulzannou.com — ou de coller votre offre dans PaulBot, qui renvoie une analyse d'adéquation structurée."
    ),
  },
  {
    q: L("What is his flagship project?", "Quel est son projet de référence ?"),
    a: L(
      "Emilia Cross (emiliacross.com), a live-video dating platform built for France Assist: Flutter mobile app and PWA, NestJS back end, real-time via Socket.IO, payments and moderation.",
      "Emilia Cross (emiliacross.com), une plateforme de rencontre en visio conçue pour France Assist : application mobile Flutter et PWA, back-end NestJS, temps réel via Socket.IO, paiements et modération."
    ),
  },
  {
    q: L("Which technologies does he master?", "Quelles technologies maîtrise-t-il ?"),
    a: L(
      "Core stack: NestJS and Node.js on the back end, Vue/Nuxt and React/Next.js on the front end, Flutter for mobile, Docker and CI/CD for delivery. Also AI/LLM integration, retrieval (BM25, vector search) and real-time systems.",
      "Cœur de stack : NestJS et Node.js côté back-end, Vue/Nuxt et React/Next.js côté front-end, Flutter pour le mobile, Docker et CI/CD pour la livraison. Également intégration IA/LLM, recherche d'information (BM25, vectorielle) et systèmes temps réel."
    ),
  },
  {
    q: L("How many years of experience?", "Combien d'années d'expérience ?"),
    a: L(
      "Five years and counting, some twenty projects across six companies and three countries — including telecom accounts such as MTN Benin and Moov Togo, delivered through KAMGOKO Technologies.",
      "Cinq années et plus, une vingtaine de projets, six entreprises et trois pays — dont des comptes télécoms comme MTN Bénin et Moov Togo, réalisés via KAMGOKO Technologies."
    ),
  },
  {
    q: L("Can his code be seen?", "Peut-on voir son code ?"),
    a: L(
      "Public repositories are on GitHub (github.com/luapdever). Client work delivered for telecom operators remains under confidentiality: the company can be named, the project details cannot.",
      "Les dépôts publics sont sur GitHub (github.com/luapdever). Les prestations livrées pour des opérateurs télécoms restent couvertes par la confidentialité : l'entreprise peut être nommée, pas le détail des projets."
    ),
  },
  {
    q: L("Does he work remotely?", "Travaille-t-il à distance ?"),
    a: L(
      "Yes. He is based in Cotonou, Benin, and has delivered for clients in Benin, Togo and France — remote collaboration is his usual working mode.",
      "Oui. Il est basé à Cotonou (Bénin) et a livré pour des clients au Bénin, au Togo et en France — la collaboration à distance est son mode de travail habituel."
    ),
  },
];
