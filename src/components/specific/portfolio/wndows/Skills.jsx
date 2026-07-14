/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/apps.module.css";
import { skillSet } from "../../../../rawDatas/skillset";
import { useLang } from "../lang";
import { SKILL_CAT, tx } from "../../../../rawDatas/i18n";

function Skills() {
  const { t, lang } = useLang();
  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <span className={styles.headIcon}>
          <img src="https://api.iconify.design/fluent-emoji-flat:brain.svg" alt="Skills" />
        </span>
        <div>
          <h1>{t.skTitle}</h1>
          <span className={styles.sub}>{t.skSub}</span>
        </div>
      </div>

      <div className={styles.skillGrid}>
        {skillSet.map((cat) => (
          <div className={styles.skillCard} key={cat.key}>
            <div className={styles.cat}>
              {cat.icon && <img src={cat.icon} alt="" />}
              {SKILL_CAT[cat.category] ? tx(SKILL_CAT[cat.category], lang) : cat.category}
            </div>
            {cat.skills.map((sk, i) => (
              <div className={styles.skillRow} key={cat.key + i}>
                <div className={styles.top}>
                  {sk.icon && <img src={sk.icon} alt="" loading="lazy" />}
                  <span>{sk.name}</span>
                  <span className={styles.pct}>{sk.level}%</span>
                </div>
                <div className={styles.track}>
                  <div className={styles.fill} style={{ width: sk.level + "%" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
