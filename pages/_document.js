import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="I am a fullstack developer of digital solutions, creative
        interfaces, web services, APIs. With three years of experience in 
        Internet and Multimedia, I marvelously merge 2D, 3D 
        and text to make interactive and
        experimental applications that respond to given solutions."
        />
        <meta
          property='og:title'
          content='Dever - Awesome portfolio | Paul M. ZANNOU'
          key='title'
        />
        <meta
          property='og:image'
          content={process.env.appUrl+"luap.png"}
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
        
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Dosis"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
