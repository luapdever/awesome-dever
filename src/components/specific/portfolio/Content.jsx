/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../../styles/specific/portfolio/content.module.css";
import dever from "../../../assets/img/icons/DEVER.svg";
import consl from '../../../assets/img/icons/console.png'

import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { performances, groupsMeta } from "../../../rawDatas/performances";
import { pickWallpaper } from "../../../rawDatas/wallpapers";
import {
  FaRegSquare,
  FaRegWindowMinimize,
  FaTh,
  FaTimes,
  FaWifi,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaBatteryThreeQuarters,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useWindowScreen from "../../../hooks/useWindowScreen";
import Clock from "../../global/clock";
import { OS } from "../../../rawDatas/os";
import { yearsOfExperience } from "../../../rawDatas/xp";
import { useLang } from "./lang";
import { playOsSound, playStartupSound, setOsAudioConfig, unlockOsAudio } from "../../../lib/osSounds";

// Parse a shareable hash like "app=skills&lang=fr" (or bare "skills").
function parseHash(h) {
  const params = {};
  (h || "").split("&").filter(Boolean).forEach((pair) => {
    const [k, v] = pair.split("=");
    if (v === undefined) params.app = decodeURIComponent(k);
    else params[k] = decodeURIComponent(v);
  });
  return params;
}

function Content() {
  const { lang, setLang, t } = useLang();
  const welcomeScreen = useRef();
  const contextMenus = useRef();
  const bootHash = useRef(typeof window !== "undefined" ? window.location.hash.slice(1) : "").current;
  const hashReady = useRef(false);
  const [openFolder, setOpenFolder] = useState(null);
  const [wallpaper, setWallpaper] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [openMenu, setOpenMenu] = useState(null); // 'file'|'view'|'help'|'calendar'|'volume'
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [calDate, setCalDate] = useState(null); // {y, m} viewed month
  const audioCtx = useRef(null);

  // Pick a random desktop wallpaper on the client (avoids SSR hydration mismatch).
  useEffect(() => { setWallpaper(pickWallpaper()); }, []);

  // Sons d'interface : on partage l'état volume/mute de la barre avec le moteur.
  useEffect(() => { setOsAudioConfig({ volume, muted }); }, [volume, muted]);
  // Politique autoplay : on (ré)active l'AudioContext au tout premier geste.
  useEffect(() => {
    const unlock = () => unlockOsAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);
  // Petits sons contextuels : tick à l'ouverture d'un menu, clic pour un dossier.
  useEffect(() => { if (openMenu) playOsSound("toggle"); }, [openMenu]);
  useEffect(() => { if (openFolder) playOsSound("click"); }, [openFolder]);
  // Carillon de démarrage de l'OS. Audible quand on arrive depuis une autre page
  // (le clic de navigation a débloqué l'audio) ; muet sur un hard reload, faute
  // de geste préalable — comportement voulu.
  useEffect(() => {
    unlockOsAudio();
    const id = setTimeout(() => playStartupSound(), 300);
    return () => clearTimeout(id);
  }, []);
  // Touch / small screens: a single tap opens apps (double-click is unreliable on mobile).
  useEffect(() => {
    const check = () =>
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          window.innerWidth <= 768
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const tapOpen = (e, app) => { if (isTouch) openWindow(e, app); };
  const desktopStyle = wallpaper
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(9,5,34,0.82), rgba(6,3,26,0.7)), url("${wallpaper}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "none",
      }
    : undefined;

  const {
    currentWindow,
    setCurrentWindow,
    currentContext,
    windowsOpenned,
    openWindow,
    resizeWindow,
    minimizeWindow,
    closeWindow,
    handleDragStart,
    moveWindow,
    handleDragEnd,
    copyTabLink,
    switchContext,
    hideContextMenuIfVisible,
    switchProp,
    terminalWindow,
    welcomeWindow,
   } = useWindowScreen();

  // Build the desktop layout: standalone apps + one folder per company group.
  const desktopItems = [];
  const seenGroups = new Set();
  performances.forEach((p) => {
    if (p.group) {
      if (!seenGroups.has(p.group)) {
        seenGroups.add(p.group);
        desktopItems.push({ type: "folder", group: p.group });
      }
    } else {
      desktopItems.push({ type: "app", app: p });
    }
  });
  const appsInGroup = (g) => performances.filter((p) => p.group === g);

  const launch = (e, app) => {
    openWindow(e, app);
    setOpenFolder(null);
  };

  // App launcher (Windows-like) + pinned dock apps
  const perfById = Object.fromEntries(performances.map((p) => [p.id, p]));
  const PINNED = ["cv", "career", "skills", "bot", "vault", "appStore", "terminal", "contact"];
  const launcherList = performances.filter((p) =>
    p.label.toLowerCase().includes(q.trim().toLowerCase())
  );
  const openApp = (e, app) => {
    openWindow(e || { preventDefault() {} }, app);
    setLauncherOpen(false);
  };
  const openLauncher = () => { setQ(""); setSel(0); setLauncherOpen(true); playOsSound("pop"); };

  // Clic sur une icône de la barre des tâches : ouvre si besoin, met au premier
  // plan, et surtout RESTAURE la fenêtre si elle était réduite (sinon on ne
  // pouvait plus la rouvrir). Reclic sur la fenêtre déjà active → on la réduit.
  const activateFromTaskbar = (e, app) => {
    const index = windowsOpenned.findIndex((w) => w.id === app.id);
    if (index === -1) { openWindow(e, app); return; } // pas encore ouverte
    const el = typeof document !== "undefined" ? document.getElementById("wind" + index) : null;
    const isMin = !!(el && el.minimized);
    const wasCurrent = app.id === currentWindow;
    openWindow(e, app); // au premier plan
    if (isMin) minimizeWindow(e, "wind" + index, true); // force la restauration
    else if (wasCurrent) minimizeWindow(e, "wind" + index, false); // reclic actif → réduit
  };

  // ---- Menu bar: dropdowns, calendar, volume ----
  const openWin = (app) => app && openWindow({ preventDefault() {} }, app);
  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  const menuAction = (fn) => { setOpenMenu(null); fn(); };
  const MENUS = {
    file: [
      { label: t.miApps, fn: openLauncher },
      { label: t.miCV, fn: () => openWin(perfById.cv) },
      { label: t.miTerminal, fn: () => openWin(terminalWindow) },
      { label: t.miContact, fn: () => openWin(perfById.contact) },
    ],
    view: [
      { label: t.miWallpaper, fn: () => setWallpaper(pickWallpaper()) },
      { label: t.miFullscreen, fn: toggleFullscreen },
      { label: t.miShowApps, fn: openLauncher },
    ],
    help: [
      { label: `${t.miAbout} ${OS.name}`, fn: () => openWin(welcomeWindow) },
      { label: t.miShortcuts, fn: () => toast.info(t.shortcutsMsg) },
      { label: t.miGithub, fn: () => window.open("https://github.com/luapdever", "_blank") },
    ],
  };

  // Apple-menu-style "About this system" — same info as the terminal `neofetch`.
  const SYS_INFO = [
    { k: "OS", v: `${OS.name} v${OS.version}` },
    { k: "Host", v: "paul@paulbrain" },
    { k: lang === "fr" ? "Rôle" : "Role", v: lang === "fr" ? "Ingénieur logiciel full-stack" : "Full-Stack Software Engineer" },
    { k: "Uptime", v: `${yearsOfExperience()}+ ${lang === "fr" ? "ans" : "years"}` },
    { k: "Shell", v: "Dever Shell" },
    { k: "Stack", v: "JS/TS · Vue · NestJS · Flutter · Docker" },
  ];
  const SYSTEM_MENU = [
    { label: t.miApps, fn: openLauncher },
    { label: t.miTerminal, fn: () => openWin(terminalWindow) },
    { label: t.miCV, fn: () => openWin(perfById.cv) },
    { label: t.miContact, fn: () => openWin(perfById.contact) },
    { divider: true },
    { label: t.miWallpaper, fn: () => setWallpaper(pickWallpaper()) },
    { label: t.miFullscreen, fn: toggleFullscreen },
    { label: lang === "fr" ? "Redémarrer le système" : "Restart system", fn: () => window.location.reload() },
    { divider: true },
    { label: lang === "fr" ? "Suspendre — retour au portfolio" : "Suspend — back to portfolio", fn: () => { window.location.href = "/"; }, accent: true },
  ];

  // Play a short beep at the current volume so the control is genuinely audible.
  const beep = (vol) => {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660;
      gain.gain.value = (muted ? 0 : vol / 100) * 0.15;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) { /* audio not available */ }
  };

  // Calendar grid for the currently viewed month.
  const buildCalendar = () => {
    const now = new Date();
    const y = calDate ? calDate.y : now.getFullYear();
    const m = calDate ? calDate.m : now.getMonth();
    const first = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    const isToday = (d) => d && y === now.getFullYear() && m === now.getMonth() && d === now.getDate();
    const monthName = new Date(y, m, 1).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { month: "long", year: "numeric" });
    return { y, m, cells, isToday, monthName };
  };
  const shiftMonth = (delta) => {
    const now = new Date();
    const y = calDate ? calDate.y : now.getFullYear();
    const m = calDate ? calDate.m : now.getMonth();
    const nd = new Date(y, m + delta, 1);
    setCalDate({ y: nd.getFullYear(), m: nd.getMonth() });
  };
  const volIcon = muted || volume === 0 ? <FaVolumeMute /> : volume < 45 ? <FaVolumeDown /> : <FaVolumeUp />;
  const onLauncherKey = (e) => {
    const len = launcherList.length;
    const COLS = 5;
    if (e.key === "Escape") return setLauncherOpen(false);
    if (e.key === "Enter") { if (launcherList[sel]) openApp(e, launcherList[sel]); return; }
    let delta = 0;
    if (e.key === "ArrowRight") delta = 1;
    else if (e.key === "ArrowLeft") delta = -1;
    else if (e.key === "ArrowDown") delta = COLS;
    else if (e.key === "ArrowUp") delta = -COLS;
    else return;
    e.preventDefault();
    setSel((s) => Math.max(0, Math.min(s + delta, len - 1)));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.to(welcomeScreen.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
        delay: 3.4,
      });
    });

    return () => ctx.revert();
  }, []);

  // Mark fullscreen-only windows so restore-from-taskbar keeps them fullscreen.
  useEffect(() => {
    windowsOpenned.forEach((w, ind) => {
      if (w.window.fullscreenOnly) {
        const el = document.getElementById("wind" + ind);
        if (el) el.fullscreen = true;
      }
    });
  }, [windowsOpenned]);

  // Bridge so windows (e.g. Welcome) can open apps by id.
  useEffect(() => {
    const evt = { preventDefault() {} };
    window.__osOpen = (id) => {
      if (id === "terminal") return openWindow(evt, terminalWindow);
      const p = performances.find((x) => x.id === id);
      if (p) openWindow(evt, p);
    };
    window.__osSetLang = (l) => setLang(l);
    return () => { delete window.__osOpen; delete window.__osSetLang; };
  });

  // Deep-linking: apply the incoming #hash once (open a window / set language),
  // then keep the URL in sync so any state is shareable via link.
  useEffect(() => {
    const p = parseHash(bootHash);
    if (p.lang === "fr" || p.lang === "en") setLang(p.lang);
    if (p.app) {
      const perf =
        performances.find((x) => x.id === p.app) ||
        (p.app === "terminal" ? terminalWindow : p.app === "welcome" ? welcomeWindow : null);
      if (perf) openWindow({ preventDefault() {} }, perf);
    }
    hashReady.current = true;
    const onHash = () => {
      const q = parseHash(window.location.hash.slice(1));
      if ((q.lang === "fr" || q.lang === "en") && window.__osSetLang) window.__osSetLang(q.lang);
      if (q.app && window.__osOpen) window.__osOpen(q.app);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hashReady.current || !currentWindow) return;
    const parts = [`app=${currentWindow}`];
    if (lang !== "en") parts.push(`lang=${lang}`);
    try { window.history.replaceState(null, "", "#" + parts.join("&")); } catch (e) { /* noop */ }
  }, [currentWindow, lang]);

  return (
    <div
      className={styles.contentBlk}
      onClick={(e) => hideContextMenuIfVisible(e, contextMenus.current)}
    >
      
      {/* The splash / boot screen — terminal boot-log style */}
      <section ref={welcomeScreen} className={styles.welcomeScreen}>
        <div className={styles.bootTerm}>
          <div className={styles.bootBrand}>
            <img src={dever.src} alt={OS.name} width={40} className={styles.bootLogo} />
            <span>{OS.name} <em>v{OS.version}</em></span>
          </div>
          <div className={styles.bootLog}>
            <p style={{ "--d": "0.3s" }}><b>[ ok ]</b> initializing cortex</p>
            <p style={{ "--d": "0.8s" }}><b>[ ok ]</b> loading skills &amp; memory</p>
            <p style={{ "--d": "1.3s" }}><b>[ ok ]</b> mounting projects &amp; enterprise</p>
            <p style={{ "--d": "1.8s" }}><b>[ ok ]</b> establishing connections</p>
            <p style={{ "--d": "2.3s" }}><b>[ ok ]</b> starting Dever Shell</p>
            <p className={styles.bootReady} style={{ "--d": "2.9s" }}>
              {t.bootStatus}<span className={styles.bootCursor} />
            </p>
          </div>
          <div className={styles.bootBar}><span></span></div>
        </div>
        <span className={styles.bootDevBy}>Developed by <b>Paul Mèdédji ZANNOU</b></span>
      </section>

      {/* The top menu bar */}
      <div className={styles.menuBar} style={openMenu ? { zIndex: 50 } : undefined}>
        <div className={styles.menuLeft}>
          <span
            className={styles.osBrand + (openMenu === "system" ? " " + styles.menuItemActive : "")}
            onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "system" ? null : "system"); }}
          >
            <img src={dever.src} alt={OS.name} width={18} />
            <b>{OS.name}</b>
            {openMenu === "system" && (
              <div className={`${styles.dropdown} ${styles.systemDrop}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.sysInfo}>
                  <div className={styles.sysTitle}>{OS.name} <em>v{OS.version}</em></div>
                  {SYS_INFO.map((row, i) => (
                    <div className={styles.sysRow} key={i}><span>{row.k}</span><b>{row.v}</b></div>
                  ))}
                </div>
                <div className={styles.dropDivider} />
                {SYSTEM_MENU.map((it, i) => it.divider ? (
                  <div key={i} className={styles.dropDivider} />
                ) : (
                  <div key={i} className={styles.dropItem + (it.accent ? " " + styles.dropAccent : "")} onClick={() => menuAction(it.fn)}>
                    {it.label}
                  </div>
                ))}
              </div>
            )}
          </span>
          {[["file", t.menuFile], ["view", t.menuView], ["help", t.menuHelp]].map(([k, label]) => (
            <span
              key={k}
              className={styles.menuItem + (openMenu === k ? " " + styles.menuItemActive : "")}
              onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === k ? null : k); }}
            >
              {label}
              {openMenu === k && (
                <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                  {MENUS[k].map((it, i) => (
                    <div key={i} className={styles.dropItem} onClick={() => menuAction(it.fn)}>
                      {it.label}
                    </div>
                  ))}
                </div>
              )}
            </span>
          ))}
        </div>
        <div className={styles.menuRight}>
          <div className={styles.langSwitch}>
            <button className={lang === "fr" ? styles.langActive : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? styles.langActive : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <FaWifi />

          {/* Volume */}
          <span
            className={styles.widgetBtn}
            onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "volume" ? null : "volume"); }}
          >
            {volIcon}
            {openMenu === "volume" && (
              <div className={`${styles.popover} ${styles.volumePop}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.volTop}><b>{t.volume}</b><span>{muted ? 0 : volume}%</span></div>
                <input
                  type="range" min="0" max="100" value={muted ? 0 : volume}
                  onChange={(e) => { const v = +e.target.value; setMuted(false); setVolume(v); beep(v); }}
                />
                <button className={styles.muteBtn} onClick={() => setMuted((m) => !m)}>
                  {muted ? "🔈 " + t.volume : "🔇 " + t.mute}
                </button>
              </div>
            )}
          </span>

          <FaBatteryThreeQuarters />

          {/* Clock → calendar */}
          <span
            className={styles.widgetBtn}
            onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === "calendar" ? null : "calendar"); }}
          >
            <Clock />
            {openMenu === "calendar" && (() => {
              const cal = buildCalendar();
              return (
                <div className={`${styles.popover} ${styles.calendarPop}`} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.calHead}>
                    <FaChevronLeft onClick={() => shiftMonth(-1)} />
                    <b>{cal.monthName}</b>
                    <FaChevronRight onClick={() => shiftMonth(1)} />
                  </div>
                  <div className={styles.calGrid}>
                    {t.days.map((d, i) => (<span key={"d" + i} className={styles.calDow}>{d}</span>))}
                    {cal.cells.map((c, i) => (
                      <span key={"c" + i} className={styles.calCell + (cal.isToday(c) ? " " + styles.calToday : "")}>
                        {c || ""}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </span>
        </div>
      </div>
      {openMenu && <div className={styles.menuBackdrop} onClick={() => setOpenMenu(null)} />}

      {/* The desktop shortcut */}
      <section className={styles.desktop} style={desktopStyle}>
        <div className={styles.performances}>
          {desktopItems.map((item, index) =>
            item.type === "app" ? (
              <div
                key={"Performance" + index}
                onDoubleClick={(e) => openWindow(e, item.app)}
                onClick={(e) => tapOpen(e, item.app)}
                onContextMenu={(e) => switchContext(e, item.app, contextMenus.current)}
              >
                <img
                  src={item.app.icon}
                  style={{ backgroundColor: item.app.bg ?? "white" }}
                  alt="Icon"
                  width={50}
                />
                <span>{item.app.label}</span>
              </div>
            ) : (
              <div
                key={"Folder" + index}
                className={styles.folderIcon}
                onDoubleClick={() => setOpenFolder(item.group)}
                onClick={() => setOpenFolder(item.group)}
                title={`${(groupsMeta[item.group] || {}).name || item.group} apps`}
              >
                <div className={styles.folderTile}>
                  {appsInGroup(item.group).slice(0, 4).map((a, i) => (
                    <img key={"fi" + i} src={a.icon} alt="" style={{ backgroundColor: a.bg ?? "white" }} />
                  ))}
                </div>
                <span>{(groupsMeta[item.group] || {}).name || item.group}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* iOS-style folder overlay */}
      {openFolder && (
        <div className={styles.folderOverlay} onClick={() => setOpenFolder(null)}>
          <div className={styles.folderPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.folderPanelHead}>
              <img src={(groupsMeta[openFolder] || {}).icon} alt="" style={{ backgroundColor: (groupsMeta[openFolder] || {}).bg ?? "white" }} />
              <b>{(groupsMeta[openFolder] || {}).name || openFolder}</b>
              <FaTimes className={styles.folderClose} onClick={() => setOpenFolder(null)} />
            </div>
            <div className={styles.folderApps}>
              {appsInGroup(openFolder).map((a, i) => (
                <div
                  key={"FA" + i}
                  onDoubleClick={(e) => launch(e, a)}
                  onClick={(e) => launch(e, a)}
                  onContextMenu={(e) => switchContext(e, a, contextMenus.current)}
                >
                  <img src={a.icon} alt={a.label} style={{ backgroundColor: a.bg ?? "white" }} width={50} />
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All windows openned */}
      <div className={styles.windows}>
        {windowsOpenned.map((wind, ind) => (
          <div
            key={"Window" + ind}
            id={"wind" + ind}
            className={wind.window.fullscreenOnly ? styles.fullWin : undefined}
            fullscreen={"false"}
            minimized={"false"}
            style={{ zIndex: wind.id === currentWindow ? 20 : "inherit" }}
            onClick={(e) => setCurrentWindow(wind.id)}
          >
            <div
              className={styles.windHeader}
              draggable={!wind.window.fullscreenOnly}
              onDragStart={(e) => handleDragStart(e, "wind" + ind)}
              onDrag={(e) => moveWindow(e, "wind" + ind)}
              onDragEnd={(e) => handleDragEnd(e, "wind" + ind)}
              onDoubleClick={(e) => !wind.window.fullscreenOnly && resizeWindow(e, "wind" + ind)}
            >
              <div className={styles.windLabel}>
                <img src={wind.window.icon} alt="Label" width={25} />
                {wind.window.label}
              </div>
              <div className={styles.windActions}>
                <FaRegWindowMinimize
                  onClick={(e) => minimizeWindow(e, "wind" + ind)}
                />
                {!wind.window.fullscreenOnly && (
                  <FaRegSquare onClick={(e) => resizeWindow(e, "wind" + ind)} />
                )}
                <FaTimes onClick={(e) => closeWindow(e, ind)} />
              </div>
            </div>
            <div className={styles.windContent}>{wind.window.content}</div>
          </div>
        ))}
      </div>

      {/* The Taskbar */}

      <div className={styles.taskbar}>
        <div
          className={styles.task + " " + styles.launcherBtn}
          onClick={openLauncher}
          title={t.allApps}
        >
          <FaTh />
        </div>

        <div className={styles.task_bars}></div>

        {/* Pinned apps (always visible) */}
        {PINNED.map((id) => {
          const app = perfById[id];
          if (!app) return null;
          return (
            <div
              key={"Pin" + id}
              className={styles.task + (app.id === currentWindow ? " " + styles.active : "")}
              onClick={(e) => activateFromTaskbar(e, app)}
              title={app.label}
            >
              <img
                src={app.icon}
                alt={app.label}
                width={25}
                style={{ backgroundColor: app.bg ?? "white" }}
              />
            </div>
          );
        })}

        {/* Running windows not already pinned */}
        {windowsOpenned.filter((t) => !PINNED.includes(t.id)).length > 0 && (
          <div className={styles.task_bars}></div>
        )}
        {windowsOpenned.map((task, index) =>
          PINNED.includes(task.id) ? null : (
            <div
              key={"Task" + index}
              className={
                styles.task + (task.id === currentWindow ? " " + styles.active : "")
              }
              onClick={(e) => activateFromTaskbar(e, task.window)}
            >
              <img
                src={task.window.icon}
                alt="Task icon"
                width={25}
                style={{ backgroundColor: task.window.bg ?? "white" }}
              />
            </div>
          )
        )}
      </div>

      {/* Windows-like app launcher */}
      {launcherOpen && (
        <div className={styles.launcherOverlay} onClick={() => setLauncherOpen(false)}>
          <div className={styles.launcher} onClick={(e) => e.stopPropagation()}>
            <div className={styles.launcherHead}>
              <FaSearch />
              <input
                autoFocus
                className={styles.launcherSearch}
                placeholder={t.searchPlaceholder}
                value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={onLauncherKey}
              />
            </div>
            <div className={styles.launcherGrid}>
              {launcherList.map((app, i) => (
                <div
                  key={"L" + app.id}
                  className={styles.launcherItem + (i === sel ? " " + styles.launcherSel : "")}
                  onMouseEnter={() => setSel(i)}
                  onClick={(e) => openApp(e, app)}
                >
                  <img src={app.icon} alt="" style={{ backgroundColor: app.bg ?? "white" }} />
                  <span>{app.label}</span>
                </div>
              ))}
              {launcherList.length === 0 && (
                <div className={styles.launcherEmpty}>{t.noApps}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* The Taskbar */}

      <div ref={contextMenus} className={styles.contextMenus}>
        {currentContext && (
          <>
            <div onClick={(e) => { openWindow(e, currentContext); setOpenFolder(null); }}>{t.ctxOpen}</div>
            {currentContext.isLink && (
              <>
                <a
                  href={currentContext.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenFolder(null)}
                >
                  <div>{t.ctxOpenTab}</div>
                </a>
                <div onClick={(e) => copyTabLink(e, currentContext.url)}>
                  {t.ctxCopy}
                </div>
              </>
            )}
            <div onClick={(e) => { switchProp(e, currentContext); setOpenFolder(null); }}>{t.ctxProps}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
