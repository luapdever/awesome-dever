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
        title={`${OS.name} — Paul M. ZANNOU`}
        description="Explore Paul M. ZANNOU's mind booted as an operating system: open windows, run the terminal, browse projects, skills, career timeline and the vault of enterprise apps."
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
