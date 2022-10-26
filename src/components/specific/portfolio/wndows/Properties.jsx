import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/properties.module.css";

function Properties({ props }) {
  let { curProp } = props;

  return (
    <div className={styles.properties}>
      <p className={styles.infoProp}>
        Here are the properties of the selected element...
      </p>
      {curProp.createdAt && (
        <section>
          <h4>Created at</h4>
          <p>{curProp.createdAt}</p>
        </section>
      )}
      {curProp.addedAt && (
        <section>
          <h4>Added at</h4>
          <p>{curProp.addedAt}</p>
        </section>
      )}
      {curProp.collaboraters && (
        <section>
          <h4>Collaboraters</h4>
          <p>{curProp.collaboraters}</p>
        </section>
      )}
      {curProp.more && (
        <section>
          <h4>Other info</h4>
          <p>{curProp.more}</p>
        </section>
      )}
    </div>
  );
}

export default Properties;
