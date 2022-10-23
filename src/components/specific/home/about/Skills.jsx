import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/home/about/skills.module.css";
import imgSkills from "../../../../assets/img/awesome/skills.jpg";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { listSkills } from "../../../../rawDatas/aboutMe";


function Skills() {
  const imgSk = useRef();
  const skillBox = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      gsap.to(imgSk.current, {
        objectPosition: "100% 0",
        scrollTrigger: {
          trigger: imgSk.current,
          start: "top center",
          scrub: 2,
        },
      });
    })

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.skills_container}>
      <div className={skillBox}>
        <p className="notInMobile2">Being a <b className="or">creative developer</b> requires design and programming skills.</p>
        {listSkills.map((oneField, index) => (
          <div key={"FieldSkill" + index}>
            <h1>{oneField.field}</h1>
            <ul>
              {oneField.skills.map((oneSkill, ind) => (
                <li key={"Skill" + index + "_" + ind}>{ oneSkill }</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <img ref={imgSk} src={imgSkills.src} alt="Skills minimalist" />
      </div>
    </div>
  );
}

export default Skills;
