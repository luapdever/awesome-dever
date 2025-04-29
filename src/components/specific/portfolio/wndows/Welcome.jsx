import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/welcome.module.css";
import { socialMedias } from "../../../../rawDatas/aboutMe";

function WelcomeContent() {
  return (
    <div className={styles.welcomeContent}>
      <h1>
        Welcome to <b>Dever Screen</b>
      </h1>
      <div>
        <p>
          This screen showcases a selection of my work and collaborations in web and mobile development. 
          As on a desktop, you can <b className="or">double-click</b> an icon to explore its content. 
          Some projects include <b className="or">embedded websites</b> or external resources — feel free to open them in a new tab for a smoother experience. 
          Please note that several projects cannot be displayed here due to confidentiality agreements, as they involve internal enterprise applications. 
          For more details or to discuss my full experience, feel free to <b className="or">contact me</b>.
        </p>
        <p style={{ textAlign: "right" }}><em>Paul Mèdédji ZANNOU</em></p>
        <p className={styles.mediaSocials}>
          {socialMedias.map((social, index) => (
            <a
              key={"Social " + index}
              href={social.link}
              target="_blank"
              rel="noreferrer"
            >
              <button>{social.icon}</button>
            </a>
          ))}
        </p>
      </div>
    </div>
  );
}

export default WelcomeContent;
