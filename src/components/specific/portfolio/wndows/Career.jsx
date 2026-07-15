/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/apps.module.css";
import { experiences } from "../../../../rawDatas/experiences";
import { useLang } from "../lang";
import { tx } from "../../../../rawDatas/i18n";

function Career() {
  const { t, lang } = useLang();
  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <span className={styles.headIcon}>
          <img src="https://api.iconify.design/ph:briefcase.svg?color=%23ffa500" alt="Career" />
        </span>
        <div>
          <h1>{t.caTitle}</h1>
          <span className={styles.sub}>{t.caSub}</span>
        </div>
      </div>

      <div className={styles.timeline}>
        {experiences.map((xp) => (
          <div className={`${styles.xp}${xp.current ? " " + styles.now : ""}`} key={xp.id}>
            <div className={styles.xpTop}>
              <span className={styles.xpRole}>
                {tx(xp.role, lang)}
                {xp.current && <span className={styles.xpBadge}>{t.caNow}</span>}
              </span>
              <span className={styles.xpPeriod}>{tx(xp.period, lang)}</span>
            </div>
            <div className={styles.xpOrg}>
              {xp.org}
              {xp.type ? ` · ${tx(xp.type, lang)}` : ""}
            </div>
            {xp.summary && <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{tx(xp.summary, lang)}</div>}
            {xp.highlights?.length > 0 && (
              <ul>
                {xp.highlights.map((h, i) => (
                  <li key={xp.id + i}>{tx(h, lang)}</li>
                ))}
              </ul>
            )}
            {xp.stack?.length > 0 && (
              <div className={styles.chips}>
                {xp.stack.map((s, i) => (
                  <span className={styles.chip} key={xp.id + "s" + i}>{s}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Career;
