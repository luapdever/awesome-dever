import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Seo from '../../src/components/global/seo'
import Portfolio from '../../src/components/specific/portfolio'
import { OS } from '../../src/rawDatas/os'

/* Métadonnées par locale. Écrites en dur en français, elles rendaient
   /paulfolio et /en/paulfolio strictement identiques — même titre, même
   description — et Google gardait la version française en ignorant le
   canonical de l'anglaise. */
const META = {
  fr: {
    title: `${OS.name} — Le portfolio interactif de Paul Mèdédji ZANNOU (Luap Dever)`,
    description:
      "Le portfolio de Paul Mèdédji ZANNOU en version « système d'exploitation » : ouvrez les fenêtres, lancez le terminal, explorez ses projets, compétences, parcours, son CV et le coffre des prestations d'entreprise.",
    small: "Cette page se vit mieux sur grand écran.",
  },
  en: {
    title: `${OS.name} — Paul Mèdédji ZANNOU's interactive portfolio (Luap Dever)`,
    description:
      "Paul Mèdédji ZANNOU's portfolio as an operating system: open the windows, launch the terminal, explore his projects, skills, career, resume and the vault of enterprise services.",
    small: "The best feeling of this page is on big screen.",
  },
}

function MyPortfolio() {
  const { locale } = useRouter()
  const meta = META[locale === 'fr' ? 'fr' : 'en']

  useEffect(() => {
    if (window.innerWidth < 600) toast.info(meta.small)
  }, [meta.small])

  return (
    <div className={"osShell"}>
      <Seo path="/paulfolio" title={meta.title} description={meta.description} />
      <main>
        <Portfolio />
      </main>
    </div>
  )
}

// Render this page without the global nav + footer.
MyPortfolio.hideChrome = true

export default MyPortfolio
