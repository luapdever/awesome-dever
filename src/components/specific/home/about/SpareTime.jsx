import React, { useEffect, useRef } from "react";
import styles from '../../../../../styles/specific/home/about/spareTime.module.css'
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import luapThink from '../../../../assets/img/awesome/luap-thinking.png'

function SpareTime() {
  const title = useRef()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.to(title.current, {
    //   yPercent: -50,
    //   opacity: 0,
    //   scrollTrigger: {
    //     trigger: title.current,
    //     start: "top bottom",
    //     scrub: 2
    //   },
    // });
  })

  return (
    <div className={styles.spareTime}>
      <h1 ref={title}>Spare time</h1>
      {/* <img src={luapThink.src} alt="Luap Dever thinking" /> */}
      <section>
        <div>
          <svg className="rotateIt" width="4rem" height="4rem" viewBox="0 0 512 512"><path d="M256 48C141.3 48 48 141.3 48 256s93.3 208 208 208 208-93.3 208-208S370.7 48 256 48zM127 238.2l39.2 17.9 17.1 66.9-15.6 29.3-57.2-.7C95.6 329 86.2 303.1 83 276.3l44-38.1zm217.3 114.1L328.7 323l17.1-67 39.1-17.8 44 38.1c-3.1 26.8-12.6 52.7-27.5 75.3l-57.1.7zm32.4-146.2l-43.6 19.6-61.1-51.6v-47.2l47.9-32.6c29.8 11.9 56.4 32.3 75.6 57.8l-18.8 54zM191.3 94.4l47.7 32.5v47.2l-61 51.5-43-19.6-18.7-53.6c19.3-26.1 45.1-46 75-58zM218.4 426c-.7-.2-1.3-.3-2-.5l-20.5-55.1 14.7-29.4h90.8l15 30.3-19.8 53.9c-1 .2-2 .5-3 .7-11.5 2.3-27 3.8-40.4 4.1-11.7-.1-23.4-1.5-34.8-4z" fill="currentColor"></path></svg>
          <div className={styles.spareLabel}>Watching football</div>
        </div>
        <div>
          <svg className="moveIt" width="4rem" height="4rem" viewBox="0 0 20 20"><path fill="currentColor" d="m15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19l2.83 2.83l-9.2 9.2l-2.82-2.84zm-1.4 2.83l2.11-2.12l1.42 1.42l-2.12 2.12l-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
          <div className={styles.spareLabel}>Composing song</div>
        </div>
        <div>
          <svg className="transY" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="currentColor" d="m19 1l-5 5v11l5-4.5V1m2 4v13.5c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6c-1.45-1.1-3.55-1.5-5.5-1.5c-1.95 0-4.05.4-5.5 1.5v14.65c0 .25.25.5.5.5c.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.3 4.75 1.05c.1.05.15.05.25.05c.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1M10 18.41C8.75 18.09 7.5 18 6.5 18c-1.06 0-2.32.19-3.5.5V7.13c.91-.4 2.14-.63 3.5-.63c1.36 0 2.59.23 3.5.63v11.28Z"></path></svg>
          <div className={styles.spareLabel}>Reading book</div>
        </div>
      </section>
    </div>
  );
}

export default SpareTime;
