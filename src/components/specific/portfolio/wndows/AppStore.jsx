import React, { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import styles from "../../../../../styles/specific/portfolio/windows/appStore.module.css";
import { mobilePerformances } from "../../../../rawDatas/mobilePerformances";

function AppStore() {
	const appStoreRef = useRef();
	const appListRef = useRef();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     gsap.registerPlugin(ScrollTrigger);
  //   }

  //   const ctx = gsap.context(() => {
  //     gsap.from(".oneApp", {
  //       x: -200,
  //       opacity: 0,
  //       scrollTrigger: {
	// 				scroller: appStoreRef.current,
  //         trigger: ".oneApp",
  //         start: "top bottom",
	// 				end: "bottom bottom",
  //         scrub: true,
  //       },
  //     });
  //   });
  //   return () => ctx.revert();
  // }, []);

  return (
    <div ref={appStoreRef} className={styles.appStore}>
      <section className={styles.header}>
        <div>
          <h1>AppStore</h1>
          <span>Discover my all mobile project with Flutter technology.</span>
        </div>
      </section>

      <section ref={appListRef} className={styles.appList}>
        {mobilePerformances.map((mbPer, index) => (
          <div className="oneApp" key={"MobilePerformance"+index}>
            <img src={mbPer.preview} alt="" />
            <div className={styles.appDesc}>
              <h2>{mbPer.name}</h2>
              <p>
                {mbPer.desc}
              </p>
              <p>
                <b>Size : </b> <strong>{mbPer.size}</strong>
              </p>
              <button onClick={(e) => (window.location.href = mbPer.url)}>
                Download
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AppStore;
