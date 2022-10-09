import Image from "next/image";
import React from "react";
import dever from '../../assets/img/icons/DEVER.svg'
import styles from '../../../styles/global/footer.module.css'

function TheFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={"logo"}>
            <Image src={dever} alt="Dever logo" width={100} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
}

export default TheFooter;
