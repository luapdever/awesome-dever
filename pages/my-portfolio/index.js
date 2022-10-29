import Head from 'next/head'
import React from 'react'
import Portfolio from '../../src/components/specific/portfolio'

function MyPortfolio() {
  return (
    <div className={"container"}>
      <Head>
        <title>Dever - Overview Portfolio</title>
        <meta name="description" content="Awesome portfolio in screen shape. Enjoy !!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={""}>
        <Portfolio />
      </main>
    </div>
  )
}

export default MyPortfolio