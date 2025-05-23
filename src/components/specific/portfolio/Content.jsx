/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../styles/specific/portfolio/content.module.css";
import dever from "../../../assets/img/icons/DEVER.svg";
import consl from '../../../assets/img/icons/console.png'

import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { performances } from "../../../rawDatas/performances";
import {
  FaRegSquare,
  FaRegWindowMinimize,
  FaTh,
  FaTimes,
} from "react-icons/fa";
import useWindowScreen from "../../../hooks/useWindowScreen";

function Content() {
  const welcomeScreen = useRef();
  const contextMenus = useRef();

  const {
    currentWindow,
    setCurrentWindow,
    currentContext,
    windowsOpenned,
    openWindow,
    resizeWindow,
    minimizeWindow,
    closeWindow,
    handleDragStart,
    moveWindow,
    handleDragEnd,
    copyTabLink,
    switchContext,
    hideContextMenuIfVisible,
    switchProp,
    terminalWindow,
   } = useWindowScreen();

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
    <div
      className={styles.contentBlk}
      onClick={(e) => hideContextMenuIfVisible(e, contextMenus.current)}
    >
      
      {/* The splash screen */}
      <section ref={welcomeScreen} className={styles.welcomeScreen}>
        <img
          src={dever.src}
          alt="Luap Dever logo"
          title="Luap Dever"
          width={80}
        />
        <h2 className="text-primary">DEVER</h2>
        <span>
          Developped by <b className="or">Paul Mèdédji ZANNOU</b>
        </span>
      </section>

      {/* The desktop shortcut */}
      <section className={styles.desktop}>
        <div className={styles.performances}>
          {performances.map((perform, index) => (
            <div
              key={"Performance" + index}
              onDoubleClick={(e) => openWindow(e, perform)}
              onContextMenu={(e) => switchContext(e, perform, contextMenus.current)}
            >
              <img
                src={perform.icon}
                style={{ backgroundColor: perform.bg ?? "white" }}
                alt="Icon"
                width={50}
              />
              <span>{perform.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All windows openned */}
      <div className={styles.windows}>
        {windowsOpenned.map((wind, ind) => (
          <div
            key={"Window" + ind}
            id={"wind" + ind}
            fullscreen={"false"}
            minimized={"false"}
            style={{ zIndex: wind.id === currentWindow ? 20 : "inherit" }}
            onClick={(e) => setCurrentWindow(wind.id)}
          >
            <div
              className={styles.windHeader}
              draggable
              onDragStart={(e) => handleDragStart(e, "wind" + ind)}
              onDrag={(e) => moveWindow(e, "wind" + ind)}
              onDragEnd={(e) => handleDragEnd(e, "wind" + ind)}
              onDoubleClick={(e) => resizeWindow(e, "wind" + ind)}
            >
              <div className={styles.windLabel}>
                <img src={wind.window.icon} alt="Label" width={25} />
                {wind.window.label}
              </div>
              <div className={styles.windActions}>
                <FaRegWindowMinimize
                  onClick={(e) => minimizeWindow(e, "wind" + ind)}
                />
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
        <div
          className={styles.task}
          onClick={(e) => openWindow(e, terminalWindow)}
        >
          <img
            src={consl.src}
            alt="Task icon"
            width={25}
            style={{ backgroundColor: "#00000000" }}
          />
        </div>
        
        <div className={windowsOpenned.length > 0 && styles.task_bars}></div>

        {windowsOpenned.map((task, index) => (
          <div
            key={"Task" + index}
            className={
              styles.task +
              (task.id === currentWindow ? " " + styles.active : "")
            }
            onClick={(e) => {
              openWindow(e, task.window);
              minimizeWindow(e, "wind" + index, !(task.id === currentWindow));
            }}
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

      {/* The Taskbar */}

      <div ref={contextMenus} className={styles.contextMenus}>
        {currentContext && (
          <>
            <div onClick={(e) => openWindow(e, currentContext)}>Open</div>
            {currentContext.isLink && (
              <>
                <a
                  href={currentContext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>Open in new tab</div>
                </a>
                <div onClick={(e) => copyTabLink(e, currentContext.url)}>
                  Copy link
                </div>
              </>
            )}
            <div onClick={(e) => switchProp(e, currentContext)}>Properties</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
