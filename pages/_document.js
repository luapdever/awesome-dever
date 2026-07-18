import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Hygiène analytics — DOIT s'exécuter AVANT GTM/gtag. Désactive la
            mesure GA4 pour le trafic INTERNE (toi) et dev/preview, afin de ne
            pas polluer les stats. Toi : visite « ?ga=internal » une fois par
            navigateur/appareil (persistant) ; « ?ga=external » pour réactiver. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var h=location.hostname,q=new URLSearchParams(location.search);
if(q.get('ga')==='internal')localStorage.setItem('ga_internal','1');
if(q.get('ga')==='external')localStorage.removeItem('ga_internal');
var internal=h==='localhost'||h==='127.0.0.1'||h.indexOf('deploy-preview')>-1||h.indexOf('--')>-1||localStorage.getItem('ga_internal')==='1';
if(internal){window['ga-disable-G-H5387SXY6D']=true;}
}catch(e){}})();`,
          }}
        />
        {/* End hygiène analytics */}
        {/* Consent Mode v2 — défaut « granted » (modèle opt-out : la mesure
            démarre dès la 1re page ; la bannière permet de se désinscrire).
            Un refus déjà exprimé (retour de visite) est ré-appliqué. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
try{if(localStorage.getItem('cookie_consent')==='denied'){gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});}}catch(e){}`,
          }}
        />
        {/* End Consent Mode default */}
        {/* Google Tag Manager — le plus haut possible dans <head> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T8C9B5P9');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H5387SXY6D" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H5387SXY6D');`,
          }}
        />
        {/* End Google tag (gtag.js) */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#110068" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Icônes Phosphor désormais self-hostées (/icons/ph/*.svg) — plus de
            dépendance runtime à api.iconify.design. */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) — juste après <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T8C9B5P9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
