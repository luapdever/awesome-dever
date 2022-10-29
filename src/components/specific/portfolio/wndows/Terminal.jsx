import React, { useRef, useState } from "react";
import styles from "../../../../../styles/specific/portfolio/windows/terminal.module.css";
import { useConsole } from "../../../../hooks/useConsole";

function Terminal() {
  const [consoleOutputs] = useConsole(styles);

  return <div className={styles.terminal}>
    {consoleOutputs.map((out, index) => <div key={"Output"+index}>
      { out.output }
    </div>)}
  </div>;
}

export default Terminal;
