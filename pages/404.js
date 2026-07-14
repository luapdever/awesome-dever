import React from "react";
import styles from "../styles/specific/404.module.css";
import Link from "next/link";
import Seo from "../src/components/global/seo";

function Custom404() {
  return (
    <>
      <Seo path="/404" title="Dever - Page Not Found | Paul M. ZANNOU" />
      <div className={styles.block404}>
        <h1>404 - You&apos;re not on road !</h1>
        <div>
          <Link href={"/"}>
            <div className="button">Go to home</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Custom404;
