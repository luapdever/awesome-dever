import Head from 'next/head'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Portfolio from '../../src/components/specific/portfolio'

function MyPortfolio() {
  useEffect(() => {
    if(window.innerWidth < 600) {
      toast.info("The best felling of this page is on big screen.")
    }
  }, [])

  return (
    <div className={"container"}>
      <Head>
        <title>Dever - Overview Portfolio</title>
        <meta name="description" content="Awesome portfolio in screen shape. Enjoy !!" />
        <meta
          property='og:title'
          content='Dever - Awesome portfolio | Paul M. ZANNOU'
          key='title'
        />
        <meta
          property='og:image'
          content={process.env.appUrl +" luap.png"}
          key='image'
        />
        <meta property='og:url' content={process.env.appUrl} key='url' />
        <meta
          name='description'
          content='I am a fullstack developer of digital solutions, creative
          interfaces, web services, APIs. With three years of experience in 
          Internet and Multimedia, I marvelously merge 2D, 3D 
          and text to make interactive and
          experimental applications that respond to given solutions.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={""}>
        <Portfolio />
      </main>
    </div>
  )
}

export default MyPortfolio