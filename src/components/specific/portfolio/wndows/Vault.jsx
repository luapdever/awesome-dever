/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/apps.module.css";
import { vaultProjects, tx, STATUS_LABEL } from "../../../../data";
import { useLang } from "../lang";

function Vault() {
  const { t, lang } = useLang();
  const statusLabel = (s) => (STATUS_LABEL[lang] && STATUS_LABEL[lang][s]) || s;

  return (
    <div className={styles.app}>
      <div className={styles.head}>
        <span className={styles.headIcon}>
          <img src="/icons/ph/lock-key__ffc25c.svg" alt="Enterprise" />
        </span>
        <div>
          <h1>{t.enTitle}</h1>
          <span className={styles.sub}>{t.enSub}</span>
        </div>
      </div>

      <div className={styles.vaultNote}>
        <img src="/icons/ph/shield-check__ffc25c.svg" alt="" width={16} height={16} />
        {t.enNote}
      </div>

      <div className={styles.vaultGrid}>
        {vaultProjects.map((p) =>
          p.hidden ? (
            <div className={`${styles.vaultCard} ${styles.hidden}`} key={p.id}>
              <img className={styles.lock} src="/icons/ph/eye-slash__ffffff.svg" alt="Hidden" />
              <h2>{p.company || p.name}</h2>
              {p.tag && <span className={styles.tag}>{tx(p.tag, lang)}</span>}
              {p.role && <div className={styles.vRow}>{t.lblRole}&nbsp;: <b>{tx(p.role, lang)}</b> · {p.year}</div>}
              <span className={`${styles.status} ${styles[p.status]}`}>{statusLabel(p.status)}</span>
              {p.desc && <p className={styles.desc}>{tx(p.desc, lang)}</p>}
              {p.stack?.length > 0 && (
                <div className={styles.chips}>
                  {p.stack.map((s, i) => (
                    <span className={styles.chip} key={p.id + i}>{s}</span>
                  ))}
                </div>
              )}
              <div className={styles.ndaNote}>
                <img src="/icons/ph/lock-simple__ffc25c.svg" alt="" width={13} height={13} />
                {t.enConfidential} — {t.enHiddenSub}
              </div>
            </div>
          ) : (
            <div className={styles.vaultCard} key={p.id}>
              <img className={styles.lock} src="/icons/ph/lock-simple__ffffff.svg" alt="Locked" />
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
                  <img src="/icons/ph/arrow-square-out__ffc25c.svg" alt="" width={13} height={13} />
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
