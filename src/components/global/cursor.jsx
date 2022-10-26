import React, { useEffect, useState } from "react";
import styles from "../../../styles/global/cursor.module.css";

function Cursor({ props }) {
  const [mouse, setMouse] = useState({ x: 110, y: 110 });

  const handleCursor = (event) => {
    setMouse({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleCursor);

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      window.removeEventListener("mousemove", handleCursor);
    };
  }, [mouse]);

  return (
    <>
      <div
        className={styles.funCursor}
        style={{
          top: mouse.y + "px",
          left: mouse.x + "px",
        }}
      ></div>
      <div className={styles.round}></div>
      <div className={styles.roundB}></div>
    </>
  );
}

export default Cursor;
