import React from "react";
import styles from '../../../styles/global/custiframe.module.css'

function WinIframe({ props }) {
  const { source } = props;

  return (
    <div className={styles.custiframe}>
      <iframe
        src={source}
        loading="lazy"
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
      ></iframe>

      <a className={styles.newTab} href={source} target="_blank" rel="noopener noreferrer">Open in new tab</a>
    </div>
  );
}

export default WinIframe;
