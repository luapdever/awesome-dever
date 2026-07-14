/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/apps.module.css";
import { vaultProjects } from "../../../../rawDatas/vaultProjects";
import { useLang } from "../lang";
import { tx, STATUS_LABEL } from "../../../../rawDatas/i18n";

function Vault() {
  const { t, lang } = useLang();
  const statusLabel = (s) => (STATUS_LABEL[lang] && STATUS_LABEL[lang][s]) || s;

  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <span className={styles.headIcon}>
          <img src="https://api.iconify.design/fluent-emoji-flat:locked-with-key.svg" alt="Enterprise" />
        </span>
        <div>
          <h1>{t.enTitle}</h1>
          <span className={styles.sub}>{t.enSub}</span>
        </div>
      </div>

      <div className={styles.vaultNote}>
        <img src="https://api.iconify.design/mdi:shield-lock.svg?color=%23ffc25c" alt="" width={16} height={16} />
        {t.enNote}
      </div>

      <div className={styles.vaultGrid}>
        {vaultProjects.map((p) =>
          p.hidden ? (
            <div className={`${styles.vaultCard} ${styles.hidden}`} key={p.id}>
              <img className={styles.lock} src="https://api.iconify.design/mdi:eye-off.svg?color=%23ffffff" alt="Hidden" />
              <h2>{p.name}</h2>
              <span className={styles.tag}>{p.year}</span>
              <div className={styles.hiddenBody}>
                <div className={styles.redacted} aria-hidden="true">
                  <div className={`${styles.rline} ${styles.s1}`} />
                  <div className={`${styles.rline} ${styles.s2}`} />
                  <div className={`${styles.rline} ${styles.s3}`} />
                  <div className={styles.rchips}>
                    <span className={styles.rchip} />
                    <span className={styles.rchip} />
                    <span className={styles.rchip} />
                  </div>
                </div>
                <div className={styles.hiddenOverlay}>
                  <img src="https://api.iconify.design/mdi:lock.svg?color=%23ffc25c" alt="" />
                  <span className={styles.htitle}>{t.enConfidential}</span>
                  <span className={styles.hsub}>{t.enHiddenSub}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.vaultCard} key={p.id}>
              <img className={styles.lock} src="https://api.iconify.design/mdi:lock.svg?color=%23ffffff" alt="Locked" />
              <h2>{p.name}</h2>
              <span className={styles.tag}>{tx(p.tag, lang)}</span>
              <div className={styles.vRow}>{t.lblClient}&nbsp;: <b>{p.client}</b></div>
              <div className={styles.vRow}>{t.lblRole}&nbsp;: <b>{tx(p.role, lang)}</b> · {p.year}</div>
              <span className={`${styles.status} ${styles[p.status]}`}>{statusLabel(p.status)}</span>
              <p className={styles.desc}>{tx(p.desc, lang)}</p>
              {p.stack?.length > 0 && (
                <div className={styles.chips}>
                  {p.stack.map((s, i) => (
                    <span className={styles.chip} key={p.id + i}>{s}</span>
                  ))}
                </div>
              )}
              {p.link && (
                <a className={styles.vaultLink} href={p.link.url} target="_blank" rel="noopener noreferrer">
                  <img src="https://api.iconify.design/mdi:open-in-new.svg?color=%23ffc25c" alt="" width={13} height={13} />
                  {p.link.label}
                </a>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Vault;
