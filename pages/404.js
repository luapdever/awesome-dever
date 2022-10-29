import React from "react";
import styles from "../styles/specific/404.module.css";
import notOnRoad from "../src/assets/img/awesome/notOnRoad.svg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

function Custom404() {
  return (
    <>
      <Head>
        <title>Dever - Page Not Found</title>
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
      <div className={styles.block404}>
        <h1>404 - You're not on road !</h1>
        <div>
          <Link href={"/"}>
            <div className="button">Go to home</div>
          </Link>
        </div>
        {/* <Image src={notOnRoad} alt="Not On Road" /> */}
      </div>
    </>
  );
}

export default Custom404;
