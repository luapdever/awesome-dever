import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/specific/portfolio/index.module.css'
import Content from './Content'
import { LangContext } from './lang'

function Portfolio() {
  const [lang, setLang] = useState('en')

  // Restore saved language on the client (avoids SSR hydration mismatch).
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('os_lang')
    if (saved === 'fr' || saved === 'en') setLang(saved)
  }, [])

  const changeLang = (l) => {
    setLang(l)
    if (typeof window !== 'undefined') localStorage.setItem('os_lang', l)
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
