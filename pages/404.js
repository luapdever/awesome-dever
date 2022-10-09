import React from 'react'
import styles from '../styles/specific/404.module.css'
import notOnRoad from '../src/assets/img/awesome/notOnRoad.svg'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

function Custom404() {
  return (
    <>
      <Head>
        <title>Dever - Page Not Found</title>
        <meta name="description" content="Luap Dever is just a nickname as can be seen on the Github pages.
          From my real name Paul ZANNOU, I am a fullstack developer with two years of experience in Internet and Multimedia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.block404}>
          <h1>404 - You're not on road !</h1>
          <div>
              <Link href={"/"}>
                  <div className='button'>Go to home</div>
              </Link>
          </div>
          {/* <Image src={notOnRoad} alt="Not On Road" /> */}
      </div>
    </>
  )
}

export default Custom404