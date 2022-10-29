import Image from "next/image";
import React from "react";
import dever from "../../assets/img/icons/DEVER.svg";
import styles from "../../../styles/global/footer.module.css";
import { socialMedias } from "../../rawDatas/aboutMe";
import Link from "next/link";

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
