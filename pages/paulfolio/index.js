import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Seo from '../../src/components/global/seo'
import Portfolio from '../../src/components/specific/portfolio'
import { OS } from '../../src/rawDatas/os'

function MyPortfolio() {
  useEffect(() => {
    if(window.innerWidth < 600) {
      toast.info("The best feeling of this page is on big screen.")
    }
  }, [])

  return (
    <div className={"osShell"}>
      <Seo
        path="/paulfolio"
        title={`${OS.name} — Paul Mèdédji ZANNOU (Luap Dever)`}
        description="Le portfolio de Paul Mèdédji ZANNOU en version « système d'exploitation » : ouvrez les fenêtres, lancez le terminal, explorez ses projets, compétences, parcours, son CV et le coffre des prestations d'entreprise."
      />
      <main>
        <Portfolio />
      </main>
    </div>
  )
}

// Render this page without the global nav + footer.
MyPortfolio.hideChrome = true

export default MyPortfolio
