import React, { useEffect, useRef } from "react";
import styles from "../../../../styles/specific/home/aboutMe.module.css";
import { FaChevronDown } from "react-icons/fa";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Presentation from "./about/Presentation";

function AboutMe() {
  const awContainer = useRef();
  const aboutMe = useRef();
  const presentation = useRef();
  const formation = useRef();
  const skills = useRef();
  const experiences = useRef();
  const spare = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(presentation.current, {
      xPercent: 100,
      scrollTrigger: {
        trigger: presentation.current,
        start: "100px top",
        scrub: 2
      },
    });
    
    gsap.to(formation.current, {
      yPercent: 100,
      scrollTrigger: {
        trigger: formation.current,
        start: "300px top",
        scrub: 2,
        snap: [0, 0.85]
      },
    });
    
    gsap.to(experiences.current, {
      xPercent: -100,
      scrollTrigger: {
        trigger: experiences.current,
        start: "300px top",
        scrub: 2,
        snap: [0, 0.8]
      },
    });
  }, []);

  return (
    <div ref={awContainer} className={styles.aboutMe} id="aboutMe">
      <div ref={aboutMe}>
        <h1>About Me</h1>
        <div>
          Scroll down
          <br />
          <FaChevronDown />
        </div>
      </div>
      <div ref={presentation} className={styles.presentation}>
        <Presentation />
      </div>
      <div ref={formation} className={styles.formation}>
        <h1>Formations</h1>
      </div>
      <div ref={skills} className={styles.skills}>
        <h1>Skills</h1>
      </div>
      <div ref={experiences} className={styles.experiences}>
        <h1>Experiences</h1>
      </div>
      <div ref={spare} className={styles.spare}>
        <h1>Spare time 🏄</h1>
      </div>
    </div>
  );
}

export default AboutMe;
