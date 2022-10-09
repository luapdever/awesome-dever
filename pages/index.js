import Head from 'next/head'
import HomePage from '../src/components/specific/home'

export default function Home() {
  return (
    <div className={"container"}>
      <Head>
        <title>Dever - Awesome portfolio</title>
        <meta name="description" content="Luap Dever is just a nickname as can be seen on the Github pages.
          From my real name Paul ZANNOU, I am a fullstack developer with two years of experience in Internet and Multimedia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={""}>
        <HomePage />
      </main>
    </div>
  )
}
