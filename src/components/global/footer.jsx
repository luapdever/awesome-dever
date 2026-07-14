import React from "react";
import styles from "../../../styles/global/footer.module.css";
import { socialMedias } from "../../rawDatas/aboutMe";

function TheFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <div className={styles.socialMedias}>
            {socialMedias.map(
              (socMedia, index) =>
                index < socialMedias.length - 1 && (
                  <a
                    key={"SocialMedia" + index}
                    href={socMedia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socMedia.icon}
                  </a>
                )
            )}
          </div>
        </div>
        <div>
          &copy; Copyright 2022
          <p>
            Luap Dever - Paul M. ZANNOU
          </p>
        </div>
      </footer>
    </>
  );
}

export default TheFooter;
