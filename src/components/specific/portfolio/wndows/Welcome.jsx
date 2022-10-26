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
          You can see on this screen some of my performances or collaborations in web and mobile
          development. Just like on a computer, you <b className="or">double click</b> on an icon to
          see the content. Some of this content uses external resources such as
          <b className="or"> embedded websites</b>. So you have the choice to open it in a new tab to
          have a good experience. For more information, you can <b className="or">contact me</b>.
        </p>
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
