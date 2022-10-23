import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../styles/specific/portfolio/content.module.css";
import dever from "../../../assets/img/icons/DEVER.svg";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { performances } from "../../../rawDatas/performances";
import { FaRegSquare, FaRegWindowMinimize, FaTh, FaTimes } from "react-icons/fa";
import useWindowScreen from "../../../hooks/useWindowScreen";

function Content() {
  const welcomeScreen = useRef();

  const [
    currentWindow,
    setCurrentWindow,
    windowsOpenned,
    setWindowsOpenned,
    openWindow,
    resizeWindow,
    closeWindow,
    moveWindow,
  ] = useWindowScreen();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.to(welcomeScreen.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
        delay: 3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.contentBlk}>
      {/* The splash screen */}
      <section ref={welcomeScreen} className={styles.welcomeScreen}>
        <img
          src={dever.src}
          alt="Luap Dever logo"
          title="Luap Dever"
          width={80}
        />
        <h2 className="text-primary">DEVER</h2>
      </section>

      {/* The desktop shortcut */}
      <section className={styles.desktop}>
        <div className={styles.performances}>
          {performances.map((per, index) => (
            <div
              key={"Performance" + index}
              onDoubleClick={(e) => openWindow(e, per)}
            >
              <img
                src={per.icon}
                style={{ backgroundColor: per.bg ?? "white" }}
                alt="Performance icon"
                width={50}
              />
              <span>{per.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The All wndows openned */}
      <div className={styles.windows}>
        {windowsOpenned.map((wind, ind) => (
          <div
            key={"Window" + ind}
            id={"wind" + ind}
            fullscreen={"false"}
            style={{ zIndex: wind.id === currentWindow ? 20 : "inherit" }}
          >
            <div
              className={styles.windHeader}
              // onDrag={(e) => moveWindow(e, "wind" + ind)}
              onDoubleClick={(e) => resizeWindow(e, "wind" + ind)}
            >
              <div className={styles.windLabel}>
                <img src={wind.window.icon} alt="Label" width={25} />
                {wind.window.label}
              </div>
              <div className={styles.windActions}>
                <FaRegWindowMinimize />
                <FaRegSquare onClick={(e) => resizeWindow(e, "wind" + ind)} />
                <FaTimes onClick={(e) => closeWindow(e, ind)} />
              </div>
            </div>
            <div className={styles.windContent}>{wind.window.content}</div>
          </div>
        ))}
      </div>

      {/* The Taskbar */}

      <div className={styles.taskbar}>
        <div className={styles.task + " " + styles.fake}>
          <FaTh />
        </div>
        {windowsOpenned.map((task, index) => (
          <div
            key={"Task"+index}
            className={
              styles.task +
              (task.id === currentWindow ? " " + styles.active : "")
            }
            onClick={(e) => openWindow(e, task.window)}
          >
            <img 
              src={task.window.icon} 
              alt="Task icon"
              width={25} 
              style={{ backgroundColor: task.window.bg ?? "white" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
