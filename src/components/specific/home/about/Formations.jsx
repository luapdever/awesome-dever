import React from "react";
import styles from "../../../../../styles/specific/home/about/formations.module.css";
import { formations } from "../../../../rawDatas/aboutMe";

function Formations() {
  return (
    <div className={styles.formations}>
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
