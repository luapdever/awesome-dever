import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/home/about/presentation.module.css";
import luap from "../../../../assets/img/awesome/luap.jpg";
import luap2 from "../../../../assets/img/awesome/luap2.jpg";
import { me, socialMedias } from "../../../../rawDatas/aboutMe";

function Presentation() {
  const imgLeft = useRef();
  const imgRight = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(imgLeft.current, {
      rotate: -30,
      scrollTrigger: {
        trigger: imgLeft.current,
        start: "top 800px",
        scrub: 2
      },
    });

    gsap.to(imgRight.current, {
      rotate: 30,
      scrollTrigger: {
        trigger: imgLeft.current,
        start: "top 500px",
        scrub: 2
      },
    });
		
  }, []);

  return (
    <div className={styles.present}>
      <div className={styles.imgLuap}>
        <img
          ref={imgLeft}
          className={styles.imgLeft}
          src={luap2.src}
          alt={"Paul M. ZANNOU IMG 1"}
        />
        <img
          ref={imgRight}
          className={styles.imgRight}
          src={luap.src}
          alt={"Paul M. ZANNOU IMG 2"}
        />
      </div>
      <div>
        <h1>{me.fullName}</h1>
        <div>
          {me.aboutMe}
          <p className={styles.mediaSocials}>
            {socialMedias.map((social, index) => (
              <a key={"Social "+index} href={social.link} target="_blank" rel="noreferrer">
                <button>{social.icon}</button>
              </a>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
