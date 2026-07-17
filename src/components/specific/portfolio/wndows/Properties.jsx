import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/properties.module.css";
import { useLang } from "../lang";
import { tx, STATUS_LABEL } from "../../../../data";

function Row({ label, children }) {
  if (!children) return null;
  return (
    <section>
      <h4>{label}</h4>
      <p>{children}</p>
    </section>
  );
}

function Properties({ props }) {
  const { t, lang } = useLang();
  const p = props.curProp || {};
  const statusLabel = (STATUS_LABEL[lang] && STATUS_LABEL[lang][p.status]) || p.status;

  return (
    <div className={styles.properties}>
      <p className={styles.infoProp}>{t.propsInfo}</p>

      {(p.category || p.status) && (
        <div className={styles.tags}>
          {p.category && <span className={styles.tagCat}>{tx(p.category, lang)}</span>}
          {p.status && (
            <span className={`${styles.tagStatus} ${styles["s_" + String(p.status).replace(/\s/g, "")]}`}>
              {statusLabel}
            </span>
          )}
        </div>
      )}

      <Row label={t.lblRole}>{tx(p.role, lang)}</Row>
      <Row label={t.lblClient}>{p.client}</Row>
      <Row label={t.lblTeam}>{p.team}</Row>
      <Row label={t.lblYear}>{p.year}</Row>
      <Row label={t.lblCreated}>{p.createdAt}</Row>
      <Row label={t.lblAdded}>{p.addedAt}</Row>
      <Row label={t.lblMadeWith}>{p.technos}</Row>
      <Row label={t.lblCollab}>{p.collaboraters}</Row>

      {p.stack?.length > 0 && (
        <section>
          <h4>{t.lblStack}</h4>
          <div className={styles.chips}>
            {p.stack.map((s, i) => (
              <span className={styles.chip} key={"s" + i}>{s}</span>
            ))}
          </div>
        </section>
      )}

      {p.features?.length > 0 && (
        <section>
          <h4>{t.adHighlights}</h4>
          <ul className={styles.featList}>
            {p.features.map((f, i) => (
              <li key={"f" + i}>{tx(f, lang)}</li>
            ))}
          </ul>
        </section>
      )}

      <Row label={t.lblOther}>{tx(p.more, lang)}</Row>
    </div>
  );
}

export default Properties;
