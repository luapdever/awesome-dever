import React, { useEffect, useRef } from "react";
import styles from "../../../../../styles/specific/home/about/formations.module.css";
import { formations } from "../../../../rawDatas/aboutMe";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Formations() {
  const formBlock = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        y: 80,
        opacity: 0,
        scrollTrigger: {
          trigger: formBlock.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2
        },
      });
    })

    return () => ctx.revert();
		
  }, []);

  return (
    <div ref={formBlock} className={styles.formations}>
      {formations.map((formation, index) => (
        <div key={"Formation "+index} className={"card"+(formation.moreClass ?? "")}>
          <h2>{ formation.title }</h2>
					{ formation.details }
        </div>
      ))}
    </div>
  );
}

export default Formations;
