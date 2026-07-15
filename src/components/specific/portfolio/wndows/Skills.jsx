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
          <img src="https://api.iconify.design/ph:brain.svg?color=%23ffa500" alt="Skills" />
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

            <div className={styles.techChips}>
              {cat.skills.map((sk, i) => (
                <span className={styles.techChip} key={cat.key + i}>
                  {sk.icon && <img src={sk.icon} alt="" loading="lazy" />}
                  {sk.name}
                </span>
              ))}
            </div>

            {cat.concepts?.length > 0 && (
              <div className={styles.concepts}>
                <span className={styles.conceptsLabel}>{t.skConcepts}</span>
                <div className={styles.conceptTags}>
                  {cat.concepts.map((c, i) => (
                    <span className={styles.conceptTag} key={i}>{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
