/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../../../styles/specific/portfolio/windows/appStore.module.css";
import { mobilePerformances } from "../../../../data";
import { useLang } from "../lang";

const stars = (r) => {
  const full = Math.round(r || 0);
  return "★".repeat(full) + "☆".repeat(5 - full);
};

function AppStore() {
  const { t } = useLang();
  return (
    <div className={styles.appStore}>
      <header className={styles.header}>
        <span className={styles.headIcon}>
          <img src="/icons/ph/device-mobile__ffa500.svg" alt="" />
        </span>
        <div>
          <h1>App Store</h1>
          <span>{t.asSub}</span>
        </div>
      </header>

      <section className={styles.list}>
        {mobilePerformances.map((app, i) => {
          const meta = [app.metric, app.platform, app.year && app.year !== "—" ? app.year : null].filter(Boolean);
          return (
          <div className={styles.card} key={i}>
            {app.confidential ? (
              <div className={styles.previewLocked} aria-label="Confidential app">
                <img src="/icons/ph/lock-key__ffa500.svg" alt="" />
              </div>
            ) : (
              <img className={styles.preview} src={app.preview} alt={`${app.name} preview`} loading="lazy" />
            )}
            <div className={styles.info}>
              <div className={styles.cardTop}>
                <div>
                  <h2>{app.name}</h2>
                  <span className={styles.tag}>{app.tag}</span>
                  <span className={styles.dev}>{t.asBy} Paul M. ZANNOU</span>
                </div>
                {app.badge && <span className={styles.badge}>{app.badge}</span>}
              </div>
              <p className={styles.desc}>{app.desc}</p>
              <div className={styles.meta}>
                {app.rating != null && (<><span className={styles.stars}>{stars(app.rating)}</span><span>{app.rating}</span></>)}
                {meta.map((m, j) => (
                  <React.Fragment key={j}>
                    {(app.rating != null || j > 0) && <span>·</span>}
                    <span>{m}</span>
                  </React.Fragment>
                ))}
              </div>
              <button
                className={styles.getBtn}
                disabled={!app.url}
                onClick={() => app.url && window.open(app.url, "_blank")}
              >
                {app.url ? t.asGet : app.confidential ? t.asPrivate : t.asSoon}
              </button>
            </div>
          </div>
          );
        })}
      </section>
    </div>
  );
}

export default AppStore;
