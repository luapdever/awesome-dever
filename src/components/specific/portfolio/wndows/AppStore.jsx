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
          <img src="https://api.iconify.design/ph:device-mobile.svg?color=%23ffa500" alt="" />
        </span>
        <div>
          <h1>App Store</h1>
          <span>{t.asSub}</span>
        </div>
      </header>

      <section className={styles.list}>
        {mobilePerformances.map((app, i) => (
          <div className={styles.card} key={i}>
            <img className={styles.preview} src={app.preview} alt={`${app.name} preview`} loading="lazy" />
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
                <span className={styles.stars}>{stars(app.rating)}</span>
                <span>{app.rating}</span>
                {app.downloads && (<><span>·</span><span>{app.downloads} {t.asDownloads}</span></>)}
                <span>·</span>
                <span>{app.size}</span>
                <span>·</span>
                <span>{app.year}</span>
              </div>
              <button
                className={styles.getBtn}
                disabled={!app.url}
                onClick={() => app.url && window.open(app.url, "_blank")}
              >
                {app.url ? t.asGet : t.asSoon}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AppStore;
