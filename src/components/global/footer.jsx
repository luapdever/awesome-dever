import Image from "next/image";
import React from "react";
import dever from '../../assets/img/icons/DEVER.svg'
import styles from '../../../styles/global/footer.module.css'

function TheFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          Social medias
        </div>
        <div>
          &copy; Copyright 2022
        </div>
      </footer>
    </>
  );
}

export default TheFooter;
