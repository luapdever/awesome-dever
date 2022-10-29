import Head from "next/head";
import HomePage from "../src/components/specific/home";

export default function Home() {
  return (
    <div className={"container"}>
      <Head>
        <title>Dever - Awesome portfolio</title>
        <meta
          name="description"
          content="I am a fullstack developer of digital solutions, creative
        interfaces, web services, APIs. With three years of experience in 
        Internet and Multimedia, I marvelously merge 2D, 3D 
        and text to make interactive and
        experimental applications that respond to given solutions."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={""}>
        <HomePage />
      </main>
    </div>
  );
}
