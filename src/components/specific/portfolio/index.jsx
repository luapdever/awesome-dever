import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/specific/portfolio/index.module.css'
import Content from './Content'
import { LangContext } from './lang'
import { rememberLang } from "../../../context/landingLang";
import { useRouter } from "next/router";

function Portfolio() {
  const router = useRouter()
  /* Initialisée depuis la locale de l'URL, jamais en dur : Next rend une page
     par locale au build, mais l'effet ci-dessous ne s'exécute pas côté serveur.
     Un défaut figé à 'en' produisait donc deux HTML identiques en anglais, que
     Google traitait — à raison — comme des doublons. */
  const [lang, setLang] = useState(router.locale === 'fr' ? 'fr' : 'en')

  /* Hiérarchie de langue, du plus fort au plus faible :
       #lang= (lien de partage explicite) > locale de l'URL > os_lang
     La locale passe avant os_lang : arriver sur /en/paulfolio doit ouvrir l'OS
     en anglais, même si la dernière préférence enregistrée était le français.
     Le hash, lui, est appliqué par Content.jsx et l'emporte sur les deux. */
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Le hash est lu ICI aussi : sans ça, cet effet écrasait la langue qu'un
    // lien de partage venait d'imposer (Content.jsx l'applique en parallèle).
    const fromHash = /(?:^|&)lang=(fr|en)\b/.exec(window.location.hash.slice(1))?.[1] || null
    const fromRoute = router.locale === 'fr' || router.locale === 'en' ? router.locale : null
    const saved = localStorage.getItem('os_lang')
    const resolved = fromHash || fromRoute || (saved === 'fr' || saved === 'en' ? saved : 'en')
    setLang(resolved)
    rememberLang(resolved)   // on réaligne os_lang + cookie sur ce qui a gagné
  }, [router.locale])

  // rememberLang écrit AUSSI le cookie NEXT_LOCALE : en sortant de l'OS vers
  // le site, Next renverra le visiteur dans la langue qu'il a choisie ici.
  /* Changer de langue navigue vers l'autre locale, en conservant le hash :
     l'état de l'OS (fenêtre ouverte) y est encodé, il survit donc au remontage.
     Sans ça, l'URL affirmait une langue et l'écran en montrait une autre. */
  const changeLang = (l) => {
    setLang(l)
    rememberLang(l)
    if (l !== router.locale) router.push(router.asPath, undefined, { locale: l, scroll: false })
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang }}>
      <div className={styles.portfolio}>
        <div className={styles.deviceShape}>
          <div className={styles.content}>
            <Content />
          </div>
          <div className={styles.powerBtn}></div>
        </div>
      </div>
    </LangContext.Provider>
  )
}

export default Portfolio
