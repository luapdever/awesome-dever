import React from "react";
import styles from "../styles/specific/404.module.css";
import Link from "next/link";
import Seo from "../src/components/global/seo";

function Custom404() {
  return (
    <>
      <Seo path="/404" title="Page introuvable (404) — Paul Mèdédji ZANNOU" noindex />
      <div className={styles.block404}>
        <h1>404 — cette page a pris un autre chemin.</h1>
        <div>
          <Link href={"/"}>
            <div className="button">Retour à l&apos;accueil</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Custom404;
