import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/global/cursor.module.css";

function Cursor({ props }) {
  const [mouse, setMouse] = useState({ x: 110, y: 110 });
  const [hovering, setHovering] = useState(false);

  const location = useRouter();

  const handleCursor = (event) => {
    setMouse({ x: event.clientX, y: event.clientY });
    const el = event.target;
    setHovering(!!(el && el.closest && el.closest('a, button, [role="button"], [data-magnetic], label')));
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
        className={
          styles.funCursor +
          (hovering ? " " + styles.hovering : "") +
          (location.pathname.includes("paulfolio") ? " "+styles.disabled : "")
        }
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
