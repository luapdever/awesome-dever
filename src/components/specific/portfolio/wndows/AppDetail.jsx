/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/apps.module.css";
import { useLang } from "../lang";
import { tx, STATUS_LABEL } from "../../../../data";

/**
 * Rich presentation for an app that cannot be embedded (CSP / X-Frame-Options)
 * — or simply to introduce a live app. Invites the visitor to open it in a new tab.
 */
function AppDetail({ app }) {
  const { t, lang } = useLang();
  const p = app.properties || {};
  const statusLabel = (STATUS_LABEL[lang] && STATUS_LABEL[lang][p.status]) || p.status;

  return (
    <div className={styles.detail}>
      <div className={styles.detailHero}>
        <span className={styles.detailIcon} style={{ background: app.bg || "#fff" }}>
          <img src={app.icon} alt={app.label} />
        </span>
        <div className={styles.detailHeadText}>
          <h1>{app.label}</h1>
          {p.category && <span className={styles.detailCat}>{tx(p.category, lang)}</span>}
          {p.status && <span className={`${styles.pill} ${styles["pill_" + (p.status || "").replace(/\s/g, "")]}`}>{statusLabel}</span>}
        </div>
      </div>

      {app.url && (
        <>
          <a className={styles.openBtn} href={app.url} target="_blank" rel="noopener noreferrer">
            <img src="/icons/ph/arrow-square-out__3a2500.svg" alt="" width={17} height={17} />
            {t.adOpen}
          </a>
          <p className={styles.cspNote}>
            <img src="/icons/ph/shield-check__ffc25c.svg" alt="" width={14} height={14} />
            {t.adCsp}
          </p>
        </>
      )}

      {p.more && <p className={styles.detailDesc}>{tx(p.more, lang)}</p>}

      <div className={styles.metaGrid}>
        {p.role && <div className={styles.metaItem}><span>{t.lblRole}</span><b>{tx(p.role, lang)}</b></div>}
        {p.client && <div className={styles.metaItem}><span>{t.lblClient}</span><b>{p.client}</b></div>}
        {p.team && <div className={styles.metaItem}><span>{t.lblTeam}</span><b>{p.team}</b></div>}
        {p.collaboraters && <div className={styles.metaItem}><span>{t.lblCollab || "Collaborateurs"}</span><b>{p.collaboraters}</b></div>}
        {p.year && <div className={styles.metaItem}><span>{t.lblYear}</span><b>{p.year}</b></div>}
      </div>

      {p.features?.length > 0 && (
        <div className={styles.featureBlock}>
          <h4>{t.adHighlights}</h4>
          <ul className={styles.featureList}>
            {p.features.map((f, i) => (
              <li key={"f" + i}>{tx(f, lang)}</li>
            ))}
          </ul>
        </div>
      )}

      {p.stack?.length > 0 && (
        <div className={styles.chips}>
          {p.stack.map((s, i) => (
            <span className={styles.chip} key={"st" + i}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppDetail;
