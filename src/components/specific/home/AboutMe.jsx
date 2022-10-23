import React, { useEffect, useRef } from "react";
import styles from "../../../../styles/specific/home/aboutMe.module.css";
import { FaChevronDown } from "react-icons/fa";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Presentation from "./about/Presentation";
import Formations from "./about/Formations";
import Skills from "./about/Skills";
import SpareTime from "./about/SpareTime";
import Link from "next/link";

function AboutMe() {
  const awContainer = useRef();
  const aboutMe = useRef();
  const presentation = useRef();
  const formation = useRef();
  const skills = useRef();
  const experiences = useRef();
  const spare = useRef();
  const bigFooter = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
  
      gsap.to(presentation.current, {
        xPercent: 100,
        scrollTrigger: {
          trigger: presentation.current,
          start: "100 top",
          scrub: 2
        },
      });
      
      gsap.to(formation.current, {
        yPercent: 100,
        scrollTrigger: {
          trigger: formation.current,
          start: "300 top",
          scrub: 2,
          snap: [0, 0.85]
        },
      });
      
      gsap.to(formation.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: bigFooter.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={awContainer} className={styles.aboutMe} id="aboutMe">
      <div ref={aboutMe}>
        <h1>About Me</h1>
        <div>
          Scroll down
          <br />
          <div className="translateY">
            <FaChevronDown />
          </div>
        </div>
      </div>
      <div ref={presentation} className={styles.presentation}>
        <Presentation />
      </div>
      <div ref={formation} className={styles.formation}>
        <h1>Formations</h1>
        <Formations />
      </div>
      <div ref={skills} className={styles.skills}>
        <Skills />
      </div>
      <div ref={spare} className={styles.spare}>
        <SpareTime />
      </div>
      <div ref={bigFooter} className={styles.bigFooter}>
        <Link href={"/my-portfolio"}>
          <button className={styles.bigBtn}>See my portfolio</button>
        </Link>
      </div>
    </div>
  );
}

export default AboutMe;
